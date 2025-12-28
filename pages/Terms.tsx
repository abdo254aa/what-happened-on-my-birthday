
import React from 'react';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import { useLanguage } from '../contexts/LanguageContext';

const Terms: React.FC = () => {
  const { dir } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Terms of Service</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="mb-8 text-sm uppercase tracking-widest font-black text-blue-600">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">1. Agreement to Terms</h2>
              <p className="mb-6">
                By accessing this website, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <AdPlaceholder slot="content" />

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">2. Intellectual Property</h2>
              <p className="mb-6">
                The content, features, and functionality of MyBirthdayFacts are owned by us and are protected by international copyright and trademark laws.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">3. Disclaimer</h2>
              <p className="mb-6">
                The materials on this site are provided on an 'as is' basis. While we strive for accuracy, the historical data and facts generated may occasionally contain errors.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">4. Limitation of Liability</h2>
              <p className="mb-6">
                In no event shall MyBirthdayFacts be liable for any damages arising out of the use or inability to use the materials on our website.
              </p>
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

export default Terms;
