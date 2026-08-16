import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
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
import Faq from "./pages/Faq";
import LocalSeoLanding from "./pages/LocalSeoLanding";
import { LOCAL_SEO_PATHS } from "./data/localSeoPages.js";
import { trackPageView } from "./utils/analytics.js";
import { normalizePathname } from "./utils/pathname.js";
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
  const pathname = normalizePathname(location.pathname);
  const analyticsPath = `${location.pathname}${location.search}${location.hash}`;

  return (
    <>
      <Analytics route={pathname} path={analyticsPath} />
      <SEO path={pathname} />

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
            <Route path="/faq" element={<Faq />} />
            {LOCAL_SEO_PATHS.map((path) => (
              <Route key={path} path={path} element={<LocalSeoLanding />} />
            ))}
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
