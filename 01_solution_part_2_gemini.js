const fs = require("node:fs");

const numberWords = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

async function calculateCalibrationSum() {
  try {
    const data = await fs.promises.readFile("01_input.txt", "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    let totalCalibrationValue = 0;
    for (const line of lines) {
      let firstDigit = null;
      let lastDigit = null;

      for (let i = 0; i < line.length; i++) {
        if (/\d/.test(line[i])) {
          firstDigit = parseInt(line[i]);
          break;
        }
        for (const word in numberWords) {
          if (line.substring(i, i + word.length) === word) {
            firstDigit = parseInt(numberWords[word]);
            break;
          }
        }
        if (firstDigit !== null) break;
      }

      for (let i = line.length - 1; i >= 0; i--) {
        if (/\d/.test(line[i])) {
          lastDigit = parseInt(line[i]);
          break;
        }
        for (const word in numberWords) {
          if (line.substring(i, i + word.length) === word) {
            lastDigit = parseInt(numberWords[word]);
            break;
          }
        }
        if (lastDigit !== null) break;
      }

      if (firstDigit !== null && lastDigit !== null) {
        totalCalibrationValue += parseInt(firstDigit + "" + lastDigit);
      } else {
        console.warn("No digits found on line:", line); //Handle lines with no digits
      }
    }
    console.log(totalCalibrationValue);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

calculateCalibrationSum();
