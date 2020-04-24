const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFtc2hpcmVkZHkiLCJhIjoiY2s4eWsyaXk1MDJvYjNrcXBvdDRmcnYxbiJ9.8WJdyM5RMVhCs_svSaEeQg'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to service', undefined)
        }
        else if (body.features.length == 0) {
            callback('please provide valid location', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }

    })
}


module.exports = geoCode