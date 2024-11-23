const fs = require("fs");

const input = fs.readFileSync("./04_input", "utf8");
const arr = input.split("\n");

const matchesPerCard = arr.reduce((acc, line) => {
  const numbers = line.split(": ")[1];
  const allNumbers = numbers.split(" | ");
  const left = allNumbers[0];
  const right = allNumbers[1];
  const leftNumbers = left.split(" ");
  const rightNumbers = right.split(" ");
  const matching = leftNumbers.reduce((sum, leftNumber) => {
    if (leftNumber && rightNumbers.includes(leftNumber)) {
      return sum + 1;
    }
    return sum;
  }, 0);
  acc.push({ matching, instances: 1 });
  return acc;
}, []);

matchesPerCard.forEach(({ matching, instances }, index) => {
  let copiesOfCurrentCard = instances;
  while (copiesOfCurrentCard) {
    let levels = matching;
    while (levels) {
      matchesPerCard[index + levels].instances++;
      levels--;
    }
    copiesOfCurrentCard--;
  }
});

console.log(matchesPerCard.reduce((acc, { instances }) => acc + instances, 0));
