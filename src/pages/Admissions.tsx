import { motion } from 'motion/react';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Admissions = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-primary-dark mb-6"
        >
          {t('admissions.title')}
        </motion.h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">
          {t('admissions.subtitle')}
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            step: "01",
            title: t('admissions.step1Title'),
            desc: t('admissions.step1Desc')
          },
          {
            step: "02",
            title: t('admissions.step2Title'),
            desc: t('admissions.step2Desc')
          },
          {
            step: "03",
            title: t('admissions.step3Title'),
            desc: t('admissions.step3Desc')
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white p-10 rounded-xl shadow-lg border border-border-subtle relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
          >
            <span className="absolute top-0 right-0 text-9xl font-serif font-bold text-slate-50 -mr-4 -mt-4 group-hover:text-emerald-50 transition-colors z-0">
              {item.step}
            </span>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary-dark text-white flex items-center justify-center rounded-sm font-serif text-xl font-bold mb-8">
                {item.step}
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary-dark mb-4">{item.title}</h3>
              <p className="text-text-muted leading-relaxed font-light">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Requirements & Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Requirements */}
        <div className="bg-white rounded-2xl p-12 shadow-xl border border-border-subtle">
          <h3 className="font-serif text-4xl font-bold text-primary-dark mb-8">{t('admissions.reqTitle')}</h3>
          <ul className="space-y-6">
            {[
              t('admissions.req1'),
              t('admissions.req2'),
              t('admissions.req3'),
              t('admissions.req4'),
              t('admissions.req5')
            ].map((req, idx) => (
              <li key={idx} className="flex items-start gap-4 text-lg text-text-main font-light">
                <CheckCircle className="text-accent-emerald mt-1 flex-shrink-0" size={24} />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tuition & Fees */}
        <div className="bg-primary-dark text-white rounded-2xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <h3 className="font-serif text-4xl font-bold text-white mb-8 relative z-10">{t('admissions.feeTitle')}</h3>
          <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-300 font-light text-lg">{t('admissions.feeReg')} <span className="text-sm opacity-70 block">{t('admissions.feeRegTime')}</span></span>
              <span className="font-serif font-bold text-3xl">{t('admissions.feeRegAmt')}</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-300 font-light text-lg">{t('admissions.feeTuit1')} <span className="text-sm opacity-70 block">{t('admissions.feeTuit1Time')}</span></span>
              <span className="font-serif font-bold text-3xl">{t('admissions.feeTuit1Amt')}</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="text-slate-300 font-light text-lg">{t('admissions.feeTuit2')} <span className="text-sm opacity-70 block">{t('admissions.feeTuit2Time')}</span></span>
              <span className="font-serif font-bold text-3xl">{t('admissions.feeTuit2Amt')}</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-slate-300 font-light text-lg">{t('admissions.feeBooks')} <span className="text-sm opacity-70 block">{t('admissions.feeBooksTime')}</span></span>
              <span className="font-serif font-bold text-3xl">{t('admissions.feeBooksAmt')}</span>
            </div>
          </div>
          <p className="mt-10 text-sm text-slate-400 font-light italic relative z-10">
            {t('admissions.feeNote')}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white p-16 rounded-2xl shadow-xl border border-border-subtle">
        <h2 className="font-serif text-4xl font-bold text-primary-dark mb-8">{t('admissions.ctaTitle')}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-primary-dark text-white px-10 py-5 rounded-sm font-medium hover:bg-accent-emerald transition-colors flex items-center justify-center gap-3 shadow-lg text-lg">
            <FileText size={22} /> {t('admissions.ctaBtn1')}
          </button>
          <button className="bg-white border-2 border-primary-dark text-primary-dark px-10 py-5 rounded-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 shadow-sm text-lg">
            <Download size={22} /> {t('admissions.ctaBtn2')}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Admissions;
