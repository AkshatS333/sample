

---------2

// to install express , first npm need to be installed : npm install -y
// installed express : npm i express@4.16.4
// made different folder as src and a file in that folder named as app.js


app.js

const express = require('express')
// this const express is a function , like an object
// we call it to create a new express application


// now we will store our express application
const app = express()


// this will handle that what content is to be displayed to the user at a specific url
// first argument is url , second is function that will handle what is to be sent

// object containing info about incoming request -- req
// methods for sending something back to user - res 
app.get('', (req, res) => {
    res.send('Hello express')

})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('Your weather')
})

// app.com          --> root directory (it will not be mentioned in url in code)
// app.com/help
// app.com/about

app.listen(3000, () => [
    console.log('Server is up and running on port 3000')
])
// consoled just to verify whether the server has started



------------3

// learnt how to use HTML to send and also to send js objects, arrays

const express = require('express')
// this const express is a function , like an object
// we call it to create a new express application


// now we will store our express application
const app = express()


// this will handle that what content is to be displayed to the user at a specific url
// first argument is url , second is function that will handle what is to be sent

// object containing info about incoming request -- req
// methods for sending something back to user - res 
app.get('', (req, res) => {
    res.send('<h1>weather</h1>')   // html

})

app.get('/help', (req, res) => {
    res.send([{               // array of objects
        name: 'akshat'
    }, {
        name: 'saxena'
    }])
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('Your weather')
})

// app.com          --> root directory (it will not be mentioned in url in code)
// app.com/help
// app.com/about

app.listen(3000, () => [
    console.log('Server is up and running on port 3000')
])




----------4

// here we try to render content for different url using html files
// created public directory , in which there is different html files

// use of path core module , express.static
// removed the route handlers
// will access root directly with url localhost:3000 (as index.html is by default defined)
// for help : localhost:3000/help.html (help.html file in public directory)
// for about : localhost:3000/about.html

                                            app.js

const path = require('path') // it is a core module not npm
const express = require('express')
const { isAbsolute } = require('path')
// this const express is a function , like an object
// we call it to create a new express application



console.log(__dirname)  // gives the directory path
console.log(__filename)  // gives the file path
// to manipulate to our required path we use the path.join()
console.log(path.join(__dirname, '../public'))    // first argument is for starting point and second argument is for modification and destination


// now we will store our express application
const app = express()


// It is used to customize our server
app.use(express.static(path.join(__dirname, '../public')))
// the express static finds a match for root directory in the other specified folder
// so what is written in app.js for root will not be considered



// app.get('/help', (req,res) =>{
//     res.send([{              // array of objects can also be passed
//         name: 'akshat'
//     },{
//         name: 'saxena'
//     }])
// })

// app.get('/about', (req,res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    res.send(JSON.stringify({ place: 'Jaipur', temperature: 9 }))
})

// app.com          --> root directory (it will not be mentioned in url in code)
// app.com/help
// app.com/about

app.listen(3000, () => [
    console.log('Server is up and running on port 3000')
])
 // consoled just to verify whether the server has started



------------index .html
<!DOCTYPE html>

<html>

<head>

    <body>
        <h1>From static file</h1>
    </body>
</head>
</html>




--------------------------------------5

// here included css , js and image file with current app
// made public folder in web-server directory
// in public different folder for css js img

// added style sheet to index, help , about file
// added img to about file
// added js to index file

--------style .css
h1 {
    color: grey;
}

img {
    width: 250px
}


---------app.js (in public foler)

console.log('The js file is loaded')


--------index.html

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/app.js"></script>

</head>

<body>
    <h1>From static file</h1>
</body>

</html>


---------about .html

<!DOCTYPE html>

<html>

<head>

    <link rel="stylesheet" href="./css/style.css">
    
</head>

<body>
    <h1>About</h1>
    <img src="./img/vaccine.jpg">
</body>

</html>




**********************************6


// template engine to render dynamic web pages using express
// template engine used here are called handle bars
// handle bars will allow
//                1. dynamic pages rendering
//                2. create reusable code

// if template engines are not used then in every file where we want to use that function , we 
// need to copy whole code
// and if there is a change then we have to change that at all places


