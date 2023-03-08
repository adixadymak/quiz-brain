import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Main from "../components/Layout/Main";
// import everydayImg from "../components/img/everyday.jpg";
import brainBuildImg from "../components/img/brain-build.jpg";
import GameContext from "../context/game-context";

import classes from "./Homepage.module.css";

const Homepage = () => {
  const GameCtx = useContext(GameContext);
  const history = useHistory();
  useEffect(() => {
    GameCtx.notLeaveHomepageHandler();
  });

  return (
    <Main>
      <div className={classes.hero}>
        <div className={classes.heroTextBox}>
          <h1 className={classes.heroHeading}>
            An Opportunity To Stay Updated On All Kinds Of Information
          </h1>

          <p className={classes.heroDescription}>
            Everyday is a fresh start to develop the ability to think quick on
            your feet. The excellent stress buster for everyone!
          </p>

          <button
            className={classes.playNowBtn}
            onClick={() => {
              GameCtx.gameModeHandler("start");
              GameCtx.LeaveHomepageHandler();
              history.push("/gameboard");
            }}
          >
            Play Now
          </button>
        </div>
        <img
          className={classes.heroTextImg}
          src={brainBuildImg}
          alt="Every is a fresh start"
        />
      </div>
    </Main>
  );
};

export default Homepage;
