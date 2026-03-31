import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

const NAV_LINKS = ["Home", "Services", "Work", "About", "Contact"];

const SERVICES = [
  { icon: "🌐", title: "Web Design", desc: "Pixel-perfect, responsive designs that captivate visitors and reflect your brand identity.", color: "#7F77DD" },
  { icon: "⚙️", title: "Web Development", desc: "Full-stack development using React, Django, and modern technologies built to scale.", color: "#1D9E75" },
  { icon: "🛒", title: "E-Commerce", desc: "Powerful online stores with seamless checkout, payment gateways, and inventory management.", color: "#A79AF5" },
  { icon: "📱", title: "Mobile-First", desc: "Blazing fast, mobile-optimized websites that rank higher and convert better.", color: "#2DDBA0" },
  { icon: "🔍", title: "SEO Optimization", desc: "Technical SEO, performance tuning, and content strategies to put you on top of Google.", color: "#7F77DD" },
  { icon: "🛡️", title: "Maintenance & Support", desc: "Ongoing support, security patches, and updates so your website never skips a beat.", color: "#1D9E75" },
];

const STATS = [
  { val: "1+", label: "Projects Delivered" },
  { val: "1+", label: "Happy Clients" },
  { val: "1+", label: "Years Experience" },
  { val: "100%", label: "Client Satisfaction" },
];

const TEAM = [
  { name: "Mohamed Rafeek M.", role: "Founder & Lead Dev", init: "MR", color: "#7F77DD" },
  { name: "Saran B.", role: "Business Development", init: "SB", color: "#1D9E75" },
];

const TECHS = [
  ["React js", "#61DBFB"], ["Django", "#68A063"], ["Bootstrap", "#ffffff"],
  ["Tailwind", "#38BDF8"], ["Sqlite", "#4DB33D"], ["PostgreSQL", "#336791"],
  ["Python", "#F24E1E"], ["JavaScript", "#FF9900"],
];

const WHY_US = [
  ["⚡", "Lightning Fast Delivery", "Most projects live in 7–14 days"],
  ["🎨", "Unique Custom Designs", "No templates. 100% bespoke."],
  ["📈", "Conversion Focused", "Designed to turn visitors into clients"],
  ["🤝", "Transparent Process", "Weekly updates, no surprises"],
  ["💰", "Competitive Pricing", "Premium quality, startup-friendly rates"],
];

