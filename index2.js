const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const passTime = pass.duration;
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dateTime} for ${passTime} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });