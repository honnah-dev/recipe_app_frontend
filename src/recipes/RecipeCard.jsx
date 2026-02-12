/**
 * RecipeCard is a reusable display component that shows a recipe's image and title.
 * It receives a recipe prop from its parent — it does not fetch any data itself.
 * Used by RecipesGrid and BoardDetail to render recipe lists.
 */
import { Link } from "react-router";
export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      {recipe.image_url ? (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-card-image" />
      ) : (
        <div className="recipe-card-placeholder">{recipe.title}</div>
      )}
      <h2>{recipe.title}</h2>
    </Link>
  );
}
