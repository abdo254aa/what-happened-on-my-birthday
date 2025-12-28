

export interface FragmentPool {
  intros: string[];
  history: string[];
  lifestyle: string[];
  science: string[];
  economy: string[];
  culture: string[];
  analysis: string[];
  conclusions: string[];
  fillers: string[];
  seoHooks: string[];
  psychology: string[];
  career: string[];
  health: string[];
  philosophy: string[];
  horoscopeInsights: string[];
  famousBioFragments: string[];
  futureVisions: string[];
  // Previous Pools
  culinary: string[];
  travel: string[];
  sports: string[];
  // Simple Pools
  gaming: string[];
  school: string[];
  social: string[];
  
  thematicTitles: {
    geopolitics: string[];
    socioEconomy: string[];
    culturalLegacy: string[];
    scientificFrontier: string[];
    behavioralAnalysis: string[];
    mediaEvolution: string[];
    environmentalContext: string[];
    futureVisions: string[];
    aestheticTrends: string[];
    dailyLife: string[];
    psychologicalProfile: string[];
    careerPath: string[];
    culinaryWorld: string[];
    travelHorizons: string[];
    sportsSpirit: string[];
    gamingLife: string[];
    schoolDays: string[];
    socialVibe: string[];
    healthWellness: string[];
    wisdomPhilosophy: string[];
    mysticalVibes: string[];
    // New Titles
    rhythmBeats: string[];
    digitalFootprint: string[];
    cosmicConnections: string[];
  };
}

