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
//const visited = { [`${starting_row},${starting_col}`]: true };

const field = arr;
let row = starting_row;
let col = starting_col;
let connectedTo = 0;

while (true) {
  //visited[`${row},${col}`] = true;
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

console.log(traveled / 2);

function getStartingPosition(field) {
  for (let i = 0; i < field.length; i++) {
    if (field[i].indexOf("S") != -1) {
      return [i, field[i].indexOf("S")];
    }
  }
}
