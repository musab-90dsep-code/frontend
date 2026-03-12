import { motion } from 'motion/react';
import { BookOpen, Users, Award, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// --- Framer Motion Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-32">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="text-center max-w-4xl mx-auto relative"
        >
          {/* Decorative Background Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-gold/20 blur-[80px] rounded-full -z-10 transform-gpu"></div>
          
          <motion.span variants={fadeInUp} className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
            Our Heritage
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl font-bold text-primary-dark mb-8 leading-tight tracking-tight">
            {t('about.title')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        {/* History Section - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeRight}
            className="lg:col-span-7 relative transform-gpu will-change-transform"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative group">
              <img 
                src="https://picsum.photos/seed/history/1200/900" 
                alt="Madrasa History" 
                loading="lazy" decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 transform-gpu will-change-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 bg-emerald-100/50 rounded-full blur-2xl -z-10 transform-gpu"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent-gold/20 rounded-full blur-2xl -z-10 transform-gpu"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeLeft}
            className="lg:col-span-5 space-y-8 transform-gpu will-change-transform"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark leading-tight">
              {t('about.historyTitle')} <br/>
              <span className="text-emerald-600 italic font-light">{t('about.historyTitleHighlight')}</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
              <p className="relative">
                <span className="float-left text-[5rem] md:text-[6rem] font-serif text-accent-gold leading-[0.7] mr-4 mt-2 opacity-80 select-none">
                  {t('about.historyP1').charAt(0)}
                </span>
                {t('about.historyP1').substring(1)}
              </p>
              <p>
                {t('about.historyP2')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision - Split Layout with Hover Effects */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeInUp}
          className="bg-gradient-to-br from-primary-dark to-emerald-950 rounded-[2.5rem] overflow-hidden shadow-2xl transform-gpu will-change-transform"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="group p-12 md:p-20 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500 transform-gpu">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-emerald-300 transition-colors">{t('about.missionTitle')}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {t('about.missionDesc')}
              </p>
            </div>
            
            <div className="group p-12 md:p-20 hover:bg-white/5 transition-colors duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500 transform-gpu">
                <span className="text-3xl text-white">👁️</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-accent-gold transition-colors">{t('about.visionTitle')}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {t('about.visionDesc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Section - Bento Grid */}
        <section>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 block">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark mb-6">{t('home.features.title')}</h2>
            <div className="w-20 h-1 bg-accent-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('home.features.subtitle')}</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[340px]"
          >
            {/* Large Feature */}
            <motion.div 
              variants={fadeInUp}
              className="md:col-span-2 bg-gradient-to-br from-primary-dark to-emerald-900 text-white p-10 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden group transform-gpu will-change-transform"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 transform-gpu"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-accent-gold border border-white/10 shadow-inner">
                  <BookOpen size={32} />
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">{t('home.features.f1Title')}</h3>
                  <p className="text-emerald-50/80 text-lg leading-relaxed max-w-lg">
                    {t('home.features.f1Desc')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Small Feature 1 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500 transform-gpu will-change-transform"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                <Users size={30} />
              </div>
              <div className="mt-8 md:mt-0">
                <h3 className="font-serif text-2xl font-bold text-primary-dark mb-3">{t('home.features.f2Title')}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {t('home.features.f2Desc')}
                </p>
              </div>
            </motion.div>

            {/* Small Feature 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500 transform-gpu will-change-transform"
            >
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:bg-accent-gold group-hover:text-white transition-colors duration-500">
                <Award size={30} />
              </div>
              <div className="mt-8 md:mt-0">
                <h3 className="font-serif text-2xl font-bold text-primary-dark mb-3">{t('home.features.f3Title')}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {t('home.features.f3Desc')}
                </p>
              </div>
            </motion.div>

            {/* Medium Feature */}
            <motion.div 
              variants={fadeInUp}
              className="md:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 p-10 md:p-12 rounded-[2.5rem] shadow-lg border border-amber-100 relative overflow-hidden group transform-gpu will-change-transform"
            >
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                <GraduationCap size={300} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                  <GraduationCap size={32} />
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">{t('home.features.f4Title')}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg font-medium">
                    {t('home.features.f4Desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Leadership Message */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeInUp}
          className="max-w-4xl mx-auto text-center space-y-12 bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 relative transform-gpu will-change-transform"
        >
          {/* Quote Icon watermark */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[150px] font-serif text-emerald-50 leading-none select-none pointer-events-none -z-10">
            "
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark">{t('about.principalTitle')}</h2>
          
          <p className="font-serif text-xl md:text-3xl leading-relaxed text-gray-700 italic relative z-10">
            {t('about.principalQuote')}
          </p>
          
          <div className="flex flex-col items-center gap-5 pt-6 border-t border-gray-100 w-3/4 mx-auto">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/principal/150/150" 
                alt="Principal" 
                loading="lazy" decoding="async"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="font-bold font-serif text-2xl text-primary-dark mb-1">{t('about.principalName')}</p>
              <p className="text-xs md:text-sm font-bold text-accent-gold uppercase tracking-[0.2em] bg-yellow-50 inline-block px-4 py-1.5 rounded-full">{t('about.principalRole')}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;