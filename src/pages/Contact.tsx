import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-primary-dark mb-6"
        >
          Get in Touch
        </motion.h1>
        <p className="text-xl text-text-muted font-light leading-relaxed">
          We are here to answer any questions you may have about our programs, admissions, or community events. Reach out to us today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-white p-10 md:p-14 rounded-2xl shadow-xl border border-border-subtle"
        >
          <h2 className="font-serif text-3xl font-bold text-primary-dark mb-8">Send us a Message</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-5 py-4 rounded-sm border border-border-subtle focus:outline-none focus:ring-2 focus:ring-accent-emerald/50 focus:border-accent-emerald transition-colors bg-slate-50"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-5 py-4 rounded-sm border border-border-subtle focus:outline-none focus:ring-2 focus:ring-accent-emerald/50 focus:border-accent-emerald transition-colors bg-slate-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">Subject</label>
              <select 
                id="subject" 
                className="w-full px-5 py-4 rounded-sm border border-border-subtle focus:outline-none focus:ring-2 focus:ring-accent-emerald/50 focus:border-accent-emerald transition-colors bg-slate-50"
              >
                <option value="">Select a Topic</option>
                <option value="admissions">Admissions Inquiry</option>
                <option value="general">General Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">Message</label>
              <textarea 
                id="message" 
                rows={6} 
                className="w-full px-5 py-4 rounded-sm border border-border-subtle focus:outline-none focus:ring-2 focus:ring-accent-emerald/50 focus:border-accent-emerald transition-colors bg-slate-50 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary-dark text-white px-8 py-5 rounded-sm font-medium hover:bg-accent-emerald transition-colors flex items-center justify-center gap-3 shadow-lg text-lg"
            >
              <Send size={20} /> Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info & Map */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border-subtle flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-4 rounded-lg text-accent-emerald">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">Visit Us</h3>
                <p className="text-text-muted font-light leading-relaxed">123 Knowledge Way,<br />Education City, EC 54321</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border-subtle flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-4 rounded-lg text-accent-emerald">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">Call Us</h3>
                <p className="text-text-muted font-light leading-relaxed">+1 (555) 123-4567<br />Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border-subtle flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-4 rounded-lg text-accent-emerald">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">Email Us</h3>
                <p className="text-text-muted font-light leading-relaxed">info@madrasaalnur.edu<br />admissions@madrasaalnur.edu</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-100 rounded-2xl overflow-hidden h-72 relative shadow-inner border border-border-subtle"
          >
            <img 
              src="https://picsum.photos/seed/map/800/600?grayscale" 
              alt="Location Map" 
              className="w-full h-full object-cover opacity-60 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-sm text-primary-dark font-bold shadow-lg uppercase tracking-wider text-sm">
                Interactive Map Loading...
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
