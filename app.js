// RecipeJS - Functional Cooking Companion (Part 3)
// Features added: Expandable steps + ingredients, recursion for nested steps, IIFE module pattern,
// and event delegation for toggle buttons.

const RecipeApp = (() => {
  // ==============================
  // Recipe data - now includes steps + ingredients
  // ==============================
  const recipes = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      time: 25,
      difficulty: "easy",
      description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
      category: "pasta",
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Pancetta / bacon",
        "Parmesan cheese",
        "Black pepper",
        "Salt"
      ],
      steps: [
        "Boil salted water and cook spaghetti until al dente.",
        "Fry pancetta until crispy, then turn off heat.",
        "Whisk eggs with grated Parmesan and lots of black pepper.",
        {
          text: "Combine everything (off heat)",
          substeps: [
            "Add hot pasta to the pan and toss.",
            "Add a splash of pasta water to loosen.",
            "Pour egg-cheese mix and stir quickly to create a creamy sauce (no scrambling!)."
          ]
        },
        "Serve immediately with extra Parmesan and pepper."
      ]
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      time: 45,
      difficulty: "medium",
      description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
      category: "curry",
      ingredients: [
        "Chicken",
        "Yogurt",
        "Ginger-garlic paste",
        "Garam masala",
        "Tomato puree",
        "Cream",
        "Butter",
        "Salt"
      ],
      steps: [
        "Marinate chicken in yogurt, spices, and salt (20 min if possible).",
        "Sear chicken pieces until browned; keep aside.",
        {
          text: "Build the masala base",
          substeps: [
            "Melt butter and sauté ginger-garlic until aromatic.",
            "Add tomato puree and cook until thick and glossy.",
            {
              text: "Finish the sauce",
              substeps: [
                "Add spices and a splash of water.",
                "Stir in cream and simmer 3–5 minutes."
              ]
            }
          ]
        },
        "Add chicken back in and simmer until cooked through.",
        "Taste, adjust salt, and serve with rice/roti."
      ]
    },
    {
      id: 3,
      title: "Homemade Croissants",
      time: 180,
      difficulty: "hard",
      description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
      category: "baking",
      ingredients: [
        "Flour",
        "Yeast",
        "Milk",
        "Sugar",
        "Salt",
        "Butter (for lamination)",
        "Egg (for wash)"
      ],
      steps: [
        "Make dough and let it rest in the fridge.",
        "Prepare a butter block (cold but pliable).",
        "Laminate: roll dough, place butter, fold and chill.",
        "Repeat rolling + folding 2–3 times with chilling in between.",
        "Roll out, cut triangles, shape croissants, proof until puffy.",
        "Egg wash and bake until deeply golden."
      ]
    },
    {
      id: 4,
      title: "Greek Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
      category: "salad",
      ingredients: [
        "Cucumber",
        "Tomatoes",
        "Red onion",
        "Feta cheese",
        "Olives",
        "Olive oil",
        "Oregano",
        "Lemon juice",
        "Salt & pepper"
      ],
      steps: [
        "Chop cucumber, tomatoes, and red onion.",
        "Add olives and crumble feta on top.",
        "Drizzle olive oil and lemon juice.",
        "Season with oregano, salt, and pepper.",
        "Toss gently and serve."
      ]
    },
    {
      id: 5,
      title: "Beef Wellington",
      time: 120,
      difficulty: "hard",
      description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
      category: "meat",
      ingredients: [
        "Beef tenderloin",
        "Mushrooms",
        "Mustard",
        "Prosciutto",
        "Puff pastry",
        "Egg (for wash)",
        "Salt & pepper",
        "Oil"
      ],
      steps: [
        "Season beef and sear on all sides; cool.",
        "Make duxelles: finely chop mushrooms and cook until dry.",
        "Brush beef with mustard.",
        "Wrap beef with prosciutto + duxelles; chill to set shape.",
        "Wrap in puff pastry, seal edges, and chill again.",
        "Egg wash, score lightly, and bake until golden and cooked to preference."
      ]
    },
    {
      id: 6,
      title: "Vegetable Stir Fry",
      time: 20,
      difficulty: "easy",
      description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
      category: "vegetarian",
      ingredients: [
        "Mixed vegetables (bell pepper, carrot, broccoli)",
        "Soy sauce",
        "Garlic",
        "Ginger",
        "Cornstarch",
        "Oil",
        "Salt",
        "Sesame seeds (optional)"
      ],
      steps: [
        "Prep vegetables into bite-size pieces.",
        "Mix sauce: soy + a little water + cornstarch.",
        "Heat wok/pan, add oil, then garlic and ginger.",
        "Add vegetables and stir fry on high heat.",
        "Pour sauce, toss until glossy and slightly thick.",
        "Serve hot (sprinkle sesame if you’re feeling fancy)."
      ]
    },
    {
      id: 7,
      title: "Pad Thai",
      time: 30,
      difficulty: "medium",
      description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
      category: "noodles",
      ingredients: [
        "Rice noodles",
        "Shrimp (or tofu)",
        "Eggs",
        "Bean sprouts",
        "Peanuts",
        "Tamarind paste",
        "Fish sauce (or soy)",
        "Palm/brown sugar",
        "Lime"
      ],
      steps: [
        "Soak noodles until pliable, then drain.",
        "Mix sauce: tamarind + fish sauce + sugar.",
        "Stir fry shrimp/tofu; push aside and scramble eggs.",
        "Add noodles and sauce; toss to coat.",
        "Add bean sprouts, toss briefly, and plate.",
        "Top with peanuts and lime."
      ]
    },
    {
      id: 8,
      title: "Margherita Pizza",
      time: 60,
      difficulty: "medium",
      description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
      category: "pizza",
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella",
        "Basil",
        "Olive oil",
        "Salt",
        "Oregano (optional)"
      ],
      steps: [
        "Preheat oven (as hot as it goes).",
        "Stretch dough and place on tray/stone.",
        "Spread tomato sauce thinly.",
        "Add mozzarella pieces and a pinch of salt.",
        "Bake until crust is browned and cheese bubbles.",
        "Finish with basil and a drizzle of olive oil."
      ]
    }
  ];

  // ==============================
  // Part 2 State (Filter + Sort)
  // ==============================
  let currentFilter = "all"; // all | easy | medium | hard | quick
  let currentSort = "none";  // none | name | time

  // Keep expanded state across re-renders
  // Map: recipeId -> { steps: boolean, ingredients: boolean }
  const expandedState = new Map();

  // ==============================
  // DOM Selection (filled in init)
  // ==============================
  let recipeContainer;
  let filterButtons;
  let sortButtons;

  // ==============================
  // View Helpers
  // ==============================

  // Recursive renderer for nested steps
  const renderSteps = (steps, level = 0) => {
    if (!Array.isArray(steps) || steps.length === 0) return "";

    const items = steps
      .map((step) => {
        if (typeof step === "string") {
          return `<li class="step-item level-${level}">${step}</li>`;
        }

        // Nested step object
        const text = step?.text ?? "";
        const substeps = step?.substeps;

        const nested = Array.isArray(substeps) && substeps.length
          ? `<ol class="steps-list nested level-${level + 1}">${renderSteps(substeps, level + 1)}</ol>`
          : "";

        return `
          <li class="step-item level-${level}">
            <span class="step-text">${text}</span>
            ${nested}
          </li>
        `;
      })
      .join("");

    return items;
  };

  const createStepsHTML = (recipe) => {
    return `<ol class="steps-list level-0">${renderSteps(recipe.steps, 0)}</ol>`;
  };

  const createIngredientsHTML = (recipe) => {
    const items = (recipe.ingredients || [])
      .map((ing) => `<li class="ingredient-item">${ing}</li>`)
      .join("");

    return `<ul class="ingredients-list">${items}</ul>`;
  };

  const createRecipeCard = (recipe) => {
    const state = expandedState.get(recipe.id) || { steps: false, ingredients: false };
    const stepsVisible = state.steps ? "visible" : "";
    const ingredientsVisible = state.ingredients ? "visible" : "";

    const stepsBtnText = state.steps ? "Hide Steps" : "Show Steps";
    const ingBtnText = state.ingredients ? "Hide Ingredients" : "Show Ingredients";

    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <div class="recipe-card-content">
          <h3>${recipe.title}</h3>

          <div class="recipe-meta">
            <span class="recipe-time">⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
          </div>

          <p>${recipe.description}</p>

          <div class="toggle-row">
            <button class="toggle-btn" data-toggle="steps" data-recipe-id="${recipe.id}">
              ${stepsBtnText}
            </button>
            <button class="toggle-btn" data-toggle="ingredients" data-recipe-id="${recipe.id}">
              ${ingBtnText}
            </button>
          </div>

          <div class="expandable steps-container ${stepsVisible}" data-section="steps">
            <h4>Steps</h4>
            ${createStepsHTML(recipe)}
          </div>

          <div class="expandable ingredients-container ${ingredientsVisible}" data-section="ingredients">
            <h4>Ingredients</h4>
            ${createIngredientsHTML(recipe)}
          </div>
        </div>
      </div>
    `;
  };

  const applyStaggeredAnimation = () => {
    const cards = document.querySelectorAll(".recipe-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.08}s`;
    });
  };

  const updateStats = (recipesToRender) => {
    const totalRecipes = recipesToRender.length;
    const quickRecipes = recipesToRender.filter((recipe) => recipe.time <= 30).length;
    const easyRecipes = recipesToRender.filter((recipe) => recipe.difficulty === "easy").length;

    document.getElementById("total-recipes").textContent = totalRecipes;
    document.getElementById("quick-recipes").textContent = quickRecipes;
    document.getElementById("easy-recipes").textContent = easyRecipes;
  };

  const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join("");
    updateStats(recipesToRender);
    applyStaggeredAnimation();
  };

  // ==============================
  // Pure Filter Functions
  // ==============================
  const filterByDifficulty = (recipesList, difficulty) =>
    recipesList.filter((recipe) => recipe.difficulty === difficulty);

  const filterByTime = (recipesList, maxTime) =>
    recipesList.filter((recipe) => recipe.time <= maxTime);

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
  // ==============================
  const sortByName = (recipesList) =>
    [...recipesList].sort((a, b) => a.title.localeCompare(b.title));

  const sortByTime = (recipesList) =>
    [...recipesList].sort((a, b) => a.time - b.time);

  const applySort = (recipesList, sortType) => {
    switch (sortType) {
      case "name":
        return sortByName(recipesList);
      case "time":
        return sortByTime(recipesList);
      case "none":
      default:
        return recipesList;
    }
  };

  // ==============================
  // Main Orchestrator (public)
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
  // Event Handlers
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

  const handleToggleClick = (event) => {
    const button = event.target.closest(".toggle-btn");
    if (!button) return;

    const recipeId = Number(button.dataset.recipeId);
    const toggleType = button.dataset.toggle; // "steps" | "ingredients"
    if (!recipeId || !toggleType) return;

    const card = button.closest(".recipe-card");
    if (!card) return;

    const container =
      toggleType === "steps"
        ? card.querySelector(".steps-container")
        : card.querySelector(".ingredients-container");

    if (!container) return;

    container.classList.toggle("visible");
    const isVisible = container.classList.contains("visible");

    // Persist state across re-renders
    const prev = expandedState.get(recipeId) || { steps: false, ingredients: false };
    expandedState.set(recipeId, { ...prev, [toggleType]: isVisible });

    // Update button label
    const label = toggleType === "steps" ? "Steps" : "Ingredients";
    button.textContent = `${isVisible ? "Hide" : "Show"} ${label}`;
  };

  // ==============================
  // Event Listener Setup
  // ==============================
  const setupEventListeners = () => {
    filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));
    sortButtons.forEach((btn) => btn.addEventListener("click", handleSortClick));

    // Event delegation for toggle buttons
    recipeContainer.addEventListener("click", handleToggleClick);

    console.log("Event listeners attached!");
  };

  // ==============================
  // Initialize App (public)
  // ==============================
  const init = () => {
    console.log("RecipeApp initializing...");

    recipeContainer = document.querySelector("#recipe-container");
    filterButtons = document.querySelectorAll("[data-filter]");
    sortButtons = document.querySelectorAll("[data-sort]");

    setupEventListeners();
    updateDisplay();

    console.log("RecipeApp ready!");
  };

  // Public API
  return { init, updateDisplay };
})();

// Kick off
RecipeApp.init();
