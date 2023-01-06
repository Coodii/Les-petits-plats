
export function recipeFactory(data){
    const {name, ingredients, time, description} = data;

    function getRecipeCardDom(){
        const recipe = document.createElement('div');
        recipe.setAttribute('class', 'recipe');
        const fakeImg = document.createElement('div');
        fakeImg.setAttribute('class', 'fakeImg');
        recipe.appendChild(fakeImg);
        const infoContainer = document.createElement('div');
        infoContainer.setAttribute('class', 'infoContainer');
        recipe.appendChild(infoContainer);
        
        //first div
        const infoFirstDiv= document.createElement('div');
        infoFirstDiv.setAttribute('class','infoFirstDiv');
        infoContainer.appendChild(infoFirstDiv);
        
        const recipeName = document.createElement('p');
        recipeName.setAttribute('class', 'recipeName');
        recipeName.textContent = name;
        infoFirstDiv.appendChild(recipeName);

        const timer = document.createElement('img');
        timer.setAttribute('src', 'images/timer.png' );
        timer.setAttribute('class', 'timer' );
        infoFirstDiv.appendChild(timer);
        
        const textTime = document.createElement('p');
        textTime.setAttribute('class','textTime');
        textTime.textContent = time + 'min';
        infoFirstDiv.appendChild(textTime);

        //second div
        const infoSecondDiv = document.createElement('div');
        infoSecondDiv.setAttribute('class','infoSecondDiv');
        infoContainer.appendChild(infoSecondDiv);
        
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.setAttribute('class','ingredients');
        infoSecondDiv.appendChild(ingredientsDiv);
        for (let i = 0; i < ingredients.length; i++) {
            let element = ingredients[i];
            const ingredient = document.createElement('p');
            ingredient.setAttribute('class', 'ingredient');
            ingredient.textContent = element.ingredient + ': ' + (element.quantity ? element.quantity : '')
                                        + (element.unit ? element.unit : '');
            ingredientsDiv.appendChild(ingredient);
        };

        const descriptionText = document.createElement('p');
        descriptionText.setAttribute('class', 'descriptionText');
        descriptionText.textContent = description;
        infoSecondDiv.appendChild(descriptionText);
        return recipe
    }
    return {getRecipeCardDom};
}