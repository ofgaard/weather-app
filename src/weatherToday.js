function extractWeatherData(data) {
    const city = data.resolvedAddress;
    const currentTemp = data.currentConditions.temp
    const currentIcon = data.currentConditions.icon

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
    console.log(weatherData);
    const extractedData = extractWeatherData(weatherData)
    console.log(extractedData)
}



export { getWeatherToday };