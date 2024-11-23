const fs = require("fs");

const input = fs.readFileSync("./18_example", "utf8");
const arr = input.split("\n");

const instructions = arr.map((line) => line.split(" "));

const dugplan = {};
let i = 0;
let j = 0;

for (let k = 0; k < instructions.length; k++) {
  const [direction, steps] = instructions[k];
  let [x, y] = getNewPosition(direction, Number(steps));
  while (x != 0 || y != 0) {
    if (!dugplan[i]) dugplan[i] = [Infinity, -Infinity];
    dugplan[i][0] = Math.min(dugplan[i][0], j);
    dugplan[i][1] = Math.max(dugplan[i][1], j);
    if (x != 0) {
      i += x < 0 ? -1 : 1;
      x += x < 0 ? 1 : -1;
    } else if (y != 0) {
      j += y < 0 ? -1 : 1;
      y += y < 0 ? 1 : -1;
    }
    if (!dugplan[i]) dugplan[i] = [Infinity, -Infinity];
    dugplan[i][0] = Math.min(dugplan[i][0], j);
    dugplan[i][1] = Math.max(dugplan[i][1], j);
  }
}

let area = 0;
for (const [_, [min, max]] of Object.entries(dugplan)) {
  area += max - min + 1;
}
console.log(area);

function getNewPosition(dir, movement) {
  switch (dir) {
    case "L":
      return [0, -movement];
    case "D":
      return [movement, 0];
    case "R":
      return [0, movement];
    case "U":
      return [-movement, 0];
  }
}
/* 

#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######

*/
