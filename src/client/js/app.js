//holds all API data
const projData = {};

const date = document.getElementById('date'); 



//pulls data from GEONAMES API using city input from event handler
export const getCoords = async (city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=aradevich`;
    // console.log(url);
    const getData = await fetch(url);
    try {
        if (getData.status !== 200) {
            throw new Error("Not 200 response");
        }
        else {
            const data = await getData.json();
            const coordData = {
                lat: data.geonames[0].lat,
                lon: data.geonames[0].lng,
                country: data.geonames[0].countryName,
                countryCode: data.geonames[0].countryCode,
                city: data.geonames[0].name
            }
            projData.coord = coordData;
            // console.log(projData);
        }
//alert user if unable to retrieve API data with input city
        } catch(error) {
            alert('Invalid city');
            return false;
        }
}

//pulls data from DarkSky API - this is done with a post request thru the server due to DarkSky CORS blocking
const getWeatherData = async (projData, date) => {

    const darkSkyKey = 'ad51d28551f5a01df42ccd0ea7805182';
    const unixDate = Math.round(new Date(date.value).getTime()/1000);
    const unixToday = Math.round(new Date().getTime()/1000);
    const unixDaysBtwn = unixDate - unixToday;
    const daysBtwn = Math.round(unixDaysBtwn/86400);
    const lati = projData.coord.lat;
    const long = projData.coord.lon;

    // console.log(unixDate, unixToday, daysBtwn);

    //assigns url value based on whether the input date is greater than a week from current date
    const url = (daysBtwn > 7) ? `https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long},${unixDate}`:`https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long}`;
    // console.log(url);
    const getData = await fetch('http://localhost:8000/darksky', {
        method: 'POST',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
      })
      const data = await getData.json();
      projData.weather = data;
      projData.date = daysBtwn + 1;
    //   console.log(projData);
}

//pulls Pixabay API data
const getPicture = async (city) => {
    const pixabayKey = '15014683-5b1e294ffb954d607aae92b8b';
    const country = projData.coord.country;
    const newCity = city.replace(/\s+/g, '%20');

    //both urls are needed in the case that a city does not have any pictures associated with it on pixabay
    const countryURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${country}&orientation=horizontal`;
    const cityURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${newCity},${country}&orientation=horizontal`;

    const getData = await fetch(cityURL);
    const data = await getData.json();
    // console.log(data);
    // console.log(cityURL);
    if (data.hits.length > 0) {
        const picData = {
            url: data.hits[0].webformatURL
        }
        projData.picture = picData;
    }
    //if the API response for the city url is less than 0, another request is sent for the country
    else {
        const getData = await fetch(countryURL);
        console.log(countryURL)
        const data = await getData.json();
        const picData = {
            url: data.hits[0].webformatURL
        }
        projData.picture = picData;
    }     
    // console.log(projData);
}

//pulls data from REST country API
const getCountryData = async () => {
    const countryCode = projData.coord.countryCode;
    const restURL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;

    const getData = await fetch(restURL);
    const data = await getData.json();
        // console.log(data);
        const countryData = {
            capital: data.capital,
            population: data.population,
            currency: data.currencies[0].name,
            flag: data.flag
        }
        projData.country = countryData;
        // console.log(projData);
}

//updates UI based on API data stored in ProjData
const updateUI = (data) => {
    //countdown
    const inputDate = date.value; 
    const formatDate = new Date(inputDate).toLocaleDateString('en-US', {timeZone: 'UTC'});
    const countdown = projData.date;
    const dayNum = (countdown === 1) ? 'day' : 'days';

    const newPopulation = projData.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById('countdown').innerHTML = `Your trip is ${countdown} ${dayNum} away!`;
    document.getElementById('tripSummary').innerHTML = `Trip to ${projData.coord.city}, ${projData.coord.country}, departing on ${formatDate}.`;
    document.getElementById('tripPic').src = projData.picture.url;
    document.getElementById('countryDetails').innerHTML = `Enjoy your trip to  ${projData.coord.country} <img class="flag" src="${projData.country.flag}"> !
    The capital of ${projData.coord.country} is ${projData.country.capital}. The currency is the ${projData.country.currency}. The population is ${newPopulation}.`
    // some locations do not have the 'summary' field for future dates 
    if (projData.weather.summary == undefined) {
        document.getElementById('weatherSummary').innerHTML = `<strong>Forecast</strong>: High of ${projData.weather.tempHigh}&#8457;, low of ${projData.weather.tempLow}&#8457;` ;
    }
    else {
        document.getElementById('weatherSummary').innerHTML = `<strong>Forecast</strong>: ${projData.weather.summary} High of ${projData.weather.tempHigh}&#8457;, low of ${projData.weather.tempLow}&#8457;`;
    }
}

//helper function to make elements invisible when first opening app - by removing hidden class
const makeVisible = () => {
    const tripHeading = document.getElementById('tripHeading');
    const countryHeading = document.getElementById('countryHeading');
    const tripPic = document.getElementById('tripPic');
    tripHeading.classList.remove('hidden');
    countryHeading.classList.remove('hidden');
    tripPic.classList.remove('hidden');
}

/** MAIN FUNCTION */
//this runs on click and initiates all the other functions
export const getAPIData = async (city) => {
    getCoords(city).then(() => getWeatherData(projData,date)).then(() => 
    getPicture(city)).then(()=> getCountryData(projData)).then(()=> 
    updateUI(projData)).then(() => makeVisible());
}
