import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "./styles/index.scss";
import { injectStores } from "@mobx-devtools/tools";
import signsStore from "./stores/SignStore";
import userStore from "./stores/UserStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

injectStores({ userStore, signsStore });
if (localStorage.getItem("userAuth")) {
  userStore.setAuthUser();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
