import React, { useState, useReducer } from "react";

const GameContext = React.createContext({
  leaveHomepage: false,
  LeaveHomepageHandler: () => {},
  notLeaveHomepageHandler: () => {},
  openCategoryHandler: () => {},
  closeCategoryHandler: () => {},
  currCategoryClickedHandler: () => {},
  currCategoryClicked: 0,
  gameMode: "",
  gameModeHandler: () => {},
  popupIsShown: false,
  showPopupHander: () => {},
  hidePopupHandler: () => {},
  rewardScoreState: {},
  dispatchRewardScore: () => {},
  currCategoryId: null,
  setCurrCategoryId: () => {},
});

const rewardScoreReducer = (state, action) => {
  if (action.type === "NEW_REWARD_GOLD") {
    return {
      ...state,
      goldScore: state.goldScore + action.gold,
    };
  }
  if (action.type === "NEW_REWARD_DIAMOND") {
    return {
      ...state,
      diamondScore: state.diamondScore + action.diamond,
    };
  }
  if (action.type === "NEW_REWARD_GIFT") {
    return {
      ...state,
      giftScore: state.giftScore + action.gift,
    };
  }

  return { goldScore: 25, diamondScore: 37, giftScore: 54 };
};

export const GameContextProvider = (props) => {
  const [leaveHomepage, setLeaveHomepage] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [currCategoryClicked, setCurrCategoryClicked] = useState();
  const [gameMode, setGameMode] = useState("");
  const [popupIsShown, setPopupIsShown] = useState(false);
  const [currCategoryId, setCurrCategoryId] = useState(null);

  // Getting data from localStorage and setting inital reward scores to persist. Later from Google Firebase
  const rewardScoreFromLocalStorage = JSON.parse(
    localStorage.getItem("rewardScores")
  );

  const initalRewardScoreState = rewardScoreFromLocalStorage || {
    goldScore: 0,
    diamondScore: 0,
    giftScore: 0,
  };
  const [rewardScoreState, dispatchRewardScore] = useReducer(
    rewardScoreReducer,
    initalRewardScoreState
  );

  const showPopupHander = () => {
    setPopupIsShown(true);
  };

  const hidePopupHandler = () => {
    setPopupIsShown(false);
  };

  const gameModeHandler = (gameMode) => {
    setGameMode(gameMode);
  };

  const currCategoryClickedHandler = (categoryId) => {
    setCurrCategoryClicked(categoryId);
  };

  const LeaveHomepageHandler = () => {
    setLeaveHomepage(true);
  };
  const notLeaveHomepageHandler = () => {
    setLeaveHomepage(false);
  };

  const openCategoryHandler = () => {
    setOpenCategory(true);
  };

  const closeCategoryHandler = () => {
    setOpenCategory(false);
  };

  return (
    <GameContext.Provider
      value={{
        leaveHomepage,
        LeaveHomepageHandler,
        notLeaveHomepageHandler,
        openCategoryHandler,
        closeCategoryHandler,
        openCategory,
        currCategoryClickedHandler,
        currCategoryClicked,
        gameModeHandler,
        gameMode,
        showPopupHander,
        hidePopupHandler,
        popupIsShown,
        rewardScoreState,
        dispatchRewardScore,
        currCategoryId,
        setCurrCategoryId,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
