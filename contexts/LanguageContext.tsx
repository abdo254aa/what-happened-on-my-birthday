
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, Record<Language, string>> = {
  'site_name_part1': { en: 'My Birthday', ar: 'تاريخ' },
  'site_name_part2': { en: 'Facts', ar: 'ميلادي' },
  'tagline': { en: 'DISCOVER ALL FACTS ABOUT YOUR BIRTHDAY!', ar: 'اكتشف كل الحقائق حول تاريخ ميلادك!' },
  'home': { en: 'Home', ar: 'الرئيسية' },
  'new_date': { en: 'Check Another Date', ar: 'فحص تاريخ آخر' },
  'your_personal_report': { en: 'Personal Historical Archive', ar: 'الأرشيف التاريخي الشخصي' },
  'age': { en: 'Current Age', ar: 'العمر الحالي' },
  'years': { en: 'Years', ar: 'سنة' },
  'born_on': { en: 'Day of Birth', ar: 'يوم الميلاد' },
  'zodiac': { en: 'Zodiac Sign', ar: 'البرج الفلكي' },
  'loading_title': { en: 'Compiling Your History...', ar: 'جاري تجميع تاريخك...' },
  'btn_reveal': { en: 'Reveal My History', ar: 'كشف الأسرار الآن' },
  'hero_title_1': { en: 'Discover What Happened', ar: 'اكتشف ماذا حدث' },
  'hero_title_2': { en: 'On My Birthday', ar: 'في يوم ميلادك' },
  'hero_subtitle': { en: 'Explore the historical events, secrets, and world-changing moments that happened on your special day.', ar: 'اكتشف ماذا حدث في يوم ميلادك! رحلة ممتعة عبر التاريخ لتعرف الأحداث والمشاهير الذين يشاركونك هذا اليوم.' },
  'label_day': { en: 'Day', ar: 'اليوم' },
  'label_month': { en: 'Month', ar: 'الشهر' },
  'label_year': { en: 'Year', ar: 'السنة' },
  'latest_stories': { en: 'Editorial Features', ar: 'مقالات حصرية' },
  'read_article': { en: 'Read Full Story', ar: 'اقرأ المقال كاملاً' },
  'back_home': { en: 'Back to Discovery', ar: 'العودة للرئيسية' },
  'rights_reserved': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'about': { en: 'About', ar: 'About' },
  'contact': { en: 'Contact', ar: 'Contact' },
  'privacy': { en: 'Privacy', ar: 'Privacy' },
  'terms': { en: 'Terms', ar: 'Terms' },
  'trivia_title': { en: 'Daily Mystery', ar: 'لغز اليوم' },
  'trivia_q': { en: 'What is always coming but never arrives?', ar: 'ما هو الشيء الذي يأتي دائماً ولكنه لا يصل أبداً؟' },
  'trivia_a': { en: 'Tomorrow!', ar: 'غداً!' },
  'click_reveal': { en: 'Click to Reveal', ar: 'اضغط للكشف' },
  'quick_links_header': { en: '{date} Quick Links', ar: 'روابط سريعة ليوم {date}' },
  's_famous_date': { en: 'Famous Birthdays on {date}', ar: 'مشاهير ولدوا في {date}' },
  's_celeb_date': { en: 'Celebrity Twins on {date}', ar: 'توأمك من النجوم في {date}' },
  's_events_date': { en: 'Historical Events of {date}', ar: 'أحداث تاريخية في {date}' },
  's_horoscope_date': { en: 'Horoscope Secrets for {date}', ar: 'أسرار الأبراج ليوم {date}' },
  's_calendar_year': { en: 'Full {year} Calendar', ar: 'تقويم عام {year} الكامل' },
  's_astro_year': { en: 'Astrology Forecast {year}', ar: 'توقعات الفلك لعام {year}' },
  's_famous_month': { en: 'Stars Born in {month}', ar: 'نجوم ولدوا في شهر {month}' },
  's_celeb_month': { en: 'Icons of {month}', ar: 'أيقونات شهر {month}' },
  's_love_match': { en: 'Birthday Love Compatibility', ar: 'توافق الحب حسب الميلاد' },
  's_wishes': { en: 'Best Birthday Wishes', ar: 'أجمل تهاني عيد الميلاد' },
  'appearance_settings': { en: 'Appearance Settings', ar: 'إعدادات المظهر' },
  'font_size': { en: 'Font Size', ar: 'حجم الخط' },
  'line_height': { en: 'Line Height', ar: 'ارتفاع السطر' },
  'content_width': { en: 'Content Width', ar: 'عرض المحتوى' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
    localStorage.setItem('language', language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
