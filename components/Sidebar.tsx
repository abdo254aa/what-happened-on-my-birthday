

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, HelpCircle, Star, History, Sparkles, Calendar, Heart, Mail, Crown, GraduationCap, Zap, TrendingUp, BookOpen, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getMonths } from '../utils/dateUtils';
import AdPlaceholder from './AdPlaceholder';
import { useNavigate, useLocation } from 'react-router-dom';
import { MONTHS } from '../types';
import { editorialTemplates } from '../data/editorialArticles';

const Sidebar: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const months = getMonths(language);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  
  // Base "Today" for fallback only. 
  // The primary source of truth will now ALWAYS be the URL parameters to ensure "Database" feel.
  const [systemDate] = useState(new Date());

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
  // STRICT DATE LOGIC:
  // If URL has a date, use it. If not, fallback to system date.
  // This ensures Quick Links NEVER change date once a user has chosen a birthday.
  const urlDay = Number(searchParams.get('day') || searchParams.get('d'));
  const urlMonth = Number(searchParams.get('month') || searchParams.get('m'));

  const activeDay = urlDay || systemDate.getDate();
  const activeMonth = urlMonth || (systemDate.getMonth() + 1);
  const activeYear = Number(searchParams.get('year')) || systemDate.getFullYear();

  const activeMonthName = months[activeMonth - 1];
  const activeDateString = language === 'ar' ? `${activeDay} ${activeMonthName}` : `${activeMonthName} ${activeDay}`;
  
  const nextYear = activeYear + 1;
  const templatesList = Object.keys(editorialTemplates);

  const quickLinks = useMemo(() => {
    return [
        { id: 'famous-birthdays', labelKey: 's_famous_date', icon: <Crown size={18} />, color: 'text-amber-500' },
        { id: 'famous-birthday-twins', labelKey: 's_celeb_date', icon: <Star size={18} />, color: 'text-blue-500' },
        { id: 'history-of-birthdays', labelKey: 's_events_date', icon: <History size={18} />, color: 'text-slate-600' },
        { id: 'zodiac-magic-guide', labelKey: 's_horoscope_date', icon: <Sparkles size={18} />, color: 'text-purple-500' },
        { id: 'birthday-love-compatibility', labelKey: 's_love_match', icon: <Heart size={18} />, color: 'text-pink-500' },
    ];
  }, []);

  const getLabel = (key: string, dStr: string) => {
      let text = t(key);
      text = text.replace('{date}', dStr);
      text = text.replace('{year}', nextYear.toString());
      text = text.replace('{month}', activeMonthName);
      return text;
  };

  const handleNavigate = (id: string, d: number, m: number) => {
    navigate(`/article/${id}?d=${d}&m=${m}&year=${activeYear}`);
  };

  // DATABASE SIMULATION:
  // "Fresh Picks" are now calculated relative to the ACTIVE date, not just today.
  // This makes the sidebar feel like a related content engine for the chosen birthday.
  const featuredArticles = useMemo(() => {
    // We use a fixed seed based on the active date so the "Fresh Picks" are consistent for that date (Database behavior)
    return Array.from({ length: 7 }, (_, i) => {
        // Create a date object starting from the ACTIVE day + (i+1)
        // This suggests "Next Days" or "Related Dates"
        const seedDate = new Date(activeYear, activeMonth - 1, activeDay);
        seedDate.setDate(seedDate.getDate() + (i + 1)); 
        
        const d = seedDate.getDate();
        const m = seedDate.getMonth() + 1;
        const mShort = MONTHS[m - 1].substring(0, 3);
        const mName = MONTHS[m - 1];
        const dStr = language === 'ar' ? `${d} ${mName}` : `${mName} ${d}`;
        
        const colors = [
          'from-blue-600 to-indigo-700',
          'from-orange-500 to-red-600',
          'from-purple-600 to-pink-700',
          'from-emerald-600 to-teal-700',
          'from-rose-600 to-red-700',
          'from-cyan-600 to-blue-700',
          'from-slate-700 to-slate-900'
        ];

        // Deterministic rotation based on the date
        const templateIndex = (d + m + i) % templatesList.length;
        const topicId = templatesList[templateIndex];
        
        const labelMap: Record<string, string> = {
            'famous-birthdays': 's_famous_date',
            'history-of-birthdays': 's_events_date',
            'zodiac-magic-guide': 's_horoscope_date',
            'birthday-love-compatibility': 's_love_match',
            'famous-birthday-twins': 's_celeb_date'
        };

        const labelKey = labelMap[topicId] || 'read_article';
        return { d, m, mShort, dStr, topicId, labelKey, color: colors[i % colors.length] };
    });
  }, [activeDay, activeMonth, activeYear, language, templatesList]);

  const ChevronIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. AD UNIT */}
      <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 p-2">
        <AdPlaceholder slot="content" className="!my-0 !h-[250px] !w-full" />
      </div>

      {/* 2. DYNAMIC QUICK LINKS (Fixed to Selected Date) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="mb-6 flex items-center gap-3">
             <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
                <BookOpen size={20} />
             </div>
             <h3 className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tight leading-none">
                {getLabel('quick_links_header', activeDateString)}
            </h3>
        </div>
        <nav className="flex flex-col space-y-1">
            {quickLinks.map((item, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleNavigate(item.id, activeDay, activeMonth)}
                    className="flex items-center gap-4 px-2 py-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group w-full text-left rtl:text-right"
                >
                    <div className={`w-9 h-9 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl ${item.color} group-hover:scale-110 transition-transform shadow-sm border border-slate-100 dark:border-slate-700`}>
                        {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-[14px] group-hover:text-blue-700 dark:group-hover:text-blue-400 leading-tight">
                            {getLabel(item.labelKey, activeDateString)}
                        </h4>
                    </div>
                    <ChevronIcon size={14} className="text-slate-300 group-hover:text-blue-500 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
            ))}
        </nav>
      </div>

      {/* 3. FRESH PICKS (Related Dates from Database) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
        <div className="mb-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-red-600" />
                <h3 className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tight">
                    {language === 'ar' ? 'اكتشف المزيد (More)' : 'More to Explore'}
                </h3>
             </div>
        </div>
        <nav className="flex flex-col space-y-4">
            {featuredArticles.map((art, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleNavigate(art.topicId, art.d, art.m)}
                    className="flex items-center gap-4 group w-full text-left rtl:text-right"
                >
                    <div className={`w-20 h-10 flex-shrink-0 bg-gradient-to-r ${art.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform gap-1.5 px-3`}>
                        <span className="text-lg font-black leading-none">{art.d}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest border-l border-white/30 pl-1.5 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-1.5">{art.mShort}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[13px] group-hover:text-red-600 leading-tight line-clamp-2 transition-colors">
                            {getLabel(art.labelKey, art.dStr)}
                        </h4>
                    </div>
                </button>
            ))}
        </nav>
      </div>

      {/* 4. TRIVIA */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] p-6 border border-amber-100 dark:border-amber-900/30 relative overflow-hidden">
         <div className="flex items-center gap-3 mb-3 text-amber-700 dark:text-amber-500 font-black text-[9px] uppercase tracking-[0.2em]">
            <HelpCircle size={16} /> {t('trivia_title')}
         </div>
         <p className="text-slate-900 dark:text-slate-200 font-black text-lg leading-tight mb-4">
             {t('trivia_q')}
         </p>
         {showRiddleAnswer ? (
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center shadow-sm border border-amber-200 dark:border-amber-900/40 animate-in zoom-in duration-200">
                 <p className="font-black text-amber-600 text-lg">{t('trivia_a')}</p>
             </div>
         ) : (
             <button 
                onClick={() => setShowRiddleAnswer(true)}
                className="w-full py-3 bg-amber-600 text-white hover:bg-amber-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
             >
                {t('click_reveal')}
             </button>
         )}
      </div>
    </div>
  );
};

export default Sidebar;
