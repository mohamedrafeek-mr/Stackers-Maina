import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

const NAV_LINKS = ["Home", "Services", "Work", "About", "Contact"];

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Design",
    desc: "Pixel-perfect, responsive designs that captivate visitors and reflect your brand identity.",
    color: "#7F77DD",
  },
  {
    icon: "⚙️",
    title: "Web Development",
    desc: "Full-stack development using React, Django, and modern technologies built to scale.",
    color: "#1D9E75",
  },
  {
    icon: "🛒",
    title: "E-Commerce",
    desc: "Powerful online stores with seamless checkout, payment gateways, and inventory management.",
    color: "#A79AF5",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Blazing fast, mobile-optimized websites that rank higher and convert better.",
    color: "#2DDBA0",
  },
  {
    icon: "🔍",
    title: "SEO Optimization",
    desc: "Technical SEO, performance tuning, and content strategies to put you on top of Google.",
    color: "#7F77DD",
  },
  {
    icon: "🛡️",
    title: "Maintenance & Support",
    desc: "Ongoing support, security patches, and updates so your website never skips a beat.",
    color: "#1D9E75",
  },
];

const PORTFOLIO = [];

/*
const PORTFOLIO = [
  { title: "UrbanEats", cat: "Food & Restaurant", bg: "#1a1550", accent: "#7F77DD" },
  { title: "NovaTech", cat: "SaaS Platform", bg: "#0A2E24", accent: "#1D9E75" },
  { title: "LuxeStore", cat: "E-Commerce", bg: "#2A0D2A", accent: "#A79AF5" },
  { title: "BuildPro", cat: "Construction", bg: "#1a1550", accent: "#2DDBA0" },
  { title: "MindSpace", cat: "Health & Wellness", bg: "#0A2E24", accent: "#7F77DD" },
  { title: "SwiftLog", cat: "Logistics", bg: "#2A1A0A", accent: "#EF9F27" },
];
*/

const STATS = [
  { val: "1+", label: "Projects Delivered" },
  { val: "1+", label: "Happy Clients" },
  { val: "1+", label: "Years Experience" },
  { val: "100%", label: "Client Satisfaction" },
];

const TEAM = [
  { name: "Mohamed Rafeek M.", role: "Founder & Lead Dev", init: "MR", color: "#7F77DD" },
  { name: "Saran B.", role: "Business Development", init: "SB", color: "#1D9E75" },
  // { name: "Karan M.", role: "Full Stack Dev", init: "KM", color: "#A79AF5" },
];

const TESTIMONIALS = [];

/*
const TESTIMONIALS = [
  {
    quote: "Stackers Mania delivered beyond expectations. Our sales doubled after the revamp!",
    name: "Ravi Kumar",
    company: "UrbanEats",
    init: "RK",
    color: "#7F77DD",
  },
  {
    quote: "Fast, professional, and incredibly talented team. Will definitely work with them again.",
    name: "Meera Nair",
    company: "NovaTech",
    init: "MN",
    color: "#1D9E75",
  },
  {
    quote: "They understood our vision perfectly and built something truly stunning.",
    name: "Anil Shah",
    company: "LuxeStore",
    init: "AS",
    color: "#A79AF5",
  },
];
*/

