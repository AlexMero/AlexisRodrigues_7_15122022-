import Component from "../composants/component.js";
import Dropdown from "../composants/dropdown.js";
import SearchInput from "../composants/searchInput.js";
import { getAllData } from "../services/dataManager.js";
import { insertRecipeContainer } from "../composants/recipeContainer.js";
import { insertTagContainer } from "../composants/tagContainer.js";

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

        const recipesList = getAllData();

        insertTagContainer(this.DOM);

        const dropdownContent = document.createElement("section");
        dropdownContent.className = "dropdownContent";
        new Dropdown(dropdownContent, {"classAdditionnel": "bleu", "name": "Ingrédients"});
        new Dropdown(dropdownContent, {"classAdditionnel": "vert", "name": "Appareil"});
        new Dropdown(dropdownContent, {"classAdditionnel": "rouge", "name": "Ustensiles"});
        this.DOM.appendChild(dropdownContent);

        insertRecipeContainer(this.DOM, recipesList);
        // const recetteCardContent = document.createElement("section");
        // recetteCardContent.className = "recetteCardContent";
        // recipesList.forEach(recipe => {
        //     new RecetteCard(recetteCardContent, {"recipe": recipe});
        // });
        // this.DOM.appendChild(recetteCardContent);
    }
}