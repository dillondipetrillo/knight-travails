import createKnight from "../components/knight/knight";

const knight = createKnight();

const moveKnight = async (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const [row, col] = arr[i];

    // Get the DOM element currently holding the knight
    const knightDOM = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );

    // Add knight to next DOM element
    knightDOM.appendChild(knight);

    // Remove knight from previous DOM element
    if (i > 0) {
      const [prevRow, prevCol] = arr[i - 1];
      const prevKnight = document.querySelector(
        `[data-row="${prevRow}"][data-col="${prevCol}"]`
      );
      while (prevKnight.firstChild) {
        prevKnight.removeChild(prevKnight.firstChild);
      }
    }

    // Delay knight movement
    await delay(1000);
  }
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default moveKnight;
