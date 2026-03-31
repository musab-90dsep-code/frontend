import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Rss, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const { content } = useData();

  const ADMIN_URL = `${import.meta.env.VITE_API_BASE_URL?.replace('/content/', '') || ''}/admin/`;

  return (
    <div className="w-full flex flex-col">
      {/* Top Banner (Honor of Knowledge and Place) */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
          <div className="h-[2px] bg-[#116843] flex-1 max-w-[200px] opacity-30"></div>
          <h2 className="text-[#116843] text-xl md:text-2xl font-bold font-serif text-center uppercase tracking-wider">
            {language === 'bn' ? 'জ্ঞান ও স্থানের মর্যাদা' : 'Honor of Knowledge and Place'}
          </h2>
          <div className="h-[2px] bg-[#116843] flex-1 max-w-[200px] opacity-30"></div>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="bg-[#0b4d36] text-white pt-12 pb-8 relative overflow-hidden">
        
        {/* Subtle Background Pattern (Right Side) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            <path d="M25 25 L75 25 L75 75 L25 75 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Column 1: Important Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/30 w-full max-w-xs !text-white">
                {language === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Important Links'}
              </h3>
              <ul className="space-y-3 text-sm font-light">
                <li><Link to="/privacy-policy" className="hover:text-[#cfa25e] transition-colors">{t('footer.privacy') || 'Privacy Policy'}</Link></li>
                <li><Link to="/terms" className="hover:text-[#cfa25e] transition-colors">{t('footer.terms') || 'Terms Of Use'}</Link></li>
                <li><Link to="/contact" className="hover:text-[#cfa25e] transition-colors">{t('footer.contact') || 'Contact Us'}</Link></li>
              </ul>
            </div>

            {/* Column 2: Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/30 w-full max-w-xs !text-white">
                {language === 'bn' ? 'সোশ্যাল মিডিয়া' : 'Social Media'}
              </h3>
              <div className="flex gap-3">
                <a href={content?.social?.twitter || "#"} className="w-10 h-10 border border-white/50 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href={content?.social?.youtube || "#"} className="w-10 h-10 border border-white/50 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href={content?.social?.facebook || "https://www.facebook.com/share/1DTJnY8w79/"} className="w-10 h-10 border border-white/50 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Column 3: Mobile Apps */}
            <div>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/30 w-full max-w-xs !text-white">
                {language === 'bn' ? 'মোবাইল অ্যাপস' : 'Mobile Apps'}
              </h3>
              <div className="flex gap-4">
                {/* Google Play Placeholder */}
                <a href="#" className="flex bg-black text-white border border-gray-600 rounded px-3 py-1.5 items-center gap-2 w-[130px] hover:bg-gray-900 transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play Store" className="w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] leading-tight text-gray-300" dir="rtl">احصل عليه من</span>
                    <span className="text-xs font-bold leading-tight">Google Play</span>
                  </div>
                </a>

                {/* App Store Placeholder */}
                <a href="#" className="flex bg-black text-white border border-gray-600 rounded px-3 py-1.5 items-center gap-2 w-[130px] hover:bg-gray-900 transition-colors">
                  <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] leading-tight text-gray-300" dir="rtl">تنزيل من</span>
                    <span className="text-xs font-bold leading-tight">App Store</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Section (Copyright & Logo) */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-12">
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <a href="#" className="hover:underline text-sm font-bold flex items-center gap-2">
                  <Rss size={16} /> RSS
                </a>
                <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer" className="hover:underline text-sm font-bold flex items-center gap-2 opacity-80 hover:opacity-100">
                  <Lock size={16} /> Admin
                </a>
              </div>
              
              <div className="text-sm font-light space-y-1">
                <p className="font-bold">
                  &copy; Developed by MUSAB KHAN {new Date().getFullYear()} v1.0.0
                </p>
                <p className="text-white/70">
                  Developed and maintained by the MUSAB KHAN
                </p>
              </div>
            </div>

            {/* Bottom Right Logo */}
        

          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;