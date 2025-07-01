import streamlit as st
import requests

st.title("ChefGenius Recipe Finder 🍳")

st.markdown("""
Enter your recipe query and (optionally) dietary restrictions. The app will fetch a recipe from the backend API, using cache if available, or generating a new one if not.
""")

query = st.text_input("Recipe Query", "Dosa with sambhar for 4 people")
dietary = st.text_input("Dietary Restrictions (comma separated)", "")

dietary_list = [d.strip() for d in dietary.split(",") if d.strip()]

if st.button("Get Recipe"):
    params = {"query": query}
    if dietary_list:
        params["dietary_restrictions"] = dietary_list
    try:
        response = requests.get("http://localhost:8000/recipe", params=params)
        if response.status_code == 200:
            recipe = response.json()
            st.subheader(recipe["title"])
            if recipe.get("cuisine"):
                st.write(f"Cuisine: {recipe['cuisine']}")
            st.write(f"Preparation time: {recipe.get('preparation_time', 'N/A')}")
            st.write(f"Cooking time: {recipe.get('cooking_time', 'N/A')}")
            st.write(f"Servings: {recipe.get('servings', 'N/A')}")
            st.markdown("### Ingredients")
            for ing in recipe["ingredients"]:
                st.write(f"- {ing['name']}: {ing['quantity']}")
            st.markdown("### Steps")
            for i, step in enumerate(recipe["steps"], 1):
                st.write(f"{i}. {step}")
            if recipe.get("nutrition"):
                st.markdown("### Nutrition")
                st.json(recipe["nutrition"])
            if recipe.get("dietary_restrictions"):
                st.write(f"Dietary restrictions: {', '.join(recipe['dietary_restrictions'])}")
            if recipe.get("allergen_warnings"):
                st.write(f"Allergen warnings: {', '.join(recipe['allergen_warnings'])}")
            if recipe.get("substitutions"):
                st.markdown("**Substitutions:**")
                for sub in recipe["substitutions"]:
                    st.write(f"- {sub}")
            if recipe.get("pitfalls"):
                st.markdown("**Common Pitfalls:**")
                for pit in recipe["pitfalls"]:
                    st.write(f"- {pit}")
            if recipe.get("plating"):
                st.write(f"Plating: {recipe['plating']}")
            if recipe.get("wine_pairing"):
                st.write(f"Wine pairing: {recipe['wine_pairing']}")
            if recipe.get("leftovers"):
                st.write(f"Leftover usage: {recipe['leftovers']}")
            if recipe.get("meal_prep"):
                st.write(f"Meal prep: {recipe['meal_prep']}")
            if recipe.get("make_ahead"):
                st.write(f"Make-ahead steps: {recipe['make_ahead']}")
            if recipe.get("side_dishes"):
                st.write(f"Side dish pairings: {', '.join(recipe['side_dishes'])}")
            if recipe.get("storage"):
                st.write(f"Storage: {recipe['storage']}")
            if recipe.get("difficulty"):
                st.write(f"Difficulty: {recipe['difficulty']}")
        else:
            st.error(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        st.error(f"Request failed: {e}") 