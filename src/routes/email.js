const router = require("express").Router();
const multer  = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage
}).fields([
    {
        name: "files",
    }
]);
const {
    sendEmail
} = require("../controllers/email.js");

router.post("/send", upload, sendEmail);

module.exports = (app, path) => app.use(path, router);