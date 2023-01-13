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



loadElements(recipes);
addToDOM();
const searchBar = document.getElementById('searchBar');
const ingredientsButton = document.getElementById('ingredientsButton');
const ingredientsDiv = document.getElementById('ingredientsDivButton');
const ustensilsButton = document.getElementById('ustensilsButton');
const ustensilsDiv = document.getElementById('ustensilsDivButton');
const appliancesButton = document.getElementById('appliancesButton');
const appliancesDiv = document.getElementById('appliancesDivButton');
const filterResult = document.getElementsByClassName('filterResult')[0];
ingredientsButton.addEventListener('click', function(){getFilter(ingredientsButton, ingredientsDiv, 'ingredient', ingredients)});
ustensilsButton.addEventListener('click', function(){getFilter(ustensilsButton, ustensilsDiv, 'ustensil', ustensils)});
appliancesButton.addEventListener('click', function(){getFilter(appliancesButton, appliancesDiv, 'appliance', appliances)});
searchBar.addEventListener('input', (event) => {searchElement(event)});



//Load the applicances, ingredients and ustentils array.
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




//search recipes by word
function searchElement(event){
    let wordToFind = event.target.value.toLowerCase();
    let listRecipes = [];
    reaserchListRecipes = [];

    if(filteredRecipesByTags.length > 0){
        listRecipes = filteredRecipesByTags;
    }
    else {
        listRecipes = [...recipes];
    }
    

    if(wordToFind.length > 2){
        listRecipes.forEach(recipe =>
            {   

                let recipieName = recipe.name.toLowerCase();
                if(recipieName.includes(wordToFind)){
                    if(!reaserchListRecipes.includes(recipe)){
                        reaserchListRecipes.push(recipe);
                    }
                }

                let listIngredients = recipe.ingredients;
                for(let i=0 ; i < listIngredients.length  ; i++){
                    let ingredient = listIngredients[i].ingredient.toLowerCase();
                    if(ingredient.includes(wordToFind)){
                        if(!reaserchListRecipes.includes(recipe)){
                            reaserchListRecipes.push(recipe); 
                        }
                    }
                }
                
                let description = recipe.description
                    if(description.includes(wordToFind)){
                    if(!reaserchListRecipes.includes(recipe)){
                        reaserchListRecipes.push(recipe); 
                    }
                }
            });
            
            if(reaserchListRecipes.length > 0){
                loadElements(reaserchListRecipes);
                listOfRecipes = reaserchListRecipes;
                addToDOM();
            }

            else{
                alert('Pas de plat trouvé');
            }
            
    }

    else {
        loadElements(listRecipes);
        listOfRecipes = listRecipes;
        addToDOM();
    }
    
}




//return list by Tags
function filterByTag(){
    let newListRecipes = [];
    let listRecipes = [];
    
    if(reaserchListRecipes.length > 0){
        listRecipes = reaserchListRecipes;
    }
    else {
        listRecipes = [...recipes];
    }
    
    
    listRecipes.forEach(recipe =>
    { 
        let recipeToAdd = true;
        //check if applianceTags exists
        if(applianceTags.length > 0){
            let appliancesFound = 0;
            let appliancesToFound = applianceTags.length;
                let appliance = recipe.appliance.toLowerCase();
                for(let i=0; i < applianceTags.length; i++){
                    let applianceTag = applianceTags[i];
                    if(appliance.includes(applianceTag)){
                        appliancesFound += 1;
                        break;
                    }    
                }
            if(appliancesToFound != appliancesFound){
                recipeToAdd = false;
                console.log(recipe);
            }
        }
        

    
        // check if ingredientTags exists
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
                console.log(listOfRecipes);
                recipeToAdd = false;
            }
        }


        //check if ustensilTags exists
        if(ustensilTags.length > 0){
            let ustensilsFound = 0;
            let ustensilsToFound = applianceTags.length;
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
            if(ustensilsFound == ustensilsToFound){
                
                recipeToAdd = false;
            }
        }

        if(recipeToAdd == true){
            newListRecipes.push(recipe);
        }
    
    });

    if(newListRecipes.length > 0){
        loadElements(newListRecipes);
        filteredRecipesByTags = newListRecipes;
        listOfRecipes = filteredRecipesByTags;
        console.log('toto');
    }
    
    else{
        console.log(newListRecipe);
        loadElements(listRecipes);
        listOfRecipes = listRecipes;
    }

    addToDOM();
}



function removeTag(elementName, type){
    let index;
    switch (type){
        case 'appliance':
            index = applianceTags.indexOf(elementName);
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

    
    filterByTag();
    const elementToRemove = document.getElementById(elementName);
    filterResult.removeChild(elementToRemove);
}

function addToDOM(){
    const searchOuput = document.getElementById('searchResult');
    searchOuput.innerHTML = '';
    listOfRecipes.forEach(recipe => {
        const recipeModel = recipeFactory(recipe);
        const recipeCard = recipeModel.getRecipeCardDom();
        searchOuput.appendChild(recipeCard);
    });
}


function getFilter(buttonDiv, button, type, listOfElement){
    button.style.animation = '2s increaseSize forwards';
    buttonDiv.innerText = 'Rechercher un ' + type
    const listElements = document.createElement('div');
    button.appendChild(listElements);
    listElements.setAttribute('class','listButtons');
    for (let i =0; i < listOfElement.length; i++){
        const element = document.createElement('p');
        element.setAttribute('tag', type);
        element.setAttribute('name', listOfElement[i]);
        element.addEventListener('click', function(){addATag(listOfElement[i],type,button,listElements,buttonDiv)})
        element.innerText = listOfElement[i];
        listElements.appendChild(element);
    }
}

function addATag(elementName, type, button, listElements, buttonDiv){
    const tag = document.createElement('div');
    tag.setAttribute('class', 'filter');
    tag.setAttribute('id', elementName);
    const text = document.createElement('btn');
    text.innerText = elementName;
    text.setAttribute('class', 'button');
    tag.appendChild(text);
    const removeButton = document.createElement('img');
    removeButton.setAttribute('src', 'images/close.png');
    removeButton.setAttribute('class','downArrow');
    removeButton.addEventListener('click', function(){removeTag(elementName,type)})
    tag.appendChild(removeButton);
    let color;
    switch (type){
        case 'appliance':
            color = '#68D9A4';
            applianceTags.push(elementName);

            break;
        case 'ustensil':
            color = '#ED6454';
            ustensilTags.push(elementName);
            break;
        
        case 'ingredient':
            color = '#3282F7';
            ingredientTags.push(elementName);
            break;
    }
    tag.style.backgroundColor = color;
    filterResult.appendChild(tag);
    button.removeChild(listElements);
    button.style.animation = '2s increaseSize reverse forwards';
    buttonDiv.innerText = type;
    filterByTag();
}
