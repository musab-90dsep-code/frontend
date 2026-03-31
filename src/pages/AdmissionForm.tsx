import React, { useState } from 'react';
import { motion } from 'motion/react'; // Ensure this matches your package (framer-motion is standard)
import { Send, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const AdmissionForm = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    phone: '',
    department: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ১. এখানে আপনার প্রতিষ্ঠানের হোয়াটসঅ্যাপ নাম্বারটি দিন (কান্ট্রি কোড +88 সহ, কিন্তু + বাদে)
    // উদাহরণ: 88017XXXXXXXX
    const whatsappNumber = "8801929629508"; 

    // ২. হোয়াটসঅ্যাপে যে মেসেজটি যাবে তার ফরম্যাট তৈরি করা
    const message = `
*New Admission Application*
---------------------------
*Student Name:* ${formData.name}
*Father's Name:* ${formData.fatherName}
*Phone Number:* ${formData.phone}
*Department:* ${formData.department}
*Address:* ${formData.address}
    `.trim();

    // ৩. মেসেজটিকে URL এনকোড করে হোয়াটসঅ্যাপ লিংক তৈরি করা
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // ৪. নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
    window.open(whatsappUrl, '_blank');

    // ৫. ফর্ম রিসেট করা এবং ইউজারকে অ্যালার্ট দেওয়া
    alert(language === 'bn' ? 'আপনাকে হোয়াটসঅ্যাপে নিয়ে যাওয়া হচ্ছে...' : 'Redirecting to WhatsApp...');
    setFormData({ name: '', fatherName: '', phone: '', department: '', address: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ... আপনার বাকি return (...) কোড ঠিক থাকবে ...
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Back Button */}
      <Link to="/admissions" className="inline-flex items-center gap-2 text-text-muted hover:text-primary-dark transition-colors mb-8">
        <ArrowLeft size={20} />
        {language === 'bn' ? 'ভর্তির তথ্যে ফিরে যান' : 'Back to Admissions'}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-border-subtle overflow-hidden"
      >
        <div className="bg-primary-dark px-10 py-8 text-white text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            {language === 'bn' ? 'অনলাইন ভর্তি আবেদন' : 'Online Admission Form'}
          </h1>
          <p className="text-white/80 font-light">
            {language === 'bn' ? 'মারকাযুল ফিকরিল ওয়াদ দাওয়াহ' : 'Markazul Fikril wad Dawah'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                {language === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Student Full Name *'}
              </label>
              <input
                type="text" name="name" required
                value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald outline-none transition-all"
                placeholder={language === 'bn' ? 'নাম লিখুন' : 'Enter name'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                {language === 'bn' ? 'পিতার নাম *' : "Father's Name *"}
              </label>
              <input
                type="text" name="fatherName" required
                value={formData.fatherName} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald outline-none transition-all"
                placeholder={language === 'bn' ? 'পিতার নাম লিখুন' : "Enter father's name"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                {language === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
              </label>
              <input
                type="tel" name="phone" required
                value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald outline-none transition-all"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                {language === 'bn' ? 'বিভাগ নির্বাচন করুন *' : 'Select Department *'}
              </label>
              <select
                name="department" required
                value={formData.department} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald outline-none transition-all"
              >
                <option value="">{language === 'bn' ? 'নির্বাচন করুন...' : 'Select...'}</option>
                <option value="Hifz">{language === 'bn' ? 'হিফজুল কুরআন' : 'Hifzul Quran'}</option>
                <option value="Maktab">{language === 'bn' ? 'মক্তব' : 'Maktab'}</option>
                <option value="Kitab">{language === 'bn' ? 'কিতাব বিভাগ' : 'Kitab Section'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              {language === 'bn' ? 'বর্তমান ঠিকানা *' : 'Current Address *'}
            </label>
            <textarea
              name="address" rows={4} required
              value={formData.address} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald outline-none transition-all resize-none"
              placeholder={language === 'bn' ? 'বিস্তারিত ঠিকানা লিখুন' : 'Enter detailed address'}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-5 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors flex justify-center items-center gap-3 shadow-lg mt-4"
          >
            <Send size={22} />
            {language === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdmissionForm;