import { Outlet } from "react-router-dom";
import "./LandingPage.css";
import { AnimatePresence } from "framer-motion";

function LandingPage() {
  return (
    <div className="landing-page">
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
