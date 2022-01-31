const {_sendEMail} = require("../models/email.js");

const sendEmail = async function(req, res) {
    try {
        const {files, body} = req;
        const {
            to,
            subject,
            text,
            html,
            cc
        } = body;

        if (!to) {
            throw new Error("No receiver provided! Try again whith receiver!");
        }
        if (!subject) {
            throw new Error("No subject provided! Try again whith subject!");
        }
        if (!text && !html) {
            throw new Error("No body provided! Try again whith body!");
        }

        const emailSend = await _sendEMail({to, subject, text, html, cc, files: files ? files.files : null});
        if (emailSend.error) {
            throw new Error(emailSend.error);
        }
        return res.status(201).json(emailSend);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message || JSON.stringify(error)});
    }
};

module.exports = {
    sendEmail
};