// will install npm hbs (hbs uses handlebars behind the scenes)
// command: npm i hbs@4.0.1

// after installing we need to setup
// for setup we need to tell which templating engine we installed

// app.set is used for setting up key = view engine , value = hbs

// views or handle bar template should be placed in different folder
// different will provide dynamicism

// now a within web server a new folder named as views will be created
// all files to provide a dynamic view are placed there

// static index.html can be deleted
// to connect index.hbs , route handler is created

// to create a dynamic effect , we will pass some values in render to be displayed on index page
// {{}}  to access the value given in render
// images are accessed from public folder as usual

// help is also converted to hbs


********app .js

const path = require('path')
const express =require('express')

const app = express()

app.set('view engine','hbs')


// It is used to customize our server
app.use(express.static(path.join(__dirname,'../public')))


// here we are required to connect in response , so render is used
// index will be searched in views folder
app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',  // passing value to print
        name: 'akshat'
    })     
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpmsg: 'This is the help msg'
    })
})


app.get('/weather', (req,res) =>{
    res.send(JSON.stringify({ place: 'Jaipur' , temperature: 9}))
})


app.listen(3000, () =>[
    console.log('Server is up and running on port 3000')
])



*********index.hbs

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/app.js"></script>

</head>

<body>
    <h1>{{title}}</h1>
    <p>{{name}}</p>
    {{!-- {{}} is dynamically used to access the attributes provided in res.render --}}
</body>

</html>


********about.hbs

<!DOCTYPE html>

<html>

<head>

    <link rel="stylesheet" href="./css/style.css">
    
</head>

<body>
    <h1>{{title}}</h1>
    <img src="./img/vaccine.jpg">
    <p>Created by {{name}}</p>  
    
</body>

</html>


*********help.hbs

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">

</head>

<body>
    <h1>Help</h1>
    <p>{{helpmsg}}</p>
</body>

</html>



******************************************7


// Goal of this video: customize the location and name of the views directory
// suppose we want to change the name of views --> some other name
// then the application would not work because it searches the index, about,help file in views folder

// Suppose we change name to templates
// then again we will use path.join
// then use app.set to set the views value to what that was obtained from path.join



********** app .js

const path = require('path')
const express =require('express')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup static directory to serve
// It is used to customize our server
app.use(express.static(publicDirectoryPath))


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',  viewsPath)


// here we are required to connect in response , so render is used
// index will be searched in views folder
app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',  // passing value to print
        name: 'akshat'
    })     
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpmsg: 'This is the help msg'
    })
})


app.get('/weather', (req,res) =>{
    res.send(JSON.stringify({ place: 'Jaipur' , temperature: 9}))
})


app.listen(3000, () =>[
    console.log('Server is up and running on port 3000')
])






*********************************************8

// learnt partial with handlebars
// allows to create a template that is part of bigger webpage
// that is this will finally allow reusing

// first we will load hbs
// tell handlerbars where we are going to put partial (just listened not implemented till now)

// we need to put partials at some place and then access them
// so in template two directories are created
//                     1. views -- index, help ,about .hbs are placed (also just slight change in path.join)
//                     2. partials -- where partials are placed

// created path.join for partials
// also did hbs.registerPartials

// first partial created is : header.hbs in partial folder in templates

// to use header as reusable component following syntax is used
// {{>header}}

// to provide dynamic title to every file {{title}} is used inside header.hbs

// Self challenge : to create reusable footer for every file


*******app .js

const path = require('path')
const express =require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
// It is used to customize our server
app.use(express.static(publicDirectoryPath))


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',  viewsPath)
hbs.registerPartials(partialPath)


// here we are required to connect in response , so render is used
// index will be searched in views folder
app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',  // passing value to print
        name: 'akshat'
    })     
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'This is help section',
        helpmsg: 'This is the help msg',
        name: 'akshat'
    })
})


app.get('/weather', (req,res) =>{
    res.send(JSON.stringify({ place: 'Jaipur' , temperature: 9}))
})


app.listen(3000, () =>[
    console.log('Server is up and running on port 3000')
])



*******header .hbs

<h1>{{title}}</h1>

<div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
</div>



*******footer.hbs

<p>Created by master {{name}}</p>


*******index .hbs

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/app.js"></script>

