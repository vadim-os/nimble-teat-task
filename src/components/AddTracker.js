import React, { useState } from "react";
import "../styles/AddTracker.css";

const AddTracker = ({ addTracker }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    event.preventDefault();

    if (!title) {
      addTracker(new Date().toLocaleString());
    } else {
      addTracker(title);
    }

    setTitle("");
  };

  return (
    <div className="add">
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          className="add-input"
          type="text"
          value={title}
          placeholder="Enter tracker name"
          onChange={event => setTitle(event.target.value)}
        ></input>
        <button className="add-btn" type="submit">
          <i className="material-icons play">play_circle_filled</i>
        </button>
      </form>
    </div>
  );
};

export default AddTracker;
