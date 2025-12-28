
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Gift, Moon, Sun, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getMonths } from '../utils/dateUtils';

const Header: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Note: useParams() does not work here because Header is rendered outside of <Routes>
  
  const searchParams = new URLSearchParams(location.search);
  
  // Normalize param names (Results uses day/month, Article uses d/m)
  const urlDay = Number(searchParams.get('day') || searchParams.get('d')) || "";
  const urlMonth = Number(searchParams.get('month') || searchParams.get('m')) || "";
  const urlYear = Number(searchParams.get('year')) || "";

  const [day, setDay] = useState<number | "">(urlDay);
  const [month, setMonth] = useState<number | "">(urlMonth);
  const [year, setYear] = useState<number | "">(urlYear);

  // Sync state with URL changes (e.g. when navigating back or from sidebar)
  useEffect(() => {
    if (urlDay) setDay(urlDay);
    if (urlMonth) setMonth(urlMonth);
    if (urlYear) setYear(urlYear);
  }, [urlDay, urlMonth, urlYear]);

  const handleManualSubmit = () => {
    if (!day || !month || !year) return;

    // ALWAYS navigate to the main Results report (New Search behavior)
    // This ensures the page changes completely instead of just updating the current sub-article view
    navigate(`/results?day=${day}&month=${month}&year=${year}`);
  };

  const daysArr = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const yearsArr = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const monthsArr = getMonths(language);

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24 gap-4">
          
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <Gift size={28} className="text-blue-600 dark:text-blue-500 drop-shadow-md" />
              <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-slate-900 dark:text-white leading-none whitespace-nowrap hidden md:block">
                {t('site_name_part1')}{' '}<span className="text-blue-600 dark:text-blue-400">{t('site_name_part2')}</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-2">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 md:p-1.5 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-md transition-all hover:border-blue-400">
                  <div className="flex items-center gap-2 px-3 text-blue-600 dark:text-blue-400 font-black text-[10px] md:text-xs uppercase tracking-widest border-r border-slate-100 dark:border-slate-700 mr-1 hidden lg:flex">
                     <Calendar size={14} /> {t('site_name_part1')} {t('site_name_part2')}
                  </div>
                  
                  <div className="flex items-center gap-0.5 px-1">
                    <select 
                      value={year} 
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="bg-transparent text-[13px] md:text-sm font-black text-slate-800 dark:text-slate-100 outline-none cursor-pointer py-1.5 appearance-none text-center min-w-[60px] md:min-w-[70px]"
                    >
                      <option value="" disabled>{t('label_year')}</option>
                      {yearsArr.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700"></div>

                    <select 
                      value={month} 
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="bg-transparent text-[13px] md:text-sm font-black text-slate-800 dark:text-slate-100 outline-none cursor-pointer py-1.5 appearance-none text-center min-w-[80px] md:min-w-[100px]"
                    >
                      <option value="" disabled>{t('label_month')}</option>
                      {monthsArr.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                    </select>

                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700"></div>

                    <select 
                      value={day} 
                      onChange={(e) => setDay(Number(e.target.value))}
                      className="bg-transparent text-[13px] md:text-sm font-black text-slate-800 dark:text-slate-100 outline-none cursor-pointer py-1.5 appearance-none text-center min-w-[40px] md:min-w-[50px]"
                    >
                      <option value="" disabled>{t('label_day')}</option>
                      {daysArr.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  
                  <button 
                    onClick={handleManualSubmit}
                    disabled={!day || !month || !year}
                    className="ml-1 bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-30 shadow-lg"
                    aria-label="Submit"
                  >
                      <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </button>
              </div>
          </div>

          <div className={`flex items-center gap-2 md:gap-3 flex-shrink-0 ${dir === 'rtl' ? 'mr-6' : 'ml-6'}`}>
            <button 
                onClick={toggleTheme}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-100 dark:border-blue-500/50 transition-all active:scale-90 shadow-lg group relative overflow-hidden"
            >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
