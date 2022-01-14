import {recipes} from "../datas/datas.js";
let data;
var tagList = [];

/**
 * return all data in datas.js
 *
 * @return  {Array}  [return description]
 */
function getAllData() {
    data = recipes;
    return data;
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
    //J'enleve les elements qui sont deja des tags
    const tagList = getTagList();
    dropdownList = deleteDropdownElementIfTagExist(tagList, dropdownList, type);
    return dropdownList;
}

function deleteDropdownElementIfTagExist(tagList, dropdownList, dropdownType){
    for (let i = 0; i < tagList.length; i++) {
        const tag = tagList[i];
        console.log(tag);
        for (let j = 0; j < dropdownList.length; j++) {
            const dropdownElement = dropdownList[j];
            if (tag.element === dropdownElement && tag.type === dropdownType) {
                dropdownList.splice(j, 1);
            }
        }
    }
    return dropdownList;
}

function addTag(element, type){
    tagList.push({"element": element, "type": type});
    return;
}

function getTagList(){
    return tagList;
}

function deleteTag(element, type){
    const listTag = getTagList();
    for (let i = 0; i < listTag.length; i++) {
        const tag = listTag[i];
        if (tag.element === element && tag.type === type) {
            listTag.splice(i, 1);
        }
    }
    return;
}

export {
    getAllData,
    getAllIngredients,
    getAllAppareils,
    getAllUstensiles,
    updateDropdown,
    addTag,
    deleteTag,
    getTagList
};