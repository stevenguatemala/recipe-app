// // @ts-ignore
// @ts-ignore
import { getMealList, getMealRecipe } from '../lib/utils';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
 
  return new Response('Server-side GET request');
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














// /** @type {import('./$types').RequestHandler} */
// export async function GET() {
//   // Your server-side logic here
//   return new Response();
// }


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
// // @ts-ignore
// export async function getMealRecipe(id) {
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//     const data = await response.json();
//     return data;
// }


// export async function load() {
//     try {
//       const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=someIngredients'); 
//       const data = await response.json();
//       return {
//         props: {
//           meals: data.meals || []
//         }
//       };
//     } catch (error) {
//       console.error('Error fetching meals:', error);
//       return {
//         props: {
//           meals: []
//         }
//       };
//     }
//   }
  