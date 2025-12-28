
import { BirthdayData } from '../types';
import { contentPools, decadeFacts, FragmentPool } from '../data/birthdayData';

/**
 * Super-Deterministic High-Fidelity Narrative Engine
 * Generates massive, SEO-friendly articles divided into 10 major thematic Chapters.
 * 
 * UPGRADES:
 * - Dynamic Sentence Structures: Randomizes order of Hook, Main Content, and Filler.
 * - Anti-Repetition: Tracks used indices to ensure the same pool string isn't used twice.
 */
export const fetchBirthdayInsights = async (day: number, month: number, year: number, lang: 'en' | 'ar' = 'en'): Promise<BirthdayData> => {
  const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  
  const monthNameEN = monthsEN[month - 1];
  const monthNameAR = monthsAR[month - 1];
  const dateStrEN = `${monthNameEN} ${day}`;
  const dateStrAR = `${day} ${monthNameAR}`;
  const decade = `${Math.floor(year / 10) * 10}`;
  
  // Get facts for the decade, fallback to 1990 if missing
  const rawFacts = decadeFacts[decade] || decadeFacts["1990"];

  // Unique hash seed for this specific date
  const baseSeed = (day * 1337) + (month * 77) + year;
  const pool = contentPools['vibe_master'];

  // Helper to pick a specific item from an array based on the year
  const pick = (arr: string[]) => {
    if (!arr || arr.length === 0) return "Unknown";
    return arr[year % arr.length];
  };

  const facts = {
    song: pick(rawFacts.song),
    movie: pick(rawFacts.movie),
    tech: pick(rawFacts.tech),
    vibe: pick(rawFacts.vibe),
    economic: pick(rawFacts.economic),
    science: pick(rawFacts.science),
    fashion: pick(rawFacts.fashion),
    toy: pick(rawFacts.toy),
    snack: pick(rawFacts.snack)
  };

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/{year}/g, year.toString())
      .replace(/{date}/g, lang === 'ar' ? dateStrAR : dateStrEN)
      .replace(/{month}/g, lang === 'ar' ? monthNameAR : monthNameEN)
      .replace(/{decade}/g, decade)
      .replace(/{song}/g, facts.song)
      .replace(/{movie}/g, facts.movie)
      .replace(/{tech}/g, facts.tech)
      .replace(/{science}/g, facts.science)
      .replace(/{economic}/g, facts.economic)
      .replace(/{vibe}/g, facts.vibe)
      .replace(/{fashion}/g, facts.fashion)
      .replace(/{toy}/g, facts.toy)
      .replace(/{snack}/g, facts.snack);
  };

  // State to track used indices per pool key for this specific article generation
  const usedIndices: Record<string, Set<number>> = {};

  const getUniqueItem = (poolKey: keyof FragmentPool, seedOffset: number): string => {
      const arr = pool[poolKey] as string[];
      if (!arr || !Array.isArray(arr) || arr.length === 0) return "";

      if (!usedIndices[poolKey]) usedIndices[poolKey] = new Set();
      
      let index = (baseSeed + seedOffset) % arr.length;
      let attempts = 0;

      // Linear probing to find an unused index
      while (usedIndices[poolKey].has(index) && attempts < arr.length) {
          index = (index + 1) % arr.length;
          attempts++;
      }
      
      usedIndices[poolKey].add(index);
      return arr[index];
  };

  // UPDATED: Dynamic Structure Builder
  // Instead of always A + B + Hook + Filler, we randomize the structure.
  const buildDynamicParagraph = (poolKey: keyof FragmentPool, sectionId: number): string => {
    // 1. Get two distinct unique sentences from the requested pool
    const main1 = getUniqueItem(poolKey, sectionId * 10);
    const main2 = getUniqueItem(poolKey, (sectionId * 10) + 5);
    
    // 2. Get Hook and Filler
    // We also want to rotate hooks and fillers to avoid "Did you know..." appearing in every paragraph
    const hook = pool.seoHooks[(baseSeed + sectionId) % pool.seoHooks.length];
    const filler = pool.fillers[(baseSeed + sectionId) % pool.fillers.length];
    
    // 3. Select a Structure Template based on sectionId (to be deterministic but varied)
    const structureType = (baseSeed + sectionId) % 4;

    let rawText = "";

    switch (structureType) {
        case 0:
            // Classic: Main 1 -> Main 2 -> Hook -> Filler
            rawText = `${main1} ${main2} ${hook} ${filler}`;
            break;
        case 1:
            // Inverted: Hook -> Main 1 -> Filler -> Main 2
            rawText = `${hook} ${main1} ${filler} Furthermore, ${main2}`;
            break;
        case 2:
            // Concise: Main 1 -> Filler -> Main 2
            rawText = `${main1} ${filler} In addition to that, ${main2}`;
            break;
        case 3:
            // Narrative: Main 2 -> Main 1 -> Hook
            rawText = `${main2} This connects to a larger trend: ${main1} ${hook}`;
            break;
    }

    return replacePlaceholders(rawText);
  };

  const getThematicTitle = (type: keyof typeof pool.thematicTitles, offset: number): string => {
    const titles = pool.thematicTitles[type];
    const title = titles[(baseSeed + offset) % titles.length];
    return replacePlaceholders(title);
  };

  const article = {
    title: lang === 'ar' 
      ? `الأرشيف الكوني: ماذا حدث يوم ${day} ${monthNameAR} ${year}؟` 
      : `The Cosmic Archive: What Happened on ${monthNameEN} ${day}, ${year}?`,
    intro: replacePlaceholders(pool.intros[baseSeed % pool.intros.length]),
    
    // 1. السياسة والتاريخ (History)
    eventsTitle: getThematicTitle('geopolitics', 1),
    eventsContent: buildDynamicParagraph('history', 1),
    
    // 2. الاقتصاد (Economy)
    seasonTitle: getThematicTitle('socioEconomy', 2),
    seasonContent: buildDynamicParagraph('economy', 2),
    
    // 3. الإرث الثقافي (Culture)
    famousPeopleTitle: getThematicTitle('culturalLegacy', 3),
    famousPeopleContent: buildDynamicParagraph('culture', 3),
    
    // 4. العلم والتكنولوجيا (Science)
    technologyTitle: getThematicTitle('scientificFrontier', 4),
    technologyContent: buildDynamicParagraph('science', 4),
    
    // 5. الاتصالات (Lifestyle - Media focus)
    mediaTitle: getThematicTitle('mediaEvolution', 5),
    mediaContent: buildDynamicParagraph('lifestyle', 5),

    // 6. البيئة والطبيعة (Analysis - Environmental Focus)
    environmentalTitle: getThematicTitle('environmentalContext', 6),
    environmentalContent: buildDynamicParagraph('analysis', 6),

    // 7. الجماليات والموضة (Culture - reused but unique items guaranteed)
    aestheticTitle: getThematicTitle('aestheticTrends', 7),
    aestheticContent: buildDynamicParagraph('culture', 7),

    // 8. الحياة اليومية (Lifestyle - reused but unique items guaranteed)
    generationTitle: getThematicTitle('dailyLife', 8),
    generationContent: buildDynamicParagraph('lifestyle', 8),

    // 9. التوقعات المستقبلية (History - reused but unique items guaranteed)
    futureTitle: getThematicTitle('futureVisions', 9),
    futureContent: buildDynamicParagraph('history', 9),

    // 10. التحليل السلوكي (Analysis - reused but unique items guaranteed)
    entertainmentTitle: getThematicTitle('behavioralAnalysis', 10),
    entertainmentContent: buildDynamicParagraph('analysis', 10),

    conclusionTitle: lang === 'ar' ? `خاتمة: أنت جزء من القصة` : `Conclusion: You Are Part of the Story`,
    conclusionContent: replacePlaceholders(pool.conclusions[baseSeed % pool.conclusions.length])
  };

  return {
    article: article as any,
    historicalEvents: [{ year: String(year), event: `The world witnessed a unique alignment of events as you arrived.` }],
    famousPeople: [],
    funFacts: ["Creative Soul", "History Maker", "Future Leader"],
    generatedArticles: []
  };
};
