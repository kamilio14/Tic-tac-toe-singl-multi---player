import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeMove } from "./ticTacToe.slice";

interface SingleSquareProps {
  index: number;
  value: number | string | null;
}

export const Square = ({ index, value }: SingleSquareProps) => {
  const dispatch = useDispatch();
  const xIsNext = useSelector((state: any) => state.tick.xIsNext);

  const player: string = useSelector((state: any) => state.tick.player);

  const handleClick = () => {
    dispatch(makeMove(index));
  };

  return (
    <div className="square" onClick={handleClick}>
      <div
        className={`symbol ${
          (xIsNext &&
            value === "O" &&
            player === "single" &&
            "animation-symbol") ||
          (!xIsNext &&
            value === "X" &&
            player === "single" &&
            "animation-symbol")
        }`}
      >
        {value}
      </div>
    </div>
  );
};
