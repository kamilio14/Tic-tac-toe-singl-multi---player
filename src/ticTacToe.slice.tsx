import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Board } from "./Board";

interface ScoreState {
  x: number;
  o: number;
}

export type State = {
  board: Board;
  xIsNext: boolean;
  winner: Winner;
  player: string;
  score: ScoreState;
};

const initialState: State = {
  board: [null, null, null, null, null, null, null, null, null],
  xIsNext: true,
  winner: null,
  player: "single",
  score: {
    x: 0,
    o: 0,
  },
};

export type Board = Array<"X" | "O" | null>;

type Payload = {
  payload: number;
};

export type Winner = "O" | "X" | null | "draw";

const getFreeMoves = (state: Board): Array<number> => {
  return state.reduce((acc: Array<number>, cur, index) => {
    return cur === null ? [...acc, index] : acc;
  }, []);
};

const choseMoveIndex = (
  state: State,
  randomValue: number
): number | undefined => {
  const freeMoves: Array<number> = getFreeMoves(state.board);
  if (freeMoves.length === 0) return undefined;
  return freeMoves[Math.floor(randomValue * freeMoves.length)];
};

const evaluteSinglePlayerGame = (
  state: State,
  chosenFreeIndex: number | undefined
): State => {
  if (chosenFreeIndex === undefined) return { ...state, winner: "draw" };

  const newBoard = [...state.board];
  newBoard[chosenFreeIndex] = state.xIsNext ? "X" : "O";

  return {
    ...state,
    board: newBoard,
    xIsNext: !state.xIsNext,
  };
};

const evaluateWinner = (board: Board): Winner => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winningCombinations) {
    if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
      return "O";
    } else if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
      return "X";
    }
  }
  if (!board.includes(null)) return "draw";
  return null;
};

const adjustMove = (state: State, action: Payload): void => {
  if (state.winner === "X" || state.winner === "O") return;
  if (state.board[action.payload] !== null) return;

  state.board[action.payload] = state.xIsNext ? "X" : "O";
  state.xIsNext = !state.xIsNext;

  // single player section

  if (state.player === "single") {
    const randomValue = Math.random();

    const chosenFreeIndex: number | undefined = choseMoveIndex(
      state,
      randomValue
    );
    let newState = evaluteSinglePlayerGame(state, chosenFreeIndex);
    state.board = newState.board;
    state.xIsNext = newState.xIsNext;
  }
  state.winner = evaluateWinner(state.board);
};

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    makeMove: (state, action) => {
      adjustMove(state, action);
    },
    clearBoard: (state) => {
      state.board = state.board.map(() => null);
      state.xIsNext = state.winner === "X" ? false : true;
      state.winner = null;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    incrementScore: (state, action: PayloadAction<"x" | "o">) => {
      state.score[action.payload] = state.score[action.payload] + 1;
    },
  },
});

export default ticTacToeSlice.reducer;

export const { makeMove, clearBoard, setPlayer, incrementScore } =
  ticTacToeSlice.actions;