// --- Animated counter ---
function Counter({ val }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(val);
  const suffix = val.replace(/[0-9]/g, "");
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Code particles ---
function CodeParticles() {
  const snippets = ["</>", "{}", "[]", "=>", "fn()", "API", "CSS", "GET", "JSX", "npm"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {snippets.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${8 + i * 9}%`, top: `${10 + ((i * 17) % 70)}%`,
          fontFamily: "'Courier New',monospace", fontSize: i % 3 === 0 ? "13px" : "11px",
          color: i % 2 === 0 ? "#7F77DD" : "#1D9E75", opacity: 0.18,
          animation: `floatUp ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`,
        }}>{s}</div>
      ))}
    </div>
  );
}

// --- Hamburger icon ---
function Hamburger({ open }) {
  const bar = (transform, opacity = 1) => ({
    display: "block", width: 24, height: 2,
    background: open ? "#A79AF5" : "#fff", borderRadius: 2,
    transition: "all 0.3s", transform, opacity,
  });
  return (
    <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
      <span style={bar(open ? "rotate(45deg) translate(5px,5px)" : "none")} />
      <span style={bar("none", open ? 0 : 1)} />
      <span style={bar(open ? "rotate(-45deg) translate(5px,-5px)" : "none")} />
    </div>
  );
}

export default function StackersMania() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 80 && menuOpen) setMenuOpen(false);
  }, [scrollY, menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    emailjs.send("service_4on7zew", "template_bum3fko", {
      from_name: formData.name, from_email: formData.email,
      subject: formData.subject, message: formData.message,
      to_email: "rafirafibai@gmail.com",
    }, "xN1NRzzCrrsVzHBlq")
      .then(() => setSubmitted(true))
      .catch(() => alert("Failed to send. Please try again."));
  };

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',sans-serif", background: "#080720", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ═══════════════ GLOBAL CSS + MEDIA QUERIES ═══════════════ */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* Keyframes */
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        /* Interactive */
        .svc-card:hover    { transform:translateY(-6px)!important; box-shadow:0 20px 48px rgba(0,0,0,.35)!important; border-color:rgba(127,119,221,.4)!important; }
        .btn-p:hover       { transform:translateY(-2px)!important; box-shadow:0 10px 40px rgba(127,119,221,.65)!important; }
        .btn-o:hover       { background:rgba(127,119,221,.12)!important; border-color:rgba(127,119,221,.75)!important; }
        .nav-lnk:hover     { color:#A79AF5!important; }
        .social-b:hover    { transform:scale(1.12)!important; }
        .footer-lnk:hover  { color:rgba(255,255,255,.85)!important; }

        /* Form field base */
        .f-input, .f-area {
          width:100%; background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.1);
          color:#fff; border-radius:10px; padding:13px 16px;
          font-size:14px; font-family:inherit; outline:none;
          box-sizing:border-box; transition:border-color .2s;
        }
        .f-input { margin-bottom:16px; }
        .f-area  { resize:vertical; margin-bottom:20px; min-height:110px; }
        .f-input:focus, .f-area:focus { border-color:rgba(127,119,221,.65)!important; }
        input::placeholder, textarea::placeholder { color:rgba(255,255,255,.3); }

        /* Scrollbar */
        ::-webkit-scrollbar       { width:6px; background:#080720; }
        ::-webkit-scrollbar-thumb { background:#7F77DD55; border-radius:3px; }

        /* ── LAYOUT GRID CLASSES (desktop default) ── */
        .hero-grid    { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; width:100%; position:relative; z-index:2; }
        .stats-bar    { display:grid; grid-template-columns:repeat(4,1fr); background:rgba(127,119,221,.08); border:1px solid rgba(127,119,221,.15); border-radius:16px; overflow:hidden; margin:80px 5%; }
        .svc-grid     { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .about-grid   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:60px; }
        .form-row     { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .footer-row   { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px; }

        /* Nav visibility */
        .nav-desktop  { display:flex; gap:32px; align-items:center; }
        .nav-ham      { display:none; }
        .mob-menu     { display:none; }

        /* Code card visible on desktop */
        .code-card    { display:block; }

        /* Why-choose variants */
        .why-desktop  { display:block; }
        .why-mobile   { display:none; }

        /* ─────────── TABLET  768–1023px ─────────── */
        @media (max-width:1023px) {

          /* Nav */
          .nav-desktop { display:none; }
          .nav-ham     { display:flex; }
          .mob-menu    { display:block; }

          /* Hero */
          .hero-grid  { grid-template-columns:1fr; gap:0; }
          .code-card  { display:none; }

          /* Stats: 2×2 */
          .stats-bar  { grid-template-columns:repeat(2,1fr); margin:56px 5%; }

          /* Services: 2 col */
          .svc-grid   { grid-template-columns:repeat(2,1fr); }

          /* About: stack */
          .about-grid  { grid-template-columns:1fr; gap:40px; }
          .why-desktop { display:none; }
          .why-mobile  { display:block; margin-top:32px; }

          /* Contact: stack */
          .contact-grid { grid-template-columns:1fr; gap:36px; }

          /* Footer */
          .footer-row { flex-direction:column; align-items:center; text-align:center; }

          section { padding:72px 5%!important; }
          .stats-bar { margin:48px 5%!important; }
        }

        /* ─────────── MOBILE  ≤767px ─────────── */
        @media (max-width:767px) {

          /* Nav CTA shrink */
          .nav-cta { padding:8px 14px!important; font-size:12px!important; }

          /* Hero */
          .hero-sec   { padding:96px 5% 56px!important; }
          .hero-h1    { font-size:clamp(28px,7.5vw,44px)!important; letter-spacing:-1px!important; }
          .hero-sub   { font-size:15px!important; }
          .hero-badge { font-size:11px!important; padding:5px 12px!important; }
          .hero-btns  { flex-direction:column!important; }
          .hero-btns button { width:100%!important; }

          /* Stats: 2×2 tighter */
          .stats-bar  { grid-template-columns:repeat(2,1fr); margin:36px 5%!important; }
          .stat-cell  { padding:22px 12px!important; }
          .stat-val   { font-size:30px!important; }

          /* Services: 1 col */
          .svc-grid   { grid-template-columns:1fr; }

          /* About */
          .about-grid  { grid-template-columns:1fr; gap:32px; }
          .why-desktop { display:none; }
          .why-mobile  { display:block; margin-top:28px; }
          .team-grid   { flex-direction:column!important; }

          /* Contact */
          .contact-grid { grid-template-columns:1fr; gap:28px; }
          .form-row     { grid-template-columns:1fr; gap:0; }

          /* Form card */
          .form-card  { padding:24px 18px!important; }

          /* Footer */
          .footer-row   { flex-direction:column; align-items:center; text-align:center; gap:18px; }
          .footer-links { justify-content:center!important; }

          /* Section padding */
          section { padding:56px 5%!important; }

          /* Section headings */
          .sec-h2 { font-size:clamp(22px,6vw,34px)!important; }
        }

        /* ─────────── SMALL  ≤480px ─────────── */
        @media (max-width:480px) {
          .logo-text  { font-size:16px!important; }
          .hero-h1    { font-size:26px!important; }
          .stat-val   { font-size:26px!important; }
          .sec-h2     { font-size:22px!important; }
          .form-card  { padding:20px 14px!important; }
          .svc-card   { padding:22px 18px!important; }
          .contact-icon-box { width:38px!important; height:38px!important; font-size:17px!important; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrollY > 60 ? "rgba(8,7,32,0.97)" : "transparent", borderBottom: scrollY > 60 ? "1px solid rgba(127,119,221,0.15)" : "none", backdropFilter: scrollY > 60 ? "blur(14px)" : "none", transition: "all .3s", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div onClick={() => scrollTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7F77DD,#1D9E75)", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "6px 5px", flexShrink: 0 }}>
            <div style={{ width: 20, height: 4, background: "#fff", borderRadius: 2 }} />
            <div style={{ width: 14, height: 4, background: "rgba(255,255,255,.6)", borderRadius: 2 }} />
            <div style={{ width: 10, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
          </div>
          <span className="logo-text" style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-.5px", background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Stackers Mania
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop">
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-lnk"
              style={{ color: activeNav === l ? "#A79AF5" : "rgba(255,255,255,.65)", fontWeight: activeNav === l ? 600 : 400, fontSize: 15, cursor: "pointer", transition: "color .2s", borderBottom: activeNav === l ? "2px solid #7F77DD" : "2px solid transparent", paddingBottom: 2 }}
              onClick={() => { setActiveNav(l); scrollTo(l.toLowerCase()); }}>{l}</span>
          ))}
        </div>

        {/* Right: CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="btn-p nav-cta" onClick={() => scrollTo("contact")}
            style={{ background: "linear-gradient(135deg,#7F77DD,#1D9E75)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(127,119,221,.4)", transition: "transform .2s", whiteSpace: "nowrap" }}>
            Free Quote
          </button>
          <div className="nav-ham" onClick={() => setMenuOpen(!menuOpen)}>
            <Hamburger open={menuOpen} />
          </div>
        </div>
      </nav>

      {/* ══ MOBILE DROPDOWN MENU ══ */}
      <div className="mob-menu" style={{
        position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
        background: "rgba(8,7,32,.98)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(127,119,221,.2)",
        maxHeight: menuOpen ? 400 : 0, overflow: "hidden",
        transition: "max-height .35s ease",
      }}>
        <div style={{ padding: "8px 5% 24px" }}>
          {NAV_LINKS.map((l, i) => (
            <div key={l} onClick={() => { setActiveNav(l); scrollTo(l.toLowerCase()); }}
              style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.06)", color: activeNav === l ? "#A79AF5" : "rgba(255,255,255,.8)", fontWeight: activeNav === l ? 700 : 400, fontSize: 16, cursor: "pointer", animation: menuOpen ? `fadeIn .3s ease ${i * 0.06}s both` : "none" }}>
              {l}
            </div>
          ))}
          <div style={{ marginTop: 20, color: "rgba(255,255,255,.4)", fontSize: 13, lineHeight: 2 }}>
            📞 +91 80725 06647<br />✉️ stackersmania@gmail.com
          </div>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section id="home" className="hero-sec" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle,rgba(127,119,221,.18) 0%,transparent 70%)", top: "10%", left: "-5%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle,rgba(29,158,117,.15) 0%,transparent 70%)", bottom: "10%", right: "5%", pointerEvents: "none" }} />
        <CodeParticles />

        <div className="hero-grid">
          {/* Left */}
          <div style={{ animation: "fadeIn .8s ease both" }}>
            <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(127,119,221,.12)", border: "1px solid rgba(127,119,221,.3)", borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#A79AF5", marginBottom: 24, width: "fit-content" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2DDBA0", animation: "pulse 2s ease-in-out infinite" }} />
              🚀 Now Open for Projects
            </div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 20px", letterSpacing: "-2px" }}>
              We Build
              <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Websites That</span>
              Drive Results
            </h1>
            <p className="hero-sub" style={{ fontSize: 17, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Stackers Mania crafts high-performance, visually stunning websites for businesses ready to dominate the digital world. From design to deployment — we stack it all.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-p" onClick={() => scrollTo("contact")} style={{ background: "linear-gradient(135deg,#7F77DD,#1D9E75)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, border: "none", boxShadow: "0 6px 30px rgba(127,119,221,.45)", cursor: "pointer", transition: "transform .2s" }}>
                Start Your Project →
              </button>
              <button className="btn-o" onClick={() => scrollTo("services")} style={{ background: "transparent", color: "#A79AF5", fontWeight: 600, fontSize: 15, padding: "13px 30px", borderRadius: 10, cursor: "pointer", border: "1px solid rgba(127,119,221,.5)", transition: "background .2s" }}>
                View Services
              </button>
            </div>
          </div>

          {/* Code card — hidden on tablet/mobile via CSS */}
          <div className="code-card" style={{ background: "linear-gradient(135deg,rgba(127,119,221,.1),rgba(29,158,117,.08))", border: "1px solid rgba(127,119,221,.2)", borderRadius: 20, padding: 28, backdropFilter: "blur(10px)", animation: "slideIn .9s .2s ease both" }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
              {["#FF5F57","#FFBD2E","#28CA42"].map((c,i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: 12, color: "rgba(255,255,255,.3)", fontSize: 12 }}>App.jsx</span>
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
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(29,158,117,.1)", borderRadius: 8, border: "1px solid rgba(29,158,117,.2)" }}>
              <span style={{ color: "#2DDBA0", fontSize: 12 }}>✓ Compiled successfully in 0.8s</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div className="stats-bar">
        {STATS.map((s, i) => (
          <div key={i} className="stat-cell" style={{ padding: "36px 24px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(127,119,221,.1)" : "none" }}>
            <div className="stat-val" style={{ fontSize: 44, fontWeight: 900, background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <Counter val={s.val} />
            </div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: "100px 5%" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(127,119,221,.12)", border: "1px solid rgba(127,119,221,.25)", color: "#A79AF5", fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 14 }}>Our Services</div>
          <h2 className="sec-h2" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-1px" }}>
            What We <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Build For You</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 16, maxWidth: 520, lineHeight: 1.7, margin: "0 auto 56px" }}>End-to-end digital solutions crafted with precision, passion, and the latest technology stack.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="svc-card" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderTop: `3px solid ${s.color}`, borderRadius: 16, padding: "28px 24px", transition: "transform .25s, border-color .25s, box-shadow .25s" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{s.title}</div>
              <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              <div style={{ marginTop: 16, color: s.color, fontSize: 13, fontWeight: 600 }}>Learn more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ padding: "100px 5%", background: "rgba(127,119,221,.03)" }}>
        <div className="about-grid">
          {/* Left */}
          <div>
            <div style={{ display: "inline-block", background: "rgba(127,119,221,.12)", border: "1px solid rgba(127,119,221,.25)", color: "#A79AF5", fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 14 }}>About Us</div>
            <h2 className="sec-h2" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-1px" }}>
              We Are <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stackers Mania</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
              Born from a passion for clean code and bold design, Stackers Mania is a freshly launched web development studio based in Erode, Tamil Nadu. We believe every business — big or small — deserves a world-class digital presence.
            </p>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
              We're a tight-knit team of developers, designers, and digital strategists who stack modern technologies to deliver websites that don't just look great — they perform.
            </p>
            {/* Tech pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {TECHS.map(([tech, color]) => (
                <span key={tech} style={{ background: `${color}15`, border: `1px solid ${color}30`, color, fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100 }}>{tech}</span>
              ))}
            </div>
            {/* Team */}
            <div className="team-grid" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 32 }}>
              {TEAM.map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, flex: "1 1 180px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${m.color}33`, border: `2px solid ${m.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: m.color, flexShrink: 0 }}>{m.init}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                    <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Why choose — compact, shown on mobile/tablet only */}
            <div className="why-mobile" style={{ marginTop: 32, background: "linear-gradient(135deg,rgba(127,119,221,.12),rgba(29,158,117,.08))", border: "1px solid rgba(127,119,221,.2)", borderRadius: 20, padding: "24px 20px" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 16, letterSpacing: 2 }}>WHY CHOOSE US</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {WHY_US.map(([icon, title], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — full why choose (desktop) */}
          <div className="why-desktop">
            <div style={{ background: "linear-gradient(135deg,rgba(127,119,221,.15),rgba(29,158,117,.1))", border: "1px solid rgba(127,119,221,.2)", borderRadius: 24, padding: 36 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 24, letterSpacing: 2 }}>WHY CHOOSE US</div>
              {WHY_US.map(([icon, title, sub], i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 22, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{title}</div>
                    <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: "100px 5%" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(127,119,221,.12)", border: "1px solid rgba(127,119,221,.25)", color: "#A79AF5", fontSize: 12, fontWeight: 600, letterSpacing: 2, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 14 }}>Contact</div>
          <h2 className="sec-h2" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-1px" }}>
            Let's <span style={{ background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work Together</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 16, maxWidth: 520, lineHeight: 1.7, margin: "0 auto 56px" }}>Got a project in mind? Let's talk. We'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div style={{ paddingTop: 4 }}>
            {[
              ["📍","Location",      "Erode, Tamil Nadu, India",  "#7F77DD"],
              ["✉️","Email",         "stackersmania@gmail.com",    "#1D9E75"],
              ["📞","Phone",         "+91 80725 06647",            "#7F77DD"],
              ["🕐","Working Hours", "Mon–Sat, 9 AM – 7 PM IST",  "#1D9E75"],
            ].map(([icon, label, val, color], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
                <div className="contact-icon-box" style={{ width: 46, height: 46, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2, fontSize: 15 }}>{label}</div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13, wordBreak: "break-word" }}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {[["in","#0077B5"],["ig","#E1306C"],["tw","#1DA1F2"]].map(([s,c]) => (
                <div key={s} className="social-b" style={{ width: 44, height: 44, borderRadius: 10, background: `${c}22`, border: `1px solid ${c}44`, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "transform .2s" }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="form-card" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(127,119,221,.2)", borderRadius: 20, padding: "36px 32px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,.5)" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <input className="f-input" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className="f-input" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <input className="f-input" style={{ width: "100%" }} placeholder="Subject (e.g. New Website)" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                <textarea className="f-area" placeholder="Tell us about your project..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                <button className="btn-p" onClick={handleSubmit}
                  style={{ background: "linear-gradient(135deg,#7F77DD,#1D9E75)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, border: "none", width: "100%", cursor: "pointer", boxShadow: "0 6px 30px rgba(127,119,221,.4)", transition: "transform .2s" }}>
                  Send Message 🚀
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "rgba(0,0,0,.5)", borderTop: "1px solid rgba(255,255,255,.06)", padding: "44px 5%" }}>
        <div className="footer-row">
          <div onClick={() => scrollTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7F77DD,#1D9E75)", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "6px 5px", flexShrink: 0 }}>
              <div style={{ width: 20, height: 4, background: "#fff", borderRadius: 2 }} />
              <div style={{ width: 14, height: 4, background: "rgba(255,255,255,.6)", borderRadius: 2 }} />
              <div style={{ width: 10, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-.5px", background: "linear-gradient(90deg,#A79AF5,#2DDBA0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stackers Mania</span>
          </div>
          <div style={{ color: "rgba(255,255,255,.3)", fontSize: 13 }}>© 2025 Stackers Mania. All rights reserved.</div>
          <div className="footer-links" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy","Terms","Sitemap"].map(l => (
              <span key={l} className="footer-lnk" style={{ color: "rgba(255,255,255,.4)", fontSize: 13, cursor: "pointer", transition: "color .2s" }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
