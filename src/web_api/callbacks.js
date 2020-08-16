
const axios = require('axios')

const Geocoding = (address, callback) => {

    // const geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2hhcmkxNjExIiwiYSI6ImNrZGZvMGk5eDBmYnUyeG81b2kyZnBpNGQifQ.0rSh--S0ec_7xyziZ5XNWA&limit=1'
    // OR -- differnce between these two is below we use encodeURIComponent on address both r same but when some one enter a address with special charector like ? it becomes encoded version %3F
    const geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2hhcmkxNjExIiwiYSI6ImNrZGZvMGk5eDBmYnUyeG81b2kyZnBpNGQifQ.0rSh--S0ec_7xyziZ5XNWA&limit=1'

    // axios.get(geocoding).then((response) => {
    axios.get(geocoding).then(({data}) => { // destructuring

        
        if (data.features.length !== 0) { // destructuring
        callback(undefined, {
            latitude: data.features[0].geometry.coordinates[1],
            longitude: data.features[0].geometry.coordinates[0],
            location:data.features[0].place_name
            })
        } else
        {
            callback('Unable to Find location',undefined)

        }

    }).catch(error => {
        callback('Unable to connect to location service',undefined)
    })
}


const forecast = (latitude,longitude,callback) => {
    const URL = 'https://api.weatherbit.io/v2.0/current?lat=' + latitude + '&lon=' + longitude + '&key=6a9d37ba99854770a53a0bd09cb28449'
    axios.get(URL).then(({data}) => {
        callback(undefined, {
            temperature:data.data[0].temp, //destructuring
            cityName:data.data[0].city_name

      })
    }).catch(error => {
      callback('Unable to find location',undefined)
    })
  }


module.exports = {
    'Geocoding': Geocoding,
    'forecast':forecast
}