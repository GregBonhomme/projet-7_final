//on établis les listes de chaque type de mots clefs

export function getList(select, tab) {
    let list = [];
    switch (select) {
        case "ingredients":
            for (let i = 0; i < tab.length; i++) {

                let ingredients = tab[i].ingredients;
                for (let y = 0; y < ingredients.length; y++) {
                    let name = ingredients[y].ingredient.toLowerCase().split(" (")[0];
                    if (!list.includes(name)) {
                        list.push(name);
                    }
                }
            }
            return list.sort();

        case "appliances":
            for (let i = 0; i < tab.length; i++) {
                let name = tab[i].appliance.toLowerCase().split(" (")[0];
                if (!list.includes(name)) {
                    list.push(name);
                }
            }
            return list.sort();

        case "ustensils":
            for (let i = 0; i < tab.length; i++) {
                let ustensils = tab[i].ustensils
                for (let y = 0; y < ustensils.length; y++) {
                    let name = ustensils[y].toLowerCase().split(" (")[0];
                    if (!list.includes(name)) {
                        list.push(name);
                    }
                }
            }
            return list.sort();
    };
}

//affichage d'une liste de filtre

export function printList(data) {
    const list = document.createElement("div");
    list.setAttribute("class", "filters_list");
    for (let i = 0; i < data.length; i++) {
        const filter = document.createElement("span");
        filter.setAttribute("class", "filter");
        filter.setAttribute("value", data[i].charAt(0).toUpperCase() + data[i].slice(1));
        filter.innerText = data[i].charAt(0).toUpperCase() + data[i].slice(1);
        list.appendChild(filter);
    };
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

//filtrage de la liste de filtres

export function filterList(data, keyword) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes(keyword)) {
            result.push(data[i]);
        }
    }
    return result;
}