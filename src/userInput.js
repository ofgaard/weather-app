import { renderWeatherToday } from "./weatherToday.js";

function userForm() {
    const mainBox = document.querySelector('.main-box');
    const mainBoxWeather = document.querySelector('.main-box-weather');
    const userInput = document.createElement('form');
    userInput.innerHTML = `
<label for="location">Enter location</label>
<input type="text" id="location" name="location" required>
<button type="submit">Get Weather</button>
`
userInput.addEventListener('submit', async (event) =>
{
    event.preventDefault();
    const location = userInput.querySelector('#location').value;
    mainBoxWeather.innerHTML = '';
    await renderWeatherToday('main-weather', location);

});

mainBox.appendChild(userInput);
}

export { userForm };