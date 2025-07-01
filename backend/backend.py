from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional
import sqlite3
import os
from main import recipe_agent_call

app = FastAPI(title="Recipe API", description="API for generating and caching recipes with dietary restriction support.", version="1.0.0")

DB_PATH = "recipes.db"

# JSON output format
class Ingredient(BaseModel):
    name: str
    quantity: str

class Recipe(BaseModel):
    title: str
    cuisine: Optional[str]
    preparation_time: Optional[str]
    cooking_time: Optional[str]
    ingredients: List[Ingredient]
    steps: List[str]
    nutrition: Optional[dict]
    difficulty: Optional[str]
    servings: Optional[int]
    storage: Optional[str]
    dietary_restrictions: Optional[List[str]]
    substitutions: Optional[List[str]]
    pitfalls: Optional[List[str]]
    plating: Optional[str]
    wine_pairing: Optional[str]
    leftovers: Optional[str]
    meal_prep: Optional[str]
    allergen_warnings: Optional[List[str]]
    make_ahead: Optional[str]
    side_dishes: Optional[List[str]]

# DB setup
conn = sqlite3.connect(DB_PATH, check_same_thread=False)
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT UNIQUE,
    json TEXT
)''')
conn.commit()

def get_recipe_from_db(query: str) -> Optional[dict]:
    c.execute("SELECT json FROM recipes WHERE query=?", (query,))
    row = c.fetchone()
    if row:
        import json
        return json.loads(row[0])
    return None

def save_recipe_to_db(query: str, recipe_json: dict):
    import json
    c.execute("INSERT OR REPLACE INTO recipes (query, json) VALUES (?, ?)", (query, json.dumps(recipe_json)))
    conn.commit()

def agent_recipe_json(query: str, dietary_restrictions: Optional[List[str]] = None) -> dict:
    # Compose the prompt for the agent
    dr_text = f" with dietary restrictions: {', '.join(dietary_restrictions)}" if dietary_restrictions else ""
    prompt = f"{query}{dr_text}. Output the recipe in the following JSON format: {{'title': ..., 'cuisine': ..., 'preparation_time': ..., 'cooking_time': ..., 'ingredients': [{{'name': ..., 'quantity': ...}}], 'steps': [...], 'nutrition': ..., 'difficulty': ..., 'servings': ..., 'storage': ..., 'dietary_restrictions': ..., 'substitutions': ..., 'pitfalls': ..., 'plating': ..., 'wine_pairing': ..., 'leftovers': ..., 'meal_prep': ..., 'allergen_warnings': ..., 'make_ahead': ..., 'side_dishes': ...}}. Only output valid JSON."
    response = recipe_agent_call(prompt, markdown=False)  # Use the callable wrapper
    import json
    try:
        # Try to extract JSON from the response
        start = response.find('{')
        end = response.rfind('}') + 1
        json_str = response[start:end]
        return json.loads(json_str)
    except Exception as e:
        raise ValueError(f"Could not parse agent response as JSON: {e}\nResponse: {response}")

@app.get("/recipe", response_model=Recipe, tags=["Recipes"])
def get_recipe(
    query: str = Query(..., description="Recipe query, e.g. 'Dosa with sambhar for 4 people'"),
    dietary_restrictions: Optional[List[str]] = Query(None, description="List of dietary restrictions, e.g. ['vegan', 'gluten-free']")
):
    """Get a recipe by query and dietary restrictions. Caches results in SQLite."""
    db_key = query + ("|" + ",".join(dietary_restrictions) if dietary_restrictions else "")
    recipe = get_recipe_from_db(db_key)
    if recipe:
        return recipe
    try:
        recipe = agent_recipe_json(query, dietary_restrictions)
        save_recipe_to_db(db_key, recipe)
        return recipe
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"} 