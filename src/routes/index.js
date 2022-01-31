const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const nessessaryFiles = [
    "auth.js"
];
nessessaryFiles.forEach(file => {
    require(path.join(__dirname, file))(router, file.split(".js")[0] == "auth" ? "/" : file.split(".js")[0]);
});

const filesPath = fs.readdirSync(path.join(__dirname))
filesPath.forEach(file => {
    if (file != "index.js" && !nessessaryFiles.includes(file)) {
        require(path.join(__dirname, file))(router, `/${file.split(".js")[0]}`);
    }
});

module.exports = (app, path) => app.use(`/${path}`, router);