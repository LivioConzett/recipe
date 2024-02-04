
const MENU_HOLDER = document.getElementById('menuHolder');
const RECIPE_NAME = document.querySelector("#recipeHolder .name");
const RECIPE_INGREDIENTS = document.querySelector("#recipeHolder .ingredients");
const RECIPE_STEPS = document.querySelector("#recipeHolder .steps");

/**
 * Initialize everything
 */
function init(){

    setUpMenu();

    showRecipe(0);

}

/**
 * Set up the menu
 */
function setUpMenu(){


    const recipeList = getListOfRecipes(BY_NAME);

    for(let i = 0; i < recipeList.length; i ++){

        let div = document.createElement('div');
        div.classList.add("menu-item");
        div.innerHTML = recipeList[i].name;
        div.addEventListener('click', e => {
           showRecipe(recipeList[i].id);
        });

        MENU_HOLDER.appendChild(div);
    }
}

/**
 * Clear the recipe
 */
function clearRecipe(){
    RECIPE_NAME.innerHTML = "";
    RECIPE_STEPS.innerHTML = "";
    RECIPE_INGREDIENTS.innerHTML = "";
}

/**
 * Show the recipe in the main view
 * @param recipeId id of the recipe
 */
function showRecipe(recipeId){
    const recipe = getRecipeById(recipeId);

    if(!recipe) return;

    clearRecipe();

    RECIPE_NAME.innerHTML = recipe.name;

    for(let i = 0; i < recipe.ingredients.length; i++){
        const ingredient = document.createElement('tr');
        ingredient.classList.add('ingredient');

        const amount = document.createElement('td');
        amount.classList.add('amount');
        amount.innerHTML = recipe.ingredients[i].amount;

        const unit = document.createElement('td');
        unit.classList.add('unit');
        unit.innerHTML = recipe.ingredients[i].unit.string;

        const name = document.createElement('td');
        name.classList.add('recipe-name');
        name.innerHTML = recipe.ingredients[i].name.name;

        // get the plural if no unit and amount greater than 1
        if(recipe.ingredients[i].unit === UNIT.none && recipe.ingredients[i].amount > 1){
            name.innerHTML = recipe.ingredients[i].name.plural;
        }

        ingredient.appendChild(amount);
        ingredient.appendChild(unit);
        ingredient.appendChild(name);
        RECIPE_INGREDIENTS.appendChild(ingredient);
    }

    let counter = 1;

    for(let i = 0; i < recipe.steps.length; i++){
        const step = document.createElement('tr');
        step.classList.add('step');

        const number = document.createElement('td');
        number.classList.add('number');
        number.innerHTML = `${counter}.`;

        const text = document.createElement('td');
        text.classList.add('text');
        text.innerHTML = recipe.steps[i];

        step.appendChild(number);
        step.appendChild(text);

        RECIPE_STEPS.appendChild(step);

        counter ++;
    }


}




init();