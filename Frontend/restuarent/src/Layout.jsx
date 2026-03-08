import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";

export default function Layout() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ScrollToHash />
      {user && <Navbar />}
      <Outlet />
    </>
  );
}
