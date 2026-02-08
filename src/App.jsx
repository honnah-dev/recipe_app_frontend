import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* ✅ TASK: "Wrap protected routes with ProtectedRoute component" */}
        <Route path="/recipes" element={<ProtectedRoute><p>All Recipes</p></ProtectedRoute>} />
        <Route path="/recipes/:id" element={<ProtectedRoute><p>Single Recipe</p></ProtectedRoute>} />
        <Route path="/boards" element={<ProtectedRoute><p>All Boards</p></ProtectedRoute>} />
        <Route path="/boards/:id" element={<ProtectedRoute><p>Board Detail</p></ProtectedRoute>} />
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Route>
    </Routes>
  );
}
