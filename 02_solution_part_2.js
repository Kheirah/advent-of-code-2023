const fs = require("fs");

const input = fs.readFileSync("./02_input", "utf8");
const arr = input.split("\n");
const sum_ids = arr.reduce((acc, currentLine) => {
  const game = currentLine.split(": ");
  const sets = game[1].split("; ");
  let max_red = 1;
  let max_green = 1;
  let max_blue = 1;
  sets.forEach((set) => {
    const cubes = set.split(", ");
    cubes.forEach((cube) => {
      const [count, color] = cube.split(" ");
      switch (color) {
        case "red":
          max_red = Math.max(max_red, count);
          break;
        case "green":
          max_green = Math.max(max_green, count);
          break;
        case "blue":
          max_blue = Math.max(max_blue, count);
          break;
      }
    });
  });
  return acc + max_red * max_green * max_blue;
}, 0);
console.log(sum_ids);