
import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { getEditorialArticle } from '../services/editorialService';
import { calculatePersonalStats } from '../utils/dateUtils';
import { 
  ArrowLeft, Clock, Share2, ArrowRight, Sparkles, Calendar, Bookmark, 
  MessageSquare, Heart, Globe, Zap, Users, Music, Laptop, Newspaper, Database, BarChart3,
  Star, MessageCircle, Flag, Moon, Shield, Cloud, Eye, Sun, TrendingUp, Activity, Camera, Map, Coffee, Award, Book
} from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import Sidebar from '../components/Sidebar';
import SEOHead from '../components/SEOHead';
import { generateArticleMetadata } from '../data/seoHelpers';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAdmin } from '../contexts/AdminContext';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, dir, language } = useLanguage();
  const { headingScale, bodyScale, lineHeight } = useSettings();
  const { globalStyles } = useAdmin();

  const searchParams = new URLSearchParams(location.search);
  // Support both 'd' and 'day' etc.
  const d = Number(searchParams.get('d') || searchParams.get('day')) || new Date().getDate();
  const m = Number(searchParams.get('m') || searchParams.get('month')) || (new Date().getMonth() + 1);
  const y = Number(searchParams.get('year')) || new Date().getFullYear();
  const hasSpecificYear = searchParams.has('year');

  // Load Data
  const articleData = useMemo(() => {
    let post = blogPosts.find(p => p.id === id);
    if (!post && id) {
      const editorial = getEditorialArticle(id, d, m);
      if (editorial) return editorial;
    }
    return post;
  }, [id, d, m]);

  // Calculate Personal Stats
  const stats = useMemo(() => calculatePersonalStats(d, m, y), [d, m, y]);

  // SEO Metadata
  const seoData = useMemo(() => {
    if (!articleData) return { title: 'Article Not Found', description: '' };
    const content = 'intro' in articleData ? (articleData as any).intro : (articleData as any).excerpt;
    return generateArticleMetadata(articleData.title, content, articleData.category, language);
  }, [articleData, language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, location.search]);

  if (!articleData) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-slate-50 dark:bg-slate-950">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
        </div>
    );
  }

  const isEditorial = 'sections' in articleData;
  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const reportId = `ED-ART-${d}${m}-${id?.substring(0,4).toUpperCase()}`;

  // STYLING: EXACT MATCH to Results.tsx
  const dynamicHeadingStyle = { 
    fontSize: `calc(${headingScale} * 100%)`, 
    textAlign: globalStyles.textAlign as any
  };
  
  const dynamicBodyStyle = { 
    fontSize: `calc(${bodyScale} * 95%)`, // Match Results.tsx
    lineHeight: Math.max(1.5, lineHeight - 0.2), // Match Results.tsx
    textAlign: globalStyles.textAlign as any
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleData.title,
          url: window.location.href
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkles': return <Sparkles size={28} />;
      case 'heart': return <Heart size={28} />;
      case 'globe': return <Globe size={28} />;
      case 'zap': return <Zap size={28} />;
      case 'users': return <Users size={28} />;
      case 'music': return <Music size={28} />;
      case 'history': return <Calendar size={28} />;
      case 'star': return <Star size={28} />;
      case 'message-circle': return <MessageCircle size={28} />;
      case 'flag': return <Flag size={28} />;
      case 'moon': return <Moon size={28} />;
      case 'shield': return <Shield size={28} />;
      case 'cloud': return <Cloud size={28} />;
      case 'eye': return <Eye size={28} />;
      case 'calendar': return <Calendar size={28} />;
      case 'sun': return <Sun size={28} />;
      case 'trending-up': return <TrendingUp size={28} />;
      case 'activity': return <Activity size={28} />;
      case 'camera': return <Camera size={28} />;
      case 'map': return <Map size={28} />;
      case 'coffee': return <Coffee size={28} />;
      case 'award': return <Award size={28} />;
      case 'book': return <Book size={28} />;
      default: return <Sparkles size={28} />;
    }
  };

  const renderSection = (title: string, content: string, icon: React.ReactNode, colorClass: string) => (
    <section className="mb-12 last:mb-0 group border-b border-slate-100 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${colorClass} shadow-md border border-slate-100 dark:border-slate-700 shrink-0`}>
              {icon}
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
      />

      {/* HEADER: Matches Results.tsx Structure */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-6 py-3 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="flex items-center text-sm md:text-base font-black text-slate-500 hover:text-blue-600 transition-all gap-2 group">
                <ArrowIcon size={20} className="group-hover:-translate-x-1 transition-transform" /> {t('back_home')}
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
                       <Newspaper size={14} /> {articleData.category || t('latest_stories')}
                    </div>
                    <h1 style={dynamicHeadingStyle} className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                        {articleData.title}
                    </h1>
                    <div style={dynamicBodyStyle} className="text-base md:text-lg italic text-slate-500 dark:text-slate-400 border-l-[6px] border-blue-600 px-6 mb-10 leading-relaxed rtl:border-l-0 rtl:border-r-[6px] rtl:pr-6">
                        {isEditorial ? (articleData as any).intro : (articleData as any).excerpt}
                    </div>

                    {/* Stats/Info Grid - ONLY SHOW if we have a specific year (Personal Report context) */}
                    {hasSpecificYear && (
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
                    )}
                </header>

                <div className="space-y-8">
                    {isEditorial ? (
                      (articleData as any).sections.map((sec: any, idx: number) => (
                        <React.Fragment key={idx}>
                          {renderSection(sec.title, sec.content, getIcon(sec.iconType), sec.colorClass)}
                          {idx === 1 && <div className="my-6"><AdPlaceholder slot="content" /></div>}
                        </React.Fragment>
                      ))
                    ) : (
                      <div className="prose prose-slate dark:prose-invert max-w-none" style={dynamicBodyStyle} dangerouslySetInnerHTML={{ __html: (articleData as any).content }} />
                    )}
                </div>

                <footer className="mt-20 pt-16 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 -mx-6 md:-mx-10 p-8 text-center md:text-left rtl:md:text-right">
                    <h2 style={dynamicHeadingStyle} className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-blue-600 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                      <Heart size={40} className="text-red-500 fill-red-500" />
                      <span>{isEditorial ? (articleData as any).conclusionTitle : "Keep Exploring!"}</span>
                    </h2>
                    <div style={dynamicBodyStyle} className="text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed text-justify">
                        {isEditorial ? (articleData as any).conclusionContent : "History is vast and every day is a miracle. We're glad you're part of it."}
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

export default ArticlePage;
