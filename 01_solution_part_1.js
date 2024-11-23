const fs = require("fs");

const input = fs.readFileSync("./01_input", "utf8");
const arr = input.split("\n");
const calibration_values = [];

let firstFromLeft;
let firstFromRight;

for (let i = 0; i < arr.length; i++) {
  let current = arr[i];
  for (let j = 0; j < current.length; j++) {
    if (!isNaN(current[j])) {
      firstFromLeft = current[j];
      break;
    }
  }
  for (let k = current.length - 1; k >= 0; k--) {
    if (!isNaN(current[k])) {
      firstFromRight = current[k];
      break;
    }
  }
  calibration_values.push(firstFromLeft + firstFromRight);
}

const sum = calibration_values.reduce((a, b) => +a + +b, 0);
console.log(sum);
