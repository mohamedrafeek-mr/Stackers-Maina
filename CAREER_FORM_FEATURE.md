# Career Application Form - Feature Documentation

## 🎯 Overview

The Stackers Mania website now includes a complete career application system with:
- ✅ Interactive application form modal
- 📁 CV/Resume file upload (PDF, Word documents)
- 📝 Cover letter support
- 📧 Automatic email notifications
- ✓ Confirmation emails to applicants

## 🚀 How It Works

### For Applicants:

1. **Navigate to Careers Section**
   - Click on any job position
   - Click "Apply Now" button

2. **Fill Application Form**
   - Full Name (required)
   - Email Address (required)
   - Position Applied For (required)
   - Upload CV/Resume (required)
     - Accepts: PDF, DOC, DOCX files
     - Max size: 5MB
   - Cover Letter (optional)

3. **Submit**
   - Click "Submit Application"
   - Form validates all required fields
   - Shows success message
   - Automatically closes after 3 seconds

4. **Receive Confirmation**
   - User receives auto-reply email immediately
   - Admin receives application at stackersmania@gmail.com
   - CV is attached to admin email

### For Admin:

**Emails Received At:** stackersmania@gmail.com

Each application email contains:
- Applicant's full information
- Position applied for
- Cover letter (if provided)
- CV file as attachment
- Application timestamp

## 📧 Email Templates

### 1. Admin Notification Email
**Subject:** `New Career Application - [Position] from [Name]`

Contains:
- Applicant details (name, email, position)
- Full cover letter text (if provided)
- CV file attachment
- Application submission date

### 2. Applicant Confirmation Email
**Subject:** `We received your application - Stackers Mania`

Contains:
- Thank you message
- Position details
- Application status
- Next steps in hiring process
- Expected timeline
- Contact information

## 🛠️ Technical Details

### Frontend Components
- **CareerApplicationForm.jsx** - Modal form component
  - File upload handling
  - Form validation
  - Base64 encoding for CV
  - Success/error messaging

- **Careers.jsx** - Updated careers page
  - Modal state management
  - Button handlers
  - Form integration

### Backend Endpoints

**POST /api/careers**

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Senior React Developer",
  "coverLetter": "I'm interested because...",
  "cv": "data:application/pdf;base64,JVBERi0x...",
  "cvFileName": "resume.pdf"
}
```

Response:
```json
{
  "success": true,
  "message": "Your application has been submitted successfully!"
}
```

## ✨ Features

### Form Validation
- ✓ Required field checking
- ✓ Email format validation
- ✓ File type validation (PDF, DOC, DOCX only)
- ✓ File size validation (max 5MB)
- ✓ User-friendly error messages

### File Upload
- ✓ Drag & drop support
- ✓ Click to upload
- ✓ File size display
- ✓ File type indicators
- ✓ Progress feedback

### User Experience
- ✓ Modal overlay
- ✓ Close button (✕)
- ✓ Cancel button
- ✓ Loading state during submission
- ✓ Success confirmation
- ✓ Auto-close after success
- ✓ Responsive design

### Email System
- ✓ Email to admin with all details
- ✓ Confirmation email to applicant
- ✓ CV attachment in admin email
- ✓ Professional HTML templates
- ✓ Error handling (emails still sent even if one fails)

## 🔧 Configuration

### Required Environment Variables (server/.env)

```env
EMAIL_USER=stackersmania@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
CAREERS_EMAIL=stackersmania@gmail.com
```

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed setup instructions.

## 📋 Files Modified/Created

### Created:
- `client/src/components/CareerApplicationForm.jsx` - Form modal component

### Modified:
- `client/src/pages/Careers.jsx` - Integrated form modal
- `server/server.js` - Enhanced career endpoint with email
- `server/package.json` - Added nodemailer
- `server/.env` - Email configuration

### Documentation:
- `EMAIL_SETUP.md` - Email configuration guide

## 🧪 Testing

### Test Application Submission:

1. Start both servers:
   ```bash
   # Terminal 1
   cd client && npm run dev
   
   # Terminal 2
   cd server && npm start
   ```

2. Open http://localhost:5173

3. Go to Careers section

4. Click "Apply Now" on any position

5. Fill in the form:
   - Name: Your Name
   - Email: your-test-email@gmail.com
   - Position: Any position
   - CV: Upload any PDF or Word file
   - Cover Letter: (optional)

6. Click "Submit Application"

7. Check your email for:
   - Confirmation at your email address
   - Application at stackersmania@gmail.com (if configured)

## 🎨 Styling

The form modal features:
- Dark theme matching site design
- Purple/green accent colors
- Glass morphism effect
- Smooth animations
- Responsive layout
- Mobile-friendly design

## ⚡ Performance

- Minimal file size (under 10KB)
- Efficient form submission
- Base64 encoding for file upload (max 5MB)
- No external dependencies required
- Works offline (form validation)

## 🔐 Security

- File type validation (whitelist: PDF, DOC, DOCX)
- File size limits (5MB max)
- Email validation
- CORS protection
- Input sanitization
- No files stored on server

## 📱 Browser Support

Tested and working on:
- ✓ Chrome/Chromium (latest)
- ✓ Firefox (latest)
- ✓ Safari (latest)
- ✓ Edge (latest)
- ✓ Mobile browsers

## 🚀 Future Enhancements

Potential improvements:
- Database storage of applications
- Admin dashboard to view applications
- Application status tracking for users
- File preview before upload
- Multiple file support
- Integration with ATS (Applicant Tracking System)
- SMS notifications
- Webhook notifications

---

**For any issues or questions, see [EMAIL_SETUP.md](./EMAIL_SETUP.md)**
