import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initAnalytics } from "./utils/analytics.js";
import { inject } from "@vercel/analytics";

initAnalytics();
inject();
createRoot(document.getElementById("root")).render(<App />);
