//Setting up express and middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Initializing main project folder
app.use(express.static('dist'));

//Server setup
app.listen(8000, () => { 
  console.log('Server running on http://localhost:8000/'); 
});

//ROUTES
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Geonames API

const baseURL = 'http://api.geonames.org/searchJSON?q=';
const userName = '&maxRows=10&username=aradevich';

async function getCoords(city) {
    const url = baseURL + city + userName;
    //testing to make sure URL returned is correct
    return url;
}