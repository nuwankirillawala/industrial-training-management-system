const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const sendVerificationEmail = (email, verificationToken) => {
    // Load the email template using EJS
    const templatePath = path.join(__dirname, '../templates', 'verificationEmail.ejs');
    const verificationURL = `http://localhost:5000/api/v1/auth/verify?token=${verificationToken}`;

    // Render the email template with the verification token
    ejs.renderFile(templatePath, { verificationURL, email }, (err, html) => {
        if (err) {
            console.error(err);
            return;
        }

        // Configure your email service provider settings
        // const transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     auth: {
        //         user: process.env.EMAIL_AUTH_USERNAME,
        //         pass: process.env.EMAIL_AUTH_PASSWORD
        //     }
        // });
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'mylene.price@ethereal.email',
                pass: 'NrHqvGUHYbKUATY4BB'
            }
        });

        const mailOptions = {
            from: 'Department of Computer Science - University of Ruhuna <>',
            to: email,
            subject: 'Verify Your Email',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    });
};

module.exports = {
    sendVerificationEmail
};
