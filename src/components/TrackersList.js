import React from "react";
import TrackerItem from "./TrackerItem";

const TrackersList = ({
  trackers,
  setTime,
  deleteTracker,
  startTracker,
  stopTracker
}) => {
  return (
    <>
      {trackers.map(tracker => (
        <TrackerItem
          key={tracker.id}
          tracker={tracker}
          increaseTime={setTime}
          deleteTracker={deleteTracker}
          startTracker={startTracker}
          stopTracker={stopTracker}
        />
      ))}
    </>
  );
};

export default TrackersList;
