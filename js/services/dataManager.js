import Hash from "../services/hash.js";
import {recipes} from "../datas/datas.js";

let inputSearchValue = "";
const name = new Hash("name", recipes);
const appliance = new Hash("appliance", recipes);
const ustensils = new Hash("ustensils", recipes);
const ingredients = new Hash("ingredients", recipes);

/**
 * search all ingredients in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllIngredients(){
    const ingredientsList = [];
    for (const [key] of Object.entries(ingredients.tagList)) {
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
    for (const [key] of Object.entries(appliance.tagList)) {
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
    for (const [key] of Object.entries(ustensils.tagList)) {
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
                if (rch !== "") dropdownList = ingredients.filterInput(rch);
                break;
            case "Appareil":
                dropdownList = getAllAppareils();
                if (rch !== "") dropdownList = appliance.filterInput(rch);
                break;
            case "Ustensiles":
                dropdownList = getAllUstensiles();
                if (rch !== "") dropdownList = ustensils.filterInput(rch);
                break;
    }
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
    // tagList[type].push(element);
    switch (type) {
            case "Ingrédients":
                ingredients.addTag(element);
                break;
            case "Appareil":
                appliance.addTag(element);
                break;
            case "Ustensiles":
                ustensils.addTag(element);
                break;
    }
    return;
}

/**
 * return tagList
 *
 * @return  {Object}  taglist
 */
function getTagList(){
    const tagActiveList = {"Appareil": appliance.activesTags, "Ingrédients": ingredients.activesTags, "Ustensiles": ustensils.activesTags};
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
    switch (type) {
            case "Ingrédients":
                ingredients.removeTag(element);
                break;
            case "Appareil":
                appliance.removeTag(element);
                break;
            case "Ustensiles":
                ustensils.removeTag(element);
                break;
    }
    return;
}

/**
 * choose recipe to print from recipeList
 *
 * @return  {Array}     list recipe to print
 */
function updatedRecipeList(){
    let recipeList = ingredients.allIds;
    recipeList = intersectArray(recipeList, appliance.getRecipesId());
    recipeList = intersectArray(recipeList, ustensils.getRecipesId());
    recipeList = intersectArray(recipeList, ingredients.getRecipesId());
    if (inputSearchValue.length >= 3) {
        recipeList = intersectArray(recipeList, name.tagHashs[normalize(inputSearchValue)]);
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