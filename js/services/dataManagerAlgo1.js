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

    return dropdownList;
}

/**
 * add an element in tagList
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
    for (let i=0, size = getAllData().length; i<size; i++){
        recipeList.push(i);
    }
    recipeList = intersectArray(recipeList, getIngredientsId());
    recipeList = intersectArray(recipeList, getApplianceId());
    recipeList = intersectArray(recipeList, getUstensilsId());
    recipeList = searchRecipe(recipeList, inputSearchValue);
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
 * Search search string in recipeList
 *
 * @param   {Array}     recipeList  array of recipe
 * @param   {String}    search      string to search in recipeList
 *
 * @return  {Array}                 array of recipe where there are search
 */
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

/**
 * return list of id from ingredients
 *
 * @return  {Array}  list of id
 */
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
    return [... new Set(ingredientsId)];
}

/**
 * return list of id from appliance
 *
 * @return  {Array}  list of id
 */
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
    return [... new Set(appliancesId)];
}

/**
 * return list of id from ustensils
 *
 * @return  {Array}  list of id
 */
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
    return [... new Set(ustensilsId)];
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