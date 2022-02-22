import Tag from "../composants/tag.js";
import { getTagList } from "../services/dataManager.js";

const DOM = document.createElement("section");
DOM.className = "tagContent";

/**
 * fonction class constructor
 *
 * @param   {HTMLElement}   domTarget           target html element
 *
 * @return  {Void}                              constructor
 */
function insertTagContainer(domTarget){
    domTarget.appendChild(DOM);
}

/**
 * refresh (update) tagContainer content
 *
 * @return  {Void}
 */
function updateTagContainer(){
    const tagList = getTagList();
    DOM.innerHTML = "";
    for (const type in tagList){
        tagList[type].forEach(element => {
            new Tag(DOM, {"name": element, "type": type});
        });
    }
}

export {
    insertTagContainer,
    updateTagContainer
};