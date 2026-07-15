"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const validator_1 = __importDefault(require("validator"));
// Charger le bon fichier d'environnement selon l'environnement
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv_1.default.config({ path: envFile });
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.SITE_URL
        : 'http://localhost:8000',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, csurf_1.default)({ cookie: true }));
const contactAddress = process.env.MAIL_CONTACT;
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});
// Verify connection configuration
transporter.verify((error) => {
    if (error) {
        console.error('Mail server connection error:', error);
        console.error('Mail config:', {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            user: process.env.MAIL_USER,
            // Ne pas logger le mot de passe
        });
    }
    else {
        console.log('Mail server ready to send messages');
    }
});
// Verify reCAPTCHA token
const verifyRecaptcha = async (token) => {
    // En développement, on accepte toujours le token
    if (process.env.NODE_ENV !== 'production') {
        return true;
    }
    try {
        const params = new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
            response: token,
        });
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?${params}`, { method: 'POST' });
        if (!response.ok)
            return false;
        const data = await response.json();
        return !!data.success && (data.score ?? 0) >= 0.5;
    }
    catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return false;
    }
};
// Generate CSRF token
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// Contact form endpoint
app.post('/contact', async (req, res) => {
    try {
        console.log('Contact form submission:', {
            name: req.body.name,
            mail: req.body.mail,
            subject: req.body.subject,
            hasRecaptchaToken: !!req.body.recaptchaToken
        });
        const { name, mail, subject, text, recaptchaToken } = req.body;
        // Validate required fields
        if (!name || !mail || !subject || !text || !recaptchaToken) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Verify reCAPTCHA
        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
        // Sanitize inputs
        const sanitizedName = validator_1.default.escape(name);
        const sanitizedMail = validator_1.default.isEmail(mail) ? mail : '[Invalid email]';
        const sanitizedSubject = validator_1.default.escape(subject || '[No subject]');
        const sanitizedMessage = validator_1.default.escape(text || '[No message]');
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
        });
        console.log('Email sent successfully to:', contactAddress);
        return res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
