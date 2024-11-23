const fs = require("fs");

const input = fs.readFileSync("./15_example", "utf8");
const arr = input.split(",");

let totalSum = arr.reduce((acc, curr) => {
  let subtotal = 0;
  for (let i = 0; i < curr.length; i++) {
    subtotal += curr.charCodeAt(i);
    subtotal = (subtotal * 17) % 256;
  }
  return acc + subtotal;
}, 0);

console.log(totalSum);

/* 507742 too low */
