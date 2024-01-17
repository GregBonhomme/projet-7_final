function displayIngredients(data) {
    const list = document.createElement("div");
    list.setAttribute("class", "ingredients_list");
    data.forEach(item => {
        const element = document.createElement("div");
        element.setAttribute("class", "ingredient");
        const name = document.createElement("span");
        name.setAttribute("class", "ingredient_name");
        name.innerText = item.ingredient;
        const info = document.createElement("span");
        info.setAttribute("class", "ingredient_info");
        info.innerText = (item.quantity != undefined ? item.quantity : "") + " " + (item.unit != undefined ? item.unit : "");

        element.appendChild(name);
        element.appendChild(info);
        list.appendChild(element);
    });
    return list;
}


function cardTemplate(data) {
    const card = document.createElement("article");
    card.setAttribute("class", "card");
    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    const time = document.createElement("div");
    time.setAttribute("class", "card_time");
    time.innerText = data.time + " min";
    const body = document.createElement("div");
    body.setAttribute("class", "card-body");
    const title = document.createElement("h3");
    title.innerText = data.name;
    const description = document.createElement("section");
    description.setAttribute("class", "card-description");
    const recipe_subtitle = document.createElement("h4");
    recipe_subtitle.innerText = "Recette";
    const recipe_description = document.createElement("span");
    recipe_description.innerText = data.description;
    const ingredients = document.createElement("section");
    ingredients.setAttribute("class", "card-ingredients");
    const ingredients_subtitle = document.createElement("h4");
    ingredients_subtitle.innerText = "Ingrédients";
    const ingredients_list = displayIngredients(data.ingredients);

    description.appendChild(recipe_subtitle);
    description.appendChild(recipe_description);
    ingredients.appendChild(ingredients_subtitle);
    ingredients.appendChild(ingredients_list);
    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(ingredients);
    card.appendChild(img);
    card.appendChild(time);
    card.appendChild(body);
    return card;
}


export function galleryTemplate(data) {
    const gallery = document.createElement("div");
    gallery.setAttribute("id", "gallery");
    data.forEach(recipe => {
        gallery.appendChild(cardTemplate(recipe));
    });
    return gallery;
}
