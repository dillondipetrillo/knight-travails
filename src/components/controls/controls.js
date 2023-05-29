import { knight } from "../gameboard/gameboard";
import { isSelectingEnd } from "../gameboard/gameboard";
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
    const randRow = Math.floor(Math.random() * 8) + 1;
    const randCol = Math.floor(Math.random() * 8) + 1;
    gameboardArr.forEach((node) => {
      const { row, col } = node.dataset;
      if (+row === randRow && +col === randCol) {
        if (node.classList.contains("end-point")) {
          node.classList.remove("end-point");
        }
        node.appendChild(knight);
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
      if (node.children) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    });
  });

  endPoint.addEventListener("click", () => {
    isSelectingEnd = true;
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
