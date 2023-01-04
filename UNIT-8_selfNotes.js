// Goal : To facilitate to access our weather app by entering data in the browser ie building end points of our application
// http.json endpoints

**************************************2

// browser will provide the qurey string
// server will read the query string to get the address information

// first we create route handler for /products , to understand  in app.js 

// http://localhost:3000/products  --> this is normal url
// http://localhost:3000/products?search=games    --> this is query string from which some information user is asking can be extrated
// http://localhost:3000/products?search=games&reating=5 --> user searching for games with 
//                                                           rating 5


// search value can  be read by req.query.search


// NOTE: WHEN ERROR: cannot set headers after they are sent to the client
// It means two res.send requests are sent
// after that the product route handler is customized

// self challenge given for /weather route handler
// in which if there is no address in query string , then the error should be shown 
// if there is address then hardcoded json data is shown 


***************app .js

const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
        name: 'akshat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help section',
        helpmsg: 'This is the help msg',
        name: 'akshat'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
        
    }

    res.send({
        forecast: 'It is foggy here', 
        location: req.query.address
    })
    // res.send(JSON.stringify({ place: 'Jaipur', temperature: 9 }))
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'akshat',
        errorMsg: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'akshat',
        errorMsg: 'My 404 page'
    })
})

app.listen(3000, () => [
    console.log('Server is up and running on port 3000')
])





***********************************************3

// copied utils folder from weather app to web-server inside src
// as utils files used require module of npm
// so in web-server we installed it : npm i request@2.88.0

// now we can use geocode and forecast function 

// now just copied the code from weather-app -> app.js with some modification 
// used it to display the data and error (if it occurs in some condition)







************************************************4

// here we learnt ES6 Aside default function parameter

// in playground 7-default-params.js  & 7-default-params2.js 
// has code with explanation

// http://localhost:3000/weather?address=!
// at the above address our app will crash 
// because geocode is run but error is generated , so dont have any value for coordinates
// we cant destructure a NULL value (use of default parameters)
// so we used {} --> default parametes as in 7-default-params2.js 



*********7-default-params.js

const greeter = (names) =>{
    console.log('Hello ' + names)
} 

greeter('Akshat') // normal execution

greeter()   // hello undefined will come

// if we want to print a certain value if no input is give then
// default parameters are used

const greeter2 = (names= 'user') =>{
    console.log('Hello ' + names +' from default parameters')
}

greeter2('akshat')
greeter2()



***********7-default-params2.js

const product = {
    label: 'Red Notebook',
    price: 3,
    stocks: 201,
    salePrice: undefined
}

// will use object destructuring here

const transaction = (type, { label, stocks }) => {
    console.log(type, label, stocks)
}

transaction('order', product)   // correct way of execution

// transaction('order')      // will give error because here product === NULL
// and NULL cannot be destructured  



// Method 2
const transaction2 = (type, { label, stocks } = {}) => { 
    console.log(type, label, stocks)
}

transaction2('order')  // here no error will come as label and stocs are set to NULL if no input is given




// Method 3

// We can also set a default value if we do not want any of the value to be NULL
const transaction3 = (type, { label, stocks=2 } = {}) => {
    console.log(type, label, stocks)
}

transaction3('order')  // stock will be 2 here



************app .js


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// var city= 'Surat'

// request({
//     url: 'https://api.api-ninjas.com/v1/weather?city=' + city,
//     headers:{
//         'X-Api-Key': 'hJyr+ae7PvvRV2XJRiSwXw==zDWUsBk9C5dNIg4Z'
//     },
//     json: true      // this automatically parses the response coming
// }, (error,response)=>{

//     // when we cannot connect to the network, then error will be populated
//     if(error){
//         console.log('Unable to connect to weather services')
//     }


//     // When an incorrect longitude or latitude is mentioned , then there will be error field in response
//     else if(response.body.error){
//         console.log('Unable to find location')
//     }

//     // Under normal conditions
//     else {
//         console.log('The current temperature is ' + response.body.temp + ' and the wind speed is ' + response.body.wind_speed)