// --- Animated counter ---
function Counter({ val }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(val);
  const suffix = val.replace(/[0-9]/g, "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = Math.ceil(num / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Floating code particles ---
function CodeParticles() {
  const snippets = ["</>", "{}", "[]", "=>", "fn()", "API", "CSS", "GET", "JSX", "npm"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {snippets.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${8 + i * 9}%`,
            top: `${10 + ((i * 17) % 70)}%`,
            fontFamily: "'Courier New', monospace",
            fontSize: i % 3 === 0 ? "13px" : "11px",
            color: i % 2 === 0 ? "#7F77DD" : "#1D9E75",
            opacity: 0.18,
            animation: `floatUp ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

export default function StackersMania() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /*
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);
  */

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      emailjs.send(
        'service_4on7zew', // Replace with your EmailJS service ID
        'template_bum3fko', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'rafirafibai@gmail.com'
        },
        'xN1NRzzCrrsVzHBlq' // Replace with your EmailJS public key
      ).then((result) => {
        console.log(result.text);
        setSubmitted(true);
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again.');
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const styles = {
    root: {
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      background: "#080720",
      color: "#fff",
      minHeight: "100vh",
      overflowX: "hidden",
    },

    // NAV
    nav: {
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrollY > 60 ? "rgba(8,7,32,0.97)" : "transparent",
      borderBottom: scrollY > 60 ? "1px solid rgba(127,119,221,0.15)" : "none",
      transition: "all 0.3s",
      padding: "0 5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 70,
      backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
    },
    navLogo: {
      display: "flex", alignItems: "center", gap: 10,
      cursor: "pointer",
    },
    logoIcon: {
      width: 38, height: 38,
      background: "linear-gradient(135deg, #7F77DD, #1D9E75)",
      borderRadius: 8,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 3, padding: "7px 6px",
    },
    logoBar: (w, c) => ({ width: w, height: 4, background: c, borderRadius: 2 }),
    logoText: {
      fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px",
      background: "linear-gradient(90deg, #A79AF5, #2DDBA0)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    },
    navLinks: { display: "flex", gap: 32 },
    navLink: (active) => ({
      color: active ? "#A79AF5" : "rgba(255,255,255,0.65)",
      fontWeight: active ? 600 : 400,
      fontSize: 15,
      cursor: "pointer",
      transition: "color 0.2s",
      borderBottom: active ? "2px solid #7F77DD" : "2px solid transparent",
      paddingBottom: 2,
    }),
    navCta: {
      background: "linear-gradient(135deg, #7F77DD, #1D9E75)",
      color: "#fff", fontWeight: 700, fontSize: 14,
      padding: "10px 22px", borderRadius: 8,
      cursor: "pointer", border: "none",
      boxShadow: "0 4px 20px rgba(127,119,221,0.4)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },

    // HERO
    hero: {
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "120px 5% 80px",
      position: "relative",
      overflow: "hidden",
    },
    heroGlow1: {
      position: "absolute", width: 500, height: 500,
      background: "radial-gradient(circle, rgba(127,119,221,0.18) 0%, transparent 70%)",
      top: "10%", left: "-5%", pointerEvents: "none",
    },
    heroGlow2: {
      position: "absolute", width: 400, height: 400,
      background: "radial-gradient(circle, rgba(29,158,117,0.15) 0%, transparent 70%)",
      bottom: "10%", right: "5%", pointerEvents: "none",
    },
    heroGrid: {
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 60, alignItems: "center", width: "100%", position: "relative", zIndex: 2,
    },
    heroBadge: {
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(127,119,221,0.12)",
      border: "1px solid rgba(127,119,221,0.3)",
      borderRadius: 100, padding: "6px 16px",
      fontSize: 13, color: "#A79AF5", marginBottom: 24,
      width: "fit-content",
    },
    dot: {
      width: 8, height: 8, borderRadius: "50%",
      background: "#2DDBA0",
      animation: "pulse 2s ease-in-out infinite",
    },
    heroH1: {
      fontSize: "clamp(36px, 4.5vw, 64px)",
      fontWeight: 900, lineHeight: 1.08,
      margin: "0 0 20px",
      letterSpacing: "-2px",
    },
    heroGrad: {
      background: "linear-gradient(90deg, #A79AF5 0%, #2DDBA0 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      display: "block",
    },
    heroSub: {
      fontSize: 17, color: "rgba(255,255,255,0.6)",
      lineHeight: 1.7, marginBottom: 36, maxWidth: 480,
    },
    heroBtns: { display: "flex", gap: 16, flexWrap: "wrap" },
    btnPrimary: {
      background: "linear-gradient(135deg, #7F77DD, #1D9E75)",
      color: "#fff", fontWeight: 700, fontSize: 15,
      padding: "14px 32px", borderRadius: 10,
      cursor: "pointer", border: "none",
      boxShadow: "0 6px 30px rgba(127,119,221,0.45)",
      transition: "transform 0.2s",
    },
    btnOutline: {
      background: "transparent",
      color: "#A79AF5", fontWeight: 600, fontSize: 15,
      padding: "13px 30px", borderRadius: 10,
      cursor: "pointer",
      border: "1px solid rgba(127,119,221,0.5)",
      transition: "background 0.2s, border-color 0.2s",
    },

    // Hero Visual (right side) — code mockup card
    heroCard: {
      background: "linear-gradient(135deg, rgba(127,119,221,0.1), rgba(29,158,117,0.08))",
      border: "1px solid rgba(127,119,221,0.2)",
      borderRadius: 20,
      padding: 28,
      backdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden",
    },
    cardHeader: {
      display: "flex", gap: 7, marginBottom: 18,
    },
    dot3: (c) => ({ width: 12, height: 12, borderRadius: "50%", background: c }),
    codeLine: (indent, color, width) => ({
      height: 10, borderRadius: 5, marginBottom: 10,
      background: color,
      width: width,
      marginLeft: indent,
      opacity: 0.7,
    }),

    // SECTION commons
    section: (bg) => ({
      padding: "100px 5%",
      background: bg || "transparent",
      position: "relative",
    }),
    sectionTag: {
      display: "inline-block",
      background: "rgba(127,119,221,0.12)",
      border: "1px solid rgba(127,119,221,0.25)",
      color: "#A79AF5", fontSize: 12,
      fontWeight: 600, letterSpacing: 2,
      padding: "5px 14px", borderRadius: 100,
      textTransform: "uppercase", marginBottom: 14,
    },
    sectionH2: {
      fontSize: "clamp(28px, 3.5vw, 48px)",
      fontWeight: 900, margin: "0 0 14px",
      letterSpacing: "-1px",
    },
    sectionSub: {
      color: "rgba(255,255,255,0.55)", fontSize: 16,
      maxWidth: 520, lineHeight: 1.7, margin: "0 0 56px",
    },

    // SERVICES
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 24,
    },
    serviceCard: (color) => ({
      background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderRadius: 16,
      padding: "28px 24px",
      transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
      cursor: "default",
      borderTop: `3px solid ${color}`,
    }),
    serviceIcon: {
      fontSize: 32, marginBottom: 16,
    },
    serviceTitle: {
      fontWeight: 700, fontSize: 18, marginBottom: 10,
    },
    serviceDesc: {
      color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7,
    },

    // STATS
    statsBar: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 2,
      background: "rgba(127,119,221,0.08)",
      border: "1px solid rgba(127,119,221,0.15)",
      borderRadius: 16,
      overflow: "hidden",
      margin: "80px 5%",
    },
    statItem: {
      padding: "36px 24px", textAlign: "center",
      borderRight: "1px solid rgba(127,119,221,0.1)",
    },
    statVal: {
      fontSize: 44, fontWeight: 900,
      background: "linear-gradient(90deg, #A79AF5, #2DDBA0)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    },
    statLabel: {
      color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4,
    },

    // PORTFOLIO
    portfolioGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 20,
    },
    portfolioCard: (bg) => ({
      background: bg,
      borderRadius: 16,
      padding: "40px 28px",
      border: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
      position: "relative",
      transition: "transform 0.25s",
      cursor: "pointer",
    }),
    portfolioAccent: (color) => ({
      position: "absolute", top: 0, left: 0, right: 0, height: 3,
      background: `linear-gradient(90deg, ${color}, transparent)`,
    }),
    portfolioNum: (color) => ({
      fontSize: 48, fontWeight: 900, opacity: 0.08,
      position: "absolute", top: 16, right: 20,
      color: color, lineHeight: 1,
    }),
    portfolioTitle: {
      fontWeight: 800, fontSize: 22, marginBottom: 6,
    },
    portfolioCat: {
      color: "rgba(255,255,255,0.45)", fontSize: 13,
    },
    portfolioTag: (color) => ({
      display: "inline-block",
      background: `${color}22`,
      color: color,
      fontSize: 11, fontWeight: 600, letterSpacing: 1,
      padding: "4px 10px", borderRadius: 100,
      marginTop: 20,
      border: `1px solid ${color}44`,
    }),

    // ABOUT
    aboutGrid: {
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80, alignItems: "center",
    },
    teamGrid: {
      display: "flex", gap: 20, flexWrap: "wrap", marginTop: 32,
    },
    teamCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: "18px 20px",
      display: "flex", alignItems: "center", gap: 14,
      flex: "1 1 180px",
    },
    teamAvatar: (color) => ({
      width: 46, height: 46, borderRadius: "50%",
      background: `${color}33`,
      border: `2px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: 14, color: color,
      flexShrink: 0,
    }),
    techStack: {
      display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28,
    },
    techPill: (color) => ({
      background: `${color}15`,
      border: `1px solid ${color}30`,
      color: color, fontSize: 12, fontWeight: 600,
      padding: "5px 14px", borderRadius: 100,
    }),

    // TESTIMONIALS
    testimonialCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(127,119,221,0.2)",
      borderRadius: 20, padding: "36px 40px",
      maxWidth: 640, margin: "0 auto",
      position: "relative",
      textAlign: "center",
      minHeight: 220,
    },
    quote: {
      fontSize: 56, color: "#7F77DD", opacity: 0.3,
      position: "absolute", top: 10, left: 24,
      lineHeight: 1, fontFamily: "Georgia, serif",
    },
    testimonialText: {
      fontSize: 18, lineHeight: 1.7,
      color: "rgba(255,255,255,0.85)",
      fontStyle: "italic", marginBottom: 24,
    },
    testimonialDots: {
      display: "flex", justifyContent: "center", gap: 8, marginTop: 32,
    },
    tDot: (active) => ({
      width: active ? 24 : 8, height: 8, borderRadius: 4,
      background: active ? "linear-gradient(90deg, #7F77DD, #1D9E75)" : "rgba(255,255,255,0.2)",
      transition: "all 0.3s", cursor: "pointer",
    }),

    // CONTACT
    contactGrid: {
      display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60,
    },
    contactInfo: { paddingTop: 8 },
    contactItem: {
      display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
    },
    contactIcon: (color) => ({
      width: 46, height: 46, borderRadius: 12,
      background: `${color}18`,
      border: `1px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 20, flexShrink: 0,
    }),
    contactLabel: { fontWeight: 600, marginBottom: 2, fontSize: 15 },
    contactVal: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
    formCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(127,119,221,0.2)",
      borderRadius: 20, padding: "36px 32px",
    },
    formField: {
      width: "100%", background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#fff", borderRadius: 10, padding: "13px 16px",
      fontSize: 14, outline: "none",
      marginBottom: 16, boxSizing: "border-box",
      transition: "border-color 0.2s",
    },
    formTextarea: {
      width: "100%", background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#fff", borderRadius: 10, padding: "13px 16px",
      fontSize: 14, outline: "none", resize: "vertical",
      marginBottom: 20, boxSizing: "border-box", minHeight: 110,
    },

    // FOOTER
    footer: {
      background: "rgba(0,0,0,0.5)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 5%",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 24,
    },
    footerLinks: { display: "flex", gap: 24, flexWrap: "wrap" },
    footerLink: {
      color: "rgba(255,255,255,0.4)", fontSize: 13,
      cursor: "pointer", transition: "color 0.2s",
    },
  };

  const TECHS = [
    ["React js", "#61DBFB"], ["Django", "#68A063"], ["Bootstrap", "#fff"],
    ["Tailwind", "#38BDF8"], ["Sqlite", "#4DB33D"], ["PostgreSQL", "#336791"],
    ["Python", "#F24E1E"], ["javascript", "#FF9900"],
  ];

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        .service-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.3) !important; border-color: rgba(127,119,221,0.35) !important; }
        .portfolio-card:hover { transform: translateY(-6px) scale(1.01) !important; }
        .btn-primary:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 40px rgba(127,119,221,0.6) !important; }
        .btn-outline:hover { background: rgba(127,119,221,0.12) !important; border-color: rgba(127,119,221,0.7) !important; }
        .footer-link:hover { color: rgba(255,255,255,0.8) !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        input:focus, textarea:focus { border-color: rgba(127,119,221,0.6) !important; }
        ::-webkit-scrollbar { width: 6px; background: #080720; }
        ::-webkit-scrollbar-thumb { background: #7F77DD55; border-radius: 3px; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.navLogo} onClick={() => scrollTo("home")}>
          <div style={styles.logoIcon}>
            <div style={styles.logoBar(20, "#fff")} />
            <div style={styles.logoBar(14, "rgba(255,255,255,0.6)")} />
            <div style={styles.logoBar(10, "rgba(255,255,255,0.3)")} />
          </div>
          <span style={styles.logoText}>Stackers Mania</span>
        </div>
        <div style={{ ...styles.navLinks, display: window.innerWidth < 768 ? "none" : "flex" }}>
          {NAV_LINKS.map(l => (
            <span key={l} style={styles.navLink(activeNav === l)}
              onClick={() => { setActiveNav(l); scrollTo(l.toLowerCase()); }}>
              {l}
            </span>
          ))}
        </div>
        <button className="btn-primary" style={styles.navCta} onClick={() => scrollTo("contact")}>
          Get a Free Quote
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroGlow1} />
        <div style={styles.heroGlow2} />
        <CodeParticles />
        <div style={styles.heroGrid}>
          <div style={{ animation: "fadeIn 0.8s ease both" }}>
            <div style={styles.heroBadge}>
              <div style={styles.dot} />
              🚀 Now Open for Projects
            </div>
            <h1 style={styles.heroH1}>
              We Build
              <span style={styles.heroGrad}>Websites That</span>
              Drive Results
            </h1>
            <p style={styles.heroSub}>
              Stackers Mania crafts high-performance, visually stunning websites for businesses ready to dominate the digital world. From design to deployment — we stack it all.
            </p>
            <div style={styles.heroBtns}>
              <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("contact")}>
                Start Your Project →
              </button>
              <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("work")}>
                View Our Work
              </button>
            </div>
          </div>

          {/* Code Card */}
          <div style={{ ...styles.heroCard, animation: "slideIn 0.9s 0.2s ease both" }}>
            <div style={styles.cardHeader}>
              <div style={styles.dot3("#FF5F57")} />
              <div style={styles.dot3("#FFBD2E")} />
              <div style={styles.dot3("#28CA42")} />
              <span style={{ marginLeft: 12, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>App.jsx</span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 2 }}>
              <div><span style={{ color: "#A79AF5" }}>const</span> <span style={{ color: "#2DDBA0" }}>Website</span> <span style={{ color: "#fff" }}>=</span> <span style={{ color: "#A79AF5" }}>()</span> <span style={{ color: "#fff" }}>{"=>"}</span> {"{"}</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: "#A79AF5" }}>return</span> <span style={{ color: "#7F77DD" }}>{"("}</span></div>
              <div style={{ paddingLeft: 40 }}><span style={{ color: "#1D9E75" }}>&lt;div</span> <span style={{ color: "#EF9F27" }}>className</span>=<span style={{ color: "#2DDBA0" }}>"hero"</span><span style={{ color: "#1D9E75" }}>&gt;</span></div>
              <div style={{ paddingLeft: 60 }}><span style={{ color: "#1D9E75" }}>&lt;h1&gt;</span><span style={{ color: "#fff" }}>Your Dream Site</span><span style={{ color: "#1D9E75" }}>&lt;/h1&gt;</span></div>
              <div style={{ paddingLeft: 60 }}><span style={{ color: "#1D9E75" }}>&lt;Button&gt;</span><span style={{ color: "#fff" }}>Launch 🚀</span><span style={{ color: "#1D9E75" }}>&lt;/Button&gt;</span></div>
              <div style={{ paddingLeft: 40 }}><span style={{ color: "#1D9E75" }}>&lt;/div&gt;</span></div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: "#7F77DD" }}>{")"}</span></div>
              <div>{"}"}</div>
            </div>
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(29,158,117,0.1)", borderRadius: 8, border: "1px solid rgba(29,158,117,0.2)" }}>
              <span style={{ color: "#2DDBA0", fontSize: 12 }}>✓ Compiled successfully in 0.8s</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={styles.statsBar}>
        {STATS.map((s, i) => (
          <div key={i} style={{ ...styles.statItem, borderRight: i < STATS.length - 1 ? "1px solid rgba(127,119,221,0.1)" : "none" }}>
            <div style={styles.statVal}><Counter val={s.val} /></div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.section()}>
        <div style={{ textAlign: "center" }}>
          <div style={styles.sectionTag}>Our Services</div>
          <h2 style={styles.sectionH2}>What We <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Build For You</span></h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto 56px" }}>End-to-end digital solutions crafted with precision, passion, and the latest technology stack.</p>
        </div>
        <div style={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={styles.serviceCard(s.color)}>
              <div style={styles.serviceIcon}>{s.icon}</div>
              <div style={styles.serviceTitle}>{s.title}</div>
              <p style={styles.serviceDesc}>{s.desc}</p>
              <div style={{ marginTop: 16, color: s.color, fontSize: 13, fontWeight: 600 }}>Learn more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}      {false && (      <section id="work" style={styles.section("rgba(127,119,221,0.04)")}>
        <div style={{ textAlign: "center" }}>
          <div style={styles.sectionTag}>Our Work</div>
          <h2 style={styles.sectionH2}>Recent <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span></h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto 56px" }}>A glimpse of the digital experiences we've crafted for our clients.</p>
        </div>
        <div style={styles.portfolioGrid}>
          {PORTFOLIO.map((p, i) => (
            <div key={i} className="portfolio-card" style={styles.portfolioCard(p.bg)}>
              <div style={styles.portfolioAccent(p.accent)} />
              <div style={styles.portfolioNum(p.accent)}>0{i + 1}</div>
              <div style={styles.portfolioTitle}>{p.title}</div>
              <div style={styles.portfolioCat}>{p.cat}</div>
              <div style={styles.portfolioTag(p.accent)}>VIEW PROJECT</div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ── ABOUT ── */}
      <section id="about" style={styles.section()}>
        <div style={styles.aboutGrid}>
          <div>
            <div style={styles.sectionTag}>About Us</div>
            <h2 style={styles.sectionH2}>We Are <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stackers Mania</span></h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
              Born from a passion for clean code and bold design, Stackers Mania is a freshly launched web development studio based in Erode, Tamil Nadu. We believe every business — big or small — deserves a world-class digital presence.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
              We're a tight-knit team of developers, designers, and digital strategists who stack modern technologies to deliver websites that don't just look great — they perform.
            </p>
            <div style={styles.techStack}>
              {TECHS.map(([tech, color]) => (
                <span key={tech} style={styles.techPill(color)}>{tech}</span>
              ))}
            </div>
            <div style={styles.teamGrid}>
              {TEAM.map((m, i) => (
                <div key={i} style={styles.teamCard}>
                  <div style={styles.teamAvatar(m.color)}>{m.init}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Visual side */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(127,119,221,0.15), rgba(29,158,117,0.1))", border: "1px solid rgba(127,119,221,0.2)", borderRadius: 24, padding: 36 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, letterSpacing: 2 }}>WHY CHOOSE US</div>
              {[
                ["⚡", "Lightning Fast Delivery", "Most projects live in 7–14 days"],
                ["🎨", "Unique Custom Designs", "No templates. 100% bespoke."],
                ["📈", "Conversion Focused", "Designed to turn visitors into clients"],
                ["🤝", "Transparent Process", "Weekly updates, no surprises"],
                ["💰", "Competitive Pricing", "Premium quality, startup-friendly rates"],
              ].map(([icon, title, sub], i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 22, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{title}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}      {false && (      <section style={styles.section("rgba(127,119,221,0.04)")}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={styles.sectionTag}>Testimonials</div>
          <h2 style={styles.sectionH2}>What Our <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Clients Say</span></h2>
        </div>
        <div style={styles.testimonialCard}>
          <div style={styles.quote}>"</div>
          <p style={styles.testimonialText}>{TESTIMONIALS[activeTestimonial].quote}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={styles.teamAvatar(TESTIMONIALS[activeTestimonial].color)}>
              {TESTIMONIALS[activeTestimonial].init}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{TESTIMONIALS[activeTestimonial].name}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{TESTIMONIALS[activeTestimonial].company}</div>
            </div>
          </div>
        </div>
        <div style={styles.testimonialDots}>
          {TESTIMONIALS.map((_, i) => (
            <div key={i} style={styles.tDot(i === activeTestimonial)} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.section()}>
        <div style={{ textAlign: "center" }}>
          <div style={styles.sectionTag}>Contact</div>
          <h2 style={styles.sectionH2}>Let's <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work Together</span></h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto 56px" }}>Got a project in mind? Let's talk. We'll get back to you within 24 hours.</p>
        </div>
        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            {[
              ["📍", "Location", "Erode, Tamil Nadu, India"],
              ["✉️", "Email", "stackersmania@gmail.com"],
              ["📞", "Phone", "+91 80725 06647"],
              ["🕐", "Working Hours", "Mon–Sat, 9 AM – 7 PM IST"],
            ].map(([icon, label, val], i) => (
              <div key={i} style={styles.contactItem}>
                <div style={styles.contactIcon(i % 2 === 0 ? "#7F77DD" : "#1D9E75")}>{icon}</div>
                <div>
                  <div style={styles.contactLabel}>{label}</div>
                  <div style={styles.contactVal}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              {[["in", "#0077B5"], ["ig", "#E1306C"], ["tw", "#1DA1F2"]].map(([s, c]) => (
                <div key={s} style={{ width: 40, height: 40, borderRadius: 10, background: `${c}22`, border: `1px solid ${c}44`, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.formCard}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <input style={styles.formField} placeholder="Your Name" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input style={styles.formField} placeholder="Email Address" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <input style={styles.formField} placeholder="Subject (e.g. New Website)" value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                <textarea style={styles.formTextarea} placeholder="Tell us about your project..."
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                <button className="btn-primary" style={{ ...styles.btnPrimary, width: "100%", textAlign: "center" }} onClick={handleSubmit}>
                  Send Message 🚀
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.navLogo}>
          <div style={styles.logoIcon}>
            <div style={styles.logoBar(20, "#fff")} />
            <div style={styles.logoBar(14, "rgba(255,255,255,0.6)")} />
            <div style={styles.logoBar(10, "rgba(255,255,255,0.3)")} />
          </div>
          <span style={styles.logoText}>Stackers Mania</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          © 2025 Stackers Mania. All rights reserved.
        </div>
        <div style={styles.footerLinks}>
          {["Privacy Policy", "Terms", "Sitemap"].map(l => (
            <span key={l} className="footer-link" style={styles.footerLink}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}