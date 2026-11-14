
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <SEOHead
        title="Privacy Policy | MyBirthdayFacts (mybirthday.world)"
        description="Read the Privacy Policy for MyBirthdayFacts (mybirthday.world), including details on Google AdSense cookies, analytics, and user privacy rights."
        type="website"
      />
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Privacy Policy</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p className="mb-8 text-sm uppercase tracking-widest font-black text-blue-600">Last updated: November 2026</p>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">1. Introduction</h2>
              <p className="mb-6">
                Welcome to MyBirthdayFacts (accessible from <strong>https://mybirthday.world</strong>). We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.
              </p>

              <AdPlaceholder slot="content" />

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">2. Information We Collect</h2>
              <p className="mb-6">
                <strong>Information you provide:</strong> When you enter a birth date (day, month, year) into our archive lookup tool, the calculation runs locally in your browser to generate the historical report and is not sold or stored on external personal-profile servers.
              </p>
              <p className="mb-6">
                <strong>Log Files and Usage Data:</strong> Like most standard websites, our hosting infrastructure may log basic technical data such as browser type, referring pages, approximate region, and timestamps for security, diagnostics, and performance monitoring.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">3. Google AdSense & Advertising Cookies</h2>
              <p className="mb-4">
                <strong>Third-Party Vendors & Google AdSense:</strong> We partner with Google AdSense to display advertisements on our website. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
              </p>
              <p className="mb-4">
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to <strong>mybirthday.world</strong> and/or other sites on the Internet.
              </p>
              <p className="mb-6">
                <strong>Managing Your Ad Preferences:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  www.aboutads.info
                </a>.
              </p>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">4. Your Privacy Rights (GDPR & CCPA)</h2>
              <p className="mb-6">
                Depending on your region, you have the right to request information about data handling, disable cookies through your browser settings, or withdraw consent for personalized advertising at any time.
              </p>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-12 mb-4">5. Contact Us</h2>
              <p className="mb-6">
                If you have questions or comments about this Privacy Policy, you may email us directly at{' '}
                <a href="mailto:contact@mybirthday.world" className="text-blue-600 dark:text-blue-400 underline font-bold">
                  contact@mybirthday.world
                </a>{' '}
                or visit our <Link to="/contact" className="text-blue-600 dark:text-blue-400 underline font-bold">Contact Us</Link> page.
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
