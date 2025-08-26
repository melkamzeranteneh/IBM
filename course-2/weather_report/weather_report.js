// Weather Report JavaScript - Handles weather API calls and UI updates

/**
 * Returns appropriate weather icon based on weather condition
 * @param {string} weatherMain - Main weather condition from API
 * @returns {string} Weather emoji icon
 */
function getWeatherIcon(weatherMain) {
    const weatherIcons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌫️',
        'Fog': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    return weatherIcons[weatherMain] || '🌤️';
}

/**
 * Fetches and displays weather information for a given city
 * @param {Event} event - The form submission event
 */
function showweatherDetails(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the city name from the input field
    const city = document.getElementById('city').value;
    
    // Validate that a city name was entered
    if (!city.trim()) {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
        return;
    }
    
    // API configuration
    const apiKey =prompt("Your API key");
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    
    // Show loading message
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p>Loading weather data...</p>`;
    
    // Fetch weather data from OpenWeatherMap API
    fetch(apiUrl)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if the API returned an error
            if (data.cod && data.cod !== 200) {
                throw new Error(data.message || 'City not found');
            }
            
            // Get weather icon based on weather condition
            const weatherIcon = getWeatherIcon(data.weather[0].main);
            
            // Display weather information with enhanced styling
            weatherInfo.innerHTML = `
                <h2>${weatherIcon} Weather in ${data.name}</h2>
                <p><strong>Temperature:</strong> <span class="temperature">${data.main.temp}°C</span></p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> 💧 ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> 💨 ${data.wind.speed} m/s</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
            `;
        })
        .catch(error => {
            // Handle and display errors
            console.error('Error fetching weather:', error);
            let errorMessage = 'Failed to fetch weather. Please try again.';
            
            // Provide more specific error messages
            if (error.message.includes('404') || error.message.includes('not found')) {
                errorMessage = 'City not found. Please check the spelling and try again.';
            } else if (error.message.includes('401')) {
                errorMessage = 'API key error. Please contact administrator.';
            } else if (error.message.includes('NetworkError')) {
                errorMessage = 'Network error. Please check your internet connection.';
            }
            
            weatherInfo.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
        });   
}
// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the weather form
    const weatherForm = document.getElementById('weatherForm');
    if (weatherForm) {
        weatherForm.addEventListener('submit', showweatherDetails);
    } else {
        console.error('Weather form not found in the DOM');
    }
});