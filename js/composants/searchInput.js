import Component from "./component.js";

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
        this.DOM.setAttribute("placeholder", "Rechercher un ingrédient, appareil, ustensiles ou une recette");
        this.DOM.className = "search form-control";
    }
}