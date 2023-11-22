
function testKeyword(keyword, item) {
    let string = keyword.toLowerCase();
    let ingredients_list = [];
    item.ingredients.forEach(element => {
        ingredients_list.push(element.ingredient.toLowerCase());
    });
    let ustensils_list = []
    item.ustensils.forEach(ustensil => {
        ustensils_list.push(ustensil.toLowerCase());
    })
    if (item.name.toLowerCase().includes(string) || item.description.toLowerCase().includes(string) || ingredients_list.includes(string) || ustensils_list.includes(string) || item.appliance.toLowerCase().includes(string)) {
        return true;
    } else {
        return false;
    }
}

export function applyKeywords(tab, keywords) {
    let result = [];
    tab.forEach(element => {
        if (keywords.every(r => testKeyword(r, element))) {
            result.push(element);
        }
    });
    return result;
}