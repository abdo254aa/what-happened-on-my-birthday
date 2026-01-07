
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBirthdayInsights } from '../services/staticDataService';
import { calculatePersonalStats, formatDate } from '../utils/dateUtils';
import { BirthdayData, PersonalStats } from '../types';
import { 
  ArrowLeft, Sparkles, Calendar, ArrowRight, BarChart3, Clock, Globe, Zap, Users, 
  Music, Laptop, Heart, Newspaper, Loader2, Database, Share2, Trees, Radio, 
  Eye, Palette, Coffee, Utensils, Plane, Trophy, Gamepad2, GraduationCap, MessageCircle,
  Activity, Lightbulb, Moon, Headphones, Wifi, Rocket, HelpCircle, ChevronDown
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAdmin } from '../contexts/AdminContext';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import { generateResultsMetadata, generateFAQSchema } from '../data/seoHelpers';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir, language } = useLanguage();
  const { headingScale, bodyScale, lineHeight } = useSettings();
  const { globalStyles } = useAdmin();
  
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const day = Number(searchParams.get('day'));
  const month = Number(searchParams.get('month'));
  const year = Number(searchParams.get('year'));

  const [data, setData] = useState<BirthdayData | null>(null);
  const [stats, setStats] = useState<PersonalStats | null>(null);
  const [loading, setLoading] = useState(true);

  // SEO: Generate Metadata
  const seoData = useMemo(() => {
    if (!day || !month || !year) return { title: 'MyBirthdayFacts', description: '' };
    return generateResultsMetadata(day, month, year, language);
  }, [day, month, year, language]);

  // SEO: Generate Schema
  const schemaData = useMemo(() => {
    if (!stats || !day || !month || !year) return null;
    return generateFAQSchema(stats, day, month, year);
  }, [stats, day, month, year]);

  const reportId = useMemo(() => {
    return `DB-REF-${day}${month}${year}-${Math.abs((day * month * year) % 99999)}`;
  }, [day, month, year]);

  useEffect(() => {
    if (!day || !month || !year) {
      navigate('/');
      return;
    }
    
    setData(null);
    setStats(null);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const loadData = async () => {
      try {
        const insights = await fetchBirthdayInsights(day, month, year, language); 
        const calculatedStats = calculatePersonalStats(day, month, year);
        setData(insights);
        setStats(calculatedStats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [day, month, year, language, navigate]);
  
  if (!day || !month || !year) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors p-6 text-center">
        <Loader2 size={50} className="animate-spin text-blue-600 mb-6" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('loading_title')}</h2>
        <p className="text-slate-500 font-bold">Synchronizing Global Databases for {day}/{month}/{year}...</p>
      </div>
    );
  }

  if (!data || !stats) return null;

  const article = data.article as any;
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const dynamicHeadingStyle = { 
    fontSize: `calc(${headingScale} * 100%)`, 
    textAlign: globalStyles.textAlign as any
  };
  
  const dynamicBodyStyle = { 
    fontSize: `calc(${bodyScale} * 95%)`, 
    lineHeight: Math.max(1.5, lineHeight - 0.2), 
    textAlign: globalStyles.textAlign as any
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: article.title, 
          url: window.location.href 
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  };

  const renderSection = (title: string, content: string, icon: React.ReactNode, colorClass: string) => (
    <section className="mb-12 last:mb-0 group border-b border-slate-100 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${colorClass} shadow-md border border-slate-100 dark:border-slate-700 shrink-0`}>
              {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
            </div>
            <h2 style={dynamicHeadingStyle} className="text-slate-900 dark:text-white font-display font-black text-xl md:text-2xl lg:text-3xl tracking-tight">
                {title}
            </h2>
        </div>
        <div 
          style={dynamicBodyStyle} 
          className="text-base md:text-lg font-medium text-slate-700 dark:text-slate-300 space-y-4 text-justify antialiased leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
    </section>
  );

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      
      <SEOHead 
        title={seoData.title} 
        description={seoData.description} 
        schema={schemaData || undefined}
      />

      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-6 py-3 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="flex items-center text-sm md:text-base font-black text-slate-500 hover:text-blue-600 transition-all gap-2 group">
                <ArrowIcon size={20} className="group-hover:-translate-x-1 transition-transform" /> {t('new_date')}
            </button>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 items-center gap-2">
                  <Database size={12} /> {reportId}
               </div>
               <button onClick={handleShare} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Share2 size={18} />
               </button>
            </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="mt-2 mb-0">
          <AdPlaceholder slot="header" className="!my-0 !pb-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-8">
            <article className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-10 overflow-hidden relative">
                
                <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-10">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 shadow-sm">
                       <Newspaper size={14} /> {t('your_personal_report')}
                    </div>
                    <h1 style={dynamicHeadingStyle} className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                        {article.title}
                    </h1>
                    <div style={dynamicBodyStyle} className="text-base md:text-lg italic text-slate-500 dark:text-slate-400 border-l-[6px] border-blue-600 px-6 mb-10 leading-relaxed rtl:border-l-0 rtl:border-r-[6px] rtl:pr-6">
                        {article.intro}
                    </div>
                    
                    {/* Compact Stats Grid - Horizontal on Mobile */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[140px] hover:border-blue-300 transition-colors">
                             <div className="text-blue-600 mb-1 sm:mb-2"><BarChart3 className="w-5 h-5 sm:w-7 sm:h-7" /></div>
                             <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('age')}</div>
                             <div className="text-sm sm:text-3xl font-black text-slate-900 dark:text-white">{stats.age}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[140px] hover:border-emerald-300 transition-colors">
                             <div className="text-emerald-600 mb-1 sm:mb-2"><Clock className="w-5 h-5 sm:w-7 sm:h-7" /></div>
                             <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('born_on')}</div>
                             <div className="text-sm sm:text-2xl font-black text-slate-900 dark:text-white truncate max-w-full px-1">{stats.dayOfWeekBorn}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[140px] hover:border-purple-300 transition-colors">
                             <div className="text-purple-600 mb-1 sm:mb-2"><Sparkles className="w-5 h-5 sm:w-7 sm:h-7" /></div>
                             <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('zodiac')}</div>
                             <div className="text-sm sm:text-2xl font-black text-slate-900 dark:text-white truncate max-w-full px-1">{stats.zodiacSign}</div>
                        </div>
                    </div>
                </header>

                <div className="space-y-8">
                    {renderSection(article.eventsTitle, article.eventsContent, <Globe />, "text-blue-600")}
                    <AdPlaceholder slot="content" className="!my-6" />
                    
                    {renderSection(article.seasonTitle, article.seasonContent, <Zap />, "text-amber-500")}
                    
                    {renderSection(article.famousPeopleTitle, article.famousPeopleContent, <Users />, "text-purple-600")}
                    
                    {/* NEW SECTION 1 */}
                    {renderSection(article.gamingTitle, article.gamingContent, <Gamepad2 />, "text-indigo-500")}
                    
                    {/* NEW STRUCTURE SECTION 1 */}
                    {renderSection(article.healthTitle, article.healthContent, <Activity />, "text-red-500")}

                    {/* NEW MICRO SECTION 1 */}
                    {renderSection(article.rhythmTitle, article.rhythmContent, <Headphones />, "text-pink-600")}

                    {renderSection(article.technologyTitle, article.technologyContent, <Laptop />, "text-emerald-600")}
                    <AdPlaceholder slot="content" className="!my-6" />
                    
                    {renderSection(article.mediaTitle, article.mediaContent, <Radio />, "text-indigo-600")}
                    
                    {/* NEW SECTION 2 */}
                    {renderSection(article.schoolTitle, article.schoolContent, <GraduationCap />, "text-yellow-600")}
                    
                    {/* NEW STRUCTURE SECTION 2 */}
                    {renderSection(article.wisdomTitle, article.wisdomContent, <Lightbulb />, "text-amber-500")}

                    {/* NEW MICRO SECTION 2 */}
                    {renderSection(article.digitalTitle, article.digitalContent, <Wifi />, "text-cyan-500")}

                    {renderSection(article.culinaryTitle, article.culinaryContent, <Utensils />, "text-orange-500")}

                    {renderSection(article.environmentalTitle, article.environmentalContent, <Trees />, "text-green-600")}
                    
                    {renderSection(article.travelTitle, article.travelContent, <Plane />, "text-sky-500")}

                    {renderSection(article.sportsTitle, article.sportsContent, <Trophy />, "text-yellow-500")}

                    {/* NEW SECTION 3 */}
                    {renderSection(article.socialTitle, article.socialContent, <MessageCircle />, "text-pink-500")}
                    
                    {/* NEW STRUCTURE SECTION 3 */}
                    {renderSection(article.mysticalTitle, article.mysticalContent, <Moon />, "text-purple-500")}

                    {/* NEW MICRO SECTION 3 */}
                    {renderSection(article.cosmicTitle, article.cosmicContent, <Rocket />, "text-violet-500")}

                    {renderSection(article.aestheticTitle, article.aestheticContent, <Palette />, "text-cyan-500")}
                    
                    {renderSection(article.generationTitle, article.generationContent, <Coffee />, "text-orange-500")}
                    <AdPlaceholder slot="content" className="!my-6" />
                    
                    {renderSection(article.futureTitle, article.futureContent, <Eye />, "text-rose-600")}
                    
                    {renderSection(article.entertainmentTitle, article.entertainmentContent, <Music />, "text-pink-600")}
                </div>

                {/* FAQ Section for Rich Snippets */}
                <section className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-3 mb-8">
                      <HelpCircle size={28} className="text-blue-600" />
                      <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 dark:text-white">
                        {language === 'ar' ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
                      </h2>
                   </div>
                   <div className="grid gap-4">
                      {schemaData?.mainEntity.map((q: any, i: number) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                           <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                             {q.name}
                             <ChevronDown size={20} className="text-slate-400" />
                           </h3>
                           <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                             {q.acceptedAnswer.text}
                           </p>
                        </div>
                      ))}
                   </div>
                </section>

                <footer className="mt-20 pt-16 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 -mx-6 md:-mx-10 p-8 text-center md:text-left rtl:md:text-right">
                    <h2 style={dynamicHeadingStyle} className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-blue-600 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                      <Heart size={40} className="text-red-500 fill-red-500" />
                      <span>{article.conclusionTitle}</span>
                    </h2>
                    <div style={dynamicBodyStyle} className="text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed text-justify">
                        {article.conclusionContent}
                    </div>
                    <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-center">
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">ARCHIVE ID: {reportId}</p>
                    </div>
                </footer>
            </article>
            <div className="mt-8"><AdPlaceholder slot="footer" /></div>
          </main>
          {/* UPDATED SIDEBAR STICKY POSITION */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-4 self-start h-fit"><Sidebar /></aside>
        </div>
      </div>
    </div>
  );
};

export default Results;
