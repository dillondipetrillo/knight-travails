import createGameboard from "./components/gameboard/gameboard";
import createControls from "./components/controls/controls";
import "./style.scss";

(function () {
  const gameboardContainer = document.getElementById("board-container");

  const controls = createControls();
  const gameboard = createGameboard();

  gameboardContainer.append(controls, gameboard);
})();