export const contentPools: Record<string, FragmentPool> = {
  vibe_master: {
    intros: [
      "The precise moment of your arrival on {date}, {year}, marked a unique intersection in the grand tapestry of human history. It wasn't merely a date on a calendar; it was a specific coordinate in time where the old world was gracefully giving way to the new. The global atmosphere was charged with the specific kinetic energy of the {decade}s, a period defined by rapid transformation and bold dreams. As radio waves carried the iconic melodies of '{song}' across continents, and society marveled at the emergence of {tech}, you took your first breath. This report is not just a summary of events; it is a comprehensive, deep-dive archive of the world that welcomed you, exploring how the geopolitical, cultural, and technological currents of that specific day have woven themselves into the very fabric of your existence.",
      "History is often written in broad strokes, but your personal history began with intricate detail on {date}, {year}. To understand who you are, we must understand the world that received you. It was a time of paradox and progress, where traditional values wrestled with the explosive rise of {vibe}. While global markets reacted to {economic}, families sat around dinner tables discussing the latest episodes of '{movie}' and the revolutionary potential of {tech}. You are a child of this complex era, a bridge between the analog depth of the past and the digital speed of the future. This extensive dossier uncovers the hidden variables of your birth date, providing a panoramic view of your personal epoch.",
      "Imagine the world frozen for a split second on {date}, {year}. At that exact moment, the geopolitical landscape was shifting, the cultural zeitgeist was being redefined by {fashion}, and the scientific community was on the brink of breakthroughs in {science}. You entered the stage during this symphony of human endeavor. It was a time when {toy} was more than a plaything—it was a cultural symbol. By analyzing the atmospheric pressure of history on the day you were born, we can unlock insights into your character, your resilience, and your potential. This is the story of the world as it was, and how it shaped the person you have become."
    ],
    history: [
      "The year {year} stands as a monumental pillar in modern history, representing a definitive shift in how humanity organized itself. It was the specific era when {tech} ceased to be a novelty and began to fundamentally restructure the global communication landscape.",
      "Politically, the world on {date} was navigating a delicate balance. While headlines were dominated by {economic}, a more subtle but powerful undercurrent of social change was bubbling beneath the surface, driven by the youth of the {decade}s.",
      "Reflecting on the infrastructure of {year}, we see the laying of the physical and digital foundations that support our modern lives. The rapid urbanization and the deployment of {tech} created a new rhythm of life, faster and more interconnected than ever before.",
      "In the corridors of power during {year}, decisions were being made that would ripple through decades. The focus on {economic} was not just about money; it was about defining the values of a generation that sought stability amidst the whirlwind of {vibe}.",
      "The geopolitical theater of {year} was intense and transformative. Borders were being re-evaluated, and alliances were shifting, all while the common citizen was finding new empowerment through emerging technologies like {tech}.",
      "It is impossible to overstate the importance of {year} in the chronicle of human progress. It was a crucible of innovation where the raw materials of the past were forged into the sleek, efficient realities of the future, influenced heavily by the philosophy of {vibe}.",
      "On a granular level, the events of {date} might have seemed ordinary to those living them, but in hindsight, they were the tremors predicting the seismic shifts of the coming century, particularly in the realm of {science}.",
      "The societal structure of {year} was a fascinating study in adaptation. Communities were learning to integrate the rapid pace of {economic} growth with the slow, steady needs of human connection and family integrity."
    ],
    lifestyle: [
      "Daily existence in {year} possessed a texture and quality that is rare today. It was a tactile world where interactions were face-to-face, and the social fabric was knit together by shared experiences like listening to '{song}' on the radio.",
      "The domestic sphere of the {decade}s was undergoing a revolution. The introduction of new conveniences and the pervasive influence of {tech} meant that the average household on {date} was the most advanced in history up to that point.",
      "Leisure time in {year} was a cherished commodity. Without the constant interruption of modern notifications, people engaged deeply with hobbies, outdoor activities, and the collective obsession with {toy}, creating memories that were vivid and lasting.",
      "Fashion in {year} was more than just clothing; it was a loud declaration of identity. To walk down the street wearing {fashion} was to signal one's alignment with the brave new world of the {decade}s.",
      "The culinary landscape of {year} was also shifting, introducing new flavors and processed wonders like {snack} that would become the comfort foods of a generation, symbolizing the era's love for convenience and novelty.",
      "Navigating the social hierarchy of {year} required knowledge of pop culture. Being aware of the latest plot twist in '{movie}' or owning the newest {tech} was social currency in schools and workplaces alike.",
      "Transportation and travel in {year} had a romantic allure. The journey was as important as the destination, and the world felt slightly larger, filled with mystery and the promise of discovery that defined the spirit of {vibe}.",
      "Community life on {date} was robust. Neighbors knew each other, and the local dynamics were influenced by the economic tides of {economic}, fostering a spirit of mutual reliance and resilience."
    ],
    science: [
      "Scientific inquiry in {year} was pushing the boundaries of the possible. It was a year where science fiction began to bleed into reality, particularly with the public release and adoption of {tech}.",
      "The medical field on {date} was quietly achieving miracles. Research into biology and {science} was extending life expectancy and improving the quality of life, laying the groundwork for the longevity we enjoy today.",
      "Space exploration and our understanding of the cosmos took a leap forward in {year}. The ambition to reach beyond our atmosphere mirrored the earthly ambition to conquer new economic frontiers through {economic}.",
      "The digital revolution was in its incubation phase in {year}. The computing power that we now carry in our pockets was filling entire rooms, yet the logic and code written then is the ancestor of today's AI.",
      "Environmental science was also waking up in {year}. A new consciousness about the planet began to emerge, challenging the industrial might of {economic} and asking hard questions about the legacy we leave behind.",
      "In the laboratories of {year}, engineers were not just building machines; they were crafting the future. The development of {tech} was a signal that humanity was ready to outsource its memory and calculation to silicon.",
      "The philosophy of science in the {decade}s shifted from purely theoretical to intensely practical. It was about applying {science} to solve everyday problems, making life faster, safer, and more efficient.",
      "Looking back at the patents filed in {year}, one sees a roadmap of human ingenuity. Every gadget and breakthrough was a stepping stone toward the hyper-connected world you navigate today."
    ],
    economy: [
      "The economic landscape of {year} was a wild frontier of opportunity and risk. Driven by the engines of {economic}, markets were expanding, and the definition of wealth was being rewritten by bold entrepreneurs.",
      "Consumer confidence on {date} was a key indicator of the national mood. The willingness of families to invest in new homes and luxuries like {tech} signaled a collective hope for a prosperous future.",
      "Workplace dynamics in {year} were rigid yet evolving. The classic 9-to-5 structure was at its peak, but the tools of the trade were changing, with {tech} beginning to replace manual processes.",
      "Global trade in {year} was knitting the world into a tighter web. Products like {toy} and {snack} were not just local hits but global phenomena, proving that culture was becoming an exportable commodity.",
      "The cost of living in {year} allowed for a different kind of dream. The path to stability was clearer, though paved with hard work and the navigating of complex trends in {economic}.",
      "Banking and finance in the {decade}s were undergoing deregulation and digitization. The movement of money became faster, mirroring the faster pace of life introduced by {vibe} and modern transport.",
      "Small businesses in {year} were the backbone of the community. Before the era of mega-corporations, local shops selling {fashion} and {snack} were the social hubs of the neighborhood.",
      "The concept of 'career' was central to the identity of the {year} generation. Ambition was celebrated, and the corporate ladder was a structure that everyone sought to climb."
    ],
    culture: [
      "The cultural output of {year} was staggering in its variety and depth. It was a golden age where cinema, led by masterpieces like '{movie}', challenged audiences to think and feel more deeply.",
      "Music in {year} was the heartbeat of the youth. The airwaves were dominated by '{song}', a track that captured the rebellious yet hopeful spirit of the time, unifying dance floors across the globe.",
      "Art and design in the {decade}s favored the bold. From the architecture of skylines to the graphic design of advertisements for {snack}, everything was screaming for attention and relevance.",
      "Literature and journalism on {date} played a crucial role in interpreting the rapid changes. Writers were trying to make sense of {economic} and {science}, providing a narrative for the confused masses.",
      "The celebrity culture of {year} was iconic. Stars weren't just famous; they were distant gods. Their style, often involving {fashion}, set the trends that would trickle down to every high school in the country.",
      "Subcultures in {year} were vibrant and distinct. Whether you were into {vibe} or the underground tech scene, there was a tribe for you, offering a sense of belonging in a changing world.",
      "Television in {year} was the communal campfire. Families gathered to watch shows that reflected their own lives, albeit a more polished version, reinforcing the societal norms of the {decade}s.",
      "The legacy of {year}'s culture is still felt today. We constantly remix and reboot the movies, songs, and styles of that era because they possessed an authenticity that is timeless."
    ],
    analysis: [
      "Analyzing the cohort born in {year} reveals a fascinating psychological profile. You possess a unique blend of analog patience and digital adaptability, a direct result of the transitional nature of your birth era.",
      "The resilience of your generation is notable. Born during the shifts of {economic}, you learned early on that stability is created, not given. This has made you a pragmatic dreamer.",
      "There is a deep-seated curiosity in those born on {date}. Witnessing the explosion of {science} and {tech} from a young age implanted a lifelong desire to understand how things work.",
      "Sociologists describe the {year} generation as 'The Bridge'. You understand the value of face-to-face connection emphasized in the past, but you wield the tools of the future with expert precision.",
      "Your aesthetic preferences are likely imprinted by the {fashion} and design of your youth. This nostalgia is not a weakness but an anchor, grounding you in a world that often feels ephemeral.",
      "The overarching theme of your life path, influenced by the stars and history of {date}, is one of evolution. You are not afraid to reinvent yourself, just as the world reinvented itself in {year}.",
      "You carry a hidden optimism. Despite the challenges of {year}, the prevailing mood was one of progress. This ingrained hope fuels your ambition and your ability to lead others.",
      "Ultimately, being born in {year} means you are a custodian of history. You hold the memory of what the world was before the total digital takeover, making your perspective invaluable."
    ],
    psychology: [
      "Psychologically, individuals born on {date} exhibit a trait known as 'adaptive resilience'. The rapid changes of {year} wired your brain to accept flux as a natural state, reducing anxiety in times of chaos.",
      "You likely possess a 'dual-consciousness'. You can appreciate the slow, methodical pace of the past while operating at the lightning speed of the current {tech} era.",
      "The emphasis on community in {year} has left you with a high 'social IQ'. You understand group dynamics intuitively, a skill sharpened by the playground politics of the {decade}s.",
      "There is a 'seeker' archetype in your personality. Just as the scientists of {year} sought new frontiers in {science}, you are constantly seeking new knowledge and experiences.",
      "Your emotional baseline is stabilized by the cultural richness of your birth year. The art and music of '{song}' provided a diverse emotional vocabulary that helps you express feelings today."
    ],
    career: [
      "In the professional realm, the energy of {date} suggests a natural aptitude for leadership and strategy. You are capable of seeing the 'long game', a skill reminiscent of the long-term planning seen in {economic} of {year}.",
      "Your birth date aligns with careers that involve communication and mediation. You are the translator between the old guard and the new innovators, much like {year} itself was a translator era.",
      "Fields involving {tech} and innovation are natural habitats for you. However, you bring a human touch to these technical fields, ensuring that progress serves people, not just efficiency.",
      "You thrive in environments that value authenticity. The 'fake' corporate culture clashes with the genuine spirit of {vibe} that you inherited from your birth year.",
      "Entrepreneurship is a strong possibility in your chart. The booming individualism of the {decade}s inspired a do-it-yourself attitude that drives you to build your own empire."
    ],
    health: [
      "Health-wise, the stars and stats of {year} suggest a robust constitution. However, you thrive best when you balance the sedentary nature of modern life with the active outdoor spirit that was common in the {decade}s.",
      "Mental wellness for you is tied to nostalgia and connection. Reconnecting with the music, movies, and comforts of {year} can be a powerful form of therapy and stress relief.",
      "Your generation often faces the challenge of 'digital burnout'. Born on the cusp of the information age, you must consciously unplug to recharge your biological batteries.",
      "Dietary trends from {year} might still influence you. Returning to whole, simple foods—before the era of hyper-processing took over—will likely yield the best energy levels for your body type."
    ],
    philosophy: [
      "Your life philosophy is likely a blend of pragmatism and idealism. You saw {economic} realities, but you also saw the moonshots of {science}. You believe in keeping your feet on the ground and your head in the stars.",
      "The concept of 'legacy' is important to you. You want to leave a mark, just as the inventors of {tech} left a mark on {year}. You are driven by contribution rather than just consumption.",
      "You value truth over comfort. The shifting narratives of {year} taught you to question authority and seek your own answers, making you a freethinker in the truest sense.",
      "Ultimately, your existence proves that change is the only constant. You embrace the flow of time, understanding that every ending, like the end of {year}, is just a new beginning."
    ],
    conclusions: [
      "As we close this extensive dossier on {date}, {year}, one fact remains crystal clear: you are not an accident of history. You are a deliberate creation of a specific time, imbued with the spirit of {vibe} and the resilience of the {decade}s.",
      "Your journey from the crib in {year} to the present day is a microcosm of human progress. You have internalized the lessons of {economic}, {science}, and culture to become a multifaceted individual ready for the future.",
      "Take pride in your timeline. The music of '{song}', the thrill of {tech}, and the style of {fashion} are not just trivia; they are the building blocks of your identity. You are a living monument to a glorious era.",
      "The world has transformed a thousand times since {date}, but the core values implanted in you during {year} remain unshaken. You are the anchor in the storm, the continuity in the chaos.",
      "Happy Birthday to a true icon of the {decade}s. May your future be as bright, bold, and revolutionary as the year {year} was for the history of our planet.",
      "Remember, history is not just what happened; it is what you make of it. You carry the torch of {year}. Hold it high and light the way for the generations to come."
    ],
    fillers: [
      "This particular convergence of events serves as a perfect case study for how the {decade}s fundamentally rewired the human experience.",
      "It is truly profound to look back and observe how these seemingly minor details, like the popularity of {snack}, anchor our collective memory.",
      "These historical footnotes might seem trivial at a glance, but they collectively shaped the cognitive architecture of an entire generation.",
      "Retrospectively, it becomes undeniably clear that these moments were not merely fleeting trends, but the bedrock of the modern era.",
      "It is a fascinating exercise to trace how the seeds of innovation planted in {year} have blossomed into the technological forests we navigate today.",
      "These memories serve as a pristine time capsule, preserving the unique flavor, sound, and spirit of a bygone era for future analysis.",
      "One cannot ignore the ripple effect of these events; they are the invisible threads connecting your personal narrative to the grand arc of history.",
      "The nuance of this period lies in the details—the specific hum of {tech}, the specific cut of {fashion}—that created a unique sensory world.",
      "To ignore these context clues is to miss the larger picture of why you approach the world the way you do.",
      "This backdrop provides more than just setting; it provides the 'why' behind the 'who' of your personality."
    ],
    seoHooks: [
      "But did you know that this specific cultural trend in {year} likely rewired your brain for higher adaptability?",
      "Here is the surprising reason why being born in this specific era grants you a competitive edge in the modern workplace.",
      "Let's peel back another layer and dive deeper into the hidden psychological impacts of your birth year {year}.",
      "Understanding this crucial context helps explain why your generation is distinctively positioned to lead the future.",
      "There is a hidden, almost mystical link between these global events and your personal character traits.",
      "This historical backdrop provides the perfect stage for understanding your life's unique trajectory and potential.",
      "Experts suggest that exposure to this specific environment in {year} is a key predictor of creative success.",
      "This is where the story gets even more interesting, revealing the secret strengths of your birth date.",
      "Few people realize that the events of {date} created a ripple effect that is still influencing your decisions today."
    ],
    horoscopeInsights: [
        "The celestial configuration on {date} suggests an iron will. For example, when faced with adversity, you don't just endure; you evolve.",
        "Your zodiac energy is intrinsically linked to radical creativity. You likely enjoy deconstructing problems to find novel solutions.",
        "Planetary alignments on this specific day point towards a natural, almost magnetic ability to lead and inspire others without trying.",
        "There is a deep, resonant emotional intelligence written in your stars, allowing you to navigate complex social webs with ease.",
        "Your birth chart indicates a destiny filled with serendipity—unexpected adventures and lucky turns that seem to defy logic.",
        "Cosmic energy from the era of {year} gifted you with a gut intuition that acts as a flawless internal compass.",
        "The stars suggest a duality in your nature: the capacity for profound solitary thought and the charisma to command a room."
    ],
    famousBioFragments: [
        "You share this specific rotation of the earth with true titans of industry and art. Many world leaders were forged in the same stardust.",
        "You are in exceptional company! The roster of legends born on {date} includes visionaries who rewrote the rules of their respective fields.",
        "It is often said that greatness is a collective frequency. Sharing a birthday with these figures is a cosmic nod to your own latent potential.",
        "From the silver screen to the halls of high office, your birthday twins have left an indelible mark on the fabric of reality.",
        "Imagine a dinner party with these legends! You share a cosmic, energetic bond with them that transcends time and space.",
        "The same creative spark that illuminated the lives of these famous individuals also resides, waiting to be fanned into a flame, within you."
    ],
    futureVisions: [
        "In {year}, the concept of the future was filled with flying cars and space colonies. The optimism was palpable.",
        "Predictions made on {date} about the 21st century were often wild, yet some, like the internet, came true in ways no one expected.",
        "The youth of {year} looked ahead with a mixture of excitement and anxiety about the rapid pace of {tech}.",
        "Science fiction in the {decade}s was a blueprint for tomorrow. Authors dreamed of AI and connectivity that we now live with daily.",
        "The environmental movements of {year} were the first to seriously question what kind of planet we would leave for the future.",
        "Space exploration in {year} wasn't just about the moon; it was about imagining humanity as a multi-planetary species.",
        "The educational reforms of the {decade}s were designed to prepare children for a high-tech future that was just over the horizon.",
        "Looking back, the vision of the future held in {year} tells us as much about their hopes as it does about their technological reality."
    ],
    culinary: [
        "The culinary landscape of {year} was a fascinating mix of tradition and the rising tide of convenience foods like {snack}.",
        "Family dinners in the {decade}s were sacred rituals, often featuring recipes passed down through generations before the fast-food boom.",
        "The introduction of new international flavors in {year} marked a shift in the national palate, making dining a more adventurous experience.",
        "Grocery stores in {year} were beginning to stock items that would become staples, reflecting the economic prosperity of {economic}.",
        "Looking back at the menus of {year}, one sees a simpler time where ingredients were often locally sourced by necessity.",
        "The snack culture of the {decade}s, dominated by {snack}, defined the childhood memories of an entire generation.",
        "Cooking in {year} was an act of love, often taking hours, contrasting sharply with today's microwave culture.",
        "The diet of {year} was robust, fueling a generation that spent much of their time playing outdoors."
    ],
    travel: [
        "Travel in {year} was an event, not just a commute. The journey itself was imbued with a sense of wonder and discovery.",
        "Road trips in the {decade}s were the quintessential family adventure, with maps unfolding across dashboards instead of GPS screens.",
        "The aviation industry in {year} was glamorous, making the world feel simultaneously larger and more accessible.",
        "Vacations on {date} were often simple retreats to nature, reflecting a desire to disconnect from the growing noise of {tech}.",
        "Exploration was a key theme of {year}, whether it was exploring the neighborhood on a bike or dreaming of space travel.",
        "The borders in {year} were different, and crossing them required a spirit of adventure that defined the {decade}s.",
        "Public transport in {year} was the heartbeat of the city, a place where all walks of life intersected daily.",
        "The concept of a 'global village' was just beginning to take shape in {year}, fueled by faster jets and cultural exchange."
    ],
    sports: [
        "The sporting world of {year} was filled with gritty legends who played for the love of the game rather than just endorsements.",
        "Stadiums on {date} roared with a raw energy that is hard to replicate in today's sanitized arenas.",
        "The {decade}s saw the rise of global sporting icons who transcended their games to become cultural symbols of {vibe}.",
        "Physical education in {year} was rigorous, emphasizing discipline and teamwork that would serve your generation well in life.",
        "The Olympics and championships of {year} were not just games; they were geopolitical stages where the drama of {economic} played out.",
        "Backyard sports were the proving grounds for the youth of {year}, teaching resilience and fair play without referees.",
        "The equipment used in {year} was basic compared to today's {tech}, requiring true skill and raw talent to master.",
        "Fitness trends in the {decade}s were beginning to emerge, laying the groundwork for the modern wellness industry."
    ],
    gaming: [
        "For kids in {year}, fun was often about simple pleasures. Whether it was playing with {toy} or inventing new street games, imagination was key.",
        "Video games were evolving fast in the {decade}s. Screens were pixelated, but the joy of beating a high score was real.",
        "Board games on rainy days were a staple of {year}. It was how friends bonded before the internet took over.",
        "Playgrounds in {year} were social hubs. You made friends by sharing your {toy} or joining a game of tag.",
        "The arcade culture of the {decade}s was legendary. The sounds of tokens and digital beeps defined the weekends.",
        "Simple card games and puzzles were enough to keep people entertained for hours in {year}.",
        "Collecting items, from stickers to {toy}, was a serious hobby for kids born in {year}.",
        "The definition of 'fun' in {year} was physical. You had to move, run, and interact to play."
    ],
    school: [
        "School in {year} was different. Textbooks were heavy, and the chalkboard was the center of the classroom.",
        "Teachers in the {decade}s were strict but caring figures who shaped the minds of the future generation.",
        "Recess was the best part of the day in {year}. It was freedom, noise, and the thrill of the playground.",
        "Homework was done with pen and paper. There was no Google to help you in {year}, only the library.",
        "School lunches in {year} had a distinct taste. Everyone remembers the cafeteria pizza or the special treat days.",
        "Field trips in the {decade}s were rare adventures. Leaving the school building felt like a journey to another world.",
        "Friendships made in school during {year} were built on shared secrets and notes passed in class.",
        "The school bag of {year} was a survival kit, packed with {snack}, books, and maybe a hidden {toy}."
    ],
    social: [
        "Social life in {year} happened face-to-face. You knocked on doors instead of sending texts.",
        "A phone call in {year} meant sitting in the hallway, tethered to the wall by a cord, whispering so parents wouldn't hear.",
        "Writing letters was an art form in the {decade}s. Waiting for the mail was a daily excitement.",
        "Parties in {year} were simple gatherings with good music, {snack}, and plenty of dancing.",
        "Community events brought everyone together. In {year}, you knew your neighbors' names and their stories.",
        "Dating in the {decade}s had a slower pace. It was about shared moments, movies, and long walks.",
        "Family reunions in {year} were loud and crowded. It was where you learned your history and met distant cousins.",
        "Friendship bracelets and shared mixtapes were the ultimate signs of loyalty in {year}."
    ],
    thematicTitles: {
      geopolitics: [
        "The Geopolitical Chessboard of {year}: A World in Flux",
        "Seismic Shifts: What Was Truly Happening on {date}?",
        "Global Power Dynamics and the State of the World in {year}"
      ],
      socioEconomy: [
        "The Economic Engine: Money, Markets, and Ambition in {year}",
        "The Hustle: How People Lived, Worked, and Dreamed in the {decade}s",
        "Financial Tides: The Business World That Welcomed You"
      ],
      culturalLegacy: [
        "The Cultural Renaissance: Cinema, Sound, and Soul in {year}",
        "Zeitgeist Defined: What Was Truly 'Cool' on {date}?",
        "The Pop Culture Explosion: Icons of {year}"
      ],
      scientificFrontier: [
        "The Age of Innovation: Inventions That Rewrote {year}",
        "The Digital Dawn: Science and Tech Milestones on {date}",
        "Silicon Dreams: The Coolest Gadgets and Breakthroughs of {year}"
      ],
      behavioralAnalysis: [
        "The Generational Blueprint: Why You Are Unique",
        "Psychological Profiling: The Personality of the {year} Cohort",
        "The 'Why' Behind You: A Deep Behavioral Analysis"
      ],
      mediaEvolution: [
        "The Information Age: TV, Radio, and the News of {year}",
        "Connecting the Dots: How Communication Evolved in {year}",
        "The Media Landscape on the Morning of {date}"
      ],
      environmentalContext: [
        "Planet Earth: Environmental Consciousness in {year}",
        "The Natural World: Climate and Geography on {date}",
        "Mother Nature's Story During Your Birth Year"
      ],
      futureVisions: [
        "Yesterday's Tomorrow: What People Dreamed of in {year}",
        "Prophecies and Predictions Made on {date}",
        "Retro-Futurism: The Future Seen from the {decade}s"
      ],
      aestheticTrends: [
        "The Visual Language: Fashion and Design in {year}",
        "Style Files: The Look, The Feel, and The Vibe of {date}",
        "Aesthetic Revolution: Design Trends of the {decade}s"
      ],
      dailyLife: [
        "A Day in the Life: The Human Experience in {year}",
        "Routine and Ritual: Everyday Habits on {month} {year}",
        "The Analog World: Fun, Games, and Snacks of {year}"
      ],
      psychologicalProfile: [
        "Inside the Mind: The Cognitive Traits of {date} Borns",
        "Emotional Intelligence and the Spirit of {year}",
        "Your Hidden Superpowers: A Psychological Breakdown"
      ],
      careerPath: [
        "Professional Destiny: Career Paths for the {year} Native",
        "Leadership and Legacy: Your Work Archetype",
        "Success Blueprints: How {date} Influences Ambition"
      ],
      culinaryWorld: [
        "The Flavor of the Era: What People Ate in {year}",
        "Comfort Foods and Dining Trends of the {decade}s",
        "From Farm to Table: The Culinary Landscape of {date}"
      ],
      travelHorizons: [
        "Wanderlust in {year}: How the World Traveled",
        "Journeys and Destinations: The Spirit of Exploration in {year}",
        "The Golden Age of Travel: Moving Through the {decade}s"
      ],
      sportsSpirit: [
        "Champions and Challengers: The Sporting Spirit of {year}",
        "The Arena of Life: Games and Glory in the {decade}s",
        "Physical Culture and Competitive Drive on {date}"
      ],
      gamingLife: [
        "Playtime in {year}: Games and Fun",
        "How We Played: Toys and Games of the {decade}s",
        "The Joy of Play: Entertainment in {year}"
      ],
      schoolDays: [
        "Classroom Chronicles: School Life in {year}",
        "The Sound of the Bell: Education in the {decade}s",
        "Learning and Growing: The Student Experience of {year}"
      ],
      socialVibe: [
        "Connecting People: Social Life in {year}",
        "Friends and Family: The Social Fabric of the {decade}s",
        "The Art of Conversation: How We Met in {year}"
      ],
      healthWellness: [
        "Body and Mind: Health Trends of {year}",
        "Wellness and Vitality in the {decade}s",
        "The Fitness Revolution of Your Birth Year"
      ],
      wisdomPhilosophy: [
        "The Wisdom of {year}: What People Believed",
        "Philosophical Currents and Thoughts on {date}",
        "Life Lessons from the {decade}s"
      ],
      mysticalVibes: [
        "Cosmic Secrets: The Mystical Energy of {date}",
        "Written in the Stars: The Spiritual Vibe of {year}",
        "The Hidden Magic of Your Birth Date"
      ],
      // New thematic titles
      rhythmBeats: [
        "The Rhythm of {year}: Beats that Moved the World",
        "Sonic Landscapes: The Sound of {decade}s",
        "Musical Vibrations on the Day You Were Born"
      ],
      digitalFootprint: [
        "The Digital Frontier in {year}",
        "Bits and Bytes: The Tech World of {date}",
        "Connectivity and The Early Internet of {decade}s"
      ],
      cosmicConnections: [
        "Universal Alignment: The Cosmos on {date}",
        "Star Dust and Destiny: Astronomy in {year}",
        "The View from Space on Your Birthday"
      ]
    }
  }
};

