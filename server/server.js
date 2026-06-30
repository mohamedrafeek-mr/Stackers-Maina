import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'stackersmania@gmail.com',
    pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
  }
})

// Configure SendGrid if API key provided (used as fallback when SMTP times out)
if (process.env.SENDGRID_API_KEY) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log('✅ SendGrid configured')
  } catch (err) {
    console.warn('⚠️  Could not configure SendGrid:', err.message)
  }
}

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.warn('⚠️  Email service not fully configured:', error.message)
    console.log('ℹ️  To enable email sending, configure EMAIL_USER and EMAIL_PASSWORD in .env')
  } else {
    console.log('✅ Email service is ready')
  }
})

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://stackers-maina.vercel.app',
  'https://www.stackers-maina.vercel.app'
].filter(Boolean)

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /https:\/\/.*\.vercel\.app$/.test(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS not allowed for this origin'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date().toISOString() })
})

// Test email endpoint (for debugging)
app.get('/api/test-email', async (req, res) => {
  try {
    const testEmail = {
      from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      to: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      subject: '✅ TEST EMAIL - Stackers Mania Email System Working!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #7F77DD;">✅ Email System Test Successful!</h2>
          
          <p>This is a test email to verify that your email configuration is working correctly.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email Configuration:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Email Service: Gmail SMTP</li>
              <li>Status: ✅ Connected and working</li>
              <li>Test Time: ${new Date().toLocaleString()}</li>
              <li>From: ${process.env.EMAIL_USER}</li>
            </ul>
          </div>

          <p style="color: #666; margin-top: 30px;">
            If you received this email, your Stackers Mania website email system is working correctly!
          </p>

          <p style="color: #666; margin-top: 30px;">
            You can now test:
          </p>
          <ol style="padding-left: 20px;">
            <li>Submit a contact form at: http://localhost:5173/#contact</li>
            <li>Apply for a career position at: http://localhost:5173/#careers</li>
          </ol>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This is an automated test email from Stackers Mania.<br>
            <strong>Setup Time:</strong> ${new Date().toISOString()}
          </p>
        </div>
      `
    }

    try {
      await transporter.sendMail(testEmail)
      console.log('✅ Test email sent via SMTP')
      res.json({
        success: true,
        message: 'Test email sent successfully via SMTP! Check your inbox.',
        email: process.env.EMAIL_USER
      })
      return
    } catch (smtpErr) {
      console.warn('⚠️  SMTP test-email failed:', smtpErr.message)
      if (process.env.SENDGRID_API_KEY) {
        try {
          await sgMail.send({
            to: process.env.EMAIL_USER || 'stackersmania@gmail.com',
            from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
            subject: testEmail.subject,
            html: testEmail.html
          })
          console.log('✅ Test email sent via SendGrid')
          res.json({
            success: true,
            message: 'Test email sent successfully via SendGrid! Check your inbox.',
            email: process.env.EMAIL_USER
          })
          return
        } catch (sgErr) {
          console.error('Test email SendGrid error:', sgErr)
          res.status(500).json({
            success: false,
            message: 'Failed to send test email via SendGrid',
            error: sgErr.message
          })
          return
        }
      }
      res.status(500).json({
        success: false,
        message: 'Failed to send test email via SMTP',
        error: smtpErr.message,
        hint: 'Set SENDGRID_API_KEY in environment for API fallback'
      })
      return
    }
  } catch (error) {
    console.error('Test email error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message,
      hint: 'Check that your GMAIL_APP_PASSWORD is set correctly in server/.env'
    })
  }
})

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      })
    }

    console.log('Contact form submission:', {
      name,
      email,
      company,
      service,
      timestamp: new Date().toISOString()
    })

    // Send email to admin
    const mailToAdmin = {
      from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      to: process.env.CONTACT_EMAIL || 'stackersmania@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #7F77DD;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <h3>Message:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #7F77DD; border-radius: 4px;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated email from your contact form system.</p>
        </div>
      `
    }

    // Send confirmation email to user
    const mailToUser = {
      from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      to: email,
      subject: 'We received your message - Stackers Mania',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #7F77DD;">Thank You for Getting in Touch!</h2>
          
          <p>Hi <strong>${name}</strong>,</p>
          
          <p>We've received your message and appreciate you reaching out to Stackers Mania. Our team will review your inquiry and get back to you as soon as possible.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Message Details:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Received: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</li>
              <li>Status: Pending Review</li>
              <li>Response Time: Usually within 24 business hours</li>
            </ul>
          </div>

          <h3>What Happens Next?</h3>
          <p>Our team will:</p>
          <ol style="padding-left: 20px;">
            <li>Review your inquiry and requirements</li>
            <li>Assess the best solution for your needs</li>
            <li>Contact you to discuss your project in detail</li>
            <li>Provide a customized proposal and timeline</li>
          </ol>

          <p style="margin-top: 30px; color: #666;">
            If you need immediate assistance, you can also contact us directly at <a href="mailto:stackersmania@gmail.com">stackersmania@gmail.com</a>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Best regards,<br>
            <strong>Stackers Mania Team</strong>
          </p>
          
          <div style="background: linear-gradient(135deg, #7F77DD, #2DDBA0); color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <p style="margin: 0;">Visit our website: <a href="http://localhost:5173" style="color: white; text-decoration: none;">stackersmania.com</a></p>
          </div>
        </div>
      `
    }

    // Send admin email (try SMTP, fallback to SendGrid)
    try {
      await transporter.sendMail(mailToAdmin)
      console.log('✅ Contact email sent to admin via SMTP')
    } catch (emailError) {
      console.warn('⚠️  Could not send admin email via SMTP:', emailError.message)
      if (process.env.SENDGRID_API_KEY) {
        try {
          await sgMail.send({
            to: mailToAdmin.to,
            from: mailToAdmin.from,
            subject: mailToAdmin.subject,
            html: mailToAdmin.html
          })
          console.log('✅ Contact email sent to admin via SendGrid')
        } catch (sgError) {
          console.warn('⚠️  Could not send admin email via SendGrid:', sgError.message)
        }
      }
    }

    // Send confirmation email to user (try SMTP, fallback to SendGrid)
    try {
      await transporter.sendMail(mailToUser)
      console.log('✅ Confirmation email sent to user via SMTP')
    } catch (emailError) {
      console.warn('⚠️  Could not send confirmation email via SMTP:', emailError.message)
      if (process.env.SENDGRID_API_KEY) {
        try {
          await sgMail.send({
            to: mailToUser.to,
            from: mailToUser.from,
            subject: mailToUser.subject,
            html: mailToUser.html
          })
          console.log('✅ Confirmation email sent to user via SendGrid')
        } catch (sgError) {
          console.warn('⚠️  Could not send confirmation email via SendGrid:', sgError.message)
        }
      }
    }

    res.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!'
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    })
  }
})

// Career applications
app.post('/api/careers', async (req, res) => {
  try {
    const { name, email, position, coverLetter, cv, cvFileName } = req.body

    if (!name || !email || !position) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and position are required'
      })
    }

    console.log('Career application received:', {
      name,
      email,
      position,
      timestamp: new Date().toISOString()
    })

    // Send email to stackersmania@gmail.com
    const mailToAdmin = {
      from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      to: 'stackersmania@gmail.com',
      subject: `New Career Application - ${position} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #7F77DD;">New Career Application</h2>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          ${coverLetter ? `
            <h3>Cover Letter:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #7F77DD; border-radius: 4px;">
              <p>${coverLetter.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}

          ${cv ? `
            <p><strong>CV/Resume:</strong> Attached as ${cvFileName}</p>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated email from your career application system.</p>
        </div>
      `,
      attachments: cv ? [{
        filename: cvFileName,
        content: cv.split(',')[1],
        encoding: 'base64'
      }] : []
    }

    // Send confirmation email to applicant
    const mailToApplicant = {
      from: process.env.EMAIL_USER || 'stackersmania@gmail.com',
      to: email,
      subject: 'We received your application - Stackers Mania',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #7F77DD;">Thank You for Applying!</h2>
          
          <p>Hi <strong>${name}</strong>,</p>
          
          <p>We've received your application for the <strong>${position}</strong> position and we're excited to review it!</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Application Details:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Position: ${position}</li>
              <li>Submitted: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</li>
              <li>Status: Under Review</li>
            </ul>
          </div>

          <p>Our recruitment team will carefully review your CV and cover letter. If your qualifications match our requirements, we'll contact you shortly to discuss the next steps.</p>

          <h3>What Happens Next?</h3>
          <ol style="padding-left: 20px;">
            <li>Initial screening of your application (1-3 business days)</li>
            <li>Phone interview with our HR team (if selected)</li>
            <li>Technical assessment or interview (if applicable)</li>
            <li>Final round interviews</li>
            <li>Offer and onboarding</li>
          </ol>

          <p style="margin-top: 30px; color: #666;">
            In the meantime, if you have any questions, feel free to reach out to us at <a href="mailto:stackersmania@gmail.com">stackersmania@gmail.com</a>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Best regards,<br>
            <strong>Stackers Mania Recruitment Team</strong>
          </p>
          
          <div style="background: linear-gradient(135deg, #7F77DD, #2DDBA0); color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <p style="margin: 0;">Visit our website: <a href="http://localhost:5173" style="color: white; text-decoration: none;">stackersmania.com</a></p>
          </div>
        </div>
      `
    }

    // Send admin email (try SMTP, fallback to SendGrid)
    try {
      await transporter.sendMail(mailToAdmin)
      console.log('✅ Application email sent to admin via SMTP')
    } catch (emailError) {
      console.warn('⚠️  Could not send admin email via SMTP:', emailError.message)
      if (process.env.SENDGRID_API_KEY) {
        try {
          const sgMsg = {
            to: mailToAdmin.to,
            from: mailToAdmin.from,
            subject: mailToAdmin.subject,
            html: mailToAdmin.html,
            attachments: mailToAdmin.attachments && mailToAdmin.attachments.length ? mailToAdmin.attachments.map(a => ({
              content: a.content,
              filename: a.filename,
              type: 'application/octet-stream',
              disposition: 'attachment'
            })) : undefined
          }
          await sgMail.send(sgMsg)
          console.log('✅ Application email sent to admin via SendGrid')
        } catch (sgError) {
          console.warn('⚠️  Could not send admin email via SendGrid:', sgError.message)
        }
      }
    }

    // Send confirmation email to applicant (try SMTP, fallback to SendGrid)
    try {
      await transporter.sendMail(mailToApplicant)
      console.log('✅ Confirmation email sent to applicant via SMTP')
    } catch (emailError) {
      console.warn('⚠️  Could not send confirmation email via SMTP:', emailError.message)
      if (process.env.SENDGRID_API_KEY) {
        try {
          await sgMail.send({
            to: mailToApplicant.to,
            from: mailToApplicant.from,
            subject: mailToApplicant.subject,
            html: mailToApplicant.html
          })
          console.log('✅ Confirmation email sent to applicant via SendGrid')
        } catch (sgError) {
          console.warn('⚠️  Could not send confirmation email via SendGrid:', sgError.message)
        }
      }
    }

    res.json({
      success: true,
      message: 'Your application has been submitted successfully! You will receive a confirmation email shortly.'
    })
  } catch (error) {
    console.error('Error processing career application:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your application'
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📨 Contact form available at POST /api/contact`)
  console.log(`💼 Career applications available at POST /api/careers`)
})
