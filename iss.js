const request = require("request");



const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};



const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) return (callback(error, null));
    const myIp = ip;

    fetchCoordsByIP(myIp, (error, coords) => {
      if (error) return (callback(error, null));
      const myCoords = coords;

      fetchISSFlyOverTimes(myCoords, (error, passes) => {
        if (error) return (callback(error, null));
        callback(null, passes);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };