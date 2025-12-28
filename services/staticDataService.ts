

import { BirthdayData } from '../types';
import { contentPools, decadeFacts, FragmentPool } from '../data/birthdayData';

/**
 * Super-Deterministic High-Fidelity Narrative Engine
 * Generates massive, SEO-friendly articles divided into 24+ major thematic Chapters.
 * 
 * UPGRADES:
 * - Single Block Paragraphs: Combines generated sentences into one massive text block per section.
 * - Concise Intro: Intro is now restricted to a single, impactful segment.
 * - Total Word Count Strategy: Body sections are denser to maintain ~2000 words total.
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

  // UPDATED: Standard Sentence Builder
  const buildSentence = (poolKey: keyof FragmentPool, seed: number): string => {
      const s1 = getUniqueItem(poolKey, seed);
      const hook = pool.seoHooks[(baseSeed + seed) % pool.seoHooks.length];
      const filler = pool.fillers[(baseSeed + seed) % pool.fillers.length];
      
      // Randomize structure to prevent pattern fatigue
      const structure = (seed % 3);
      if (structure === 0) return `${s1} ${filler}`;
      if (structure === 1) return `${hook} ${s1}`;
      return `${s1} This reality is fascinating because ${hook.toLowerCase()}`;
  };

  // UPDATED: Generate One Single Continuous Block of text (Massive Paragraph)
  const generateDeepDiveSection = (poolKey: keyof FragmentPool, sectionIndex: number): string => {
      // Concatenate 5 sentences into one long string
      const p1 = buildSentence(poolKey, sectionIndex * 100);
      const p2 = buildSentence(poolKey, (sectionIndex * 100) + 20);
      const p3 = buildSentence(poolKey, (sectionIndex * 100) + 40);
      const p4 = buildSentence(poolKey, (sectionIndex * 100) + 60);
      const p5 = buildSentence(poolKey, (sectionIndex * 100) + 80);
      
      // Combined into ONE P tag for continuous reading flow as requested
      return replacePlaceholders(`<p>${p1} ${p2} ${p3} ${p4} ${p5}</p>`);
  };

  const getThematicTitle = (type: keyof typeof pool.thematicTitles, offset: number): string => {
    const titles = pool.thematicTitles[type];
    const title = titles[(baseSeed + offset) % titles.length];
    return replacePlaceholders(title);
  };

  // Concise Intro Logic: Just one impactful paragraph
  const generateConciseIntro = (): string => {
     return replacePlaceholders(pool.intros[baseSeed % pool.intros.length]);
  };

  const article = {
    title: lang === 'ar' 
      ? `الأرشيف الكوني الشامل: تحليل عميق ليوم ${day} ${monthNameAR} ${year}` 
      : `The Definitive Cosmic Archive: A Deep Dive into ${monthNameEN} ${day}, ${year}`,
    intro: generateConciseIntro(),
    
    // 24+ Extensive Sections to hit high word counts while keeping paragraphs unified
    
    eventsTitle: getThematicTitle('geopolitics', 1),
    eventsContent: generateDeepDiveSection('history', 1),
    
    seasonTitle: getThematicTitle('socioEconomy', 2),
    seasonContent: generateDeepDiveSection('economy', 2),
    
    famousPeopleTitle: getThematicTitle('culturalLegacy', 3),
    famousPeopleContent: generateDeepDiveSection('culture', 3),
    
    // NEW SIMPLE SECTION 1
    gamingTitle: getThematicTitle('gamingLife', 16),
    gamingContent: generateDeepDiveSection('gaming', 16),
    
    // NEW STRUCTURE SECTION 1
    healthTitle: getThematicTitle('healthWellness', 19),
    healthContent: generateDeepDiveSection('health', 19),
    
    // NEW MICRO SECTION 1 (One Block)
    rhythmTitle: getThematicTitle('rhythmBeats', 22),
    rhythmContent: generateDeepDiveSection('culture', 22),

    technologyTitle: getThematicTitle('scientificFrontier', 4),
    technologyContent: generateDeepDiveSection('science', 4),
    
    mediaTitle: getThematicTitle('mediaEvolution', 5),
    mediaContent: generateDeepDiveSection('lifestyle', 5),

    // NEW SIMPLE SECTION 2
    schoolTitle: getThematicTitle('schoolDays', 17),
    schoolContent: generateDeepDiveSection('school', 17),
    
    // NEW STRUCTURE SECTION 2
    wisdomTitle: getThematicTitle('wisdomPhilosophy', 20),
    wisdomContent: generateDeepDiveSection('philosophy', 20),

    // NEW MICRO SECTION 2 (One Block)
    digitalTitle: getThematicTitle('digitalFootprint', 23),
    digitalContent: generateDeepDiveSection('science', 23),

    culinaryTitle: getThematicTitle('culinaryWorld', 13),
    culinaryContent: generateDeepDiveSection('culinary', 13),

    environmentalTitle: getThematicTitle('environmentalContext', 6),
    environmentalContent: generateDeepDiveSection('analysis', 6),

    travelTitle: getThematicTitle('travelHorizons', 14),
    travelContent: generateDeepDiveSection('travel', 14),

    sportsTitle: getThematicTitle('sportsSpirit', 15),
    sportsContent: generateDeepDiveSection('sports', 15),

    // NEW SIMPLE SECTION 3
    socialTitle: getThematicTitle('socialVibe', 18),
    socialContent: generateDeepDiveSection('social', 18),
    
    // NEW STRUCTURE SECTION 3
    mysticalTitle: getThematicTitle('mysticalVibes', 21),
    mysticalContent: generateDeepDiveSection('horoscopeInsights', 21),

    // NEW MICRO SECTION 3 (One Block)
    cosmicTitle: getThematicTitle('cosmicConnections', 24),
    cosmicContent: generateDeepDiveSection('horoscopeInsights', 24),

    aestheticTitle: getThematicTitle('aestheticTrends', 7),
    aestheticContent: generateDeepDiveSection('culture', 7), 

    generationTitle: getThematicTitle('dailyLife', 8),
    generationContent: generateDeepDiveSection('lifestyle', 8),

    futureTitle: getThematicTitle('futureVisions', 9),
    futureContent: generateDeepDiveSection('history', 9),

    entertainmentTitle: getThematicTitle('behavioralAnalysis', 10),
    entertainmentContent: generateDeepDiveSection('analysis', 10),
    
    whySpecialTitle: getThematicTitle('psychologicalProfile', 11),
    whySpecialContent: generateDeepDiveSection('psychology', 11),
    
    careerTitle: getThematicTitle('careerPath', 12),
    careerContent: generateDeepDiveSection('career', 12),

    conclusionTitle: lang === 'ar' ? `خاتمة: أنت جزء من القصة` : `Conclusion: You Are The Living Legacy`,
    conclusionContent: replacePlaceholders(pool.conclusions[baseSeed % pool.conclusions.length] + " " + pool.conclusions[(baseSeed + 2) % pool.conclusions.length])
  };

  return {
    article: article as any,
    historicalEvents: [{ year: String(year), event: `The world witnessed a unique alignment of events as you arrived.` }],
    famousPeople: [],
    funFacts: ["Creative Soul", "History Maker", "Future Leader", "Adaptive Genius", "Cosmic Traveler"],
    generatedArticles: []
  };
};
