const search = document.getElementById('search'), // using a comma here allows you to use a comma to seperate you constant varibales as long as the first const has been declared as a const.
submit = document.getElementById('submit'),
random = document.getElementById('random')
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');


// search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;

    // check for empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2> Search results for '${term}':</h2>`

        if(data.meals === null){
            resultHeading.innerHTML = `<p> There are no search results for '${term}'. Please try another search term.</p>`;

        } else {
            mealsEl.innerHTML = data.meals.map(meal => `
            <div class ="meal">
                <img src="${meal.strMealThumb}" alt="${meal.steMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `).join('');
        }
        });
        // Clear search Text
        search.value = '';
    } else {
        alert('Please enter a search term');
    }
}

// fetch meal by id

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

// fetch random meal
function getRandomMeal() {
    // clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

// add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; ++i) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
            <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}            
            </div>
            <div class="main>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredients.map(img => `<li>${img}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    };
});