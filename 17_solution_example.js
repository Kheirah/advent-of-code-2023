const fs = require("fs");

const input = fs.readFileSync("./17_input", "utf8");
const arr = input.split("\n");

const visited = {};

function heatLossIterative() {
  const stack = [{ i: 0, j: 0, previousLoss: 0, direction: 1, steps: 0 }];

  while (stack.length > 0) {
    const { i, j, previousLoss, direction, steps } = stack.shift();

    if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length) {
      continue;
    }

    if (
      visited[`${i},${j}`] !== undefined &&
      visited[`${i},${j}`] <= previousLoss + Number(arr[i][j])
    ) {
      continue;
    }

    const currentLoss = i != 0 || j != 0 ? Number(arr[i][j]) : 0;

    if (i != 0 || j != 0) visited[`${i},${j}`] = previousLoss + currentLoss;

    if (i === arr.length - 1 && j === arr[i].length - 1) {
      continue;
    }

    if (steps < 3) {
      const [x, y] = move(direction);
      stack.push({
        i: i + x,
        j: j + y,
        previousLoss: previousLoss + currentLoss,
        direction,
        steps: steps + 1,
      });
    }

    const directions = getDirection(direction);
    directions.forEach(([x, y, newDirection]) => {
      stack.push({
        i: i + x,
        j: j + y,
        previousLoss: previousLoss + currentLoss,
        direction: newDirection,
        steps: 1,
      });
    });
  }

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

heatLossIterative();

console.log(visited[`${arr.length - 1},${arr[0].length - 1}`]);

//console.log(drawPath().join("\n"));

function drawPath() {
  const cleanField = Array(arr.length)
    .fill()
    .map(
      (_, r) =>
        Array(arr[0].length)
          .fill()
          .map((_, c) => (visited[`${r},${c}`] ? visited[`${r},${c}`] : "."))
      /* .join("") */
    );

  return cleanField;
}
