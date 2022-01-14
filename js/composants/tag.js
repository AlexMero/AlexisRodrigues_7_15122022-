import Component from "./component.js";
import { deleteTag } from "../services/dataManager.js";
import { updateTagContainer } from "./tagContainer.js";

export default class Tag extends Component {

    name;

    type;

    color;

    /**
     *
     * @param   {HTMLElement}   domTarget
     * @param   {Object}        props
     * @param   {String}        props.name
     * @param   {String}        props.type      bleu vert or rouge
     *
     * @constructor
     */
    constructor(domTarget, props){
        super(domTarget, "span");
        this.hydrate(props);

        switch (this.type) {
                case "Ingrédients":
                    this.color = "bleu";
                    break;
                case "Appareil":
                    this.color = "vert";
                    break;
                case "Ustensiles":
                    this.color = "rouge";
                    break;
        }

        this.DOM.className = "tagSpan " + this.color;

        this.DOM.onclick = this.click.bind(this);

        this.DOM.innerText = this.name;
    }

    click(){
        deleteTag(this.name, this.type);
        updateTagContainer();
    }
}