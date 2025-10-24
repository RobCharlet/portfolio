import { Handler, HandlerEvent } from '@netlify/functions'

import axios from 'axios'
import nodemailer from 'nodemailer'
import validator from 'validator'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    )

    return response.data.success && response.data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    
    // Validate required fields
    if (!body.name || !body.mail || !body.subject || !body.text || !body.recaptchaToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      }
    }

    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(body.recaptchaToken)
    if (!isValidRecaptcha) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'reCAPTCHA verification failed' }),
      }
    }
    
    const name = validator.escape(body.name || '')
    const mail = validator.isEmail(body.mail) ? body.mail : '[Invalid email]'
    const subject = validator.escape(body.subject || '[No subject]')
    const message = validator.escape(body.text || '[No message]')

    // Send email
    await transporter.sendMail({
      from: process.env.MAIL_CONTACT,
      to: process.env.MAIL_CONTACT,
      subject: `Nouveau message de ${name} - ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${mail}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email' }),
    }
  }
}

export { handler }

