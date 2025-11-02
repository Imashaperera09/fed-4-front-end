import Navigation from "../components/Navigation/Navigation";
import Footer from "../pages/home/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};
