import { updateInputSearchValue, updatedRecipeList } from "../services/dataManager.js";
import Component from "./component.js";
import { updateRecipeContainer } from "./recipeContainer.js";

export default class SearchInput extends Component {
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget){
        super(domTarget, "input");
        this.DOM.setAttribute("type", "text");
        this.DOM.setAttribute("id", "searchInput");
        this.DOM.setAttribute("placeholder", "Rechercher un ingrédient, appareil, ustensiles ou une recette");
        this.DOM.className = "search form-control";
        this.DOM.onkeyup = this.onkeyup;
    }

    onkeyup(){
        // @ts-ignore
        updateInputSearchValue(document.getElementById("searchInput").value);
        updatedRecipeList();
        updateRecipeContainer();
    }
}