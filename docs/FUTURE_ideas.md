# Future Ideas & Stretch Goals

## RecipeImportForm Enhancements

### "Add More" Button for Ingredients
Allow users to add new ingredients to the list when editing an imported recipe.
- Add a button below the ingredients list
- On click, append an empty string to the ingredients array
- Bonus: Add a "Remove" button next to each ingredient

### "Add Step" Button for Instructions
Allow users to add new instruction steps when editing an imported recipe.
- Add a button below the instructions list
- On click, append an empty string to the instructions array
- Bonus: Add a "Remove" button next to each step

### Floating Modal UI
Convert RecipeImportForm from a standalone page to a floating modal/overlay that appears over the /boards page.
- User clicks "Import" in the navbar
- Modal slides in or fades in over the current page
- Background is dimmed but still visible
- Clicking outside the modal or pressing Escape closes it
- More seamless UX - user doesn't lose context of where they were

## RecipeCard Enhancements

### Board Tags (Pills/Badges)
Show which boards a recipe belongs to directly on the recipe card.
- Backend needs to return `boards: [{id, name}, ...]` with each recipe
- Display small colored pills/badges below the recipe title
- Each tag shows the board name
- Makes it easy to see recipe organization at a glance

## Notes to Self

### Search Feature in RecipesGrid.jsx
I left in a search/filter feature that filters recipes by title as you type. I may remove this before presenting because I didn't build it myself and might not be able to fully explain it. If I keep it, I should study how it works:
- `filteredRecipes` uses `.filter()` to only show recipes matching the search text
- `.toLowerCase()` makes it case-insensitive
- `.includes()` checks if the title contains the search text

## Other Ideas
- Loading spinner component (replace "Loading..." text throughout app with a nice spinner)
- Drag and drop to reorder ingredients/instructions
- Recipe image upload (instead of just URL)
- Duplicate recipe detection
- Recipe tags/categories
