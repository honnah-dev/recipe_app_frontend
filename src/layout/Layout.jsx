/**
 * Layout wraps every page with the Navbar at the top.
 * The Outlet renders whichever child route is currently active.
 */
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main>
        {/* //{user && means it only shows the welcome text if someone is logged in */}
        {user && <p className="welcome-message">Welcome to {user.username}&apos;s Recipes!</p>}

        <Outlet />
      </main>
    </>
  );
}
