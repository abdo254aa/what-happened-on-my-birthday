
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronRight, Newspaper, Loader2, ArrowLeft, Gift, Sparkles, Calendar, BookOpen } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import Sidebar from '../components/Sidebar';
import SEOHead from '../components/SEOHead';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getMonths } from '../utils/dateUtils';
import { MONTHS } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { descriptionItems } = useContent(); 
  const { t, language, dir } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const daysArr = Array.from({ length: 31 }, (_, i) => i + 1);
  const yearsArr = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const localizedMonths = getMonths(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !month || !year) return;
    setLoading(true);
    navigate(`/results?day=${day}&month=${month}&year=${year}`);
  };

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = dir === 'rtl' ? ArrowLeft : ChevronRight;

  const today = new Date();
  const tDay = today.getDate();
  const tMonth = today.getMonth() + 1;
  const mName = MONTHS[tMonth - 1];
  const tDateStr = language === 'ar' ? `${tDay} ${mName}` : `${mName} ${tDay}`;

  const dailyArticles = [
    { id: 'history-of-birthdays', titleKey: 's_events_date', icon: <Calendar />, color: 'from-blue-600 to-indigo-600' },
    { id: 'famous-birthdays', titleKey: 's_famous_date', icon: <Gift />, color: 'from-amber-500 to-orange-600' },
    { id: 'zodiac-magic-guide', titleKey: 's_horoscope_date', icon: <Sparkles />, color: 'from-purple-600 to-pink-600' },
  ];

  const getLabel = (key: string) => {
    return t(key).replace('{date}', tDateStr);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300" dir={dir}>
      
      <SEOHead 
        title={language === 'ar' ? 'ماذا حدث في يوم ميلادك؟ - اكتشف الحقائق' : 'What Happened On My Birthday? Discover Your Personal History'} 
        description={language === 'ar' ? 'اكتشف الأحداث التاريخية، المشاهير، وأسرار يوم ميلادك في تقرير شامل ومجاني.' : 'Find out everything about your birthday—from historical events to famous birthdays and horoscope details. Visit our site for unique fun facts and celebrate your day like never before.'}
        type="website"
      />

      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="max-w-[1400px] mx-auto px-4">
             <AdPlaceholder slot="header" className="!my-0 !py-4" />
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 pb-4 md:pb-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            <main className="lg:col-span-8 space-y-3 md:space-y-6 order-1 lg:order-1">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] shadow-lg shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 p-4 sm:p-5 md:p-10 relative overflow-hidden group">
                     <div className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl opacity-40 -mr-24 -mt-24 pointer-events-none`}></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-full md:justify-start gap-2 mb-4 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-widest">
                           <Gift size={12} /> {t('site_name_part1')}{' '}{t('site_name_part2')}
                        </div>
                        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-slate-900 dark:text-white mb-4 leading-[1.1] tracking-tighter text-center md:text-left">
                            {t('hero_title_1')} <span className="text-blue-600 dark:text-blue-400 block md:inline">{t('hero_title_2')}</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold text-sm md:text-base max-w-2xl leading-relaxed text-center md:text-left px-2 md:px-0 text-justify">
                            {t('hero_subtitle')}
                        </p>
                        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-3 md:p-6 border border-slate-100 dark:border-slate-700">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Compact grid for mobile */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1 text-center">{t('label_year')}</label>
                                        <select required value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-1 sm:px-3 py-3 outline-none font-bold text-sm sm:text-base text-center appearance-none">
                                            <option value="" disabled>{t('label_year')}</option>
                                            {yearsArr.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1 text-center">{t('label_month')}</label>
                                        <select required value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-1 sm:px-3 py-3 outline-none font-bold text-sm sm:text-base text-center appearance-none">
                                            <option value="" disabled>{t('label_month')}</option>
                                            {localizedMonths.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block px-1 text-center">{t('label_day')}</label>
                                        <select required value={day} onChange={(e) => setDay(Number(e.target.value))} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-1 sm:px-3 py-3 outline-none font-bold text-sm sm:text-base text-center appearance-none">
                                            <option value="" disabled>{t('label_day')}</option>
                                            {daysArr.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-xl py-3.5 shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70">
                                    {loading ? <Loader2 className="animate-spin" size={20}/> : <>{t('btn_reveal')} <ArrowIcon size={20} /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-10 md:space-y-14 mb-16">
                        {descriptionItems.map((item) => (
                            <div key={item.id} className="border-t border-slate-100 dark:border-slate-800 pt-10 first:border-0 first:pt-0">
                                <h3 className={`font-display font-black text-xl md:text-4xl text-slate-900 dark:text-white mb-4 tracking-tighter`}>{item.title}</h3>
                                <p className={`text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed font-medium text-justify`}>{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <AdPlaceholder slot="content" />
                    <div className="flex items-center gap-3 mb-8 border-t border-slate-100 dark:border-slate-800 pt-12">
                        <Newspaper size={28} className="text-blue-600" />
                        <h2 className="font-display font-black text-xl md:text-3xl text-slate-900 dark:text-white tracking-tighter">
                           {language === 'ar' ? `حدث في ${tDateStr}` : `Happening on ${tDateStr}`}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dailyArticles.map((art, idx) => (
                            <Link key={idx} to={`/article/${art.id}?d=${tDay}&m=${tMonth}`} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-5 md:p-8 hover:shadow-2xl transition-all relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${art.color} opacity-[0.05] rounded-bl-[100%] transition-transform group-hover:scale-110`}></div>
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${art.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20`}>
                                        {React.cloneElement(art.icon as React.ReactElement, { size: 28 })}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-tight">
                                        {getLabel(art.titleKey)}
                                    </h3>
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-black text-sm group-hover:gap-3 gap-2 transition-all">
                                        {t('read_article')} <ChevronIcon size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* SEO: Browse By Month Structure */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-12">
                       <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest">
                         {language === 'ar' ? 'تصفح حسب الشهر' : 'Browse History by Month'}
                       </h3>
                       <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {localizedMonths.map((m, idx) => (
                             <Link 
                               key={idx} 
                               to={`/results?day=1&month=${idx + 1}&year=${currentYear - 20}`}
                               className="bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl py-3 text-center text-sm font-bold transition-colors border border-slate-100 dark:border-slate-700"
                             >
                               {m}
                             </Link>
                          ))}
                       </div>
                    </div>
                </div>
            </main>

            <aside className="lg:col-span-4 order-2 lg:order-2 hidden lg:block">
                <div className="sticky top-24">
                    <Sidebar />
                </div>
            </aside>
            
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-8 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4">
             <AdPlaceholder slot="footer" />
        </div>
      </section>
    </div>
  );
};

export default Home;
