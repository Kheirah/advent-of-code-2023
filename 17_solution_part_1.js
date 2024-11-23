const fs = require("fs");

const input = fs.readFileSync("./17_input", "utf8");
const arr = input.split("\n");

const visited = {};

function heatLoss(i = 0, j = 0, previousLoss = 0, direction = 1, steps = 0) {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length) {
    return;
  }

  if (
    visited[`${i},${j}`] !== undefined &&
    visited[`${i},${j}`] <= previousLoss + Number(arr[i][j])
  )
    return;

  const currentLoss = i != 0 || j != 0 ? Number(arr[i][j]) : 0;

  if (i != 0 || j != 0) visited[`${i},${j}`] = previousLoss + currentLoss;

  if (i === arr.length - 1 && j === arr[i].length - 1) {
    return;
  }

  if (steps < 3) {
    const [x, y] = move(direction);
    heatLoss(i + x, j + y, previousLoss + currentLoss, direction, steps + 1);
  }

  const [[xLeft, yLeft, leftDirection], [xRight, yRight, rightDirection]] =
    getDirection(direction);

  heatLoss(i + xLeft, j + yLeft, previousLoss + currentLoss, leftDirection, 1);
  heatLoss(
    i + xRight,
    j + yRight,
    previousLoss + currentLoss,
    rightDirection,
    1
  );

  function move(dir) {
    if (dir === 0) {
      return [-1, 0];
    }
    if (dir === 1) {
      return [0, 1];
    }
    if (dir === 2) {
      return [1, 0];
    }
    if (dir === 3) {
      return [0, -1];
    }
  }

  function getDirection(dir) {
    if (dir === 0) {
      return [
        [0, -1, 3],
        [0, 1, 1],
      ];
    }
    if (dir === 1) {
      return [
        [-1, 0, 0],
        [1, 0, 2],
      ];
    }
    if (dir === 2) {
      return [
        [0, 1, 1],
        [0, -1, 3],
      ];
    }
    if (dir === 3) {
      return [
        [1, 0, 2],
        [-1, 0, 0],
      ];
    }
  }
}

heatLoss();

console.log(visited[`${arr.length - 1},${arr[0].length - 1}`]);

/* 925 too high */