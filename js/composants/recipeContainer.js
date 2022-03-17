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
    if (recipeList.length > 0) {
        recipeList.forEach(recipe => {
            new RecetteCard(DOM, {"recipe": recipe});
        });
    } else {
        DOM.innerHTML = `
            <p class="no-answer">Aucune recette ne correspond à votre critère ...</p>
        `;
    }
}

export {
    insertRecipeContainer,
    updateRecipeContainer
};