<!-- <!DOCTYPE html> -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <title>Recipe Finder</title>
  </head>
  <body>
    <div class="container">
      <div class="meal-wrapper">
        <h2 class="title" on:click={refreshPage}>Find A Recipe Here</h2>
        <blockquote></blockquote>
        <div class="meal-search">
          <div class="meal-search-box">
            <input
              type="text"
              class="search-control"
              placeholder="Enter ingredients Here"
              id="search"
            />
            <button type="button" class="search-btn btn" id="search-btn" on:click={handleSearch}>
              <i class="fas fa-search"></i>
              
              <!-- Ading this button here to test out loading indicator functionality  -->
              <!-- <button type="button" id="search-btn" on:click={handleSearch}>
                <i class="fas fa-search"></i> -->
                 <!-- Ading this button here to test out loading indicator functionality  -->
            </button>
          </div>
        </div>
       
        <div class="meals-result">
          <h2>Your Recipe Search Results:</h2>
      
          <!-- Loading Indicator in its own div -->
          {#if $loading.status === 'LOADING'}
              <div class="loading-indicator">
                  <Loading />
              </div>
          {/if}
      
          <div id="meal">
              {#if Array.isArray(meals) && meals.length > 0}
                  {#each meals as meal}
                      <div class="meal-item" data-id="{meal.idMeal}">
                          <div class="meal-img">
                              <img src="{meal.strMealThumb}" alt="food">
                          </div>
                          <div class="meal-name">
                              <h3>{meal.strMeal}</h3>
                              <a href="#" class="recipe-btn">Get Recipe</a>
                          </div>
                      </div>
                  {/each}
              {/if}
          </div>
      
          {#if !($loading.status === 'LOADING') && hasSearched && (!Array.isArray(meals) || meals.length === 0)}
              <div id="no-results">
                  <p class="results-message">Sorry, we didn't find any recipes to share!</p>
                  <!-- <li>Try searching a different ingredient</li>
                  <li>If you are looking to start over, try refreshing the page</li> -->
                  <h1>Oops!</h1>
                  <a on:click={refreshPage}>Go back to Homepage</a>
              </div>
          {/if}
      </div>
      

        <div class="meal-details">
          <button
            type="button"
            class="btn recipe-close-btn"
            id="recipe-close-btn"
          >
            <i class="fas fa-times"></i>
          </button>
          <!-- meal recipe content -->
          <dialog id="recipe-dialog">
            <button class="dialog-close-btn" id="dialog-close-btn">&times;</button>
          <div class="meal-details-content">
            <h2 class="recipe-title">Meal Name</h2>
            <p class="recipe-category">Type of Meal</p>
            <div class="recipe-instructions">
              <h3>Instructions:</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, eligendi quam nisi libero possimus minus
                temporibus id minima at blanditiis quidem, delectus impedit iste
                ipsa itaque placeat iusto veniam quia.
              </p>
            </div>
            <div class="recipe-meal-img">
                <img
              src="https://media.istockphoto.com/id/1443993866/photo/french-fries-with-ketchup-and-cocktail-sauce.jpg?s=612x612&w=0&k=20&c=URpOsc5tds8tOfxK4ZO3Tkx6mwLho7fL_pTBSNdziBU="
              alt=""
            />
            </div>
        
            <div class="recipe-link">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href= "#" target= "_blank">Recipe Video</a>
            </div>
          </div>
        </dialog>
        </div>
      </div>
    </div>
  </body>
</html>




<script>
    import { onMount } from 'svelte';
    import { loading, setNavigate } from '$lib/loading';
    import { initializeEventListeners } from '../routes/+server.js'; // Adjust the path to where your client-side logic is
  
    /**
   * @type {string | any[]}
   */
     export let meals = []; // Default to an empty array

    import './styles.css';
  import { writable } from 'svelte/store'
  import Loading from '$lib/loading.svelte';
  import { error } from '@sveltejs/kit';

  
 

  
    /**
   * @param {any} query
   */
    async function fetchMeals(query) {
      loading.setLoading(true);
      

      /**
       * @type {string | any[]}
       */
      let fetchedMeals = [];

      try {
        const timeout = new Promise ((resolve) => {
          setTimeout(() => {
            resolve("done");

          }, 2000)
        })
        const request = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`); // gets data from themealDB
        const [response] = await Promise.all([request, timeout])
        if (!response.ok) {
          // @ts-ignore
          throw new error('Network response was not ok:', error)
        }
        const data = await response.json(); // decodes data
        loading.setLoading(false)
        fetchedMeals = Array.isArray(data.meals) ? data.meals : []; // making sure fetched meals has new data 
        meals = fetchedMeals
      } catch (error) {
        loading.setLoading(false)
        console.error('Error fetching meals:', error)
      } 
        
        
      
    }

    let hasSearched = false;


    function handleSearch() {
      // @ts-ignore
      const query = document.getElementById('search').value;
      meals = []
      hasSearched = true;
      fetchMeals(query);
    }


 function refreshPage() {
  location.reload();

 };
    
  
    // Initialize event listeners when component mounts
    onMount(() => {
      initializeEventListeners();
    });
  



  </script>
  


  


