const express = require("express");
const process = require("process");
require("dotenv/config");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const app = express();
const server = http.createServer(app);

app.use("/", morgan("common"));
app.use("/", cors({methods: "*", allowedHeaders: "*"}));
app.set("trust proxy", true);
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: false, limit: "50mb"}));

require("./routes/index.js")(app, "v1");

if (module === require.main) {
	const PORT = process.env.APP_PORT || 3000;
	const webAPI = server.listen(PORT, () => {
		webAPI.address().address = "0.0.0.0";
		console.log(`>App serving at ${PORT}\n>Press Ctrl+C to quit.`);
	});
}

module.exports = app;