import React, { useState, useEffect } from "react";
import "../styles/TrackerItem.css";

const TrackerItem = ({
  tracker,
  increaseTime,
  deleteTracker,
  startTracker,
  stopTracker
}) => {
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    setTimerId(setInterval(() => increaseTime(tracker.id), 1000));
    startTracker(tracker.id);
  };

  const stopTimer = () => {
    clearInterval(timerId);
    stopTracker(tracker.id);
  };

  useEffect(() => {
    if (tracker.started) {
      startTimer();
    }

    return () => {
      stopTimer();
    };
  }, []);

  let hours = Math.floor(tracker.time / 3600);
  if (hours < 10) {
    hours = "" + 0 + hours;
  }

  let mins = Math.floor((tracker.time % 3600) / 60);
  if (mins < 10) {
    mins = "" + 0 + mins;
  }

  let secs = (tracker.time % 3600) % 60;
  if (secs < 10) {
    secs = "" + 0 + secs;
  }

  return (
    <div className={tracker.started ? "tracker started" :"tracker"}>
      <span className="tracker-title">{tracker.title}</span>
      <div className="tracker-controls">
        <span className="tracker-time">
          {hours}:{mins}:{secs}
        </span>
        {!tracker.started && (
          <button className="tracker-btn" onClick={startTimer}>
            <i className="material-icons">play_circle_outline</i>
          </button>
        )}
        {tracker.started && (
          <button className="tracker-btn" onClick={stopTimer}>
            <i className="material-icons">pause_circle_outline</i>
          </button>
        )}
        <button
          className="tracker-btn"
          onClick={() => deleteTracker(tracker.id)}
        >
          <i className="material-icons remove">remove_circle_outline</i>
        </button>
      </div>
    </div>
  );
};

export default TrackerItem;
