document.addEventListener('DOMContentLoaded', function () {
    const getWeatherBtn = document.getElementById('get-weather');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weather-result');

    // OpenWeather API key - you should sign up for your own at https://openweathermap.org/
    const apiKey = 'cccc53325db303e08599d31a8a15e698'

    getWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        // Show loading message
        weatherResult.innerHTML = 'Loading weather data...';

        // Fetch weather data from OpenWeather API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found or API error');
                }
                return response.json();
            })
            .then(data => {
                // Format and display weather data
                const html = `
                    <h3>Weather in ${data.name}, ${data.sys.country}</h3>
                    <div class="weather-info">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                        <div>
                            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                            <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
                            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                        </div>
                    </div>
                `;
                weatherResult.innerHTML = html;
            })
            .catch(error => {
                weatherResult.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            });
    });
});