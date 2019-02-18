require('dotenv').config();
/**
 * @param  {String} to
 * @param  {String} subject
 * @param  {String} text
 * @param  {String} html
 * @param  {Array} attachments
 */
const Email = (to, subject, text, html, attachments) => ({
  from: process.env.GMAIL_EMAIL,
  to,
  subject,
  text,
  html,
  attachments,
});
module.exports = Email;
