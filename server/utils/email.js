const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_AUTH_USERNAME,
            pass: process.env.EMAIL_AUTH_PASSWORD
        }
    });

    const mailOptions = {
        from: 'Department of Computer Science - University of Ruhuna <>',
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;