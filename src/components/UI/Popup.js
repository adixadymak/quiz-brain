import React, { useContext } from "react";
import ReactDOM from "react-dom";
import GameContext from "../../context/game-context";
import classes from "./Popup.module.css";
import closeIcon from "../img/icons/close.png";

const Popup = (props) => {
  const GameCtx = useContext(GameContext);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.overlay}></div>,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <div className={`${classes.modal} ${props.className}`}>
          <button
            className={classes.closeBtn}
            onClick={() => GameCtx.hidePopupHandler()}
          >
            <img
              className={classes.closeBtnIcon}
              src={closeIcon}
              alt="close window"
            />
          </button>
          {props.children}
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};
export default Popup;
