require('dotenv').config({ path: '../../.env.production' });
const express = require('express');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const contactAdress = process.env.MAIL_CONTACT;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
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

app.get('/contact', (req, res) => {
  console.log(req);
});

app.post('/contact', function (req, res) {
  var name = req.body.name;
  var mail = req.body.mail || '[No subject]';
  var subject = req.body.subject || '[No subject]';
  var message = req.body.text || '[No message]';

  const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
  });

  email
    .send({
      template: 'robin',
      message: {
        from: contactAdress,
        to: contactAdress,
      },
      locals: {
        name: name,
        mail: mail,
        subject: subject,
        message: message,
      },
    })
    .then(
      res.json({
        status: 'success',
      }),
    )
    .catch(
      res.json({
        status: 'fail',
      }),
    );
});

app.listen(3000);
