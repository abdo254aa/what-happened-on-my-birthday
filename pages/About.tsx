
import React from 'react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Target, Sparkles, ShieldCheck, Users, Search, Book } from 'lucide-react';

const About: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl relative overflow-hidden text-justify">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Our Mission & Archival Standards</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="text-xl mb-12 text-slate-800 dark:text-slate-200 font-semibold">
                MyBirthdayFacts is an authoritative historical project dedicated to the preservation of individual cultural memory. We believe that a profound understanding of one's personal history begins with a rigorous analysis of the world as it stood on the morning of their birth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <Search size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2 text-justify">Systematic Research</h3>
                  <p className="text-sm">Our archives are compiled by human editorial teams who aggregate complex socio-economic, technological, and cultural milestones from the last 70 years of global history.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-2 text-justify">Editorial Integrity</h3>
                  <p className="text-sm">Every personal report is structured into detailed thematic chapters designed to provide genuine analytical depth, moving beyond trivia into comprehensive cultural analysis.</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">The Philosophy of Personal History</h2>
              <p className="mb-6">
                In an era characterized by the rapid and often superficial flow of digital information, our mission is to anchor individual lives within the broader human timeline. History is not merely a chronological list of events; it is the sensory and institutional environment of a specific moment. By documenting the scientific breakthroughs, geopolitical shifts, and aesthetic standards of your birth year, we provide a more stable foundation for personal identity and generational connection.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4 flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" />
                Commitment to Substantive Content
              </h2>
              <p className="mb-6">
                Our primary focus is the delivery of high-quality, substantive content that offers real value to the reader. We utilize verified historical databases and official socio-economic reports as our primary sources. Our 'Human-First' editorial policy ensures that every insight is authoritative and relevant, contributing to a deeper understanding of the societal forces that shape our contemporary world.
              </p>

              <div className="mt-16 p-8 bg-blue-600 rounded-3xl text-white">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><Book size={24}/> Begin Your Archival Discovery</h3>
                <p className="mb-6 font-medium opacity-90">Access a professional reconstruction of the world as it stood when you first arrived. Our database is prepared to document your unique historical context with precision.</p>
                <a href="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">Start Personal Report</a>
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
