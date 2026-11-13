import { BirthdayData } from '../types';
import { getZodiacSign, getHistoricalMoonPhase } from '../utils/dateUtils';
import { getExactYearData } from '../data/exactYearDatabase';
import { buildYearFactExpansion } from '../data/exactYearFactDetails';
import { buildFactCheckedFamousTwins } from '../data/verifiedBirthdaysByDate';

export interface DocumentarySection {
  title: string;
  content: string;
}

export interface DocumentarySnapshot {
  world_news: DocumentarySection;
  tech_and_toys: DocumentarySection;
  pop_culture: DocumentarySection;
  price_shock: DocumentarySection;
  fashion_vibe: DocumentarySection;
  famous_twins: DocumentarySection;
  notorious_crimes: DocumentarySection;
  global_conflicts: DocumentarySection;
  extreme_weather: DocumentarySection;
  cosmic_vibes: DocumentarySection;
}

const getDetailedFamousTwinsParagraph = (day: number, month: number, monthName: string): { title: string; content: string } => {
  return buildFactCheckedFamousTwins(day, month, monthName);
};

const ZODIAC_DEEP_PROFILES: Record<string, { traits: string; cosmicMeta: string }> = {
  "Scorpio": {
    traits: "carry a quiet, magnetic intensity and an unmistakable presence that people feel the moment they walk into a room. Fiercely loyal and deeply protective, you are the kind of friend who keeps every promise and stands by the people you love through thick and thin. Beneath a calm, composed exterior lives a sharp, observant mind that immediately reads between the lines and notices every unspoken emotion around you. You have zero patience for fake small talk or surface-level friendships, preferring honest late-night conversations, deep trust, and authentic connection. Once you set your heart on a goal or a dream, your focus is unstoppable—turning obstacles into fuel with quiet determination.",
    cosmicMeta: "In celestial tradition, Scorpio is a Fixed Water sign ruled by Pluto and Mars, glowing in the autumn sky near the red supergiant star Antares and paired with golden topaz and citrine birthstones."
  },
  "Virgo": {
    traits: "blend a razor-sharp, observant mind with a grounded, generous warmth that brings calm order to life's busiest moments. You are the person who notices the small, thoughtful details everyone else overlooks—remembering a friend's favorite coffee order, catching a tiny mistake before it happens, and always showing up prepared. Friends and family naturally lean on your practical wisdom, dry sense of humor, and quiet reliability whenever they need honest advice. Though you hold yourself to high standards and work tirelessly behind the scenes without asking for applause, your heart is deeply caring and devoted. When you care about someone, you show it not with loud speeches, but through a thousand everyday acts of kindness and loyalty.",
    cosmicMeta: "In celestial tradition, Virgo is a Mutable Earth sign ruled by Mercury, anchored in the night sky by the bright star Spica and paired with blue sapphire and peridot birthstones."
  },
  "Capricorn": {
    traits: "possess a rare, enduring inner strength, pairing dry, effortless wit with the patient ambition to build big dreams brick by brick. While others chase quick shortcuts, you have the discipline, resilience, and clear-headed focus to keep climbing until you reach the summit. In friendships and family life, you are the steady anchor everyone trusts when times get complicated—calm under pressure, fiercely dependable, and true to your word. People who only see your driven, independent side are often surprised by how warm, protective, and quietly hilarious you are once you let your guard down. You value quality over quantity in every part of life, keeping a close circle of lifelong people who know your heart.",
    cosmicMeta: "In celestial tradition, Capricorn is a Cardinal Earth sign ruled by ringed Saturn, marked in the winter sky by Deneb Algedi and paired with deep red garnet and blue topaz birthstones."
  },
  "Aquarius": {
    traits: "walk to your own unmistakable rhythm, blending an original, independent mind with a deep care for fairness and human connection. You have never been content to simply follow the crowd—instead, you look at the world with fresh eyes, curious about big ideas, new possibilities, and how things could be better. Friends love your refreshing honesty, quirky humor, and the way you accept people for who they truly are without judgment. Even though you cherish your personal freedom and quiet time to recharge your thoughts, you are a fiercely loyal ally who always champions the underdog. Conversations with you are never boring, leaving people inspired and seeing life from a brand-new angle.",
    cosmicMeta: "In celestial tradition, Aquarius is a Fixed Air sign ruled by Uranus and Saturn, shining near the star Sadalsuud and paired with amethyst and garnet birthstones."
  },
  "Pisces": {
    traits: "move through the world with a vivid, poetic imagination and an effortless empathy that makes even strangers feel immediately understood. You have an uncanny emotional radar—sensing the mood of a room in seconds and offering comfort, warmth, and kindness without ever being asked. Creative, gentle, and deeply intuitive, you find magic in music, storytelling, nostalgia, and quiet late-night reflection. Friends treasure your compassionate heart and the safe, judgment-free space you create whenever someone needs to talk from the soul. Yet beneath that soft, dreamy nature lies a surprisingly resilient spirit that knows how to weather life's storms with grace and hope.",
    cosmicMeta: "In celestial tradition, Pisces is a Mutable Water sign ruled by Neptune and Jupiter, guided by the star Alpherg and paired with sea-blue aquamarine and amethyst birthstones."
  },
  "Aries": {
    traits: "bring an unmistakable spark of courage, energy, and warmth wherever you go, always ready to turn a bold idea into reality. You are a natural trailblazer who prefers action over hesitation, stepping forward with confidence when everyone else is waiting to see who goes first. In friendships and daily life, your refreshing candor, contagious enthusiasm, and fearless optimism lift the spirits of everyone around you. You wear your heart openly on your sleeve—never holding onto petty grudges for long, fighting passionately for the people you love, and cheering the loudest for your friends' victories. Life around you feels vibrant, fast-moving, and full of possibility.",
    cosmicMeta: "In celestial tradition, Aries is a Cardinal Fire sign ruled by Mars, rising with the spring equinox under the red giant star Hamal and paired with diamond and bloodstone birthstones."
  },
  "Taurus": {
    traits: "combine a calm, grounded strength with a deep appreciation for the simple, comforting pleasures that make life worth living. You are the definition of loyalty and steadiness—the person who stays cool-headed in a crisis and never backs down when protecting the people and values you love. With a natural eye for beauty and comfort, you savor good food, timeless music, cozy spaces, and unhurried conversations with close friends. You don't rush into trust overnight, but once someone earns a place in your inner circle, your devotion stands firm through every season of life. People feel instantly at ease around your warm, genuine, and down-to-earth presence.",
    cosmicMeta: "In celestial tradition, Taurus is a Fixed Earth sign ruled by Venus, illuminated by the orange star Aldebaran and the Pleiades cluster alongside emerald and diamond birthstones."
  },
  "Gemini": {
    traits: "carry a contagious curiosity, quick wit, and a natural gift for conversation that can turn an ordinary coffee-shop chat into an unforgettable memory. Your mind moves at lightning speed, effortlessly connecting ideas, picking up new skills, and finding humor in everyday situations. Adaptable and socially magnetic, you can walk into any room of strangers and leave with three new friends and a great story to tell. Beneath your playful, upbeat charm is a thoughtful observer who loves learning what makes people tick and seeing both sides of every question. Friends count on you to bring laughter, fresh energy, and brilliant ideas to every gathering.",
    cosmicMeta: "In celestial tradition, Gemini is a Mutable Air sign ruled by swift Mercury, lit by the twin stars Castor and Pollux and paired with pearl and alexandrite birthstones."
  },
  "Cancer": {
    traits: "possess a remarkable emotional memory, deep intuition, and a protective warmth that turns any gathering into a place of true belonging. Guided by the heart, you can sense when a friend or family member is having a hard day before they even say a single word. While you may take a little time to open up to new people, those trusted inside your circle discover a fiercely devoted, funny, and endlessly supportive companion. You cherish family traditions, nostalgic keepsakes, and the comfort of home, remembering the little stories and milestones that bind people together. When you love someone, you stand in their corner with unwavering care and loyalty.",
    cosmicMeta: "In celestial tradition, Cancer is a Cardinal Water sign ruled by the Moon, cradling the Beehive star cluster and paired with ruby, pearl, and moonstone birthstones."
  },
  "Leo": {
    traits: "radiate a natural, generous warmth and confident charisma that lights up a room without even trying. With a big, open heart and a flair for creativity, you love making the people around you feel special, celebrated, and seen. You are fiercely courageous and protective of your loved ones—always the first to defend a friend, share what you have, and turn an ordinary afternoon into an occasion worth remembering. Driven by pride in your work and honesty in your relationships, you inspire others simply by living with passion and authenticity. Even during tough chapters, your resilience and sunny sense of humor bring warmth back to everyone nearby.",
    cosmicMeta: "In celestial tradition, Leo is a Fixed Fire sign ruled by the Sun, anchored on the ecliptic by the brilliant star Regulus and paired with peridot and ruby birthstones."
  },
  "Libra": {
    traits: "carry an effortless grace, warm charm, and a natural instinct for harmony and fairness in every relationship. You have a gift for seeing every perspective in a room, making you the peacemaker and trusted confidant whom friends turn to when tensions run high. With a refined eye for style, music, and atmosphere, you love bringing people together and making sure no one in the group ever feels left out. Behind your polite, easygoing smile is a sharp intellect with a strong moral compass that cannot stand injustice or cruelty. People are drawn to your kindness, balanced judgment, and the genuine warmth you bring to every conversation.",
    cosmicMeta: "In celestial tradition, Libra is a Cardinal Air sign ruled by Venus, shining under the stars Zubeneschamali and Zubenelgenubi and paired with opal and sapphire birthstones."
  },
  "Sagittarius": {
    traits: "live with an open horizon in your eyes, driven by a love of freedom, big questions, and candid, infectious laughter. Optimistic and big-hearted, you look at life as a grand adventure meant to be explored firsthand rather than watched from the sidelines. Friends love your refreshing honesty, generous spirit, and the way your stories and humor can brighten even the heaviest day. You have little interest in petty drama or rigid routines, thriving instead on new experiences, travel, learning, and heartfelt philosophical chats. Wherever you go, your independent spirit and warm enthusiasm remind everyone around you to dream bigger.",
    cosmicMeta: "In celestial tradition, Sagittarius is a Mutable Fire sign ruled by Jupiter, aiming toward the heart of the Milky Way and paired with turquoise and blue topaz birthstones."
  }
};

