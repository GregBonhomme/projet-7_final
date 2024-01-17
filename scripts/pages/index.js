import { Recipe } from "../models/recipe.js";
import { galleryTemplate } from "../templates/gallery.js";
import { getList, printList, updateFilters, filterList } from "../utils/filters.js";
import { tagsListTemplate } from "../templates/tags.js";
import { applyKeywords } from "../utils/keywords.js";
import { benchmark, TestArray } from "../utils/benchmark.js";

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
let searchbarKeywords = [];
let keywords = [];
for (let i = 0; i < recipes_data.length; i++) {
    allRecipes.push(new Recipe(recipes_data[i]));
}

function setPageInfo(data) {

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

    updateFilters(data);
    filterTrigger();

    const tag_closeBtns = document.querySelectorAll(".tag_closeBtn");
    for (let i = 0; i < tag_closeBtns.length; i++) {
        let btn = tag_closeBtns[i];
        btn.addEventListener("click", () => {
            console.log(btn.parentElement);
            let targetTag = btn.parentElement.getAttribute("value");
            console.log(btn.parentElement.getAttribute("value"));
            let newTags = [];
            for (let j = 0; j < tags.length; j++) {
                if (tags[j] != targetTag) {
                    newTags.push(tags[j]);
                }
            }
            tags = newTags;
            keywordsUpdate();
            setPageInfo(applyKeywords(allRecipes, keywords));
        })
    }
}

setPageInfo(allRecipes);

//mise a jour de la liste des filtres grace a leur barre de recherche dédiée

const ingredients_filter = document.querySelector("#ingredients_searchbar input");
ingredients_filter.addEventListener("input", () => {
    let filter = sanitizer(ingredients_filter.value);
    document.getElementById("ingredients_filters").innerHTML = "";
    document.getElementById("ingredients_filters").appendChild(printList(filterList(getList("ingredients", applyKeywords(allRecipes, keywords)), filter)));
    filterTrigger();
});

const appliances_filter = document.querySelector("#appliances_searchbar input");
appliances_filter.addEventListener("input", () => {
    let filter = sanitizer(appliances_filter.value);
    document.getElementById("appliances_filters").innerHTML = "";
    document.getElementById("appliances_filters").appendChild(printList(filterList(getList("appliances", applyKeywords(allRecipes, keywords)), filter)));
    filterTrigger();
});

const ustensils_filter = document.querySelector("#ustensils_searchbar input");
ustensils_filter.addEventListener("input", () => {
    let filter = sanitizer(ustensils_filter.value);
    document.getElementById("ustensils_filters").innerHTML = "";
    document.getElementById("ustensils_filters").appendChild(printList(filterList(getList("ustensils", applyKeywords(allRecipes, keywords)), filter)));
    filterTrigger();
});

//mise a jour de la liste des mots clefs de recherche

function keywordsUpdate() {
    keywords = tags.concat(searchbarKeywords);
}

//mise a jour de la page grace a la barre de recherche principale

const searchbar = document.querySelector("#searchbar input");
searchbar.addEventListener("input", () => {
    let search = sanitizer(searchbar.value);
    let searchWords = search.split(" ");
    searchbarKeywords = [];
    for (let i = 0; i < searchWords.length; i++) {
        if (searchWords[i].length >= 3) {
            searchbarKeywords.push(searchWords[i]);
        }
    }
    keywordsUpdate();
    setPageInfo(applyKeywords(allRecipes, keywords));
});

//mise en place des actions de filtre sur chacun des filtres

function filterTrigger() {
    const filters = document.querySelectorAll(".filter");
    for (let i = 0; i < filters.length; i++) {
        let matches = 0;
        for (let j = 0; j < tags.length; j++) {
            if (tags[j] == filters[i].innerText) {
                matches++;
            }
        }
        if (matches > 0) {
            filters[i].setAttribute("active", true);
            const filter_closeBtn = document.createElement("span");
            filter_closeBtn.setAttribute("class", "material-symbols-outlined tag_closeBtn");
            filter_closeBtn.innerText = "close";
            filters[i].appendChild(filter_closeBtn);
        } else {
            filters[i].addEventListener("click", () => {
                tags.push(filters[i].innerText);
                let filteredRecipes = applyKeywords(allRecipes, tags);
                updateFilters(filteredRecipes);
                setPageInfo(filteredRecipes);
                ingredients_filter.value = "";
                appliances_filter.value = "";
                ustensils_filter.value = "";
            })
        }
    }
}

//fonction de suppression des charactères spéciaux

function sanitizer(string) {
    return string.replace(/[~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_]/g, '');
}


//ouverture et fermeture des menus de sélections des filtres

const accordionMenus = document.querySelectorAll(".accordion");
accordionMenus.forEach(menu => {
    console.log(menu.querySelector(".accordion-header"));
    menu.querySelector(".accordion-header").addEventListener("click", () => {
        menu.classList.toggle("opened");
        menu.querySelector(".accordion-arrow").classList.toggle("collapsed")
        menu.querySelector(".accordion-collapse").classList.toggle("show")
    })
})


console.log(benchmark(function () {
    for (let i = 0; i < TestArray.length; i++) {
        applyKeywords(allRecipes, TestArray[i]);
    }
}))