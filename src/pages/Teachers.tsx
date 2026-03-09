import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext'; // DataContext ইমপোর্ট করা হয়েছে
import { useState } from 'react';
import { Teacher } from '../types/teacher';

// .env থেকে API URL এবং BASE URL কনফিগারেশন
const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? API_URL.replace('/content', '') : '';

const Teachers = () => {
  const { t, language } = useLanguage(); // language স্টেট রিট্রিভ করা হয়েছে
  const { content, loading } = useData(); // গ্লোবাল ডাটা এবং লোডিং স্টেট নেওয়া হয়েছে
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // DataContext থেকে টিচারদের লিস্ট নেওয়া, ডাটা না থাকলে খালি অ্যারে
  const teachers = content?.teachers || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* হেডার সেকশন */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-primary-dark mb-6"
        >
          {t('teachers.title')}
        </motion.h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">
          {t('teachers.subtitle')}
        </p>
      </div>

      {/* টিচার গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {teachers.map((teacher, idx) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            {/* ছবি সেকশন */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-lg w-4/5 mx-auto">
              <img 
                src={teacher.image.startsWith('http') ? teacher.image : `${BASE_URL}${teacher.image}`} 
                alt={language === 'bn' ? teacher.name_bn : teacher.name_en} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* তথ্য সেকশন */}
            <div className="text-center">
              <h3 className="font-serif text-3xl font-bold text-primary-dark mb-2">
                {language === 'bn' ? teacher.name_bn : teacher.name_en}
              </h3>
              <p className="text-accent-emerald font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                {language === 'bn' ? teacher.role_bn : teacher.role_en}
              </p>
              
              <button 
                onClick={() => setSelectedTeacher(teacher)}
                className="px-6 py-2 bg-primary-dark text-white rounded-full hover:bg-primary-dark/90 transition-colors"
              >
                {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ডিটেইলস মোডাল (Popup) */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-primary-dark text-2xl"
              >
                ✕
              </button>
              <h3 className="font-serif text-4xl font-bold text-primary-dark mb-2">
                {language === 'bn' ? selectedTeacher.name_bn : selectedTeacher.name_en}
              </h3>
              <p className="text-accent-emerald font-semibold text-sm uppercase tracking-[0.2em] mb-6">
                {language === 'bn' ? selectedTeacher.role_bn : selectedTeacher.role_en}
              </p>
              <p className="text-text-muted leading-relaxed font-light text-lg">
                {language === 'bn' ? selectedTeacher.bio_bn : selectedTeacher.bio_en}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teachers;