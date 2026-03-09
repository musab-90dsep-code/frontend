import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? API_URL.replace('/content/', '') : '';

const NewsDetail = () => {
  const { id } = useParams();
  const { content, loading, error } = useData();

  if (loading) return <div className="text-center mt-32 text-xl font-semibold">Loading News...</div>;
  if (error) return <div className="text-red-600 text-center mt-32">{error}</div>;
  if (!content || !content.news) return <div className="text-center mt-32">News not found!</div>;

  // বর্তমান নিউজটি খুঁজুন (id অনুযায়ী)
  const currentNews = content.news.find((n: any) => n.id?.toString() === id) || content.news[0];

  // Related News (বর্তমান নিউজটি বাদে অন্য ৩টি নিউজ)
  const relatedNews = content.news.filter((n: any) => n.id?.toString() !== currentNews.id).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- Left Side: Main News Content (Full View) --- */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-emerald-600 font-medium mb-6 transition-colors w-fit">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          {/* Title & Meta Data */}
          <h1 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6 leading-tight">
            {currentNews.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 text-sm font-medium text-text-muted bg-slate-50 px-4 py-2 rounded-lg">
              <Calendar size={18} className="text-accent-gold" />
              <span>Published on: {currentNews.date}</span>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-primary-dark hover:text-emerald-600 transition-colors px-4 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg">
              <Share2 size={18} /> Share News
            </button>
          </div>

          {/* 1. High-Res Image */}
          <div className="w-full rounded-3xl overflow-hidden shadow-sm mb-8 bg-gray-100 aspect-video">
            <img
              src={`${BASE_URL}${currentNews.image_url}`}
              alt={currentNews.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* 2. Full Text (বিস্তারিত বর্ণনা) */}
          <div className="prose prose-lg prose-slate max-w-none">
            {/* আপনার API তে যদি detailed content থাকে, তবে currentNews.content ব্যবহার করবেন। না থাকলে summary. */}
            <p className="text-gray-700 leading-relaxed text-[17px] md:text-lg whitespace-pre-line">
              {currentNews.content || currentNews.description || currentNews.summary || "No detailed description available for this news."}
            </p>
          </div>
        </div>

        {/* --- Right Side: Related News (আরও সংবাদ) --- */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-slate-50 p-6 rounded-3xl border border-gray-100 sticky top-28">
            <h3 className="text-2xl font-bold text-primary-dark mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent-gold rounded-full inline-block"></span>
              Related News
            </h3>

            <div className="flex flex-col gap-5">
              {relatedNews.map((newsItem: any) => (
                <Link 
                  to={`/news/${newsItem.id}`} 
                  key={newsItem.id}
                  className="group flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-emerald-200 transition-all"
                >
                  {/* Small Thumbnail */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={`${BASE_URL}${newsItem.image_url}`}
                      alt={newsItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Related News Info */}
                  <div className="grow min-w-0">
                    <h4 className="text-sm font-bold text-primary-dark line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                      {newsItem.title}
                    </h4>
                    <p className="text-[11px] text-accent-gold font-bold uppercase flex items-center gap-1">
                      <Calendar size={12} /> {newsItem.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <Link to="/news" className="mt-8 w-full flex items-center justify-center gap-2 bg-primary-dark hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold transition-colors">
              View All News <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default NewsDetail;