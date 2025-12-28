
import { PersonalStats, MONTHS } from '../types';

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const getMonths = (lang: 'en' | 'ar' = 'en') => {
    // For now, only English is fully supported in static data.
    return MONTHS;
};

export const getZodiacSign = (day: number, month: number): string => {
  const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
  
  let monthIndex = month - 1;
  if (monthIndex === 0 && day < 20) {
    monthIndex = 11;
  } else if (day < days[monthIndex]) {
    monthIndex--;
  }
  
  const index = (monthIndex + 12) % 12;
  return signs[index];
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
