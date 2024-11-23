const fs = require("fs");

const max_red = 12;
const max_green = 13;
const max_blue = 14;

const input = fs.readFileSync("./02_input", "utf8");
const arr = input.split("\n");
const sum_ids = arr.reduce(
  (acc, currentLine) => {
    const game = currentLine.split(": ");
    const gameNumber = game[0].split(" ")[1];
    const sets = game[1].split("; ");
    const isPossible = sets.every((set) => {
      const cubes = set.split(", ");
      const isSetPossible = cubes.every((cube) => {
        const [count, color] = cube.split(" ");
        let possible = true;
        switch (color) {
          case "red":
            possible = count <= max_red;
            break;
          case "green":
            possible = count <= max_green;
            break;
          case "blue":
            possible = count <= max_blue;
            break;
        }
        return possible;
      });
      return isSetPossible;
    });
    if (isPossible) {
      return +acc + +gameNumber;
    } else return +acc;
  },
  [0]
);
console.log(sum_ids);