//     }

// })

const address = process.argv[2] // the third element will give us our command line argument value

if (!address) {
    return console.log('Please provide an Address')

}
else {



    geocode(address, (error, {latitude,longitude,place}) => {   // using callbacks and integrating functionality will enhance the resusability and make the code clean
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(place)
            console.log(forecastData)
        })
    })

}








**********************************************5

// Goal: To make an HTTP request from client side js in browser
// like in frontend to fill the form , submit it and show the info

// we will work in public -> js -> app.js
// here we will be focussing on getting the data inside the client side js 
// we need to make HTTP request from client side js

// FETCH API is not js , it is browser based api 
// fetch api is not accessible in nodejs but can be used in modern browsers

// example first using : puzzle.mead.io/puzzle
// goal here is to fetch randomly generated puzzles
// fetch(url) --> url from which we want to fetch
// the fetch will create and ansynchronous io request  --> which means we don't get the data 
// right away and will create a function , that will run at some point in future when the data
// will be available


// fetch('puzzle.mead.io/puzzle').then((response) =>{
//    response.json().then((data) =>{
//       console.log(data)
//   })
//})

// in the fetch function above we pass callback but here we use different syntax and use then
// inside then there is callback function
// it is asynchronous so whenever the data will be available , this function will run
// again inside the callback , first the json data is parsed , then we accesss the parsed data


// fetched the weather data and forecast data
// worked only on public -> js -> app.js

// to see the working we have to reload the index page and then see in console

************public -> js -> app.js

console.log('The js file is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

fetch('http://localhost:3002/weather?address=!').then((response) =>{
    response.json().then((data)=>{
        if(data.error){
           return  console.log(data.error)
        }

        console.log(data.forecast.temperature)
        console.log(data.forecast.wind_speed)
        console.log(data.location)
    })
})



************************************************6

// Here we will create a form where users can enter the place
// first we are working on index.hbs and writing some html to create the form

// after that we will write some js in public->app.js

// in app.js used addEventListener
// addEventListener needs 2 parameters
//                         1. string ie the name of event we want to listen
//                         2. callback function which will occur whenever the event occurs

// NOTE: In this video we changed position of script tag as , earlier it was in the head tag
//       so the script was running before happening anything in the body , so value of form will
//       be NULL in app.js . Now it is placed at the very bottom just aboe </body>


// to prevent the browser to refreshing preventDefault is used

// Challenge given: to move fetch inside the event listener and use the address given by the user
// in the fetch call


***********app .js

console.log('The js file is loaded')


// fetch('http://localhost:3000/weather?address=Jaipur').then((response) =>{
//     response.json().then((data)=>{
//         if(data.error){
//            return  console.log(data.error)
//         }

//         console.log(data.forecast.temperature)
//         console.log(data.forecast.wind_speed)
//         console.log(data.location)
//     })
// })


// to select the form element
const weatherForm=document.querySelector('form')

// now to get the value entered in input
const search = document.querySelector('input')


// Code involving event listener to collect info when the user submits the form 
// addEventListener needs 2 pa
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address='+ location+ '').then((response) =>{
    response.json().then((data)=>{
        if(data.error){
           return  console.log(data.error)
        }

        console.log(data.forecast.temperature)
        console.log(data.forecast.wind_speed)
        console.log(data.location)
    })
})

    
})


***********indexe .hbs

<!DOCTYPE html>

<html>

<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.jpg">
    <link rel="stylesheet" href="./css/style.css">

</head>

<body>

    <div class="main-content">

        {{>header}}
        <p>Here you can view your weather!</p>

        <form>
            <input placeholder="Location">
            <button>Search</button>
        </form>

    </div>
    {{>footer}}
    {{!-- {{}} is dynamically used to access the attributes provided in res.render --}}
    <script src="./js/app.js"></script>
</body>

</html>


*****************************************7


Goal: to show the weather info on the index page

for this purpose we placed two <p></p> in index.hbs
and using js we will manipulate the p of index.hbs
