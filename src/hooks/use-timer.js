import { useState, useEffect } from "react";

const useTimer = (setHasChooseOption) => {
  const initTime = 10;
  const [time, setTime] = useState(initTime);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const useEffectTimer = setInterval(() => {
      if (time < 1) {
        setHasChooseOption(true);
        clearInterval(useEffectTimer);
        console.log("Your time limit just end.");
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    setTimer(useEffectTimer);

    return () => clearInterval(useEffectTimer);
  }, [time, setHasChooseOption]);

  const interruptTimer = () => {
    setHasChooseOption(true);
    clearInterval(timer);
  };

  const resetTime = () => {
    setTime(initTime);
  };
  return [time, interruptTimer, resetTime];
};

export default useTimer;
