import RecetteCard from "../composants/recetteCard.js";
import { updatedRecipeList } from "../services/dataManager.js";

const DOM = document.createElement("section");
DOM.className = "recetteCardContent";

/**
 * fonction class constructor
 *
 * @param   {HTMLElement}   domTarget           target html element
 * @param   {Array}         recipeList          list array
 *
 * @return  {Void}                              constructor
 */
function insertRecipeContainer(domTarget, recipeList){
    domTarget.appendChild(DOM);
    recipeList.forEach(recipe => {
        new RecetteCard(DOM, {"recipe": recipe});
    });
}

/**
 * refresh (update) recipeContainer content
 *
 * @return  {Void}
 */
function updateRecipeContainer(){
    const recipeList = updatedRecipeList();
    DOM.innerHTML = "";
    recipeList.forEach(recipe => {
        new RecetteCard(DOM, {"recipe": recipe});
    });
}

export {
    insertRecipeContainer,
    updateRecipeContainer
};