// Imports
import express from "express";

// Types
type Recipe = {
  id: string;
  name: string;
  content: string;
  prepTime?: string;
};

// Variables
let PORT = process.env.PORT || "4000";
const recipes: Recipe[] = [
  {
    id: "1",
    name: "Classic Pancakes",
    content:
      "Mix flour, milk, egg, baking powder, and sugar. Cook on a buttered pan until golden on both sides.",
    prepTime: "20",
  },
  {
    id: "2",
    name: "Tomato Basil Pasta",
    content:
      "Boil pasta. Saute garlic in olive oil, add crushed tomatoes, simmer, then toss with pasta and fresh basil.",
    prepTime: "25",
  },
  {
    id: "3",
    name: "Chicken Caesar Salad",
    content:
      "Grill seasoned chicken, slice it, and serve over romaine with croutons, parmesan, and Caesar dressing.",
    prepTime: "15",
  },
  {
    id: "4",
    name: "Veggie Omelette",
    content:
      "Whisk eggs, pour into pan, add bell pepper, onion, spinach, and cheese. Fold when set.",
    prepTime: "10",
  },
];
const app = express();

// Functions
// Enabling JSON parsing middleware to access body object
app.use(express.json());

// Listen to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Add Routes that...
// Returns home page
app.get("/", (req, res) => {
  res.send("Welcome to your recipe app!");
});

// Returns a full recipe list
app.get("/recipes", (req, res) => {
  if (req.query.sortBy === "name") {
    const sortedList = recipes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    return res.send(sortedList);
  }
  res.send(recipes);
});

// Returns one recipe based on id
app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);

  if (!recipe) return res.status(404).send("I couldn't find this recipe");

  res.send(recipe);
});

// Adds new recipe to array
app.post("/recipes", (req, res) => {
  const { name, content, prepTime } = req.body;

  // All fields
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid name");
  }

  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).send("Invalid content");
  }

  if (typeof prepTime !== "string" || prepTime.trim() === "") {
    return res.status(400).send("Invalid prepTime");
  }

  const recipe: Recipe = {
    id: JSON.stringify(recipes.length + 1),
    name,
    content,
    prepTime,
  };

  recipes.push(recipe);
  return res.send(recipe);
});

// Updates an existing recipe based on id
app.patch("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) return res.status(404).send("I couldn't find this recipe");

  const { name, content, prepTime } = req.body;

  // Validate only the fields that were provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).send("Invalid name");
    }
    recipe.name = name;
  }

  if (content !== undefined) {
    if (typeof content !== "string" || content.trim() === "") {
      return res.status(400).send("Invalid content");
    }
    recipe.content = content;
  }

  if (prepTime !== undefined) {
    if (typeof prepTime !== "string" || prepTime.trim() === "") {
      return res.status(400).send("Invalid prepTime");
    }
    recipe.prepTime = prepTime;
  }

  return res.send(recipe);
});

// Update a full recipe based on id
app.put("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) return res.status(404).send("I couldn't find this recipe");

  const { name, content, prepTime } = req.body;

  // All fields
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid name");
  }

  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).send("Invalid content");
  }

  if (typeof prepTime !== "string" || prepTime.trim() === "") {
    return res.status(400).send("Invalid prepTime");
  }

  // Replace the entire recipe
  recipe.name = name;
  recipe.content = content;
  recipe.prepTime = prepTime;

  return res.send(recipe);
});

// Deletes a recipe based on id
app.delete("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) return res.status(404).send("I couldn't find this recipe");

  const recipeIndex = recipes.indexOf(recipe);
  recipes.splice(recipeIndex, 1);

  return res.send("Recipe deleted successfully!");
});
