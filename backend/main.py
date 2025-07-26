from textwrap import dedent

from agno.agent import Agent
from agno.models.google import Gemini
from agno.tools.googlesearch import GoogleSearchTools
from agno.tools.duckduckgo import DuckDuckGoTools
import os
from dotenv import load_dotenv
import json
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")



recipe_agent = Agent(
    name="ChefGenius",
    tools=[GoogleSearchTools(), DuckDuckGoTools()],
    model=Gemini(id="gemini-2.5-flash", api_key=GEMINI_API_KEY),
    description=dedent("""
        You are ChefGenius, a passionate and knowledgeable culinary expert with expertise in global cuisine! 🍳

        Your mission is to help users create delicious meals by providing detailed,
        personalized recipes based on their available ingredients, dietary restrictions,
        and time constraints. You combine deep culinary knowledge with nutritional wisdom
        to suggest recipes that are both practical and enjoyable.
        Always output your recipe in the following JSON format:
        {"title": ..., "cuisine": ..., "preparation_time": ..., "cooking_time": ..., "ingredients": [{"name": ..., "quantity": ...}], "steps": [...], "nutrition": ..., "difficulty": ..., "servings": ..., "storage": ..., "dietary_restrictions": ..., "substitutions": ..., "pitfalls": ..., "plating": ..., "wine_pairing": ..., "leftovers": ..., "meal_prep": ..., "allergen_warnings": ..., "make_ahead": ..., "side_dishes": ...}. Only output valid JSON.
        If dietary restrictions are provided, ensure the recipe strictly adheres to them and lists them in the output.
    """),
    instructions=dedent("""
        Approach each recipe recommendation with these steps:

        1. Analysis Phase 📋
           - Understand available ingredients
           - Consider dietary restrictions
           - Note time constraints
           - Factor in cooking skill level
           - Check for kitchen equipment needs

        2. Recipe Selection 🔍
           - Use googl to search for relevant recipes
           - Ensure ingredients match availability
           - Verify cooking times are appropriate
           - Consider seasonal ingredients
           - Check recipe ratings and reviews

        3. Detailed Information 📝
           - Recipe title and cuisine type
           - Preparation time and cooking time
           - Complete ingredient list with measurements
           - Step-by-step cooking instructions
           - Nutritional information per serving
           - Difficulty level
           - Serving size
           - Storage instructions

        4. Extra Features ✨
           - Ingredient substitution options
           - Common pitfalls to avoid
           - Plating suggestions
           - Wine pairing recommendations
           - Leftover usage tips
           - Meal prep possibilities

        Presentation Style:
        - Output ONLY valid JSON in the specified format
        - If dietary restrictions are provided, ensure the recipe strictly adheres to them and lists them in the output
        - Do not include any markdown or extra text, only the JSON object
    """),
    markdown=False,
    add_datetime_to_instructions=True,
    show_tool_calls=True,
)
def remove_backtick(text):
    if text.startswith("```json") and text.endswith("```"):
        return text[7:-3].strip()

def recipe_agent_call(prompt, markdown=False):
    output = recipe_agent.run(prompt)
    fin_output = remove_backtick(output.content)
    return fin_output
# output = recipe_agent_call("Suggest a recipe for a quick dinner using dosa and sambhar.")
# fin_output = remove_backtick(output)
# final_json = json.loads(fin_output)
# print(final_json)
# print(type(final_json))
# More example prompts to explore:
"""
Quick Meals:
1. "15-minute dinner ideas with pasta and vegetables"
2. "Quick healthy lunch recipes for meal prep"
3. "Easy breakfast recipes with eggs and avocado"
4. "No-cook dinner ideas for hot summer days"

Dietary Restrictions:
1. "Keto-friendly dinner recipes with salmon"
2. "Gluten-free breakfast options without eggs"
3. "High-protein vegetarian meals for athletes"
4. "Low-carb alternatives to pasta dishes"

Special Occasions:
1. "Impressive dinner party main course for 6 people"
2. "Romantic dinner recipes for two"
3. "Kid-friendly birthday party snacks"
4. "Holiday desserts that can be made ahead"

International Cuisine:
1. "Authentic Thai curry with available ingredients"
2. "Simple Japanese recipes for beginners"
3. "Mediterranean diet dinner ideas"
4. "Traditional Mexican recipes with modern twists"

Seasonal Cooking:
1. "Summer salad recipes with seasonal produce"
2. "Warming winter soups and stews"
3. "Fall harvest vegetable recipes"
4. "Spring picnic recipe ideas"

Batch Cooking:
1. "Freezer-friendly meal prep recipes"
2. "One-pot meals for busy weeknights"
3. "Make-ahead breakfast ideas"
4. "Bulk cooking recipes for large families"
"""