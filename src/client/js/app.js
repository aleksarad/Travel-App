const date = document.getElementById('date'); 
const projData = {};



async function getCoords(city) {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=aradevich`;
    console.log(url);
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
                country: data.geonames[0].countryName,
                countryCode: data.geonames[0].countryCode,
                city: data.geonames[0].name
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


// async function getWeatherData(projData, date) {
    // const darkSkyKey = 'ad51d28551f5a01df42ccd0ea7805182';
    // const unixDate = Math.round(new Date(date.value).getTime()/1000);
    // const unixToday = Math.round(new Date().getTime()/1000);
    // const daysBtwn = unixDate - unixToday;
    // const lati = projData.coord.lat;
    // const long = projData.coord.lon;

    // console.log(unixDate, unixToday, daysBtwn);
    // var url = (daysBtwn > 604800) ? `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long},${unixDate}`:`https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long}`;
    
//     // const getData = await fetch(url);
//     // console.log(url)
//     // const data = await getData.json();
//     //         console.log(data);
//     //         const weatherData = {
//     //             tempHigh: data.daily.data[0].temperatureHigh,
//     //             tempLow: data.daily.data[0].temperatureLow,
//     //             summary: data.daily.data[0].summary
//     //         }
//     //         projData.weather = weatherData;
//     //         console.log(projData);
// }

// const postReq = async (path, url) => {
//     const getData = await fetch(path, {
//       method: 'POST',
//       cache: 'no-cache', 
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({url: url})
//     })
//     const data = await getData;
//     console.log(data)
//     return data;
// }

async function getWeatherData(projData, date) {
    const darkSkyKey = 'ad51d28551f5a01df42ccd0ea7805182';
    const unixDate = Math.round(new Date(date.value).getTime()/1000);
    const unixToday = Math.round(new Date().getTime()/1000);
    const daysBtwn = unixDate - unixToday;
    const lati = projData.coord.lat;
    const long = projData.coord.lon;

    console.log(unixDate, unixToday, daysBtwn);
    var url = (daysBtwn > 604800) ? `https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long},${unixDate}`:`https://api.darksky.net/forecast/${darkSkyKey}/${lati},${long}`;
    console.log(url);
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
      console.log(projData);
}



async function getPicture(city){
    const pixabayKey = '15014683-5b1e294ffb954d607aae92b8b';
    const country = projData.coord.country;
    const newCity = city.replace(/\s+/g, '%20');
    const countryURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${country}&orientation=horizontal`;
    const cityURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${newCity},${country}&orientation=horizontal`;
        const getData = await fetch(cityURL);
        const data = await getData.json();
        console.log(data);
        console.log(cityURL);
        if (data.hits.length > 0) {
            const picData = {
                url: data.hits[0].webformatURL
            }
            projData.picture = picData;
        }
        else {
            const getData = await fetch(countryURL);
            console.log(countryURL)
            const data = await getData.json();
            const picData = {
                url: data.hits[0].webformatURL
            }
            projData.picture = picData;
        }
        
        console.log(projData);
}

async function getCountryData(){
    const countryCode = projData.coord.countryCode;
    const restURL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
        const getData = await fetch(restURL);
        const data = await getData.json();
        console.log(data);
        const countryData = {
            capital: data.capital,
            population: data.population,
            currency: data.currencies[0].name,
            flag: data.flag
        }
        projData.country = countryData;
        console.log(projData);
}


export function updateUI(data) {
    const inputDate = document.getElementById('date').value; 
    const newPopulation = projData.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    document.getElementById('tripSummary').innerHTML = `Trip to ${projData.coord.city}, ${projData.coord.country}, departing on ${inputDate}.`;
    document.getElementById('tripPic').src = projData.picture.url;
    document.getElementById('countryDetails').innerHTML = `Enjoy your trip to  ${projData.coord.country} <img class="flag" src="${projData.country.flag}"> !
    The capital of ${projData.coord.country} is ${projData.country.capital}. The currency is the ${projData.country.currency}. The population is ${newPopulation}.`
    if(projData.weather.summary == undefined) {
        document.getElementById('weatherSummary').innerHTML = `<strong>Forecast</strong>: High of ${projData.weather.tempHigh}&#8457;, low of ${projData.weather.tempLow}&#8457;` ;
    }
    else {
        document.getElementById('weatherSummary').innerHTML = `<strong>Forecast</strong>: ${projData.weather.summary} High of ${projData.weather.tempHigh}&#8457;, low of ${projData.weather.tempLow}&#8457;`;
    }
}

function makeVisible() {
    const tripHeading = document.getElementById('tripHeading');
    const countryHeading = document.getElementById('countryHeading');
    const tripPic = document.getElementById('tripPic');
    tripHeading.classList.remove('hidden');
    countryHeading.classList.remove('hidden');
    tripPic.classList.remove('hidden');
}

export async function getAPIData(city){
    getCoords(city).then(() => getWeatherData(projData,date)).then(() => getPicture(city)).then(()=> getCountryData(projData)).then(()=> updateUI(projData)).then(() => makeVisible());
}
