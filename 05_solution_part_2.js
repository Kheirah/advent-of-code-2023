const fs = require("fs");

const input = fs.readFileSync("./05_input", "utf8");
const example = fs.readFileSync("./05_example", "utf8");
const arr = input.split("\n");
const example_arr = example.split("\n");

const seeds = arr[0].split("seeds: ")[1].split(" ");
const example_seeds = example_arr[0].split("seeds: ")[1].split(" ");

const abs = (n) => (n < 0n ? -n : n);

const seedToSoilMap = getMap(3, 39);
const soilToFertilzerMap = getMap(42, 51);
const fertilizerToWaterMap = getMap(54, 89);
const waterToLightMap = getMap(92, 137);
const lightToTemperatureMap = getMap(140, 167);
const temperatureToHumidityMap = getMap(170, 209);
const humidityToLocationMap = getMap(212, 253);
const example_seedToSoilMap = getExampleMap(3, 4);
const example_soilToFertilzerMap = getExampleMap(7, 9);
const example_fertilizerToWaterMap = getExampleMap(12, 15);
const example_waterToLightMap = getExampleMap(18, 19);
const example_lightToTemperatureMap = getExampleMap(22, 24);
const example_temperatureToHumidityMap = getExampleMap(27, 28);
const example_humidityToLocationMap = getExampleMap(31, 32);

const maps = [
  seedToSoilMap.sort((a, b) => a[1] - b[1]),
  soilToFertilzerMap.sort((a, b) => a[1] - b[1]),
  fertilizerToWaterMap.sort((a, b) => a[1] - b[1]),
  waterToLightMap.sort((a, b) => a[1] - b[1]),
  lightToTemperatureMap.sort((a, b) => a[1] - b[1]),
  temperatureToHumidityMap.sort((a, b) => a[1] - b[1]),
  humidityToLocationMap.sort((a, b) => a[1] - b[1]),
];

const completeMaps = [];

for (let i = 0; i < maps.length; i++) {
  const completeMap = [];
  let rangeStart = 0n;
  for (let j = 0; j < maps[i].length; j++) {
    const [d, s, r] = maps[i][j];
    const destination = BigInt(d);
    const source = BigInt(s);
    const range = BigInt(r);
    if (source > rangeStart) {
      completeMap.push([rangeStart, rangeStart, source - rangeStart]);
    }
    completeMap.push([destination, source, range]);
  }
  completeMaps.push(completeMap);
}

const example_maps = [
  example_seedToSoilMap.sort((a, b) => a[1] - b[1]),
  example_soilToFertilzerMap.sort((a, b) => a[1] - b[1]),
  example_fertilizerToWaterMap.sort((a, b) => a[1] - b[1]),
  example_waterToLightMap.sort((a, b) => a[1] - b[1]),
  example_lightToTemperatureMap.sort((a, b) => a[1] - b[1]),
  example_temperatureToHumidityMap.sort((a, b) => a[1] - b[1]),
  example_humidityToLocationMap.sort((a, b) => a[1] - b[1]),
];

//console.log("example_maps", example_maps)

const final = completeMaps.reduce((previousState, currentMap) => {
  const m = getNextState(previousState, currentMap);
  return m;
}, seeds);
const example_final = example_maps.reduce((previousState, currentMap) => {
  const m = getNextState(previousState, currentMap);
  return m;
}, example_seeds);

let min = Infinity;
for (let i = 0; i < final.length; i += 2) {
  min = final[i] < min ? final[i] : min;
}
/* let example_min = Infinity;
for (let i = 0; i < example_final.length; i += 2) {
  example_min = Math.min(example_final[i], example_min);
} */

//console.log(final);
console.log(min);
/* console.log(example_final);
console.log(example_min); */

function getMap(from, to) {
  const map = [];
  for (let i = from; i <= to; i++) {
    map.push(arr[i].split(" "));
  }
  return map;
}
function getExampleMap(from, to) {
  const map = [];
  for (let i = from; i <= to; i++) {
    map.push(example_arr[i].split(" "));
  }
  return map;
}

function getNextState(from, to) {
  const mapped = [];
  for (let i = 0; i < from.length; i += 2) {
    let numberStart = BigInt(from[i]); // 82
    let until = BigInt(from[i + 1]); // 13
    mapping: for (let j = 0; j < to.length; j++) {
      const [d, s, r] = to[j]; // 60 56 37
      const destination = BigInt(d);
      const source = BigInt(s);
      const range = BigInt(r);
      if (numberStart >= source && numberStart <= source + range - 1n) {
        const upperBound = source + range - 1n; // 56 + 37 - 1 = 92
        const numberEnd = numberStart + until - 1n; // 82 + 13 - 1 = 94
        const difference = upperBound - numberEnd; // 92 - 94 = -2
        const mappingDifference = destination - source; // 60 - 56 = 4
        if (difference >= 0) {
          mapped.push(numberStart + mappingDifference); // 82 + 4 = 86
          mapped.push(until); // 13
          break;
        } else {
          mapped.push(numberStart + mappingDifference); // 82 + 4 = 86
          mapped.push(until - abs(difference)); // 13 - 2 = 11
          numberStart = numberStart + until - abs(difference); // 82 + 13 - 2 = 93
          until = abs(difference); // 2
          if (j === to.length - 1) {
            mapped.push(numberStart);
            mapped.push(until);
            break;
          } else {
            continue mapping;
          }
        }
      }
      if (j === to.length - 1) {
        mapped.push(numberStart);
        mapped.push(until);
      }
    }
  }
  return mapped;
}

/* 174137457 too high */
/* 4501055 too high */
/* 2862729 too high */
/* 1391897 not the right answer */
/* 10954309 not the right answer */
/* 1493866 correct! */

/* 
seeds: 79 14 55 13

seed-to-soil map:
50 98 2  (98 - 99) / -48
52 50 48 (50 - 97) / 2

next: 81 14 57 13

soil-to-fertilizer map:
0 15 37 (15 - 51) / -15
37 52 2 (52 - 53) / -15
39 0 15 ( 0 - 14) / 39

next: 81 14 57 13

fertilizer-to-water map:
49 53 8 (53 - 60) / -4
0 11 42 (11 - 52) / -11
42 0 7  ( 0 -  6) / 42
57 7 4  ( 7 - 10) / 50

next: 81 14 53 4 61 9

water-to-light map:
88 18 7  (18 - 24) / 70
18 25 70 (25 - 94) / -7

next: 74 14 46 4 54 9

light-to-temperature map:
45 77 23 (77 - 99) / -32
81 45 19 (45 - 63) / 36
68 64 13 (64 - 76) / 4

next: 78 3 45 11 82 4 90 9

temperature-to-humidity map:
0 69 1 (69 - 69) / -69
1 0 69 ( 0 - 68) / 1

next: 78 3 46 11 82 4 90 9

humidity-to-location map:
60 56 37 (56 - 92) / 4
56 93 4  (93 - 96) / -37

next: 82 3 46 11 86 4 94 3 53 4 97 2
*/