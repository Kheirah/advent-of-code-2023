const fs = require("fs");

const input = fs.readFileSync("./08_input", "utf8");
const arr = input.split("\n");

const instructions = arr[0];
const map = arr.slice(2);
const startingPoints = [];
map.filter((node) => node.split(" = ")[0][2] === "A");
const ghostMap = {};
map.forEach((node) => {
  const entireNode = node.split(" = ");
  if (entireNode[0][2] === "A") startingPoints.push(entireNode[0]);
  ghostMap[[entireNode[0]]] = {
    L: entireNode[1].split(", ")[0].split("(")[1],
    R: entireNode[1].split(", ")[1].split(")")[0],
  };
});

let currentNodes = startingPoints;
let at = 0;
let steps = 0;

function endsWithZ(node) {
  return node[2] === "Z";
}
let firstZs = [];
let foundZsAt = [];
while (currentNodes.length !== firstZs.length) {
  let instruction = instructions[at];
  const nextNodes = currentNodes.map(
    (currentNode) => ghostMap[currentNode][instruction]
  );
  if (nextNodes.some(endsWithZ)) {
    firstZs.push(steps + 1);
    const withZ = nextNodes.find(endsWithZ);
    foundZsAt.push(nextNodes.indexOf(withZ));
  }
  currentNodes = nextNodes;
  at = (at + 1) % instructions.length;
  steps++;
}

console.log(firstZs);
console.log(foundZsAt);
console.log(firstZs.reduce(lcm));

function gcd(a, b) {
  if (a) return gcd(b % a, a);
  else return b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

/* 13019 too low */
/* 54299407482910570928640 too high */
/* 19185263738117 correct! */

/* 
apparently this is Welsh (play murloc sounds) 
what does that sound in English I wonder (play murloc sounds)
slightly different accent, but overall it's the same amount of syllables and alcohol
*/
