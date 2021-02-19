/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=6c31832a1258f53fbea517b9e487dcf8";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", getWeather);

/* Function called by event listener */
function getWeather(e) {
	let zipCode = document.getElementById("zip").value;
	let userFeeling = document.getElementById("feelings").value;
	getWeatherDetails(baseURL, zipCode, apiKey).then(function (weatherInfo) {
		console.log("Checking weather info", weatherInfo);
		const realTemperature = weatherInfo.main.temp;
		const feelsLikeTemperature = weatherInfo.main.feels_like;
		const city = weatherInfo.name;
		const country = weatherInfo.sys.country;
		const description = weatherInfo.weather[0].description;
		const windSpeed = weatherInfo.wind.speed;
		const humidity = weatherInfo.main.humidity;
		const clouds = weatherInfo.clouds.all;
		const rain = weatherInfo.rain;
		const snow = weatherInfo.snow;
		const pressure = weatherInfo.pressure;
		const feeling = userFeeling;
		// Post weather details to the server
		postData("/add", {
			realTemperature,
			feelsLikeTemperature,
			city,
			description,
			windSpeed,
			humidity,
			clouds,
			rain,
			snow,
			pressure,
			feeling,
			country,
			//  Call UpdateUI function after click and weather details are gathered
		}).then(() => {
			updateUI();
		});
	});
}

/* Function to GET Web API Data*/

const getWeatherDetails = async (baseURL, zipCode, apiKey) => {
	const response = await fetch(baseURL + zipCode + apiKey);
	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		console.log("error", error);
	}
};

/* Function to POST data */

const postData = async (url = "", data = {}) => {
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "aplication/json" },
		body: JSON.stringify(data),
	});
};

/* Function to GET Project Data */
const updateUI = async () => {
	// GET function that takes the info from the server
	const response = await fetch("/all");
	const lastEntry = await response.json();
	console.log(lastEntry);
	document.querySelector(".city").innerText = "Weather in " + lastEntry.city;
	document.querySelector(".country").innerText = lastEntry.country;
	document.querySelector(".temperature").innerText = Math.floor(lastEntry.temperature) + "°C";
	document.querySelector(".description").innerText = lastEntry.description;
	document.querySelector(".humidity").innerText = "Humidity: " + lastEntry.humidity + "%";
	document.querySelector(".wind").innerText = "Wind speed: " + lastEntry.windSpeed + "km/H";
	document.querySelector(".date").innerText = dateToday;
	document.querySelector(".content").innerText = lastEntry.feeling;
};
