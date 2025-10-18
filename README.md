# Ancy Portfolio

A modern, animated personal portfolio built with HTML/CSS/JS and an Express backend for contact form email delivery.

## Features
- Dark blue–teal gradient theme with mint highlights
- Animated hero, skills, certificates, and education sections
- Contact form sends email via Nodemailer (/api/contact)

## Requirements
- Node.js 18+

## Getting Started
1. Install dependencies
```bash
npm install
```
2. Configure environment
Create a `.env` in the project root using `.env.sample`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=youraddress@gmail.com
```
3. Run locally
```bash
npm start
```
Visit http://localhost:3000

## Notes
- If SMTP variables are missing, the server uses an Ethereal test account and returns a `previewUrl` for debugging.
- Do not commit `.env`; it’s ignored by `.gitignore`.

## Deploy
- Set the same env vars on your host (Render, Railway, Fly.io, etc.).
- Optionally add rate limiting and reCAPTCHA before going public.
