import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react'; // PlayCircle এর বদলে Play ব্যবহার করছি

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_URL ? API_URL.replace('/content/', '') : '';

const Carousel = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  return (
    <div className="relative w-full px-2">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        navigation={true}
        breakpoints={{
          1024: { slidesPerView: 3 },
          640: { slidesPerView: 2 }
        }}
        className="video-swiper !pb-16" 
      >
        {videos.map((video, idx) => (
          <SwiperSlide key={idx}>
            <motion.div 
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedVideo(video)}
            >
              {/* ভিডিও থাম্বনেইল কন্টেইনার */}
              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 aspect-video relative group-hover:shadow-emerald-100 transition-all duration-500">
                <img 
                  src={video.image_url ? `${BASE_URL}${video.image_url}` : `https://picsum.photos/seed/${idx}/600/400`} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* --- নতুন এবং উন্নত প্লে বাটন ডিজাইন --- */}
                {/* --- Transparent Play Button Design --- */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
                  
                  {/* Transparent Glassmorphism Circle */}
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/50 shadow-xl transform scale-90 group-hover:scale-100 group-hover:bg-accent-gold group-hover:border-accent-gold transition-all duration-500 ease-out">
                    <Play size={40} fill="white" className="ml-1.5" />
                  </div>
                  
                  {/* Subtle Ring Effect (Optional) */}
                  <div className="absolute w-24 h-24 border border-white/30 rounded-full scale-75 group-hover:scale-110 group-hover:opacity-0 transition-all duration-700"></div>
                </div>
              </div>
              
              {/* ভিডিও টাইটেল */}
              <h3 className="text-primary-dark font-bold text-center mt-5 text-lg group-hover:text-emerald-600 transition-colors line-clamp-1 mb-4 px-2">
                {video.title}
              </h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Video Modal - আগের মতোই থাকবে */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-5 right-5 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={24} />
              </button>
              <iframe
                src={getEmbedUrl(selectedVideo.video_url)}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Fix for Pagination and Arrows - আগের মতোই থাকবে */}
      <style>{`
        .video-swiper { padding-bottom: 60px !important; }
        .swiper-pagination { bottom: 0px !important; }
        .swiper-pagination-bullet { background: #cbd5e1 !important; opacity: 1; }
        .swiper-pagination-bullet-active { background: #d4af37 !important; width: 20px !important; border-radius: 10px !important; }
        .swiper-button-next, .swiper-button-prev {
          color: #064e3b !important;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          transform: translateY(-20px);
        }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 20px; font-weight: bold; }
      `}</style>
    </div>
  );
};

export default Carousel;