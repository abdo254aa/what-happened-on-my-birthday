import { MONTHS } from "../types";

export const generateResultsMetadata = (day: number, month: number, year: number, lang: 'en' | 'ar') => {
  const monthName = MONTHS[month - 1];
  const dateStr = `${monthName} ${day}, ${year}`;
  
  if (lang === 'ar') {
    return {
      title: `ماذا حدث في يوم ${day} ${month} ${year}؟ - السجل التاريخي والواقعي`,
      description: `تقرير مفصل وواقعي ليوم ${day} ${month} ${year}: تكاليف المعيشة والأسعار وقتها، الأحداث الموثقة، التكنولوجيا السائدة، وخصائص جيلك بدون مبالغة.`
    };
  }

  return {
    title: `What Happened on ${dateStr}? Real Historical & Cost-of-Living Record`,
    description: `Examine the factual record for ${dateStr}: real cost of living (home prices, fuel, wages), documented headlines, technology specs, and honest generational insights.`
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
          "name": `What exact day of the week was ${dateStr}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${dateStr} fell on a ${stats.dayOfWeekBorn}. Your next birthday will fall on a ${stats.nextBirthdayDayOfWeek} in ${stats.daysUntilNextBirthday} days.`
          }
        },
        {
          "@type": "Question",
          "name": `How many exact days, months, and years have passed since ${dateStr}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Someone born on ${dateStr} is currently ${stats.exactAge.years} years, ${stats.exactAge.months} months, and ${stats.exactAge.days} days old—which equals approximately ${stats.totalDaysAlive.toLocaleString()} total days lived.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the calendar zodiac sign for ${monthName} ${day}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `In the Western astrological calendar, ${monthName} ${day} falls under the sign of ${stats.zodiacSign}.`
          }
        }
      ]
    };
};
