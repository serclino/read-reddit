import React from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../features/filterSlice";

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="buttons-container">
      <button onClick={() => dispatch(changeFilter({ nameOfFilter: "hot" }))}>
        Hot
      </button>
      <button onClick={() => dispatch(changeFilter({ nameOfFilter: "new" }))}>
        New
      </button>
      <button onClick={() => dispatch(changeFilter({ nameOfFilter: "top" }))}>
        Top
      </button>
    </div>
  );
};
