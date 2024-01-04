let throttleTimer;

document.getElementById('recipeSearch').addEventListener('input', function(event) {
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(function() {
        fetchRecipes(event.target.value);
    }, 1000); // Adjust the throttle delay as needed
});

function fetchRecipes(query) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateRecipeResults(data.meals);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function updateRecipeResults(recipes) {
    const recipeResultsDiv = document.getElementById('recipeResults');
    recipeResultsDiv.innerHTML = ''; // Clear previous results

    if (recipes) {
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card'); // Add your styles here

            const title = document.createElement('h3');
            title.textContent = recipe.strMeal;

            const category = document.createElement('p');
            category.textContent = `Category: ${recipe.strCategory}`;

            recipeCard.appendChild(title);
            recipeCard.appendChild(category);
            recipeResultsDiv.appendChild(recipeCard);
        });
    } else {
        recipeResultsDiv.innerHTML = 'No results found';
    }
}