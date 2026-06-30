# 🚀 QUICK START - Career Form with Email

## What You Get

✅ Click "Apply Now" → Beautiful form opens
✅ Users enter details + upload CV
✅ Form validates automatically
✅ Submitted to stackersmania@gmail.com
✅ User gets auto-reply email

## Enable Emails in 3 Steps

### 1️⃣ Get Gmail App Password
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer"
- Click "Generate"
- Copy the 16-character password

### 2️⃣ Update server/.env
```
EMAIL_USER=stackersmania@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

### 3️⃣ Restart Backend
```bash
cd server
npm start
```

See: ✅ **Email service is ready**

## Test It

1. Open: http://localhost:5173
2. Go to: **Careers**
3. Click: **"Apply Now"**
4. Fill form + upload CV
5. Submit
6. Check email for confirmation!

## ✨ Features

- 📝 Professional form modal
- 📁 CV upload (PDF, Word)
- ✉️ Auto-reply emails
- 📧 CV sent to admin
- ✓ Form validation
- 📱 Mobile responsive

## 📧 Where Emails Go

**To Admin:** stackersmania@gmail.com
- Full applicant details
- Cover letter
- CV file attached

**To User:** Their email address
- Confirmation of receipt
- Next steps info
- Contact details

## Files Created

- `client/src/components/CareerApplicationForm.jsx` - Form modal
- `EMAIL_SETUP.md` - Detailed setup guide
- `CAREER_FORM_FEATURE.md` - Full documentation

## Need Help?

- **Email Setup Issues:** See EMAIL_SETUP.md
- **Feature Details:** See CAREER_FORM_FEATURE.md
- **Full Guide:** See SETUP_COMPLETE.md

---

**Status:**
- ✅ Frontend: Running
- ✅ Backend: Running  
- ⏳ Emails: Ready (needs Gmail password)

That's it! Everything is ready to go. 🎉
