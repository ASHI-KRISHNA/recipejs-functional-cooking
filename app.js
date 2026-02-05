// Recipe data - Foundation for all 4 parts
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// DOM Selection - Get the container where recipes will be displayed
const recipeContainer = document.querySelector('#recipe-container');

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                </div>
                <p>${recipe.description}</p>
            </div>
        </div>
    `;
};

// Function to render recipes to the DOM
const renderRecipes = (recipesToRender) => {
    // Use map() to transform each recipe into HTML, then join into a single string
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');
    
    // Set the innerHTML of the container to display all recipe cards
    recipeContainer.innerHTML = recipeCardsHTML;
    
    // Update stats
    updateStats(recipesToRender);
};

// Function to update statistics
const updateStats = (recipesToRender) => {
    const totalRecipes = recipesToRender.length;
    const quickRecipes = recipesToRender.filter(recipe => recipe.time <= 30).length;
    const easyRecipes = recipesToRender.filter(recipe => recipe.difficulty === 'easy').length;
    
    document.getElementById('total-recipes').textContent = totalRecipes;
    document.getElementById('quick-recipes').textContent = quickRecipes;
    document.getElementById('easy-recipes').textContent = easyRecipes;
};

// Initialize: Render all recipes when page loads
renderRecipes(recipes);

// Add staggered animation delay to cards
setTimeout(() => {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}, 0);

// Console logs for debugging and understanding
console.log('Total recipes:', recipes.length);
console.log('First recipe:', recipes[0]);
console.log('Rendering complete!');