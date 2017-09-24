const nodemailer = require('nodemailer');
const mailerconf = require('./mailconfig');

const transporter = nodemailer.createTransport(mailerconf.conf);

const sendEmail = function(mailOptions, callback) {
    if (!mailOptions.to || !mailOptions.text)
        return callback('Error on options.', new Error('Error: No text or sender email has been added to options sent.'));

    if (!mailOptions.from)
        mailOptions.from = "GrowItIn Inc. <growitin@jurhidy.com>"; // change this to default email

    if (!mailOptions.subject)
        mailOptions.subject = 'Do not reply - Hydroponics Inc.'; // change this to default subject

    // return transporter.sendMail(mailOptions, callback);

    const verifyMail = (err, success) => {

        if (err) return callback('Error verifying connection to SMTP server', err);

        const send = (err, res) => {
            if (err) return callback('Error', err);
            return callback(null, res);
        };

        transporter.sendMail(mailOptions, send);
    };

    transporter.verify(verifyMail);
}

exports.sendEmail = sendEmail;