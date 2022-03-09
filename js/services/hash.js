import {intersectArray} from "./dataManager.js";
export default class Hash{
    activesTags = [];

    tagHashs = [];

    tagList = [];

    allIds = [];

    /**
     * [constructor description]
     *
     * @param   {("name" | "appliance" | "ustensils" | "ingredients")}  type     [type description]
     * @param   {Array}  recipes  [recipes description]
     *
     * @constructor
     */
    constructor(type, recipes){
        this.type = type;
        const extractType = this.defineExtractor(recipes);
        for ( let i=0, size=recipes.length; i<size; i++) {
            this[extractType](recipes[i][type], i);
            this.allIds.push(i);
        }
        window[type] = this;
    }

    /**
     * [defineExtractor description]
     *
     * @param   {Array}  recipes    recipeList
     *
     * @return  {String}
     */
    defineExtractor(recipes){
        if (this.type ==="name") return "extractName";
        return typeof recipes[0][this.type] === "string" ? "extractFromString" : "extractFromArray";
    }

    /**
     * [extractName description]
     *
     * @param   {String}  str  [str description]
     * @param   {String}  id   [id description]
     *
     * @return  {Void}
     */
    extractName(str, id){
        str = this.normalize(str);
        this.hashLoop(str, id, "tagHashs") ;
        const words = str.split(" ");
        if (words.length>1){
            words.forEach(word => {
                this.hashLoop(word, id, "tagHashs");
            });
        }
    }

    /**
     * [extractFromString description]
     *
     * @param   {String}  str  [str description]
     * @param   {Number}  id   [id description]
     *
     * @return  {void}       [return description]
     */
    extractFromString(str, id){
        str = this.normalize(str);

        this.hydrateTagList(str, id);

        this.hydrateTagHashs(str, id);
    }

    /**
     * [extractFromArray description]
     *
     * @param   {Array}  array      [array description]
     * @param   {Number}  id        [id description]
     *
     * @return  {Void}              [return description]
     */
    extractFromArray(array, id){
        if (this.type === "ingredients") {
            array.forEach(ingredientsList => {
                const str = ingredientsList["ingredient"];
                this.extractFromString(str, id);
            });
            return;
        }
        array.forEach(str => {
            this.hydrateTagList(str, id);
            this.hydrateTagHashs(str, id);
        });

    }

    getRecipesId(){
        if (this.type === "name") return this.activesTags;
        if (this.activesTags.length === 0) return this.allIds;
        let ids = this.allIds;
        this.activesTags.forEach(tag => {
            ids = intersectArray(ids, this.tagList[tag]);
        });
        return [... new Set(ids)];
    }

    hashLoop(str, id, target){
        let hashed;
        for (let i=str.length; i>2; i--){
            hashed = str.slice(0,i);
            if (! this[target][hashed]) this[target][hashed] = [];
            if (this[target][hashed].indexOf(id) !==-1) continue;
            this[target][hashed].push(id);
        }
    }

    hydrateTagList(str, id){
        if (! this.tagList[str]) this.tagList[str] = [];
        this.tagList[str].push(id);
        return;
    }

    hydrateTagHashs(str, id){
        const words = str.split(" ");
        if (words.length>1){
            words.forEach(word => {
                this.hashLoop(word, id, "tagHashs");
            });
        }
        return;
    }

    normalize(str){
        return str
            .toLowerCase()
            .normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    addTag(tag){
        this.activesTags.push(tag);
    }

    removeTag(tag){
        const index = this.activesTags.indexOf(tag);
        if (index === -1) return;
        this.activesTags.splice(index, 1);
    }

    filterInput(str) {
        const dropdownList = [];
        for (const [key] of Object.entries(this.tagList)) {
            if (key.indexOf(str) !== -1) {
                dropdownList.push(key);
            }
        }
        return dropdownList;
    }

}