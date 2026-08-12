import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import OurWork from "./pages/OurWork";
import CaseStudy from "./pages/CaseStudy";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { trackPageView } from "./utils/analytics.js";
import "./App.css";
import "./styles/pageLayout.css";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <SEO path={location.pathname} />

      <ScrollToTop />
      <AnalyticsTracker />

      <div className="site">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-work/:slug" element={<CaseStudy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
