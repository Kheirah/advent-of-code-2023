const fs = require("fs");

const input = fs.readFileSync("./06_input", "utf8");
const arr = input.split("\n");

const time = Number(arr[0].split("Time:")[1].trim().split("     ").join(""));
const distance = Number(
  arr[1].split("Distance:")[1].trim().split("   ").join("")
);

let waysToWin = 0;
for (let holdingDown = 1; holdingDown < time; holdingDown++) {
  const raceTime = time - holdingDown;
  const distanceTraveled = raceTime * holdingDown;
  if (distanceTraveled >= distance) {
    waysToWin++;
  }
}

console.log(waysToWin);
