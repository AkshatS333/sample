const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
// It is used to customize our server
app.use(express.static(publicDirectoryPath))


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// here we are required to connect in response , so render is used
// index will be searched in views folder
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',  // passing value to print
        name: 'Akshat Saxena'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat Saxena'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        helpmsg: 'Enter your desired location in Search box and after few seconds you will get the temperature and wind speed of that location.',
        name: 'Akshat Saxena'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })

    }


    geocode(req.query.address, (error, { latitude, longitude, place } ={}) => {   // using callbacks and integrating functionality will enhance the resusability and make the code clean
        if (error) {

            return res.send({
                error: error
            })
        }



        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {

                return res.send({
                    error: error
                })
            }
            console.log(forecastData)

            res.send({
                forecast: {
                    temperature: forecastData.temperature,
                    wind_speed: forecastData.wind_speed
                },
                location: place,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forecast: 'It is foggy here', 
    //     location: req.query.address
    // })
    // res.send(JSON.stringify({ place: 'Jaipur', temperature: 9 }))
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshat Saxena',
        errorMsg: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshat Saxena',
        errorMsg: 'My 404 page'
    })
})

app.listen(3000, () => [
    console.log('Server is up and running on port 3000')
])

