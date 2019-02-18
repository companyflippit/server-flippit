require('dotenv').config();

module.exports = {
  gmail: {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  },
};
