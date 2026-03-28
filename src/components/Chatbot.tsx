import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const constraintsRef = useRef<HTMLDivElement>(null); // ড্রেগিং বাউন্ডারির জন্য
  const { language } = useLanguage();

  const apiKey = "AIzaSyByLou9swUDm46pIcT9AGRcMiK1XaKInCo";

  const initChat = async () => {
    try {
      if (!apiKey) {
        console.error("API Key is missing");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const modelId = "models/gemini-flash-lite-latest";

      const model = genAI.getGenerativeModel({
        model: modelId,
        systemInstruction: `You are the official AI assistant for "Jami Islamiya" (জামেয়া ইসলামিয়া), an Islamic educational institution. 

Here is the knowledge base about the madrasa based on its website:
1. Admissions: The madrasa has a clear 3-step admission process. (Direct users to the 'Admissions' page).
2. Teachers/Mentors: The madrasa has expert teachers. (Direct users to the 'Teachers' page).
3. Events & News: The madrasa regularly updates notices. (Direct users to 'Events' page).
4. About Us: The madrasa has a rich history.

Rules for answering:
- Always say "Assalamu Alaikum" at the start.
- Be highly polite, respectful, and concise.
- If asked in Bengali, reply in fluent Bengali. If asked in English, reply in English.
- NEVER invent or guess any fees, dates, or names.`
      });

      chatSessionRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  };

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          text: language === 'bn'
            ? 'আসসালামু আলাইকুম! আমি জামেয়া ইসলামিয়ার এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
            : 'Assalamu Alaikum! I am the AI Assistant for Jami Islamiya. How can I help you today?',
          sender: 'bot'
        }
      ]);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        await initChat();
      }

      const result = await chatSessionRef.current.sendMessage(userText);
      const botText = result.response.text();

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' }]);

    } catch (error: any) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        text: language === 'bn' ? `দুঃখিত, একটি ত্রুটি হয়েছে (${error.message})।` : `Sorry, an error occurred (${error.message}).`,
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ড্রেগিং কন্টেইনার: এই অদৃশ্য div-টি পুরো স্ক্রিন জুড়ে থাকবে।
        চ্যাটবটটি যেন স্ক্রিনের বাইরে চলে না যায়, তার জন্য এটি constraints হিসেবে কাজ করবে।
      */}
      <div className="fixed inset-0 pointer-events-none z-50" ref={constraintsRef} />

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(4,120,87,0.4)] transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={30} />
        <span className="absolute top-1 right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            
            // ড্রেগিংয়ের জন্য নতুন কোড
            drag
            dragConstraints={constraintsRef} // স্ক্রিনের বাইরে যাওয়া ঠেকাবে
            dragElastic={0.1} // টেনে ছাড়লে একটু বাউন্স করবে
            dragMomentum={false} // ছাড়ার পর নিজে নিজে স্লাইড করবে না
            
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-slate-50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col z-50 overflow-hidden pointer-events-auto"
          >
            {/* Header - এখানে cursor-move দেওয়া হয়েছে যাতে ইউজার বুঝতে পারে এটি টানা যাবে */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 flex justify-between items-center text-white shadow-md z-10 cursor-move active:cursor-grabbing">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/30 pointer-events-none">
                  <Bot size={20} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-emerald-600 rounded-full"></div>
                </div>
                <div className="pointer-events-none">
                  <h3 className="font-bold text-base leading-tight">
                    {language === 'bn' ? 'এআই অ্যাসিস্ট্যান্ট' : 'AI Assistant'}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-xs text-emerald-100 font-medium">
                      {language === 'bn' ? 'অনলাইনে আছে' : 'Online'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Close Button - এতে onPointerDownPropagation Stop করা হয়েছে যেন বাটনে ক্লিক করলে ড্র্যাগ না হয় */}
              <button
                onClick={() => setIsOpen(false)}
                onPointerDown={(e) => e.stopPropagation()} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-emerald-50 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area - ড্রেগিং বন্ধ করা হয়েছে যাতে স্ক্রল করতে অসুবিধা না হয় */}
            <div 
              onPointerDown={(e) => e.stopPropagation()} 
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/80 backdrop-blur-xl cursor-auto"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-auto mb-1 flex-shrink-0">
                      <Sparkles size={12} className="text-emerald-700" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-3 text-[14.5px] leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-2xl rounded-br-sm'
                        : 'bg-white border border-gray-100 text-slate-700 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-auto mb-1 flex-shrink-0">
                    <Sparkles size={12} className="text-emerald-700" />
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                    <span className="text-xs font-medium text-slate-500">
                      {language === 'bn' ? 'টাইপ করছে...' : 'Typing...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - এখানেও ড্রেগিং বন্ধ করা হয়েছে */}
            <div 
              onPointerDown={(e) => e.stopPropagation()} 
              className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] cursor-auto"
            >
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-gray-200/60 focus-within:border-emerald-500/50 focus-within:bg-white transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question...'}
                  className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none text-slate-700 placeholder-slate-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 hover:shadow-md transition-all flex-shrink-0 transform active:scale-95"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
              <div className="text-center mt-2.5">
                <p className="text-[10px] text-slate-400 font-medium tracking-wide pointer-events-none">
                  Powered by <span className="text-emerald-600">Jami Islamiya AI</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;``