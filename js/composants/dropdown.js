import { addTag, updateDropdown } from "../services/dataManager.js";
import Component from "./component.js";
import { exposeMethod } from "../services/utils.js";
import { updateRecipeContainer } from "./recipeContainer.js";
import { updateTagContainer } from "./tagContainer.js";

export default class Dropdown extends Component {

    name;

    classAdditionnel;

    open;

    /**
     *
     * @param   {HTMLElement}  domTarget
     * @param   {Object}  props
     * @param   {String}  props.name                dropdown's name
     * @param   {String}  props.classAdditionnel    dropdown's classname (color)
     *
     * @constructor
     */
    constructor(domTarget, props){
        super(domTarget, "div");
        this.hydrate(props);
        this.open = false;
        this.DOM.className = this.classAdditionnel;
        this.DOM.onclick = this.click.bind(this);
        this.render();
        exposeMethod("selectTag", this.clickOnTag.bind(this));
        exposeMethod("updateDropdown_"+this.name, this.refreshUl.bind(this));
    }

    render(){
        if (this.open === false) {
            this.DOM.classList.remove("openDropdown");
            this.DOM.classList.add("closeDropdown");
            this.DOM.innerHTML = /*html*/ `
                ${this.name}
                <i class="fas fa-angle-down"></i>
            `;
            return;
        }
        this.DOM.classList.remove("closeDropdown");
        this.DOM.classList.add("openDropdown");
        this.templateDropdownOpen();
    }

    click(){
        if (this.open === false) {
            this.open = !this.open;
            this.render();
            return;
        }
        // @ts-ignore
        if (event.path[0].className === "fas fa-angle-up" || event.path[0].localName === "li") {
            this.open = !this.open;
            this.render();
        }
    }

    refreshUl(chaine = ""){
        const updatedList = updateDropdown(chaine, this.name);
        let html = "";
        updatedList.forEach(element => {
            html += `<li onclick="selectTag('${element}', '${this.name}')">${element}</li>`;
        });
        this.$ul.innerHTML = html;
    }

    templateDropdownOpen(){
        this.DOM.innerHTML  = /*html*/ `
            <input type="text" placeholder="Recherche un ingrédient" class="${this.classAdditionnel}" onkeyup="updateDropdown_${this.name}(this.value)">
            <i class="fas fa-angle-up"></i>
        `;
        this.$ul = document.createElement("ul");
        this.DOM.appendChild(this.$ul);
        this.refreshUl();
    }

    clickOnTag(element, type){
        // console.log(type, element);
        addTag(element, type),
        updateTagContainer();
        updateRecipeContainer();
    }
}