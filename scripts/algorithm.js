import {recipes} from "../scripts/recipes.js";
import {recipeFactory} from "../scripts/recipeFactory.js";



let listOfRecipes = [...recipes];
let applianceTags = [];
let ingredientTags = [];
let ustensilTags = [];
let appliances = [];
let ingredients = [];
let ustensils = [];

let filteredRecipesByTags = [];
let reaserchListRecipes = [];


//init the list of the appliances/recipes/ingredients
loadElements(recipes);
addToDOM();

//get all the important elements to use in the functions
const searchBar = document.getElementById('searchBar');
const ingredientsInput = document.getElementById('ingredientsInput');
const ingredientsDiv = document.getElementById('ingredientsDiv');
const ustensilsInput = document.getElementById('ustensilsInput');
const ustensilsDiv = document.getElementById('ustensilsDiv');
const appliancesInput = document.getElementById('appliancesInput');
const appliancesDiv = document.getElementById('appliancesDiv');
const filterResult = document.getElementsByClassName('filterResult')[0];
ingredientsInput.addEventListener('click', function(){getFilter(ingredientsInput, ingredientsDiv, 'ingredient', ingredients)});
ustensilsInput.addEventListener('click', function(){getFilter(ustensilsInput, ustensilsDiv, 'ustensil', ustensils)});
appliancesInput.addEventListener('click', function(){getFilter(appliancesInput, appliancesDiv, 'appliance', appliances)});
ingredientsInput.addEventListener('input', (event) => {filterButtonList(event, 'ingredient')});
ustensilsInput.addEventListener('input', (event) => {filterButtonList(event, 'ustensil')});
appliancesInput.addEventListener('input', (event) => {filterButtonList(event, 'appliance')});
searchBar.addEventListener('input', (event) => {searchElement(event)});



/** 
   * This function refreshes the list of the appliances, ingredients and ustensils in alphabetic order.
   * @param recipies List of the current recipes
   * 
*/
function loadElements(recipies){
    appliances = [];
    ingredients = [];
    ustensils = [];

    recipies.forEach(recipie =>
    {   
        //get appliance
        let applianceToLowerCase = recipie.appliance.toLowerCase();
        if(!appliances.includes(applianceToLowerCase)){
            appliances.push(applianceToLowerCase);
        }


        //get ingredients
        let listIngredients = recipie.ingredients;
        for( let i=0 ; i < listIngredients.length  ; i++){
            let ingredient = listIngredients[i].ingredient;
            let ingredientToLowerCase = ingredient.toLowerCase();
            
            if(!ingredients.includes(ingredientToLowerCase)){
                ingredients.push(ingredientToLowerCase); 
            }
        }

        //get usentils
        let listUstensils = recipie.ustensils;
        for( let i=0 ; i < listUstensils.length  ; i++){
            let ustensil = listUstensils[i];
            let ustensilToLowerCase = ustensil.toLowerCase();
            
            if(!ustensils.includes(ustensilToLowerCase)){
                ustensils.push(ustensilToLowerCase); 
            }
        }
    });

    appliances.sort();
    ingredients.sort();
    ustensils.sort();
}




/** 
   * This function will get a list of recipes. It will iterates through the ingredients of the recipes,
   * their name and their description.
   * @param event The current input of the research bar
   * 
*/
function searchElement(event){

    let wordToFind = event.target.value.toLowerCase();
    
    //reset list
    let listRecipes = [];
    reaserchListRecipes = [];
    let mapListRecipes = new Map();
    //if tags exist, the code will take the list of recipes coming from the filterTag function
    //else it will take the 50 ingrendients
    if(filteredRecipesByTags.length > 0){
        listRecipes = filteredRecipesByTags;
    }
    else {
        listRecipes = [...recipes];
    }
    
    // if the character length of the input is longer than 2, we start the resesarch
    if(wordToFind.length > 2){

        listRecipes.forEach(recipe =>
            //Fill a map with the recipe as a key and the name, ingredients and description as values
            {   
                let ingredientList = '';
                let listIngredients = recipe.ingredients;
                for(let i=0 ; i < listIngredients.length  ; i++){
                    let ingredient = listIngredients[i].ingredient.toLowerCase();
                    ingredientList += ' ' + ingredient;
                }
                mapListRecipes.set(recipe, recipe.name.toLowerCase() + ' ' + ingredientList + ' ' + recipe.description.toLowerCase());
            }
        );
        
        //check if the word to find is in the values, if yes we had the recipe to a new list
        for (let [key, value] of mapListRecipes.entries()) { {
            if(value.includes(wordToFind)){
                if(!reaserchListRecipes.includes(key)){
                    reaserchListRecipes.push(key);
                }
            }
        }}            
        
        //we will refresh the list of appliances,ingredients,
        //ustensils with the new list of recipes and display the recipes
        loadElements(reaserchListRecipes);
        listOfRecipes = reaserchListRecipes;
        addToDOM();

            
    }

    //if the number of input characters is smaller than 2 then we refresh the list of appliances, ingredients...
    //and display the correct recipes
    else {
        filterByTag();
    }
}




