import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "./styles/index.scss";
import { injectStores } from "@mobx-devtools/tools";
import User from "./stores/UserStore";
import Signs from "./stores/SignStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const userStore = new User();
injectStores({ userStore });
if (localStorage.getItem("user")) {
  userStore.createUser(JSON.parse(localStorage.getItem("user")));
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
