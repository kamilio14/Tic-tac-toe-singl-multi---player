// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import ticTacToeReducer from "../ticTacToe.slice";

export const rootReducer = combineReducers({
  tick: ticTacToeReducer,
});
