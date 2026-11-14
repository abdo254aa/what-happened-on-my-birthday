
import React, { useState } from 'react';
import { Mail, Globe, Send, CheckCircle2, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { dir } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message before submitting.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <SEOHead
        title="Contact Us | MyBirthdayFacts (mybirthday.world)"
        description="Get in touch with the MyBirthdayFacts editorial desk for historical corrections, data inquiries, partnerships, or support."
        type="website"
      />
      <div className="max-w-[1400px] mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <main className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-16 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Contact Us</h1>
                
                <p className="text-slate-600 dark:text-slate-400 mb-12 text-xl font-medium leading-relaxed max-w-2xl">
                    Have questions about our historical archive, want to suggest an archival correction, or need technical support? Reach out to our editorial team using the form below or via our official email address.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                     <a href="mailto:contact@mybirthday.world" className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Mail size={26} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-black text-slate-900 dark:text-white">Editorial & Support Email</h3>
                            <p className="text-blue-600 dark:text-blue-400 text-sm font-bold break-all">contact@mybirthday.world</p>
                        </div>
                     </a>
                     <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Globe size={26} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 dark:text-white">Digital Editorial Desk</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold flex items-center gap-1.5 mt-0.5">
                              <Clock size={14} /> Typical response within 24–48 hours
                            </p>
                        </div>
                     </div>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 space-y-4">
                    <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 size={28} />
                      <h2 className="text-2xl font-black">Message Prepared Successfully</h2>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Thank you, <strong>{name}</strong>. Your inquiry regarding <strong>{subject}</strong> has been recorded. For immediate direct delivery from your email client, you can also click below to email our editorial desk at <strong>contact@mybirthday.world</strong>.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={`mailto:contact@mybirthday.world?subject=${encodeURIComponent(`[${subject}] Inquiry from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-black text-sm shadow-md transition-all"
                      >
                        <Mail size={18} /> Open in Email App
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setMessage('');
                        }}
                        className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                      {error && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-bold">
                          {error}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                          <div className="space-y-2">
                              <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                              <input
                                type="text"
                                id="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white"
                                placeholder="Your full name"
                              />
                          </div>
                          <div className="space-y-2">
                              <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white"
                                placeholder="you@example.com"
                              />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label htmlFor="subject" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Topic</label>
                          <select
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Historical Data Correction">Historical Data Correction</option>
                            <option value="Privacy & Legal Request">Privacy & Legal Request</option>
                            <option value="Technical Support">Technical Support</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <label htmlFor="message" className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Message</label>
                          <textarea
                            id="message"
                            rows={6}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 dark:text-white resize-none"
                            placeholder="Tell us how we can help..."
                          ></textarea>
                      </div>
                      <button type="submit" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 group">
                          Send Message <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                  </form>
                )}
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