export const generateDocumentarySnapshot = async (day: number, month: number, year: number): Promise<DocumentarySnapshot> => {
  const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthsEN[month - 1] || "January";
  const dateStr = `${monthName} ${day}, ${year}`;

  const exactYear = getExactYearData(year);
  const exp = buildYearFactExpansion(year, exactYear, month, day);
  const zodiac = getZodiacSign(day, month);
  const zodiacProfile = ZODIAC_DEEP_PROFILES[zodiac] || ZODIAC_DEEP_PROFILES["Scorpio"];
  const moon = getHistoricalMoonPhase(day, month, year);
  const famousTwins = getDetailedFamousTwinsParagraph(day, month, monthName);

  return {
    world_news: {
      title: `🌍 Life in ${year}: The Vibe of the Era`,
      content: exp.newsStory
    },
    tech_and_toys: {
      title: `🕹️ Tech & Toys: What We Played With in ${year}`,
      content: exp.techStory
    },
    pop_culture: {
      title: `🎵 Pop Culture: The Soundtrack and Screens of ${year}`,
      content: exp.popStory
    },
    price_shock: {
      title: "💸 The Price Shock: What Everyday Life Cost",
      content: exp.priceStory
    },
    fashion_vibe: {
      title: `👗 Fashion & Vibe: The Iconic Style of ${year}`,
      content: exp.fashionStory
    },
    famous_twins: {
      title: "🌟 Famous Twins: Icons Born on This Day",
      content: famousTwins.content
    },
    notorious_crimes: {
      title: `🕵️ True Crime & Mysteries of ${year}`,
      content: exp.crimeStory
    },
    global_conflicts: {
      title: `⚔️ The Global Stage: Major Shifts in ${year}`,
      content: exp.conflictStory
    },
    extreme_weather: {
      title: `🌪️ Forces of Nature: Extreme Weather in ${year}`,
      content: exp.weatherStory
    },
    cosmic_vibes: {
      title: "🌙 Cosmic Vibes: Your Zodiac & Moon Phase",
      content: `Born on ${monthName} ${day} under the sign of ${zodiac}, you ${zodiacProfile.traits} ${zodiacProfile.cosmicMeta} Above quiet rooftops on the night of ${dateStr}, the Moon glowed in its ${moon.phaseName} phase at ${moon.illumination}% illumination (day ${moon.lunarAgeDays} of the 29.5-day lunar cycle), crowning your arrival with a timeless nocturnal signature.`
    }
  };
};

