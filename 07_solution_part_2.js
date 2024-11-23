const fs = require("fs");

const input = fs.readFileSync("./07_input", "utf8");
const arr = input.split("\n");
const hands = arr.map((line) => line.split(" "));

const ranking = {
  "5,1": 7 /* five of a kind */,
  "4,2": 6 /* four of a kind */,
  "3,2": 5 /* full house */,
  "3,3": 4 /* three of a kind */,
  "2,3": 3 /* two pair */,
  "2,4": 2 /* one pair */,
  "1,5": 1 /* high card */,
};

const relativeStrength = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

hands.sort((a, b) => {
  const [hand1, bid1] = a;
  const [hand2, bid2] = b;
  const strength1 = getStrength(hand1);
  const strength2 = getStrength(hand2);
  if (strength1 === strength2) {
    return compare(hand1, hand2);
  }
  return strength1 - strength2;
});

console.log(
  hands.reduce((acc, [hand, bid], index) => acc + bid * (index + 1), 0)
);

function getStrength(hand) {
  const mem = {};
  let numOfDifferentKinds = 0;
  let highestNumOfSameKind = 1;
  let numOfJokers = 0;
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (mem[card]) {
      mem[card]++;
      highestNumOfSameKind = Math.max(highestNumOfSameKind, mem[card]);
    } else {
      if (card !== "J") {
        mem[card] = 1;
        numOfDifferentKinds++;
      } else {
        if (numOfJokers === 0) numOfDifferentKinds++;
        numOfJokers++;
      }
    }
  }
  if (numOfJokers && numOfJokers < 5) {
    highestNumOfSameKind += numOfJokers;
    numOfDifferentKinds--;
  } else if (numOfJokers === 5) {
    highestNumOfSameKind = 5;
    numOfDifferentKinds = 1;
  }

  return ranking[`${highestNumOfSameKind},${numOfDifferentKinds}`];
}

function compare(hand1, hand2) {
  for (let i = 0; i < hand1.length; i++) {
    const card1 = hand1[i];
    const card2 = hand2[i];
    if (card1 === card2) {
      continue;
    }
    return relativeStrength[card1] - relativeStrength[card2];
  }
  return 0;
}

/* 249497042 too low */
/* 250240469 too low */
/* 251481660 correct! */
