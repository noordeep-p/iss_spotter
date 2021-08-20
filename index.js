const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const passTime = pass.duration;
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dateTime} for ${passTime} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});