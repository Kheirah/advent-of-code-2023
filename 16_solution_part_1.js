const fs = require("fs");

const input = fs.readFileSync("./16_input", "utf8");
const arr = input.split("\n");

const visited = {};

const directions = {
  "|": [0, [0, 2], 2, [0, 2]],
  "\\": [3, 2, 1, 0],
  "/": [1, 0, 3, 2],
  "-": [[1, 3], 1, [1, 3], 3],
};

let energizedTiles = 0;

function beam(i, j, orientation) {
  if (i >= arr.length || j >= arr[0].length || i < 0 || j < 0) return;
  while (
    visited[`${i},${j}`]?.[orientation] === undefined &&
    i < arr.length &&
    j < arr[0].length &&
    i >= 0 &&
    j >= 0
  ) {
    visited[`${i},${j}`] =
      visited[`${i},${j}`] === undefined
        ? Array(4)
            .fill()
            .map((_, i) => (i === orientation ? true : undefined))
        : (visited[`${i},${j}`][orientation] = true);
    energizedTiles++;

    if (arr[i][j] === ".") {
      const [x, y] = move(orientation);
      i += x;
      j += y;
      continue;
    } else {
      const nextDirection = directions[arr[i][j]][orientation];
      if (Array.isArray(nextDirection)) {
        const [xOne, yOne] = move(nextDirection[0]);
        const [xTwo, yTwo] = move(nextDirection[1]);
        beam(i + xOne, j + yOne, nextDirection[0]);
        beam(i + xTwo, j + yTwo, nextDirection[1]);
        break;
      } else {
        const [x, y] = move(nextDirection);
        i += x;
        j += y;
        orientation = nextDirection;
        continue;
      }
    }
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
}

beam(0, 0, 1);
console.log(energizedTiles);
console.log(Object.entries(visited).length);
//Object.entries(visited).forEach(([key, value]) => console.log(key, value));
//console.log(drawPath().join("\n").split(",").join(""));

function drawPath() {
  const cleanField = Array(arr.length)
    .fill()
    .map((_, r) =>
      Array(arr[0].length)
        .fill()
        .map((_, c) => (visited[`${r},${c}`] ? "#" : "."))
    );
  return cleanField;
}

/* 7683 too low */
/* 7726 too low */
/* 7996 correct! */