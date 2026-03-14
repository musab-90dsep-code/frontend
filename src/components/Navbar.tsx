import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
            ? 'bg-white/90 backdrop-blur-xl shadow-md py-2 mt-0 border-b border-slate-200'
            : 'bg-transparent py-3'
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* 1. Logo & Stacked Name (Compact Design) */}
            <Link to="/" className="flex items-center gap-2 group">
              {/* Logo Image */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-transparent group-hover:border-emerald-200 transition-all overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dh2pky0qd/image/upload/v1773519655/d0ibqes49hjl7onb8950.jpg" 
                  alt="Madrasa Logo" 
                  className="w-full h-full object-contain p-0.5"
                />
              </div>

              {/* Stacked Text: ফন্ট সাইজ কমানো হয়েছে */}
              <div className="flex flex-col justify-center mt-0.5">
                <span className={`font-serif text-[13px] lg:text-[15px] font-bold leading-none whitespace-nowrap transition-colors duration-300 ${
                  isTransparentAndDark ? 'text-emerald-400 drop-shadow-md' : 'text-emerald-700'
                }`}>
                  জামেয়া ইসলামিয়া দারুল উলূম
                </span>
                <span className={`text-[8px] lg:text-[9.5px] font-bold tracking-widest uppercase mt-1 whitespace-nowrap transition-colors duration-300 ${
                  isTransparentAndDark ? 'text-white/90 drop-shadow-md' : 'text-primary-dark/80'
                }`}>
                  Jamia Islamia Darul Uloom
                </span>
              </div>
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
                    className={`relative px-3 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full flex items-center justify-center ${isActive
                      ? 'text-white' 
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
                          style={{ zIndex: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Text Label */}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* 3. Right Side: Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold transition-all ${isTransparentAndDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-primary-dark hover:bg-slate-200'
                  }`}
              >
                <span className="flex items-center gap-1">
                  <Globe size={14} />
                  <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
                </span>
              </button>

              {/* Contact Button */}
              <Link
                to="/contact"
                className="hidden sm:flex items-center justify-center bg-accent-gold text-white px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide hover:bg-yellow-600 transition-all shadow-md"
              >
                {t('nav.contact')}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isTransparentAndDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-primary-dark hover:bg-slate-200'
                  }`}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
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
              className="lg:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-1.5">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                        ? 'bg-primary-dark text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-3 mt-2 border-t border-slate-200">
                  <Link
                    to="/contact"
                    className="flex w-full justify-center bg-accent-gold text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md"
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