// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

// Import tailwind styles
import "./presentation/styles/tailwind.css";

import "zmp-ui/zaui.css";

import "./presentation/styles/app.scss";

// import "./";
// import "./utils/rippleEffect.js";
// Import App Component
import App from "./main";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount React App
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(App));
