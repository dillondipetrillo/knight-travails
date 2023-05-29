import createKnight from "../knight/knight";
import "./gameboard.scss";

export const knight = createKnight();

const createGameboard = () => {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");
  let isWhite = false;
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      isWhite ? square.classList.add("white") : square.classList.add("black");
      square.dataset.row = i;
      square.dataset.col = j;
      gameboard.appendChild(square);
      isWhite = !isWhite;
      square.addEventListener("click", (evt) => {
        const clickedSquare = evt.target;
        gameboard.childNodes.forEach((node) => {
          if (node.childNode === knight) {
            node.removeChild();
          }
        });
        clickedSquare.appendChild(knight);
      });
    }
    isWhite = !isWhite;
  }
  return gameboard;
};

export default createGameboard;
