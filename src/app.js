const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
console.log(__dirname);
console.log(path.join(__dirname, '../public'))
const app = express();

// define paths for expres config
const ditname = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partilasPath = path.join(__dirname, '../templates/partials')
// handlebars engine nad views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partilasPath)
// setup static directory serve 
app.use(express.static(ditname));


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'vamshi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'waether about',
        name: 'about'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help: 'how can I help You',
        title: 'may I help you',
        name: 'vamshi'
    })
})
app.get('/404', (req, res) => {
    res.render('404', {
        errorMessage: '404 not found'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'NO Address? Please provide address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })

        }
        // res.send({
        //     place: location,
        //     latitude: latitude,
        //     longitude: longitude

        // })
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecast,
                place: location,
                address: req.query.address
            })
        })
    })
    // request code

    // res.send({
    //     forecast: 'rainy Day 8degrees Out there',
    //     location: 'Hyderabad, Telangana',
    //     address: req.query.address
    // })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article didnt found'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+ port)
})