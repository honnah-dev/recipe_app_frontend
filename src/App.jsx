import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import RecipesGrid from "./recipes/RecipesGrid";
import RecipeView from "./recipes/RecipeView";
import RecipeImportForm from "./recipes/RecipeImportForm";
import BoardsGrid from "./boards/BoardsGrid";
import BoardDetail from "./boards/BoardDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<ProtectedRoute><RecipesGrid /></ProtectedRoute>} />
        <Route path="/recipes/import" element={<ProtectedRoute><RecipeImportForm /></ProtectedRoute>} />
        <Route path="/recipes/:id" element={<ProtectedRoute><RecipeView /></ProtectedRoute>} />
        <Route path="/boards" element={<ProtectedRoute><BoardsGrid /></ProtectedRoute>} />
        <Route path="/boards/:id" element={<ProtectedRoute><BoardDetail /></ProtectedRoute>} />
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Route>
    </Routes>
  );
}
