import { getAPIData } from './js/app.js'

//Main event handler
document.getElementById('submit').addEventListener('click', () => {
    event.preventDefault(); 
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;

    if(city.trim() == '' || date ==''){
        alert(`Please make sure you've entered a valid city and date`)
    }
    else {
    getAPIData(city);
    }
});


import './styles/main.scss'
import './styles/form.scss'
import './styles/media.scss'


export { getAPIData }
