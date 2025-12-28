
export interface GeneratedArticle {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageGradient: string;
  content: string;
}

export interface HistoricalEvent {
  year: string;
  event: string;
}

export interface FamousPerson {
  name: string;
  year: string;
  nationality: string;
  achievement: string;
}

export interface BirthdayArticle {
  title: string;
  intro: string;
  // المحاور الأساسية والموسعة
  eventsTitle: string;
  eventsContent: string;
  seasonTitle: string;
  seasonContent: string;
  famousPeopleTitle: string;
  famousPeopleContent: string;
  entertainmentTitle: string;
  entertainmentContent: string;
  technologyTitle: string;
  technologyContent: string;
  generationTitle: string;
  generationContent: string;
  funFactsTitle: string;
  funFactsContent: string;
  whySpecialTitle: string;
  whySpecialContent: string;
  // محاور جديدة للطول والتشويق
  mediaTitle: string;
  mediaContent: string;
  environmentalTitle: string;
  environmentalContent: string;
  futureTitle: string;
  futureContent: string;
  aestheticTitle: string;
  aestheticContent: string;
  conclusionTitle: string;
  conclusionContent: string;
}

export interface BirthdayData {
  article: BirthdayArticle;
  historicalEvents: HistoricalEvent[];
  famousPeople: FamousPerson[];
  funFacts: string[];
  generatedArticles: GeneratedArticle[];
}

export interface DateSelection {
  day: number;
  month: number;
  year: number;
}

export interface PersonalStats {
  age: number;
  exactAge: {
    years: number;
    months: number;
    days: number;
  };
  totalDaysAlive: number;
  dayOfWeekBorn: string;
  daysUntilNextBirthday: number;
  nextBirthdayDayOfWeek: string;
  zodiacSign: string;
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
