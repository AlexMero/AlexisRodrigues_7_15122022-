import Hash from "../services/hash.js";
import {recipes} from "../datas/datas.js";

let inputSearchValue = "";

const src = {
    "Appareil" : new Hash("appliance", recipes),
    "Ingrédients" : new Hash("ingredients", recipes),
    "Ustensiles" : new Hash("ustensils", recipes),
    "name" : new Hash("name", recipes)
};

/**
 * search all ingredients in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllIngredients(){
    const ingredientsList = [];
    for (const [key] of Object.entries(src["Ingrédients"].tagList)) {
        ingredientsList.push(key);
    }
    return ingredientsList;
}

/**
 * search all appliance in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllAppareils(){
    const appareilsList = [];
    for (const [key] of Object.entries(src["Appareil"].tagList)) {
        appareilsList.push(key);
    }
    return appareilsList;
}

/**
 * search all ustensils in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllUstensiles(){
    const ustensilesList = [];
    for (const [key] of Object.entries(src["Ustensiles"].tagList)) {
        ustensilesList.push(key);
    }
    return ustensilesList;
}

/**
 * update dropdown list
 *
 * @param   {String}  rch   search string wrote by user
 * @param   {String}  type  Dropdown type (Ingrédients, Appareil ou Ustensiles)
 *
 * @return  {Array}         new dropdown list to print
 */
function updateDropdown(rch, type){
    let dropdownList = [];
    switch (type) {
            case "Ingrédients":
                dropdownList = getAllIngredients();
                break;
            case "Appareil":
                dropdownList = getAllAppareils();
                break;
            case "Ustensiles":
                dropdownList = getAllUstensiles();
                break;
    }
    if (rch !== "") dropdownList = src[type].filterInput(rch);
    return dropdownList;
}

/**
 * add an element in tagList
 *
 * @param   {String}  element   element tag
 * @param   {String}  type      type tag
 *
 * @return  {Void}
 */
function addTag(element, type){
    src[type].addTag(element);
    return;
}

/**
 * return tagList
 *
 * @return  {Object}  taglist
 */
function getTagList(){
    const tagActiveList = {"Appareil": src["Appareil"].activesTags, "Ingrédients": src["Ingrédients"].activesTags, "Ustensiles": src["Ustensiles"].activesTags};
    return tagActiveList;
}

/**
 * delete an element in tagList
 *
 * @param   {String}  element   element tag
 * @param   {String}  type      type tag
 *
 * @return  {Void}
 */
function deleteTag(element, type){
    src[type].removeTag(element);
    return;
}

/**
 * choose recipe to print from recipeList
 *
 * @return  {Array}     list recipe to print
 */
function updatedRecipeList(){
    let recipeList = src["Ingrédients"].allIds;
    for (const key of Object.keys(src)){
        if (key === "name") continue;
        recipeList = intersectArray(recipeList, src[key].getRecipesId());
        console.log(key, src[key].getRecipesId(), recipeList);
    }
    if (inputSearchValue.length >= 3) {
        console.log(recipeList);
        if (src["name"].tagHashs[normalize(inputSearchValue)]){
            recipeList = intersectArray(recipeList, src["name"].tagHashs[normalize(inputSearchValue)]);
        } else {
            recipeList = [];
        }
    }
    const answer = [];
    recipeList.forEach(recipeId => {
        answer.push(recipes[recipeId]);
    });
    return answer;
}

/**
 * return common element from 2 array
 *
 * @param   {Array}  a1  first array
 * @param   {Array}  a2  second array
 *
 * @return  {Array}
 */
function intersectArray(a1, a2){
    return a1.filter(value => a2.includes(value));
}

/**
 * change inputSearchValue to new string wrote by user
 *
 * @param   {String}  newValue      new string wrote by user
 *
 * @return  {Void}
 */
function updateInputSearchValue(newValue){
    inputSearchValue = newValue;
    return;
}

/**
 * normalize user string (accent majuscule)
 *
 * @param   {String}  str  string to normalize
 *
 * @return  {String}       string normalized
 */
function normalize(str){
    return str
        .toLowerCase()
        .normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export {
    getAllIngredients,
    getAllAppareils,
    getAllUstensiles,
    updateDropdown,
    addTag,
    deleteTag,
    getTagList,
    updatedRecipeList,
    updateInputSearchValue,
    intersectArray
};