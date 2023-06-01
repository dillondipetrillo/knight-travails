import createKnight from "../knight/knight";
import "./gameboard.scss";

export const knight = createKnight();

export let isSelectingEnd = false;
export let knightStartCol = "";
export let knightStartRow = "";
export let knightEndCol = "";
export let knightEndRow = "";

const createGameboard = () => {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");
  let isWhite = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      isWhite ? square.classList.add("white") : square.classList.add("black");
      square.dataset.row = i;
      square.dataset.col = j;
      gameboard.appendChild(square);
      isWhite = !isWhite;
      square.addEventListener("click", (evt) => {
        const clickedSquare = evt.target;
        if (!isSelectingEnd) {
          gameboard.childNodes.forEach((node) => {
            if (node.childNode === knight) {
              node.removeChild();
            }
          });
          if (clickedSquare.classList.contains("end-point")) {
            clickedSquare.classList.remove("end-point");
          }
          clickedSquare.appendChild(knight);
          knightStartCol = +clickedSquare.dataset.col;
          knightStartRow = +clickedSquare.dataset.row;
        } else {
          gameboard.childNodes.forEach((node) => {
            if (node.classList.contains("end-point")) {
              node.classList.remove("end-point");
            }
          });
          if (clickedSquare.firstChild) {
            while (clickedSquare.firstChild) {
              clickedSquare.removeChild(clickedSquare.firstChild);
            }
          }
          clickedSquare.classList.add("end-point");
          knightEndCol = +clickedSquare.dataset.col;
          knightEndRow = +clickedSquare.dataset.row;
          isSelectingEnd = false;
        }
      });
    }
    isWhite = !isWhite;
  }
  return gameboard;
};

export default createGameboard;
