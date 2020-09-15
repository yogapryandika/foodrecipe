import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global State
 * - Search object
 * - Current recipe object
 * - Shopping recipes
 * - Liked object
 */
const state = {};

/*
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.resultDiv);

    try {
      // 4. search recipes
      await state.search.getResults();

      // 5. render result
      clearLoader();
      searchView.renderResult(state.search.result);
    } catch (e) {
      alert('Something wrong with the search..');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.resPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResult(state.search.result, goToPage);
  }
});

/*
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // prepare UI for changes

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServ();

      // render recipe
      console.log(state.recipe);
    } catch (e) {
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
