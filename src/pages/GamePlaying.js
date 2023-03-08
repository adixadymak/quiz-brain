import React, { useState, useCallback, useEffect, useContext } from "react";

import Main from "../components/Layout/Main";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import QuizDisplay from "../components/QuizDisplay";

import classes from "./GamePlaying.module.css";
import "../App.css";

import GameContext from "../context/game-context";

const GamePlaying = () => {
  const GameCtx = useContext(GameContext);
  const currCategoryId = GameCtx.currCategoryId;
  const [quizBank, setQuizBank] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQuizzes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    /*
for future updates
    // https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
*/

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${currCategoryId}&difficulty=easy&type=multiple`
      );

      if (!response.ok)
        throw new Error("Something went wrong! Try Reloading...");
      const data = await response.json();
      console.log(data);

      const quizzes = data.results.map((quiz, index) => {
        const options = [
          ...quiz.incorrect_answers.map((answer) => decodeString(answer)),
          decodeString(quiz.correct_answer),
        ];
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(quiz.question),
          options: options.sort(() => Math.random() - 0.5),
          correctAnswer: quiz.correct_answer,
        };
      });

      console.log("This should be an array of objects");
      console.log(quizzes);
      setQuizBank(quizzes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [currCategoryId]);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  // Get the quizzes immediately the game playing componet run
  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  // The content to display
  let content = <p>Opps! Found No quizzes. Try reloading.</p>;

  if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
        <p className="bold fs-1-4rem">Please wait!</p>
      </div>
    );
  }

  if (error) {
    content = (
      <p className="fs-1-4rem centered">
        Ophss! {error} - Please, check your internet connection and reload your
        browser.
      </p>
    );
  }

  if (!error && !isLoading && quizBank.length !== 0) {
    content = <QuizDisplay quizBank={quizBank} />;
  }
  return <Main className={classes.gamePlaying}>{content}</Main>;
};

export default GamePlaying;
