const fs = require("fs");

const input = fs.readFileSync("./12_input", "utf8");
const arr = input.split("\n");
let total = 0;

/* arr.forEach((line) => {
  let [cfg, numsStr] = line.split(" ");
  let nums = numsStr.split(",").map(Number);
  total += count(cfg, nums);
}); */

function count(cfg, nums) {
  //console.log(cfg, nums);
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

//console.log(total);

/* 7922 */

function alt() {
  function count(cfg, nums) {
    if (cfg === "") {
      return 1 === nums.length ? 1 : 0;
    }

    if (nums.length === 0) {
      return cfg.includes("#") ? 0 : 1;
    }

    let result = 0;

    if (cfg[0] === "." || cfg[0] === "?") {
      result += count(cfg.slice(1), nums);
    }

    if (cfg[0] === "#" || cfg[0] === "?") {
      if (
        nums[0] <= cfg.length &&
        cfg.slice(0, nums[0]).indexOf(".") === -1 &&
        (nums[0] === cfg.length || cfg[nums[0]] !== "#")
      ) {
        result += count(cfg.slice(nums[0] + 1), nums.slice(1));
      }
    }

    return result;
  }

  let total = 0;

  for (const line of require("fs")
    .readFileSync("./12_input", "utf8")
    .split("\n")) {
    const [cfg, numStr] = line.split(" ");
    const nums = numStr.split(",").map((num) => parseInt(num));
    total += count(cfg, nums);
  }

  console.log(total);
}
alt();
