import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useState } from 'react';
import { Teacher } from '../types/teacher';
import { X, Award, BookOpen, UserCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? API_URL.replace('/content', '') : '';

// --- Framer Motion Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // অ্যানিমেশন আরও দ্রুত করা হয়েছে
  }
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const Teachers = () => {
  const { t, language } = useLanguage();
  const { content, loading } = useData();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const teachers = content?.teachers || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/30">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/30 min-h-screen overflow-hidden pb-24">
      {/* Decorative Global Background */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-gold/10 blur-[60px] rounded-full -z-10 transform-gpu"></div>
          
          <span className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">
            Our Mentors
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 tracking-tight">
            {t('teachers.title')}
          </h1>
          <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
            {t('teachers.subtitle')}
          </p>
        </motion.div>

        {/* Teachers Grid - Changed to 4 columns on large screens */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "50px", amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"
        >
          {teachers.map((teacher) => (
            <motion.div
              variants={fadeInUp}
              key={teacher.id}
              className="group flex flex-col items-center bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-1.5 transition-all duration-300 transform-gpu will-change-transform"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-square sm:aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-slate-100 shadow-inner">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-dark to-transparent mix-blend-overlay"></div>
                
                <img 
                  src={teacher.image_url}
                  alt={language === 'bn' ? teacher.name_bn : teacher.name_en} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0 transform-gpu will-change-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Information Section */}
              <div className="text-center flex flex-col flex-grow w-full">
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary-dark mb-1.5 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {language === 'bn' ? teacher.name_bn : teacher.name_en}
                </h3>
                <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-4 px-3 py-1 bg-emerald-50 rounded-full inline-block mx-auto">
                  {language === 'bn' ? teacher.role_bn : teacher.role_en}
                </p>
                
                {/* Compact Button */}
                <div className="mt-auto pt-2 w-full">
                  <button 
                    onClick={() => setSelectedTeacher(teacher)}
                    className="w-full py-2.5 bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-primary-dark hover:text-white hover:border-primary-dark transition-all duration-300 shadow-sm"
                  >
                    {language === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Profile Modal (Popup) */}
        <AnimatePresence>
          {selectedTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedTeacher(null)}
                className="absolute inset-0 bg-primary-dark/70 backdrop-blur-sm"
              />
              
              {/* Modal Content */}
              <motion.div 
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[2rem] w-full max-w-2xl relative shadow-2xl z-10 overflow-hidden transform-gpu will-change-transform flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-primary-dark to-emerald-900 p-6 sm:p-8 flex justify-between items-start text-white shrink-0">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-inner shrink-0 bg-white/10">
                      <img 
                        src={selectedTeacher.image_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
                        {language === 'bn' ? selectedTeacher.name_bn : selectedTeacher.name_en}
                      </h3>
                      <p className="text-accent-gold font-bold text-xs uppercase tracking-wider">
                        {language === 'bn' ? selectedTeacher.role_bn : selectedTeacher.role_en}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-grow">
                  <div className="space-y-6">
                    {/* Bio Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-emerald-700">
                        <UserCircle size={20} />
                        <h4 className="font-bold text-lg">
                          {language === 'bn' ? 'সংক্ষিপ্ত জীবনী' : 'Biography'}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        {language === 'bn' ? selectedTeacher.bio_bn : selectedTeacher.bio_en}
                      </p>
                    </div>

                    {/* Qualifications & Subjects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2 text-emerald-700">
                          <Award size={18} />
                          <h4 className="font-bold text-sm uppercase tracking-wider">
                            {language === 'bn' ? 'যোগ্যতা' : 'Qualifications'}
                          </h4>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">
                          {language === 'bn' ? 'উচ্চতর ডিগ্রি সম্পন্ন' : 'Higher Degree Completed'}
                        </p>
                      </div>

                      <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100">
                        <div className="flex items-center gap-2 mb-2 text-yellow-700">
                          <BookOpen size={18} />
                          <h4 className="font-bold text-sm uppercase tracking-wider">
                            {language === 'bn' ? 'বিষয়সমূহ' : 'Subjects'}
                          </h4>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">
                          {language === 'bn' ? 'কুরআন ও সুন্নাহ' : 'Quran & Sunnah'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0 text-center">
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="px-8 py-2.5 bg-primary-dark text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full sm:w-auto"
                  >
                    {language === 'bn' ? 'বন্ধ করুন' : 'Close Profile'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Teachers;