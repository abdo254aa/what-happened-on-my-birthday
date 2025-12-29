
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Gift, Moon, Sun, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getMonths } from '../utils/dateUtils';

const Header: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  
  const urlDay = Number(searchParams.get('day') || searchParams.get('d')) || "";
  const urlMonth = Number(searchParams.get('month') || searchParams.get('m')) || "";
  const urlYear = Number(searchParams.get('year')) || "";

  const [day, setDay] = useState<number | "">(urlDay);
  const [month, setMonth] = useState<number | "">(urlMonth);
  const [year, setYear] = useState<number | "">(urlYear);

  useEffect(() => {
    if (urlDay) setDay(urlDay);
    if (urlMonth) setMonth(urlMonth);
    if (urlYear) setYear(urlYear);
  }, [urlDay, urlMonth, urlYear]);

  const handleManualSubmit = () => {
    if (!day || !month || !year) return;
    navigate(`/results?day=${day}&month=${month}&year=${year}`);
  };

  const daysArr = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const yearsArr = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const monthsArr = getMonths(language);

  // تنسيق القوائم المنسدلة داخل الـ Pill
  const selectClass = "bg-transparent border-none text-slate-900 dark:text-slate-100 font-bold text-[13px] md:text-sm outline-none cursor-pointer text-center appearance-none w-full h-full px-2 py-1";

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-2 md:gap-4">
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <Gift size={24} className="text-blue-600 dark:text-blue-500 drop-shadow-md md:w-7 md:h-7" />
              <span className="font-display font-black text-lg md:text-xl tracking-tighter text-slate-900 dark:text-white leading-none whitespace-nowrap hidden lg:block">
                {t('site_name_part1')}{' '}<span className="text-blue-600 dark:text-blue-400">{t('site_name_part2')}</span>
              </span>
            </Link>
          </div>

          {/* تصميم شريط البحث الموحد المأخوذ من الصورة */}
          <div className="flex-1 flex justify-center min-w-0 px-2 md:px-0">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center shadow-sm h-11 md:h-12 w-full max-w-[480px] overflow-hidden p-1.5">
                  
                  {/* قسم السنة */}
                  <div className="flex-1 relative h-full flex items-center">
                      <select 
                        value={year} 
                        onChange={(e) => setYear(Number(e.target.value))}
                        className={selectClass}
                      >
                        <option value="" disabled>{t('label_year')}</option>
                        {yearsArr.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                  </div>

                  {/* فاصل عمودي ناعم */}
                  <div className="w-[1px] h-5 bg-slate-100 dark:bg-slate-700"></div>

                  {/* قسم الشهر */}
                  <div className="flex-1.5 relative h-full flex items-center min-w-[75px]">
                      <select 
                        value={month} 
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className={selectClass}
                      >
                        <option value="" disabled>{t('label_month')}</option>
                        {monthsArr.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                      </select>
                  </div>

                  {/* فاصل عمودي ناعم */}
                  <div className="w-[1px] h-5 bg-slate-100 dark:bg-slate-700"></div>

                  {/* قسم اليوم */}
                  <div className="flex-1 relative h-full flex items-center">
                      <select 
                        value={day} 
                        onChange={(e) => setDay(Number(e.target.value))}
                        className={selectClass}
                      >
                        <option value="" disabled>{t('label_day')}</option>
                        {daysArr.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                  </div>

                  {/* زر الإرسال (مربع أزرق مستدير مع سهم) */}
                  <button 
                    onClick={handleManualSubmit}
                    disabled={!day || !month || !year}
                    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white h-8 md:h-9 w-8 md:w-9 rounded-[10px] md:rounded-xl transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center ml-1 shadow-sm"
                    aria-label="Submit"
                  >
                      {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </button>
              </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
                onClick={toggleTheme}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 transition-all active:scale-90"
            >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
