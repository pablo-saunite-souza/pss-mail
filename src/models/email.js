const process = require("process");
const nodemailer = require("nodemailer");

const transporterConfiguration = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}

const transporter = nodemailer.createTransport(transporterConfiguration);

const _sendEMail = async function({to, subject, text, html, cc, files}) {
    try {
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