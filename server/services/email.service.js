const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // host email username
    pass: process.env.EMAIL_PASSWORD, // host email password
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Flickbase",
        link: `${process.env.EMAIL_HOST}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro: "Welcome to Flickbase! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Flickbase, please click here:",
          button: {
            color: "#22BC66", // Optional action button color,
            text: "Confirm your account",
            link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL_HOST,
      to: userEmail,
      subject: "Confirm your account",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerEmail,
};
