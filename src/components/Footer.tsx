import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext'; // আপনার ডাটা কনটেক্সট ইমপোর্ট করা হলো

const Footer = () => {
  const { t, language } = useLanguage();
  const { content } = useData(); // এখানে ডাটা আগে থেকেই ফেচ করা আছে

  // ১. আপনার .env এর VITE_API_BASE_URL ব্যবহার করে সরাসরি এডমিন লিঙ্ক
  // যেহেতু আপনি ইতিমধ্যেই ডাটা কনটেক্সটে এটি ব্যবহার করেছেন, তাই এখানে নতুন কোনো লজিক লাগবে না।
  const ADMIN_URL = `${import.meta.env.VITE_API_BASE_URL.replace('/content/', '')}/admin/`;

  return (
    <footer className="bg-primary-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-light rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold text-primary-dark flex items-center justify-center rounded-full font-serif text-2xl font-bold shadow-lg">
                M
              </div>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight uppercase">
                {language === 'bn' ? 'মারকাযুল ফিকরী' : 'MARKAZUL FIKRI'}
              </h3>
            </div>
            {/* ডাইনামিক ডেসক্রিপশন */}
            <p className="text-slate-300 text-lg leading-relaxed max-w-md font-light">
              {content?.footer?.description || t('footer.desc')}
            </p>
            <div className="flex space-x-4 pt-4">
               {/* সোশ্যাল লিঙ্কগুলো আপনার ডাটা থেকে আসতে পারে */}
               <a href={content?.social?.facebook || "#"} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-primary-dark transition-all duration-300"><Facebook size={20} /></a>
               <a href={content?.social?.twitter || "#"} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-primary-dark transition-all duration-300"><Twitter size={20} /></a>
               <a href={content?.social?.instagram || "#"} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold hover:bg-accent-gold hover:text-primary-dark transition-all duration-300"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-accent-gold mb-8">{t('footer.academics')}</h4>
            <ul className="space-y-4 text-base text-slate-300 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={14} className="text-accent-gold group-hover:translate-x-1 transition-transform" /> {t('footer.history')}</Link></li>
              <li><Link to="/teachers" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={14} className="text-accent-gold group-hover:translate-x-1 transition-transform" /> {t('footer.faculty')}</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={14} className="text-accent-gold group-hover:translate-x-1 transition-transform" /> {t('footer.schedule')}</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={14} className="text-accent-gold group-hover:translate-x-1 transition-transform" /> {t('footer.events')}</Link></li>
            </ul>
          </div>

          {/* Contact Info - DataContext থেকে আসছে */}
          <div className="md:col-span-4">
            <h4 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-accent-gold mb-8">{t('footer.contact')}</h4>
            <ul className="space-y-6 text-base text-slate-300 font-light">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-accent-gold">
                  <MapPin size={18} />
                </div>
                <span className="leading-relaxed mt-2">
                  {content?.contact?.address || '১৫/১ কৃষ্টপুর,আলিয়া মাদ্রাসা মোড় চরপাড়া রোড সদর ময়মনসিংহ।'}
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-accent-gold">
                  <Phone size={18} />
                </div>
                <span className="mt-1">{content?.contact?.phone || '+8801929629508'}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-accent-gold">
                  <Mail size={18} />
                </div>
                <span className="mt-1">{content?.contact?.email || 'info@madrasaalnur.edu'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-light">
  <p>&copy; {new Date().getFullYear()} {language === 'bn' ? 'মারকাযুল ফিকরী' : 'MARKAZUL FIKRI'}. {t('footer.rights')}</p>
  
  <div className="flex space-x-8 mt-6 md:mt-0 items-center">
    {/* অ্যাডমিন বাটনটিকে সবার বামে নিয়ে আসা হয়েছে এবং গ্যাপ বাড়ানো হয়েছে */}
    <a 
      href={ADMIN_URL} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center gap-2 hover:text-accent-gold transition-colors opacity-60 hover:opacity-100 pr-6 border-r border-white/10"
    >
      <Lock size={12} /> {language === 'bn' ? 'অ্যাডমিন' : 'Admin'}
    </a>

    <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
    <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;