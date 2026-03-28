import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, Bell, MapPin, Award, GraduationCap, BookOpen, Users, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import Carousel from '../components/Carousel';
import Typewriter from 'typewriter-effect';
import { useData } from '../context/DataContext';

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? new URL(API_URL).origin : '';

// --- Framer Motion Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Cloudinary URL-এ Transformation যুক্ত করার ফাংশন
const getOptimizedHeroImage = (url: string) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace(
    '/upload/', 
    '/upload/c_pad,w_1920,h_1080,b_auto,q_auto,f_auto/'
  );
};

// --- Fallback Image Handler ---
// এটি পুরনো ফোনের জন্য ছবি ফেইল করলে কল হবে
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.loading = "eager"; // লেজি লোডিং অফ করে দিবে
  if (target.src.includes('f_auto')) {
    target.src = target.src.replace('f_auto', 'f_jpg'); // WebP থেকে JPG তে ফোর্স করবে
  }
};

const Home = () => {
  const { t, i18n } = useLanguage();
  const { content, loading, error } = useData();

  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [startNewsIndex, setStartNewsIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const ITEMS_PER_PAGE = 3;
  const statsIcons = [<Users />, <BookOpen />, <GraduationCap />, <Award />];

  useEffect(() => {
    if (content?.contents?.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % content.contents.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content?.contents]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );
  if (error) return <div className="text-red-600 text-center mt-20 font-medium bg-red-50 p-4 rounded-xl max-w-lg mx-auto">{error}</div>;
  if (!content) return null;

  const nextNews = () => {
    if (content?.news && startNewsIndex + 1 + ITEMS_PER_PAGE < content.news.length) {
      setStartNewsIndex(prev => prev + ITEMS_PER_PAGE);
    }
  };

  const prevNews = () => {
    if (startNewsIndex >= ITEMS_PER_PAGE) {
      setStartNewsIndex(prev => prev - ITEMS_PER_PAGE);
    } else {
      setStartNewsIndex(0);
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24 bg-slate-50/30">

      {/* Notice Modal (আগের মতোই থাকবে) */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/70 backdrop-blur-md p-4"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-8 md:p-10 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden transform-gpu will-change-transform"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-gold to-yellow-500"></div>
              <div className="flex items-center gap-3 mb-6 text-accent-gold">
                <Bell size={24} className="animate-bounce" />
                <span className="font-bold tracking-widest uppercase text-xs">Official Notice</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-dark mb-4 leading-tight">{selectedNotice.title}</h2>
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2 font-medium bg-slate-100 inline-flex px-3 py-1.5 rounded-lg">
                <Calendar size={16} className="text-accent-gold" /> {selectedNotice.date}
              </p>
              <div className="prose prose-slate max-w-none max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                <p className="text-gray-700 leading-relaxed text-lg">{selectedNotice.content}</p>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="mt-8 w-full bg-primary-dark hover:bg-primary-light text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Close Notice
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden bg-primary-dark">
          {content.contents.map((item: any, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: index === currentSlide ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "linear" }}
                src={getOptimizedHeroImage(item.image_url)}
                alt="Madrasa Background"
                className="w-full h-full object-cover transform-gpu will-change-transform"
                referrerPolicy="no-referrer"
                decoding="async"
                onError={handleImageError} // ১. Hero ইমেজে ফলব্যাক যোগ করা হলো
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/50 to-primary-dark/95 mix-blend-multiply transform-gpu"></div>
            </div>
          ))}

          {/* Indicators */}
          {content.contents.length > 1 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {content.contents.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hero Text Content (আগের মতোই থাকবে) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold !text-white mb-6 uppercase tracking-tight leading-tight drop-shadow-2xl will-change-transform"
          >
            <Typewriter
              key={t('home.title1')}
              options={{ autoStart: true, loop: false, cursor: "|", delay: 60, deleteSpeed: Infinity }}
              onInit={(typewriter) => {
                typewriter.typeString(`${t('home.title1')} <br /> <span class="text-accent-gold">${t('home.title2')}</span>`).start();
              }}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-200 font-medium max-w-3xl leading-relaxed drop-shadow-md will-change-transform"
          >
            {t('home.subtitle')}
          </motion.p>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 will-change-transform"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section (আগের মতোই থাকবে) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-30 mb-20">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px", amount: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 transform-gpu will-change-transform"
        >
          {content?.stats?.map((stat: any, i: number) => (
            <motion.div
              variants={fadeInUp} whileHover={{ y: -8, scale: 1.02 }} key={i}
              className="text-center flex flex-col items-center gap-4 lg:border-r border-gray-200/60 last:border-0 will-change-transform"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner mb-2 transform rotate-3 hover:rotate-0 transition-transform">
                {statsIcons[i]}
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">{stat.number}</h3>
                <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">
                  {i18n?.language === 'bn' ? stat.label_bn : stat.label_en}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Notices Section (আগের মতোই থাকবে) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-2 block">Important Announcements</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">{t('home.notices.title')}</h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "50px" }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary-dark to-emerald-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col p-1.5 relative transform-gpu will-change-transform"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transform-gpu"></div>
          
          <div className="bg-white rounded-[2.2rem] flex flex-col relative z-10 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl shadow-inner">
                  <Bell size={24} className="text-emerald-600 animate-pulse" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary-dark">Official Notices</h3>
              </div>
              <Link to="/notices" className="text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 px-5 py-2.5 rounded-xl transition-all shadow-sm">
                View All
              </Link>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar h-[400px] relative">
              <div className="flex flex-col gap-4">
                {content.notices.map((notice: any, idx: number) => (
                  <motion.div 
                    whileHover={{ x: 5, scale: 1.01 }} key={idx} onClick={() => setSelectedNotice(notice)} 
                    className="group flex gap-5 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer transform-gpu will-change-transform"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-accent-gold shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)] group-hover:scale-150 transition-transform group-hover:bg-emerald-500"></div>
                    <div>
                      <p className="text-primary-dark font-bold text-base mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">{notice.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 font-bold uppercase tracking-wider bg-gray-50 inline-flex px-3 py-1.5 rounded-lg">
                        <Calendar size={14} className="text-accent-gold" /> {notice.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-[2.2rem]"></div>
          </div>
        </motion.div>
      </section>

      {/* News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "50px" }}
          className="flex justify-between items-end mb-10 will-change-transform"
        >
          <div>
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-2 block">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">{t('home.news.title')}</h2>
          </div>
          <Link to="/news" className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm hover:shadow-md">
            Show All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Latest News */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "50px" }} transition={{ duration: 0.6 }}
            className="lg:col-span-7 will-change-transform"
          >
            {content?.news?.length > 0 && (
              <div className="group rounded-[2rem] p-5 flex flex-col w-full bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all h-full transform-gpu min-h-[450px]">
                <div className="rounded-2xl overflow-hidden mb-6 relative h-64 sm:h-80 w-full bg-gray-100 shrink-0">
                  <motion.img
                    key={content.news[0].id}
                    src={content.news[0].image_url}
                    alt={content.news[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform"
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError} // ২. Latest News ইমেজে ফলব্যাক যোগ করা হলো
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                    Latest News
                  </div>
                </div>

                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                      {content.news[0].title}
                    </h3>
                    <p className="text-gray-500 line-clamp-3 text-lg">{content.news[0].summary || content.news[0].description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-400 flex items-center gap-2"><Calendar size={16} /> {content.news[0].date}</span>
                    <Link to={`/news/${content.news[0].id}`} className="w-12 h-12 bg-gray-50 hover:bg-emerald-600 hover:text-white rounded-full flex items-center justify-center transition-all group-hover:shadow-md">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Side: Paginated Small News */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex flex-col gap-4 flex-grow">
              <AnimatePresence mode="popLayout">
                {content?.news?.slice(startNewsIndex + 1, startNewsIndex + 1 + ITEMS_PER_PAGE).map((newsItem: any, index: number) => (
                  <motion.div
                    key={newsItem.id || index}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
                    className="group border border-gray-100 rounded-2xl p-4 flex items-center gap-5 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all transform-gpu will-change-transform"
                  >
                    <div className="w-32 h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative shadow-inner">
                      <img 
                        src={newsItem.image_url} 
                        alt={newsItem.title} 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 transform-gpu will-change-transform" 
                        onError={handleImageError} // ৩. Small News ইমেজে ফলব্যাক যোগ করা হলো
                      />
                    </div>
                    <div className="grow min-w-0 pr-2">
                      <p className="text-xs text-accent-gold font-bold uppercase tracking-wider mb-2">{newsItem.date}</p>
                      <h3 className="text-lg font-bold text-primary-dark line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                        {newsItem.title}
                      </h3>
                    </div>
                    <Link to={`/news/${newsItem.id}`} className="p-3 bg-gray-50 group-hover:bg-emerald-50 text-gray-400 group-hover:text-emerald-600 rounded-xl transition-colors shrink-0">
                      <ArrowRight size={20} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls (আগের মতোই থাকবে) */}
            <div className="flex justify-between items-center mt-6 px-2">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(Math.max(0, content.news.length - 1) / ITEMS_PER_PAGE) }).map((_, i) => (
                  <span key={i} className={`h-2 rounded-full transition-all duration-300 ${Math.floor(startNewsIndex / ITEMS_PER_PAGE) === i ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-200'}`} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={prevNews} disabled={startNewsIndex === 0} className={`p-3 rounded-full border border-gray-200 transition-all ${startNewsIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-105'}`}>
                  <ArrowLeft size={18} />
                </button>
                <button onClick={nextNews} disabled={startNewsIndex + 1 + ITEMS_PER_PAGE >= content?.news?.length} className={`p-3 rounded-full bg-primary-dark text-white transition-all shadow-md ${startNewsIndex + 1 + ITEMS_PER_PAGE >= content?.news?.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-600 hover:scale-105'}`}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section (আগের মতোই থাকবে) */}
      <section className="bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "50px" }}
            className="text-center mb-16 relative will-change-transform"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Multimedia
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-primary-dark mb-6 tracking-tight">
              {t('home.gallery.title')}
            </h2>
            <div className="w-20 h-1.5 bg-accent-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('home.gallery.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "50px" }} transition={{ duration: 0.6 }}
            className="relative transform-gpu will-change-transform"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200/30 blur-3xl rounded-full -z-10 transform-gpu"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-gold/20 blur-3xl rounded-full -z-10 transform-gpu"></div>

            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/5 bg-white p-3 border border-white">
              {content?.videos?.length > 0 && <Carousel videos={content.videos} />}
            </div>

            <div className="mt-14 text-center">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-dark text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                ভয়েস অফ মাদরাসা ভিডিওগুলো দেখুন <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "50px" }}
          className="flex flex-col items-center justify-center text-center mb-12 gap-4 border-b border-gray-200 pb-8 will-change-transform"
        >
          <div>
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-2 block">Join Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
              {t('home.events.title')}
            </h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full"></div>
          </div>
          
          <Link to="/events" className="mt-2 group inline-flex items-center gap-2 text-primary-dark font-bold hover:text-emerald-600 transition-colors uppercase tracking-wider text-sm bg-gray-50 hover:bg-emerald-50 px-6 py-2.5 rounded-full border border-gray-100 hover:border-emerald-200">
            {t('home.events.viewAll')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px", amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {content?.events?.slice(0, 2).map((event: any) => {
            const isBn = i18n?.language === 'bn';
            return (
              <motion.div
                variants={fadeInUp} key={event.id}
                className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100 border border-gray-100 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 transform-gpu will-change-transform"
              >
                <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-primary-dark px-4 py-2 rounded-xl font-bold text-sm shadow-lg text-center leading-tight">
                    <span className="block text-accent-gold text-lg">{isBn ? event.date_bn.split(' ')[0] : event.date_en.split(' ')[0]}</span>
                    {isBn ? event.date_bn.split(' ')[1] : event.date_en.split(' ')[1]}
                  </div>
                  <img 
                    src={event.image_url} 
                    alt="Event" 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform" 
                    onError={handleImageError} // ৪. Events ইমেজে ফলব্যাক যোগ করা হলো
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent sm:bg-none sm:group-hover:bg-primary-dark/10 transition-colors duration-500 transform-gpu"></div>
                </div>

                <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-center bg-white">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-primary-dark mb-5 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {isBn ? event.title_bn : event.title_en}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                      <Clock size={18} className="text-emerald-500 shrink-0" />
                      <span className="font-medium">{isBn ? event.time_bn : event.time_en}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                      <MapPin size={18} className="text-emerald-500 shrink-0" />
                      <span className="line-clamp-1 font-medium">{isBn ? event.location_bn : event.location_en}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

    </div>
  );
};

export default Home;