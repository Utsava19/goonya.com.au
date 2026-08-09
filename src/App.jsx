import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import OurWork from "./pages/OurWork";
import Contact from "./pages/Contact";
import "./App.css";

// Scroll to top on route change
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <div className="site">
      <ScrollTop />
      <Navbar />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
