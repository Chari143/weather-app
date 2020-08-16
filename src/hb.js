const express = require('express')
const { help } = require('yargs')

// install express using npm install express --save
const hb = express()


const port = process.env.PORT || 3000 // for heroku

// for root url(app.com) --no need for specifing url
// hb.get('', (req,res) => { //it takes two objects request & response
//     res.send('<h1>HimaBindhu</h1>') // sending html
// })
// //for /help page   -- every time u add a page u want restart server so use nodemon
// hb.get('/help', (req, res) => {
//     // res.send('Help page')
//     res.send({
//         name: 'Hari',
//         age:20
//     })
// })
// //for /about
// hb.get('/about', (req, res) => {
//     res.send('About page')
// })
//URL's
// app.com
// app.com/help
// app.com/about


// hb.listen(3000, () => {  // starts server and we give port
//     console.log('Server started') // is not show in browser only show when we run the file in console
// })
// http://localhost:3000/  ---in browser to see result Hima Bindhu
// http://localhost:3000/help
// http://localhost:3000/about


console.log(__dirname) // gives directory in which hb.js located
console.log(__filename) // gives directory in which hb.js located with file name

const path = require('path') //used to work with paths no need to install
const { readdirSync } = require('fs')


// console.log(path.join(__dirname,'..')) // .. for going up a folder 
// console.log(path.join(__dirname,'../..')) // .. for going up 2 folders
// console.log(path.join(__dirname,'../public'))


// using html file in public folder so we need to join 2 directeries
const publicDir =path.join(__dirname,'../public');
hb.use(express.static(path.join(__dirname,'../public'))) // by using this we can print data from html file in root url because index.html is default for root url not from above given h1 tag

// to see /about and /helpmwhen  u use above method use .html at end of the link compulsary



// Dynamic pages with Templatng

//npm install hbs -- is like a express extension use to work with handlers
hb.set('view engine', 'hbs') // 'view engine'--constant & 'hbs' is module used to work with handlers

// for this to work u want to delete the index.html and gives the name of .hbs file 
// Note:- Default -- the  name of the folder where these hbs files stores is views folder inside src foldeer where main js file located
// to store in another folder
const viewPath = path.join(__dirname,'../views') // selecting folder where .hbs files located
hb.set('views', viewPath) // changing views path to that folder


hb.get('', (req, res) => {
    res.render('index', { // this 2nd orgument used to give input to html
        title: 'weather',
        name:'Hari'
    })
}) 

// Query string for more details see down below
// http://localhost:3000/products?search=games&rating=5  -- website u want to search in chrome serach & rating r like sorting for specific products
// in this we use req term req is the request send by user for searching specific results
hb.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ 
            error:'you must provide a search term'
        })
    }
     // if u search without search it show this error message and also js error message [Cannot set headers after they are sent to the client] in console
    //  when u search in chrome without those terms because in http request we have send one response to client but in this we send two responses i.e error message 
    console.log(req.query.search)  //and products for this we have to use return in error message or else statement the remaining code
    console.log(req.query)
    res.send({
        products:[]
    })
})

// for this to work u want to delete the about.html and gives the name of .hbs file 

hb.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name:'Hari'
    })
})

hb.get('/weather', (req, res) => {
    // res.render('weather',{
    //     title: 'Weather app',
    //     name:'Hari'
    // })
    // using query string    u must provide search location
    // http://localhost:3000/weather?address=YMRcolony search thos to get result
    // if (!req.query.address) {
    //     res.send({
    //         error:'you must provide a address'
    //     })
    // } else {
    //     res.send({
    //         location:req.query.address
    //     })
    // }

    const { Geocoding: geocoding, forecast } = require('./web_api/callbacks.js')

    const address = req.query.address;
    if (!address) {
        res.send({
        error:'you must provide a address'  
        })
    } else {
        // geocoding(address, (error,response) => {
        geocoding(address, (error, {latitude,longitude}={}) => { // if u use destructuring u have to provide default value because if u give address like ! or @ simbols the lat & lon are undefined but we want to destructure the undefined so usse default values

            if (error) {
                res.send({
                    'error':error
                })
                
            } else {
                // forecast(response.latitude,response.longitude, (error, forecastdata) => { // using destructured values
                forecast(latitude,longitude, (error, forecastdata) => { // using destructured values

                    if (!error) {
                        res.send({
                            weather:'Temperature in ' + forecastdata.cityName + ' is ' + forecastdata.temperature + ' degrees'
                    })

                } else {
                        res.send({
                            'error': error
                    })
                    }
                }) 
            }
        })
    }

    })



// for this to work u want to delete the help.html and gives the name of .hbs file Note:-the  name of the folder where these hbs files stores is views folder inside src foldeer where main js file located

hb.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name:'Hari'
    })
})
//shows this message when u search http://localhost:3000/help/anyname
hb.get('/help/*', (req,res) => {
    res.send('error for this page')
})
// for not found pages for details see below
hb.get('*', (req, res) => {  // * is the nodeJs code for not found pages
    // res.send('error page not exist')
    // using hbs files
    res.render('4o4error', {
        title: 404,
        name:'Hari',
        errormessage:'page not found'
    })
})

hb.listen(port, () => {  // starts server and we give port
    console.log('Server started in port '+port) // is not show in browser only show when we run the file in console
})
// Advanced Templating  -- these r also called as partials these are mainly used for header like element where we want same style & content in all pages By using partials we get that done
// when u r using hbs files means templeting when u change any thing nodemon not restart because default it is only restart when change occures in js files so u want use another command for this

// nodeon hb.js -e js,hbs --- but it not work for me so use    rs(only for partisls) in cmd to restart the node by using normal nodmon or this nodemon

const hbs = require('hbs')
const partialspath = path.join(__dirname, '../partials')
hbs.registerPartials(partialspath)



// 404 page means when we search for link that not exist this page is shown
// code for this is under all res.get commands and above hb.listen command(which starts server) so we move .listen command to here
//why this page is under all other pages is that when u serch for a page it search for a page it search for match when it found it renders it and don't go down when it not found it prints the last error message page 
//when we write error page code on top of all that when u search correct page it not show the page but only shows error message every time


// query string --- means to send results for specific category they given code for this is hb.get('/product)....

// sending real weather data

