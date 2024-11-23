const fs = require("fs");

const input = fs.readFileSync("./19_example", "utf8");
const arr = input.split("\n");

const instructions = arr.slice(0, 11);
const partsStr = arr.slice(12);

const workflow = instructions.reduce((obj, instruction) => {
  const [id, rulesStr] = instruction.split("}")[0].split("{");
  const rules = rulesStr.split(",");
  const defaultCase = rules.pop();
  const res = rules.map((rule) => {
    const inner = rule.split(":");
    const conditionStr = inner[0];
    const appliedRule = inner[1];
    const hasSmallerThan = conditionStr.includes("<");
    const categoryAndValue = hasSmallerThan
      ? conditionStr.split("<")
      : conditionStr.split(">");
    const category = categoryAndValue[0];
    const value = Number(categoryAndValue[1]);
    return {
      category,
      [category]: (val) => (hasSmallerThan ? val < value : val > value),
      next: appliedRule,
    };
  });

  return {
    ...obj,
    [id]: {
      rules: res,
      defaultCase,
    },
  };
}, {});

const parts = partsStr.map((part) => {
  const noBraces = part.slice(1).slice(0, part.length - 2);
  const components = noBraces.split(",");
  const categories = components.reduce((o, component) => {
    const [category, value] = component.split("=");
    return { ...o, [category]: Number(value) };
  }, {});
  return categories;
});

let totalRating = 0;

for (let i = 0; i < parts.length; i++) {
  const currentPart = parts[i];
  const beenThrough = {};
  let processed = false;
  let flow = workflow.in;
  while (!processed || !beenThrough[flow]) {
    beenThrough[flow] = true;
    const rulesToApply = flow.rules;
    const applied = rulesToApply.find((rule) => {
      if (currentPart.hasOwnProperty(rule.category)) {
        return rule[rule.category](currentPart[rule.category]);
      } else {
        return false;
      }
    });

    if (applied) {
      if (applied.next === "A") {
        totalRating += Object.entries(currentPart).reduce(
          (acc, curr) => acc + curr[1],
          0
        );
        processed = true;
        break;
      } else if (applied.next === "R") {
        processed = true;
        break;
      } else {
        flow = workflow[applied.next];
      }
    } else {
      if (flow.defaultCase === "A") {
        totalRating += Object.entries(currentPart).reduce(
          (acc, curr) => acc + curr[1],
          0
        );
        processed = true;
        break;
      } else if (flow.defaultCase === "R") {
        processed = true;
        break;
      } else {
        flow = workflow[flow.defaultCase];
      }
    }
  }
}

console.log(totalRating);
