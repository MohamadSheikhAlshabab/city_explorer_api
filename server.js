'use strict' // use it to enable strict
// mode which means not allow undeclare variables to use

require('dotenv').config(); // require means to load JS file 
//.config() it will read .env file and return object or error if it failed
// dotenv is JS pacjage reads key, value pairs from .env file and sets each of them  as env varibles

const express = require('express'); //use require to import express, express is a node.js package  (express is a third party library) 
const cors = require('cors'); // cors is node.js package for providing a connect/express middleware can  used to enable cors
const PORT = process.env.PORT || 4000; // declare const variable called PORT, which runs scripts in this environment and whatever is in environment varible PORT or 4000 if there nothing there
//app.use(cors());
var app = express() //statement creates a new express application for you, express() is like a constructor, () is like an invoke/call

app.get('/', (request, response) => {
    response.status(200).send('HOME PAGE');//send it will send a string or HTML tags ,is not used to send a JSON values (.JSON is used to send JSON values  )
});
app.get('/bad', (request, response) => { // app.get()is part of Express' application routing and is intended for matching and handling a specific route when requested
    throw new Error('OH MY GOD!! something goes bad ');
});

app.get('/location', (request, response) => {
    try {
        const geoData = require('./data/geo.json');
        const city = request.query.city;
        const locaData = new Locations(city, geoData);
        response.status(200).json(locaData);

    } catch (error) {
        errorHandler(error);
    }

});

// let currentTime = new Date(parseInt(time));
// alert(currentTime);

app.get('/weather', (request, response) => {
    try {
        const darkskyData = require('./data/darksky.json');
        const foreCast = request.query.foreCast;
        const weatherData = new Weather(foreCast, darkskyData);
        response.status(200).json(weatherData);

    } catch (error) {
        errorHandler(error);
    }

});


app.use('*', notFoundHandler, errorsHandler);// app.use() is intended for binding middleware to your application. The path is a "mount" or "prefix" path and limits the middleware to only apply to any paths requested that begin with it.
// By specifying / as a "mount" path, app.use() will respond to any path that starts with /.
function Locations(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;   
}
function Weather(foreCast, weatherData) {
    this.forecasts = foreCast;
    this.time = weatherData.data[0].valid_date;
    this.forecast = weatherData.data[0].weather.description;
    
    
}

function notFoundHandler(request, response) {
    response.status(404).send('PAGE NOT FOUND');
}

function errorsHandler(request, response) {
    response.status(500).send('Sorry, something went wrong');
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
}

app.listen(PORT, () => console.log(`Server is Running well on PORT ${PORT}`)); // .listen is a method that creates a listener to listen to the port. 