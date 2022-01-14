import Component from "../composants/component.js";

export default class Header extends Component {
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget){
        super(domTarget, "header");
        this.DOM.innerHTML = /* html */ `
        <img src="../images/logo/les_petits_plats_logo.png">
        `;
    }
}