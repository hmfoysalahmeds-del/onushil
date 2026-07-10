import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  Mail, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Check, 
  Award,
  BookMarked,
  Layers,
  Zap,
  HelpCircle
} from 'lucide-react';

interface LandingPageProps {
  onStartPracticing: () => void;
  username: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPracticing, username }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const faqs = [
    {
      q: "Is the Quiz Game Software mobile friendly?",
      a: "Yes! Onushil is designed with a mobile-first philosophy. The user interface adapts perfectly to smartphones, tablets, and laptops, offering a distraction-free, fluid, and premium testing experience on any screen size."
    },
    {
      q: "অনূশীলে প্রশ্নপত্র কীভাবে তৈরি করা হয়?",
      a: "আমাদের স্বয়ংক্রিয় প্রিপারেশন ইঞ্জিন প্রতিটি পরীক্ষার শুরুতে প্রশ্নব্যাংক থেকে র্যান্ডমাইজড উপায়ে প্রশ্ন নির্বাচন করে। এতে সহজ (Low), মাঝারি (Medium) এবং কঠিন (Hard) কাঠিন্য মাত্রার একটি সুষম অনুপাত নিশ্চিত করা হয়, যা হুবহু বোর্ড পরীক্ষার মতোই অনুভূতি দেয়।"
    },
    {
      q: "পরীক্ষার ফলাফলের ব্যাখ্যা কি তাৎক্ষণিকভাবে পাওয়া যায়?",
      a: "অবশ্যই! আপনার পরীক্ষা সম্পন্ন হওয়ার সাথে সাথেই প্রাপ্ত নম্বর, ভুল উত্তর এবং অনুত্তরিত প্রশ্নের পরিসংখ্যান চলে আসবে। এছাড়া প্রতিটি প্রশ্নের নিচে 'Show Answer and Solution' এ ক্লিক করে সঠিক উত্তর ও তার নেপথ্যের তাত্ত্বিক ব্যাখ্যা জানতে পারবেন।"
    },
    {
      q: "নেগেটিভ মার্কিং পদ্ধতিটি কীভাবে কাজ করে?",
      a: "বোর্ড স্ট্যান্ডার্ড অনুসরণে অনূশীলে প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাবে। তবে অনুত্তরিত বা স্কিপ করা প্রশ্নের জন্য কোনো নম্বর কাটা হবে না। এটি অনুশীলনের মাধ্যমে আপনাকে আত্মবিশ্বাসী এবং সতর্ক হতে সাহায্য করবে।"
    }
  ];

  return (
    <div className="space-y-24 pb-12 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-8 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#0d9488] text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>HSC আইসিটি প্রস্তুতি ২০২৬</span>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src="https://nowzyplus.live/upload/ChatGPT%20Image%20Jul%2010%2C%202026%2C%2011_17_04%20PM.png" 
                  alt="Onushil Logo" 
                  className="h-16 w-auto drop-shadow-md rounded-2xl border-2 border-white"
                  referrerPolicy="no-referrer"
                />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">
                  Onushil
                </h1>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-600 tracking-tight">
                HSC প্রস্তুতি প্ল্যাটফর্ম
              </h2>
              <p className="text-[#0d9488] font-semibold text-lg sm:text-xl md:text-2xl italic tracking-wide">
                'স্মার্ট প্রস্তুতি, নিশ্চিত সাফল্য'
              </p>
            </div>

            <p className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
              অনূশীল হচ্ছে এইচএসসি আইসিটি বিষয়ের সেরা প্রস্তুতি নেওয়ার অনলাইন প্ল্যাটফর্ম। এখানে আপনি পাবেন বোর্ড স্ট্যান্ডার্ড অধ্যায়ভিত্তিক অনুশীলন পরীক্ষা, ২৫ মিনিটের মক টেস্ট এবং প্রতিটি উত্তরের তাৎক্ষণিক সচিত্র ব্যাখ্যা। আজই শুরু করুন আপনার এ-প্লাস অর্জনের যাত্রা!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartPracticing}
                className="bg-[#0d9488] hover:bg-[#0b7e74] text-white font-extrabold px-8 py-5 rounded-2xl shadow-xl shadow-teal-700/20 hover:shadow-teal-800/30 transition-all duration-200 flex items-center justify-center gap-2.5 text-lg cursor-pointer"
              >
                <span>{username ? 'ড্যাশবোর্ডে যান' : 'পরীক্ষা শুরু করুন'}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <a 
                href="#features"
                className="border-2 border-slate-200 hover:border-[#0d9488] hover:text-[#0d9488] bg-white text-slate-600 font-extrabold px-8 py-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2.5 text-base"
              >
                ফিচারসমূহ দেখুন
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> কোনো ফি প্রয়োজন নেই
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> ৩০০+ মানসম্মত প্রশ্ন
              </span>
            </div>
          </div>

          {/* Right: High-fidelity CSS Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
              className="relative w-full max-w-[340px]"
            >
              {/* Outer Shadow glow */}
              <div className="absolute inset-0 bg-[#0d9488]/10 rounded-[48px] blur-3xl -z-10"></div>
              
              {/* Mockup Frame */}
              <div className="relative border-[10px] border-slate-800 bg-slate-900 rounded-[48px] shadow-2xl overflow-hidden aspect-[9/18] w-full">
                
                {/* Speaker Ear Piece */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-4 w-28 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
                </div>

                {/* Inside Screen Content */}
                <div className="h-full bg-slate-50 p-4 pt-6 flex flex-col justify-between overflow-y-auto font-sans select-none text-left">
                  
                  {/* Internal Mock Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#0d9488]" />
                      <span className="text-[11px] font-black tracking-tight text-slate-700">Onushil Mobile</span>
                    </div>
                    <span className="text-[10px] bg-red-50 text-red-500 font-extrabold px-1.5 py-0.5 rounded">লাইভ মক টেস্ট</span>
                  </div>

                  {/* MCQ Exam card */}
                  <div className="space-y-3 flex-grow">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                      <span>প্রশ্ন নং: ১২ / ২৫</span>
                      <span className="text-[#0d9488] font-mono animate-pulse">সময়: ২৩:৪৫</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#0d9488] h-full w-[80%] rounded-full"></div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2 mt-2">
                      <h4 className="text-xs font-black text-slate-800 leading-snug">
                        নিচের কোনটির কল্যাণে ঘরে বসেই বিশ্বকে হাতের মুঠোয় পাওয়া যাচ্ছে?
                      </h4>

                      <div className="space-y-1.5 pt-1">
                        <div className="border-2 border-emerald-500 bg-emerald-50 text-emerald-900 rounded-xl p-2 text-[10px] font-bold flex items-center justify-between">
                          <span>K. ইন্টারনেট</span>
                          <span className="w-3.5 h-3.5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[8px] font-black">✓</span>
                        </div>
                        <div className="border border-slate-100 bg-slate-50 text-slate-500 rounded-xl p-2 text-[10px] font-medium">
                          <span>L. টেলিভিশন</span>
                        </div>
                        <div className="border border-slate-100 bg-slate-50 text-slate-500 rounded-xl p-2 text-[10px] font-medium">
                          <span>M. টেলিফোন</span>
                        </div>
                        <div className="border border-slate-100 bg-slate-50 text-slate-500 rounded-xl p-2 text-[10px] font-medium">
                          <span>N. মোবাইল</span>
                        </div>
                      </div>
                    </div>

                    {/* Show explanation accordion mock */}
                    <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                        <span>সমাধান ও ব্যাখ্যা:</span>
                        <ChevronDown className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
                        ব্যাখ্যা: ইন্টারনেটের সুবিধার ব্যাপক প্রসারের কারণে সমগ্র বিশ্ব এখন একটি গ্লোবাল ভিলেজে পরিণত হয়েছে।
                      </p>
                    </div>
                  </div>

                  {/* Action buttons mock */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                    <div className="w-1/2 bg-slate-200 text-slate-600 rounded-xl py-2 text-center text-[10px] font-extrabold">
                      পরবর্তী প্রশ্ন
                    </div>
                    <div className="w-1/2 bg-[#0d9488] text-white rounded-xl py-2 text-center text-[10px] font-extrabold">
                      সাবমিট করুন
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-6 top-12 bg-amber-400 text-slate-900 border-2 border-white px-3 py-1.5 rounded-2xl shadow-lg rotate-12 z-20 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> A+ গ্যারান্টি
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. WHY ONUSHIL? (FEATURES GRID) */}
      <section id="features" className="scroll-mt-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#0d9488] font-extrabold text-sm uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            ফিচার সমূহ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            অনূশীল কেন প্রস্তুতিতে অনন্য?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            এইচএসসি বোর্ড পরীক্ষার অনুরূপ মান বজায় রেখে অনূশীল প্রস্তুত করা হয়েছে, যা আপনার সময় সচেতনতা বৃদ্ধি করে নিশ্চিত ফলাফল বয়ে আনবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Chapter-wise Practice */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-left flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-bl-[80px] -z-10"></div>
            <div className="w-14 h-14 bg-teal-50 text-[#0d9488] rounded-2xl flex items-center justify-center shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                অধ্যায়-ভিত্তিক অনুশীলন
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                HSC আইসিটির প্রতিটি অধ্যায় (তথ্য যোগাযোগ প্রযুক্তি, বিশ্বগ্রাম, সংখ্যা পদ্ধতি, ডিজিটাল ডিভাইস, HTML ও প্রোগ্রামিং ভাষা) থেকে নিখুঁত প্রশ্নব্যাংক সাজানো হয়েছে।
              </p>
            </div>
            <div className="text-xs font-bold text-[#0d9488] flex items-center gap-1 pt-2">
              ১০০% সিলেবাস কাভার্ড <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>

          {/* Card 2: Timed Mock Tests */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-left flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-bl-[80px] -z-10"></div>
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
              <Clock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                সময়-নির্ধারিত মক টেস্ট
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                ২৫ মিনিটের মধ্যে ২৫টি প্রশ্নের উত্তর দেওয়ার নিখুঁত পরীক্ষা ইঞ্জিন যা স্বয়ংক্রিয়ভাবে মক টেস্ট সম্পন্ন করে। বোর্ড পরীক্ষার প্রকৃত টাইম ম্যানেজমেন্ট চর্চা করতে অনন্য সাহায্য করবে।
              </p>
            </div>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-2">
              অটোমেটিক টাইম ট্র্যাকার <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>

          {/* Card 3: Performance Analytics */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-left flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-bl-[80px] -z-10"></div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                ব্যাখ্যাসহ নির্ভুল মূল্যায়ন
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাবে এবং সঠিক সমাধান ও তত্ত্ব বিস্তারিতভাবে পড়ার সুবিধা রয়েছে। আপনি অন্য শিক্ষার্থীদের থেকে কতটা এগিয়ে তা জেনে নিয়ে পড়াশোনা উন্নত করুন।
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-2">
              উন্নত পরিসংখ্যান ও র‍্যাংকিং <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. FAQ SECTION (ACCORDION) */}
      <section id="faq" className="scroll-mt-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#0d9488] font-extrabold text-sm uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            জিজ্ঞাসা
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            অনূশীল প্ল্যাটফর্ম এবং পরীক্ষা সংক্রান্ত বিষয়ে কোনো প্রশ্ন থাকলে নিচের উত্তরগুলো দেখতে পারেন।
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-[#0d9488]/40 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-slate-800 text-sm sm:text-base hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0d9488] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. NEWSLETTER SECTION */}
      <section id="newsletter" className="relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0d9488] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl border border-teal-600/30">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-900 rounded-full blur-3xl opacity-50"></div>

            <div className="relative space-y-6 max-w-2xl mx-auto">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto border border-white/20">
                <Mail className="w-7 h-7 text-emerald-300" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Stay Updated / নতুন আপডেটের সাথে থাকুন
              </h3>
              
              <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
                অনূশীলের নতুন অধ্যায়ের প্রশ্নব্যাংক, এইচএসসি সাজেশন এবং পরীক্ষা প্রস্তুতি সংক্রান্ত দরকারি গাইড নিয়মিত আপনার ইমেইলে পেতে আজই নিউজলেটারে যুক্ত হয়ে থাকুন।
              </p>

              <form onSubmit={handleSubscribe} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন"
                    required
                    className="flex-grow px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-teal-200 outline-none focus:border-white focus:bg-white/15 transition-all duration-200"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-200 shadow-md shadow-orange-950/20 cursor-pointer flex-shrink-0"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>

              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-300 text-xs font-black mt-3 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                    ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে সাবস্ক্রাইব করেছেন।
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-400 font-medium text-xs sm:text-sm">
        <p className="flex items-center gap-1.5 font-bold">
          <span>© 2026 Onushil. All Rights Reserved</span>
        </p>
        
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-all shadow-sm">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-all shadow-sm">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-all shadow-sm">
            <Youtube className="w-4 h-4" />
          </a>
          <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-all shadow-sm">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </footer>

    </div>
  );
};
