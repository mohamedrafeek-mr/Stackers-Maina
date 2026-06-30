import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Send contact form email
export const sendContactEmail = async (contactData) => {
  const { name, email, company, service, message } = contactData

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL || 'stackersmania@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Service Interested:</strong> ${service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  }

  // Send confirmation email to user
  const confirmationOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We received your message - Stackers Mania',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>The Stackers Mania Team</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(confirmationOptions)
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

// Send career application email
export const sendCareerEmail = async (applicationData) => {
  const { name, email, position } = applicationData

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CAREERS_EMAIL || 'stackersmania@gmail.com',
    subject: `New Career Application - ${position}`,
    html: `
      <h2>New Career Application</h2>
      <p><strong>Position:</strong> ${position}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  }

  const confirmationOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Career Application Received - Stackers Mania',
    html: `
      <h2>Thank you for applying!</h2>
      <p>Hi ${name},</p>
      <p>We've received your application for the ${position} position and will review it shortly.</p>
      <p>Best regards,<br>The Stackers Mania Team</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(confirmationOptions)
    return { success: true, message: 'Application email sent' }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
