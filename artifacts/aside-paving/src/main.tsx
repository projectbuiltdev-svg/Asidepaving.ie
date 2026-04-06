import { hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

hydrateRoot(
  document.getElementById("root")!,
  <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
    <App />
  </Router>
);
