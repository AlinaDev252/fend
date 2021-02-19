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
	let userResponse = document.getElementById("feelings").value;
	getWeatherDetails(baseURL, zipCode, apiKey)
		.then(function (weatherInfo) {
			console.log("Checking weather info", weatherInfo);
			// Post weather details to the server
			postData("/add", { temperature: weatherInfo.main.temp, userResponse: userResponse, date: newDate });

			//  Call UpdateUI function after click and weather details are gathered
		})
		.then(() => {
			updateUI();
		});
}

/* Function to GET Web API Data*/

const getWeatherDetails = async (baseURL, zip, apiKey) => {
	const res = await fetch(baseURL + zip + apiKey);
	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/* Function to POST data */
async function postData(url = "", data = {}) {
	await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		// Body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});
}

/* Function to GET Project Data */
const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const allData = await request.json();
		// console.log("all data: ", allData);
		document.getElementById("date").innerHTML = allData.date;
		document.getElementById("temp").innerHTML = allData.temperature;
		document.getElementById("content").innerHTML = allData.userResponse;
	} catch (error) {
		console.log("error", error);
	}
};
