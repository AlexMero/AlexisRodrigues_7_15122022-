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
    // for (let i=0, size = recipes.length; i<size; i++){
    //     recipeList.push(i);
    // }
    // recipeList = intersectArray(recipeList, getIngredientsId());
    // recipeList = intersectArray(recipeList, getApplianceId());
    // recipeList = intersectArray(recipeList, getUstensilsId());
    // recipeList = searchRecipe(recipeList, inputSearchValue);
    // const answer = [];
    // recipeList.forEach(recipeId => {
    //     answer.push(recipes[recipeId]);
    // });
    return answer;
}

function intersectArray(a1, a2){
    return a1.filter(value => a2.includes(value));
}

function searchRecipe(search){
    return name.tagHashs[search];
    // let newRecipeList = [];
    // if (search !== "") {
    //     recipeList.forEach(recipe => {
    //         const recipeName = recipes[recipe].name.toUpperCase();
    //         if (recipeName.includes(search.toUpperCase())) {
    //             newRecipeList.push(recipe);
    //         }
    //     });
    // } else {
    //     newRecipeList = recipeList;
    // }
    // return newRecipeList;
}

// function searchRecipe(recipeList, search){
//     let newRecipeList = [];
//     if (search !== "") {
//         recipeList.forEach(recipe => {
//             const recipeName = recipes[recipe].name.toUpperCase();
//             if (recipeName.includes(search.toUpperCase())) {
//                 newRecipeList.push(recipe);
//             }
//         });
//     } else {
//         newRecipeList = recipeList;
//     }
//     return newRecipeList;
// }

// function getIngredientsId(){
//     let i=0;
//     const ingredientsId = [];
//     recipes.forEach(data => {
//         if (tagList.Ingrédients.length !== 0) {
//             data.ingredients.forEach(ingredientObject => {
//                 const ingredient = ingredientObject.ingredient;
//                 if (tagList.Ingrédients.includes(ingredient)) {
//                     ingredientsId.push(i);
//                 }
//             });
//         } else {
//             ingredientsId.push(i);
//         }
//         i++;
//     });
//     // console.log([... new Set(ingredientsId)]);
//     return [... new Set(ingredientsId)];
// }

// function getApplianceId(){
//     let i=0;
//     const appliancesId = [];
//     // console.log("test : ", tagList.Appareil);
//     recipes.forEach(data => {
//         if (tagList.Appareil.length !== 0) {
//             const appliance = data.appliance;
//             if (tagList.Appareil.includes(appliance)) {
//                 appliancesId.push(i);
//             }
//         } else {
//             appliancesId.push(i);
//         }
//         i++;
//     });
//     // console.log([... new Set(appliancesId)]);
//     return [... new Set(appliancesId)];
// }

// function getUstensilsId(){
//     let i=0;
//     const ustensilsId = [];
//     recipes.forEach(data => {
//         if (tagList.Ustensiles.length !== 0) {
//             data.ustensils.forEach(ustensil => {
//                 if (tagList.Ustensiles.includes(ustensil)) {
//                     ustensilsId.push(i);
//                 }
//             });
//         } else {
//             ustensilsId.push(i);
//         }
//         i++;
//     });
//     // console.log([... new Set(ustensilsId)]);
//     return [... new Set(ustensilsId)];
// }

function updateInputSearchValue(newValue){
    inputSearchValue = newValue;
    return;
}

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