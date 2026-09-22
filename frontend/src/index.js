import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import './security/formTransport';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
