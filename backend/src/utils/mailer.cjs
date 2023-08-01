const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

    host: "origin-8.co",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

async function sendEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: `Admin <${process.env.EMAIL}>`,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent:", info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = { sendEmail };