export const fetchBirthdayInsights = async (day: number, month: number, year: number, lang: 'en' | 'ar' = 'en'): Promise<BirthdayData> => {
  const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const monthNameEN = monthsEN[month - 1] || "January";
  const monthNameAR = monthsAR[month - 1] || "يناير";

  const snapshot = await generateDocumentarySnapshot(day, month, year);

  const article = {
    title: lang === 'ar'
      ? `الأرشيف الوثائقي ليوم ${day} ${monthNameAR} ${year}`
      : `The ${year} Time Capsule: ${monthNameEN} ${day}, ${year}`,
    intro: "",
    documentarySnapshot: snapshot,

    eventsTitle: snapshot.world_news.title,
    eventsContent: `<p>${snapshot.world_news.content}</p>`,
    technologyTitle: snapshot.tech_and_toys.title,
    technologyContent: `<p>${snapshot.tech_and_toys.content}</p>`,
    entertainmentTitle: snapshot.pop_culture.title,
    entertainmentContent: `<p>${snapshot.pop_culture.content}</p>`,
    seasonTitle: snapshot.price_shock.title,
    seasonContent: `<p>${snapshot.price_shock.content}</p>`,
    aestheticTitle: snapshot.fashion_vibe.title,
    aestheticContent: `<p>${snapshot.fashion_vibe.content}</p>`,
    famousPeopleTitle: snapshot.famous_twins.title,
    famousPeopleContent: `<p>${snapshot.famous_twins.content}</p>`,
    mediaTitle: snapshot.notorious_crimes.title,
    mediaContent: `<p>${snapshot.notorious_crimes.content}</p>`,
    futureTitle: snapshot.global_conflicts.title,
    futureContent: `<p>${snapshot.global_conflicts.content}</p>`,
    environmentalTitle: snapshot.extreme_weather.title,
    environmentalContent: `<p>${snapshot.extreme_weather.content}</p>`,
    cosmicTitle: snapshot.cosmic_vibes.title,
    cosmicContent: `<p>${snapshot.cosmic_vibes.content}</p>`,

    conclusionTitle: "Your Time Capsule Complete",
    conclusionContent: `From the verified headlines, gadgets, and box-office hits of ${year} to the ${getHistoricalMoonPhase(day, month, year).phaseName} shining above on ${monthNameEN} ${day}, that is the complete historical portrait of the era when your story began.`
  };

  return {
    article: article as any,
    historicalEvents: [],
    famousPeople: [],
    funFacts: [],
    generatedArticles: []
  };
};
