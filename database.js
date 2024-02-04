
const DESCENDING = 0b0001;
const  BY_ID     = 0b0010;
const BY_NAME    = 0b0100;

/**
 * Check if the bit is in the number
 * @param number number to check
 * @param bit bit to check for
 * @returns {boolean} true if the bit is in the number
 */
function checkForBit(number, bit){

    return (number & bit) === bit;
}

function greaterThan(a,b){
    if(a === b) return 0;
    if(a < b) return 1;
    if(a > b) return -1;
}

function lessThan(a,b){
    if(a === b) return 0;
    if(a < b) return -1;
    if(a > b) return 1;
}

/**
 * Get list of all the recipes
 * @param sortBy sort by
 * @returns {*[]} list with id and name
 */
function getListOfRecipes(sortBy){

    const list = [];

    for(let i = 0; i < RECIPES.length; i++){
        list.push({
            id: RECIPES[i].id,
            name: RECIPES[i].name
        })
    }

    let sortFunc = lessThan;
    if(checkForBit(sortBy, DESCENDING)) sortFunc = greaterThan;

    if(checkForBit(sortBy, BY_ID)){
        list.sort(function(a, b){
            return sortFunc(a.id, b.id);
        })
    }

    if(checkForBit(sortBy, BY_NAME)){
        list.sort(function(a, b){
            return sortFunc(a.name, b.name);
        })
    }

    return list;
}


/**
 * Get a recipe by its id
 * @param id id of the recipe
 * @returns {{name: string, ingredients, id: number, steps}|null}
 */
function getRecipeById(id){

    for(let i = 0; i < RECIPES.length; i++){
        if(RECIPES[i].id === id) return RECIPES[i];
    }

    return null;
}