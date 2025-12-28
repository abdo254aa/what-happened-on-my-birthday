
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MONTHS } from '../types';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const today = new Date();
  const currentMonthName = MONTHS[today.getMonth()];
  const currentDay = today.getDate();
  
  const dateString = language === 'ar' 
    ? `${currentDay} ${currentMonthName}` 
    : `${currentMonthName} ${currentDay}`;

  const quickLinksTitle = t('quick_links_header').replace('{date}', dateString);

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                 {t('site_name_part1')}{' '}{t('site_name_part2')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4 max-w-sm text-sm leading-relaxed">
               {t('hero_subtitle')}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} {t('site_name_part1')}{' '}{t('site_name_part2')}. {t('rights_reserved')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">{quickLinksTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">{t('home')}</Link></li>
              <li><Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">{t('about')}</Link></li>
              <li><Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">{t('privacy')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">{t('privacy')}</Link></li>
              <li><Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">{t('terms')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
