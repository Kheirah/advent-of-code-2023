const fs = require("fs");

const input = fs.readFileSync("./14_input", "utf8");
const arr = input.split("\n").map((row) => row.split(""));

let totalLoad = 0;

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    const current = arr[i][j];
    if (current === "." && i < arr.length - 1) {
      let downward = i + 1;
      let next = arr[downward][j];
      while (true) {
        if (next === "O") {
          [arr[i][j], arr[downward][j]] = [arr[downward][j], arr[i][j]];
          const currentLoad = arr.length - i;
          totalLoad += currentLoad;
          break;
        } else if (next === ".") {
          if (downward < arr[i].length - 1) {
            downward++;
            next = arr[downward][j];
          } else {
            break;
          }
        } else if (next === "#") {
          break;
        } else {
          break;
        }
      }
    } else if (current === "O" && i <= arr.length - 1) {
      totalLoad += arr.length - i;
    }
  }
}

console.log(totalLoad);
//console.log(arr.map((row) => row.join("")).join("\n"));

/* 67402 too low */
/* 286327 too high */
/* 113525 correct! */