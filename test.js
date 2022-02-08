import Hash from "./js/services/hash.js";
import {recipes} from "./js/datas/datas.js";

const name = new Hash("name", recipes);
const appliance = new Hash("appliance", recipes);
const ustensils = new Hash("ustensils", recipes);
const ingredients = new Hash("ingredients", recipes);

console.log(name, appliance, ustensils, ingredients);