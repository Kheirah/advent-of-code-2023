const fs = require("fs");

const input = fs.readFileSync("./06_input", "utf8");
const arr = input.split("\n");

const time = arr[0].split("Time:")[1].trim().split("     ").map(Number);
const distance = arr[1].split("Distance:")[1].trim().split("   ").map(Number);

let waysToWinMultiplied = 1;

for (let i = 0; i < time.length; i++) {
  const t = time[i];
  const d = distance[i];
  let waysToWin = 0;
  for (let holdingDown = 1; holdingDown < t; holdingDown++) {
    const raceTime = t - holdingDown;
    const distanceTraveled = raceTime * holdingDown;
    if (distanceTraveled > d) {
      waysToWin++;
    }
  }
  waysToWinMultiplied *= waysToWin;
}

console.log(waysToWinMultiplied);
