
import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { getEditorialArticle } from '../services/editorialService';
import { 
  ArrowLeft, Clock, Share2, ArrowRight, Sparkles, Calendar, Bookmark, 
  MessageSquare, Heart, Globe, Zap, Users, Music, Laptop, Newspaper 
} from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import Sidebar from '../components/Sidebar';
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

  // Load Data
  const articleData = useMemo(() => {
    let post = blogPosts.find(p => p.id === id);
    if (!post && id) {
      const editorial = getEditorialArticle(id, d, m);
      if (editorial) return editorial;
    }
    return post;
  }, [id, d, m]);

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

  const dynamicHeadingStyle = { 
    fontSize: `calc(${headingScale} * 115%)`,
    textAlign: globalStyles.textAlign as any
  };
  
  const dynamicBodyStyle = { 
    fontSize: `calc(${bodyScale} * 100%)`,
    lineHeight: lineHeight,
    textAlign: globalStyles.textAlign as any
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkles': return <Sparkles size={36} />;
      case 'heart': return <Heart size={36} />;
      case 'globe': return <Globe size={36} />;
      case 'zap': return <Zap size={36} />;
      case 'users': return <Users size={36} />;
      case 'music': return <Music size={36} />;
      case 'history': return <Calendar size={36} />;
      default: return <Sparkles size={36} />;
    }
  };

  const renderSection = (title: string, content: string, icon: React.ReactNode, colorClass: string) => (
    <section className="mb-12 md:mb-16 last:mb-0">
        <h2 style={dynamicHeadingStyle} className="flex items-center gap-4 text-slate-900 dark:text-white font-display font-black text-3xl md:text-6xl mb-6 md:mb-8 tracking-tighter border-b-4 border-slate-100 dark:border-slate-800 pb-4 md:pb-6">
            <div className={`p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 dark:bg-slate-800 ${colorClass} shadow-inner shrink-0`}>{icon}</div>
            <span className="line-clamp-2 leading-none">{title}</span>
        </h2>
        <div 
          style={dynamicBodyStyle} 
          className="text-lg md:text-2xl lg:text-3xl font-bold leading-[1.7] text-slate-700 dark:text-slate-300 space-y-6 text-justify antialiased selection:bg-blue-600 selection:text-white" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
    </section>
  );

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      
      {/* Sticky Top Nav matching Results.tsx */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => navigate('/')} className="flex items-center text-sm md:text-xl font-black text-slate-500 hover:text-blue-600 transition-all gap-2 group">
                <ArrowIcon size={24} className="group-hover:-translate-x-1 transition-transform" /> {t('back_home')}
            </button>
            <div className="flex text-xs md:text-xl font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-6 py-2.5 rounded-full border border-blue-100 dark:border-blue-800 items-center gap-3">
                <Calendar size={22} />
                <span>{d}/{m}/{new Date().getFullYear()}</span>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="mt-2 mb-0">
          <AdPlaceholder slot="header" className="!my-0 !pb-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <main className="lg:col-span-8">
            <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-14 lg:p-20 overflow-hidden relative">
                <div className={`absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r ${articleData.imageGradient || 'from-blue-600 to-indigo-600'}`}></div>
                
                <header className="mb-16 border-b border-slate-100 dark:border-slate-800 pb-16">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] md:text-sm uppercase tracking-widest mb-6 bg-blue-50 dark:bg-blue-900/30 px-6 py-2.5 rounded-full border border-blue-100 dark:border-blue-800">
                       <Newspaper size={18} /> {articleData.category || t('latest_stories')}
                    </div>
                    <h1 style={dynamicHeadingStyle} className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tighter">
                        {articleData.title}
                    </h1>
                    <div style={dynamicBodyStyle} className="text-lg md:text-2xl lg:text-3xl italic font-black text-slate-500 dark:text-slate-400 border-l-[12px] md:border-l-[16px] border-blue-600 px-8 md:px-12 mb-12 leading-tight rtl:border-l-0 rtl:border-r-[12px] rtl:md:border-r-[16px] rtl:pr-8 rtl:md:pr-12">
                        {isEditorial ? (articleData as any).intro : (articleData as any).excerpt}
                    </div>

                    <div className="flex items-center gap-6 mt-12 text-slate-400 font-black text-xs md:text-sm uppercase tracking-[0.2em]">
                         <span className="flex items-center gap-2"><Clock size={20} /> {articleData.readTime}</span>
                         <span className="flex items-center gap-2"><Sparkles size={20} className="text-blue-500" /> Premium Content</span>
                    </div>
                </header>

                <div className="space-y-12 md:space-y-16">
                    {isEditorial ? (
                      (articleData as any).sections.map((sec: any, idx: number) => (
                        <React.Fragment key={idx}>
                          {renderSection(sec.title, sec.content, getIcon(sec.iconType), sec.colorClass)}
                          {idx === 0 && <div className="my-6"><AdPlaceholder slot="content" /></div>}
                        </React.Fragment>
                      ))
                    ) : (
                      <div className="prose prose-slate dark:prose-invert max-w-none" style={dynamicBodyStyle} dangerouslySetInnerHTML={{ __html: (articleData as any).content }} />
                    )}
                </div>

                <footer className="mt-20 pt-16 border-t-[10px] border-slate-900 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 -mx-6 md:-mx-14 lg:-mx-20 p-8 md:p-16">
                    <h2 style={dynamicHeadingStyle} className="text-3xl md:text-6xl font-black mb-10 tracking-tighter text-blue-600 leading-tight flex flex-wrap items-center gap-5">
                      <Heart size={50} className="text-red-500 fill-red-500 animate-pulse shrink-0" />
                      <span>{isEditorial ? (articleData as any).conclusionTitle : "Keep Exploring!"}</span>
                    </h2>
                    <div style={dynamicBodyStyle} className="text-lg md:text-3xl lg:text-4xl text-slate-800 dark:text-slate-200 font-black italic leading-relaxed text-justify antialiased">
                        {isEditorial ? (articleData as any).conclusionContent : "History is vast and every day is a miracle. We're glad you're part of it."}
                    </div>
                    
                    <div className="mt-16 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-12">
                         <div className="flex items-center gap-4">
                             <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-black">MB</div>
                             <div className="text-sm font-black">Editorial Team</div>
                         </div>
                         <button 
                            onClick={() => navigator.share && navigator.share({ title: articleData.title, url: window.location.href })}
                            className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all active:scale-95"
                         >
                            <Share2 size={24} />
                         </button>
                    </div>
                </footer>
            </article>
            <div className="mt-12"><AdPlaceholder slot="footer" /></div>
          </main>
          <aside className="lg:col-span-4 hidden lg:block sticky top-24 self-start"><Sidebar /></aside>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
