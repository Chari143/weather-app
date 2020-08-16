
const axios = require('axios')


// OR using callbacks and creating functions for Geocoding & weather for better reusing
// importing from callbacks.js
const { Geocoding:geocoding, forecast } = require('./callbacks.js')

const location = process.argv[2]

if (!location) {
  console.log('Please, Enter a location')
} else {
  // geocoding(location, (error, data) => {
  geocoding(location, (error, response) => { //using destructuring we can't use destructuring here
                                                                    //because if we get error not response we don't have data to destructure so it give error that time
  if (error) {
    console.log('error:', error)
  }
  else {
    // forecast(data.latitude, data.longitude, (error, forecastdata) => {
    forecast(response.latitude,response.longitude, (error, forecastdata) => { // using destructured values

      if (!error) {
        console.log('Temperature in ' + forecastdata.cityName + ' is ' + forecastdata.temperature + ' degrees')
      } else {
        console.log('error', error)
      }
    })
  }

})
}

  




