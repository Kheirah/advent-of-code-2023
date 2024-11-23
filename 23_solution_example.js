const fs = require("fs");

const input = fs.readFileSync("./23_example", "utf8");
const arr = input.split("\n");

let paths = [];
let visitedd = null;

function findLongestPath(
  i = 0,
  j = 1,
  length = 0,
  visited = {},
  comingFrom = null
) {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr[i].length) {
    return;
  }

  if (arr[i][j] === "#") {
    return;
  }

  if (i === arr.length - 1 && j === arr[i].length - 2) {
    visitedd = visited;
    visited[`${i},${j}`] = length;
    paths.push(length);
    return;
  }

  if (visited[`${i},${j}`] !== undefined) {
    const diff = length - visited[`${i},${j}`];
    if (diff > 0) {
      visited[`${i},${j}`] = length;
    }
  }

  if (arr[i][j] === "v" && comingFrom !== 2) {
    visited[`${i},${j}`] = length;
    findLongestPath(i + 1, j, length + 1, visited, 0);
    return;
  }

  if (arr[i][j] === "^" && comingFrom !== 0) {
    visited[`${i},${j}`] = length;
    findLongestPath(i - 1, j, length + 1, visited, 2);
    return;
  }

  if (arr[i][j] === "<" && comingFrom !== 3) {
    visited[`${i},${j}`] = length;
    findLongestPath(i, j - 1, length + 1, visited, 1);
    return;
  }

  if (arr[i][j] === ">" && comingFrom !== 1) {
    visited[`${i},${j}`] = length;
    findLongestPath(i, j + 1, length + 1, visited, 3);
    return;
  }

  visited[`${i},${j}`] = length;

  if (arr[i][j] === ".") {
    if (comingFrom !== 0) findLongestPath(i - 1, j, length + 1, visited, 2);
    if (comingFrom !== 1) findLongestPath(i, j + 1, length + 1, visited, 3);
    if (comingFrom !== 2) findLongestPath(i + 1, j, length + 1, visited, 0);
    if (comingFrom !== 3) findLongestPath(i, j - 1, length + 1, visited, 1);
  }
}

findLongestPath();
console.log(paths.sort((a, b) => b - a));
//console.log(drawPath());

function drawPath() {
  const cleanField = Array(arr.length)
    .fill()
    .map((_, r) =>
      Array(arr[0].length)
        .fill()
        .map((_, c) => (visitedd[`${r},${c}`] !== undefined ? "x" : "."))
        .join("")
    );
  return cleanField;
}
