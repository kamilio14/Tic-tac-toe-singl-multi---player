import React, { useEffect } from "react";
import { Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { Board as BoardType } from "./ticTacToe.slice";
import { State } from "./ticTacToe.slice";
import { Winner } from "./ticTacToe.slice";
import { UseDispatch } from "react-redux";
import { clearBoard, incrementScore } from "./ticTacToe.slice";

export type Tick = {
  tick: State;
};

export const Board = () => {
  const board: BoardType = useSelector((state: Tick) => state.tick.board);
  const winner: Winner = useSelector((state: Tick) => state.tick.winner);

  const dispatch = useDispatch();

  // Define winnerMessages outside of the conditional block
  const winnerMessages: Record<string, string> = {
    X: "Winner is X",
    O: "Winner is O",
    draw: "It's a draw",
  };

  const handleClear = () => {
    dispatch(clearBoard());
  };

  useEffect(() => {
    if (winner === "X" || winner === "O") {
      dispatch(incrementScore(winner.toLowerCase() as "x" | "o"));
    }
  }, [winner, dispatch]);

  return (
    <>
      <>
        {board.map((item: string | null, index: number) => (
          <Square value={item} index={index} key={index} />
        ))}

        {winner && (
          <div className="modal-page">
            <div className="winner-modal">
              <h2 className="winner-text">{winnerMessages[winner]}</h2>
              <button onClick={handleClear} className="btn">
                Close
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
};
