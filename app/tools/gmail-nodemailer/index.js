const nodemailer = require('nodemailer');
const { AppError } = require('error-delpinos').errors;
const Email = require('./src/Email');
require('dotenv').config();

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  try {
    const response = await transporter.sendMail(email);
    return response;
  } catch (error) {
    throw new AppError('There was an error while sending the mail', 400);
  }
};

module.exports = {
  sendEmail,
  Email,
};
