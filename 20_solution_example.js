const fs = require("fs");

const input = fs.readFileSync("./20_example_2", "utf8");
const arr = input.split("\n");

const inverterModules = [];

const configuration = arr.reduce((obj, line) => {
  const inOut = line.split(" -> ");
  const destination = inOut[1].includes(",")
    ? inOut[1].split(", ")
    : [inOut[1]];
  const start = inOut[0];
  const isFlipFlop = start.includes("%");
  const isInverter = start.includes("&");
  if (isFlipFlop) {
    const [_, module] = start.split("%");
    return {
      ...obj,
      [module]: {
        type: "ff",
        destination,
        active: true,
        state: false,
        process: function (input) {
          if (input) {
            this.active = false;
            return;
          }
          this.active = true;
          this.state = !this.state;
        },
        next: function () {
          return this.active
            ? {
                destination: this.destination,
                pulse: {
                  out: this.state,
                  amount: {
                    [this.state]: this.destination.length,
                    [!this.state]: 0,
                  },
                },
              }
            : null;
        },
      },
    };
  } else if (isInverter) {
    const [_, module] = start.split("&");
    inverterModules.push([module, []]);
    return {
      ...obj,
      [module]: {
        type: "inv",
        destination,
        state: false,
        process: function (input, from) {
          const incomingInput = this.inputs.find(
            (inp) => inp[from] !== undefined
          );
          if (incomingInput) {
            incomingInput[from] = input;
            this.state = this.inputs.every((x) => !Object.entries(x)[0][1])
              ? false
              : true;
          }
        },
        next: function () {
          const allIncPulsesHigh = this.inputs.every(
            (x) => Object.entries(x)[0][1]
          );
          this.state = this.inputs.every((x) => !Object.entries(x)[0][1])
            ? false
            : true;
          return {
            destination: this.destination,
            pulse: {
              out: !allIncPulsesHigh,
              amount: {
                [!allIncPulsesHigh]: this.destination.length,
                [allIncPulsesHigh]: 0,
              },
            },
          };
        },
      },
    };
  } else {
    return {
      ...obj,
      [start]: {
        type: "bc",
        destination,
      },
    };
  }
}, {});

for (const [key, value] of Object.entries(configuration)) {
  inverterModules.forEach(([name], index) => {
    if (value.destination.some((d) => d === name)) {
      inverterModules[index][1].push(key);
    }
  });
}

inverterModules.forEach(([inverterName, inputs]) => {
  configuration[inverterName].inputs = inputs.map((input) => ({
    [input]: false,
  }));
});

let inProcess = true;
let low = 0;
let high = 0;

let counter = 1000;
while (inProcess && counter--) {
  const bc = configuration["broadcaster"];
  low += 1 + bc.destination.length;
  const stack = bc.destination.map((module) => [
    configuration[module],
    false,
    module,
  ]);
  const states = new Set();
  while (stack.length) {
    const [module, pulse, name, from] = stack.shift();
    module.process(pulse, from);
    states.add(module);
    //console.log("shifted & processed");
    /* console.log(
      name,
      module.type,
      pulse ? "high" : "low",
      "->",
      module.destination.join(",")
    ); */
    const nextModule = module.next();
    //console.log("next", nextModule);
    if (nextModule) {
      const { destination, pulse } = nextModule;
      const destinationModules = destination.map((d) => {
        const config = configuration[d];
        if (config) {
          //if (config.type === "ff" && pulse.out) return null;
          return [config, d];
        }
      });

      high += pulse.amount[true];
      //console.log("high", high);
      low += pulse.amount[false];
      /* console.log("low", low);
      console.log("-----------------"); */

      destinationModules
        .filter((m) => Boolean(m))
        .forEach(([m, n]) => {
          stack.push([m, pulse.out, n, name]);
        });
    }
    //console.log("stack", stack.length);
  }
  //console.log(states);
  inProcess = !Array.from(states).every((module) => !module.state);
  //counter++;
  //console.log(low, high, counter);
}

console.log(low, high, counter);

/* 

ff:
status: false
low -> true (high)
status: true
low -> false (low)
high -> status

inv:
status: false
not all high -> false (high)
all high -> true (low)

[false, true] => 1x high + x-length high
[true, true] => 1x high + x-length low
[true, false, true] => 2x high + x-length high
[false] => x-length high
[true] => x-length low
*/

/* 
button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -high-> output
b -high-> con
con -low-> output
*/
