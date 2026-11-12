import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Sparkles, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">About Our Archive</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="text-xl mb-12 text-slate-800 dark:text-slate-200 font-semibold">
                MyBirthdayFacts is a historical and cultural reference tool built to show what everyday life, economics, and science actually looked like on the day you were born—without generic flattery or exaggerated claims.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <Target size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2">Concrete Historical Data</h3>
                  <p className="text-sm">Instead of vague compliments, we compile real decade benchmarks: what a home, a gallon of fuel, and a movie ticket cost, what technology was in use, and what headlines shaped your birth year.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2">Honest Generational Context</h3>
                  <p className="text-sm">Every era creates both practical strengths and blind spots. Our reports examine how growing up in your specific decade shaped work habits, communication, and attention spans.</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">Why We Skip the Flattery</h2>
              <p className="mb-6">
                Most birthday and horoscope sites rely on the <em>Barnum Effect</em>—writing overly dramatic praise so every reader feels like a superhero. We believe readers prefer honesty. Knowing the real cost of living, scientific milestones, seasonal biology (such as the Relative Age Effect in schools), and realistic trade-offs of your birth era is far more interesting than fake compliments.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" />
                Privacy & Transparency
              </h2>
              <p className="mb-6">
                Your date lookups are calculated directly in your browser and cached locally on your device for speed. We never sell or store personal birth dates on external profile servers.
              </p>

              <div className="mt-16 p-8 bg-blue-600 rounded-3xl text-white">
                <h3 className="text-2xl font-black mb-4">Explore the Historical Record</h3>
                <p className="mb-6 font-medium opacity-90">Enter any date on the home page to examine the economic, technological, and cultural facts of that day.</p>
                <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">Back to Home</Link>
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
