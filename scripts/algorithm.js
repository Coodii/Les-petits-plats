import {recipes} from "../scripts/recipes.js";



let listOfRecipes = [...recipes];
let appliances = [];
let ingredients = [];
let ustensils = [];

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', (event) => {searchElement(event,listOfRecipes)});


let newRecipes = [];
loadElements(recipes);

function loadElements(recipies){
    appliances = [];
    ingredients = [];
    ustensils = [];

    recipies.forEach(recipie =>
    {   
        let applianceToLowerCase = recipie.appliance.toLowerCase();
        if(!appliances.includes(applianceToLowerCase)){
            appliances.push(applianceToLowerCase);
        }

        let listIngredients = recipie.ingredients;
        for( let i=0 ; i < listIngredients.length  ; i++){
            let ingredient = listIngredients[i].ingredient;
            let ingredientToLowerCase = ingredient.toLowerCase();
            
            if(!ingredients.includes(ingredientToLowerCase)){
                ingredients.push(ingredientToLowerCase); 
            }
        }

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

function searchElement(event, listRecipies){
    let wordToFind = event.target.value.toLowerCase();
    if(wordToFind.length < 2){
        let newListRecipies = [];
        listRecipies.forEach(recipie =>
            {   
                if(recipie.name.includes(wordToFind)){
                    if(!newListRecipies.includes(recipie)){
                        newListRecipies.push(recipie);
                    }
                }

                let listIngredients = recipie.ingredients;
                for(let i=0 ; i < listIngredients.length  ; i++){
                    let ingredient = listIngredients[i].ingredient;
                    if(!ingredient.includes(wordToFind)){
                        if(!newListRecipies.includes){
                            newListRecipies.push(recipie); 
                        }
                    }
                }
                
                let description = recipie.description
                    if(description.includes(wordToFind)){
                    if(!newListRecipies.includes(recipie)){
                        newListRecipies.push(recipie); 
                    }
                }
            });
        loadElements(newListRecipies);
        console.log(appliances);
        listOfRecipes = listRecipies;
        console.log(listOfRecipes);  
    }
}


console.log(appliances);
