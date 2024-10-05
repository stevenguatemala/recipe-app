import { getMealRecipe } from "../lib/utils";

export function initializeEventListeners() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search");
  const mealList = document.getElementById("meal");
  const mealDetailsContent = document.querySelector(".meal-details-content");
  const recipeCloseBtn = document.getElementById("recipe-close-btn");
  const recipeDialog = document.getElementById("recipe-dialog");
  const dialogCloseBtn = document.getElementById("dialog-close-btn");
// Check if all selected elements are present before adding event listeners
  if (
    searchBtn &&
    searchInput &&
    mealList &&
    mealDetailsContent &&
    recipeCloseBtn &&
    recipeDialog &&
    dialogCloseBtn
  ) {
    // searchBtn.addEventListener('click', getMealList);
    mealList.addEventListener("click", async (e) => {
      // @ts-ignore
      if (e.target.classList.contains("recipe-btn")) {
        // @ts-ignore
        const mealItem = e.target.closest(".meal-item");
        if (mealItem) {
          const mealID = mealItem.getAttribute("data-id");
          try {
            const data = await getMealRecipe(mealID);
            mealRecipeModal(data.meals);
          } catch (error) {
            console.error("Error fetching meal recipe:", error);
          }
        }
      }
    });
    dialogCloseBtn.addEventListener("click", () => {
      // @ts-ignore
      recipeDialog.close();
    });
    recipeCloseBtn.addEventListener("click", () => {
      // @ts-ignore
      mealDetailsContent.parentElement.classList.remove("showRecipe");
    });
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
      }
    });
  }
}

/**
 * @param {string | any[]} meals
 */
function mealRecipeModal(meals) {
  if (!meals || meals.length === 0) {
    console.error("No meals data available.");
    return;
  }
  const meal = meals[0]; // Get the first meal from the array
 // Construct the HTML to display the meal details
  const html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    // Select the meal details content and recipe dialog elements
  const mealDetailsContent = document.querySelector(
    "#recipe-dialog .meal-details-content"
  );
  const recipeDialog = document.getElementById("recipe-dialog");

  if (mealDetailsContent && recipeDialog) {
    mealDetailsContent.innerHTML = html;
    // @ts-ignore
    recipeDialog.showModal();
  } else {
    console.error("Modal elements not found.");
  }
}
