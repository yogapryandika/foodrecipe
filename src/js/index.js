import Search from './models/Search';

/* Global State
 * - Search object
 * - Current recipe object
 * - Shopping recipes
 * - Liked object
 */
const state = {};

const controlSearch = async () => {
  // 1. get query from view
  const query = 'pizza';

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. prepare UI for results

    // 4. search recipes
    await state.search.getResults();

    // 5. render result
    console.log(state.search.result);
  }
};

document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
