import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Newspaper, Loader2, ArrowLeft, Gift, Sparkles, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import Sidebar from '../components/Sidebar';
import SEOHead from '../components/SEOHead';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getMonths, formatJustifiedText } from '../utils/dateUtils';
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
  const [isMobileView, setIsMobileView] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const formatHomeText = (text: string) => (isMobileView ? formatJustifiedText(text) : text);

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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300" dir={dir} lang={language}>
      
      <SEOHead 
        title="Historical Birthday Archive: Events, Icons & Era Reconstruction" 
        description="Access a professional historical reconstruction of your birth date. Documenting geopolitical milestones, cultural zeitgeist, and generational profiles for the last 70 years."
        type="website"
      />

      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
             <AdPlaceholder slot="header" className="!my-0 !py-3.5" />
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-3 sm:px-6 pb-6 md:pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-7 items-start">
            
            <main className="lg:col-span-8 space-y-6 order-1 lg:order-1">
                
                {/* HERO SECTION - REFINED TITLE SIZE AND SPACING */}
                <div className="bg-white dark:bg-slate-900 rounded-[1.85rem] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-lg shadow-slate-200/40 dark:shadow-none">
                     <div className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>
                    
                    <div className="relative z-10 text-center md:text-left rtl:md:text-right">
                        <div className="inline-flex items-center gap-1.5 mb-3 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-[9.5px] md:text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0">
                           <ShieldCheck size={12} /> Verified Historical Repository
                        </div>
                        
                        <h1 className="font-display font-black text-xl sm:text-2xl md:text-[33px] text-slate-900 dark:text-white mb-3.5 tracking-normal leading-snug">
                            {t('hero_title_1')} <span className="text-blue-600 dark:text-blue-500">{t('hero_title_2')}</span>
                        </h1>
                        
                        <p className="text-slate-500 dark:text-slate-400 mb-5 font-medium text-[14.5px] sm:text-[15.5px] md:text-[16px] max-w-[615px] mx-auto md:mx-0 leading-relaxed text-justify md:text-left rtl:md:text-right">
                            {formatHomeText("Our database provides a rigorous analytical reconstruction of the world as it stood on the morning of your arrival. We synchronize individual milestones with documented geopolitical shifts and cultural evolutions.")}
                        </p>
                        
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-5 md:p-5.5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9.5px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_year')}</label>
                                        <div className="relative">
                                            <select required value={year} onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setYear(val);
                                                window.dispatchEvent(new CustomEvent('birthday-date-change', { detail: { day: day || undefined, month: month || undefined, year: val } }));
                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 sm:px-3 py-2.5 md:py-2.5 outline-none font-black text-xs sm:text-sm md:text-[15px] text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_year')}</option>
                                                {yearsArr.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9.5px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_month')}</label>
                                        <div className="relative">
                                            <select required value={month} onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setMonth(val);
                                                window.dispatchEvent(new CustomEvent('birthday-date-change', { detail: { day: day || undefined, month: val, year: year || undefined } }));
                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 sm:px-3 py-2.5 md:py-2.5 outline-none font-black text-xs sm:text-sm md:text-[15px] text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_month')}</option>
                                                {localizedMonths.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9.5px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">{t('label_day')}</label>
                                        <div className="relative">
                                            <select required value={day} onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setDay(val);
                                                window.dispatchEvent(new CustomEvent('birthday-date-change', { detail: { day: val, month: month || undefined, year: year || undefined } }));
                                            }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 sm:px-3 py-2.5 md:py-2.5 outline-none font-black text-xs sm:text-sm md:text-[15px] text-center appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 dark:text-white cursor-pointer hover:border-blue-300">
                                                <option value="" disabled>{t('label_day')}</option>
                                                {daysArr.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" disabled={loading} className="w-full mt-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm md:text-base rounded-xl py-2.5 md:py-3 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 group hover:-translate-y-0.5">
                                    {loading ? <Loader2 className="animate-spin" size={19}/> : <>{t('btn_reveal')} <ArrowIcon size={19} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* UNIFIED DESCRIPTION SECTION */}
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-8 md:p-10 rounded-[1.85rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col">
                        {descriptionItems.map((item, idx) => (
                            <div key={item.id} className={idx !== 0 ? "mt-7 md:mt-9" : ""}>
                                <h3 className="font-display font-black text-lg sm:text-xl md:text-[24px] text-slate-900 dark:text-white mb-2.5 md:mb-3.5 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="article-justified text-slate-700 dark:text-slate-300 text-[15px] sm:text-[16px] md:text-[16.5px] font-medium leading-[1.75] text-justify mb-0">
                                    {formatHomeText(item.content)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-3.5 md:mb-4">
                            <div className="p-2 md:p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 shrink-0">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="font-display font-black text-lg sm:text-xl md:text-[24px] text-slate-900 dark:text-white tracking-tight">
                                Our Editorial Methodology
                            </h2>
                        </div>
                        <p className="article-justified text-slate-700 dark:text-slate-300 text-[15px] sm:text-[16px] md:text-[16.5px] font-medium leading-[1.75] text-justify">
                            {formatHomeText("The archival data presented by MyBirthdayFacts is the result of a rigorous multi-step analytical process. We aggregate primary historical sources, socio-economic reports, and documented cultural milestones to create a comprehensive snapshot of a specific point in history. Our editorial board prioritizes substance and depth, ensuring that every insight moves beyond mere trivia to offer genuine analytical value. By synchronizing personal birth dates with the broader human narrative, we aim to preserve cultural memory and provide a profound understanding of the forces that shape our identities.")}
                        </p>
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