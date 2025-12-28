
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
  horoscopeInsights: string[];
  famousBioFragments: string[];
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
  };
}

export const contentPools: Record<string, FragmentPool> = {
  vibe_master: {
    intros: [
      "Imagine opening your eyes for the first time on {date}, {year}. It wasn't just another day on the calendar; it was the very beginning of your unique narrative in a rapidly changing world. The atmosphere outside was electric, buzzing with the specific energy of the {decade}s. Radio stations were constantly playing hits like '{song}', creating a soundtrack for a generation, while society was eagerly embracing new inventions like {tech}. You arrived right in the middle of this amazing timeline, destined to be part of the change.",
      "Your journey began on {date}, {year}, a specific date that history will always remember as a turning point. It was a time when the world looked and felt very distinctive, blending old traditions with new hopes. Think about the fashion of that era: people loved wearing {fashion} as a statement of their identity. Think about the fun: kids were absolutely obsessed with {toy}. You were born into this colorful, chaotic, and beautiful world, destined to be a bridge between the analog past and the digital future.",
      "The calendar marked {date}, {year}, a moment of quiet transformation across the globe. You were the newest arrival in a world that was busy reinventing itself. While adults were discussing serious topics like {economic}, a massive cultural shift was happening in the background with the rise of {vibe}. Your birth year stands as a monumental bridge, connecting the classic era of patience with the modern era of speed that we know today."
    ],
    history: [
      // 1. Tech Focus
      "The year {year} was a pivotal turning point for how people connected. It was the specific era when {tech} began to fundamentally reshape the global landscape. Before this time, communication was slower, but the sudden appearance of technologies like {tech} started to bridge gaps between continents. It was the moment the world started becoming a true 'global village'.",
      // 2. Invention Focus
      "On {date}, {year}, the headlines weren't just about politics; they were about human progress. Society was buzzing with the emergence of {tech}, which was more than just a gadget—it was a symbol of the future. This wasn't just a fleeting trend; it was a revolution that changed how your generation would eventually interact with the world.",
      // 3. Geopolitics Focus
      "Global events in {year} were moving at a breakneck speed. While political maps were being redrawn, a quiet but powerful revolution was happening in technology with the rise of {tech}. This era defined a new way of thinking, where {vibe} became more than just a passing trend—it became a lifestyle.",
      // 4. Transportation/Infrastructure
      "Beyond the digital world, {year} was also a time of physical movement. Cities were expanding, and the way people traveled was evolving. The infrastructure built during this time laid the groundwork for modern urban life. You were born into a world that was literally paving the way for the future.",
      // 5. Medical/Health
      "The year {year} also witnessed strides in well-being and health. While the news focused on {economic}, researchers were quietly making breakthroughs that would extend lives. It was a year of healing and understanding the human body better, setting the stage for the medical miracles we see today.",
      // 6. Educational Context
      "Education and knowledge in {year} were undergoing their own shifts. Schools were beginning to adapt to a changing world, integrating new ideas that would eventually lead to the information age. Growing up, you would see the classroom transform from blackboards to digital screens."
    ],
    lifestyle: [
      // 1. Digital vs Analog
      "Daily life in {year} had a special, tangible flavor. It was simple yet exciting. After school, kids didn't just stare at screens; they actively played with {toy} or spent hours trading collectibles. Weekends were for the mall or the park. It was a time when 'being social' meant actually being in the same room.",
      // 2. Fashion/Food
      "Let's talk about the style of {year}! If you walked down any street, you would see people confidently wearing {fashion}. It was the coolest look of the time. Families also ate differently, with popular treats like {snack} being a staple in every pantry. These sensory details made the {decade}s unique.",
      // 3. Vibe/Music
      "Living through {year} meant experiencing the absolute peak of {vibe}. The streets were filled with the energy of the time, echoing with the sounds of '{song}'. The coolest kids were the ones who owned {toy}. It was an era defined by tangible fun and face-to-face interaction.",
      // 4. Home Life
      "Inside the home, {year} was a time of transition. Living rooms were the center of entertainment, often dominated by the radio or TV playing hits like '{song}'. Family dynamics were shifting, balancing traditional values with the modern rush of {economic}.",
      // 5. Travel/Leisure
      "Vacations and leisure in {year} had a different pace. Without instant booking apps, travel was an adventure planned months in advance. People sought experiences that reflected the {vibe} of the era, creating memories that were captured on film rather than digital clouds.",
      // 6. Community
      "Neighborhoods in {year} felt different. There was a stronger sense of local community. People knew their neighbors, and trends like {fashion} spread through word of mouth and magazines rather than viral feeds. You grew up in a world where connection was personal."
    ],
    science: [
      // 1. Gadgets
      "Science took a giant leap in {year}. It wasn't just about rockets; it was about everyday life. The popularity of {tech} started to grow, finding its way into homes. This invention made life easier. Smart people were making discoveries in {science}, proving humanity was getting smarter.",
      // 2. Innovation/Engineers
      "The year {year} was a playground for inventors. While you were in your crib, engineers were working to launch things like {tech}. These weren't just experiments; they were the first steps toward the modern world. You are a child of this technological revolution.",
      // 3. Future Outlook
      "Innovation was the keyword for {year}. The world saw the rise of {tech}, promising to change how we communicate. Alongside this, breakthroughs in {science} gave people hope. You were born into a world eagerly looking forward, leaving the past behind.",
      // 4. Space/Cosmos
      "Looking up at the stars in {year}, humanity felt smaller yet more ambitious. Discoveries in {science} expanded our understanding of the universe. It was a year where the boundary between science fiction and reality began to blur.",
      // 5. Nature/Biology
      "On a microscopic level, {year} was significant too. Biological research was unraveling the secrets of life itself. These quiet victories in labs contributed to the safety and health of the world you would grow up in.",
      // 6. Computing
      "The digital brain of the world was growing in {year}. Computers were becoming more than just calculators; they were becoming companions. The groundwork for the AI we use today was being laid by the pioneers of {year}."
    ],
    economy: [
      // 1. Market Trends
      "Money and shopping in {year} were an adventure. The economy was driven by {economic}, creating new jobs and products. People were excitedly spending on {vibe}-related items. It was a time of growth, where families felt hopeful about the future.",
      // 2. Consumer Experience
      "In {year}, shopping was physical. There was no instant delivery! People went to stores to buy {fashion} or the latest {toy}. The buzz was all about {economic}. This created a feeling of optimism for your parents.",
      // 3. Work Culture
      " The workplace in {year} was evolving. The concept of a career was shifting influenced by {economic}. Hard work was valued, but new industries were opening doors for creativity and innovation.",
      // 4. Housing/Living Cost
      "For families, {year} presented unique economic choices. The cost of living and the dream of owning a home were central topics. The stability provided by {economic} allowed many to put down roots.",
      // 5. Global Trade
      "International trade in {year} was connecting the world. Products from far away were becoming available, introducing new tastes like {snack} to local markets. You were born into an increasingly interconnected economy.",
      // 6. Technology in Business
      "Business in {year} was starting to embrace speed. The introduction of tools like {tech} in offices began to accelerate productivity, setting the relentless pace of the modern corporate world."
    ],
    culture: [
      // 1. Movies/Music
      "Pop culture in {year} was legendary. Everyone was talking about '{movie}'. It wasn't just a film; it was a moment. And the music! You couldn't escape hearing '{song}'. These masterpieces created the soundtrack of your first year.",
      // 2. Arts/Creativity
      "The arts in {year} reflected a world of color. TV shows and movies like '{movie}' taught people new ways to see the world. It was a golden age for creativity. Even toys like {toy} showed how whimsical designers were becoming.",
      // 3. Celebrity Influence
      "Icons of {year} were larger than life. Musicians and actors defined the {fashion} and {vibe} of the era. They weren't just entertainers; they were cultural leaders who shaped the attitudes of the time.",
      // 4. Literature/Reading
      "Books and magazines in {year} were the primary source of inspiration. Before the internet took over, people turned to the written word to understand trends like {economic} and {science}.",
      // 5. Sports/Competition
      "The competitive spirit of {year} was high. Sports events united nations and communities. Heroes on the field mirrored the resilience of the generation born in this era.",
      // 6. Rebellion/Change
      "Underground culture in {year} was bubbling. While the mainstream loved '{song}', subcultures were experimenting with new sounds and styles that would become the mainstream of the future."
    ],
    analysis: [
      // 1. Adaptability
      "Growing up starting in {year} gave you a superpower: adaptability. Seeing the world change from {tech} to AI taught you to pivot fast. Psychologists say people from your time bridge the gap between hard work and modern speed.",
      // 2. Bridge Builder
      "What makes a person born on {date} special? It is the mix of old values and new visions. You have the patience learned from the era of {economic}, but the curiosity of the future. You are a 'Bridge Builder' generation.",
      // 3. Observer
      "Being born in {year} made you a keen observer. You watched the world transform, giving you a unique perspective on what truly matters. You value authenticity because you saw the rise of the digital facade.",
      // 4. Resilience
      "The events of {year} instilled a deep resilience in you. Navigating the shifts in {economic} and culture made you tough. You know how to weather storms and come out stronger.",
      // 5. Innovator
      "There is an innovator's spirit in you, gifted by the era of {tech}. You aren't afraid of new tools or ideas. You embrace change rather than fear it.",
      // 6. Connector
      "Finally, you are a connector. Born in a time when the world was knitting itself together, you understand the value of relationships. You cherish the human connection found in {vibe}."
    ],
    conclusions: [
      "So, that is the magical story of {date}, {year}. It was a year defined by the fun of {toy}, the style of {fashion}, and the hope of {vibe}. You carry this history in your DNA. You are a living museum of a wonderful time.",
      "Your birthday is more than cake. It is a connection to {year}, when '{song}' played and {tech} was the future. Be proud of your story. You are a unique chapter in the great book of history.",
      "As we look back at {year}, we see the seeds of the person you became. The resilience, the creativity, the style—it all started then. Happy Birthday to a true child of the {decade}s!",
      "The world has changed since {year}, but the spirit of that time lives on in you. Keep the curiosity of {science} and the joy of {vibe} alive in your heart.",
      "From the first cry on {date} to today, your journey has been incredible. You are the legacy of {year}, a testament to a time of great change and great hope.",
      "Never forget the roots of your timeline. {year} was just the start. You have taken the potential of that era and built a life that is uniquely yours."
    ],
    fillers: [
      "This particular event serves as a perfect example of how the {decade}s fundamentally changed the way we live today.",
      "It is truly amazing to look back and see how these seemingly small things, like {snack}, bring back so many vivid memories.",
      "These little details might seem small, but they collectively shaped the personality and outlook of an entire generation.",
      "Looking back, it is clear that these moments were not just trends, but stepping stones to the modern era.",
      "It is fascinating to see how the seeds planted in {year} have grown into the reality we experience now.",
      "These memories serve as a time capsule, preserving the unique flavor and spirit of a bygone era."
    ],
    seoHooks: [
      "Did you know that this specific trend in {year} likely influenced your personality?",
      "Here is why being born in this specific era makes you unique compared to others.",
      "Let's dive deeper into the hidden facts of your birth year {year}.",
      "Understanding this context helps explain why your generation is so distinct.",
      "There is a hidden link between these events and your personal traits.",
      "This historical backdrop provides the perfect stage for your life's story."
    ],
    horoscopeInsights: [
        "The stars on {date} suggest you have a strong will. For example, you don't give up easily.",
        "Your zodiac energy is linked to creativity. You likely enjoy making things or solving problems.",
        "Planetary alignments on this day point towards a natural ability to lead and inspire others.",
        "There is a deep emotional intelligence written in your stars, allowing you to connect well with people.",
        "Your birth chart indicates a destiny filled with unexpected adventures and lucky turns.",
        "Cosmic energy from {year} gifted you with an intuition that rarely fails you."
    ],
    famousBioFragments: [
        "You share this day with true icons. Many leaders and artists were also born in this era.",
        "You are in good company! The list of legends born on {date} includes people who changed the world.",
        "It is said that greatness is shared. Sharing a birthday with these figures is a sign of your own potential.",
        "From the silver screen to the halls of power, your birthday twins have left a mark on history.",
        "Imagine having a birthday party with these legends! You share a cosmic bond with them.",
        "The creative spark that lit up the lives of these famous people also resides in you."
    ],
    thematicTitles: {
      geopolitics: [
        "The Big World Changes of {year}",
        "What Was Happening on {date}?",
        "Global News and Shifts in {year}"
      ],
      socioEconomy: [
        "Money, Jobs, and Shopping in {year}",
        "How People Lived and Worked in the {decade}s",
        "The Business World on Your Birthday"
      ],
      culturalLegacy: [
        "Movies, Music, and Fun in {year}",
        "What Was Cool on {date}?",
        "The Pop Culture of {year}"
      ],
      scientificFrontier: [
        "Inventions That Changed {year}",
        "Science and Tech on {date}",
        "The Coolest Gadgets of {year}"
      ],
      behavioralAnalysis: [
        "Why Your Generation is Special",
        "The Personality of People Born in {year}",
        "What Makes You Unique?"
      ],
      mediaEvolution: [
        "TV, Radio, and News in {year}",
        "How We Connected in {year}",
        "The Media World of {date}"
      ],
      environmentalContext: [
        "Nature and the Planet in {year}",
        "The Environment on {date}",
        "Earth's Story During Your Birth Year"
      ],
      futureVisions: [
        "What People Dreamed of in {year}",
        "Predictions Made on {date}",
        "The Future Seen from the {decade}s"
      ],
      aestheticTrends: [
        "Fashion: What People Wore in {year}",
        "The Look and Style of {date}",
        "Design Trends of the {decade}s"
      ],
      dailyLife: [
        "A Day in the Life in {year}",
        "Everyday Habits on {month} {year}",
        "Fun, Games, and Snacks of {year}"
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
