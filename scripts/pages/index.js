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
export let tags = [];
recipes_data.forEach(element => {
    allRecipes.push(new Recipe(element));
});
let recipes = allRecipes;

function setPageInfo(data) {
    console.log(data);
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
    counter.innerText = data.length + " recettes";

    const gallery = galleryTemplate(data);
    const tags_list = tagsListTemplate(tags);
    const ingredients_filters_list = printList(getList("ingredients", data));
    const appliances_filters_list = printList(getList("appliances", data));
    const ustensils_filters_list = printList(getList("ustensils", data));

    ingredients_filters.appendChild(ingredients_filters_list);
    appliances_filters.appendChild(appliances_filters_list);
    ustensils_filters.appendChild(ustensils_filters_list);
    recipes_zone.appendChild(gallery);
    tags_zone.appendChild(tags_list);

    filterTrigger();

    const tag_closeBtns = document.querySelectorAll(".tag_closeBtn");
    tag_closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.parentElement);
            let targetTag = btn.parentElement.getAttribute("value");
            console.log(btn.parentElement.getAttribute("value"));
            tags = tags.filter((tag) => tag != targetTag);
            console.log(tags);
            let newList = filterGallery(tags, filterGallery(searchWords, allRecipes));
            updateFilters(newList);
            setPageInfo(newList);
        })
    })
};

setPageInfo(allRecipes);

//mise a jour de la liste des filtres grace a leur barre de recherche dédiée

const ingredients_filter = document.querySelector("#ingredients_searchbar input");
ingredients_filter.addEventListener("input", () => {
    let filter = ingredients_filter.value;
    document.getElementById("ingredients_filters").innerHTML = "";
    document.getElementById("ingredients_filters").appendChild(printList(applyFilter(filter, getList("ingredients", recipes))));
    filterTrigger();
});

const appliances_filter = document.querySelector("#appliances_searchbar input");
appliances_filter.addEventListener("input", () => {
    let filter = appliances_filter.value;
    document.getElementById("appliances_filters").innerHTML = "";
    document.getElementById("appliances_filters").appendChild(printList(applyFilter(filter, getList("appliances", recipes))));
    filterTrigger();
});

const ustensils_filter = document.querySelector("#ustensils_searchbar input");
ustensils_filter.addEventListener("input", () => {
    let filter = ustensils_filter.value;
    document.getElementById("ustensils_filters").innerHTML = "";
    document.getElementById("ustensils_filters").appendChild(printList(applyFilter(filter, getList("ustensils", recipes))));
    filterTrigger();
});

//mise a jour de la page grace a la barre de recherche principale

const searchbar = document.querySelector("#searchbar input");
let search = "";
let searchWords = [];

searchbar.addEventListener("input", () => {
    search = searchbar.value;
    searchWords = search.split(" ");
    console.log(searchWords);
    if (search.length >= 3) {
        recipes = filterGallery(searchWords, filterGallery(tags, allRecipes));
        updateFilters(recipes);
        setPageInfo(recipes);
    } else {
        recipes = filterGallery(tags, allRecipes);
        updateFilters(recipes);
        setPageInfo(recipes);
    }
});

//mise en place des actions de filtre sur chacun des filtres

function filterTrigger() {
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
                let filteredRecipes = filterGallery(tags, recipes);
                updateFilters(filteredRecipes);
                setPageInfo(filteredRecipes);
                ingredients_filter.value = "";
                appliances_filter.value = "";
                ustensils_filter.value = "";
            })
        }
    })
};