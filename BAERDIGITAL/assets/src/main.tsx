import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App.tsx";
import "./index.css";

function Main() {
  useEffect(() => {
    // Handle /portfolio URL from external links (like LinkedIn)
    const path = window.location.pathname;
    if (path === '/portfolio' || path === '/portfolio/') {
      // Wait for DOM to fully load, then scroll to portfolio
      const timer = setTimeout(() => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL to clean path without page reload
          window.history.replaceState({}, '', '/portfolio');
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(<Main />);