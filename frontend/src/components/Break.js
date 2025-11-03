import React, { useState, useRef } from "react";
import Axios from "axios";
import "../App.css";

export default function Break(props) {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);
  var num = 1;
  var startvalue;
  if (num === 1) {
    startvalue = props.akbar;
  }

  console.log(startvalue);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
    //console.log(formatTime());
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  const handleReset = () => {
    console.log(formatTime());
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  if (startvalue === true) {
    num++;
    startvalue = false;
    const breaktime = formatTime();
    const userEmail = localStorage.getItem("userEmail");
    
    Axios.post("/break", { breaktime, email: userEmail })
      .then((response) => {
        console.log("Break time saved:", response.data);
        // Optionally reload or show success message
      })
      .catch((error) => {
        console.error("Break save error:", error.response?.data || error.message);
      });
  }

  return (
    <div class="react-time-box">
      <h1>{formatTime()}</h1>
      <div>
        {!isActive && !isPaused ? (
          <button class="btn btn-primary btn-sm" onClick={handleStart}>
            Start
          </button>
        ) : isPaused ? (
          <button class="btn btn-primary btn-sm" onClick={handlePause}>
            Pause
          </button>
        ) : (
          <button class="btn btn-primary btn-sm" onClick={handleResume}>
            Resume
          </button>
        )}
        {/* <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button> */}
      </div>
    </div>
  );
}
