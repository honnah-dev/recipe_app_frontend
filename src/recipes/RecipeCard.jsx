import { Link } from "react-router";

// RecipeCard just displays what it's given - no fetching!
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
