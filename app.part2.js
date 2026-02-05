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

// ==============================
// Part 2 State (Filter + Sort)
// ==============================
let currentFilter = "all";  // all | easy | medium | hard | quick
let currentSort = "none";   // none | name | time

// ==============================
// DOM Selection
// ==============================
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ==============================
// View Helpers
// ==============================

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

// Add staggered animation delay to cards (nice UI touch)
const applyStaggeredAnimation = () => {
    const cards = document.querySelectorAll(".recipe-card");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.08}s`;
    });
};

// Function to update statistics
const updateStats = (recipesToRender) => {
    const totalRecipes = recipesToRender.length;
    const quickRecipes = recipesToRender.filter((recipe) => recipe.time <= 30).length;
    const easyRecipes = recipesToRender.filter((recipe) => recipe.difficulty === "easy").length;

    document.getElementById("total-recipes").textContent = totalRecipes;
    document.getElementById("quick-recipes").textContent = quickRecipes;
    document.getElementById("easy-recipes").textContent = easyRecipes;
};

// Function to render recipes to the DOM
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender.map(createRecipeCard).join("");
    recipeContainer.innerHTML = recipeCardsHTML;

    updateStats(recipesToRender);
    applyStaggeredAnimation();
};

// ==============================
// Pure Filter Functions
// ==============================
const filterByDifficulty = (recipesList, difficulty) => {
    return recipesList.filter((recipe) => recipe.difficulty === difficulty);
};

const filterByTime = (recipesList, maxTime) => {
    return recipesList.filter((recipe) => recipe.time <= maxTime);
};

const applyFilter = (recipesList, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipesList, filterType);
        case "quick":
            return filterByTime(recipesList, 30);
        case "all":
        default:
            return recipesList;
    }
};

// ==============================
// Pure Sort Functions
// NOTE: sort() mutates, so we sort a COPY using [...array]
// ==============================
const sortByName = (recipesList) => {
    return [...recipesList].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipesList) => {
    return [...recipesList].sort((a, b) => a.time - b.time);
};

const applySort = (recipesList, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipesList);
        case "time":
            return sortByTime(recipesList);
        case "none":
        default:
            return recipesList; // keep original order
    }
};

// ==============================
// Main Orchestrator
// ==============================
const updateDisplay = () => {
    let result = applyFilter(recipes, currentFilter);
    result = applySort(result, currentSort);

    renderRecipes(result);
    updateActiveButtons();

    console.log(
        `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// ==============================
// Active Button UI
// ==============================
const updateActiveButtons = () => {
    filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });

    sortButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.sort === currentSort);
    });
};

// ==============================
// Event Handlers + Listeners
// ==============================
const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    if (!filterType) return;

    currentFilter = filterType;
    updateDisplay();
};

const handleSortClick = (event) => {
    const sortType = event.target.dataset.sort;
    if (!sortType) return;

    currentSort = sortType;
    updateDisplay();
};

const setupEventListeners = () => {
    filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));
    sortButtons.forEach((btn) => btn.addEventListener("click", handleSortClick));
};

// ==============================
// Initialize App
// ==============================
setupEventListeners();
updateDisplay();

console.log("Total recipes:", recipes.length);
console.log("First recipe:", recipes[0]);
console.log("RecipeJS Part 2 ready!");
