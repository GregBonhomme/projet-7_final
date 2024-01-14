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
    for (let i = 0; i < data.length; i++) {
        tagsList.appendChild(tagTemplate(data[i].toString()));
    };
    return tagsList;
};

