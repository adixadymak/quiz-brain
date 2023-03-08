import React, { lazy, Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/Homepage";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import GameDashboard from "./pages/GameDashboard";
// import GamePlaying from "./pages/GamePlaying";

import GameContext from "./context/game-context";

// Using lazyloading for faster
const GameDashboard = lazy(() => import("./pages/GameDashboard"));
const GamePlaying = lazy(() => import("./pages/GamePlaying"));

function App() {
  const GameCtx = useContext(GameContext);

  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
          <p className="bold fs-1-4rem">Please wait!</p>
        </div>
      }
    >
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Homepage />
        </Route>
        <Route path="/gameboard">
          <GameDashboard />
        </Route>

        <Route path="/game-playing">
          {GameCtx.gameMode === "playing" ? (
            <GamePlaying />
          ) : (
            <Redirect to="/gameboard" />
          )}
        </Route>

        <Route path="*">
          <Homepage />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
