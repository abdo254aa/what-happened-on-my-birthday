
import { editorialTemplates, EditorialTemplate, EditorialSection } from '../data/editorialArticles';
import { MONTHS } from '../types';
import { contentPools, decadeFacts } from '../data/birthdayData';

/**
 * Deterministic Editorial Content Generator
 * Ensures that every single sidebar link leads to a unique, 1500+ word article.
 */
export const getEditorialArticle = (id: string, day: number, month: number): EditorialTemplate | null => {
  const template = editorialTemplates[id];
  if (!template) return null;

  const monthName = MONTHS[month - 1];
  const dateStr = `${monthName} ${day}`;
  const year = new Date().getFullYear();
  const decade = `${Math.floor(year / 10) * 10}`;
  const facts = decadeFacts[decade] || decadeFacts["2010"];
  const pool = contentPools['vibe_master'];

  const seed = (day * 401) + (month * 11);

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/{date}/g, dateStr)
      .replace(/{year}/g, year.toString())
      .replace(/{decade}/g, decade)
      .replace(/{vibe}/g, facts.vibe)
      .replace(/{tech}/g, facts.tech)
      .replace(/{science}/g, facts.science)
      .replace(/{economic}/g, facts.economic)
      .replace(/{movie}/g, facts.movie)
      .replace(/{song}/g, facts.song);
  };

  const buildLongSection = (poolArray: string[], variant: number): string => {
    const s = seed + variant;
    const f1 = poolArray[s % poolArray.length];
    const f2 = poolArray[(s + 7) % poolArray.length];
    const hook = pool.seoHooks[(s + 13) % pool.seoHooks.length];
    const filler = pool.fillers[(s + 19) % pool.fillers.length];
    const f3 = poolArray[(s + 29) % poolArray.length];

    return replacePlaceholders(`${f1} ${hook} ${f2} ${filler} ${f3}`);
  };

  const buildIntroSection = (poolArray: string[], variant: number): string => {
    const s = seed + variant;
    const f1 = poolArray[s % poolArray.length];
    const hook = pool.seoHooks[(s + 13) % pool.seoHooks.length];
    return replacePlaceholders(`${f1} ${hook}`);
  };

  let dynamicSections: EditorialSection[] = [];

  if (id === 'famous-birthdays' || id === 'famous-birthday-twins') {
    dynamicSections = [
      {
        title: id === 'famous-birthday-twins' ? `Your Spiritual Twin Born on ${dateStr}` : `Legendary Lives Born on ${dateStr}`,
        content: buildLongSection(pool.famousBioFragments, 1),
        iconType: 'users',
        colorClass: 'text-amber-600'
      },
      {
        title: `Historical Trends and Talent Profiles`,
        content: buildLongSection(pool.history, 50),
        iconType: 'history',
        colorClass: 'text-slate-600'
      },
      {
        title: `The Influence of Cultural Icons Throughout Time`,
        content: buildLongSection(pool.culture, 100),
        iconType: 'music',
        colorClass: 'text-purple-600'
      }
    ];
  } else if (id === 'zodiac-magic-guide' || id === 'birthday-love-compatibility') {
    dynamicSections = [
      {
        title: id === 'birthday-love-compatibility' ? `Romantic Vibrations of ${dateStr}` : `Celestial Insights for ${dateStr}`,
        content: buildLongSection(pool.horoscopeInsights, 2),
        iconType: 'sparkles',
        colorClass: 'text-indigo-600'
      },
      {
        title: id === 'birthday-love-compatibility' ? `Emotional Patterns and Connection Depth` : `The Psychology of Your Star Pattern`,
        content: buildLongSection(pool.analysis, 150),
        iconType: 'heart',
        colorClass: 'text-pink-600'
      },
      {
        title: `Global Planetary Shifts and Lifestyle Balance`,
        content: buildLongSection(pool.lifestyle, 200),
        iconType: 'globe',
        colorClass: 'text-emerald-600'
      }
    ];
  } else if (id === 'history-of-birthdays') {
    dynamicSections = [
      {
        title: `Seismic Historical Events on ${dateStr}`,
        content: buildLongSection(pool.history, 10),
        iconType: 'history',
        colorClass: 'text-blue-600'
      },
      {
        title: `Economic and Industrial Metamorphosis`,
        content: buildLongSection(pool.economy, 60),
        iconType: 'zap',
        colorClass: 'text-amber-600'
      },
      {
        title: `Scientific Horizons Established on This Day`,
        content: buildLongSection(pool.science, 110),
        iconType: 'globe',
        colorClass: 'text-slate-600'
      }
    ];
  }

  return {
    ...template,
    title: template.title.replace(/{date}/g, dateStr).replace(/{year}/g, year.toString()),
    intro: buildIntroSection(pool.intros, 500),
    sections: dynamicSections,
    conclusionTitle: template.conclusionTitle.replace(/{date}/g, dateStr),
    conclusionContent: buildLongSection(pool.conclusions, 777)
  };
};
