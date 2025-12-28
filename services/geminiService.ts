
import { BirthdayData } from "../types";

/**
 * Disabled as per user requirement to use pre-prepared database content only.
 */
export const generateBirthdayInsights = async (day: number, month: number, year: number): Promise<BirthdayData> => {
  throw new Error("AI Generation is disabled. Please use static data service.");
};
