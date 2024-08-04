function extractWeatherData(data) {
    const city = data.resolvedAddress;
    const currentTemp = data.currentConditions.temp;
    const currentIcon = data.currentConditions.icon;

    const today = {
        city,
        currentTemp,
        currentIcon
    }
    return today;


}


async function getWeatherToday(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=AA389VFMY633JCZT8H7UWFMTD`)
    const weatherData = await response.json();
    const extractedData = extractWeatherData(weatherData);
    return extractedData;
}

async function renderWeatherToday(target, location) {
    const mainBox = document.querySelector('.main-box');
    const mainBoxWeather = document.querySelector('.main-box-weather');
    const weatherData = await getWeatherToday(location);

    const weatherDisplay = document.createElement('div');
    weatherDisplay.className = `${target}`;
    weatherDisplay.innerHTML = `
    <h3>Weather in ${weatherData.city}</h3>
    <p>Temperature: ${weatherData.currentTemp}</p>
    `
    mainBoxWeather.appendChild(weatherDisplay);

}


export { getWeatherToday, renderWeatherToday };