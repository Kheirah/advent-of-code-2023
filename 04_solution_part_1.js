const fs = require("fs");

const input = fs.readFileSync("./04_input", "utf8");
const arr = input.split("\n");

const points = arr.reduce((acc, line) => {
  const numbers = line.split(": ")[1];
  const allNumbers = numbers.split(" | ");
  const left = allNumbers[0];
  const right = allNumbers[1];
  const leftNumbers = left.split(" ");
  const rightNumbers = right.split(" ");
  const linePoints = leftNumbers.reduce((sum, leftNumber) => {
    if (leftNumber && rightNumbers.includes(leftNumber)) {
      if (sum === 0) {
        return 1;
      } else {
        return sum * 2;
      }
    }
    return sum;
  }, 0);
  return acc + linePoints;
}, 0);

console.log(points);
