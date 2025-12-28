
import React, { createContext, useContext, useState } from 'react';

export interface ContentItem {
  id: string;
  title: string;
  content: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  count: number;
}

interface ContentContextType {
  descriptionItems: ContentItem[];
  sidebarTopics: SidebarItem[];
  addDescriptionItem: (item: Omit<ContentItem, 'id'>) => void;
  updateDescriptionItem: (id: string, item: Partial<ContentItem>) => void;
  removeDescriptionItem: (id: string) => void;
  addSidebarTopic: (name: string) => void;
  removeSidebarTopic: (id: string) => void;
}

const DEFAULT_ITEMS_EN = [
    {
        id: '1',
        title: "What Day of the Week Was I Born On?",
        content: "Ever wondered which day of the week you were born? Each day has its own unique vibe! Some believe it can influence your personality. Wednesday kids are chatty and clever, while Saturday kids are disciplined and reliable. Enter your birthday above and discover the exact day the world welcomed you—it’s fun to see how the day of your birth connects to your story!"
    },
    {
        id: '2',
        title: "What Big Events Happened on My Birthday?",
        content: "Your birthday isn’t just a personal day—it’s part of history! Maybe a famous invention was launched, a historic agreement signed, or a legendary movie released. Every day has interesting events, and your birthday is no exception. Enter your date to explore the amazing things that happened around the world when you were born."
    },
    {
        id: '3',
        title: "Which Famous People Share My Birthday?",
        content: "You share your special day with celebrities, actors, singers, and famous historical figures! Maybe your birthday twin is a legendary musician or a world leader. Seeing which famous people were born on the same day makes your birthday feel extra special. Enter your birthday to discover your celebrity twins and find inspiration from their achievements!"
    },
    {
        id: '4',
        title: "What Was the World Like on My Birthday?",
        content: "From fashion trends to popular songs, from sports events to cultural moments, the world on your birthday was full of surprises. Was it a year of amazing discoveries, big celebrations, or record-breaking events? Learning about your birthday in context makes your special day even more exciting. Enter your birth date and explore the world as it was when you were born!"
    },
    {
        id: '5',
        title: "Which Generation Do I Belong To?",
        content: "Your birth year tells you which generation you are part of—Gen Z, Millennials, or even Gen Alpha. Each generation shares experiences, trends, and cultural references. Knowing your generation helps you understand your peers and how the world around you shaped your childhood. Enter your birthday to see which generation you belong to and what makes it unique!"
    },
];

const DEFAULT_SIDEBAR_TOPICS_EN = [
    { id: 't1', name: "Historical Events", count: 120 },
    { id: 't2', name: "Pop Culture", count: 85 },
    { id: 't3', name: "Science & Space", count: 64 },
    { id: 't4', name: "Astrology", count: 42 },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [descriptionItems, setDescriptionItems] = useState<ContentItem[]>(DEFAULT_ITEMS_EN);
  const [sidebarTopics, setSidebarTopics] = useState<SidebarItem[]>(DEFAULT_SIDEBAR_TOPICS_EN);

  const addDescriptionItem = (item: Omit<ContentItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setDescriptionItems(prev => [...prev, newItem]);
  };

  const updateDescriptionItem = (id: string, item: Partial<ContentItem>) => {
    setDescriptionItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
  };

  const removeDescriptionItem = (id: string) => {
    setDescriptionItems(prev => prev.filter(i => i.id !== id));
  };

  const addSidebarTopic = (name: string) => {
      const newTopic = { id: Date.now().toString(), name, count: Math.floor(Math.random() * 100) + 10 };
      setSidebarTopics(prev => [...prev, newTopic]);
  }

  const removeSidebarTopic = (id: string) => {
      setSidebarTopics(prev => prev.filter(t => t.id !== id));
  }

  return (
    <ContentContext.Provider value={{ 
        descriptionItems, 
        sidebarTopics,
        addDescriptionItem, 
        updateDescriptionItem, 
        removeDescriptionItem,
        addSidebarTopic,
        removeSidebarTopic
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
