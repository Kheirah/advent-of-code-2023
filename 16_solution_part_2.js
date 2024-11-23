const fs = require("fs");

const input = fs.readFileSync("./16_input", "utf8");
const arr = input.split("\n");

const directions = {
  "|": [0, [0, 2], 2, [0, 2]],
  "\\": [3, 2, 1, 0],
  "/": [1, 0, 3, 2],
  "-": [[1, 3], 1, [1, 3], 3],
};

function lavaFloor(...args) {
  const visited = {};
  beam(...args);
  return visited;

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
}

let max = -Infinity;

/* heading downwards */
for (let i = 0; i < arr[0].length; i++) {
  max = Math.max(max, Object.entries(lavaFloor(0, i, 2)).length);
}

/* heading right */
for (let i = 0; i < arr.length; i++) {
  max = Math.max(max, Object.entries(lavaFloor(i, 0, 1)).length);
}

/* heading left  */
for (let i = 0; i < arr.length; i++) {
  max = Math.max(
    max,
    Object.entries(lavaFloor(i, arr[0].length - 1, 3)).length
  );
}

/* heading upwards */
for (let i = 0; i < arr[0].length; i++) {
  max = Math.max(max, Object.entries(lavaFloor(arr.length - 1, i, 0)).length);
}

console.log(max);
