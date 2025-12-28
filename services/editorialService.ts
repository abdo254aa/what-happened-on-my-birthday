
import { editorialTemplates, EditorialTemplate, EditorialSection } from '../data/editorialArticles';
import { MONTHS } from '../types';
import { contentPools, decadeFacts, FragmentPool } from '../data/birthdayData';

/**
 * Deterministic Editorial Content Generator
 * Acts as an infinite database by generating unique content based on mathematical seeds from the date.
 */
export const getEditorialArticle = (id: string, day: number, month: number): EditorialTemplate | null => {
  const template = editorialTemplates[id];
  if (!template) return null;

  const monthName = MONTHS[month - 1];
  const dateStr = `${monthName} ${day}`;
  
  // Use a fixed decade for flavor text in generic articles, but avoid specific year references
  // We use 1990 facts as a "rich sample" but will mask the date "1990" in text.
  const decade = "1990"; 
  const facts = decadeFacts[decade];
  const pool = contentPools['vibe_master'];

  // Robust seed ensures consistent "Database-like" retrieval for any given date
  const seed = (day * 401) + (month * 11) + id.length;

  const replacePlaceholders = (text: string) => {
    let res = text
      .replace(/{date}/g, dateStr)
      
      // Generic Year/Time Replacements - Remove specific time anchors
      .replace(/The year {year}/g, "History")
      .replace(/in {year}/g, "throughout history")
      .replace(/during {year}/g, "during this time")
      .replace(/of {year}/g, "of the past")
      .replace(/{year}/g, "the past")
      
      // Decade masking - prevent "1990s" from appearing in generic articles
      .replace(/{decade}s/g, "past decades")
      .replace(/the {decade}s/g, "history")
      .replace(/{decade}/g, "the golden era")
      
      // Flavor Replacements
      .replace(/{vibe}/g, facts.vibe)
      .replace(/{tech}/g, facts.tech)
      .replace(/{science}/g, facts.science)
      .replace(/{economic}/g, facts.economic)
      .replace(/{movie}/g, facts.movie)
      .replace(/{song}/g, facts.song)
      .replace(/{fashion}/g, facts.fashion)
      .replace(/{toy}/g, facts.toy)
      .replace(/{snack}/g, facts.snack);
      
      // Clean up any double spaces or punctuation issues created by removals
      return res
        .replace(/\s+/g, ' ')
        .replace(/\s\./g, '.')
        .replace(/\s,/g, ',')
        .replace(/\.\./g, '.')
        .trim();
  };

  // REFINED: Balanced Block Text Builder
  const buildMegaSection = (poolArray: string[], variant: number): string => {
    let combinedText = "";
    
    // Balanced loop count (4)
    for(let i = 0; i < 4; i++) {
        const s = seed + variant + (i * 20);
        // Fetch fragments
        const f1 = poolArray[s % poolArray.length];
        const hook = pool.seoHooks[(s + 13) % pool.seoHooks.length];
        const f2 = poolArray[(s + 7) % poolArray.length];
        
        // Construct flowing sentence chain
        combinedText += `${f1} ${hook} ${f2} `;
    }
    
    return replacePlaceholders(`<p>${combinedText.trim()}</p>`);
  };

  let dynamicSections: EditorialSection[] = [];

  // DRASTICALLY EXPANDED SECTIONS (~20 sections per article)
  if (id === 'famous-birthdays' || id === 'famous-birthday-twins') {
    dynamicSections = [
      { title: `Legendary Lives: The Stars of ${dateStr}`, content: buildMegaSection(pool.famousBioFragments, 1), iconType: 'users', colorClass: 'text-amber-600' },
      { title: `The Spark of Genius`, content: buildMegaSection(pool.psychology, 20), iconType: 'zap', colorClass: 'text-yellow-500' },
      { title: `Historical Context of Fame`, content: buildMegaSection(pool.history, 50), iconType: 'history', colorClass: 'text-slate-600' },
      { title: `Early Struggles & Triumphs`, content: buildMegaSection(pool.career, 80), iconType: 'users', colorClass: 'text-orange-500' },
      { title: `The Artistic Temperament`, content: buildMegaSection(pool.culture, 100), iconType: 'music', colorClass: 'text-purple-600' },
      { title: `Style & Public Image`, content: buildMegaSection(pool.lifestyle, 120), iconType: 'sparkles', colorClass: 'text-pink-500' },
      { title: `Leadership Traits of ${dateStr}`, content: buildMegaSection(pool.career, 150), iconType: 'zap', colorClass: 'text-blue-600' },
      { title: `Hidden Talents`, content: buildMegaSection(pool.culture, 180), iconType: 'star', colorClass: 'text-indigo-500' },
      { title: `Psychological Profile of Icons`, content: buildMegaSection(pool.psychology, 200), iconType: 'sparkles', colorClass: 'text-indigo-600' },
      { title: `The Rhythm of Stardom`, content: buildMegaSection(pool.culture, 600), iconType: 'music', colorClass: 'text-pink-600' },
      { title: `Global Impact & Reach`, content: buildMegaSection(pool.economy, 250), iconType: 'globe', colorClass: 'text-emerald-600' },
      { title: `Philanthropy & Giving Back`, content: buildMegaSection(pool.social, 280), iconType: 'heart', colorClass: 'text-red-500' },
      { title: `Digital Footprint of Fame`, content: buildMegaSection(pool.science, 650), iconType: 'zap', colorClass: 'text-cyan-500' },
      { title: `The Legacy of Innovation`, content: buildMegaSection(pool.science, 300), iconType: 'history', colorClass: 'text-rose-600' },
      { title: `Quotes & Philosophies`, content: buildMegaSection(pool.philosophy, 320), iconType: 'message-circle', colorClass: 'text-slate-500' },
      { title: `Social Influence & Charisma`, content: buildMegaSection(pool.social, 700), iconType: 'users', colorClass: 'text-orange-500' },
      { title: `Future Stars Born Today`, content: buildMegaSection(pool.futureVisions, 350), iconType: 'users', colorClass: 'text-cyan-600' },
      { title: `Cosmic Alignment of Talent`, content: buildMegaSection(pool.horoscopeInsights, 750), iconType: 'sparkles', colorClass: 'text-violet-500' },
      { title: `Defining the Era`, content: buildMegaSection(pool.history, 400), iconType: 'flag', colorClass: 'text-red-600' },
      { title: `A Final Reflection on Fame`, content: buildMegaSection(pool.conclusions, 420), iconType: 'star', colorClass: 'text-amber-500' },
    ];
  } else if (id === 'zodiac-magic-guide' || id === 'birthday-love-compatibility') {
    dynamicSections = [
      { title: `Celestial Insights for ${dateStr}`, content: buildMegaSection(pool.horoscopeInsights, 2), iconType: 'sparkles', colorClass: 'text-indigo-600' },
      { title: `The Core Element`, content: buildMegaSection(pool.analysis, 100), iconType: 'zap', colorClass: 'text-blue-500' },
      { title: `Emotional Deep Dive`, content: buildMegaSection(pool.analysis, 150), iconType: 'heart', colorClass: 'text-pink-600' },
      { title: `Lifestyle and Balance`, content: buildMegaSection(pool.lifestyle, 200), iconType: 'globe', colorClass: 'text-emerald-600' },
      { title: `Planetary Influences`, content: buildMegaSection(pool.science, 220), iconType: 'moon', colorClass: 'text-slate-500' },
      { title: `Cosmic Rhythm & Flow`, content: buildMegaSection(pool.culture, 400), iconType: 'music', colorClass: 'text-purple-500' },
      { title: `Relationship Dynamics`, content: buildMegaSection(pool.psychology, 250), iconType: 'users', colorClass: 'text-red-600' },
      { title: `Love Languages`, content: buildMegaSection(pool.social, 280), iconType: 'heart', colorClass: 'text-rose-500' },
      { title: `Career and Ambition Alignment`, content: buildMegaSection(pool.career, 300), iconType: 'zap', colorClass: 'text-amber-600' },
      { title: `Hidden Strengths`, content: buildMegaSection(pool.psychology, 320), iconType: 'shield', colorClass: 'text-green-600' },
      { title: `Mystical Connections`, content: buildMegaSection(pool.horoscopeInsights, 450), iconType: 'sparkles', colorClass: 'text-violet-600' },
      { title: `Health and Wellness Patterns`, content: buildMegaSection(pool.health, 350), iconType: 'heart', colorClass: 'text-green-600' },
      { title: `Social Harmony`, content: buildMegaSection(pool.social, 500), iconType: 'users', colorClass: 'text-rose-500' },
      { title: `Shadow Traits`, content: buildMegaSection(pool.psychology, 520), iconType: 'cloud', colorClass: 'text-gray-500' },
      { title: `Philosophical Outlook`, content: buildMegaSection(pool.philosophy, 400), iconType: 'history', colorClass: 'text-purple-600' },
      { title: `Dreams and Intuition`, content: buildMegaSection(pool.futureVisions, 420), iconType: 'eye', colorClass: 'text-indigo-400' },
      { title: `The Karmic Path`, content: buildMegaSection(pool.conclusions, 450), iconType: 'sparkles', colorClass: 'text-blue-600' },
      { title: `Lucky Symbols`, content: buildMegaSection(pool.culture, 480), iconType: 'star', colorClass: 'text-yellow-500' },
      { title: `Yearly Forecast`, content: buildMegaSection(pool.futureVisions, 500), iconType: 'calendar', colorClass: 'text-blue-400' },
      { title: `Spiritual Growth`, content: buildMegaSection(pool.conclusions, 550), iconType: 'sun', colorClass: 'text-orange-500' },
    ];
  } else {
    // History / General
    dynamicSections = [
      { title: `Seismic Events of ${dateStr}`, content: buildMegaSection(pool.history, 10), iconType: 'history', colorClass: 'text-blue-600' },
      { title: `The Global Atmosphere`, content: buildMegaSection(pool.intros, 30), iconType: 'globe', colorClass: 'text-cyan-600' },
      { title: `Economic Transformations`, content: buildMegaSection(pool.economy, 60), iconType: 'zap', colorClass: 'text-amber-600' },
      { title: `Market Trends & Trade`, content: buildMegaSection(pool.economy, 80), iconType: 'trending-up', colorClass: 'text-green-600' },
      { title: `Scientific Breakthroughs`, content: buildMegaSection(pool.science, 110), iconType: 'globe', colorClass: 'text-slate-600' },
      { title: `Medical Milestones`, content: buildMegaSection(pool.health, 130), iconType: 'activity', colorClass: 'text-red-500' },
      { title: `The Digital Revolution`, content: buildMegaSection(pool.science, 500), iconType: 'zap', colorClass: 'text-cyan-500' },
      { title: `Cultural Zeitgeist`, content: buildMegaSection(pool.culture, 160), iconType: 'music', colorClass: 'text-purple-600' },
      { title: `Fashion & Style`, content: buildMegaSection(pool.lifestyle, 180), iconType: 'camera', colorClass: 'text-pink-500' },
      { title: `The Evolution of Media`, content: buildMegaSection(pool.lifestyle, 210), iconType: 'history', colorClass: 'text-indigo-600' },
      { title: `Global Political Shifts`, content: buildMegaSection(pool.history, 260), iconType: 'globe', colorClass: 'text-red-600' },
      { title: `Education & Knowledge`, content: buildMegaSection(pool.school, 550), iconType: 'history', colorClass: 'text-yellow-600' },
      { title: `Technological Milestones`, content: buildMegaSection(pool.science, 310), iconType: 'zap', colorClass: 'text-cyan-600' },
      { title: `Transportation & Travel`, content: buildMegaSection(pool.travel, 330), iconType: 'map', colorClass: 'text-blue-500' },
      { title: `Society & Connection`, content: buildMegaSection(pool.social, 600), iconType: 'users', colorClass: 'text-pink-500' },
      { title: `Environmental Context`, content: buildMegaSection(pool.analysis, 360), iconType: 'heart', colorClass: 'text-green-600' },
      { title: `Food & Culinary Culture`, content: buildMegaSection(pool.culinary, 380), iconType: 'coffee', colorClass: 'text-orange-500' },
      { title: `Sports & Competition`, content: buildMegaSection(pool.sports, 390), iconType: 'award', colorClass: 'text-yellow-600' },
      { title: `Future Implications`, content: buildMegaSection(pool.futureVisions, 400), iconType: 'globe', colorClass: 'text-rose-600' },
      { title: `The Enduring Legacy`, content: buildMegaSection(pool.conclusions, 450), iconType: 'book', colorClass: 'text-slate-800' },
    ];
  }

  return {
    ...template,
    title: replacePlaceholders(template.title),
    intro: replacePlaceholders(template.intro), 
    sections: dynamicSections,
    conclusionTitle: replacePlaceholders(template.conclusionTitle),
    conclusionContent: buildMegaSection(pool.conclusions, 777)
  };
};
