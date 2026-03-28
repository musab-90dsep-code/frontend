import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Schedule = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Weekday' | 'Weekend'>('Weekday');

  const scheduleData = {
    Weekday: [
      { time: "05:30 AM - 07:00 AM", subject: language === 'bn' ? "ফজর ও সকালের মশক (হিফজ/মক্তব)" : "Fajr & Morning Mashq", level: "All Levels", teacher: "Assigned Ustad" },
      { time: "07:00 AM - 08:00 AM", subject: language === 'bn' ? "সকালের নাস্তা ও বিশ্রাম" : "Breakfast & Rest", level: "-", teacher: "-" },
      { time: "08:00 AM - 12:30 PM", subject: language === 'bn' ? "কিতাবের দরস (দারসে নিজামি)" : "Kitab Classes (Darse Nizami)", level: "Mutawassitah - Dawra", teacher: "Respective Asatiza" },
      { time: "12:30 PM - 02:30 PM", subject: language === 'bn' ? "যোহর, দুপুরের খাবার ও কাইলুলা" : "Zuhr, Lunch & Qailulah", level: "-", teacher: "-" },
      { time: "02:30 PM - 04:30 PM", subject: language === 'bn' ? "বিকালের দরস / হাতের লেখা" : "Afternoon Classes / Handwriting", level: "All Levels", teacher: "Respective Asatiza" },
      { time: "04:30 PM - 05:30 PM", subject: language === 'bn' ? "আসর নামাজ ও খেলাধুলা" : "Asr Prayer & Sports/Free Time", level: "-", teacher: "-" },
      { time: "05:30 PM - 07:30 PM", subject: language === 'bn' ? "মাগরিব ও মুতালাআ (স্ব-অধ্যয়ন)" : "Maghrib & Mutala'ah (Self Study)", level: "All Levels", teacher: "Nigran Ustad" },
      { time: "08:00 PM - 10:00 PM", subject: "এশা, রাতের খাবার ও তিকরার", level: "All Levels", teacher: "Nigran Ustad" },
    ],
    Weekend: [ 
      { time: "06:00 AM - 08:00 AM", subject: language === 'bn' ? "সাপ্তাহিক পরিষ্কার-পরিচ্ছন্নতা" : "Weekly Cleaning", level: "All Levels", teacher: "House Tutor" },
      { time: "08:00 AM - 10:00 AM", subject: language === 'bn' ? "সকালের নাস্তা ও বিশ্রাম" : "Breakfast & Free Time", level: "-", teacher: "-" },
      { time: "10:00 AM - 01:00 PM", subject: language === 'bn' ? "জুমার প্রস্তুতি ও ব্যক্তিগত আমল" : "Jumu'ah Preparation & Amal", level: "All Levels", teacher: "-" },
      { time: "01:30 PM - 02:30 PM", subject: language === 'bn' ? "জুমার নামাজ ও দুপুরের খাবার" : "Jumu'ah Prayer & Lunch", level: "-", teacher: "-" },
      { time: "04:30 PM - 05:30 PM", subject: language === 'bn' ? "সাপ্তাহিক তরবিয়তি মজলিস" : "Weekly Tarbiyati Majlis", level: "All Levels", teacher: "Muhtamim / Senior Ustad" },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // animate এর বদলে whileInView ব্যবহার করা হয়েছে
          viewport={{ once: true, margin: "0px 0px -50px 0px" }} // স্ক্রিনে আসার আগে অ্যানিমেশন রেডি করবে
          style={{ willChange: "opacity, transform" }} // Hardware Acceleration
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 md:mb-6"
        >
          {t('academicsPage.title')}
        </motion.h1>
        <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed">
          {t('academicsPage.subtitle')}
        </p>
      </div>

      <div className="flex justify-center mb-10 md:mb-12">
        <div className="bg-white p-1.5 rounded-lg md:rounded-sm border border-border-subtle flex flex-col sm:flex-row shadow-sm w-full sm:w-auto gap-2 sm:gap-0">
          {['Weekday', 'Weekend'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'Weekday' | 'Weekend')}
              className={`px-6 py-3.5 md:px-10 md:py-3 rounded-md md:rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-primary-dark text-white shadow-md' 
                  : 'text-text-muted hover:text-primary-dark hover:bg-slate-50'
              }`}
            >
              {tab === 'Weekday' ? (language === 'bn' ? 'দৈনন্দিন রুটিন' : 'Daily Routine') : (language === 'bn' ? 'জুমার রুটিন' : 'Friday Routine')}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} // অ্যানিমেশনের সময় কিছুটা কমানো হয়েছে
        style={{ willChange: "opacity, transform" }} // ব্রাউজারকে আগে থেকেই প্রস্তুত রাখবে
        className="bg-white rounded-xl shadow-xl border border-border-subtle overflow-hidden transform-gpu" // GPU ব্যবহার করবে
      >
        {/* মোবাইলে স্মুথ স্ক্রলিং এর জন্য WebkitOverflowScrolling যোগ করা হয়েছে */}
        <div className="overflow-x-auto w-full scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-border-subtle">
                <th className="p-4 md:p-6 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.time')}</th>
                <th className="p-4 md:p-6 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.subject')}</th>
                <th className="p-4 md:p-6 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.level')}</th>
                <th className="p-4 md:p-6 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-muted">{t('academicsPage.instructor')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {scheduleData[activeTab].map((item, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-4 md:p-6 font-mono text-xs md:text-sm font-medium text-primary-dark whitespace-nowrap">{item.time}</td>
                  <td className="p-4 md:p-6 font-serif text-base md:text-xl font-bold text-primary-dark group-hover:text-accent-emerald transition-colors">{item.subject}</td>
                  <td className="p-4 md:p-6">
                    {item.level !== "-" ? (
                      <span className="bg-emerald-50 text-accent-emerald px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-emerald-100 whitespace-nowrap">
                        {item.level}
                      </span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="p-4 md:p-6 text-xs md:text-sm font-medium text-text-muted whitespace-nowrap">{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-8 md:mt-10 text-center px-4">
        <p className="text-xs md:text-sm text-text-muted font-light italic">
          {language === 'bn' ? '* ঋতু পরিবর্তন এবং রমজান মাসে মাদ্রাসার রুটিনে পরিবর্তন আসতে পারে।' : '* The schedule is subject to change according to seasons and during Ramadan.'}
        </p>
      </div>
    </div>
  );
};

export default Schedule;