
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

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">2. Google AdSense and Cookies</h2>
              <p className="mb-6">
                We use Google AdSense to serve advertisements on our site. Google, as a third-party vendor, uses cookies to serve ads on your site. Google's use of the <strong>DART cookie</strong> enables it to serve ads to your users based on their visit to your sites and other sites on the Internet.
              </p>
              <p className="mb-6">
                Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy. Third-party ad servers or ad networks use technology to the advertisements and links that appear on MyBirthdayFacts.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">3. GDPR and CCPA Compliance</h2>
              <p className="mb-6">
                If you are a resident of the European Economic Area (EEA) or California, you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>The right to access, update or delete the information we have on you.</li>
                <li>The right of rectification.</li>
                <li>The right to object.</li>
                <li>The right of restriction.</li>
                <li>The right to data portability.</li>
              </ul>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">4. Information We Collect</h2>
              <p className="mb-6">
                <strong>User Input:</strong> We collect the birth date (day, month, year) you enter into our forms. This information is processed in real-time to generate your personalized report and is not stored permanently against your identity.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">5. Contact Us</h2>
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
