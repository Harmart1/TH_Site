import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Ship, Lightbulb, Building, Phone, Mail, MapPin, Menu, X,
  ChevronUp, Award, Users, BookOpen, ArrowRight, Sun, Moon, MessageCircle,
  Linkedin, Twitter 
} from 'lucide-react';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

// Import assets
import logoImage from '/assets/tim_harmar_logo_updated.png';
import logoWhite from '/assets/tim_harmar_logo_white.png';
import heroBackground from '/assets/hero_background.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // --- Effects ---

  // Theme management
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      setShowScrollTop(scrollY > 300);

      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // --- Functions ---

  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // --- Data Arrays ---

  const navItems = ['home', 'about', 'services', 'contact'];
  const services = [
    { icon: Shield, title: "Cybersecurity & Privacy Law", description: "PIPEDA compliance, data breach response, privacy policy development, and cybersecurity audits.", features: ["Data Protection", "Privacy Compliance", "Breach Response", "CASL Compliance"] },
    { icon: Ship, title: "Maritime & Shipping Law", description: "Specialized expertise in Great Lakes shipping, vessel documentation, and maritime regulations.", features: ["Vessel Documentation", "Shipping Contracts", "Maritime Insurance", "Port Authority Matters"] },
    { icon: Lightbulb, title: "Intellectual Property Law", description: "Comprehensive IP protection including patents, trademarks, copyrights, and licensing agreements.", features: ["Patent Applications", "Trademark Registration", "IP Licensing", "Trade Secrets"] },
    { icon: Building, title: "Business & Corporate Law", description: "Corporate structuring, commercial agreements, and business development consulting.", features: ["Corporate Structuring", "Commercial Agreements", "M&A", "Business Succession"] }
  ];
  const credentials = [
    "Master of Engineering, Cybersecurity Policy and Compliance (Candidate)",
    "Master of Laws, Business Law & Banking & Financial Services Law",
    "Juris Doctor, University of Windsor",
    "MBA, Finance & Accounting",
    "Chartered Privacy and Access Professional (CAPP)"
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 ${isScrolled ? 'shadow-md bg-white/95 dark:bg-gray-900/95' : 'bg-white/90 dark:bg-gray-900/90'} border-b border-gray-200 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => scrollToSection('home')} aria-label="Home">
              <img src={logoImage} alt="Tim Harmar Legal Logo" className="h-10 w-auto" />
            </button>
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button key={item} onClick={() => scrollToSection(item)} className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${activeSection === item ? 'text-blue-900 dark:text-teal-300 border-b-2 border-teal-500' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white'}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
              <button onClick={toggleTheme} aria-label="Toggle theme" className="ml-8 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleTheme} aria-label="Toggle theme" className="mr-2 p-2 rounded-full text-gray-700 dark:text-gray-300">
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="p-2 rounded-md text-gray-700 dark:text-gray-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button key={item} onClick={() => scrollToSection(item)} className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left rounded-md">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="absolute inset-0 bg-blue-900/80"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-5xl md:text-7xl">TIM HARMAR</span><br />
                <span className="text-2xl md:text-3xl text-teal-300">Legal & Consulting Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Where Technology Meets Law. Specialized expertise in cybersecurity, AI law, intellectual property, and maritime law in Sault Ste. Marie.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => scrollToSection('contact')} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">Schedule Consultation <ArrowRight size={20} /></button>
                <button onClick={() => scrollToSection('services')} className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">Our Services</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-6">About Tim Harmar</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Award-winning lawyer with cross-functional experience in corporate and intellectual property law, financial and process development consulting. Bringing cutting-edge expertise in cybersecurity, AI law, and maritime law to Sault Ste. Marie's business community.</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div><Award className="w-8 h-8 text-teal-500 mx-auto mb-2" /><h3 className="font-semibold text-blue-900 dark:text-white">Award-Winning</h3><p className="text-sm text-gray-600 dark:text-gray-400">Recognized legal excellence</p></div>
                <div><Users className="w-8 h-8 text-teal-500 mx-auto mb-2" /><h3 className="font-semibold text-blue-900 dark:text-white">Community Leader</h3><p className="text-sm text-gray-600 dark:text-gray-400">Active in local development</p></div>
                <div><BookOpen className="w-8 h-8 text-teal-500 mx-auto mb-2" /><h3 className="font-semibold text-blue-900 dark:text-white">Educator</h3><p className="text-sm text-gray-600 dark:text-gray-400">Professor at Sault College</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-6">Education & Credentials</h3>
              <ul className="space-y-4">
                {credentials.map((cred, i) => <li key={i} className="flex items-start gap-3"><div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div><span className="text-gray-700 dark:text-gray-300">{cred}</span></li>)}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-6">Specialized Legal Services</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Cutting-edge legal expertise for the digital age, serving businesses and entrepreneurs in Sault Ste. Marie and beyond.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg hover:shadow-lg dark:hover:shadow-teal-500/10 transition-shadow duration-300 group">
                  <div className="flex items-center mb-4"><service.icon className="w-8 h-8 text-teal-500 mr-3" /><h3 className="text-xl font-bold text-blue-900 dark:text-white">{service.title}</h3></div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feat, j) => <li key={j} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-teal-500 rounded-full transition-transform duration-300 group-hover:scale-150"></div><span className="text-sm text-gray-600 dark:text-gray-400">{feat}</span></li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">Ready to discuss your legal needs? Contact Tim Harmar Legal & Consulting Services today.</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4"><Phone className="w-6 h-6 text-teal-300" /><div><p className="font-semibold">Phone</p><a href="tel:+1-705-943-0634" className="text-blue-100 hover:text-teal-300">705.943.0634</a></div></div>
                  <div className="flex items-center gap-4"><Mail className="w-6 h-6 text-teal-300" /><div><p className="font-semibold">Email</p><a href="mailto:timharmar@yahoo.ca" className="text-blue-100 hover:text-teal-300">timharmar@yahoo.ca</a></div></div>
                  <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-teal-300" /><div><p className="font-semibold">Office</p><p className="text-blue-100">67 Hugill Street<br />Sault Ste. Marie, ON P6A 4E6</p></div></div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-blue-100">Your message has been sent. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-6">Schedule a Consultation</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div><label htmlFor="name" className="block text-sm font-medium mb-2">Name</label><input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-teal-300" placeholder="Your full name" /></div>
                      <div><label htmlFor="email" className="block text-sm font-medium mb-2">Email</label><input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-teal-300" placeholder="your.email@example.com" /></div>
                      <div><label htmlFor="service" className="block text-sm font-medium mb-2">Legal Matter</label><select id="service" name="service" required className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-300"><option value="">Select a service area</option><option value="cybersecurity">Cybersecurity & Privacy Law</option><option value="maritime">Maritime & Shipping Law</option><option value="ip">Intellectual Property Law</option><option value="business">Business & Corporate Law</option><option value="other">Other</option></select></div>
                      <div><label htmlFor="message" className="block text-sm font-medium mb-2">Message</label><textarea id="message" name="message" rows={4} required className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-teal-300" placeholder="Brief description of your legal needs..."></textarea></div>
                      <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">Send Message</button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <img src={logoWhite} alt="Tim Harmar Legal White Logo" className="h-12 w-auto mb-4 mx-auto md:mx-0" />
              <p className="text-gray-400 mb-4">Specialized legal services for the digital age, serving Sault Ste. Marie and beyond.</p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {services.map(s => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>67 Hugill Street, Sault Ste. Marie, ON P6A 4E6</p>
                <p>P: <a href="tel:+1-705-943-0634" className="hover:text-teal-300">705.943.0634</a></p>
                <p>E: <a href="mailto:timharmar@yahoo.ca" className="hover:text-teal-300">timharmar@yahoo.ca</a></p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Tim Harmar Legal & Consulting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons & Chat */}
      <AnimatePresence>{isChatOpen && <ChatAssistant closeChat={() => setIsChatOpen(false)} />}</AnimatePresence>
      <motion.button onClick={() => setIsChatOpen(!isChatOpen)} aria-label="Open chat assistant" className="fixed bottom-8 left-8 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-40" whileHover={{ scale: 1.1 }}>
        <MessageCircle size={24} />
      </motion.button>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop} aria-label="Scroll to top" className="fixed bottom-8 right-8 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-40">
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;