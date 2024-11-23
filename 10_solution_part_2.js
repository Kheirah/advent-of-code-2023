const fs = require("fs");

const input = fs.readFileSync("./10_input", "utf8");
const arr = input.split("\n");
const [starting_row, starting_col] = getStartingPosition(arr);

const pipes = {
  "|": { shape: [0, 2], connectsTo: [0, 2], next: { 0: 0, 2: 2 } },
  "-": { shape: [1, 3], connectsTo: [1, 3], next: { 1: 1, 3: 3 } },
  L: { shape: [0, 1], connectsTo: [2, 3], next: { 2: 1, 3: 0 } },
  J: { shape: [0, 3], connectsTo: [1, 2], next: { 1: 0, 2: 3 } },
  7: { shape: [2, 3], connectsTo: [0, 1], next: { 0: 3, 1: 2 } },
  F: { shape: [1, 2], connectsTo: [0, 3], next: { 0: 1, 3: 2 } },
  S: { shape: [], connectsTo: [], next: [] },
};

let traveled = 0;
const visited = { [`${starting_row},${starting_col}`]: true };

const field = arr;
let row = starting_row;
let col = starting_col;
let connectedTo = 0;

while (true) {
  visited[`${row},${col}`] = field[row][col];
  if (connectedTo === 0) {
    const pipe = pipes[field[row - 1][col]];
    traveled++;
    row = row - 1;
    connectedTo = pipe.next[connectedTo];
    continue;
  }
  if (connectedTo === 1) {
    const pipe = pipes[field[row][col + 1]];
    traveled++;
    col = col + 1;
    connectedTo = pipe.next[connectedTo];
    continue;
  }
  if (connectedTo === 2) {
    const pipe = pipes[field[row + 1][col]];
    traveled++;
    row = row + 1;
    connectedTo = pipe.next[connectedTo];
    continue;
  }
  if (connectedTo === 3) {
    const pipe = pipes[field[row][col - 1]];
    traveled++;
    col = col - 1;
    connectedTo = pipe.next[connectedTo];
    continue;
  }
  if (field[row][col] == "S") {
    break;
  }
}
console.log(visited)

/* const cleanInput = fs.readFileSync("./10_output_noisy-dollar-signs", "utf8");
const cleanArr = cleanInput.split("\n");
console.log(
  cleanArr.reduce(
    (acc, line) =>
      acc +
      line.split("").reduce((sum, char) => (char === "X" ? sum + 1 : sum), 0),
    0
  )
); */

//console.log(traveled / 2);
//console.log(visited);
/* fs.writeFileSync(
  "./10_output_noisy-dollar-signs_2",
  drawPath()
    .map((row) => row.join(""))
    .join("\n")
); */

function getStartingPosition(field) {
  for (let i = 0; i < field.length; i++) {
    if (field[i].indexOf("S") != -1) {
      return [i, field[i].indexOf("S")];
    }
  }
}

function drawPath() {
  const cleanField = Array(arr.length)
    .fill()
    .map((_, r) =>
      Array(arr[0].length)
        .fill()
        .map((_, c) => (visited[`${r},${c}`] ? "." : "$"))
    );
  /* for (const visit of Object.keys(visited)) {
    const [row, col] = visit.split(",");
    //cleanField[row][col] = "X";
    cleanField[row][col] = visited[`${row},${col}`];
  } */
  return cleanField;
}

/* 588 too high */

/* 
9 x 7 = 63 cells, 46 around
11 x 9 = 99 cells, 46 around, 49 outside, 99 - 46 - 49 = 4 inside
...........  ........... 
.S-------7.  .xxxxxxxxx.
.|F-----7|.  .xxxxxxxxx.
.||.....||.  .xx.....xx.
.||.....||.  .xx.....xx.
.|L-7.F-J|.  .xxxx.xxxx.
.|..|.|..|.  .x..x.x..x.
.L--J.L--J.  .xxxx.xxxx.
...........  ...........
 */
