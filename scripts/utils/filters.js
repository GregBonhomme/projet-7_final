//on établis les listes de chaque type de mots clefs

export function getList(select, tab) {
    let list = [];
    switch (select) {
        case "ingredients":
            tab.forEach(recipe => {
                recipe.ingredients.forEach(item => {
                    let name = item.ingredient.toLowerCase().split(" (")[0];
                    if (!(list.includes(name))) {
                        list.push(name);
                    };
                })
            });
            return list;

        case "appliances":
            tab.forEach(recipe => {
                let name = recipe.appliance.toLowerCase().split(" (")[0];
                if (!(list.includes(name))) {
                    list.push(name);
                }
            });
            return list;

        case "ustensils":
            tab.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    let name = ustensil.toLowerCase().split(" (")[0];
                    if (!(list.includes(name))) {
                        list.push(name);
                    };
                });
            });
            return list;
    }
}

//affichage d'une liste de filtre

export function printList(data) {
    const list = document.createElement("div");
    list.setAttribute("class", "filters_list");
    data.forEach(element => {
        const filter = document.createElement("span");
        filter.setAttribute("class", "filter");
        filter.setAttribute("value", element.charAt(0).toUpperCase() + element.slice(1));
        filter.innerText = element.charAt(0).toUpperCase() + element.slice(1);
        list.appendChild(filter);
    });
    return list;
}

//mise a jour des filtres disponibles en fonction d'une nouvelle liste de plats

export function updateFilters(data) {
    document.getElementById("ingredients_filters").innerHTML = "";
    document.getElementById("ingredients_filters").appendChild(printList(getList("ingredients", data)));
    document.getElementById("appliances_filters").innerHTML = "";
    document.getElementById("appliances_filters").appendChild(printList(getList("appliances", data)));
    document.getElementById("ustensils_filters").innerHTML = "";
    document.getElementById("ustensils_filters").appendChild(printList(getList("ustensils", data)));
}
