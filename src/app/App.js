import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Lenis from "lenis";

import "react-toastify/dist/ReactToastify.css";
import "lenis/dist/lenis.css";

import Approute from "./routes/Approutes";
import LoginModal from "../pages/auth/LoginModal";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Show Login Modal only once per session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedBefore");

    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowLoginModal(false);
    sessionStorage.setItem("hasVisitedBefore", "true");
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        theme="light"
      />

      {/* Login Popup */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModal}
      />

      <Approute />
    </>
  );
}

export default App;