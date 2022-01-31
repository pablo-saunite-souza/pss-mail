const router = require("express").Router();
const {
    authenticate,
    verifyAuthentication
} = require("../controllers/auth.js");

router.post("/auth", authenticate);
router.use("/", verifyAuthentication);

module.exports = (app, path) => app.use(path, router);