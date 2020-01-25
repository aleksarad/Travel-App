const date = document.getElementById('date'); 
const projData = {};



async function getCoords(city) {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=aradevich`;
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
            console.log(projData);
        }
//alert user if unable to retrieve API data with input city
        } catch(error){
            alert('Invalid city');
            return false;
        }
}


async function getWeatherData(projData, date) {
    const darkSkyKey = 'ad51d28551f5a01df42ccd0ea7805182';
    const unixDate = Math.round(new Date(date.value).getTime()/1000);
    const unixToday = Math.round(new Date().getTime()/1000);
    const daysBtwn = unixDate - unixToday;
    const lati = projData.coord.lat;
    const long = projData.coord.lon;

    console.log(unixDate, unixToday, daysBtwn);
    var url = (daysBtwn > 604800) ? `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long},${unixDate}`:`https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long}`;
    
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

async function getPicture(city){
    const pixabayKey = '15014683-5b1e294ffb954d607aae92b8b';
    const country = projData.coord.country.replace(/\s+/g, '+');
    const newCity = city.replace(/\s+/g, '+');
    const imgURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${newCity},${country}&image_type=photo`;
        const getData = await fetch(imgURL);
        const data = await getData.json();
        console.log(data);
        const picData = {
            url: data.hits[0].webformatURL,
        }
        projData.picture = picData;
        console.log(projData);
}

function updateUI(projData) {
    document.getElementById('weatherSummary').innerHTML = `<strong>Forecast</strong>: ${projData.weather.summary}`;
    document.getElementById('temp').innerHTML = `High of <strong>${projData.weather.tempHigh}&#8457;</strong>, low of <strong>${projData.weather.tempLow}&#8457;</strong>`;
    document.getElementById('tripPic').src = projData.picture.url;
}

export async function getAPIData(city){
    getCoords(city).then(() => getWeatherData(projData,date)).then(() => getPicture(city)).then(() => updateUI(projData));
}

