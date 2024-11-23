const fs = require("fs");

const input = fs.readFileSync("./11_example", "utf8");
const arr = input.split("\n").map((point) => point.split(""));

const rowsExpanded = expand(arr);
const columnsExpanded = expand(transpose(rowsExpanded));
const expanded = transpose(columnsExpanded);

const expandedGalaxies = getGalaxies(expanded);
const galaxies = getGalaxies(arr);

const total_expanded = totalPathLength(expandedGalaxies);
const total_original = totalPathLength(galaxies);
const difference = total_expanded - total_original;
console.log("expanded by 2x", total_expanded);
console.log("original", total_original);
console.log("difference", difference);
console.log(
  "projected value for 100x",
  difference * 100 + total_original - difference
);

function getGalaxies(gals) {
  const galaxies = [];

  for (let i = 0; i < gals.length; i++) {
    for (let j = 0; j < gals[i].length; j++) {
      if (gals[i][j] === "#") {
        galaxies.push({ i, j });
      }
    }
  }

  return galaxies;
}

function totalPathLength(gals) {
  let sumOfShortestPaths = 0;

  for (let i = 0; i < gals.length; i++) {
    for (let j = i + 1; j < gals.length; j++) {
      const shortestPath =
        Math.abs(gals[i].i - gals[j].i) + Math.abs(gals[i].j - gals[j].j);
      sumOfShortestPaths += shortestPath;
    }
  }

  return sumOfShortestPaths;
}

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
    if (empty) {
      let expandBy = 1;
      while (expandBy) {
        expanded.push(matrix[i]);
        expandBy--;
      }
    }
  }
  return expanded;
}
