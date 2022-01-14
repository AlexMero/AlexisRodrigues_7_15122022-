import Component from "./component.js";

export default class RecetteCard extends Component{

    recipe;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domtarget  [domtarget description]
     * @param   {Object}  props      [props description]
     * @param   {Object}  props.recipe      [props description]
     *
     * @constructor
     */
    constructor(domtarget, props){
        super(domtarget, "article");
        this.hydrate(props);
        this.DOM.classList.add("recetteCard");

        this.ingredientsHtml = this.getIngredientsHtml(this.recipe.ingredients);

        this.render();
    }

    render(){
        this.DOM.innerHTML = /* html */ `
            <div class="image"></div>
            <span class="titre">${this.recipe.name}</span>
            <span class="ingredients">
                ${this.ingredientsHtml}
            </span>
            <span class="temps">${this.recipe.time} min</span>
            <span class="description">${this.recipe.description}</span>
        `;
    }

    /**
     * Create html code for list ingredients in recipe card
     *
     * @param   {Array}  ingredientsList  [ingredientsList description]
     *
     * @return  {String}                   html
     */
    getIngredientsHtml(ingredientsList){
        let html = "";
        ingredientsList.forEach(ingredientObject => {
            html += "<b>"+ingredientObject.ingredient+":</b> "+ingredientObject.quantity+ingredientObject.unit+"<br>";
        });
        return html;
    }
}