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
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.post('/darksky', async (req,res) => {
  const data = await fetch(req.body.url);
  console.log(req.body.url);
  const weatherData = await data.json();
  const darkSkyObj = {
    tempHigh: Math.round(weatherData.daily.data[0].temperatureHigh),
    tempLow: Math.round(weatherData.daily.data[0].temperatureLow),
    summary: weatherData.daily.data[0].summary
  }
  res.send(darkSkyObj);
  console.log(darkSkyObj);
});


