const process = require("process");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const getEmailConfiguration = accessToken => ({
    service: process.env.EMAIL_SERVICE,
    auth: {
        type: process.env.EMAIL_AUTH_TYPE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
})

const oAuth2Client = new google.auth.OAuth2(
    getEmailConfiguration().auth.clientId,
    getEmailConfiguration().auth.clientSecret,
);
oAuth2Client.setCredentials({refresh_token: getEmailConfiguration().auth.refreshToken})

const _sendEMail = async function({to, subject, text, html, cc, files}) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport(getEmailConfiguration(accessToken));
        return new Promise((res, rej) => {
            transporter.sendMail({
                from: {
                    name: process.env.EMAIL_NAME,
                    address: process.env.EMAIL_USER,
                },
                to,
                subject,
                text,
                html,
                cc,
                attachments: files ? files.map(file => ({
                    filename: file.originalname,
                    contentType: file.mimetype,
                    encoding: file.encoding,
                    content: file.buffer
                })) : []
            }, (error, info) => {
                if (error) {
                    return rej(error);
                } else {
                    console.log("Email sent: " + info.response);
                    return res({success: "E-mail enviado com sucesso! Obrigado por utilizar nossos serviços!"});
                }
            });
        });
    } catch (error) {
        return error;
    }
};

module.exports = {
    _sendEMail,
};