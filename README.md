# Overview #

This is the final project for Udacity's Frontend Nandodegree. No starter code was provided. 

This app takes a location and date input from the user, and returns weather data, country data, and an image using 4 APIs. 

## About ##

API data is stored in an object that is then used to update the UI of the app. 
APIs used: http://www.geonames.org/export/web-services.html, https://darksky.net/dev/docs, https://pixabay.com/api/docs/, https://restcountries.eu/
All API calls are made from the client side - besides DarkSkyAPI, which is made on the server side due to DarkSky disabling CORS.


## Dependencies ##

A full list of dependencies can be found in package.json. This project was made primarily with:

* HTML, CSS, JS
* Nodejs
* SASS
* Webpack
* Service Workers
* Jest

## Running the Project ##

1. Download zip and cd into the project.
2. `npm install`
3. `npm run build-prod`
4. `npm start` and go to http://localhost:8000/

