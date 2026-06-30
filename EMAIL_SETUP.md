# Email Configuration Guide for Stackers Mania

This guide will help you set up email functionality for the Stackers Mania website.

## ✅ Email Features Enabled

Your backend now supports:
- ✉️ Career application submissions → sent to `stackersmania@gmail.com`
- ✉️ Contact form submissions → sent to your configured email
- ✅ Automatic confirmation emails to users
- 📎 CV/Resume file attachments in career applications

## 🔧 Setup Instructions

### Step 1: Create/Access Gmail Account
Use the email account where you want to receive applications and messages:
- `stackersmania@gmail.com` (or your preferred email)

### Step 2: Enable App Passwords
Gmail requires an "App Password" for SMTP connections.

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or your device type)
4. Click **Generate**
5. A 16-character password will appear
6. Copy this password (including spaces)

### Step 3: Configure `.env` File

Open `server/.env` and update:

```env
EMAIL_USER=stackersmania@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace `xxxx xxxx xxxx xxxx` with your actual 16-character app password.

### Step 4: Restart Backend Server

```bash
cd server
npm start
```

You should see:
```
✅ Email service is ready
```

If you see an error about "Invalid login", double-check:
- You used the correct 16-character app password (including spaces)
- Your Gmail account has 2FA enabled (required for app passwords)
- The password is copied exactly without extra spaces

## 📧 Email Testing

### Test 1: Contact Form
1. Go to http://localhost:5173
2. Scroll to Contact section
3. Fill the form and submit
4. Check your email for confirmation

### Test 2: Career Application
1. Go to Careers section
2. Click "Apply Now" on any position
3. Fill in details and attach a CV (PDF or Word doc)
4. Submit
5. Check your email for confirmation

## 📬 Email Templates

### Career Application Email (to admin)
- Applicant name, email, position
- Cover letter (if provided)
- CV file attachment
- Application date and time

### Career Application Confirmation (to applicant)
- Confirmation of receipt
- Position applied for
- Next steps in the hiring process
- Expected response time

### Contact Form Email (to admin)
- Full contact details
- Service interested in
- Message content
- Submission date/time

### Contact Form Confirmation (to user)
- Confirmation of receipt
- Response time expectations
- Company contact information
- Website link

## 🔒 Security Notes

- **Never commit** `.env` files with credentials to Git
- The `.gitignore` file already excludes `.env`
- App passwords are less secure than your main Gmail password
- You can revoke app passwords at any time in Gmail settings

## 🚀 Production Deployment

For production:

1. Create a dedicated Gmail account for notifications
2. Enable 2-factor authentication
3. Generate and securely store the app password
4. Use environment variables on your hosting platform (Heroku, Railway, etc.)
5. Example (Railway):
   ```
   EMAIL_USER = stackersmania@gmail.com
   GMAIL_APP_PASSWORD = your_app_password
   FRONTEND_URL = https://yourdomain.com
   ```

## 📞 Troubleshooting

### "Email service not fully configured" message
- This means `.env` values are not set
- Configure EMAIL_USER and GMAIL_APP_PASSWORD as shown above

### "Invalid login: Username and Password not accepted"
- Your app password might be incorrect
- Try generating a new one at: https://myaccount.google.com/apppasswords
- Make sure 2FA is enabled on your Gmail account

### "Email not being sent but no errors"
- Check your spam/junk folder
- Verify the recipient email is correct in your backend code
- Check server logs for any warnings

### Sent emails going to spam
- Gmail may flag automated emails as spam initially
- Mark them as "Not Spam" to improve deliverability
- For production, consider using SendGrid or similar service

## 📊 Alternative Email Services

If you want to use a different email provider:

1. **SendGrid** (Recommended for production)
   - Free tier available
   - Better deliverability
   - More advanced features

2. **AWS SES**
   - Enterprise-grade
   - Highest reliability
   - Pay-as-you-go

3. **Mailgun**
   - Developer-friendly
   - Good documentation
   - Free tier available

Contact support if you need help switching email services.

---

**Need Help?**
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Nodemailer Gmail Setup: https://nodemailer.com/smtp/gmail/
