// /**
//  * @param {any} query
//  */
// export async function getMealList(query) {
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
//     const data = await response.json();
//     return data;
// }

// /**
//  * @param {any} id
//  */
// export async function getMealRecipe(id) {
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//     const data = await response.json();
//     return data;
// }

// src/lib/utils.js

/**
 * Fetch meal recipe by ID from the API
 * @param {string} id - Meal ID
 * @returns {Promise<any>} - The fetched data
 */
export async function getMealRecipe(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
}

/**
 * Fetch meal list from the API
 * @param {string} query - Ingredients to search for
 * @returns {Promise<any>} - The fetched data
 */
export async function getMealList(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
    const data = await response.json();
    return data;
}
