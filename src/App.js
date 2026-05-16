import { useState } from "react";
import './styles.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Missions from "./pages/Missions";
import Impact from "./pages/Impact";
import Stories from "./pages/Stories";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("Home");

  const handleSetPage = (p) => {
    setPage(p);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  };

  const renderPage = () => {
    switch (page) {
      case "Home":     return <Home setPage={handleSetPage} />;
      case "About":    return <About />;
      case "Missions": return <Missions setPage={handleSetPage} />;
      case "Impact":   return <Impact />;
      case "Stories":  return <Stories />;
      case "Donate":   return <Donate />;
      case "Contact":  return <Contact />;
      default:         return <Home setPage={handleSetPage} />;
    }
  };

  return (
    <>
      <Nav activePage={page} setPage={handleSetPage} />
      <main>{renderPage()}</main>
      <Footer setPage={handleSetPage} />
      <a
        href="#"
        className="float-donate"
        onClick={e => { e.preventDefault(); handleSetPage("Donate"); }}
      >
        ♥ Donate
      </a>
    </>
  );
}