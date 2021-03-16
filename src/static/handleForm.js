require('dotenv').config({ path: '../../.env.production' });
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const contactAdress = 'robin.charlet@laposte.net';

console.log(
  process.env.MAIL_USER,
  process.env.MAIL_HOST,
  process.env.MAIL_PORT,
  process.env.MAIL_USER,
  process.env.MAIL_PASSWORD,
);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.post('/contact', function (req, res) {
  var name = req.body.name;
  var email = req.body.mail || '[No subject]';
  var subject = req.body.subject || '[No subject]';
  var message = req.body.text || '[No message]';
  var content = `name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `;
  var mail = {
    from: email,
    to: contactAdress,
    subject: subject,
    text: content,
  };

  console.log(mail);

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
});

app.listen(3000);
