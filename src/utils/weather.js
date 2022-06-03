const request = require('request');

const getWeather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79ccfa882ad701ef6507c19e3dc92d11&query=' + lat + ',' + lon
    request({url: url, json: true}, (error, response) => {
      if (error) callback(undefined, 'unable to connect to the internet');
          else if (response.body.error) {
              callback(undefined, 'cannot find location');
          } else {
              callback(
                  {
                      temperature: response.body.current.temperature,
                      feelslike: response.body.current.feelslike,
                      forecast: response.body.current.weather_descriptions[0]
                  },
                  undefined
              );
          }
      })
  }

  module.exports = getWeather  