
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
        title: "The Scholarly Methodology of Historical Synchronization",
        content: "Reconstructing the specific context of an individual's entry into the world requires a rigorous multi-disciplinary approach. We synchronize personal milestones with the documented progress of human civilization, utilizing a vast repository of socio-economic data, geopolitical archives, and cultural indicators. By analyzing the weekday of birth, we establish the primary social rhythm of that period—whether the era was defined by the industrial momentum of a mid-week cycle or the community-focused heritage of the weekend. This initial categorization allows us to map the individual's history onto a broader human timeline with scholarly precision, ensuring that personal memories are preserved with authentic substance and context."
    },
    {
        id: '2',
        title: "Analyzing Structural Shifts in the Global Narrative",
        content: "Every calendar date serves as a permanent record of the international climate. Throughout the late twentieth and early twenty-first centuries, global structures underwent constant recalibration, from the ratification of multilateral strategic protocols to the emergence of revolutionary social theories. Our documentation provides a systematic reconstruction of these events, offering insights into the institutional forces that governed society as an individual began their development. We examine the equilibrium between industrial capability and social reform, providing a high-quality analytical framework that helps individuals recognize the generational trends that shaped their professional and personal environments."
    },
    {
        id: '3',
        title: "Cultural Archetypes and the Information Genesis",
        content: "A generation's identity is intrinsically linked to the sensory and information paradigms of its era. We meticulously document the evolution of global media, charting the transition from traditional analog broadcast structures to the nascent digital networks of the information age. By identifying the definitive cinematic achievements, musical compositions, and aesthetic standards of a specific year, we reconstruct the cultural zeitgeist. This scholarly profile allows for a deeper appreciation of the creative movements that influenced early socialization. We prioritize depth over trivia, ensuring that the documentation of popular culture serves as a meaningful analysis of human expression and social identity."
    },
    {
        id: '4',
        title: "Technological Heritage and the Logic of Innovation",
        content: "The technological landscape of the past seven decades has advanced with unprecedented velocity. From the foundational milestones of molecular biology to the industrial applications of global telecommunications, every birth year represents a unique stage in the history of innovation. Our archive captures the arrival of status-symbol devices and the technical breakthroughs that signaled a modernizing society. By examining the 'Digital Genesis' of a specific period, we provide individuals with a perspective on the scientific heritage that defined their cohort's expectations and capabilities. This technical reconstruction ensures that the context of a birth date is preserved with the authority of a professional archive."
    },
    {
        id: '5',
        title: "Scholarly Categorization of Generational Cohorts",
        content: "Individual development is inextricably tied to the shared experiences of a generational cohort. Each group is socialized within the context of specific historical challenges, economic fluctuations, and technological shifts. Whether a member of the resilient Post-War era or the digital-native generations of the current century, an individual's worldview is forged in the crucible of their era's unique circumstances. Our analytical reports provide a detailed breakdown of these generational traits, exploring how systemic institutional changes created lasting influences on career trajectories and interpersonal dynamics. This thorough categorization is essential for a comprehensive understanding of personal and social history."
    },
    {
        id: '6',
        title: "Professional Editorial Standards and Historical Integrity",
        content: "MyBirthdayFacts adheres to a rigorous human-editorial framework to ensure the highest standards of accuracy and relevance. Our researchers aggregate data from verified socio-economic reports, official historical databases, and established cultural archives. We reject superficial repetition in favor of analytical clarity and substantive depth, believing that personal history deserves the same integrity as global chronicles. Our commitment to data accuracy ensures that every report functions as an authoritative reference, helping to preserve the unique cultural memory of an individual's entry into the world. This dedication to scholarly excellence is the cornerstone of our mission to archive the human narrative."
    },
    {
        id: '7',
        title: "The Enduring Value of Personal Documentation",
        content: "In a world of rapidly shifting digital information, the preservation of personal historical context is a vital act of cultural heritage. By synchronizing birth dates with the documented progress of science, politics, and the arts, we create a permanent bridge between the individual and the universal story of humanity. Our archive serves as a lasting record of the world as it stood, ensuring that the achievements of previous eras and the lessons of history remain accessible to future generations. This focus on historical continuity and analytical depth provides individuals with a profound sense of place and purpose within the unfolding timeline of human progress."
    },
    {
        id: '8',
        title: "Archival Preservation and Cultural Memory",
        content: "The preservation of personal history is not merely a collection of data points, but a vital contribution to our collective cultural memory. By documenting the specific atmosphere of a birth date—from the prevailing rhythmic compositions to the architectural trends of the period—we ensure that the unique character of each era remains vivid for those who lived it. Our methodology prioritizes the 'Human Perspective,' blending hard historical data with the sensory details that define a generation's identity. This commitment to qualitative depth ensures that every record in our archive is a substantive piece of history, worthy of study and preservation."
    }
];

const DEFAULT_SIDEBAR_TOPICS_EN = [
    { id: 't1', name: "Historical Archives", count: 142 },
    { id: 't2', name: "Cultural Research", count: 98 },
    { id: 't3', name: "Scientific Records", count: 76 },
    { id: 't4', name: "Social Analysis", count: 54 },
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
