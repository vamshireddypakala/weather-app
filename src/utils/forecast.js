const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5959fcdcc8260f02be437854051a66e8&query=' + lon + ',' + lat + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect service', undefined)
        } else if (body.error != undefined) {
            callback('please provide valid lat lon', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees, But Feeling like ' + body.current.feelslike + ' degrees out there')
        }
    })
}

module.exports = forecast
