import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/Context.jsx";
import UserState from "./context/user";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <UserState>
      <App />
    </UserState>
  </ContextProvider>
);
