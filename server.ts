import axios from 'axios'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import csrf from 'csurf'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import validator from 'validator'
import basicAuth from 'express-basic-auth'

// Charger le bon fichier d'environnement selon l'environnement
let envFile = '.env.development'
if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production'
} else if (process.env.NODE_ENV === 'preproduction') {
  envFile = '.env.preproduction'
}
dotenv.config({ path: envFile })

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.SITE_URL 
      : process.env.NODE_ENV === 'preproduction'
      ? process.env.PREPROD_URL || 'https://preprod.robincharlet.fr'
      : 'http://localhost:8000',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(csrf({ cookie: true }))

// Basic Auth pour la préproduction
const isPreprod = process.env.NODE_ENV === 'preproduction'
if (isPreprod) {
  const preprodUsers = {
    [process.env.PREPROD_USER || 'admin']: process.env.PREPROD_PASSWORD || 'admin123'
  }
  
  app.use(basicAuth({
    users: preprodUsers,
    challenge: true,
    realm: 'Préproduction - Accès restreint'
  }))
  
  console.log('🔒 Préproduction protégée par mot de passe')
}

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
    console.error('Mail config:', {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      // Ne pas logger le mot de passe
    })
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
    console.log('Contact form submission:', {
      name: req.body.name,
      mail: req.body.mail,
      subject: req.body.subject,
      hasRecaptchaToken: !!req.body.recaptchaToken
    })
    
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

    console.log('Email sent successfully to:', contactAddress)
    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})

// Route de statut pour vérifier l'environnement
app.get('/status', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    protected: isPreprod,
    timestamp: new Date().toISOString()
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
  if (isPreprod) {
    console.log('🔒 Préproduction protégée par authentification basique')
  }
})

