const moment = require('moment');
const joi = require('../tools/joi');
const { sendEmail } = require('../tools/gmail-nodemailer');
const { Email } = require('../tools/gmail-nodemailer');
const { createCsv } = require('../tools/csv');
require('dotenv').config();

const actionDatabase = require('../database/action');

const sendCsvEmail = async () => {
  const actions = await actionDatabase.getAllActions({});
  const response = actions
    .map((e) => {
      const action = {
        action: e.action,
        date: moment(e.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        web: e.web,
        email: e.email,
      };
      return action;
    });
  const mailOptions = Email(
    'flippitco@gmail.com',
    'Lista de acciones de flippit',
    '',
    '',
    [
      {
        filename: 'flippitActionList.csv',
        content: createCsv(['action', 'date', 'web', 'email'], response),
      },
    ],
  );
  await sendEmail(mailOptions);
};

const createAction = async (object) => {
  const checkedActionObject = joi.action.actionValidate(object);
  const { action, web, email } = checkedActionObject;
  const response = await actionDatabase.createAction({ action, web, email });
  await sendCsvEmail();
  return response.toObject();
};

module.exports = {
  createAction,
};
