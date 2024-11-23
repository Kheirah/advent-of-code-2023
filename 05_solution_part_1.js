const fs = require("fs");

const input = fs.readFileSync("./05_input", "utf8");
const arr = input.split("\n");

const seeds = arr[0].split("seeds: ")[1].split(" ");

const seedToSoilMap = getMap(3, 39);
const soilToFertilzerMap = getMap(42, 51);
const fertilizerToWaterMap = getMap(54, 89);
const waterToLightMap = getMap(92, 137);
const lightToTemperatureMap = getMap(140, 167);
const temperatureToHumidityMap = getMap(170, 209);
const humidityToLocationMap = getMap(212, 253);

const maps = [
  seedToSoilMap,
  soilToFertilzerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap,
];

maps.forEach((map) => {
  getNextState(map);
});

console.log(seeds.reduce((acc, curr) => Math.min(acc, curr)));

function getMap(from, to) {
  const map = [];
  for (let i = from; i <= to; i++) {
    map.push(arr[i].split(" "));
  }
  return map;
}

function getNextState(map) {
  for (let i = 0; i < seeds.length; i++) {
    const number = +seeds[i];
    for (let j = 0; j < map.length; j++) {
      const [destination, source, range] = map[j];
      if (number >= +source && number <= +source + +range - 1) {
        const difference = destination - source;
        seeds[i] = number + difference;
        break;
      }
    }
  }
}
