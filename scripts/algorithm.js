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
const filterButtons = document.getElementsByClassName('filterButtons')[0];
ingredientsButton.addEventListener('click', function(){getIngredients(ingredientsButton, ingredientsDiv, 'ingredient', ingredients)});
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
    let reaserchListRecipes = [];

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

    console.log(ustensils);
    console.log(reaserchListRecipes);
    
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
    
    //check if applianceTags exists
    if(applianceTags.length > 0){
        applianceTags.forEach(applianceTags =>
        {
            listRecipes.forEach(recipe =>
            {   
                let appliance = recipe.appliance.toLowerCase();
                if(appliance.includes(applianceTags)){
                    newListRecipes.push(recipe); 
                }
            })
        });
    }
    
    // check if ingredientTags exists
    if (ingredientTags.length > 0) {
        ingredientTags.forEach(ingredientTags =>
        {
            listRecipes.forEach(recipe =>
                {
                    let listIngredients = recipe.ingredients;
                    for(let i=0 ; i < listIngredients.length  ; i++){
                        let ingredient = listIngredients[i].ingredient.toLowerCase();
                        
                        if(ingredient.includes(ingredientTags)){
                            console.log(ingredient);
                            if(!newListRecipes.includes(ingredient)){
                                newListRecipes.push(recipe); 
                            }
                    }
                }
                })
        });
    }


    //check if ustensilTags exists
    if (ustensilTags.length > 0) {
        ustensilTags.forEach(ustensilTag =>
        {
            listRecipes.forEach(recipe =>
                {
                    let ustensil = recipe.ustensil;
                    if(ustensil.includes(ustensilTag)){
                    if(!newListRecipes.includes){
                        newListRecipes.push(recipe); 
                    }
                }
                })
        });
    }

    if(newListRecipes.length > 0){
        loadElements(newListRecipes);
        filteredRecipesByTags = newListRecipes;
        listOfRecipes = filteredRecipesByTags;
    }
    
    else{
        loadElements(listRecipes);
        listOfRecipes = listOfRecipes;
    }

    addToDOM();
}



function removeTag(tag){
    let index;
    switch (tag.type){
        case 'appliance':
            index = applianceTags.indexOf(tag.name);
            applianceTags.splice(index, 1);
            break;
        
        case 'ustensil':
            index = ustensilTags.indexOf(tag.name);
            ustensilTags.splice(index, 1);
            break;
        
        case 'ingredient':
            index = ingredientTags.indexOf(tag.name);
            ingredientTags.splice(index, 1);
            break;
    }

    
    filterByTag();
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


function getIngredients(buttonDiv, button, type, listOfElement){
    ingredientsDiv.style.animation = '2s increaseSize forwards';
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
    tag.setAttribute('class', 'elementName button');
    const text = document.createElement('p');
    text.innerText = elementName;
    tag.appendChild(text);
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
    filterButtons.appendChild(tag);
    button.removeChild(listElements);
    button.style.animation = '2s increaseSize reverse forwards';
    buttonDiv.innerText = type;
    filterByTag();
}

// ingredientTags.push('tomate');
// filterByTag();
// reaserchListRecipes = filteredRecipesByTags;
// console.log(reaserchListRecipes);
// console.log(filteredRecipesByTags);
// console.log(ustensils);
// const tag = {type:'ingredient',name:'tomate'};
// removeTag(tag);
// console.log(listOfRecipes);
// console.log(ustensils);