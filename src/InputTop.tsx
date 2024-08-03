import "./inputs.styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setPlayer } from "./ticTacToe.slice";
import { Tick } from "./Board";
export const InputTop = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: Tick) => state.tick.player);
  const { x, o } = useSelector((state: Tick) => state.tick.score);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setPlayer(value));
  };

  return (
    <div className="top">
      <div className="score">
        <div className="score-x score-both">
          <h3> X score {x}</h3>
        </div>
        <div className="score-o">
          <h3> O score {o}</h3>
        </div>
      </div>

      <div className="inputs-top">
        <div className="single-player player">
          <input
            className="input-one"
            type="radio"
            value="single"
            checked={player === "single"}
            onChange={handleRadioChange}
          />
          <h2>Single Player</h2>
        </div>
        <div className="multi-player player">
          <input
            className="input-two"
            type="radio"
            value="multi"
            checked={player === "multi"}
            onChange={handleRadioChange}
          />

          <h2>Multi-Player</h2>
        </div>
      </div>
    </div>
  );
};
