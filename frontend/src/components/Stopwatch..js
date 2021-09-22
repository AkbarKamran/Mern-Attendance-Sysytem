import React from "react";
import ReactTimerStopwatch from "react-stopwatch-timer";
const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);
const Timer1 = () => {
  return (
    <h1>
      <ReactTimerStopwatch
        isOn={true}
        className="react-stopwatch-timer__table"
        watchType="stopwatch"
        displayCricle={true}
        color="gray"
        hintColor="red"
        fromTime={fromTime}
      />
    </h1>
  );
};

export default Timer1;
