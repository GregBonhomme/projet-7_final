export function applyKeywords(data, keywords) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        let matches = 0;
        for (let j = 0; j < keywords.length; j++) {
            if (testKeyword(data[i], keywords[j])) {
                matches++;
            }
        }
        if (matches == (keywords.length)) {
            result.push(data[i]);
        }
    }
    return result;
}

function testKeyword(item, keyword) {
    let string = keyword.toLowerCase();
    let ingredients_list = [];
    for (let i = 0; i < item.ingredients.length; i++) {
        ingredients_list.push(item.ingredients[i].ingredient.toLowerCase());
    }
    let ustensils_list = [];
    for (let j = 0; j < item.ustensils.length; j++) {
        ustensils_list.push(item.ustensils[j].toLowerCase());

    }
    let name = item.name.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
    let description = item.description.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");

    if (testString(name, string)) {
        return true;
    }
    if (testString(description, string)) {
        return true;
    }
    if (testString(ingredients_list, string)) {
        return true;
    }
    if (testString(ustensils_list, string)) {
        return true;
    }
    if (testString(item.appliance, string)) {
        return true;
    }
    return false;
}

function testString(text, string) {
    for (let i = 0; i < text.length; i++) {
        if (text[i].includes(string)) {
            return true;
        }
    }
    return false;
}
