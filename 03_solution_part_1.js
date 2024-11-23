const fs = require("fs");

const input = fs.readFileSync("./03_input", "utf8");
const arr = input.split("\n");

const cleanSchema = [];
let sum = 0;

arr.forEach((line, index) => {
  const numbers = line.matchAll(/\d+/g);
  let foundNumber = numbers.next();
  while (!foundNumber.done) {
    if (cleanSchema[index]?.numbers === undefined) {
      cleanSchema[index] = { numbers: [] };
    }
    const found = foundNumber.value;
    const number = +found[0];
    const length = found[0].length;
    const atIndex = found.index;
    const min = Math.max(0, atIndex - 1);
    const max = Math.min(line.length - 1, atIndex + length);
    cleanSchema[index].numbers = [
      ...cleanSchema[index].numbers,
      { number, min, max },
    ];
    foundNumber = numbers.next();
  }
  const symbols = line.matchAll(/[^.A-Za-z0-9]/g);
  let foundSymbol = symbols.next();
  while (!foundSymbol.done) {
    if (cleanSchema[index]?.symbols === undefined) {
      cleanSchema[index] = { ...cleanSchema[index], symbols: [] };
    }
    const found = foundSymbol.value;
    const symbol = found[0];
    const atIndex = found.index;
    cleanSchema[index].symbols = [
      ...cleanSchema[index].symbols,
      { symbol, atIndex },
    ];
    foundSymbol = symbols.next();
  }
});

cleanSchema.forEach(({ numbers, symbols }, index) => {
  let adjacentLines = symbols || [];
  if (index - 1 >= 0 && cleanSchema[index - 1].symbols !== undefined) {
    adjacentLines = [...adjacentLines, ...cleanSchema[index - 1].symbols];
  }
  if (
    index + 1 < cleanSchema.length &&
    cleanSchema[index + 1].symbols !== undefined
  ) {
    adjacentLines = [...adjacentLines, ...cleanSchema[index + 1].symbols];
  }

  for (let i = 0; i < numbers.length; i++) {
    const { number, min, max } = numbers[i];
    const adjacent = adjacentLines.some(
      (symbol) => symbol.atIndex >= min && symbol.atIndex <= max
    );
    if (adjacent) {
      sum += number;
    }
  }
});

console.log(sum);
