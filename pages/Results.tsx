
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBirthdayInsights } from '../services/staticDataService';
import { calculatePersonalStats, formatDate, formatJustifiedText } from '../utils/dateUtils';
import { BirthdayData, PersonalStats } from '../types';
import { 
  ArrowLeft, Sparkles, Calendar, ArrowRight, BarChart3, Clock, Globe, Zap, Users, 
  Music, Laptop, Heart, Newspaper, Loader2, Database, Share2, Trees, Radio, 
  Eye, Palette, Coffee, Utensils, Plane, Trophy, Gamepad2, GraduationCap, MessageCircle,
  Activity, Lightbulb, Moon, Headphones, Wifi, Rocket, HelpCircle, ChevronDown, Check
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAdmin } from '../contexts/AdminContext';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOHead from '../components/SEOHead';
import { generateResultsMetadata, generateFAQSchema } from '../data/seoHelpers';

const SingleLineSubheading: React.FC<{ title: string }> = ({ title }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement>(null);

  React.useLayoutEffect(() => {
    let rafId: number | null = null;

    const fitText = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const isMobile = window.innerWidth < 640;
      const maxFontSize = isMobile ? 19 : 23;
      const minFontSize = isMobile ? 14 : 16;

      text.style.fontSize = `${maxFontSize}px`;
      const availableWidth = container.clientWidth;
      const textWidth = text.scrollWidth;

      if (textWidth > availableWidth && availableWidth > 0) {
        const scaled = Math.max(minFontSize, Math.floor(((availableWidth / textWidth) * maxFontSize - 0.3) * 10) / 10);
        text.style.fontSize = `${scaled}px`;
      }
    };

    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(fitText);
    };

    fitText();
    window.addEventListener('resize', handleResize);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [title]);

  return (
    <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden">
      <h2
        ref={textRef}
        className="text-slate-900 dark:text-white font-display font-black whitespace-nowrap tracking-tight leading-snug"
      >
        {title}
      </h2>
    </div>
  );
};

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
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

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

  const dynamicHeadingStyle = {};
  
  const dynamicBodyStyle = { 
    ...(bodyScale !== 1 ? { fontSize: `calc(${bodyScale} * 100%)` } : {}),
    lineHeight: Math.max(1.65, lineHeight), 
    textAlign: 'justify' as const,
    hyphens: 'auto' as const,
    WebkitHyphens: 'auto' as const
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    }
  };

  const renderSection = (title: string, content: string, _icon?: React.ReactNode, _colorClass?: string) => (
    <section className="mb-6 last:mb-0 group border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div className="flex items-center mb-3">
            <SingleLineSubheading title={title} />
        </div>
        <div 
          lang={language}
          style={dynamicBodyStyle} 
          className="article-justified text-[15.5px] sm:text-[17px] md:text-[18.5px] font-medium text-slate-900 dark:text-slate-100 space-y-3 text-justify antialiased leading-[1.75] md:leading-[1.8]" 
          dangerouslySetInnerHTML={{ __html: formatJustifiedText(content) }} 
        />
    </section>
  );

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir} lang={language}>
      
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
               <button 
                  onClick={handleShare} 
                  className={`p-2 rounded-full transition-all ${showCopyFeedback ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white'}`}
                  aria-label="Share"
                >
                  {showCopyFeedback ? <Check size={18} /> : <Share2 size={18} />}
               </button>
            </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-2.5 sm:px-4 md:px-6">
        <div className="mt-2 mb-0">
          <AdPlaceholder slot="header" className="!my-0 !pb-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-8">
            <article lang={language} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl p-4 sm:p-6 md:p-10 overflow-hidden relative">
                
                <header className="mb-7 border-b border-slate-100 dark:border-slate-800 pb-7">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 shadow-sm">
                       <Newspaper size={14} /> {t('your_personal_report')}
                    </div>
                    <h1 style={dynamicHeadingStyle} className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-5 leading-snug tracking-tight">
                        {article.title}
                    </h1>
                    
                    {/* Compact Stats Grid - Placed BEFORE Introduction */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
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

                    {article.intro && (
                      <div lang={language} style={dynamicBodyStyle} className="article-justified text-[15.5px] sm:text-[17px] md:text-[18.5px] font-medium text-slate-900 dark:text-slate-100 border-l-[4px] sm:border-l-[5px] border-blue-600 px-3.5 sm:px-5 mb-0 leading-[1.75] md:leading-[1.8] text-justify rtl:border-l-0 rtl:border-r-[4px] sm:rtl:border-r-[5px] rtl:pr-3.5 sm:rtl:pr-5">
                          {formatJustifiedText(article.intro)}
                      </div>
                    )}
                </header>

                <div className="space-y-5">
                    {renderSection(article.eventsTitle, article.eventsContent, <Globe />, "text-blue-600")}
                    <AdPlaceholder slot="content" className="!my-3" />
                    
                    {renderSection(article.technologyTitle, article.technologyContent, <Gamepad2 />, "text-emerald-600")}
                    
                    {renderSection(article.entertainmentTitle, article.entertainmentContent, <Music />, "text-pink-600")}
                    
                    {renderSection(article.seasonTitle, article.seasonContent, <Zap />, "text-amber-500")}
                    <AdPlaceholder slot="content" className="!my-3" />

                    {renderSection(article.aestheticTitle, article.aestheticContent, <Palette />, "text-cyan-500")}

                    {renderSection(article.famousPeopleTitle, article.famousPeopleContent, <Users />, "text-purple-600")}

                    {renderSection(article.mediaTitle, article.mediaContent, <Eye />, "text-indigo-600")}
                    <AdPlaceholder slot="content" className="!my-3" />

                    {renderSection(article.futureTitle, article.futureContent, <Activity />, "text-rose-600")}

                    {renderSection(article.environmentalTitle, article.environmentalContent, <Trees />, "text-green-600")}

                    {renderSection(article.cosmicTitle, article.cosmicContent, <Moon />, "text-violet-500")}
                </div>

                <footer className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 -mx-4 sm:-mx-6 md:-mx-10 p-5 sm:p-8 text-center md:text-left rtl:md:text-right">
                    <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl sm:text-2xl md:text-3xl font-black mb-5 tracking-tight text-blue-600 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                      <Heart size={32} className="text-red-500 fill-red-500 shrink-0" />
                      <span>{article.conclusionTitle}</span>
                    </h2>
                    <div style={{ fontFamily: 'var(--font-body)' }} className="text-[15px] sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed text-justify article-justified">
                        {formatJustifiedText(article.conclusionContent)}
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
