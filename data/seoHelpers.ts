
import { MONTHS } from "../types";

export const generateResultsMetadata = (day: number, month: number, year: number, lang: 'en' | 'ar') => {
  const monthName = MONTHS[month - 1];
  const dateStr = `${monthName} ${day}, ${year}`;
  
  if (lang === 'ar') {
    return {
      title: `ماذا حدث في يوم ${day} ${month} ${year}؟ - تقرير شامل`,
      description: `اكتشف حقائق تاريخ ميلادك ليوم ${day} ${month} ${year}. أحداث تاريخية، مشاهير، برجي الفلكي، وشخصية جيلك في تقرير واحد مفصل.`
    };
  }

  return {
    title: `What Happened on ${dateStr}? Full Birthday Profile & Facts`,
    description: `Uncover your birthday's historical significance on ${dateStr}. Explore detailed birthday insights including celebrity sharers, notable events, and numerology. Use our easy tools to see your birth day’s week, generation, and days remaining.`
  };
};

export const generateArticleMetadata = (title: string, excerpt: string, category: string, lang: 'en' | 'ar') => {
  return {
    title: `${title} - MyBirthdayFacts`,
    description: excerpt.length > 155 ? excerpt.substring(0, 155) + '...' : excerpt
  };
};

export const generateFAQSchema = (stats: any, day: number, month: number, year: number) => {
    const monthName = MONTHS[month - 1];
    const dateStr = `${monthName} ${day}, ${year}`;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What day of the week was ${dateStr}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `According to the calendar, ${dateStr} fell on a ${stats.dayOfWeekBorn}.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the zodiac sign for ${monthName} ${day}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `People born on ${monthName} ${day} belong to the ${stats.zodiacSign} zodiac sign.`
          }
        },
        {
          "@type": "Question",
          "name": `How many days have passed since ${year}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `As of today, approximately ${stats.totalDaysAlive} days have passed since this date.`
          }
        },
        {
          "@type": "Question",
          "name": `Who shares a birthday with me on ${monthName} ${day}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `You share your birthday with many historical figures and celebrities. Check our detailed "Famous People" section to see your birthday twins.`
          }
        }
      ]
    };
};
