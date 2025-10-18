/**
 * Simple Express server for the portfolio site.
 * - Serves static files from /public
 * - Provides /api/contact for sending email via Nodemailer
 * - Includes /api/health for a quick health check
 */
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'All fields are required.' });
    }
    console.log('📩 Contact request:', { name, email, subject, len: (message || '').length });

    // Configure transporter (SMTP env or Ethereal fallback)
    const hasSmtpEnv = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    let transporter;
    if (hasSmtpEnv) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    await transporter.verify();

    const toEmail = process.env.CONTACT_TO || process.env.SMTP_USER;
    const info = await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER || 'no-reply@example.com'}>`,
      replyTo: email,
      to: toEmail,
      subject: `New message from ${name}: ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space:pre-wrap;background:#f7f7f7;border:1px solid #eee;border-radius:8px;padding:12px">${message}</div>
        </div>
      `,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
    console.log('✉️  Sent message ID:', info.messageId, previewUrl ? `Preview: ${previewUrl}` : '');
    res.json({ ok: true, id: info.messageId, previewUrl });
  } catch (err) {
    console.error('❌ Contact error:', err);
    const safeMsg = process.env.NODE_ENV === 'production'
      ? 'Failed to send. Please try again later.'
      : (err && err.message ? err.message : 'Failed to send.');
    res.status(500).json({ ok: false, error: safeMsg });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server is running at http://localhost:${PORT}`);
  console.log(`📂 Serving files from: ${path.join(__dirname, 'public')}`);
});