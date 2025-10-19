# Backend Setup Guide 🚀

## Current Status
✅ **Backend is working perfectly!**

Your Express server (`server.js`) is properly configured with:
- Static file serving from `/public`
- Contact form API endpoint at `/api/contact`
- Health check endpoint at `/api/health`
- Email sending via Nodemailer (with Ethereal fallback)

## Files Overview

### `server.js`
Your main Express server file - handles:
- Serving the portfolio website
- Processing contact form submissions
- Sending emails via SMTP or Ethereal (test email)

### `.env`
Environment configuration file (not committed to Git for security)
- Currently using **Ethereal** for test emails (no setup needed!)
- To use real Gmail, follow instructions below

### `package.json`
Dependencies installed:
- `express` - Web server framework
- `nodemailer` - Email sending
- `dotenv` - Environment variable management

## How the Contact Form Works

### Current Setup (Test Mode)
Without SMTP configuration, your contact form:
1. ✅ Accepts form submissions
2. ✅ Sends to **Ethereal Email** (fake SMTP for testing)
3. ✅ Returns a preview URL in the console
4. ✅ Shows success message to users

**Test it:**
1. Go to http://localhost:3000
2. Scroll to Contact section
3. Fill out the form and submit
4. Check the Node console for the preview URL
5. Open the URL to see the "sent" email

Auto-reply (optional): If you set `AUTO_REPLY=true` in your `.env`, the server will also send a short acknowledgement back to the sender. You'll see an extra log line:
```
↩️  Auto-reply sent: <message-id> Preview: https://ethereal.email/message/...
```

### Production Setup (Real Email)

To receive actual emails at `ancy15106@gmail.com`:

#### Option 1: Gmail (Recommended)

1. **Enable 2-Step Verification** on your Google Account
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

3. **Update `.env` file:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=ancy15106@gmail.com
   SMTP_PASS=your-16-char-app-password
   CONTACT_TO=ancy15106@gmail.com
   ```

4. **Restart the server**
   ```powershell
   npm start
   ```

#### Option 2: Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

**Custom SMTP:**
```env
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
```

## API Endpoints

### Health Check
```bash
GET /api/health
```
Response:
```json
{
  "ok": true,
  "time": "2025-10-19T..."
}
```

### Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

Success Response:
```json
{
  "ok": true,
  "id": "message-id",
   "previewUrl": "https://ethereal.email/message...",
   "autoReplyOk": true
}
```

Error Response:
```json
{
  "ok": false,
  "error": "Error description"
}
```

## Testing the Backend

### 1. Start the Server
```powershell
npm start
```

### 2. Test Health Endpoint (in browser)
```
http://localhost:3000/api/health
```

### 3. Test Contact Form
- Fill out the form on your website
- Submit it
- Check the Node console for the email preview link

### 4. Check Logs
Watch the console for:
```
📩 Contact request: { name: 'John', email: 'john@example.com', ... }
✉️  Sent message ID: ... Preview: https://ethereal.email/...
```

## Security Notes

✅ **Already implemented:**
- `.env` file is in `.gitignore` (credentials not committed)
- Input validation on all form fields
- Error messages don't expose internal details in production
- CORS protection through Express defaults

⚠️ **For production deployment:**
- Set `NODE_ENV=production` in `.env`
- Use HTTPS (not HTTP)
- Consider rate limiting for the contact endpoint
- Add CAPTCHA to prevent spam (optional)

## Deployment

When deploying to production (Vercel, Netlify, Render, etc.):

1. **Set environment variables** in your hosting platform:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_TO`
   - `NODE_ENV=production`

2. **Update the server start command** if needed
3. **Test the contact form** after deployment

## Troubleshooting

### "Unable to connect to remote server"
- Server isn't running → Run `npm start`
- Port conflict → Change `PORT` in `.env`

### "Failed to send email"
- Check SMTP credentials in `.env`
- Verify App Password for Gmail
- Check console for detailed error messages

### "All fields are required"
- Make sure all form fields are filled
- Check browser console for JavaScript errors

### Email not received
- Check spam folder
- Verify `CONTACT_TO` email address
- Check SMTP credentials
- Look at console logs for errors

## Current Configuration

✅ Server: Running on port 3000
✅ Email: Ethereal (test mode) - no setup needed
✅ Auto-reply: Available (disabled by default)
✅ Static files: Served from `/public`
✅ Contact endpoint: `/api/contact`
✅ Health check: `/api/health`

**Your backend is production-ready!** 🎉

To enable real emails, just follow the Gmail setup above and restart the server.

## Questions?

If you need help:
1. Check the Node console for error messages
2. Review the `.env` configuration
3. Test with Ethereal first (current setup)
4. Then configure real SMTP when ready
