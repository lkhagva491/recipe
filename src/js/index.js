require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe } from "./view/recipeView";
import { highLightSelectedRecipe } from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";

const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    await state.search.doSearch();
    clearLoader();
    if (state.search.result !== undefined)
      searchView.renderRecipes(state.search.result);
    else alert("Хайлтаар үр дүн олдсонгүй!");
  }
};

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    state.recipe = new Recipe(id);
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highLightSelectedRecipe(id);
    await state.recipe.getRecipe();
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    renderRecipe(state.recipe);
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((el) =>
  window.addEventListener(el, controlRecipe)
);

const constrolList = () => {
  state.list = new List();
  listView.clearItem();
  state.recipe.ingredients.forEach((n) => {
    state.list.addItem(n);
    listView.renderItem(n);
  });
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    constrolList();
  }
});
