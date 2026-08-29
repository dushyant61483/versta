import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TryOn from "./pages/TryOn";
import Wardrobe from "./pages/Wardrobe";
import Recommendations from "./pages/Recommendations";

function App() {
  const getCurrentPage = () => {
    const path = window.location.pathname;

    switch (path) {
      case "/profile":
        return "profile";

      case "/wardrobe":
        return "wardrobe";

      case "try-on":
          return (
            <TryOn
              outfit={window.history.state?.outfit || null}
            />
          );

      case "/recommendations":
        return "recommendations";

      case "/":
      default:
        return "home";
    }
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPage(getCurrentPage());
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile />;

      case "wardrobe":
        return <Wardrobe />;

      case "try-on":
        return <TryOn />;

      case "recommendations":
        return <Recommendations />;

      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Navbar onNavigate={navigate} />

      {renderPage()}
    </>
  );
}

export default App;