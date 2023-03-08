import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FaPlayCircle } from "react-icons/fa";
import { HiPlay } from "react-icons/hi";

import classes from "./GameDashboard.module.css";

import Main from "../components/Layout/Main";
import Popup from "../components/UI/Popup";

import { quizCategories } from "../lib/quizBank";
import GameContext from "../context/game-context";

const GameDashboard = () => {
  const GameCtx = useContext(GameContext);

  // To automatically set the player's profile and badge to true
  useEffect(() => {
    GameCtx.LeaveHomepageHandler();
  });

  // Function to handle the botton click on each category list
  const categoryLookupHandler = (e) => {
    GameCtx.openCategoryHandler();
    GameCtx.currCategoryClickedHandler(e.currentTarget.id);
    GameCtx.showPopupHander();
  };

  const history = useHistory();

  const startPlayingHandler = () => {
    GameCtx.closeCategoryHandler();
    GameCtx.gameModeHandler("playing");
    history.push("/game-playing");
    GameCtx.setCurrCategoryId(quizCategories[GameCtx.currCategoryClicked].id);
  };

  return (
    <Main>
      <div className={classes.gameDashboard}>
        <header className={classes.gameDashboardHeader}>
          <h2>Let's Play!</h2>
          <p>Choose a category and start playing...</p>
        </header>

        <div className={classes.gameCategories}>
          {quizCategories.map((category, index) => (
            <div className={classes.gameCategory} key={category.id}>
              <img
                src={category.img.url}
                alt={category.img.alt}
                className={classes.categoryIcon}
              />
              <div className={classes.categoryData}>
                <div className={classes.categoryText}>
                  <h3>{category.name}</h3>
                  <p>{category.desc}</p>

                  {/* render the popup based on category's data */}
                  {GameCtx.openCategory && GameCtx.popupIsShown && (
                    <Popup className={classes.categoryModal}>
                      <img
                        src={
                          quizCategories[GameCtx.currCategoryClicked].img.url
                        }
                        alt={quizCategories[GameCtx.currCategoryClicked].desc}
                        className={classes.categoryModalImg}
                      />

                      <h3 className={classes.categoryModalHeading}>
                        {quizCategories[GameCtx.currCategoryClicked].name}
                      </h3>
                      <p className={classes.categoryModalDesc}>
                        {quizCategories[GameCtx.currCategoryClicked].desc}
                      </p>

                      <p className={`${classes.categoryModalNote} italic`}>
                        A counter will start immediately you press the
                        <span className="bold"> 'Start Now' </span>button
                      </p>

                      <button
                        className={classes.categoryModalBtn}
                        onClick={startPlayingHandler}
                      >
                        {/* <div className="centered">
                          <LoadingSpinner />
                        </div> */}
                        <p>Start Now!</p>
                        <HiPlay className={classes.categoryModalBtnIcon} />
                      </button>
                    </Popup>
                  )}
                </div>

                <button
                  className={classes.playIcon}
                  id={index}
                  onClick={categoryLookupHandler}
                >
                  <FaPlayCircle />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default GameDashboard;
