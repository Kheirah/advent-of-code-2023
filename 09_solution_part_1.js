const fs = require("fs");

const input = fs.readFileSync("./09_input", "utf8");
const arr = input.split("\n");
const histories = arr.map((line) => line.split(" "));

function extrapolate(history) {
  const differences = [];
  let allZeros = true;
  for (let i = 0; i < history.length - 1; i++) {
    const difference = history[i + 1] - history[i];
    differences.push(difference);
    if (difference !== 0) allZeros = false;
  }
  if (allZeros) {
    return history.at(-1);
  }
  const nextValue = extrapolate(differences);
  return Number(history.at(-1)) + nextValue;
}
const prediction = histories.map(extrapolate);
console.log(prediction.reduce((acc, curr) => acc + curr, 0));

/* 899280088 too low */
/* 1930744948 too low */
/* 1930746032 correct! */
