const { _verifyToken, _authenticateApp } = require("../middlewares/auth.js");

module.exports = {
	async authenticate (req, res) {
		try {
			const {userName, password} = req.body;

            if (!userName) {
                return res.status(400).json({
                    error: "No userName provided to Auth"
                });
            }
            if (!password) {
                return res.status(400).json({
                    error: "No password provided to Auth"
                });
            }

            const authenticated = await _authenticateApp({userName, password});

            if (authenticated.error) {
                return res.status(400).json({...authenticated});
            }

			return res.status(201).json({...authenticated});
		} catch (error) {
			console.log(error);
			return res.status(400).json({error});
		}
	},

    async verifyAuthentication (req, res, next) {
		try {
			const {authorization} = req.headers;
			if (!authorization){
				return res.status(403).json({error: "Authentication failed! 0"});
			}
            const authenticated = await _verifyToken(authorization);
            if (!authenticated.success) {
                return res.status(403).json({error: "Authentication failed! 1"});
            }
            next();
		} catch (error) {
			console.log(error);
			return res.status(403).json(error);
		}
	}
};