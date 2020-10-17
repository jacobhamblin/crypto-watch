import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import FastClick from "./vendor/fastclick";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
