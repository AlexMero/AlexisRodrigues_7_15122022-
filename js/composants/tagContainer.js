import Tag from "../composants/tag.js";
import { getTagList } from "../services/dataManager.js";

const DOM = document.createElement("section");
DOM.className = "tagContent";

function insertTagContainer(domTarget){
    domTarget.appendChild(DOM);
}

function updateTagContainer(){
    const tagList = getTagList();
    DOM.innerHTML = "";
    tagList.forEach(tag => {
        const element = tag.element;
        const type = tag.type;
        new Tag(DOM, { "name": element, "type": type});
    });
}

export {
    insertTagContainer,
    updateTagContainer
};