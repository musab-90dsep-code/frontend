import { motion } from 'motion/react';
import { BookOpen, Users, Award, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl font-bold text-primary-dark mb-8"
        >
          {t('about.title')}
        </motion.h1>
        <p className="text-xl text-text-muted leading-relaxed font-light">
          {t('about.subtitle')}
        </p>
      </div>

      {/* History Section - Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 relative"
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/history/1200/900" 
              alt="Madrasa History" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-50 rounded-full -z-10"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-8"
        >
          <h2 className="font-serif text-4xl font-bold text-primary-dark leading-tight">{t('about.historyTitle')} <br/><span className="text-accent-emerald italic">{t('about.historyTitleHighlight')}</span></h2>
          <div className="space-y-6 text-lg text-text-muted font-light leading-relaxed">
            <p>
              <span className="float-left text-7xl font-serif text-accent-emerald leading-[0.8] mr-3 mt-2">{t('about.historyP1').charAt(0)}</span>
              {t('about.historyP1').substring(1)}
            </p>
            <p>
              {t('about.historyP2')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision - Split Layout */}
      <div className="bg-primary-dark rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-8">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white mb-6">{t('about.missionTitle')}</h3>
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              {t('about.missionDesc')}
            </p>
          </div>
          
          <div className="p-12 md:p-20 bg-slate-900/50">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-8">
              <span className="text-3xl">👁️</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white mb-6">{t('about.visionTitle')}</h3>
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              {t('about.visionDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section - Bento Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary-dark mb-6">{t('home.features.title')}</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">{t('home.features.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {/* Large Feature */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-primary-dark text-white p-10 rounded-3xl shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-accent-gold">
                <BookOpen size={32} />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold mb-4">{t('home.features.f1Title')}</h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                  {t('home.features.f1Desc')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-border-subtle flex flex-col justify-between group"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-accent-gold transition-colors duration-300">
              <Users size={28} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary-dark mb-3">{t('home.features.f2Title')}</h3>
              <p className="text-text-muted leading-relaxed">
                {t('home.features.f2Desc')}
              </p>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-border-subtle flex flex-col justify-between group"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-accent-gold transition-colors duration-300">
              <Award size={28} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary-dark mb-3">{t('home.features.f3Title')}</h3>
              <p className="text-text-muted leading-relaxed">
                {t('home.features.f3Desc')}
              </p>
            </div>
          </motion.div>

          {/* Medium Feature */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-accent-sand p-10 rounded-3xl shadow-sm border border-border-subtle relative overflow-hidden group"
          >
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
              <GraduationCap size={250} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-dark shadow-sm">
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-primary-dark mb-4">{t('home.features.f4Title')}</h3>
                <p className="text-text-muted text-lg leading-relaxed max-w-md">
                  {t('home.features.f4Desc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Message */}
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="font-serif text-4xl font-bold text-primary-dark">{t('about.principalTitle')}</h2>
        <div className="relative">
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-serif text-border-subtle opacity-50">"</span>
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-primary-dark italic relative z-10">
            {t('about.principalQuote')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 pt-8">
          <img 
            src="https://picsum.photos/seed/principal/150/150" 
            alt="Principal" 
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold font-serif text-2xl text-primary-dark">{t('about.principalName')}</p>
            <p className="text-sm font-medium text-accent-emerald uppercase tracking-[0.2em] mt-1">{t('about.principalRole')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
