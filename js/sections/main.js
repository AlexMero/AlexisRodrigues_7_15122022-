import Component from "../composants/component.js";
import Dropdown from "../composants/dropdown.js";
import SearchInput from "../composants/searchInput.js";
import { insertRecipeContainer } from "../composants/recipeContainer.js";
import { insertTagContainer } from "../composants/tagContainer.js";
import {recipes} from "../datas/datas.js";

export default class Main extends Component {
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget){
        super(domTarget, "main");
        new SearchInput(this.DOM);

        insertTagContainer(this.DOM);

        const dropdownContent = document.createElement("section");
        dropdownContent.className = "dropdownContent";
        // @ts-ignore
        window.ddIngredients = new Dropdown(dropdownContent, {"classAdditionnel": "bleu", "name": "Ingrédients"});
        // @ts-ignore
        window.ddAppareils = new Dropdown(dropdownContent, {"classAdditionnel": "vert", "name": "Appareil"});
        // @ts-ignore
        window.ddUstensils = new Dropdown(dropdownContent, {"classAdditionnel": "rouge", "name": "Ustensiles"});
        this.DOM.appendChild(dropdownContent);

        insertRecipeContainer(this.DOM, recipes);
    }
}