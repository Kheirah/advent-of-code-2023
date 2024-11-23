const fs = require("fs");

const input = fs.readFileSync("./08_input", "utf8");
const arr = input.split("\n");

const instructions = arr[0];
const map = arr.slice(2);
const ghostMap = {};
map.forEach((node) => {
  const entireNode = node.split(" = ");
  ghostMap[[entireNode[0]]] = {
    L: entireNode[1].split(", ")[0].split("(")[1],
    R: entireNode[1].split(", ")[1].split(")")[0],
  };
});

let currentNode = "AAA";
let at = 0;
let steps = 0;

while (currentNode != "ZZZ") {
  let instruction = instructions[at];
  const nextNode = ghostMap[currentNode][instruction];
  currentNode = nextNode;
  at = (at + 1) % instructions.length;
  steps++;
}

console.log(steps);
