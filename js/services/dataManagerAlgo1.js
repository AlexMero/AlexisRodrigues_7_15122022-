import {recipes} from "../datas/datas.js";
let data;
var tagList = {"Appareil": [], "Ingrédients": [], "Ustensiles": []};
let inputSearchValue = "";

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
 * [addTag description]
 *
 * @param   {String}  element  [element description]
 * @param   {String}  type     [type description]
 *
 * @return  {Void}           [return description]
 */
function addTag(element, type){
    //tagList.push({"element": element, "type": type});
    tagList[type].push(element);
    return;
}

function getTagList(){
    return tagList;
}

function deleteTag(element, type){
    const tagList = getTagList()[type];
    // for (let i = 0; i < listTag.length; i++) {
    //     const tag = listTag[i];
    //     if (tag.element === element && tag.type === type) {
    //         listTag.splice(i, 1);
    //     }
    // }
    // for (let i = 0; i < tagList[type].length; i++) {
    //     const tag = tagList[type][i];
    //     if (tag.element === element) {
    //         tagList[type].splice(i, 1);
    //     }
    // }
    for (let i = 0; i < tagList.length; i++) {
        const tag = tagList[i];
        if (tag === element) {
            tagList.splice(i, 1);
        }
    }
    return;
}

function updatedRecipeList(){
    let recipeList = [];
    for (let i=0, size = getAllData().length; i<size; i++){
        recipeList.push(i);
    }
    // console.log("all", recipeList);
    recipeList = intersectArray(recipeList, getIngredientsId());
    // console.log("all1", recipeList);
    recipeList = intersectArray(recipeList, getApplianceId());
    // console.log("all2", recipeList);
    recipeList = intersectArray(recipeList, getUstensilsId());
    // console.log("all3", recipeList);
    recipeList = searchRecipe(recipeList, inputSearchValue);
    // console.log("all4", recipeList);
    const answer = [];
    recipeList.forEach(recipeId => {
        answer.push(recipes[recipeId]);
    });
    return answer;
}

function intersectArray(a1, a2){
    return a1.filter(value => a2.includes(value));
}

function searchRecipe(recipeList, search){
    let newRecipeList = [];
    if (search !== "") {
        recipeList.forEach(recipe => {
            const recipeName = recipes[recipe].name.toUpperCase();
            if (recipeName.includes(search.toUpperCase())) {
                newRecipeList.push(recipe);
            }
        });
    } else {
        newRecipeList = recipeList;
    }
    return newRecipeList;
}

function getIngredientsId(){
    let i=0;
    const ingredientsId = [];
    getAllData().forEach(data => {
        if (tagList.Ingrédients.length !== 0) {
            data.ingredients.forEach(ingredientObject => {
                const ingredient = ingredientObject.ingredient;
                if (tagList.Ingrédients.includes(ingredient)) {
                    ingredientsId.push(i);
                }
            });
        } else {
            ingredientsId.push(i);
        }
        i++;
    });
    // console.log([... new Set(ingredientsId)]);
    return [... new Set(ingredientsId)];
}

function getApplianceId(){
    let i=0;
    const appliancesId = [];
    // console.log("test : ", tagList.Appareil);
    getAllData().forEach(data => {
        if (tagList.Appareil.length !== 0) {
            const appliance = data.appliance;
            if (tagList.Appareil.includes(appliance)) {
                appliancesId.push(i);
            }
        } else {
            appliancesId.push(i);
        }
        i++;
    });
    // console.log([... new Set(appliancesId)]);
    return [... new Set(appliancesId)];
}

function getUstensilsId(){
    let i=0;
    const ustensilsId = [];
    getAllData().forEach(data => {
        if (tagList.Ustensiles.length !== 0) {
            data.ustensils.forEach(ustensil => {
                if (tagList.Ustensiles.includes(ustensil)) {
                    ustensilsId.push(i);
                }
            });
        } else {
            ustensilsId.push(i);
        }
        i++;
    });
    // console.log([... new Set(ustensilsId)]);
    return [... new Set(ustensilsId)];
}

function updateInputSearchValue(newValue){
    inputSearchValue = newValue;
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
    getTagList,
    updatedRecipeList,
    updateInputSearchValue
};