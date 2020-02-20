import React, { useState, useEffect } from "react";
import "../styles/App.css";
import TrackersList from "./TrackersList";
import AddTracker from "./AddTracker";

const App = () => {
  const [trackers, setTrackers] = useState([]);
  const uuidv1 = require('uuid/v1');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("trackers") || "[]")

    const updated = stored.map(tracker => {
      if (tracker.started) {
        return {
          ...tracker,
          time: tracker.time + Math.round((Date.now() - tracker.lastSaved) / 1000)
        };
      }

      return tracker;
    })

    setTrackers(updated);
  }, []);

  useEffect(() => {
    localStorage.setItem("trackers", JSON.stringify(trackers));
  }, [trackers]);

  const addTracker = title => {
    const newTracker = {
      id: uuidv1(),
      title,
      time: 0,
      started: true,
      lastSaved: Date.now(),
    };
    setTrackers([newTracker, ...trackers]);
  };

  const setTrackerTime = currentTrackerId => {
    setTrackers(trackers =>
      trackers.map(tracker => {
        if (currentTrackerId === tracker.id) {
          return {
            ...tracker,
            time: tracker.time + 1,
            lastSaved: Date.now()
          };
        }

        return tracker;
      })
    );
  };

  const startTracker = id => {
    setTrackers(trackers =>
      trackers.map(tracker => {
        if (id === tracker.id) {
          return {
            ...tracker,
            started: true
          };
        }

        return tracker;
      })
    );
  };

  const stopTracker = id => {
    setTrackers(trackers =>
      trackers.map(tracker => {
        if (id === tracker.id) {
          return {
            ...tracker,
            started: false
          };
        }

        return tracker;
      })
    );
  };

  const deleteTracker = id => {
    setTrackers(trackers.filter(tracker => tracker.id !== id));
  };

  return (
    <div className='trackers-container'>
      <h1>tracker</h1>
      <AddTracker addTracker={addTracker} />
      <TrackersList
        trackers={trackers}
        setTime={setTrackerTime}
        deleteTracker={deleteTracker}
        startTracker={startTracker}
        stopTracker={stopTracker}
      />
    </div>
  );
};

export default App;
