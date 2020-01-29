//should import/export main functions of our application js
//move code to server.js

import { getAPIData } from './js/app.js'



document.getElementById('submit').addEventListener('click', function() {
    event.preventDefault(); 
    const city = document.getElementById('city').value;
    getAPIData(city);
});


import './styles/main.scss'
import './styles/form.scss'
import './styles/media.scss'
// todo
// countdown!
// change all functions to arrow functions
// webpack.prod.js
// jest
// service workers