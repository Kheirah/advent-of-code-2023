const fs = require("fs");

const input = fs.readFileSync("./11_input", "utf8");
const arr = input.split("\n").map((point) => point.split(""));

const rowsExpanded = expand(arr);
const columnsExpanded = expand(transpose(rowsExpanded));
const expanded = transpose(columnsExpanded);

const galaxies = [];

for (let i = 0; i < expanded.length; i++) {
  for (let j = 0; j < expanded[i].length; j++) {
    if (expanded[i][j] === "#") {
      galaxies.push({ i, j });
    }
  }
}

let sumOfShortestPaths = 0;

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const shortestPath =
      Math.abs(galaxies[i].i - galaxies[j].i) +
      Math.abs(galaxies[i].j - galaxies[j].j);
    sumOfShortestPaths += shortestPath;
  }
}

console.log(sumOfShortestPaths);

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function expand(matrix) {
  const expanded = [];
  for (let i = 0; i < matrix.length; i++) {
    expanded.push(matrix[i]);
    let empty = true;
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "#") {
        empty = false;
      }
    }
    if (empty) expanded.push(matrix[i]);
  }
  return expanded;
}
