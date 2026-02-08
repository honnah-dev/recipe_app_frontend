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
// somewhere in here i think i will do this 
// const { user } = useAuth();
// ...
{/* <h1>Welcome, {user?.username}!</h1> */}