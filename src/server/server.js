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

//Server setup
app.listen(8000, () => { 
  console.log('Server running on http://localhost:8000/'); 
});

//ROUTES
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/darksky', async function (req,res){
  const data = await fetch(req.body.url);
  console.log(req.body.url);
  // console.log(data);
  const weatherData = await data.json();
  const darkSkyObj = {
    tempHigh: weatherData.daily.data[0].temperatureHigh,
    tempLow: weatherData.daily.data[0].temperatureLow,
    summary: weatherData.daily.data[0].summary
  }
  res.send(darkSkyObj);
  // console.log(weatherData.daily.data[0].temperatureHigh, weatherData.daily.data[0].temperatureLow);
  console.log(darkSkyObj);
});


