import Knight from "./knight.png";
import "./knight-style.scss";

const createKnight = () => {
  const knightImg = document.createElement("img");
  knightImg.src = Knight;
  knightImg.setAttribute("class", "knight-img");
  return knightImg;
};

export default createKnight;
