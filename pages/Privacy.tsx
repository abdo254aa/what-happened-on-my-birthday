
import React from 'react';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Privacy Policy</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="mb-8 text-sm uppercase tracking-widest font-black text-blue-600">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">1. Introduction</h2>
              <p className="mb-6">
                Welcome to MyBirthdayFacts. We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, and share your information when you visit our website.
              </p>

              <AdPlaceholder slot="content" />

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">2. Information We Collect</h2>
              <p className="mb-6">
                <strong>Information you provide:</strong> We collect the birth date (day, month, year) you enter into our forms. This information is used solely to generate the content displayed on the results page and is not stored in any permanent database linked to your identity.
              </p>
              <p className="mb-6">
                <strong>Usage Data:</strong> We may automatically collect certain information when you visit, use, or navigate the Website. This may include device and usage information, such as your IP address, browser and device characteristics.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">3. Use of Cookies and Ads</h2>
              <p className="mb-6">
                  <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites.
              </p>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">4. Contact Us</h2>
              <p className="mb-6">
                  If you have questions or comments about this policy, you may email us via our contact page.
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

export default Privacy;