export const decadeFacts: Record<string, any> = {
  "1950": { 
    song: ["Rock Around the Clock", "Jailhouse Rock", "That's Amore"], 
    movie: ["Singin' in the Rain", "Cinderella", "Vertigo"], 
    tech: ["Color TV", "Transistor Radios", "The First Credit Card"], 
    vibe: ["Rock 'n' Roll", "Suburban Life", "Post-War Hope"], 
    economic: ["The Golden Age", "New Car Culture", "Home Ownership"], 
    science: ["DNA Discovery", "Space Satellites", "Polio Vaccine"],
    fashion: ["Poodle Skirts", "Leather Jackets", "Saddle Shoes"], 
    toy: ["Hula Hoops", "Barbie Dolls", "Play-Doh"], 
    snack: ["TV Dinners", "Peanut M&Ms", "Eggo Waffles"]
  },
  "1960": { 
    song: ["Hey Jude", "Respect", "Good Vibrations"], 
    movie: ["The Sound of Music", "Psycho", "Mary Poppins"], 
    tech: ["Audio Cassettes", "Satellite TV", "The Computer Mouse"], 
    vibe: ["Peace & Love", "Flower Power", "Rebellion"], 
    economic: ["The Space Race Spending", "Advertising Boom", "Youth Market"], 
    science: ["Moon Landing", "Lasers", "Heart Transplants"],
    fashion: ["Tie-Dye Shirts", "Miniskirts", "Bell-Bottoms"], 
    toy: ["Etch A Sketch", "G.I. Joe", "Hot Wheels"], 
    snack: ["Pop-Tarts", "Doritos", "Pringles"]
  },
  "1970": { 
    song: ["Dancing Queen", "Imagine", "Bohemian Rhapsody"], 
    movie: ["Star Wars", "Jaws", "The Godfather"], 
    tech: ["The First Mobile Phone", "Digital Watches", "Digital Cameras"], 
    vibe: ["Disco Fever", "Freedom", "Self-Expression"], 
    economic: ["Oil Crisis", "Global Trade", "Tech Startups"], 
    science: ["MRI Scans", "Fiber Optics", "Voyager Probes"],
    fashion: ["Platform Shoes", "Leisure Suits", "Wrap Dresses"], 
    toy: ["Rubik's Cube", "Pet Rocks", "Connect 4"], 
    snack: ["Fondue", "Reese's Pieces", "Pop Rocks"]
  },
  "1980": { 
    song: ["Billie Jean", "Like a Virgin", "Sweet Child O' Mine"], 
    movie: ["E.T.", "Back to the Future", "Ghostbusters"], 
    tech: ["The Personal Computer", "The Internet Protocols", "Graphical Interfaces"], 
    vibe: ["Neon Energy", "Pop Culture Explosion", "Big Hair"], 
    economic: ["Wall Street Boom", "Mall Culture", "Video Game Market"], 
    science: ["Space Shuttle", "DNA Fingerprinting", "Hubble Telescope"],
    fashion: ["Leg Warmers", "Shoulder Pads", "Acid Wash Jeans"], 
    toy: ["Cabbage Patch Kids", "Transformers", "Koosh Balls"], 
    snack: ["Cool Ranch Doritos", "Fruit Roll-Ups", "Diet Coke"]
  },
  "1990": { 
    song: ["Smells Like Teen Spirit", "Wannabe", "I Will Always Love You"], 
    movie: ["Titanic", "The Lion King", "Jurassic Park"], 
    tech: ["The World Wide Web", "Digital Messaging", "Online Search Engines"], 
    vibe: ["Girl Power", "Digital Dawn", "Grunge Cool"], 
    economic: ["Dot-Com Boom", "Globalization", "Coffee Shop Culture"], 
    science: ["Cloning (Dolly)", "Mars Pathfinder", "ISS Launch"],
    fashion: ["Flannel Shirts", "Baggy Jeans", "Chokers"], 
    toy: ["Tamagotchi", "Pogs", "Furby"], 
    snack: ["Pizza Lunchables", "Dunkaroos", "Warheads"]
  },
  "2000": { 
    song: ["Crazy in Love", "Hey Ya!", "Umbrella"], 
    movie: ["Harry Potter", "The Lord of the Rings", "Avatar"], 
    tech: ["Social Networking Sites", "Smartphones", "Online Video Streaming"], 
    vibe: ["Y2K Future", "Reality TV", "Global Connectivity"], 
    economic: ["The App Economy", "Online Shopping", "Startups"], 
    science: ["Human Genome", "Mars Rovers", "Pluto Downgrade"],
    fashion: ["Low-Rise Jeans", "Velour Tracksuits", "Trucker Hats"], 
    toy: ["Razor Scooters", "Bratz Dolls", "Wii Sports"], 
    snack: ["Fruit Gushers", "Energy Drinks", "Cupcakes"]
  },
  "2010": { 
    song: ["Happy", "Rolling in the Deep", "Despacito"], 
    movie: ["Frozen", "The Avengers", "Inception"], 
    tech: ["Photo Sharing Apps", "Instant Messaging", "Tablet Computers"], 
    vibe: ["Viral Videos", "Streaming Era", "Influencers"], 
    economic: ["Gig Economy", "Digital Marketplaces", "Crypto"], 
    science: ["Higgs Boson", "SpaceX Landings", "CRISPR"],
    fashion: ["Skinny Jeans", "Athleisure", "Hipster Style"], 
    toy: ["Fidget Spinners", "Collectibles", "Minecraft"], 
    snack: ["Avocado Toast", "Cronuts", "Coconut Water"]
  },
  "2020": { 
    song: ["Blinding Lights", "Drivers License", "Anti-Hero"], 
    movie: ["Spider-Man: No Way Home", "Dune", "Barbie"], 
    tech: ["Short-Form Video Apps", "5G Connectivity", "Generative AI"], 
    vibe: ["Remote Life", "Resilience", "Digital Nomads"], 
    economic: ["Work From Home", "Creator Economy", "AI Boom"], 
    science: ["mRNA Vaccines", "JWST Images", "Fusion Energy"],
    fashion: ["Face Masks", "Oversized Hoodies", "Comfort Wear"], 
    toy: ["Viral Trends", "Squishmallows", "Digital Pets"], 
    snack: ["Sourdough Bread", "Whipped Coffee", "Plant-Based Meat"]
  }
};
