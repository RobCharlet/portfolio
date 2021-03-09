const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const contactAdress = process.env.MAIL_CONTACT;

const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

app.post('/contact', function (req, res) {
  mailer.sendMail({
    from: req.body.from,
    to: contactAdress,
    subject: req.body.subject || '[No subject]',
    html: req.body.message || '[No message]',
  });
});

app.listen(3000);
