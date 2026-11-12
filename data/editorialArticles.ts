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
    category: 'Celebrity & Icons Spotlight',
    readTime: '6 min read',
    imageGradient: 'from-amber-400 to-orange-600',
    title: 'Famous Birthdays on {date}',
    intro: 'Every calendar date has its own star-studded guest list, and {date} shines brighter than most! From silver-screen legends and chart-topping musicians to trailblazing thinkers, the icons born on this day share an unmistakable spark of charisma and ambition. Step inside our VIP birthday lounge to discover the remarkable figures who blow out their candles right alongside you on {date}.',
    sections: [],
    conclusionTitle: 'Your Spot on the Red Carpet',
    conclusionContent: 'Sharing {date} with such unforgettable legends proves that your birthday carries a legacy of bold creativity and star power. Whenever your special day arrives, celebrate knowing you are in truly iconic company!'
  },
  'famous-birthday-twins': {
    id: 'famous-birthday-twins',
    category: 'Twin Star Profiles',
    readTime: '6 min read',
    imageGradient: 'from-blue-500 to-indigo-700',
    title: 'Celebrity Twins on {date}',
    intro: 'Have you ever wondered which world-famous stars share the exact same birthday spotlight as {date}? Having a celebrity birthday twin is like sharing a secret cosmic handshake with the worlds of Hollywood, music, and sports. Let us pull back the velvet curtain and meet the inspiring icons who call {date} their birthday too!',
    sections: [],
    conclusionTitle: 'Twins in Spirit and Sparkle',
    conclusionContent: 'Your celebrity birthday twins on {date} show that passion, originality, and heart can light up the entire world. Keep shining in your own unique way—you share a calendar day built for greatness!'
  },
  'history-of-birthdays': {
    id: 'history-of-birthdays',
    category: 'Time-Travel Chronicles',
    readTime: '7 min read',
    imageGradient: 'from-slate-800 to-slate-950',
    title: 'Historical Events of {date}',
    intro: 'If the calendar pages of {date} could talk, they would tell stories of jaw-dropping breakthroughs, cultural Plot Twists, and moments that changed the world forever! Across the centuries, this exact date has served as the stage for bold explorers, dazzling inventions, and unforgettable celebrations. Grab your backstage pass to history as we uncover the most fascinating moments that happened on {date}.',
    sections: [],
    conclusionTitle: 'A Date Written in History',
    conclusionContent: 'From grand turning points to cultural milestones, {date} is woven right into the most exciting chapters of human history. Every year, you get to add your own unforgettable story to this extraordinary calendar date!'
  },
  'zodiac-magic-guide': {
    id: 'zodiac-magic-guide',
    category: 'Astrology & Cosmic Style',
    readTime: '6 min read',
    imageGradient: 'from-purple-600 to-indigo-900',
    title: 'Horoscope Secrets for {date}',
    intro: 'There is a special kind of stardust woven into {date}, blending cosmic magnetism with an irresistible personality glow! People born on this exact day carry a unique astrological signature that sets them apart in any room they enter. Ready to unlock the celestial vault and discover the hidden superpowers, secret quirks, and cosmic destiny written in the stars for {date}?',
    sections: [],
    conclusionTitle: 'Embrace Your Cosmic Glow',
    conclusionContent: 'The stars on {date} gifted you with a rare blend of intuition, charm, and unstoppable drive. Trust your inner compass, let your natural magic shine, and watch how effortlessly the universe meets you halfway!'
  },
  'birthday-love-compatibility': {
    id: 'birthday-love-compatibility',
    category: 'Love & Star Chemistry',
    readTime: '6 min read',
    imageGradient: 'from-pink-500 to-rose-700',
    title: 'Birthday Love Compatibility',
    intro: 'When it comes to romance, friendship, and undeniable chemistry, the energy of {date} is pure magnetism! Your birth date holds the key to how you fall in love, what makes your heart skip a beat, and which zodiac signs naturally vibe with your wavelength. Let us dive into the cosmic love playbook for {date} and uncover the secrets to your most magical connections!',
    sections: [],
    conclusionTitle: 'Written in the Stars',
    conclusionContent: 'Whether you are sparks-flying with a soulmate or building lifelong friendships, the heart of {date} loves deeply, loyally, and unforgettable. Stay true to your authentic warmth, and the right people will always gravitate to your orbit!'
  }
};
