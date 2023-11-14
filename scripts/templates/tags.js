function tagTemplate(string) {

    const tag = document.createElement("span");
    tag.setAttribute("class", "tag");
    tag.setAttribute("value", string);
    tag.innerText = string;
    const closeBtn = document.createElement("span");
    closeBtn.setAttribute("class", "material-symbols-outlined tag_closeBtn");
    closeBtn.innerText = "close";

    tag.appendChild(closeBtn);
    return tag;
}

export function tagsListTemplate(data) {
    const tagsList = document.createElement("div");
    tagsList.setAttribute("id", "tags_list");
    data.forEach(tag => {
        tagsList.appendChild(tagTemplate(tag.toString()));
    });
    return tagsList;
}