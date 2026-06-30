import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import Services from './pages/Services'
import Work from './pages/Work'
import About from './pages/About'
import Careers from './pages/Careers'
import Login from './pages/Login'
import Contact from './pages/Contact'
import './styles/globals.css'
import './styles/components.css'

export default function App() {
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login'

  return (
    <div className="app-shell">
      <Header />
      {isLoginPage ? (
        <main>
          <Login />
        </main>
      ) : (
        <>
          <Hero />
          <Services />
          <Work />
          <About />
          <Careers />
          <Contact />
        </>
      )}
      <Footer />
    </div>
  )
}
