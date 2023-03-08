import React from "react";
// Images
import classes from "./RewardBox.module.css";
import goldCoinIcon from "./img/icons/gold-coin.png";
import giftIcon from "./img/icons/gift.png";
import diamondIcon from "./img/icons/diamond.png";
import starIcon from "./img/icons/star.png";

export default function RewardBox({ newRewardScore }) {
  const { newGoldScore, newDiamondScore, newGiftScore } = newRewardScore;
  return (
    <div className={classes.rewardBox}>
      <div className="starts">
        <img className={classes.starIcon} src={starIcon} alt="star Icon" />
        <img className={classes.starIcon} src={starIcon} alt="star Icon" />
        <img className={classes.starIcon} src={starIcon} alt="star Icon" />
      </div>
      <div className={classes.rewardList}>
        <p className={classes.rewardBoxHeading}>Your Reward:</p>
        <div className={classes.rewardStuffs}>
          <div className={classes.rewardStuff}>
            <img className={classes.rewardIcon} src={goldCoinIcon} alt="gold" />
            <p>{newGoldScore}</p>
          </div>
          <div className={classes.rewardStuff}>
            <img className={classes.rewardIcon} src={diamondIcon} alt="gold" />
            <p>{newDiamondScore}</p>
          </div>
          <div className={classes.rewardStuff}>
            <img className={classes.rewardIcon} src={giftIcon} alt="gold" />
            <p>{newGiftScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
