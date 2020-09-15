import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global State
 * - Search object
 * - Current recipe object
 * - Shopping recipes
 * - Liked object
 */
const state = {};

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

    // 4. search recipes
    await state.search.getResults();

    // 5. render result
    clearLoader();
    searchView.renderResult(state.search.result);
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
