//should import/export main functions of our application js
//move code to server.js

import { getAPIData } from './js/app.js'

document.getElementById('submit').addEventListener('click', function() {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getAPIData(city);

});


//import scss
// import './styles/main.scss'
//If we are exporting functions from our application.js file, our event listeners can’t go there. Where can we put them? To call that exported function?