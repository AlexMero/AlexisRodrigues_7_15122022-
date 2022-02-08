export default class Hash{
    activesTags = [];

    tagHashs = [];

    tagList = [];

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
        }
    }

    defineExtractor(recipes){
        if (this.type ==="name") return "extractName";
        return typeof recipes[0][this.type] === "string" ? "extractFromString" : "extractFromArray";
    }

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

}

// tagHash = {
//     "fou" : [77, 98, 103],
//     "four" : [77, 98, 103],
//     "foure" : [98, 103],
//     "fouret" : [98, 103],
//     "fourett" : [98, 103],
//     "fourette" : [98, 103],
// }