import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled,] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const isHomePage = location.pathname === "/";
  const isTransparentAndDark = isHomePage && !scrolled;

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.faculty'), path: '/teachers' },
    { name: t('nav.academics'), path: '/schedule' },
    { name: t('nav.admissions'), path: '/admissions' },
    { name: t('nav.events'), path: '/events' },
  ];

  useEffect(() => {
    setIsOpen(false);

  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ">
      <nav
        className={`w-full max-w-7xl mx-auto transition-all duration-300 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-md py-3 mt-0 border-b border-slate-200'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center">

            {/* 1. Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-dark text-accent-gold flex items-center justify-center rounded-full font-bold">

              </div>
              <span className={`font-serif text-lg sm:text-xl font-bold transition-colors ${isTransparentAndDark ? 'text-white' : 'text-primary-dark'
                }`}>
                {language === 'bn' ? 'মারকাযুল ফিকরী' : 'MARKAZUL FIKRI WAD DAWAH'}
              </span>
            </Link>

            {/* 2. Desktop Menu */}
            <div className={`hidden lg:flex space-x-1 items-center p-1 rounded-full border transition-all ${isTransparentAndDark
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-100/50 border-slate-200'
              }`}>
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center justify-center ${isActive
                      ? 'text-white' // একটিভ হলে সবসময় লেখা সাদা হবে যাতে মোশন ব্যাকগ্রাউন্ডে ফুটে ওঠে
                      : isTransparentAndDark
                        ? 'text-white/90 hover:text-white'
                        : 'text-slate-600 hover:text-primary-dark'
                      }`}
                  >
                    {/* Motion Background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className="absolute inset-0 bg-primary-dark rounded-full"
                          style={{ zIndex: 0 }} // z-index -10 এর বদলে 0 দিন
                        />
                      )}
                    </AnimatePresence>

                    {/* Text Label */}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* 3. Right Side: Controls (Language + Contact + Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all ${isTransparentAndDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-primary-dark hover:bg-slate-200'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <Globe size={16} />
                  <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
                </span>
              </button>

              {/* Contact Button (Desktop) */}
              <Link
                to="/contact"
                className="hidden sm:flex items-center justify-center bg-accent-gold text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-yellow-600 transition-all shadow-md"
              >
                {t('nav.contact')}
              </Link>

              {/* Mobile Menu Toggle (শুধুমাত্র এই একটি বাটন থাকবে) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isTransparentAndDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-bg-light text-primary-dark hover:bg-accent-sand'
                  }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full bg-white/95 backdrop-blur-xl border border-border-subtle shadow-2xl rounded-3xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                        ? 'bg-primary-dark text-white'
                        : 'text-text-main hover:bg-bg-light'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-border-subtle">
                  <Link
                    to="/contact"
                    className="flex w-full justify-center bg-accent-gold text-white px-5 py-4 rounded-xl text-base font-bold shadow-md"
                  >
                    {t('nav.contact')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
