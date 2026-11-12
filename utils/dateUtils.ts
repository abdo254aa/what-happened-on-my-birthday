import { PersonalStats, MONTHS } from '../types';

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const getMonths = (_lang: 'en' | 'ar' = 'en') => {
  return MONTHS;
};

/**
 * 100% accurate Western Tropical Zodiac Sign calculation.
 * Capricorn: Dec 22 - Jan 19
 * Aquarius: Jan 20 - Feb 18
 * Pisces: Feb 19 - Mar 20
 * Aries: Mar 21 - Apr 19
 * Taurus: Apr 20 - May 20
 * Gemini: May 21 - Jun 20
 * Cancer: Jun 21 - Jul 22
 * Leo: Jul 23 - Aug 22
 * Virgo: Aug 23 - Sep 22
 * Libra: Sep 23 - Oct 22
 * Scorpio: Oct 23 - Nov 21
 * Sagittarius: Nov 22 - Dec 21
 */
export const getZodiacSign = (day: number, month: number): string => {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  return "Sagittarius";
};

/**
 * Calculates the real historical phase of the Moon for any Gregorian date
 * using astronomical Julian Day Number and the 29.530588853-day synodic cycle.
 */
export const getHistoricalMoonPhase = (day: number, month: number, year: number): { phaseName: string; illumination: number; lunarAgeDays: number } => {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + 0.5 + B - 1524.5;

  const synodicMonth = 29.530588853;
  const knownNewMoonJD = 2451550.1; // Jan 6, 2000 18:14 UTC
  const cycles = (jd - knownNewMoonJD) / synodicMonth;
  const normalizedPhase = ((cycles % 1) + 1) % 1;
  const lunarAgeDays = Math.round(normalizedPhase * synodicMonth * 10) / 10;
  const illumination = Math.round(((1 - Math.cos(normalizedPhase * 2 * Math.PI)) / 2) * 100);

  let phaseName = "New Moon";
  if (lunarAgeDays < 1.84) phaseName = "New Moon";
  else if (lunarAgeDays < 5.53) phaseName = "Waxing Crescent Moon";
  else if (lunarAgeDays < 9.22) phaseName = "First Quarter Moon";
  else if (lunarAgeDays < 12.91) phaseName = "Waxing Gibbous Moon";
  else if (lunarAgeDays < 16.61) phaseName = "Full Moon";
  else if (lunarAgeDays < 20.30) phaseName = "Waning Gibbous Moon";
  else if (lunarAgeDays < 23.99) phaseName = "Third (Last) Quarter Moon";
  else if (lunarAgeDays < 27.68) phaseName = "Waning Crescent Moon";
  else phaseName = "New Moon";

  return { phaseName, illumination, lunarAgeDays };
};

export const calculatePersonalStats = (day: number, month: number, year: number): PersonalStats => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const timeDiff = Math.abs(today.getTime() - birthDate.getTime());
  const totalDaysAlive = Math.floor(timeDiff / (1000 * 3600 * 24));

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = birthDate.getDay();
  const dayOfWeekBorn = daysOfWeek[dayIndex];

  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);
  
  if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, month - 1, day);
  }

  const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
  const daysUntilNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const nextBirthdayDayOfWeek = daysOfWeek[nextBirthday.getDay()];

  return {
    age,
    exactAge: { years, months, days },
    totalDaysAlive,
    dayOfWeekBorn,
    daysUntilNextBirthday,
    nextBirthdayDayOfWeek,
    zodiacSign: getZodiacSign(day, month)
  };
};

export const formatDate = (day: number, month: number, year: number) => {
  const monthName = MONTHS[month - 1];
  return `${monthName} ${day}, ${year}`;
};

export const formatJustifiedText = (input: string): string => {
  if (!input) return input;
  const SHY = '\u00AD';
  const hyphenateWord = (word: string): string => {
    if (word.length < 6 || word.includes(SHY)) return word;
    const parts: string[] = [];
    let i = 0;
    while (i < word.length) {
      const remaining = word.length - i;
      if (remaining <= 4) {
        parts.push(word.slice(i));
        break;
      }
      const step = remaining === 5 ? 3 : 3;
      parts.push(word.slice(i, i + step));
      i += step;
    }
    return parts.join(SHY);
  };

  return input
    .split(/(<[^>]+>)/g)
    .map((segment) => {
      if (segment.startsWith('<')) return segment;
      return segment.replace(/[A-Za-z]{6,}/g, hyphenateWord);
    })
    .join('');
};
