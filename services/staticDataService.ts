
import { BirthdayData } from '../types';
import { contentPools, decadeFacts, FragmentPool } from '../data/birthdayData';

/**
 * Advanced Deterministic Narrative Synthesis Engine
 * Reconstructs professional historical archives with varied sentence structures and editorial tone.
 */
export const fetchBirthdayInsights = async (day: number, month: number, year: number, lang: 'en' | 'ar' = 'en'): Promise<BirthdayData> => {
  const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  
  const monthNameEN = monthsEN[month - 1];
  const monthNameAR = monthsAR[month - 1];
  const dateStrEN = `${monthNameEN} ${day}`;
  const dateStrAR = `${day} ${monthNameAR}`;
  const decade = `${Math.floor(year / 10) * 10}`;
  
  const rawFacts = decadeFacts[decade] || decadeFacts["1990"];
  const baseSeed = (day * 1337) + (month * 77) + year;
  const pool = contentPools['vibe_master'];

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

  const usedIndices: Record<string, Set<number>> = {};

  const getUniqueItem = (poolKey: keyof FragmentPool, seedOffset: number): string => {
      const arr = pool[poolKey] as string[];
      if (!arr || !Array.isArray(arr) || arr.length === 0) return "";
      if (!usedIndices[poolKey]) usedIndices[poolKey] = new Set();
      let index = (baseSeed + seedOffset) % arr.length;
      let attempts = 0;
      while (usedIndices[poolKey].has(index) && attempts < arr.length) {
          index = (index + 1) % arr.length;
          attempts++;
      }
      usedIndices[poolKey].add(index);
      return arr[index];
  };

  const buildSentence = (poolKey: keyof FragmentPool, seed: number): string => {
      const s1 = getUniqueItem(poolKey, seed);
      const hook = pool.seoHooks[(baseSeed + seed) % pool.seoHooks.length];
      const filler = pool.fillers[(baseSeed + seed) % pool.fillers.length];
      
      // Professional editorial connectors
      const connectors = [
        "From an archival perspective,", "Furthermore,", "The documentation suggest that", 
        "It is notable that", "During the same cycle,", "In this specific context,", 
        "The historical resonance of this period ensured that", "Significantly,"
      ];
      const conn = connectors[seed % connectors.length];

      const structure = (seed % 4);
      // Case 0: Analytical Narrative
      if (structure === 0) return `${s1} ${filler}`;
      // Case 1: Formal Synthesis
      if (structure === 1) return `${conn} ${s1.charAt(0).toLowerCase() + s1.slice(1)} ${hook}`;
      // Case 2: Historical Observation
      if (structure === 2) return `${s1} This phenomenon correlates directly with ${hook.toLowerCase()}`;
      // Case 3: Integrated Context
      return `${filler} ${s1.charAt(0).toLowerCase() + s1.slice(1)} ${hook}`;
  };

  const generateSection = (poolKey: keyof FragmentPool, sectionIndex: number): string => {
      // Build 3 structurally unique sentences to form a concise, professional paragraph
      // We keep it to 3 to satisfy "without increasing paragraph length" for results
      const s1 = buildSentence(poolKey, sectionIndex * 100);
      const s2 = buildSentence(poolKey, (sectionIndex * 100) + 17);
      const s3 = buildSentence(poolKey, (sectionIndex * 100) + 34);
      return replacePlaceholders(`<p>${s1} ${s2} ${s3}</p>`);
  };

  const getThematicTitle = (type: keyof typeof pool.thematicTitles, offset: number): string => {
    const titles = pool.thematicTitles[type];
    const title = titles[(baseSeed + offset) % titles.length];
    return replacePlaceholders(title);
  };

  const article = {
    title: lang === 'ar' 
      ? `الأرشيف التاريخي المتكامل: تحليل يوم ${day} ${monthNameAR} ${year}` 
      : `Archival Reconstruction: The Complete Record of ${monthNameEN} ${day}, ${year}`,
    intro: replacePlaceholders(pool.intros[baseSeed % pool.intros.length]),
    
    eventsTitle: getThematicTitle('geopolitics', 1),
    eventsContent: generateSection('history', 1),
    seasonTitle: getThematicTitle('socioEconomy', 2),
    seasonContent: generateSection('economy', 2),
    famousPeopleTitle: getThematicTitle('culturalLegacy', 3),
    famousPeopleContent: generateSection('culture', 3),
    gamingTitle: getThematicTitle('gamingLife', 16),
    gamingContent: generateSection('gaming', 16),
    healthTitle: getThematicTitle('healthWellness', 19),
    healthContent: generateSection('health', 19),
    rhythmTitle: getThematicTitle('rhythmBeats', 22),
    rhythmContent: generateSection('culture', 22),
    technologyTitle: getThematicTitle('scientificFrontier', 4),
    technologyContent: generateSection('science', 4),
    mediaTitle: getThematicTitle('mediaEvolution', 5),
    mediaContent: generateSection('lifestyle', 5),
    schoolTitle: getThematicTitle('schoolDays', 17),
    schoolContent: generateSection('school', 17),
    wisdomTitle: getThematicTitle('wisdomPhilosophy', 20),
    wisdomContent: generateSection('philosophy', 20),
    digitalTitle: getThematicTitle('digitalFootprint', 23),
    digitalContent: generateSection('science', 23),
    culinaryTitle: getThematicTitle('culinaryWorld', 13),
    culinaryContent: generateSection('culinary', 13),
    environmentalTitle: getThematicTitle('environmentalContext', 6),
    environmentalContent: generateSection('analysis', 6),
    travelTitle: getThematicTitle('travelHorizons', 14),
    travelContent: generateSection('travel', 14),
    sportsTitle: getThematicTitle('sportsSpirit', 15),
    sportsContent: generateSection('sports', 15),
    socialTitle: getThematicTitle('socialVibe', 18),
    socialContent: generateSection('social', 18),
    mysticalTitle: getThematicTitle('mysticalVibes', 21),
    mysticalContent: generateSection('horoscopeInsights', 21),
    cosmicTitle: getThematicTitle('cosmicConnections', 24),
    cosmicContent: generateSection('horoscopeInsights', 24),
    aestheticTitle: getThematicTitle('aestheticTrends', 7),
    aestheticContent: generateSection('culture', 7), 
    generationTitle: getThematicTitle('dailyLife', 8),
    generationContent: generateSection('lifestyle', 8),
    futureTitle: getThematicTitle('futureVisions', 9),
    futureContent: generateSection('history', 9),
    entertainmentTitle: getThematicTitle('behavioralAnalysis', 10),
    entertainmentContent: generateSection('analysis', 10),
    whySpecialTitle: getThematicTitle('psychologicalProfile', 11),
    whySpecialContent: generateSection('psychology', 11),
    careerTitle: getThematicTitle('careerPath', 12),
    careerContent: generateSection('career', 12),
    conclusionTitle: lang === 'ar' ? `خلاصة التقرير: الأثر التاريخي المستمر` : `Summary: Your Enduring Historical Legacy`,
    conclusionContent: replacePlaceholders(pool.conclusions[baseSeed % pool.conclusions.length])
  };

  return {
    article: article as any,
    historicalEvents: [{ year: String(year), event: `The global narrative shifted significantly as your arrival synchronized with these documented historical cycles.` }],
    famousPeople: [],
    funFacts: ["Generational Architect", "Legacy Custodian", "Historical Synthesis Expert", "Visionary Leader"],
    generatedArticles: []
  };
};
