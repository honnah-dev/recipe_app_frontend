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

## BoardsGrid Enhancements

### Board Cover Image
Show the first recipe's image as the board's cover image (like Pinterest).
- Requires a fancier backend SQL query that JOINs boards with recipes to grab the first recipe's image_url
- Frontend would display `board.cover_image` or a placeholder if no recipes in the board
- Not a database schema change - just a more advanced SELECT query

### Recipe Count Badge
Show how many recipes are in each board (e.g., "5 recipes").
- Backend query needs to COUNT recipes per board
- Display as a small badge on the board card
- Same idea - just a fancier SQL query, no schema change

## Notes to Self

### Search Feature in RecipesGrid.jsx
I left in a search/filter feature that filters recipes by title as you type. I may remove this before presenting because I didn't build it myself and might not be able to fully explain it. If I keep it, I should study how it works:
- `filteredRecipes` uses `.filter()` to only show recipes matching the search text
- `.toLowerCase()` makes it case-insensitive
- `.includes()` checks if the title contains the search text

## RecipeView Enhancements

### Edit Recipe Functionality
The Edit button is in RecipeView.jsx but currently just shows an alert ("Edit feature coming soon!").
- Create an edit form (similar to RecipeImportForm but pre-filled with existing data)
- Call PUT /api/recipes/:id to update the recipe
- Navigate back to the recipe view on save

## BoardDetail Enhancements

### Delete Board Button
Add a "Delete Board" button to BoardDetail.jsx with confirmation.
- Add handleDelete function (same pattern as recipe delete in RecipeView.jsx)
- Call DELETE /api/boards/:id
- window.confirm("Are you sure?") before deleting
- Navigate to /boards after delete

### Edit Board Button
Add an "Edit Board" button that opens BoardModal in edit mode.
- Reuse BoardModal with board={board} instead of board={null}
- Same showModal pattern from BoardsGrid

## Other Ideas
- Loading spinner component (replace "Loading..." text throughout app with a nice spinner)
- Drag and drop to reorder ingredients/instructions
- Recipe image upload (instead of just URL)
- Duplicate recipe detection
- Recipe tags/categories
