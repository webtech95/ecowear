import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.main>

      <Footer />
    </>
  );
};

export default MainLayout;
