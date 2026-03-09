import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

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
  const chatRef = useRef<any>(null);
  const { language } = useLanguage();

  // Initialize chat
  useEffect(() => {
    if (!chatRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: "You are a helpful assistant for Markazul Fikri, an Islamic educational institution. Answer questions about the madrasa, its courses, admissions, history, and events. Be polite, respectful, and concise. If asked in Bengali, reply in Bengali. If asked in English, reply in English.",
          },
        });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
  }, []);

  // Update greeting when language changes or on mount
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([
        {
          id: 'greeting',
          text: language === 'bn' 
            ? 'আসসালামু আলাইকুম! আমি মারকাযুল ফিকরী এর এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' 
            : 'Assalamu Alaikum! I am the AI Assistant for Markazul Fikri. How can I help you today?',
          sender: 'bot'
        }
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { id: Date.now().toString(), text: response.text, sender: 'bot' }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: language === 'bn' ? 'দুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Sorry, an error occurred. Please try again.', 
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
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary-dark text-accent-gold rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-border-subtle flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-dark p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-gold text-primary-dark rounded-full flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{language === 'bn' ? 'এআই অ্যাসিস্ট্যান্ট' : 'AI Assistant'}</h3>
                  <p className="text-xs text-slate-300">{language === 'bn' ? 'মারকাযুল ফিকরী' : 'Markazul Fikri'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary-dark text-white rounded-br-sm' 
                        : 'bg-white border border-border-subtle text-text-main rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border-subtle p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary-dark" />
                    <span className="text-xs text-text-muted">{language === 'bn' ? 'টাইপ করছে...' : 'Typing...'}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border-subtle">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question...'}
                  className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-primary-dark text-accent-gold rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-colors flex-shrink-0"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
