"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express_1 = require("express");
// Variables
var PORT = process.env.PORT || "4000";
var recipes = [
    {
        id: "1",
        name: "Classic Pancakes",
        content: "Mix flour, milk, egg, baking powder, and sugar. Cook on a buttered pan until golden on both sides.",
        prepTime: "20",
    },
    {
        id: "2",
        name: "Tomato Basil Pasta",
        content: "Boil pasta. Saute garlic in olive oil, add crushed tomatoes, simmer, then toss with pasta and fresh basil.",
        prepTime: "25",
    },
    {
        id: "3",
        name: "Chicken Caesar Salad",
        content: "Grill seasoned chicken, slice it, and serve over romaine with croutons, parmesan, and Caesar dressing.",
        prepTime: "15",
    },
    {
        id: "4",
        name: "Veggie Omelette",
        content: "Whisk eggs, pour into pan, add bell pepper, onion, spinach, and cheese. Fold when set.",
        prepTime: "10",
    },
];
var app = (0, express_1.default)();
// Functions
// Enabling JSON parsing middleware to access body object
app.use(express_1.default.json());
// Listen to port
app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
// Add Routes that...
// Returns home page
app.get("/", function (req, res) {
    res.send("Welcome to your recipe app!");
});
// Returns a full recipe list
app.get("/recipes", function (req, res) {
    if (req.query.sortBy === "name") {
        var sortedList = recipes
            .slice()
            .sort(function (a, b) { return a.name.localeCompare(b.name); });
        return res.send(sortedList);
    }
    res.send(recipes);
});
// Returns one recipe based on id
app.get("/recipes/:id", function (req, res) {
    var recipe = recipes.find(function (r) { return r.id === req.params.id; });
    if (!recipe)
        return res.status(404).send("I couldn't find this recipe");
    res.send(recipe);
});
// Adds new recipe to array
app.post("/recipes", function (req, res) {
    var _a = req.body, name = _a.name, content = _a.content, prepTime = _a.prepTime;
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
    var recipe = {
        id: JSON.stringify(recipes.length + 1),
        name: name,
        content: content,
        prepTime: prepTime,
    };
    recipes.push(recipe);
    return res.send(recipe);
});
// Updates an existing recipe based on id
app.patch("/recipes/:id", function (req, res) {
    var recipe = recipes.find(function (r) { return r.id === req.params.id; });
    if (!recipe)
        return res.status(404).send("I couldn't find this recipe");
    var _a = req.body, name = _a.name, content = _a.content, prepTime = _a.prepTime;
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
app.put("/recipes/:id", function (req, res) {
    var recipe = recipes.find(function (r) { return r.id === req.params.id; });
    if (!recipe)
        return res.status(404).send("I couldn't find this recipe");
    var _a = req.body, name = _a.name, content = _a.content, prepTime = _a.prepTime;
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
app.delete("/recipes/:id", function (req, res) {
    var recipe = recipes.find(function (r) { return r.id === req.params.id; });
    if (!recipe)
        return res.status(404).send("I couldn't find this recipe");
    var recipeIndex = recipes.indexOf(recipe);
    recipes.splice(recipeIndex, 1);
    return res.send("Recipe deleted successfully!");
});
