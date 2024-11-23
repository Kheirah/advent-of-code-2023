const fs = require("fs");

const input = fs.readFileSync("./18_input", "utf8");
const arr = input.split("\n");

const instructions = arr.map((line) => line.split(" "));

const dugplan = {};
let i = 200;
let j = 200;

let max_i = 0;
let max_j = 0;

for (let k = 0; k < instructions.length; k++) {
  const [direction, steps] = instructions[k];
  let [x, y] = getNewPosition(direction, Number(steps));
  while (x != 0 || y != 0) {
    dugplan[`${i},${j}`] = true;
    if (x != 0) {
      i += x < 0 ? -1 : 1;
      x += x < 0 ? 1 : -1;
    } else if (y != 0) {
      j += y < 0 ? -1 : 1;
      y += y < 0 ? 1 : -1;
    }
    dugplan[`${i},${j}`] = true;
    max_i = Math.max(max_i, i);
    max_j = Math.max(max_j, j);
    /* if (!dugplan[i]) dugplan[i] = [Infinity, -Infinity];
    dugplan[i][0] = Math.min(dugplan[i][0], j);
    dugplan[i][1] = Math.max(dugplan[i][1], j);
    if (x != 0) {
      i += x < 0 ? -1 : 1;
      x += x < 0 ? 1 : -1;
    } else if (y != 0) {
      j += y < 0 ? -1 : 1;
      y += y < 0 ? 1 : -1;
    }
    if (!dugplan[i]) dugplan[i] = [Infinity, -Infinity];
    dugplan[i][0] = Math.min(dugplan[i][0], j);
    dugplan[i][1] = Math.max(dugplan[i][1], j); */
  }
}

let area = 0;
/* for (const [_, [min, max]] of Object.entries(dugplan)) {
  area += max - min + 1;
} */
//console.log(dugplan);

const matrix = drawPath();

let visited = {};
function explore(i = 7, j = 147) {
  const stack = [[7, 147]];
  while (stack.length) {
    const [i, j] = stack.shift();
    if (matrix[i][j] === "#" || visited[`${i},${j}`]) {
      continue;
    }
    visited[`${i},${j}`] = true;
    stack.push([i, j - 1]);
    stack.push([i - 1, j]);
    stack.push([i, j + 1]);
    stack.push([i + 1, j]);
  }
}

explore();
console.log(Object.keys(dugplan).length + Object.keys(visited).length);

/* matrix.forEach((row, idx) => {
  if (row.includes("#")) {
    let inside = true;
    let hole = row.indexOf("#");
    while (hole != -1) {
      const next = row.indexOf("#", hole + 1);
      if (next != -1 && next - hole > 1) {
        if (inside) area += next - hole - 1;
        inside = !inside;
        hole = next;
        continue;
      } else if (next != -1 && next - hole === 1) {
        hole = next;
        continue;
      } else {
        break;
      }
    }
    console.log(idx, area);
  }
}); */

//console.log(Object.entries(dugplan).length + area);

//fs.writeFileSync("./18_inner", drawInner().join("\n"));

function getNewPosition(dir, movement) {
  switch (dir) {
    case "L":
      return [0, -movement];
    case "D":
      return [movement, 0];
    case "R":
      return [0, movement];
    case "U":
      return [-movement, 0];
  }
}

function drawPath() {
  const cleanField = Array(max_i + 1)
    .fill()
    .map(
      (_, r) =>
        Array(max_j + 1)
          .fill()
          .map((_, c) => (dugplan[`${r},${c}`] ? "#" : "."))
      /* .join("") */
    );
  /* for (const visit of Object.keys(visited)) {
    const [row, col] = visit.split(",");
    //cleanField[row][col] = "X";
    cleanField[row][col] = visited[`${row},${col}`];
  } */
  return cleanField;
}

function drawInner() {
  const cleanField = Array(max_i + 1)
    .fill()
    .map((_, r) =>
      Array(max_j + 1)
        .fill()
        .map((_, c) => (visited[`${r},${c}`] ? "#" : "."))
        .join("")
    );
  return cleanField;
}

/* 58770 too high */
/* 35086 too low */
/* 35221 too low */
/* 35769 wrong */
/* 36725 correct! */

/* same perimeter, but different area
###### .####.
#....# ##..##
#....# #....#
#....# ##..##
###### .####.
*/