/** 
   * This function will get a list of recipes with the tags. It will iterates through the ingredients of the recipes,
   * their appliances and their ustensils.
   * 
*/
function filterByTag(){
    //refresh list
    let newListRecipes = [];
    let listRecipes = [];
    
    //if the length of the recipes coming from the researchList, we will take this list
    //else we take the 50 ingredients
    if(reaserchListRecipes.length > 0){
        listRecipes = reaserchListRecipes;
    }
    else {
        listRecipes = [...recipes];
    }
    
    //iterates through the list of recipes
    listRecipes.forEach(recipe =>
    { 
        let recipeToAdd = true;
        //check if applianceTags exists
        if(applianceTags.length > 0){
            // iniate the number of appliances to find
            let appliancesFound = 0;
            // iniate the number of appliances to get with the number of tags
            let appliancesToFound = applianceTags.length;
                let appliance = recipe.appliance.toLowerCase();
                for(let i=0; i < applianceTags.length; i++){
                    let applianceTag = applianceTags[i];
                    //if the appliance is found, increase the number of appliancesToFound by 1
                    if(appliance.includes(applianceTag)){
                        appliancesFound += 1;
                        break;
                    }    
                }
            
            //if the number of appliances found is not equal to the to the number of appliances to found
            // we will not add the recipes to the list.
            if(appliancesToFound != appliancesFound){
                recipeToAdd = false;
            }
        }
        

    
        //doing the same treatments than the appliances
        if (ingredientTags.length > 0) {
            let listIngredients = recipe.ingredients;
            let ingredientsFounds = 0;
            let ingredientsToFound = ingredientTags.length;
            for(let i=0 ; i < listIngredients.length; i++){
                let ingredient = listIngredients[i].ingredient.toLowerCase();
                for( let i=0; i < ingredientTags.length; i++){
                    let ingredientTag = ingredientTags[i];
                    if(ingredient.includes(ingredientTag)){
                        ingredientsFounds += 1;
                        break;
                    }    
                }
            }
            if(ingredientsToFound != ingredientsFounds){
                recipeToAdd = false;
            }
        }


        //doing the same treatments than the appliances
        if(ustensilTags.length > 0){
            let ustensilsFound = 0;
            let ustensilsToFound = ustensilTags.length;
            for(let i=0; i < recipe.ustensils.length; i++){
                let ustensil = recipe.ustensils[i].toLowerCase();
                for(let i=0; i < ustensilTags.length; i++){
                    let ustensilTag = ustensilTags[i];
                    if(ustensil.includes(ustensilTag)){
                        ustensilsFound += 1;
                        break;
                    }    
                }
            }
            if(ustensilsToFound != ustensilsFound){
                recipeToAdd = false;
            }
        }

        //if the recipe get all the tags, we will add it
        if(recipeToAdd == true){
            newListRecipes.push(recipe);
        }
    
    });

    //if the list of recipes found is bigger than 0, we will refresh the list of ustensils, ingredients and appliances
    if(newListRecipes.length > 0){
        loadElements(newListRecipes);
        filteredRecipesByTags = newListRecipes;
        listOfRecipes = filteredRecipesByTags;
    }
    
    else{
        filteredRecipesByTags = [];
        loadElements(listRecipes);
        listOfRecipes = listRecipes;
    }

    //display the new recipes
    addToDOM();
}



/** 
   * This function will remove the tag
   * @param elementName The name of the tag
   * @param type The type of the tag (appliance/ingredient/usensils)
   * 
*/
function removeTag(elementName, type){
    let index;
    switch (type){
        case 'appliance':
            //get the index of the element with the name of the element
            index = applianceTags.indexOf(elementName);
            //remove the element from the list
            applianceTags.splice(index, 1);
            break;
        
        case 'ustensil':
            index = ustensilTags.indexOf(elementName);
            ustensilTags.splice(index, 1);
            break;
        
        case 'ingredient':
            index = ingredientTags.indexOf(elementName);
            ingredientTags.splice(index, 1);
            break;
    }

    //call the function to filter by tag
    filterByTag();

    //remove the element from the page
    const elementToRemove = document.getElementById(elementName);
    filterResult.removeChild(elementToRemove);
}


