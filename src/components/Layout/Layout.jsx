import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default Layout;
