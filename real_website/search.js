const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;

// Search button
searchBtn.addEventListener("click", searchMeals);

// Enter key press
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchMeals();
});

// Main search
async function searchMeals() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Special case: "day 1"
    if (searchTerm === "day 1" || searchTerm === "day1") {
        resultHeading.textContent = `Special page: Day 1`;
        mealsContainer.innerHTML = `
            <div class="meal special-meal">
                <img src="img/1.png" alt="Day 1">
                <div class="meal-info">
                    <h3 class="meal-title">Day 1</h3>
                    <div class="meal-category">My Content</div>
                    <p style="padding:0 1rem 1rem;">Click to open the full page.</p>
                    <a href="day1.html" class="hero-btn" style="margin:0 1rem 1rem; display:inline-block;">Open</a>
                </div>
            </div>
        `;
        errorContainer.classList.add("hidden");
        return;
    }

    // Regular API search
    if (!searchTerm) {
        errorContainer.textContent = "Please enter a search term";
        errorContainer.classList.remove("hidden");
        return;
    }

    try {
        resultHeading.textContent = `Searching for "${searchTerm}"...`;
        mealsContainer.innerHTML = "";
        errorContainer.classList.add("hidden");

        const response = await fetch(`${SEARCH_URL}${searchTerm}`);
        const data = await response.json();

        if (data.meals === null) {
            resultHeading.textContent = "";
            mealsContainer.innerHTML = "";
            errorContainer.textContent = `No recipes found for "${searchTerm}". Try another search term!`;
            errorContainer.classList.remove("hidden");
        } else {
            resultHeading.textContent = `Search results for "${searchTerm}":`;
            displayMeals(data.meals);
            searchInput.value = "";
        }
    } catch {
        errorContainer.textContent = "Something went wrong. Try again later.";
        errorContainer.classList.remove("hidden");
    }
}

// Display meals
function displayMeals(meals) {
    mealsContainer.innerHTML = "";
    meals.forEach((meal) => {
        mealsContainer.innerHTML += `
            <div class="meal" data-meal-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info">
                    <h3 class="meal-title">${meal.strMeal}</h3>
                    ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
                </div>
            </div>
        `;
    });
}
