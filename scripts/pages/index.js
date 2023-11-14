import { Recipe } from "../models/recipe.js";
import { galleryTemplate } from "../templates/gallery.js";

//on vérifie si les informations sont dans le local storage

let recipesData = window.localStorage.getItem('recipesData');
if (recipesData === null) {
    const info = await fetch("data/recipes.json");
    recipesData = await info.json();
    const tempData = JSON.stringify(recipesData);
    window.localStorage.setItem('recipesData', tempData);
} else {
    recipesData = JSON.parse(recipesData);
}

//affichage initial de la page

const recipes_data = recipesData.recipes;
let allRecipes = [];
let tags = [];
recipes_data.forEach(element => {
    allRecipes.push(new Recipe(element));
});
let recipes = allRecipes;

function setPageInfo() {
    console.log(tags);
    const recipes_zone = document.getElementById("recipes_zone");
    recipes_zone.innerHTML = "";
    const ingredients_filters = document.getElementById("ingredients_filters");
    ingredients_filters.innerHTML = "";
    const appliances_filters = document.getElementById("appliances_filters");
    appliances_filters.innerHTML = "";
    const ustensils_filters = document.getElementById("ustensils_filters");
    ustensils_filters.innerHTML = "";
    const tags_zone = document.getElementById("tags_zone");
    tags_zone.innerHTML = "";
    const counter = document.getElementById("recipe_counter");
    counter.setAttribute("class", "recipe_counter");
    counter.innerText = recipes.length + " recettes";

    const gallery = galleryTemplate(recipes);

    recipes_zone.appendChild(gallery);
}

setPageInfo();