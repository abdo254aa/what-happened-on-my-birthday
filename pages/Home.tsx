
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Newspaper, Loader2, ArrowLeft, Gift, Sparkles, Calendar, BookOpen } from 'lucide-react';
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
    { id: 'history-of-birthdays', titleKey: 's_events_date', icon: <Calendar />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
    { id: 'famous-birthdays', titleKey: 's_famous_date', icon: <Gift />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
    { id: 'zodiac-magic-guide', titleKey: 's_horoscope_date', icon: <Sparkles />, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
    { id: 'birthday-love-compatibility', titleKey: 's_love_match', icon: <Gift />, color: 'text-pink-600 bg-pink-50 dark:bg-pink-900/20' },
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

      <section className="max-w-[1400px] mx-auto px-4 pb-6 md:pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            
            <main className="lg:col-span-8 space-y-6 order-1 lg:order-1">
                
                {/* HERO SECTION - REFINED TITLE SIZE AND SPACING */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative overflow-hidden shadow-lg shadow-slate-200/40 dark:shadow-none">
                     <div className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>
                    
                    <div className="relative z-10 text-center md:text-left rtl:md:text-right">
                        <div className="inline-flex items-center gap-2 mb-3 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0">
                           <Gift size={12} /> {t('site_name_part1')}{' '}{t('site_name_part2')}
                        </div>
                        
                        <h1 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-900 dark:text-white mb-4 tracking-normal leading-snug">
                            {t('hero_title_1')} <span className="text-blue-600 dark:text-blue-500">{t('hero_title_2')}</span>
                        </h1>
                        
                        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            {t('hero_subtitle')}
                        </p>
                        
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-3 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_year')}</label>
                                        <div className="relative">
                                            <select required value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 md:py-3 outline-none font-black text-sm md:text-base text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_year')}</option>
                                                {yearsArr.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_month')}</label>
                                        <div className="relative">
                                            <select required value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 md:py-3 outline-none font-black text-sm md:text-base text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_month')}</option>
                                                {localizedMonths.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_day')}</label>
                                        <div className="relative">
                                            <select required value={day} onChange={(e) => setDay(Number(e.target.value))} className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 md:py-3 outline-none font-black text-sm md:text-base text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_day')}</option>
                                                {daysArr.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" disabled={loading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-base md:text-lg rounded-xl py-3 md:py-3.5 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 group hover:-translate-y-1">
                                    {loading ? <Loader2 className="animate-spin" size={20}/> : <>{t('btn_reveal')} <ArrowIcon size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* UNIFIED DESCRIPTION SECTION */}
                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col">
                        {descriptionItems.map((item, idx) => (
                            <div key={item.id} className={idx !== 0 ? "mt-4" : ""}>
                                <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-800 dark:text-slate-200 text-xl md:text-2xl font-medium leading-relaxed text-justify mb-0">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-6">
                    <AdPlaceholder slot="content" />
                    
                    <div>
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <Newspaper size={20} className="text-blue-600" />
                            <h2 className="font-display font-black text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">
                            {language === 'ar' ? `حدث في ${tDateStr}` : `Happening on ${tDateStr}`}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {dailyArticles.map((art, idx) => (
                                <Link key={idx} to={`/article/${art.id}?d=${tDay}&m=${tMonth}`} className="group bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 p-6 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:-translate-y-1 shadow-md shadow-slate-100 dark:shadow-none hover:shadow-xl">
                                    <div className={`w-12 h-12 rounded-xl ${art.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        {React.cloneElement(art.icon as React.ReactElement<any>, { size: 24 })}
                                    </div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-tight">
                                        {getLabel(art.titleKey)}
                                    </h3>
                                    <div className="flex items-center text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs font-bold gap-2 transition-colors mt-3">
                                        {t('read_article')} <ChevronIcon size={14} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                         {language === 'ar' ? 'تصفح حسب الشهر' : 'Browse History by Month'}
                       </h3>
                       <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                          {localizedMonths.map((m, idx) => (
                             <Link 
                               key={idx} 
                               to={`/results?day=1&month=${idx + 1}&year=${currentYear - 20}`}
                               className="bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-400 rounded-lg py-2.5 text-center text-xs font-bold transition-all border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
                             >
                               {m}
                             </Link>
                          ))}
                       </div>
                    </div>
                </div>
            </main>

            <aside className="lg:col-span-4 order-2 lg:order-2 hidden lg:block">
                <div className="sticky top-24 space-y-6">
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
