
import React from 'react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Target, Sparkles, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const { dir, t } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">About Us</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="text-xl mb-12 text-slate-800 dark:text-slate-200 font-semibold">
                Welcome to MyBirthdayFacts, your ultimate destination for discovering the historical, cultural, and personal significance of your special day.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <Target size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2">Our Mission</h3>
                  <p className="text-sm">To provide every individual with a personalized "Time Capsule" of the day they were born, blending history with fun facts.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2">Unique Insights</h3>
                  <p className="text-sm">We use comprehensive historical databases to generate reports covering everything from world news to pop culture and astrology.</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">Why We Created This</h2>
              <p className="mb-6">
                History is often taught through dates and names that feel distant. We believe that history becomes alive when it is personal. By connecting global milestones to your birthday, we create a bridge between you and the story of humanity.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" />
                Our Commitment
              </h2>
              <p className="mb-6">
                Accuracy and privacy are our top priorities. While we aim to entertain, we cross-reference our data points to ensure you get a high-quality historical perspective. We never store your personal identifying information.
              </p>

              <div className="mt-16 p-8 bg-blue-600 rounded-3xl text-white">
                <h3 className="text-2xl font-black mb-4">Start Your Journey</h3>
                <p className="mb-6 font-medium opacity-90">Ready to see what the world was like on the morning you arrived? It only takes a second to unlock your personal history.</p>
                <a href="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">Back to Home</a>
              </div>
            </div>
          </main>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default About;
