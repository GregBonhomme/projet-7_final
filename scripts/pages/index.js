import { Recipe } from "../models/recipe.js";
import { galleryTemplate, filterGallery } from "../templates/gallery.js";
import { getList, printList, applyFilter, updateFilters } from "../utils/filters.js";
import { tagsListTemplate } from "../templates/tags.js";

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
    const tags_list = tagsListTemplate(tags);
    const ingredients_filters_list = printList(getList("ingredients", recipes));
    const appliances_filters_list = printList(getList("appliances", recipes));
    const ustensils_filters_list = printList(getList("ustensils", recipes));

    ingredients_filters.appendChild(ingredients_filters_list);
    appliances_filters.appendChild(appliances_filters_list);
    ustensils_filters.appendChild(ustensils_filters_list);
    recipes_zone.appendChild(gallery);
    tags_zone.appendChild(tags_list);

    const filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
        if (tags.includes(filter.innerText)) {
            filter.setAttribute("active", true);
            const filter_closeBtn = document.createElement("span");
            filter_closeBtn.setAttribute("class", "material-symbols-outlined tag_closeBtn");
            filter_closeBtn.innerText = "close";
            filter.appendChild(filter_closeBtn);
        } else {
            filter.addEventListener("click", () => {
                tags.push(filter.innerText);
                recipes = filterGallery(tags, allRecipes);
                updateFilters(recipes);
                setPageInfo();
            })
        }
    });

    const tag_closeBtns = document.querySelectorAll(".tag_closeBtn");
    tag_closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.parentElement);
            let targetTag = btn.parentElement.getAttribute("value");
            console.log(btn.parentElement.getAttribute("value"));
            tags = tags.filter((tag) => tag != targetTag);
            console.log(tags);
            recipes = filterGallery(tags, allRecipes);
            updateFilters(recipes);
            setPageInfo();
        })
    })
};

setPageInfo();

//mise a jour de la liste des filtres grace a leur barre de recherche dédiée

const ingredients_filter = document.querySelector("#ingredients_searchbar input");
ingredients_filter.addEventListener("input", () => {
    let filter = ingredients_filter.value;
    document.getElementById("ingredients_filters").innerHTML = "";
    document.getElementById("ingredients_filters").appendChild(printList(applyFilter(filter, getList("ingredients", recipes))));
});

const appliances_filter = document.querySelector("#appliances_searchbar input");
appliances_filter.addEventListener("input", () => {
    let filter = appliances_filter.value;
    document.getElementById("appliances_filters").innerHTML = "";
    document.getElementById("appliances_filters").appendChild(printList(applyFilter(filter, getList("appliances", recipes))));
});

const ustensils_filter = document.querySelector("#ustensils_searchbar input");
ustensils_filter.addEventListener("input", () => {
    let filter = ustensils_filter.value;
    document.getElementById("ustensils_filters").innerHTML = "";
    document.getElementById("ustensils_filters").appendChild(printList(applyFilter(filter, getList("ustensils", recipes))));
});