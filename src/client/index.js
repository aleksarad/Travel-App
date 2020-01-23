//should import/export main functions of our application js
alert('this is dist');

const baseURL = 'http://api.geonames.org/searchJSON?q=';
const userName = '&maxRows=10&username=aradevich';
const date = '11.22.2020'; 
const urlKey = 'ad51d28551f5a01df42ccd0ea7805182';
const unixDate = Math.round(new Date(date).getTime()/1000);
const unixToday = Math.round(new Date().getTime()/1000);
const daysBtwn = unixDate - unixToday;


const projData = {};

async function getCoords(city) {
    const url = baseURL + city + userName;
    const getData = await fetch(url);
    try {
        if (getData.status !== 200) {
        throw new Error("Not 200 response")
        }
        else {
        const data = await getData.json();
            const coordData = {
                lat: data.geonames[0].lat,
                lon: data.geonames[0].lng,
                country: data.geonames[0].countryName
            }
            projData.coord = coordData;
            getWeatherData(projData,date);
        }
    //alert user if unable to retrieve API data with input city
        } catch(error){
            alert('Invalid city');
            return false;
        }
}


async function getWeatherData(projData, date) {
    const lati = projData.coord.lat;
    const long = projData.coord.lon;

//604800 is 7 days in UNIX
    if(daysBtwn > 604800){
        url = `https://api.darksky.net/forecast/${urlKey}/${lati},${long},${unixDate}`
    }
    else {
        url = `https://api.darksky.net/forecast/${urlKey}/${lati},${long}`
    }
    const getData = await fetch(url);
    console.log(url)
        const data = await getData.json();
            console.log(data);
            const weatherData = {
                tempHigh: data.daily.data[0].temperatureHigh,
                tempLow: data.daily.data[0].temperatureLow,
                summary: data.daily.data[0].summary
            }
            projData.weather = weatherData;
            console.log(projData);
}

getCoords('Paris');
console.log(projData);

//import scss
// import './styles/main.scss'
//If we are exporting functions from our application.js file, our event listeners can’t go there. Where can we put them? To call that exported function?