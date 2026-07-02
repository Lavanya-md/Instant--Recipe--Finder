//  Grab the elements from our HTML page so JavaScript can control them
const searchBtn = document.getElementById('search-btn');
const ingredientInput = document.getElementById('ingredient-input');
const recipeGrid = document.getElementById('recipe-grid');

//  Listen for when the user clicks the "Find Recipes" button
searchBtn.addEventListener('click', () => {
    const ingredient = ingredientInput.value.trim();
    
    // Safety check: If they clicked search without typing anything, stop here
    if (ingredient === "") {
        alert("Please enter an ingredient first!");
        return;
    }

    // Show a temporary loading message in our grid
    recipeGrid.innerHTML = "<p>Searching for delicious meals...</p>";

    // THE API CONNECTION: Ask the online database for data
    // We send a request to TheMealDB server using the ingredient the user typed
    const apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL)
        .then(response => response.json()) // Turn the raw internet data into a readable JSON object
        .then(data => {
            recipeGrid.innerHTML = ""; // Clear out our temporary loading message

            // If the database returns nothing, tell the user
            if (!data.meals) {
                recipeGrid.innerHTML = "<p>No recipes found. Try 'chicken', 'tomato', or 'egg'!</p>";
                return;
            }

            // THE LOOP: Go through every single meal found and create a visual card
            data.meals.forEach(meal => {
                // Create a brand new <div> box out of thin air for this specific recipe
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                // Fill that new box with an image, titles, and a search link
                recipeCard.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div style="padding: 15px;">
                        <h4 style="margin: 0 0 10px 0; color: #b6e24f;">${meal.strMeal}</h4>
                        <a href="https://www.google.com/search?q=${encodeURIComponent(meal.strMeal)}+recipe" target="_blank" style="color: #dda15e; text-decoration: none; font-weight: bold; font-size: 0.9rem;">View Recipe →</a>
                    </div>
                `;

                // Stick this newly built card directly into our webpage grid
                recipeGrid.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error("Error:", error);
            recipeGrid.innerHTML = "<p>Something went wrong. Please check your internet connection!</p>";
        });
});
