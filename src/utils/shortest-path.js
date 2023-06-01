// Function to check if a position is valid on the chessboard
const isValidPosition = (row, col) => {
  return row >= 0 && col >= 0 && row < 8 && col < 8;
};

const findShortestPath = (startRow, startCol, endRow, endCol) => {
  // Inititalize the queue for a BFS
  const queue = [];
  queue.push({
    row: startRow,
    col: startCol,
    distance: 0,
    path: [[startRow, startCol]],
  });

  // Create a 2D array to represent the chessboard
  const chessboard = Array(8)
    .fill()
    .map(() => Array(8).fill(false));

  // Define the possible moves of a knight
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  // Mark the starting position as visited
  chessboard[startRow][startCol] = true;

  while (queue.length > 0) {
    // Dequeue the next position from the queue
    const { row, col, distance, path } = queue.shift();

    // Check if the target position is reach
    if (row === endRow && col === endCol) {
      return path; // shortest distance
    }

    // Explore all possible moves the knight can make
    for (let i = 0; i < knightMoves.length; i++) {
      const [dx, dy] = knightMoves[i];
      const newRow = row + dx;
      const newCol = col + dy;

      // check if the new position is valid and not yet visited
      if (isValidPosition(newRow, newCol) && !chessboard[newRow][newCol]) {
        // Mark the new position as visited and enqueue
        chessboard[newRow][newCol] = true;
        const newPath = [...path, [newRow, newCol]];
        queue.push({
          row: newRow,
          col: newCol,
          distance: distance + 1,
          path: newPath,
        });
      }
    }
  }

  // If the target is unreachable
  return [];
};

export default findShortestPath;
