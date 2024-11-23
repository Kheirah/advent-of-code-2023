const fs = require("node:fs");

async function calculateCalibrationSum() {
  try {
    const data = await fs.promises.readFile("01_input.txt", "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== ""); //remove empty lines

    let totalCalibrationValue = 0;
    for (const line of lines) {
      const digits = line.match(/\d/g); // Extract all digits using a regular expression
      if (digits && digits.length > 0) {
        const calibrationValue = parseInt(
          digits[0] + digits[digits.length - 1]
        );
        totalCalibrationValue += calibrationValue;
      }
    }
    console.log(totalCalibrationValue);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

calculateCalibrationSum();
