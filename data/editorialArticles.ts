
export interface EditorialSection {
  title: string;
  content: string;
  iconType: 'sparkles' | 'heart' | 'globe' | 'zap' | 'users' | 'music' | 'history' | 'star' | 'message-circle' | 'flag' | 'moon' | 'shield' | 'cloud' | 'eye' | 'calendar' | 'sun' | 'trending-up' | 'activity' | 'camera' | 'map' | 'coffee' | 'award' | 'book';
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

export const editorialTemplates: Record<string, EditorialTemplate> = {
  'famous-birthdays': {
    id: 'famous-birthdays',
    category: 'Celebrity Culture',
    readTime: '15 min read',
    imageGradient: 'from-amber-400 to-orange-600',
    title: 'Historical Report: Who Shares a Birthday on {date}?',
    intro: 'Take a deep look at the history and the legends who share your special day.',
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
    intro: 'Let’s explore the complex facts and seismic shifts that happened around the world on this day in history.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'You are the Future',
    conclusionContent: 'Every event on {date} contributes to the rich tapestry of history. You are a key part of it.'
  },
  'zodiac-magic-guide': {
    id: 'zodiac-magic-guide',
    category: 'Astrology',
    readTime: '12 min read',
    imageGradient: 'from-purple-600 to-indigo-900',
    title: 'Stars of {date}: What the Universe Says About You',
    intro: 'The planetary alignment on {date} carries a unique cosmic signature designed to welcome a visionary into the world.',
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
    intro: 'How does your birth on {date} influence your heart? We analyze the romantic vibrations of this specific day.',
    sections: [], // Populated dynamically by service
    conclusionTitle: 'Love is Your North Star',
    conclusionContent: 'Finding a match is about understanding the resonance of your birth. Follow your heart.'
  }
};
