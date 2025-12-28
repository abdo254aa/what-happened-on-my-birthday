
export interface EditorialSection {
  title: string;
  content: string;
  iconType: 'sparkles' | 'heart' | 'globe' | 'zap' | 'users' | 'music' | 'history';
  colorClass: string;
}

export interface EditorialTemplate {
  id: string;
  title: string;
  category: string;
  readTime: string;
  imageGradient: string;
  intro: string;
  sections: EditorialSection[];
  conclusionTitle: string;
  conclusionContent: string;
}

const commonSectionsEN = (date: string): EditorialSection[] => [
  {
    title: `The Energy of ${date}`,
    content: `People born on ${date} have a special kind of energy. It's like you're naturally tuned to find the best in every situation. History shows that individuals born on this day often have a very strong sense of justice and a heart that wants to help others. You don't just follow the crowd; you lead it with a smile and a clear mind.`,
    iconType: 'sparkles',
    colorClass: 'text-purple-600'
  },
  {
    title: `Global Connections on ${date}`,
    content: `Throughout history, ${date} has been a day of many firsts. From small inventions to big cultural moments, this day is all about making things happen. When you share this birthday, you share a connection with people who aren't afraid to try something new. Your birth date is a symbol of courage and a reminder that you have the power to change things for the better.`,
    iconType: 'zap',
    colorClass: 'text-amber-500'
  }
];

export const editorialTemplates: Record<string, EditorialTemplate> = {
  'famous-birthdays': {
    id: 'famous-birthdays',
    category: 'Celebrity Culture',
    readTime: '15 min read',
    imageGradient: 'from-amber-400 to-orange-600',
    title: 'Historical Report: Who Shares a Birthday on {date}?',
    intro: 'Take a deep look at the history and the legends who share your special day in {year}.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'Your Legacy is Waiting',
    conclusionContent: 'Being born on {date} puts you in a group of stars. Go out there and shine!'
  },
  'famous-birthday-twins': {
    id: 'famous-birthday-twins',
    category: 'Celebrity Profiles',
    readTime: '18 min read',
    imageGradient: 'from-blue-500 to-indigo-700',
    title: 'Celebrity Twins: Finding Your Star Match for {date}',
    intro: 'Ever wondered which Hollywood icon or musical legend acts as your spiritual twin? The stars of {date} reveal a fascinating pattern of talent and fame.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'Walk the Red Carpet of Life',
    conclusionContent: 'Your birthday twins prove that greatness is in your DNA. Embrace your star power.'
  },
  'history-of-birthdays': {
    id: 'history-of-birthdays',
    category: 'Historical Archive',
    readTime: '20 min read',
    imageGradient: 'from-slate-800 to-slate-950',
    title: 'The Full Timeline: Major Events of {date}',
    intro: 'Let’s explore the complex facts and seismic shifts that happened around the world on your specific birth date.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'You are the Future',
    conclusionContent: 'Every event on {date} led to the world we live in now. You are a key part of it.'
  },
  'zodiac-magic-guide': {
    id: 'zodiac-magic-guide',
    category: 'Astrology',
    readTime: '12 min read',
    imageGradient: 'from-purple-600 to-indigo-900',
    title: 'Stars of {date}: What the Universe Says About You',
    intro: 'The planetary alignment on {date} was a unique cosmic signature designed to welcome a new visionary into the world.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'Trust Your Universal Energy',
    conclusionContent: 'Use your natural celestial strengths to guide you. You were born for greatness.'
  },
  'birthday-love-compatibility': {
    id: 'birthday-love-compatibility',
    category: 'Relationships',
    readTime: '14 min read',
    imageGradient: 'from-pink-500 to-rose-700',
    title: 'Birthday Love Match: Romance Secrets for {date}',
    intro: 'How does your birth on {date} influence your heart? We analyze the romantic vibrations of this specific day in {year}.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'Love is Your North Star',
    conclusionContent: 'Finding a match is about understanding the resonance of your birth. Follow your heart.'
  }
};
