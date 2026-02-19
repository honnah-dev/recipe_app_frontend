import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main>
        {user && (
          <div className="sidebar-text">
            <span className="sidebar-label">Welcome to</span>
            <span className="sidebar-username">{user.username}&apos;s</span>
            <span className="sidebar-label">Recipes!</span>
          </div>
        )}

        <Outlet />

        <img src="/text_in_a_circlesvg.svg" alt="" className="circle-badge" />
      </main>
    </>
  );
}
