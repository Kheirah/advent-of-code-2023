const fs = require("fs");

const input = fs.readFileSync("./12_example", "utf8");
const arr = input.split("\n");
let total = 0;

arr.forEach((line) => {
  let [cfg, numsStr] = line.split(" ");
  let nums = numsStr.split(",").map(Number);
  const sum = count(cfg, nums);
  console.log(cfg, sum);
  total += sum;
});

function count(cfg, nums) {
  console.log(cfg, nums);
  if (cfg === "") {
    return nums.length === 0 ? 1 : 0;
  }

  if (nums.length === 0) {
    return cfg.includes("#") ? 0 : 1;
  }

  let result = 0;

  if (cfg[0] === "." || cfg[0] === "?") {
    result += count(cfg.substring(1), nums);
  }

  if (cfg[0] === "#" || cfg[0] === "?") {
    if (
      nums[0] <= cfg.length &&
      !cfg.substring(0, nums[0]).includes(".") &&
      (nums[0] === cfg.length || cfg[nums[0]] !== "#")
    ) {
      result += count(cfg.substring(nums[0] + 1), nums.slice(1));
    }
  }

  return result;
}

console.log(total);

/* 7922 */
