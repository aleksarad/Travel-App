//Setting up express and middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Initializing main project folder
app.use(express.static('dist'));

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: ['http://localhost:8000/'], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

//Server setup
app.listen(8000, () => { 
  console.log('Server running on http://localhost:8000/'); 
});

//ROUTES
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Geonames API

// const baseURL = 'http://api.geonames.org/searchJSON?q=';
// const userName = '&maxRows=10&username=aradevich';
// const date = '11.22.2020'; 
// const urlKey = 'ad51d28551f5a01df42ccd0ea7805182';
// const unixDate = Math.round(new Date(date).getTime()/1000);
// const unixToday = Math.round(new Date().getTime()/1000);
// const daysBtwn = unixDate - unixToday;


// const projData = {};

// async function getCoords(city) {
//     const url = baseURL + city + userName;
//     const getData = await fetch(url);
//     try {
//         if (getData.status !== 200) {
//         throw new Error("Not 200 response")
//         }
//         else {
//         const data = await getData.json();
//         const coordData = {
//             lat: data.geonames[0].lat,
//             lon: data.geonames[0].lng,
//             country: data.geonames[0].countryName
//         }
//         projData.coord = coordData;
//         getWeatherData(projData,date);
//         }
//     //alert user if unable to retrieve API data with input city
//         } catch(error){
//             alert('Invalid city');
//             return false;
//         }
// }


// async function getWeatherData(projData, date) {
//     const lati = projData.coord.lat;
//     const long = projData.coord.lon;

// //604800 is 7 days in UNIX
//     if(daysBtwn > 604800){
//         url = `https://api.darksky.net/forecast/${urlKey}/${lati},${long},${unixDate}`
//     }
//     else {
//         url = `https://api.darksky.net/forecast/${urlKey}/${lati},${long}`
//     }
//     const getData = await fetch(url);
//     try {
//         if (getData.status !== 200) {
//         throw new Error("Not 200 response")
//         }
//         else {
//         const data = await getData.json();
//         const weatherData = {
//             tempHigh: data.daily.data[0].temperatureHigh,
//             tempLow: data.daily.data[0].temperatureLow,
//             summary: data.daily.data[0].temperatureHigh
//         }
//         projData.weather = weatherData;
//         return projData
//         }
//     //alert user if unable to retrieve API data with input city
//         } catch(error){
//             alert('Invalid city');
//             return false;
//         }
    
// }

// getCoords('Paris');

