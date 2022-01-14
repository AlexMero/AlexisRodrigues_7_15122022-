export default class Component{

    /**
     * @type {HTMLElement}
     */
    DOM;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domtarget  [domtarget description]
     * @param   {String}  tag        [tag description]
     *
     * @constructor
     */
    constructor(domtarget, tag){
        this.DOM = document.createElement(tag);
        domtarget.appendChild(this.DOM);
    }

    /**
     * @param   {Object}  props      [props description]
     * @returns {void}               hydrate l'entité
     */
    hydrate(props){
        for (const [key, value] of Object.entries(props)){
            this[key] = value;
        }
    }
}