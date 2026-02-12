/**
 * Layout wraps every page with the Navbar at the top.
 * The Outlet renders whichever child route is currently active.
 */
import { Outlet } from "react-router";

import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}