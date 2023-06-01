import {
  knight,
  knightEndCol,
  knightEndRow,
  isSelectingEnd,
  knightStartCol,
  knightStartRow,
} from "../gameboard/gameboard";
import moveKnight from "../../utils/move-knight";
import findShortestPath from "../../utils/shortest-path";
import "./controls.scss";

const createControls = () => {
  const controls = document.createElement("div");
  controls.classList.add("controls");
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const logo = generateControls("h1", "Knight Travails", "logo");

  const instruct = generateControls(
    "p",
    "Select spot on board to place knight or generate a random spot to place knight",
    "instruct"
  );

  const randomPoint = generateControls("button", "Randomly Select", "random");

  const endPoint = generateControls(
    "button",
    "Select End Point",
    "end-point-btn"
  );

  const travail = generateControls("button", "Travail", "travail");

  const clear = generateControls("button", "Clear", "clear");

  randomPoint.addEventListener("click", () => {
    const gameboard = document.querySelector(".gameboard");
    const gameboardArr = [...gameboard.children];
    gameboardArr.forEach((node) => {
      if (node.children) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    });
    const randRow = Math.floor(Math.random() * 7) + 1;
    const randCol = Math.floor(Math.random() * 7) + 1;
    gameboardArr.forEach((node) => {
      const { row, col } = node.dataset;
      if (+row === randRow && +col === randCol) {
        if (node.classList.contains("end-point")) {
          node.classList.remove("end-point");
        }
        node.appendChild(knight);
        knightStartCol = +node.dataset.col;
        knightStartRow = +node.dataset.row;
        return;
      }
    });
  });

  clear.addEventListener("click", () => {
    const gameboard = document.querySelector(".gameboard");
    const gameboardArr = [...gameboard.children];
    gameboardArr.forEach((node) => {
      if (node.classList.contains("end-point")) {
        node.classList.remove("end-point");
      }
      if (node.classList.contains("visited")) {
        node.classList.remove("visited");
      }
      if (node.children) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    });
    knightEndCol = "";
    knightEndRow = "";
    knightStartCol = "";
    knightStartRow = "";
    isSelectingEnd = false;
  });

  endPoint.addEventListener("click", () => {
    isSelectingEnd = true;
  });

  travail.addEventListener("click", () => {
    if (
      knightStartCol !== "" &&
      knightStartRow !== "" &&
      knightEndCol !== "" &&
      knightEndRow !== ""
    ) {
      let shortestPath = findShortestPath(
        knightStartRow,
        knightStartCol,
        knightEndRow,
        knightEndCol
      );
      moveKnight(shortestPath);
    } else {
      return;
    }
  });

  btnContainer.append(randomPoint, endPoint, clear);
  controls.append(logo, instruct, btnContainer, travail);

  return controls;
};

// helper function to create control buttons/elements
const generateControls = (element, text, className) => {
  const domElement = document.createElement(element);
  domElement.textContent = text;
  if (className) {
    domElement.classList.add(className);
  }
  return domElement;
};

export default createControls;
