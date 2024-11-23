const fs = require("fs");

const input = fs.readFileSync("./01_input", "utf8");
const arr = input.split("\n");
const calibration_values = [];

const words = [
  { word: "one", number: 1 },
  { word: "two", number: 2 },
  { word: "three", number: 3 },
  { word: "four", number: 4 },
  { word: "five", number: 5 },
  { word: "six", number: 6 },
  { word: "seven", number: 7 },
  { word: "eight", number: 8 },
  { word: "nine", number: 9 },
];

let firstFromLeft;
let firstFromRight;

for (let i = 0; i < arr.length; i++) {
  let current = arr[i];
  for (let j = 0; j < current.length; j++) {
    let firstWordFromLeft = Infinity;
    let firstNumberFromLeft = null;
    words.forEach(({ word, number }) => {
      const index = current.indexOf(word);
      if (index !== -1 && index < firstWordFromLeft) {
        firstWordFromLeft = index;
        firstNumberFromLeft = number;
      }
    });

    if (!isNaN(current[j])) {
      if (firstWordFromLeft < j) {
        firstFromLeft = firstNumberFromLeft;
      } else {
        firstFromLeft = current[j];
      }
      break;
    }
  }

  let firstWordFromRight = -Infinity;
  let firstNumberFromRight = null;
  words.forEach(({ word, number }) => {
    const index = current.lastIndexOf(word);
    if (index !== -1 && index > firstWordFromRight) {
      firstWordFromRight = index;
      firstNumberFromRight = number;
    }
  });

  for (let k = current.length - 1; k >= 0; k--) {
    if (!isNaN(current[k])) {
      if (firstWordFromRight > k) {
        firstFromRight = firstNumberFromRight;
      } else {
        firstFromRight = current[k];
      }
      break;
    }
  }
  calibration_values.push("" + firstFromLeft + firstFromRight);
}

const sum = calibration_values.reduce((a, b) => +a + +b, 0);
console.log(sum);
