import React from "react";
import "./ItemCount.scss";
import { useConfigBtns } from "../Hooks/useConfigBtns";

export const ItemCount = ({ max, min = 0, counter, setCounter }) => {
  const handleSumar = () => {
    counter < max && setCounter(counter + 1);
  };

  const handleRestar = () => {
    counter > min && setCounter(counter - 1);
  };

  const { configRestar, configSumar } = useConfigBtns(
    counter,
    max,
    min,
    handleRestar,
    handleSumar
  );

  return (
    <div className="itemCount">
      <span className="itemCount-text">Cantidad:</span>
      <button className="itemCount-btn" {...configRestar}>
        -
      </button>
      <div className="itemCount-counter">
        <span>{counter}</span>
      </div>
      <button className="itemCount-btn" {...configSumar}>
        +
      </button>
    </div>
  );
};
