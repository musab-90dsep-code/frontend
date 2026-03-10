import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, Bell, MapPin, Award, GraduationCap, BookOpen, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import Carousel from '../components/Carousel';
import Typewriter from 'typewriter-effect';
import { useData } from '../context/DataContext';

// Home.tsx এর শুরুতে
const API_URL = import.meta.env.VITE_API_BASE_URL || "";
// যদি API_URL থাকে তবে replace করবে, না থাকলে ডিফল্ট লোকালহোস্ট নিবে
const BASE_URL = API_URL ? API_URL.replace('/content/', '') : '';

// ইমেজ ইউআরএল ঠিক করার গ্লোবাল ফাংশন
const getImageUrl = (url: string) => {
  if (!url) return "";
  // যদি URL টি ইতিমধ্যে http দিয়ে শুরু হয় (যেমন Cloudinary লিঙ্ক), তবে সরাসরি সেটিই দেখাবে
  if (url.startsWith('http')) {
    return url;
  }
  // অন্যথায় লোকাল মিডিয়া ফোল্ডারের জন্য BASE_URL যোগ করবে
  return `${BASE_URL}${url}`;
};

const Home = () => {
  const { t, i18n } = useLanguage();
  const { content, loading, error } = useData(); // হুকগুলো উপরে রাখুন

  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [startNewsIndex, setStartNewsIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const ITEMS_PER_PAGE = 3;
  const statsIcons = [<Users key="users" />, <BookOpen key="book" />, <GraduationCap key="cap" />, <Award key="award" />];

  // ১. স্লাইডার ইফেক্টটি সবসমই উপরে রাখুন (কোনো IF এর নিচে নয়)
  useEffect(() => {
    if (content?.contents?.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % content.contents.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content?.contents]);

  // ২. সব হুক ডিক্লেয়ার করার পর এখন কন্ডিশনাল রিটার্ন দিন
  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-20">{error}</div>;
  if (!content) return null;

  // স্লাইড বা অ্যারো হ্যান্ডেলার
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

  /* --- Reusable Cards --- */
  const EventCard = ({ event }: { event: any }) => {
    const { language } = useLanguage();
    const isBn = language === 'bn';

    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-border-subtle group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image Section */}
        <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
          <div className="absolute top-4 left-4 z-20 bg-accent-gold text-primary-dark px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
            {isBn ? event.date_bn : event.date_en}
          </div>
          <img
            src={getImageUrl(event.image)} // এখানে getImageUrl ব্যবহার করা হয়েছে
            alt={isBn ? event.title_bn : event.title_en}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        {/* Content Section */}
        <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary-dark mb-4 group-hover:text-primary-light transition-colors line-clamp-2">
            {isBn ? event.title_bn : event.title_en}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Clock size={16} className="text-accent-gold shrink-0" />
              <span>{isBn ? event.time_bn : event.time_en}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <MapPin size={16} className="text-accent-gold shrink-0" />
              <span className="line-clamp-1">{isBn ? event.location_bn : event.location_en}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-32 pb-24">
      {/* Notice Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedNotice(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white p-8 md:p-10 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-accent-gold"></div>
              <div className="flex items-center gap-3 mb-6 text-accent-gold">
                <Bell size={24} />
                <span className="font-bold tracking-widest uppercase text-xs">Official Notice</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-dark mb-4 leading-tight">{selectedNotice.title}</h2>
              <p className="text-sm text-text-muted mb-6 flex items-center gap-2 font-medium bg-slate-50 inline-flex px-3 py-1.5 rounded-lg">
                <Calendar size={16} className="text-accent-gold" /> {selectedNotice.date}
              </p>
              <div className="prose prose-slate max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{selectedNotice.content}</p>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="mt-8 w-full bg-primary-dark hover:bg-primary-light text-white px-6 py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                Close Notice
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-start overflow-hidden pt-26 h-6">
        <div className="absolute inset-0 z-0 overflow-hidden bg-primary-dark">
          {content.contents.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={getImageUrl(item.image_url)} // এখানে getImageUrl ব্যবহার করা হয়েছে
                alt="Madrasa"
                className={`w-full h-full object-cover transition-transform duration-6000 ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'
                  }`}
                referrerPolicy="no-referrer"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary-dark/50 to-primary-dark/90 mix-blend-multiply"></div>
            </div>
          ))}

          {/* Standard Indicators */}
          {content.contents.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {content.contents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-accent-gold' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center mx-auto ">
          <div className="px-6 w-full max-w-4xl mx-auto flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-5xl font-bold !text-white mb-4 uppercase tracking-tight leading-[1.3] md:leading-[1.2] text-center"
            >
              <Typewriter
                key={t('home.title1')}
                options={{
                  autoStart: true,
                  loop: false,
                  cursor: "|",
                  delay: 70,
                  deleteSpeed: Infinity,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`${t('home.title1')} <br /> ${t('home.title2')}`)
                    .start();
                }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-base md:text-xl lg:text-2xl !text-white font-medium max-w-full md:max-w-3xl !font-sans opacity-90 text-center leading-relaxed"
            >
              {t('home.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 mb-16">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/50 p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {content?.stats?.map((stat: any, i: number) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
              className="text-center flex flex-col items-center gap-3 border-r last:border-0 border-gray-100"
            >
              <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold mb-2">
                {statsIcons[i]}
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary-dark">
                  {stat.number}
                </h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                  {i18n?.language === 'bn' ? stat.label_bn : stat.label_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.news.title')}</h2>
          <Link to="/news" className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Show All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Side: Latest News */}
          <div className="lg:col-span-7 flex">
            {content?.news?.length > 0 && (
              <div className="border border-gray-200 rounded-2xl p-4 flex flex-col w-full bg-white shadow-sm">
                <div className="rounded-xl overflow-hidden mb-4 relative h-80 sm:h-75 w-full bg-gray-100">
                  <motion.img
                    key={content.news[0].id}
                    src={getImageUrl(content.news[0].image_url)} // এখানে getImageUrl ব্যবহার করা হয়েছে
                    alt={content.news[0].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary-dark mb-2">{content.news[0].title}</h3>
                  <p className="text-text-muted line-clamp-2">{content.news[0].summary || content.news[0].description}</p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-md text-xs font-bold uppercase">Latest News</span>
                  <Link
                    to={`/news/${content.news[0].id}`}
                    className="p-2.5 bg-gray-100 hover:bg-emerald-600 hover:text-white rounded-lg transition-all inline-block"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Paginated Small News */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {content?.news?.slice(startNewsIndex + 1, startNewsIndex + 1 + ITEMS_PER_PAGE).map((newsItem: any, index: number) => (
              <motion.div
                key={newsItem.id || index}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-gray-200 rounded-2xl p-3 flex items-center gap-4 bg-white shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={getImageUrl(newsItem.image_url)} // এখানে getImageUrl ব্যবহার করা হয়েছে
                    alt={newsItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grow min-w-0">
                  <h3 className="text-sm font-bold text-primary-dark line-clamp-2 leading-tight mb-1">
                    {newsItem.title}
                  </h3>
                  <p className="text-[10px] text-accent-gold font-bold uppercase">{newsItem.date}</p>
                </div>

                <Link
                  to={`/news/${newsItem.id}`}
                  className="p-2 bg-gray-50 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors inline-block"
                >
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-auto pt-4 px-2">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(Math.max(0, content.news.length - 1) / ITEMS_PER_PAGE) }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${Math.floor(startNewsIndex / ITEMS_PER_PAGE) === i ? 'w-6 bg-emerald-600' : 'w-1.5 bg-gray-300'}`}
                  ></span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevNews}
                  disabled={startNewsIndex === 0}
                  className={`p-2 rounded-full border border-gray-200 transition-colors ${startNewsIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={nextNews}
                  disabled={startNewsIndex + 1 + ITEMS_PER_PAGE >= content?.news?.length}
                  className={`p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm ${startNewsIndex + 1 + ITEMS_PER_PAGE >= content?.news?.length ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notice Board Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-border-subtle overflow-hidden flex flex-col p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary-dark text-white p-4 rounded-full">
              <Bell size={24} className="text-accent-gold" />
            </div>
            <div>
              <p className="text-xs text-accent-gold font-bold uppercase tracking-widest">Notice Board</p>
              <h2 className="font-serif text-3xl font-bold text-primary-dark mt-2">
                {t('home.notices.title')}
              </h2>
            </div>
          </div>
          <div className="p-6 grow flex flex-col gap-4">
            {content.notices.map((notice, idx) => (
              <div key={idx} onClick={() => setSelectedNotice(notice)} className="group flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors border border-slate-100 hover:border-emerald-100 cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-accent-gold shrink-0 group-hover:scale-150 transition-transform"></div>
                <div>
                  <p className="text-primary-dark font-semibold mb-1">{notice.title}</p>
                  <p className="text-xs text-text-muted flex items-center gap-2 font-medium uppercase tracking-wider">
                    <Calendar size={12} className="text-accent-gold" /> {notice.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* View All Button */}
          <div className="mt-4 text-center">
            <Link to="/notices" className="inline-block bg-accent-gold text-primary-dark px-6 py-3 rounded-md font-bold hover:bg-accent-gold/80 transition-all">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Video Gallery Section - Enhanced Version */}
      <section className=" bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Multimedia Gallery
            </span>

            <h2 className="font-serif text-4xl md:text-6xl font-extrabold text-primary-dark mb-6 tracking-tight">
              {t('home.gallery.title')}
            </h2>

            <div className="w-24 h-1.5 bg-accent-gold mx-auto rounded-full mb-6"></div>

            <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              {t('home.gallery.subtitle')}
            </p>
          </motion.div>

          {/* Carousel Container with Glow/Shadow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200/20 blur-3xl rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-gold/10 blur-3xl rounded-full -z-10"></div>

            {/* The Carousel */}
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10 bg-white p-2">
              {content?.videos?.length > 0 && <Carousel videos={content.videos} />}
            </div>

            {/* Optional: View All Link for Videos */}
            <div className="mt-12 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-dark text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
              >
                ভয়স অফ মাদরাসা ভিডিওগুলো দেখুন <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              {t('home.events.title')}
            </h2>
            <p className="text-text-muted text-lg">{t('home.events.subtitle')}</p>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-primary-dark font-bold hover:text-accent-gold transition-colors uppercase tracking-wider text-sm border-b-2 border-transparent hover:border-accent-gold pb-1">
            {t('home.events.viewAll')} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* slice(0, 2) ব্যবহার করে শুধুমাত্র সর্বশেষ ২ টি ইভেন্ট দেখানো হচ্ছে */}
          {content?.events?.slice(0, 2).map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;