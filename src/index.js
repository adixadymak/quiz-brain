import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GameContextProvider } from "./context/game-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </BrowserRouter>
);
