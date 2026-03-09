import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext'; // DataContext ব্যবহার করা হয়েছে

// .env থেকে API URL এবং BASE URL কনফিগারেশন
const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? API_URL.replace('/content', '') : '';

const Events = () => {
  const { t, language } = useLanguage();
  const { content, loading } = useData(); // গ্লোবাল ডাটা লোড করা হয়েছে

  // DataContext থেকে ইভেন্ট লিস্ট নেওয়া
  const events = content?.events || [];

  if (loading) {
    return <div className="py-20 text-center">Loading Events...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-primary-dark mb-6"
        >
          {t('eventsPage.title')}
        </motion.h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">
          {t('eventsPage.subtitle')}
        </p>
      </div>

      <div className="space-y-16">
        {events.map((event: any, idx: number) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl border border-border-subtle hover:shadow-2xl transition-all duration-500 group"
          >
            {/* ইমেজ সেকশন */}
            <div className="md:w-5/12 h-72 md:h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={event.image.startsWith('http') ? event.image : `${BASE_URL}${event.image}`} 
                alt={language === 'bn' ? event.title_bn : event.title_en} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="md:w-7/12 p-10 md:p-14 flex flex-col justify-center">
              <div className="flex flex-wrap gap-6 mb-6 text-sm text-text-muted font-medium uppercase tracking-wider">
                <span className="flex items-center gap-2 text-accent-emerald">
                  <Calendar size={18} /> {language === 'bn' ? event.date_bn : event.date_en}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} /> {language === 'bn' ? event.time_bn : event.time_en}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} /> {language === 'bn' ? event.location_bn : event.location_en}
                </span>
              </div>
              
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-6 group-hover:text-accent-emerald transition-colors">
                {language === 'bn' ? event.title_bn : event.title_en}
              </h3>
              
              <p className="text-text-muted leading-relaxed font-light text-lg mb-8">
                {language === 'bn' ? event.desc_bn : event.desc_en}
              </p>
              
              <button className="self-start flex items-center gap-2 text-primary-dark font-bold hover:text-accent-emerald transition-colors uppercase tracking-[0.2em] text-sm">
                {t('eventsPage.detailsBtn')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;