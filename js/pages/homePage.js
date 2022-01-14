import Header from "../sections/header.js";
import Main from "../sections/main.js";

export default class HomePage {
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget){
        this.DOM = domTarget;
        new Header(this.DOM);
        new Main(this.DOM);
    }
}