require("@babel/polyfill");
import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(
        "https://forkify-api.herokuapp.com/api/get?rId=" + this.id
      );
      this.publisher = result.data.recipe.publisher;
      this.ingredients = result.data.recipe.ingredients;
      this.source_url = result.data.recipe.source_url;
      this.image_url = result.data.recipe.image_url;
      this.social_rank = result.data.recipe.social_rank;
      this.publisher_url = result.data.recipe.publisher_url;
      this.title = result.data.recipe.title;
    } catch (error) {
      console.log("Алдаа гарлаа! " + error);
    }
  }

  calcTime() {
    this.time = this.ingredients.length * 5;
  }

  calcHuniiToo() {
    this.huniiToo = 4;
  }
}