</head>

<body>
   {{>header}}
    {{>footer}}
    {{!-- {{}} is dynamically used to access the attributes provided in res.render --}}
</body>

</html>


*********help. hbs

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">

</head>

<body>
   {{>header}}
    <p>{{helpmsg}}</p>
    {{>footer}}
</body>

</html>



********about .hbs

<!DOCTYPE html>

<html>

<head>

    <link rel="stylesheet" href="./css/style.css">
    
</head>

<body>
    {{>header}}
    <img src="./img/vaccine.jpg">
    {{>footer}}
    
</body>

</html>





*****************************************9

// Goal: Showing 404 pages
// when a user enters an invalid url like : localhost:3000/me

// to handle this we need to create a route handler , just like we did for other urls like about,help
// this handler should be placed at the last

// 404.hbs is created 
// for /help/* and *    --> for both 404.hbs is used



***********app .js

const path = require('path')
const express =require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
// It is used to customize our server
app.use(express.static(publicDirectoryPath))


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',  viewsPath)
hbs.registerPartials(partialPath)


// here we are required to connect in response , so render is used
// index will be searched in views folder
app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',  // passing value to print
        name: 'akshat'
    })     
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'This is help section',
        helpmsg: 'This is the help msg',
        name: 'akshat'
    })
})


app.get('/weather', (req,res) =>{
    res.send(JSON.stringify({ place: 'Jaipur' , temperature: 9}))
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'405',
        name: 'akshat',
        errorMsg: 'Help article not found',
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'akshat',
        errorMsg: 'My 404 page'
    })
})

app.listen(3000, () =>[
    console.log('Server is up and running on port 3000')
])



************404.hbs

<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="./css/style.css">
   

</head>

<body>
   {{>header}}
   {{errorMsg}}
    {{>footer}}
    {{!-- {{}} is dynamically used to access the attributes provided in res.render --}}
</body>

</html>





*********************************************10

// Mostly done css here

// used html default header and footer to wrap contents of partials

******* style.css 

body{
    color: #333333;
    font-family: Arial, Helvetica, sans-serif;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;

}

footer{
    color: #888888;
    border-top: 1px solid #eeeeee;
    margin-top : 16px;
    padding: 16px 0;
}

header{
    margin-top: 16px;
    margin-bottom: 48px;
}

h1{
    font-size: 64px;
    margin-bottom: 16px;
}

header a{
    color: #888888;
    margin-right: 16px;
    text-decoration: none;
}



***********header.hbs

<header>

    <h1>{{title}}</h1>

    <div>
        <a href="/">Weather</a>
        <a href="/about">About</a>
        <a href="/help">Help</a>
    </div>
</header>




*****************footer.hbs

<footer>


<p>Created by master {{name}}</p>
</footer>




***********************************************11

// first just provided class to image and adjusted its width

// now we want that footer should stick or remain at bottom for all the files or pages
// for this we will use flexbox
//          1. wrap everything except footer in a div
//          2. In css file applied flexbox properties in body
//          3. and also few properties to the new div created

// set the title in head section of each file
// also set the icon for each file


*********style.css

body{
    color: #333333;
    font-family: Arial, Helvetica, sans-serif;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    /* having column as direction starts the elements from top to bottom */

    /* 100vh means 100 % of screen of user's monitor */
    min-height: 100vh;
    

}

.main-content{
    flex-grow: 1;
    /* flex-grow ==1 means that the div should take all the leftover space */
}

footer{
    color: #888888;
    border-top: 1px solid #eeeeee;
    margin-top : 16px;
    padding: 16px 0;
}

header{
    margin-top: 16px;
    margin-bottom: 48px;
}

h1{
    font-size: 64px;
    margin-bottom: 16px;
}

header a{
    color: #888888;
    margin-right: 16px;
    text-decoration: none;
}

.potrait{
    width: 250px;
}


********index.hbs

<!DOCTYPE html>

<html>

<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.jpg">
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/app.js"></script>

</head>

<body>

    <div class="main-content">

        {{>header}}
        <p>Here you can view your weather!</p>

    </div>
    {{>footer}}
    {{!-- {{}} is dynamically used to access the attributes provided in res.render --}}
</body>

</html>


