/** 
   * This function will add the recipes to the page
   * 
*/
function addToDOM(){
    const searchOuput = document.getElementById('searchResult');
    searchOuput.innerHTML = '';
    
    //iterate trough the recipes and use the factory to create the elements
    
    if(listOfRecipes.length == 0){
        const noResultFound = document.createElement('p');
        noResultFound.innerHTML = 'Oops, nous n\'avons pas trouvé une recette pour cette recherche';
        noResultFound.setAttribute('class','noResult');
        searchOuput.appendChild(noResultFound);
    }
    else{
        const result = document.createElement('div');
        result.setAttribute('id', 'result');
        listOfRecipes.forEach(recipe => {
            const recipeModel = recipeFactory(recipe);
            const recipeCard = recipeModel.getRecipeCardDom();
            result.appendChild(recipeCard);
        });
        searchOuput.appendChild(result);
    }
}


/** 
   * This function will be executed on the click of the ingredients/appliances/ustensils button.
   * The list of the matching will pop up
   * @param input The input 
   * @param div The div containing the elements
   * @param type The type of the button
   * @param listOfElement The list of all the element type
   *  
*/
function getFilter(input, div, type, listOfElement){
    let open = div.getAttribute('open');
    if(open === 'false'){
        div.setAttribute('open','true');
        div.style.animation = '1s increaseSize forwards';
        input.value = '';
        const listElements = document.createElement('div');
        div.appendChild(listElements);
        listElements.setAttribute('class','listButtons');
        for (let i =0; i < listOfElement.length; i++){
            const element = document.createElement('p');
            element.setAttribute('tag', type);
            element.setAttribute('name', listOfElement[i]);
            element.setAttribute('hide', 'false');
            element.addEventListener('click', function(){addATag(listOfElement[i],type,div,listElements,input)})
            element.innerText = listOfElement[i];
            listElements.appendChild(element);
        }
    }
    
}


/** 
   * This function will be executed on the click of the ingredient/appliance/ustensil button.
   * The filter will be added to the page
   * @param elementName The name of the tag
   * @param type The type of tag
   * @param div The div containing the elements
   * @param listOfElement The list of all the element type
   * @param input The input
   *  
*/
function addATag(elementName, type, div, listElements, input){
    const tag = document.createElement('div');
    tag.setAttribute('class', 'filter');
    tag.setAttribute('id', elementName);
    const text = document.createElement('p');
    text.innerText = elementName;
    text.setAttribute('class', 'text');
    tag.appendChild(text);
    const removeButton = document.createElement('img');
    removeButton.setAttribute('src', 'images/close.png');
    removeButton.setAttribute('class','downArrow');
    removeButton.addEventListener('click', function(){removeTag(elementName,type)})
    tag.appendChild(removeButton);
    let color;
    let inputText;
    switch (type){
        case 'appliance':
            color = '#68D9A4';
            inputText = 'Appareils';
            applianceTags.push(elementName);

            break;
        case 'ustensil':
            color = '#ED6454';
            inputText = 'Ustensiles';
            ustensilTags.push(elementName);
            break;
        
        case 'ingredient':
            color = '#3282F7';
            inputText = 'Ingredient';
            ingredientTags.push(elementName);
            break;
    }
    tag.style.backgroundColor = color;
    filterResult.appendChild(tag);
    div.removeChild(listElements);
    div.style.animation = '1s decreaseSize forwards';
    div.setAttribute('open','false');
    input.value = inputText;
    filterByTag();
}



function filterButtonList(event, type){
    let wordToFind = event.target.value.toLowerCase();
    const elementsToHide = document.querySelectorAll('[tag="'+type+'"]');
    const regex = new RegExp('^'+wordToFind)
    if(wordToFind.length > 0){
        elementsToHide.forEach(element => {
            let name = element.getAttribute('name');
            if(!name.match(regex)){
                element.setAttribute('hide', 'true');
            }
        });
    }
    else{
        elementsToHide.forEach(element => {
            element.setAttribute('hide', 'false');
        });
    }
}

