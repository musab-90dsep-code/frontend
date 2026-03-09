import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Schedule = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Weekday' | 'Weekend'>('Weekday');

  const scheduleData = {
    Weekday: [
      { time: "08:00 AM - 09:00 AM", subject: "Quran Memorization (Hifz)", level: "All Levels", teacher: "Sheikh Omar" },
      { time: "09:00 AM - 10:00 AM", subject: "Arabic Grammar (Nahw)", level: "Intermediate", teacher: "Ustadh Bilal" },
      { time: "10:00 AM - 11:00 AM", subject: "Fiqh (Jurisprudence)", level: "Advanced", teacher: "Sheikh Abdullah" },
      { time: "11:00 AM - 11:30 AM", subject: "Break / Dhuhr Prep", level: "-", teacher: "-" },
      { time: "11:30 AM - 12:30 PM", subject: "Islamic History", level: "Beginner", teacher: "Ustadha Maryam" },
      { time: "01:00 PM - 02:00 PM", subject: "Mathematics", level: "Grade 5-8", teacher: "Dr. Sarah" },
    ],
    Weekend: [
      { time: "10:00 AM - 12:00 PM", subject: "Sunday School (Basics)", level: "Kids (5-10)", teacher: "Ustadha Maryam" },
      { time: "10:00 AM - 12:00 PM", subject: "Youth Halaqa", level: "Teens (13-18)", teacher: "Ustadh Bilal" },
      { time: "02:00 PM - 04:00 PM", subject: "Adult Quran Class", level: "Adults", teacher: "Sheikh Omar" },
      { time: "04:00 PM - 05:30 PM", subject: "Seerah Studies", level: "Open to Public", teacher: "Sheikh Abdullah" },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-primary-dark mb-6"
        >
          {t('academicsPage.title')}
        </motion.h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">
          {t('academicsPage.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1.5 rounded-sm border border-border-subtle inline-flex shadow-sm">
          {['Weekday', 'Weekend'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'Weekday' | 'Weekend')}
              className={`px-10 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-primary-dark text-white shadow-md' 
                  : 'text-text-muted hover:text-primary-dark hover:bg-slate-50'
              }`}
            >
              {tab === 'Weekday' ? t('academicsPage.weekday') : t('academicsPage.weekend')} {t('academicsPage.classes')}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl border border-border-subtle overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-border-subtle">
                <th className="p-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.time')}</th>
                <th className="p-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.subject')}</th>
                <th className="p-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.level')}</th>
                <th className="p-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.instructor')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {scheduleData[activeTab].map((item, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-6 font-mono text-sm font-medium text-primary-dark whitespace-nowrap">{item.time}</td>
                  <td className="p-6 font-serif text-xl font-bold text-primary-dark group-hover:text-accent-emerald transition-colors">{item.subject}</td>
                  <td className="p-6">
                    {item.level !== "-" ? (
                      <span className="bg-emerald-50 text-accent-emerald px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                        {item.level}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="p-6 text-sm font-medium text-text-muted">{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-10 text-center">
        <p className="text-sm text-text-muted font-light italic">
          {t('academicsPage.note')}
        </p>
      </div>
    </div>
  );
};

export default Schedule;
