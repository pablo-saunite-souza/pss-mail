require("dotenv/config");
const process = require("process");
const jwt = require("jsonwebtoken");

module.exports = {
    async _authenticateApp(params) {
        try {
            const {userName, password} = params;
            if (userName != process.env.AUTH_USER) {
                return {error: "Auth failed. User or password invalid"};
            }

            if (password != process.env.AUTH_PASS) {
                return {error: "Auth failed. User or password invalid"};
            }

            const authToken = jwt.sign({
                verify: process.env.AUTH_VERIFY
            }, process.env.AUTH_KEY, { expiresIn: "1h" });

            return {
                success: "Auth success",
                token: authToken,
                type: "Bearer"
            };
        } catch (error) {
            console.log(error);
            return {error};
        }
    },

    async _verifyToken(authorization) {
        try {
            const decodedAuthorization = authorization.split(" ");
            if (decodedAuthorization[0] != "Bearer") {
                return {error: "Type error"};
            }
            return new Promise((res, rej) => {
                jwt.verify(decodedAuthorization[1], process.env.AUTH_KEY, function(err, decoded) {
                    if (err) {
                        return rej({error: err});
                    }
                    if (!decoded.verify || decoded.verify != process.env.AUTH_VERIFY) {
                        return rej({error: "Invalid verification"});
                    }
                    return res({success: true});
                });
            });
        } catch (error) {
            console.log(error);
            return {error};
        }
    }
}