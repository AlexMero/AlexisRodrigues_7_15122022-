import Hash from "../services/hash.js";
import {recipes} from "../datas/datas.js";

var tagList = {"Appareil": [], "Ingrédients": [], "Ustensiles": []};
let inputSearchValue = "";
const name = new Hash("name", recipes);
const appliance = new Hash("appliance", recipes);
const ustensils = new Hash("ustensils", recipes);
const ingredients = new Hash("ingredients", recipes);

/**
 * return all data in datas.js
 *
 * @return  {Array}  [return description]
 */
function getAllData() {
    return recipes;
}

/**
 * search all ingredients in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllIngredients(){
    const ingredientsList = [];
    const datas = getAllData();
    datas.forEach(data => {
        data.ingredients.forEach(ingredientObject => {
            const ingredient = ingredientObject.ingredient;
            if (!ingredientsList.includes(ingredient)) {
                ingredientsList.push(ingredient);
            }
        });
    });
    return ingredientsList;
}

/**
 * search all appliance in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllAppareils(){
    const appareilsList = [];
    const datas = getAllData();
    datas.forEach(recipe => {
        const appareil = recipe.appliance;
        if (!appareilsList.includes(appareil)) {
            appareilsList.push(appareil);
        }
    });
    return appareilsList;
}

/**
 * search all ustensils in getAllData
 *
 * @return  {Array}  [return description]
 */
function getAllUstensiles(){
    const ustensilesList = [];
    const datas = getAllData();
    datas.forEach(recipe => {
        const ustensiles = recipe.ustensils;
        ustensiles.forEach(ustensile => {
            if (!ustensilesList.includes(ustensile)) {
                ustensilesList.push(ustensile);
            }
        });
    });
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
    let datas;
    switch (type) {
            case "Ingrédients":
                datas = getAllIngredients();
                break;
            case "Appareil":
                datas = getAllAppareils();
                break;
            case "Ustensiles":
                datas = getAllUstensiles();
                break;
    }
    if (rch !== "") {
        datas.forEach(ingredient => {
            if (ingredient.toLowerCase().indexOf(rch.toLowerCase()) !== -1) {
                dropdownList.push(ingredient);
            }
        });
    } else {
        dropdownList = datas;
    }

    //delete Dropdown Element If Tag Exist
    const tagList = getTagList();
    dropdownList = deleteDropdownElementIfTagExist(tagList, dropdownList, type);

    return dropdownList;
}

/**
 * Compare tagList & dropdownList pour enelever de dropdownList les éléments en communs
 *
 * @param   {Object}  tagList        list des tags
 * @param   {Array}  dropdownList   list des elements du sropdown
 * @param   {String}  dropdownType  type du Dropdown (Ingrédients, Appareil ou Ustensiles)
 *
 * @return  {Array}                 Liste des elements du dropdown sans les elements qui sont dans la listTag
 */
function deleteDropdownElementIfTagExist(tagList, dropdownList, dropdownType){
    const newList = [...dropdownList];
    let index;
    tagList[dropdownType].forEach(tag => {
        index = newList.indexOf(tag);
        if (index > -1) newList.splice(index, 1);
    });
    return newList;
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
    //tagList.push({"element": element, "type": type});
    tagList[type].push(element);
    return;
}

/**
 * return tagList
 *
 * @return  {Object}  taglist
 */
function getTagList(){
    return tagList;
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
    const tagList = getTagList()[type];
    for (let i = 0; i < tagList.length; i++) {
        const tag = tagList[i];
        if (tag === element) {
            tagList.splice(i, 1);
        }
    }
    return;
}

/**
 * choose recipe to print from recipeList
 *
 * @return  {Array}     list recipe to print
 */
function updatedRecipeList(){
    let recipeList = [];
    for (let i=0, size = recipes.length; i<size; i++){
        recipeList.push(i);
    }
    tagList.Appareil.forEach(tag => {
        recipeList = intersectArray(recipeList, appliance.tagList[normalize(tag)]);
    });
    tagList.Ustensiles.forEach(tag => {
        recipeList = intersectArray(recipeList, ustensils.tagList[normalize(tag)]);
    });
    tagList.Ingrédients.forEach(tag => {
        recipeList = intersectArray(recipeList, ingredients.tagList[normalize(tag)]);
    });
    if (inputSearchValue.length >= 3) {
        recipeList = intersectArray(recipeList, searchRecipe(inputSearchValue));
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
 * return element from tagHashs
 *
 * @param   {String}  search    string from user
 *
 * @return  {Array}             tagHashs element
 */
function searchRecipe(search){
    return name.tagHashs[search];
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
    updateInputSearchValue
};