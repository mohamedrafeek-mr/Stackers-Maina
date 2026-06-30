# Stackers Mania - Modern Business Website

A premium, modern business website for Stackers Mania - a web design and development company. Built with React/Vite for the frontend and Node.js/Express for the backend.

## 🚀 Features

### Frontend
- **Modern Landing Page** - Stunning hero section with animated counters
- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations** - Fade-in, slide-in, and floating animations
- **Dark Premium Theme** - Dark background with purple and green accents
- **Multiple Sections**:
  - Home - Hero section with statistics
  - Services - 6 service offerings with descriptions
  - Work - Portfolio showcase with project cards
  - About - Company information and values
  - Careers - Job listings and career opportunities
  - Contact - Contact form and company information

### Backend
- **Express API** - RESTful API for form submissions
- **Contact Form Handler** - Process and store contact requests
- **Career Applications** - Handle job application submissions
- **Email Notifications** - Send confirmation emails (optional with Nodemailer)
- **CORS Support** - Cross-origin request handling
- **Environment Configuration** - Secure configuration with .env

### Design
- **Color Palette**:
  - Primary Purple: `#7F77DD`
  - Primary Green: `#1D9E75`
  - Secondary Lavender: `#A79AF5`
  - Accent Mint: `#2DDBA0`
  - Highlight Orange: `#EF9F27`

## 📁 Project Structure

```
stackers-mania/
├── client/                 # React/Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer)
│   │   ├── pages/         # Page sections (Hero, Services, Work, etc.)
│   │   ├── styles/        # Global and component styles
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── server/                 # Node.js/Express backend
│   ├── server.js          # Main Express server
│   ├── emailService.js    # Email handling utilities
│   ├── .env.example       # Environment variables template
│   └── package.json       # Backend dependencies
├── .github/
│   └── copilot-instructions.md
├── .gitignore             # Git ignore rules
├── package.json           # Root package.json
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install:all

# Or manually:
npm install
cd client && npm install && cd ../server && npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `server` directory (copy from `.env.example`):

```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

### Step 3: Start the Development Servers

**Terminal 1 - Frontend (React/Vite):**
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

**Terminal 2 - Backend (Express):**
```bash
cd server
npm run dev
# Backend will run on http://localhost:5000
```

### Step 4: Open in Browser

Navigate to `http://localhost:5173` in your browser to view the website.

## 📝 Available Scripts

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (server/)
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

### Root
- `npm run dev:client` - Start frontend dev server
- `npm run dev:server` - Start backend dev server
- `npm run build:client` - Build frontend
- `npm run build:server` - Build backend (if applicable)
- `npm run install:all` - Install all dependencies

## 🔌 API Endpoints

### GET `/api/health`
Health check endpoint
```javascript
GET http://localhost:5000/api/health

// Response
{
  "status": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST `/api/contact`
Submit a contact form
```javascript
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corp",
  "service": "web-design",
  "message": "I'm interested in learning more about your services."
}

// Response
{
  "success": true,
  "message": "Your message has been received. We will get back to you soon!"
}
```

### POST `/api/careers`
Submit a career application
```javascript
POST http://localhost:5000/api/careers
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "position": "Senior React Developer",
  "resume": "...", // Base64 encoded resume file
  "coverLetter": "..."
}

// Response
{
  "success": true,
  "message": "Thank you for your application! We will review it and be in touch."
}
```

## 🎨 Component Overview

### Header
Navigation component with smooth scrolling to sections. Responsive mobile menu.

### Hero
Large hero section with:
- Main headline with gradient text
- Subtitle describing the company
- Call-to-action buttons
- Animated statistics counters
- Gradient background elements

### Services
6-card grid layout showcasing:
- Web Design
- Web Development
- E-Commerce Solutions
- Mobile-First Design
- SEO Optimization
- Maintenance & Support

### Work/Portfolio
6-project showcase with:
- Project thumbnails
- Category labels
- Project descriptions
- View project links

### About
Company information including:
- Company mission and vision
- Core values
- Statistics (projects completed, satisfaction rate, team size, etc.)

### Careers
Job listings with:
- Job title and department
- Employment type
- Job description
- Apply button
- Company benefits section

### Contact
Contact form with:
- Name, email, phone inputs
- Company field
- Service selection dropdown
- Message textarea
- Form validation
- Contact information cards

### Footer
Footer with:
- Company description
- Quick links
- Services list
- Contact information
- Social media links
- Copyright notice

## 🔐 Security Notes

- Never commit `.env` files with sensitive information
- Use environment variables for sensitive data
- CORS is configured to only accept requests from the frontend URL
- Input validation is implemented on form submissions
- Always validate and sanitize user input on the backend

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Upload dist/ folder to Vercel or Netlify
```

### Backend Deployment (Heroku/Railway/Render)
```bash
cd server
# Ensure all dependencies are in package.json
npm start
```

## 📧 Email Configuration (Optional)

To enable email notifications:

1. Install an email service (Gmail, SendGrid, etc.)
2. Add credentials to `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=stackersmania@gmail.com
   CAREERS_EMAIL=stackersmania@gmail.com
   ```
3. Uncomment email sending code in `server.js`

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a new branch for features
2. Follow the existing code style
3. Test your changes before submitting

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 📞 Support

For questions or support:
- Email: stackersmania@gmail.com
- Website: [Will be available after deployment]

---

Built with ❤️ by Stackers Mania
