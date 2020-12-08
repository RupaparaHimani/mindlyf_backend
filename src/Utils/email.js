const nodemailer = require('nodemailer');

const sendMail = async (email, subject, text, html) => {
    const transporter = await nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:'rupaparahimani@gmail.com',
            pass: 'himani818'
        },
        secure: true,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
    });
    const mailOptions = {
        from: 'example@gmail.com',
        to: email,
        subject: subject,
        text: text,
        html: html
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = { sendMail };
