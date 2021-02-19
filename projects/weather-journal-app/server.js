// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 2525;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
	console.log(server);
	console.log(`running on localhost: ${port}`);
}

// Callback function to complete GET '/all'
app.get("/all", function (request, response) {
	response.send(projectData);
});

// Post Route
// app.post("/add", postData)

// app.post("/add", function (req, res) {
// 	let newEntry = {
// 		temperature: req.body.temp,
// 		date: req.body.date,
// 		userResponse: req.body.content,
// 	};
// 	projectData = newEntry;
// 	res.send(projectData);
// });

app.post("/add", postData);

function postData(request, response) {
	projectData = request.body;
	response.send({ message: "Post received" });
	console.log(projectData);
}
