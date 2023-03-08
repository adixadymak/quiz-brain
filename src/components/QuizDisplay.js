import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import classes from "./QuizDisplay.module.css";

import RewardBox from "../components/RewardBox";
import Popup from "../components/UI/Popup";

import useTimer from "../hooks/use-timer";
import { quizCategories } from "../lib/quizBank";
import GameContext from "../context/game-context";

const QuizDisplay = ({ quizBank }) => {
  // I'm thinking of using useReducer here.
  const [currQuiz, setCurrQuiz] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [optionChosen, setOptionChosen] = useState("");
  const [hasChooseOption, setHasChooseOption] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [newGoldScore, setNewGoldScore] = useState(0);
  const [newDiamondScore, setNewDiamondScore] = useState(0);
  const [newGiftScore, setNewGiftScore] = useState(0);

  const history = useHistory();

  const GameCtx = useContext(GameContext);
  const currCategory = GameCtx.currCategoryClicked;
  // Working the the countdown timer Hook
  const [time, interruptTimer, resetTime] = useTimer(setHasChooseOption);

  const indexOfCorrectAnswer = quizBank[currQuiz].options.indexOf(
    quizBank[currQuiz].correctAnswer
  );
  const correctOption = quizBank[currQuiz].correctAnswer;

  let progressFill = `${((currQuiz + 1) / quizBank.length) * 100}%`;

  const resetGameHandler = () => {
    GameCtx.gameModeHandler("start");
    GameCtx.hidePopupHandler();
    history.push("/gameboard");
  };

  // Updating the reward.
  const dispatchRewardScore = GameCtx.dispatchRewardScore;
  useEffect(() => {
    if (hasChooseOption && correctOption === optionChosen && time >= 8) {
      dispatchRewardScore({ type: "NEW_REWARD_GOLD", gold: 5 });
      setNewGoldScore((prevNewGold) => prevNewGold + 5);
    }

    if (
      hasChooseOption &&
      correctOption === optionChosen &&
      (time === 7 || time === 5 || time === 6)
    ) {
      dispatchRewardScore({ type: "NEW_REWARD_DIAMOND", diamond: 3 });
      setNewDiamondScore((prevNewDiamond) => prevNewDiamond + 3);
    }

    if (
      hasChooseOption &&
      correctOption === optionChosen &&
      (time === 4 || time === 2 || time === 3)
    ) {
      dispatchRewardScore({ type: "NEW_REWARD_GIFT", gift: 1 });
      setNewGiftScore((prevNewGift) => prevNewGift + 1);
    }
  }, [hasChooseOption, dispatchRewardScore, time, correctOption, optionChosen]);
  const rewardScores = GameCtx.rewardScoreState;

  // Saving rewards into local storage
  useEffect(() => {
    localStorage.setItem("rewardScores", JSON.stringify(rewardScores));
  }, [rewardScores]);

  return (
    <>
      <div className={classes.gamePlayingHeader}>
        <div className={classes.countDown}>{time}</div>
        <div className={classes.quizProgress}>
          <span
            className={classes.quizProgressFill}
            style={{ width: progressFill }}
          />
          <p>
            Question
            <span className="bold"> {currQuiz + 1}</span> out of &nbsp;
            <span className="bold">{quizBank.length}</span>
          </p>
        </div>
      </div>
      <div className={classes.gamePlayingBody}>
        <div>
          <div className={classes.quizHeadingBox}>
            <h3 className={classes.quizHeading}>
              {quizBank[currQuiz].question}{" "}
            </h3>
          </div>
          <div className={classes.quizOptions}>
            {quizBank[currQuiz].options.map((option, index) => (
              <button
                disabled={hasChooseOption}
                className={`${classes.quizOption}
                ${
                  hasChooseOption &&
                  indexOfCorrectAnswer === index &&
                  `${classes.correct}`
                } 
                ${
                  hasChooseOption &&
                  optionChosen === option &&
                  indexOfCorrectAnswer !== index &&
                  `${classes.wrong}`
                }
                `}
                key={`${index} ${new Date()}`}
                onClick={() => {
                  setOptionChosen(option);
                  setHasChooseOption(true);
                  if (option === correctOption) {
                    setScoreCount((prevScore) => prevScore + 1);
                  }
                  interruptTimer();
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.quizFooter}>
        {currQuiz + 1 !== quizBank.length && hasChooseOption && (
          <button
            className={classes.nextQuiz}
            onClick={() => {
              setHasChooseOption(false);
              setOptionChosen("");
              setCurrQuiz((prevQuizCount) => prevQuizCount + 1);
              resetTime();
            }}
          >
            Next Quiz
          </button>
        )}

        {currQuiz + 1 === quizBank.length && hasChooseOption && (
          <button
            className={classes.nextQuiz}
            onClick={() => {
              setShowResult(true);
              GameCtx.showPopupHander();
            }}
          >
            Show Result
          </button>
        )}
      </div>
      {GameCtx.popupIsShown && showResult && (
        <Popup className={classes.messageContainer}>
          <div className={classes.messageHeader}>
            <h1 className={classes.messageHeading}>Your Result</h1>

            <p className={classes.messageDesc}>
              You have played
              <span className="bold">{` ${quizBank.length} `}quizzes </span> on
              &nbsp;{quizCategories[currCategory].name}.
            </p>
          </div>

          <div className={classes.scoreCountContainer}>
            <p className={classes.scoreCount}>
              <span className={classes.scoreWon}> {scoreCount}</span>/5
            </p>
            <p className={classes.quizNote}>quiz played</p>
          </div>

          <RewardBox
            newRewardScore={{ newGoldScore, newDiamondScore, newGiftScore }}
          />
          <div className={classes.btns}>
            <button
              className={`${classes.btn} ${classes.stopGame}`}
              onClick={resetGameHandler}
            >
              Start Again!
            </button>
          </div>
        </Popup>
      )}
      ;
    </>
  );
};

export default QuizDisplay;
