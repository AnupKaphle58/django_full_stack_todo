import React, { useState } from "react";

function Selector({ filteredTask, fetchAll }) {
  const [selected, setSelected] = useState(1);
  const handleClick = (divNum) => {
    setSelected(divNum);
  };
  const handleFilter = (filter) => {
    filteredTask(filter);
  };
  return (
    <div className="selector-main mt-2">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn btn-light ${selected === 1 ? "active" : " "}`}
          onClick={() => {
            handleClick(1);
            fetchAll();
          }}
        >
          Show all
        </button>
        <button
          type="button"
          className={`btn btn-light ${selected === 2 ? "active" : " "}`}
          onClick={() => {
            handleFilter("INPROGRESS");
            handleClick(2);
          }}
        >
          In progress
        </button>
        <button
          type="button"
          className={`btn btn-light ${selected === 3 ? "active" : " "}`}
          onClick={() => {
            handleClick(3);
            handleFilter("COMPLETED");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Selector;
