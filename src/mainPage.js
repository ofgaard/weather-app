import { getWeatherToday, renderWeatherToday } from './weatherToday.js';

import { userForm } from './userInput.js';

export default function main() {
    const mainPage = document.querySelector('.mainpage')
    const mainBox = document.createElement('div');
    const mainBoxWeather = document.createElement('div');
    mainBox.className = 'main-box';
    mainBoxWeather.className = 'main-box-weather';
    mainBox.appendChild(mainBoxWeather);
    mainPage.appendChild(mainBox);
    renderWeatherToday('main-weather', 'london');
    userForm();
}

