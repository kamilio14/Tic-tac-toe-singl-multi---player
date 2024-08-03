import React from "react";
import "./styles.css";
import { Board } from "./Board";
import { InputTop } from "./InputTop";

function App() {
  return (
    <div className="App">
      <InputTop />
      <div className="game">
        <Board />
      </div>
    </div>
  );
}

export default App;
