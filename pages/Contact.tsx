
import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { dir, t } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Contact Us</h1>
                
                <p className="text-slate-600 dark:text-slate-400 mb-12 text-xl font-medium leading-relaxed max-w-2xl">
                    Have questions about the site? Want to report a bug or suggest a feature? We'd love to hear from you.
                    Please fill out the form below or reach us via email.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                     <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Mail size={28} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 dark:text-white">Email Us</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">support@mybirthdayfacts.com</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 dark:text-white">Our Office</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">123 History Lane, Digital City</p>
                        </div>
                     </div>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                            <input type="text" id="name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                            <input type="email" id="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Message</label>
                        <textarea id="message" rows={6} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white resize-none" placeholder="Tell us how we can help..."></textarea>
                    </div>
                    <button type="button" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 group">
                        Send Message <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
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

export default Contact;
