import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GameContext from "../../context/game-context";
import goldCoinIcon from "../img/icons/gold-coin.png";
import giftIcon from "../img/icons/gift.png";
import diamondIcon from "../img/icons/diamond.png";
import quizBrainLogo from "../img/quiz-brain.png";

import classes from "./Header.module.css";

const Header = () => {
  const GameCtx = useContext(GameContext);

  const { diamondScore, goldScore, giftScore } = GameCtx.rewardScoreState;

  return (
    <header className={classes.header}>
      <Link to="/home" className={classes.headerLogo}>
        <img
          src={quizBrainLogo}
          alt="quiz brain"
          className={classes.logoIcon}
        />
        <p className={classes.logoText}>QuizBrain</p>
      </Link>

      {GameCtx.leaveHomepage && (
        <div className={classes.badges}>
          <div className={classes.badge}>
            <img
              className={classes.badgeIcon}
              src={goldCoinIcon}
              alt="Gold coin"
            />
            <div className={classes.badgeTextBox}>
              <p className={classes.badgeTitle}>Gold</p>
              <p className={classes.badgeScore}>{goldScore}</p>
            </div>
          </div>
          <div className={classes.badge}>
            <img
              className={classes.badgeIcon}
              src={diamondIcon}
              alt="Diamond coin"
            />
            <div className={classes.badgeTextBox}>
              <p className={classes.badgeTitle}>Diamond</p>
              <p className={classes.badgeScore}>{diamondScore}</p>
            </div>
          </div>
          <div className={classes.badge}>
            <img className={classes.badgeIcon} src={giftIcon} alt="Gift coin" />
            <div className={classes.badgeTextBox}>
              <p className={classes.badgeTitle}>Gift</p>
              <p className={classes.badgeScore}>{giftScore}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
