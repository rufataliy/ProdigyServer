const nodemailer = require("nodemailer");

const NEW_MESSAGE_FROM_DEMO = "New message in Prodigy Chat from Demo user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.USERNAME, pass: process.env.PASSWORD },
});
const options = {
  from: process.env.USERNAME,
  to: process.env.CONTACT_EMAIL,
  subject: NEW_MESSAGE_FROM_DEMO,
  text: undefined,
};

module.exports = (text) => {
  transporter.sendMail({ ...options, text });
};
