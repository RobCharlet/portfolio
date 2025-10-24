import axios from 'axios'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import csrf from 'csurf'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import validator from 'validator'

// Charger le bon fichier d'environnement selon l'environnement
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.SITE_URL 
      : 'http://localhost:8000',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(csrf({ cookie: true }))

const contactAddress = process.env.MAIL_CONTACT

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Mail server connection error:', error)
  } else {
    console.log('Mail server ready to send messages')
  }
})

// Verify reCAPTCHA token
const verifyRecaptcha = async (token: string): Promise<boolean> => {
  // En développement, on accepte toujours le token
  if (process.env.NODE_ENV !== 'production') {
    return true
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
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

// Generate CSRF token
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, mail, subject, text, recaptchaToken } = req.body

    // Validate required fields
    if (!name || !mail || !subject || !text || !recaptchaToken) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' })
    }

    // Sanitize inputs
    const sanitizedName = validator.escape(name)
    const sanitizedMail = validator.isEmail(mail) ? mail : '[Invalid email]'
    const sanitizedSubject = validator.escape(subject || '[No subject]')
    const sanitizedMessage = validator.escape(text || '[No message]')

    // Send email
    await transporter.sendMail({
      from: contactAddress,
      to: contactAddress,
      subject: `Nouveau message de ${sanitizedName} - ${sanitizedSubject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedMail}</p>
        <p><strong>Sujet:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    })

    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

