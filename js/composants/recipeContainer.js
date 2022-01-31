import RecetteCard from "../composants/recetteCard.js";
import { updatedRecipeList } from "../services/dataManager.js";

const DOM = document.createElement("section");
DOM.className = "recetteCardContent";

function insertRecipeContainer(domTarget, recipeList){
    domTarget.appendChild(DOM);
    recipeList.forEach(recipe => {
        new RecetteCard(DOM, {"recipe": recipe});
    });
}

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