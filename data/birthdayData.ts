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
  culinary: string[];
  travel: string[];
  sports: string[];
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
    rhythmBeats: string[];
    digitalFootprint: string[];
    cosmicConnections: string[];
  };
}

export interface MonthlyArchiveInfo {
  seasonNote: string;
  astronomyFact: string;
  biologicalFact: string;
  calendarHistory: string;
  notableBirthsSummary: string;
  historicalPattern: string;
}

export const monthlyArchives: Record<number, MonthlyArchiveInfo> = {
  1: {
    seasonNote: "Deep winter in the Northern Hemisphere and peak summer in the Southern Hemisphere",
    astronomyFact: "Earth reaches perihelion—its closest orbital point to the Sun (about 147.1 million km)—in early January, meaning Earth actually travels fastest in its orbit during this month (~30.3 km/s).",
    biologicalFact: "Studies on birth months show that January-born children are often among the older students in calendar-year school cohorts, while experiencing shorter winter daylight hours during early infancy.",
    calendarHistory: "Named after Janus, the Roman symbol of beginnings and transitions; January was added to the Roman calendar around 700 BCE when the year was expanded from 10 to 12 months.",
    notableBirthsSummary: "Isaac Newton, Martin Luther King Jr., Stephen Hawking, Muhammad Ali, Wolfgang Amadeus Mozart, and Virginia Woolf",
    historicalPattern: "Historically a month of legislative openings, inaugurations, and fiscal year resets across major economies."
  },
  2: {
    seasonNote: "Late winter in the north, marked by gradually lengthening daylight of roughly 2 to 3 minutes per day at mid-latitudes",
    astronomyFact: "Because Earth's orbit is elliptical, February is the shortest calendar month (28 days, or 29 in leap years divisible by 4) to keep the calendar synchronized with the 365.2422-day solar year.",
    biologicalFact: "Epidemiological data indicates people born in late winter had mothers whose third trimester occurred during low-sunlight months, making vitamin D and winter nutrition historically significant factors.",
    calendarHistory: "Derived from the Latin 'februum' (purification); it remained the final month of the Roman year until 450 BCE.",
    notableBirthsSummary: "Charles Darwin, Abraham Lincoln, Galileo Galilei, Rosa Parks, Thomas Edison, and Nina Simone",
    historicalPattern: "Frequently associated with pivotal diplomatic conferences, winter Olympic competitions, and major scientific publications."
  },
  3: {
    seasonNote: "The vernal (spring) equinox occurs around March 20, when day and night are nearly equal (12 hours each) across the globe",
    astronomyFact: "In March, the Sun crosses the celestial equator moving northward, shifting solar heating toward the Northern Hemisphere.",
    biologicalFact: "As daylight increases in March, human circadian rhythms naturally shift toward earlier waking times and higher serotonin production after winter.",
    calendarHistory: "Originally the first month of the early Roman calendar (Martius), which is why September through December were named after the 7th, 8th, 9th, and 10th months.",
    notableBirthsSummary: "Albert Einstein, Vincent van Gogh, Johann Sebastian Bach, Gabriel García Márquez, and Aretha Franklin",
    historicalPattern: "Historically a period when agricultural planting resumed, shipping lanes reopened after winter freezes, and major economic quarters concluded."
  },
  4: {
    seasonNote: "Mid-spring in the Northern Hemisphere and mid-autumn in the Southern Hemisphere, characterized by rapid temperature transitions",
    astronomyFact: "The Lyrid meteor shower peaks in late April, produced by dust particles left behind by Comet C/1861 G1 Thatcher.",
    biologicalFact: "In temperate climates, April coincides with peak tree pollen release and rapid plant growth, historically improving fresh food availability after winter rationing.",
    calendarHistory: "From the Latin 'aperire' (to open), referring to the opening of buds and blossoms in spring.",
    notableBirthsSummary: "Leonardo da Vinci, William Shakespeare, Charlie Chaplin, Maya Angelou, Marcus Aurelius, and Jane Goodall",
    historicalPattern: "Many major spaceflight milestones—including the first human spaceflight (Yuri Gagarin, April 1961) and the Apollo 13 mission—took place in April."
  },
  5: {
    seasonNote: "Late spring leading into early summer, with long daylight hours exceeding 14 hours per day in mid-northern latitudes",
    astronomyFact: "The Eta Aquariid meteor shower, originating from Halley's Comet debris, is visible in early May skies.",
    biologicalFact: "Research in developmental biology notes that infants born in late spring experience warm outdoor temperatures during their first six months, encouraging earlier outdoor mobility.",
    calendarHistory: "Named after Maia, an ancient Italic earth goddess of growth; May 1st has served for centuries as both a seasonal festival and International Workers' Day.",
    notableBirthsSummary: "Florence Nightingale, Richard Feynman, Audrey Hepburn, Bob Dylan, Karl Marx, and Rachel Carson",
    historicalPattern: "Historically linked to major industrial exhibitions, aviation crossings (such as Lindbergh's 1927 transatlantic flight), and end-of-term academic milestones."
  },
  6: {
    seasonNote: "Contains the June solstice (around June 21), the longest daylight period of the year north of the equator and the shortest south of it",
    astronomyFact: "During the June solstice, the Northern Hemisphere is tilted at its maximum 23.44-degree angle toward the Sun.",
    biologicalFact: "Children born in June are near the middle of the calendar year but among the younger students in September-cutoff school systems, which researchers study for early classroom pacing.",
    calendarHistory: "Traditionally linked to Juno or the Latin 'iuniores' (younger people, contrasted with 'maiores' for May).",
    notableBirthsSummary: "Alan Turing, George Orwell, Frida Kahlo, Nikola Tesla (Old Style/New Style transition), Paul McCartney, and Helen Keller",
    historicalPattern: "A pivotal month in modern history, marking events from the signing of Magna Carta (1215) and D-Day (1944) to the end of the second financial quarter."
  },
  7: {
    seasonNote: "Peak summer in the Northern Hemisphere, despite Earth actually being at its farthest point from the Sun",
    astronomyFact: "In early July, Earth reaches aphelion—about 152.1 million km from the Sun (5 million km farther than in January), proving seasons are caused by axial tilt rather than distance.",
    biologicalFact: "High summer sunlight levels during July births correlate with peak natural vitamin D synthesis, though historic pre-air-conditioning eras required careful heat management.",
    calendarHistory: "Originally called Quintilis ('fifth month' in the old Roman calendar), it was renamed July in 44 BCE in honor of Julius Caesar, who introduced the Julian leap-year system.",
    notableBirthsSummary: "Nelson Mandela, Nikola Tesla, Ernest Hemingway, Malala Yousafzai, Franz Kafka, and Rosalind Franklin",
    historicalPattern: "Marked by major constitutional and independence milestones, as well as the Apollo 11 Moon landing (July 20, 1969)."
  },
  8: {
    seasonNote: "Late summer in the north, historically the primary harvest month for grain crops across Europe, Asia, and North America",
    astronomyFact: "The Perseid meteor shower peaks in mid-August as Earth passes through the debris stream of Comet Swift-Tuttle.",
    biologicalFact: "Late-summer August birthdays arrive during golden, sun-drenched days just before the crisp breeze of autumn begins.",
    calendarHistory: "Originally called Sextilis ('sixth month'), renamed August in 8 BCE during the reign of Emperor Augustus.",
    notableBirthsSummary: "Neil Armstrong, Marie-Anne Paulze Lavoisier, Warren Buffett, Usain Bolt, James Baldwin, and Mary Shelley",
    historicalPattern: "Historically a month of major geopolitical turning points, summer harvest markets, and annual industrial holidays across Europe."
  },
  9: {
    seasonNote: "The autumnal equinox occurs around September 22–23, marking the astronomical transition into autumn in the north and spring in the south",
    astronomyFact: "Around the September equinox, the Sun rises due east and sets due west everywhere on Earth except the exact poles.",
    biologicalFact: "Because most school years and youth sports leagues use a September 1st cutoff, children born in September are statistically the oldest in their class, which often gives them an early physical and maturity edge in primary school.",
    calendarHistory: "From the Latin 'septem' (seven), preserving its original position as the seventh month of the ten-month Roman calendar.",
    notableBirthsSummary: "Agatha Christie, Leo Tolstoy, Michael Faraday, Queen Elizabeth I, Serena Williams, and F. Scott Fitzgerald",
    historicalPattern: "Globally recognized as the start of the academic year, major publishing seasons, and UN General Assembly sessions."
  },
  10: {
    seasonNote: "Mid-autumn in the Northern Hemisphere, marked by rapidly cooling nights and deciduous leaf color changes as chlorophyll breaks down",
    astronomyFact: "The Orionid meteor shower appears in October, representing the second annual pass through Halley's Comet dust trails.",
    biologicalFact: "Demographic records in many countries show late September and October have some of the highest daily birth rates of the entire calendar year.",
    calendarHistory: "From 'octo' (eight); October has retained 31 days continuously since the Julian calendar reform of 45 BCE.",
    notableBirthsSummary: "Marie-Sophie Germain, Mahatma Gandhi, Pablo Picasso, John Lennon, Eleanor Roosevelt, and Pelé",
    historicalPattern: "Historically associated with major financial market shifts (1929 and 1987), the launch of Sputnik 1 (1957), and the Nobel Prize announcements."
  },
  11: {
    seasonNote: "Late autumn transitioning to winter in the north, when daylight drops below 10 hours per day in mid-latitudes",
    astronomyFact: "The Leonid meteor shower peaks in mid-November, historically producing some of the most intense meteor storms on record (such as in 1833 and 1966).",
    biologicalFact: "Large-scale longevity and public health studies have noted that autumn-born cohorts historically benefited from plentiful harvest nutrition during late pregnancy and low summer infection rates.",
    calendarHistory: "From 'novem' (nine) in Latin; marks the transition from the agricultural harvest season into winter storage.",
    notableBirthsSummary: "Marie Curie, Carl Sagan, Mark Twain, Winston Churchill, Fyodor Dostoevsky, and Bruce Lee",
    historicalPattern: "Connected to major historical armistices (1918), the fall of the Berlin Wall (1989), and national elections."
  },
  12: {
    seasonNote: "Contains the December solstice (around December 21), the shortest day of the year in the north and longest in the south",
    astronomyFact: "The Geminid meteor shower in mid-December is unique because it originates from a rocky asteroid (3200 Phaethon) rather than an icy comet.",
    biologicalFact: "December babies often experience their birthday alongside major end-of-year holidays, which psychologists note makes setting aside a separate, dedicated celebration especially meaningful for kids.",
    calendarHistory: "From 'decem' (ten); marks the final month of the Gregorian calendar used internationally since 1582.",
    notableBirthsSummary: "Ada Lovelace, Louis Pasteur, Ludwig van Beethoven, Emily Dickinson, Denzel Washington, and Clara Barton",
    historicalPattern: "Defined by year-end economic tallies, Nobel Prize ceremonies (December 10), and the Wright brothers' first powered flight (December 17, 1903)."
  }
};

export const contentPools: Record<string, FragmentPool> = {
  vibe_master: {
    intros: [
      "Instead of vague compliments or exaggerated claims, let's look at the actual historical record for {date}, {year}. At the time, global population stood near {population}, a gallon of fuel cost around {gasPrice}, and a typical household was navigating {economic}. On the radio, stations were playing '{song}', cinemas were screening '{movie}', and everyday technology meant using {tech}. Here is a clear, factual breakdown of what life really looked like when your timeline began.",
      "Every birth date sits inside a very specific economic and technological reality. On {date}, {year}, people were not living in a nostalgic postcard—they were dealing with the practical realities of the {decade}s. Average home prices hovered around {homePrice}, {tech} was changing how offices and households operated, and researchers were focused on {science}. This archive examines the concrete events, prices, daily habits, and generational traits tied to {date}, {year}.",
      "If you strip away the clichés usually written about birthdays, {date}, {year} tells a fascinating, grounded story. It was an era shaped by {vibe} and {economic}, when a movie ticket for '{movie}' cost about {ticketPrice} and daily communication relied on {techSpec}. Below is a realistic look at the world you entered, how that environment shaped people of your generation, and what makes this date historically distinct."
    ],
    history: [
      "In {year}, major news coverage centered on {headline}. Rather than abstract history, these events directly affected government budgets, military service, trade tariffs, and the price of everyday goods in local stores.",
      "Public policy during the {decade}s was heavily driven by {economic}. Around {date}, lawmakers and citizens were debating practical questions: job security, inflation, energy supplies, and how fast {tech} should be integrated into public infrastructure.",
      "Look at a newspaper from {date}, {year}, and you will notice how differently information moved. With global population around {population}, international news arrived via {techSpec}, giving people a slower, more digested view of world events compared to 24/7 mobile feeds.",
      "The geopolitical landscape of {year} was defined by {headline}. For ordinary families, this wasn't just politics on television—it influenced interest rates, fuel costs ({gasPrice} per gallon), and which industries were hiring.",
      "Infrastructure projects in the {decade}s focused on practical expansion: upgrading power grids, expanding transport networks, and integrating early {science} into manufacturing and public services.",
      "Historians studying {year} point out a clear tension: while consumer products like {tech} promised convenience, workers and small businesses had to adapt quickly to the shifting demands of {economic}."
    ],
    lifestyle: [
      "Daily routines in {year} had built-in pauses that barely exist today. Without smartphones following people into every room, leaving the house meant you were unreachable until you got to a landline or arrived at your destination.",
      "Consider how a typical evening looked around {date}, {year}: families gathered in the living room with {snack}, tuned into scheduled broadcasts or listened to '{song}', and read printed newspapers or magazines for detailed coverage.",
      "Shopping and errands in the {decade}s required physical trips. Whether buying {fashion} at a local department store or picking up {toy}, people paid primarily with cash or paper checks and compared prices in person.",
      "Household budgets in {year} had a very different structure. With a median home costing roughly {homePrice} and a movie ticket around {ticketPrice}, fixed living costs vs. discretionary gadgets looked nothing like today's subscription-heavy budgets.",
      "Photographs from {date}, {year} were scarce and deliberate. Most people shot on film or early media ({techSpec}), meaning you didn't take 50 shots of the same moment—you took one photo and waited to see how it turned out.",
      "Free time in the {decade}s was largely neighborhood-based. Boredom was a normal part of the afternoon, which pushed kids and adults alike to fix things in the garage, visit neighbors unannounced, or spend hours with {toy}."
    ],
    science: [
      "Scientific progress in {year} was driven by hard engineering rather than marketing buzzwords. Teams working on {science} had to work within the technical limits of the era: {techSpec}.",
      "When {tech} was introduced during the {decade}s, it solved real bottlenecks in calculation, communication, and record-keeping—even though early versions were expensive, bulky, and required patience to operate.",
      "Medical care around {date}, {year} relied on breakthroughs in {medicalFact}. Doctors spent more time on physical exams and patient history, as many automated diagnostic scans were either brand-new or still confined to major research hospitals.",
      "Environmental and earth sciences in {year} were gathering critical baseline data. Researchers used satellite observations and field stations to measure industrial emissions, ozone levels, and urban growth linked to {economic}.",
      "The tools used by engineers in {year}—built around {techSpec}—taught a disciplined way of working: because computing memory and lab equipment were limited, mistakes were costly, so people double-checked their math before running a test.",
      "Looking back at {science} in {year} shows how long real innovation takes: the laboratory experiments of the {decade}s took 15 to 20 years of refinement to become the everyday technology we use without thinking today."
    ],
    economy: [
      "Let's look at the actual numbers for the {decade}s: a typical annual household income was around {income}, a loaf of bread cost roughly {breadPrice}, and a gallon of fuel was {gasPrice}. Those figures show both the lower nominal prices and the tighter material margins of {year}.",
      "The job market in {year} was shaped by {economic}. Unlike today's algorithmic hiring portals, finding work often meant checking classified ads in the newspaper, walking into businesses in person, or relying on local trade networks.",
      "Consumer credit and banking in the {decade}s operated on paper trails and branch hours. If you needed cash or a bank transfer on a Friday afternoon in {year}, you often had to wait until Monday morning.",
      "Manufacturing and retail in {year} balanced durability with mass production. While items like {tech} represented a major household purchase, appliances and furniture were generally expected to be repaired rather than replaced every two years.",
      "Economic anxiety in {year} was real and specific: families worried about {economic}, rising costs of education or healthcare, and whether traditional trades would survive automation and global competition.",
      "Growing up around the economic climate of {year} left a lasting mark on how people view money—teaching a practical suspicion of 'get-rich-quick' schemes and a preference for tangible assets."
    ],
    culture: [
      "Entertainment in {year} was a shared experience rather than a personalized algorithm. When '{movie}' was in theaters (at {ticketPrice} a ticket) or '{song}' topped the charts, millions of people experienced the exact same cultural moment at the same time.",
      "Music in the {decade}s required physical ownership or patience. To hear '{song}', you either waited for a radio DJ to play it, or you bought the physical format ({techSpec}) and listened to the whole album from start to finish.",
      "Fashion around {date}, {year}—marked by {fashion}—was less about fast-fashion micro-trends that last two weeks online, and more about distinct decade styles tied to music scenes and {vibe}.",
      "Cinema and television writing in {year} reflected the public mood of {vibe}. Stories took more time to build pacing and dialogue, because audiences weren't multi-tasking on a second screen while watching.",
      "Youth culture in {year} revolved around physical hangouts—local record shops, sports fields, arcades, diners, or neighborhood streets—where your reputation was built face-to-face.",
      "Even commercial design in the {decade}s, from the packaging of {snack} to print advertisements for {toy}, used bolder colors and longer copy because people actually read print ads while waiting for the bus or sitting at the breakfast table."
    ],
    analysis: [
      "To be honest about people born around {year}: being born in this era does not make anyone automatically smarter or more special than other generations, but it did train a very specific set of habits. Growing up alongside {tech} meant learning how systems work from the ground up.",
      "A clear advantage of the {year} cohort is practical adaptability—you remember how life worked before constant digital surveillance and instant apps, yet you are young enough to use modern tools fluently.",
      "At the same time, let's look at the realistic blind spots of people shaped by the {decade}s: {honestFlaw}. Recognizing that habit is far more useful than reading generic flattery.",
      "Sociologically, the {year} generation sits at an interesting crossroads. Having witnessed {headline} and the shift from {techSpec} to modern networks, people from this era tend to have a low tolerance for corporate jargon and fake hype.",
      "When it comes to problem-solving, the {year} background encourages {honestStrength}. When something breaks or a plan falls through, the instinct is usually to troubleshoot it step-by-step rather than panic.",
      "The cultural imprint of {year}—from '{song}' to the everyday reality of {economic}—created a generation that values independence, even if that independence sometimes turns into stubbornness when asking for help."
    ],
    psychology: [
      "Psychologically, people whose early environment was shaped by {year} developed their attention spans in a slower media landscape ({techSpec}). That helps with deep focus, though it also means modern notification overload can feel uniquely exhausting.",
      "Let's look honestly at how people from this cohort handle stress: {honestFlaw}. Because the culture of the {decade}s often encouraged 'toughing it out' quietly, many people from this era wait too long before admitting they are burned out.",
      "On the positive side, a realistic strength linked to this upbringing is {honestStrength}. Growing up when boredom was normal forced people to entertain themselves and develop an internal sense of humor and patience.",
      "In arguments or high-pressure situations, people shaped by {year} generally prefer direct facts over emotional theatrics—though they can sometimes come across as overly skeptical or guarded with new people.",
      "Memory research shows that the music and sensory details of your formative years—like '{song}' and {snack}—remain permanently wired to your brain's reward center, which is why revisiting them genuinely lowers cortisol levels."
    ],
    career: [
      "In the real world of work, nobody succeeds just because they were born on {date}. However, entering the workforce after the {decade}s meant learning to survive shifting economic rules—from {economic} to modern automation.",
      "People from the {year} cohort often work best when given clear goals and autonomy. Micromanagement and pointless meetings tend to frustrate them quickly because they judge work by tangible output.",
      "A common career trap for people of this generation is {honestFlaw}—taking on too much responsibility alone instead of delegating, or staying in a stable but unfulfilling role out of financial caution.",
      "Where this cohort genuinely excels professionally is {honestStrength}: bridging the gap between older institutional methods and newer technical tools without losing sight of common sense.",
      "Long-term career satisfaction for someone with your background rarely comes from chasing flashy titles; it comes from mastering a real craft, earning fair pay, and protecting your time outside of work."
    ],
    health: [
      "Looking realistically at health for people born in {year}: early life typically involved more natural daily walking and outdoor play than children get today, alongside advances in {medicalFact}.",
      "However, transitioning from an active childhood in the {decade}s to modern desk and screen work creates specific physical trade-offs—especially posture strain, disrupted sleep from late-night screens, and mental fatigue.",
      "One practical advantage is that people who remember offline routines usually find it easier to reset: a weekend without screens, working with your hands, or walking outdoors restores mental clarity much faster than passive scrolling.",
      "Preventative health for the {year} cohort comes down to basics rather than fads: consistent sleep schedules, strength and mobility work, and paying attention to real medical data rather than social media wellness trends."
    ],
    philosophy: [
      "If there is one realistic life lesson from the history of {year}, it is that stability is never permanent—technologies like {tech} change, economic cycles like {economic} rise and fall, and adaptability matters more than luck.",
      "People who have lived through the changes since {date}, {year} usually develop a healthy skepticism: when someone promises an easy shortcut, experience tells you to look at the fine print.",
      "Real character isn't written in the stars on {date}; it is built in how you treat people when things are inconvenient, how you handle financial or personal setbacks, and whether you keep your word.",
      "Comparing the world of {year} with today shows that while modern life has better gadgets, human needs haven't changed: reliable friends, meaningful work, good health, and peace of mind at home."
    ],
    conclusions: [
      "Looking back at {date}, {year} without rose-colored glasses gives you something better than flattery: real perspective. You entered a world of {population} people, when a home cost {homePrice} and {tech} was the cutting edge, and you have navigated every shift since.",
      "Your birth date doesn't write your future for you, and it doesn't make life effortless. What it does give you is a specific starting point in history—a grounded foundation built on the realities of the {decade}s.",
      "From the days of '{song}' and {techSpec} to the present moment, the most valuable part of your story isn't the coincidence of the calendar—it is the practical resilience, experience, and honesty you have built along the way."
    ],
    fillers: [
      "Newspaper archives from that week confirm how much daily life revolved around practical local concerns.",
      "Every decade has its trade-offs: simpler daily routines on one hand, and fewer conveniences on the other.",
      "These concrete numbers show the real difference between how people lived then versus now.",
      "Understanding the actual prices and tools of the era strips away the myths and shows daily life as it really was.",
      "History is always clearer when we look at how ordinary households paid their bills and spent their evenings."
    ],
    seoHooks: [
      "The historical data from this period highlights several practical details worth noting.",
      "Comparing those conditions with today explains why daily habits have changed so noticeably.",
      "Here is how those shifts played out in ordinary homes, schools, and workplaces."
    ],
    horoscopeInsights: [
      "Let's be completely upfront about astrology for {date}: there is no scientific evidence that planetary positions at birth determine your personality or fate. However, birth-month timing does have real, measurable effects through seasons, daylight, and school cutoff dates.",
      "In traditional zodiac lore, {date} is associated with focus, independence, and strong opinions. In real life, those traits are a double-edged sword: determination helps you finish hard tasks, but unchecked stubbornness can make you hold onto bad plans too long.",
      "Instead of treating a horoscope as a fortune cookie that only says nice things, it is much more useful to ask an honest question: do you tend to overthink decisions, or act too quickly when stressed?",
      "Biologically and socially, being born on {date} meant experiencing a specific seasonal cycle ({seasonNote}) during infancy and entering school at a specific relative age compared to your classmates."
    ],
    famousBioFragments: [
      "Notable people born in the same calendar window include {notableBirths}. Looking at their actual biographies shows that none of them succeeded simply because of their birth date—most faced years of rejection, financial pressure, or failed experiments first.",
      "When we read about famous figures born around {date}, the public usually only sees the final trophy or famous book. What gets left out are the thousands of mundane hours of practice, revision, and discipline that made their work possible.",
      "Sharing a birthday with historical figures like {notableBirths} is a fun icebreaker, but their real lives were messy and human—full of both impressive breakthroughs and personal flaws.",
      "Biographical records for this time of year remind us that talent is common, while consistency is rare. The people who left a lasting mark were usually the ones who kept working after the initial excitement wore off."
    ],
    futureVisions: [
      "In {year}, magazine writers and futurists made bold predictions about the 21st century. While they overpromised flying cars and space colonies, they completely underestimated how fast {tech} would evolve into pocket-sized computers.",
      "Looking back at forecasts from the {decade}s is a great lesson in humility: experts at the time worried about some problems that were eventually solved by {science}, while missing the mental-health and privacy challenges of modern social media.",
      "People in {year} imagined future technology would reduce the workweek to 20 hours. In reality, while modern tools made work faster, they also blurred the boundary between the office and home—a trade-off worth keeping in mind."
    ],
    culinary: [
      "Grocery shopping and kitchen life in {year} looked very different on a receipt: with bread around {breadPrice} and families eating most meals at home, dining out was an occasional treat rather than a daily habit.",
      "Supermarket shelves in the {decade}s featured popular items like {snack}. Food labeling was far less detailed than today, and artificial colors, trans fats, or high-sugar cereals were marketed openly as convenient family staples.",
      "At the same time, home meals in {year} had a real social advantage: families sat down at the table without phones, meals took time to prepare from basic ingredients, and dinner conversation was the main way everyone caught up."
    ],
    travel: [
      "Getting from point A to point B in {year} required real navigation skills. With fuel around {gasPrice} a gallon and no GPS on a dashboard, drivers relied on folded paper maps, road signs, and asking for directions at gas stations.",
      "If your car broke down on a highway in the {decade}s, you couldn't drop a location pin—you walked to the nearest payphone or waited for highway patrol. That reality made people much more attentive to basic car maintenance.",
      "Air travel and vacations in {year} involved paper tickets, physical travel agencies, and postcards that arrived a week after you got home—making travel slower, less crowded at landmarks, and more disconnected from work."
    ],
    sports: [
      "Sports in {year} had a grittier, less commercialized feel. Broadcasts had fewer camera angles, instant replay was either nonexistent or rudimentary, and referees' calls stood without ten-minute video reviews.",
      "For kids growing up in the {decade}s, sports mostly meant unorganized neighborhood games—playing in streets, empty lots, or schoolyards until the streetlights came on, without parents or coaches managing every minute.",
      "Professional athletes in {year} trained with simpler equipment and much less sports-science data, relying on raw conditioning and repetition while playing on rougher fields and courts."
    ],
    gaming: [
      "How people entertained themselves in {year} depended on tangible objects like {toy} and early {techSpec}. If a game or toy broke, you tried to fix it with tape or a screwdriver.",
      "Video games and tabletop hobbies in the {decade}s had no online patches or microtransactions: what came in the box was the finished product, and playing multiplayer meant sitting next to your friend in the same room.",
      "Because entertainment options in {year} were finite, people re-watched favorite movies like '{movie}', re-played the same games dozens of times, and valued ownership over endless scrolling."
    ],
    school: [
      "Classroom life in {year} was completely analog or early-transitional: chalkboards, overhead projectors, paper textbooks, and handwritten essays where spelling mistakes required correction fluid or rewriting the page.",
      "Doing homework or writing a report in the {decade}s meant opening a printed encyclopedia set or walking to the library to search paper index cards—a slow process that forced you to actually read whole chapters.",
      "Schoolyards in {year} had no cyberbullying that followed you home at night; whatever happened at school stayed at school once the afternoon bell rang, giving kids a real mental break at home."
    ],
    social: [
      "Socializing in {year} required commitment and punctuality. If you agreed to meet a friend at 4:00 PM on {date}, you showed up at 4:00 PM—because there was no way to text 'running 15 minutes late' while on the way.",
      "Calling someone's house in the {decade}s meant speaking to their parents or siblings first on a corded or cordless landline, which naturally taught polite small talk and phone etiquette.",
      "Friendships and relationships in {year} had fewer digital misunderstandings: people judged each other by voice tone, body language, and showing up in person rather than how fast someone replied to a message."
    ],
    thematicTitles: {
      geopolitics: [
        "1. The Real World in {year}: Headlines & Global Context",
        "1. What Was Actually Happening Around {date}, {year}",
        "1. Global Events & Public Priorities in {year}"
      ],
      socioEconomy: [
        "2. Cost of Living: Real Prices, Wages & Budgets in {year}",
        "2. Money & Work in the {decade}s: The Real Numbers",
        "2. Household Economics Around {date}, {year}"
      ],
      culturalLegacy: [
        "3. Cinema, Radio & Pop Culture in {year}",
        "3. What People Actually Watched and Listened to in {year}",
        "3. Entertainment Before Algorithms: Culture in {year}"
      ],
      scientificFrontier: [
        "4. Technology & Engineering Reality in {year}",
        "4. How {tech} Actually Worked in the {decade}s",
        "4. Science, Labs & Technical Limits of {year}"
      ],
      behavioralAnalysis: [
        "5. Honest Generational Profile: Strengths & Blind Spots",
        "5. How Growing Up Around {year} Shaped Real Habits",
        "5. The Signature Spirit & Personality of {year}"
      ],
      mediaEvolution: [
        "6. News, Print & How Information Moved in {year}",
        "6. Life Before 24/7 Feeds: Media Habits in {year}",
        "6. Newspapers, Broadcasts & Daily Routines on {date}"
      ],
      environmentalContext: [
        "7. Cities, Population & Infrastructure in {year}",
        "7. A World of {population}: The Physical Landscape of {year}",
        "7. Urban Growth & Environmental Realities of the {decade}s"
      ],
      futureVisions: [
        "8. What {year} Got Right (and Wrong) About the Future",
        "8. Past Predictions vs. Today's Reality",
        "8. How People in the {decade}s Imagined the 21st Century"
      ],
      aestheticTrends: [
        "9. Everyday Clothing, Retail & Design in {year}",
        "9. Street Style & Consumer Goods of the {decade}s",
        "9. How People Dressed and Shopped in {year}"
      ],
      dailyLife: [
        "10. Unreachable by Phone: A Typical Day in {year}",
        "10. Household Routines & Offline Evenings in {year}",
        "10. What Daily Life Felt Like Around {date}, {year}"
      ],
      psychologicalProfile: [
        "11. Attention Span, Stress & Mindset of the {year} Era",
        "11. Psychological Trade-Offs of Your Generation",
        "11. How the {decade}s Wired Focus and Patience"
      ],
      careerPath: [
        "12. Work Ethic, Job Markets & Career Traps",
        "12. How Workplace Rules Changed Since {year}",
        "12. Practical Strengths (and Habits to Watch) at Work"
      ],
      culinaryWorld: [
        "13. Grocery Prices, Kitchen Habits & {snack}",
        "13. What Families Ate and Paid for Groceries in {year}",
        "13. Dinner Tables & Food Culture in the {decade}s"
      ],
      travelHorizons: [
        "14. Paper Maps & {gasPrice} Gas: Travel in {year}",
        "14. Getting Around Before GPS in the {decade}s",
        "14. Road Trips, Transit & Mobility in {year}"
      ],
      sportsSpirit: [
        "15. Neighborhood Games & Sports Culture in {year}",
        "15. Athletics Before Instant Replay in the {decade}s",
        "15. Outdoor Play & Stadiums Around {date}, {year}"
      ],
      gamingLife: [
        "16. Free Time, {toy} & Offline Entertainment",
        "16. How People Dealt With Boredom in {year}",
        "16. Toys, Hobbies & Living Room Games of the {decade}s"
      ],
      schoolDays: [
        "17. Chalkboards & Encyclopedias: School in {year}",
        "17. How Students Learned Before Search Engines",
        "17. Classroom Rules & Library Research in the {decade}s"
      ],
      socialVibe: [
        "18. Landlines & Showing Up on Time: Social Life in {year}",
        "18. How Friendships Worked Without Texting in {year}",
        "18. Face-to-Face Trust & Community in the {decade}s"
      ],
      healthWellness: [
        "19. Medicine, Public Health & Physical Habits in {year}",
        "19. Healthcare Realities & Daily Activity in the {decade}s",
        "19. Balancing Analog Roots With Modern Screen Fatigue"
      ],
      wisdomPhilosophy: [
        "20. Practical Life Lessons From the {year} Timeline",
        "20. What Living Through Decades of Change Actually Teaches",
        "20. Realistic Values: Cutting Through Modern Hype"
      ],
      mysticalVibes: [
        "21. Calendar Science vs. Zodiac Traditions for {date}",
        "21. Separating Birth-Month Biology From Astrology",
        "21. Seasonal Daylight, School Cutoffs & {date} Traditions"
      ],
      rhythmBeats: [
        "22. On the Airwaves: '{song}' & How We Listened",
        "22. Physical Albums, Radio DJs & the Sound of {year}",
        "22. Why the Music of the {decade}s Sticks in Memory"
      ],
      digitalFootprint: [
        "23. Inside the Hardware: {techSpec}",
        "23. Computing Limits & Breakthroughs of {year}",
        "23. From {tech} to the Modern Web"
      ],
      cosmicConnections: [
        "24. Real Astronomy & Notable Lives of {month}",
        "24. Earth's Orbit & Historical Figures Born in {month}",
        "24. Astronomical Facts & Biographical Records for {date}"
      ]
    }
  }
};

export const decadeFacts: Record<string, any> = {
  "1920": {
    song: ["Rhapsody in Blue", "West End Blues", "Ain't Misbehavin'", "Singin' in the Rain (1929)"],
    movie: ["The Gold Rush", "Metropolis", "Steamboat Willie", "Sherlock Jr."],
    tech: ["Household Vacuum-Tube Radios", "Assembly-Line Automobiles", "16mm Motion Picture Projectors", "Rotary Dial Telephones"],
    techSpec: "AM vacuum-tube radios, 78 RPM shellac records, and telegraph lines",
    vibe: ["Urban Electrification", "Early Jazz & Radio Era", "Post-WWI Industrial Shift", "Print Newspaper Dominance"],
    economic: ["1920s Industrial Expansion", "Installment Plan Consumer Buying", "Agricultural Price Drops", "1929 Stock Market Crash"],
    science: ["Discovery of Penicillin (1928)", "Insulin Treatment for Diabetes", "Hubble's Galaxy Distance Proof", "Liquid-Fueled Rocket Tests"],
    medicalFact: "the isolation of insulin (1921) and Alexander Fleming's discovery of penicillin (1928)",
    headline: "rapid urban electrification, expanding rail and auto networks, and volatile financial markets",
    fashion: ["Wool Three-Piece Suits", "Cloche Hats", "Drop-Waist Dresses", "Leather Lace-Up Boots"],
    toy: ["Erector Metal Construction Sets", "Raggedy Ann Dolls", "Tin Wind-Up Trains", "Wooden Yo-Yos"],
    snack: ["Baby Ruth Bars", "Wrigley's Chewing Gum", "Cracker Jack", "Bottled Soda Pop"],
    population: "roughly 1.9 to 2.0 billion people",
    gasPrice: "$0.21 to $0.25",
    homePrice: "$3,200 to $4,800",
    breadPrice: "$0.09",
    ticketPrice: "$0.15 to $0.25",
    income: "$1,300 to $1,500 per year",
    honestStrength: "extreme material resourcefulness—fixing, reusing, and making do without waste",
    honestFlaw: "a tendency to suppress personal complaints and distrust unfamiliar institutions"
  },
  "1930": {
    song: ["In the Mood", "Over the Rainbow", "Night and Day", "Strange Fruit"],
    movie: ["Modern Times", "The Wizard of Oz", "It Happened One Night", "City Lights"],
    tech: ["Long-Range Commercial Seaplanes", "35mm Kodachrome Color Film", "AM Console Radios", "Public Address Systems"],
    techSpec: "shortwave and AM radio consoles, black-and-white newsreels, and manual typewriters",
    vibe: ["Economic Frugality", "Swing Big-Band Radio", "Neighborhood Mutual Support", "Public Works Construction"],
    economic: ["Great Depression Unemployment", "New Deal Infrastructure Programs", "Banking Deposit Reforms", "Labor Union Organization"],
    science: ["Discovery of the Neutron (1932)", "Nylon Polymer Synthesis", "Early Radar Detection", "First Electron Microscopes"],
    medicalFact: "the introduction of sulfa antibacterial drugs and blood bank storage techniques",
    headline: "global economic recovery efforts, massive dam and highway public works, and rising international tensions",
    fashion: ["Double-Breasted Wool Suits", "Bias-Cut Rayon Dresses", "Felt Fedoras", "Resoled Leather Oxfords"],
    toy: ["Monopoly Board Game (1935)", "Balsa Wood Model Planes", "View-Master Reels", "Glass Marbles"],
    snack: ["Ritz Crackers", "Three Musketeers Bars", "Canned Vegetable Soup", "Home-Baked Bread"],
    population: "approximately 2.1 billion people",
    gasPrice: "$0.18 to $0.20",
    homePrice: "$3,800 to $4,100",
    breadPrice: "$0.08",
    ticketPrice: "$0.20 to $0.25",
    income: "$1,300 to $1,700 per year",
    honestStrength: "deep financial caution, self-reliance, and appreciation for basic stability",
    honestFlaw: "hoarding old items 'just in case' and reluctance to spend money on personal comfort"
  },
  "1940": {
    song: ["Take the 'A' Train", "Boogie Woogie Bugle Boy", "Strange Things Happening Every Day", "La Vie en Rose"],
    movie: ["Casablanca", "Citizen Kane", "The Third Man", "Bicycle Thieves"],
    tech: ["ENIAC Vacuum-Tube Computer", "33⅓ RPM Vinyl LP Records", "Jet Aircraft Engines", "Microwave Radar Systems"],
    techSpec: "rotary party-line telephones, 78 and 33 RPM vinyl records, and 18,000-tube mainframe calculators",
    vibe: ["Rationing & Shared Sacrifice", "Post-1945 Reconstruction", "Big Band & Bebop Jazz", "Radio News Bulletins"],
    economic: ["Wartime Industrial Mobilization", "Ration Books & Price Controls", "Post-War Housing & Baby Boom", "Bretton Woods Trade System"],
    science: ["Mass Production of Penicillin", "Invention of the Point-Contact Transistor (1947)", "First Supersonic Flight (Chuck Yeager)", "Radiocarbon Dating Method"],
    medicalFact: "widespread clinical use of penicillin and streptomycin to cure previously fatal infections",
    headline: "World War II mobilization, post-1945 reconstruction, the founding of the United Nations, and GI education expansion",
    fashion: ["Utility Wool Tailored Suits", "A-Line Knee-Length Skirts", "Leather Flight Jackets", "Sturdy Work Boots"],
    toy: ["Metal Slinky (1945)", "Wooden Building Bricks", "Clue Board Game", "Die-Cast Metal Trucks"],
    snack: ["Plain M&M's (originally in cardboard tubes)", "Cheerios Cereal", "Ration-Book Sugar Recipes", "Bottled Cola"],
    population: "around 2.3 to 2.5 billion people",
    gasPrice: "$0.21 to $0.26",
    homePrice: "$4,500 to $7,500",
    breadPrice: "$0.10 to $0.14",
    ticketPrice: "$0.30 to $0.40",
    income: "$2,000 to $3,100 per year",
    honestStrength: "strong civic duty, punctuality, and respect for practical craftsmanship",
    honestFlaw: "strict conformity to social expectations and difficulty discussing emotional struggles openly"
  },
  "1950": { 
    song: ["Johnny B. Goode", "Rock Around the Clock", "What'd I Say", "Hound Dog"], 
    movie: ["Rear Window", "12 Angry Men", "Seven Samurai", "Singin' in the Rain"], 
    tech: ["Pocket Transistor Radios (1954)", "Black-and-White Living Room TVs", "Boeing 707 Commercial Jets", "FORTRAN Programming & IBM Mainframes"], 
    techSpec: "3-channel VHF black-and-white television sets, 45 RPM vinyl singles, and pocket transistor radios",
    vibe: ["Suburban Housing Expansion", "Birth of Rock 'n' Roll", "Drive-In Diners & Auto Culture", "Cold War Space Race Dawn"], 
    economic: ["Manufacturing Wage Growth", "Interstate Highway Construction", "30-Year Mortgage Expansion", "Diner's Club First Credit Cards"], 
    science: ["Watson, Crick & Franklin DNA Structure (1953)", "Salk Polio Vaccine Trials (1955)", "Sputnik 1 Orbital Launch (1957)", "First Commercial Silicon Solar Cells"],
    medicalFact: "the 1955 Jonas Salk polio vaccine campaign and the first internal cardiac pacemakers",
    headline: "post-war suburban construction, the launch of Sputnik 1 kicking off the Space Race, and expanding highway networks",
    fashion: ["Cardigan Sweaters", "Rolled Cuff Denim Jeans", "Saddle Oxford Shoes", "Charcoal Flannel Suits"], 
    toy: ["Wham-O Hula Hoops", "Play-Doh Compound", "Matchbox Die-Cast Cars", "Yahtzee Dice Game"], 
    snack: ["Swanson Aluminum-Tray TV Dinners", "Peanut M&M's", "Eggo Frozen Waffles", "Fountain Malt Shakes"],
    population: "approximately 2.5 to 2.9 billion people",
    gasPrice: "$0.27 to $0.30",
    homePrice: "$8,500 to $12,000",
    breadPrice: "$0.16 to $0.20",
    ticketPrice: "$0.50 to $0.65",
    income: "$3,500 to $5,000 per year",
    honestStrength: "loyalty to long-term commitments, hands-on mechanical competence, and financial discipline",
    honestFlaw: "assuming traditional career ladders still work the same way today and resistance to rapid social change"
  },
  "1960": { 
    song: ["Respect", "Good Vibrations", "Like a Rolling Stone", "Hey Jude"], 
    movie: ["2001: A Space Odyssey", "To Kill a Mockingbird", "Lawrence of Arabia", "Psycho"], 
    tech: ["Philips Compact Audio Cassettes (1963)", "Telstar Live Satellite TV", "Touch-Tone Push-Button Phones", "ARPANET First 4-Node Network (1969)"], 
    techSpec: "magnetic tape cassettes, color CRT televisions, rotary and early touch-tone landlines, and Apollo guidance computers with 72 KB of ROM",
    vibe: ["Civil Rights Legislation", "Folk-Rock & British Invasion", "Apollo Moon Program Focus", "University Campus Debates"], 
    economic: ["Aerospace & Engineering Boom", "Expansion of Public Universities", "Suburban Shopping Center Growth", "International Airline Expansion"], 
    science: ["Apollo 11 Moon Landing (July 1969)", "First Working Optical Laser (1960)", "First Human Heart Transplant (1967)", "Confirmation of Plate Tectonics"],
    medicalFact: "the measles and rubella vaccines, alongside the first coronary bypass surgeries",
    headline: "the Apollo space missions culminating on the Moon, historic Civil Rights acts, and major shifts in youth demographics",
    fashion: ["Tailored Mod Suits", "Bell-Bottom Denim", "A-Line Shift Dresses", "Canvas Sneakers"], 
    toy: ["Etch A Sketch Drawing Toy", "Hot Wheels Track Sets (1968)", "G.I. Joe Action Figures", "Twister Floor Game"], 
    snack: ["Pop-Tarts Toaster Pastries", "Doritos Tortilla Chips (1966)", "Pringles Stacked Chips", "Tang Powdered Orange Drink"],
    population: "roughly 3.0 to 3.6 billion people",
    gasPrice: "$0.31 to $0.35",
    homePrice: "$12,500 to $16,500",
    breadPrice: "$0.20 to $0.24",
    ticketPrice: "$0.75 to $1.25",
    income: "$5,600 to $8,500 per year",
    honestStrength: "willingness to question authority, strong civic awareness, and work ethic",
    honestFlaw: "idealism that can clash with practical bureaucracy, and impatience with modern digital interfaces"
  },
  "1970": { 
    song: ["Superstition", "Hotel California", "Bohemian Rhapsody", "Stayin' Alive"], 
    movie: ["The Godfather", "Star Wars (1977)", "Jaws", "Taxi Driver"], 
    tech: ["Intel 4004 Microprocessor (1971)", "VHS & Betamax Home VCRs", "Sony Walkman Cassette Player (1979)", "8-Inch & 5.25-Inch Floppy Disks"], 
    techSpec: "8-track and cassette tapes, VHF/UHF TVs with mechanical dials, pocket LED calculators, and early 8-bit microcomputers",
    vibe: ["FM Album Rock & Funk", "Modern Environmental Movement", "New Hollywood Realism", "Post-Watergate Institutional Skepticism"], 
    economic: ["1973 & 1979 Oil Supply Shocks", "High Inflation & Interest Rates", "Fuel-Efficient Compact Cars", "Founding of Microsoft (1975) & Apple (1976)"], 
    science: ["Voyager 1 & 2 Outer Planet Launches (1977)", "First MRI Body Scans", "Low-Loss Fiber Optic Cables", "Eradication of Smallpox Certified"],
    medicalFact: "the development of CT and MRI medical scanners and the global eradication of smallpox",
    headline: "energy crises with gas-station lines, the end of the Vietnam War, environmental protection laws, and the birth of the microprocessor",
    fashion: ["Wide-Collar Shirts", "Corduroy & Denim Jackets", "Flared Jeans", "Suede Running Shoes"], 
    toy: ["Atari 2600 Video Computer System (1977)", "Rubik's Cube (1974/1980)", "Nerf Foam Balls", "Simon Electronic Memory Game"], 
    snack: ["Reese's Pieces", "Nature Valley Granola Bars", "Pop Rocks Fizzing Candy", "Home Fondue Sets"],
    population: "approximately 3.7 to 4.4 billion people",
    gasPrice: "$0.36 (1970) rising to $0.90+ (1979)",
    homePrice: "$23,000 to $55,000",
    breadPrice: "$0.25 to $0.45",
    ticketPrice: "$1.55 to $2.50",
    income: "$9,800 to $16,500 per year",
    honestStrength: "high independence, practical skepticism of hype, and the ability to troubleshoot problems without hand-holding",
    honestFlaw: "cynicism toward institutions and a habit of refusing to ask for help until a problem gets serious"
  },
  "1980": { 
    song: ["Billie Jean", "Every Breath You Take", "Take On Me", "Sweet Child O' Mine"], 
    movie: ["Raiders of the Lost Ark", "Back to the Future", "The Empire Strikes Back", "Die Hard"], 
    tech: ["IBM PC (1981) & Apple Macintosh (1984)", "Compact Disc (CD) Digital Audio (1982)", "VHS Camcorders & Video Rental Stores", "3.5-Inch 1.44 MB Floppy Disks"], 
    techSpec: "64 KB to 640 KB RAM home computers, VHS cassette tapes, 35mm point-and-shoot film cameras, and corded/cordless landlines",
    vibe: ["24-Hour Cable TV & MTV", "Suburban Mall & Arcade Culture", "Synth-Pop & Early Hip-Hop", "Late Cold War Thaw & Glasnost"], 
    economic: ["1980s Interest Rate Peak & Drop", "Growth of 401(k) & Retail Investing", "Globalized Electronics Manufacturing", "Boom in Video Rental & Home Entertainment"], 
    science: ["Space Shuttle Columbia First Orbital Flight (1981)", "PCR DNA Amplification Technique (1983)", "Mir Space Station Assembly", "Discovery of the Antarctic Ozone Hole & Montreal Protocol"],
    medicalFact: "the invention of Polymerase Chain Reaction (PCR) for DNA testing and the first statin cholesterol medications",
    headline: "the spread of personal computers into offices and schools, the Space Shuttle program, and the fall of the Berlin Wall in November 1989",
    fashion: ["Stone-Wash & Acid-Wash Denim", "High-Top Basketball Sneakers", "Nylon Windbreakers", "Structured Shoulder Blazers"], 
    toy: ["Nintendo Entertainment System (NES)", "Transformers & G.I. Joe Figures", "Cabbage Patch Kids", "original Game Boy (1989)"], 
    snack: ["Cool Ranch Doritos", "Fruit Roll-Ups", "Capri Sun Foil Pouches", "Act II Microwave Popcorn"],
    population: "around 4.4 to 5.2 billion people",
    gasPrice: "$1.10 to $1.30",
    homePrice: "$65,000 to $95,000",
    breadPrice: "$0.50 to $0.65",
    ticketPrice: "$2.75 to $4.00",
    income: "$18,000 to $28,000 per year",
    honestStrength: "rare bridge fluency—growing up completely offline as kids while mastering computers and the internet as young adults",
    honestFlaw: "workaholic tendencies, taking on too much solo responsibility, and nostalgia for pre-smartphone simplicity"
  },
  "1990": { 
    song: ["Smells Like Teen Spirit", "Waterfalls", "One", "Wonderwall"], 
    movie: ["Jurassic Park (1993)", "The Shawshank Redemption", "Pulp Fiction", "The Matrix (1999)"], 
    tech: ["World Wide Web Public Browsers (1993)", "56k Dial-Up Internet Modems", "GSM Digital Mobile Phones (Nokia)", "DVD Optical Discs & Windows 95"], 
    techSpec: "28.8k to 56k dial-up modems that tied up the home phone line, CRT monitors, CD-ROMs holding 700 MB, and 2G text-only cell phones",
    vibe: ["Alternative Rock & Golden-Era Hip-Hop", "Early Web Chatrooms & Email", "Independent Cinema Boom", "Post-Cold War Global Trade"], 
    economic: ["1990s Tech & Dot-Com Expansion", "NAFTA & WTO Global Supply Chains", "Growth of Big-Box Superstores", "Low Energy Prices & Budget Surpluses"], 
    science: ["Hubble Space Telescope Deep Field Images", "Mars Pathfinder & Sojourner Rover (1997)", "Cloning of Dolly the Sheep (1996)", "Human Genome Project Sequencing"],
    medicalFact: "highly active antiretroviral therapies, laser eye surgery (LASIK), and automated external defibrillators",
    headline: "the transition from offline life to the early World Wide Web, the dissolution of the Soviet Union, and rapid global trade integration",
    fashion: ["Plaid Flannel Overshirts", "Baggy Carpenter Jeans", "Fleece Pullovers", "Doc Martens & Canvas Sneakers"], 
    toy: ["Sony PlayStation & Nintendo 64", "Tamagotchi Keychain Pets", "Super Soaker Water Blasters", "Pokémon Trading Cards & Game Boy Color"], 
    snack: ["Oscar Mayer Lunchables", "Dunkaroos Frosting Packs", "Bagel Bites", "Snapple Glass-Bottled Tea"],
    population: "roughly 5.3 to 6.0 billion people",
    gasPrice: "$1.15 to $1.30",
    homePrice: "$100,000 to $140,000",
    breadPrice: "$0.75 to $0.90",
    ticketPrice: "$4.25 to $5.00",
    income: "$30,000 to $41,000 per year",
    honestStrength: "adaptability across fast-changing tech eras, practical media literacy, and valuing genuine in-person friendships",
    honestFlaw: "decision fatigue, over-analyzing career and financial steps, and feeling caught between older traditions and modern economic costs"
  },
  "2000": { 
    song: ["Hey Ya!", "Crazy in Love", "Mr. Brightside", "Lose Yourself"], 
    movie: ["The Lord of the Rings Trilogy", "The Dark Knight", "Spirited Away", "No Country for Old Men"], 
    tech: ["Broadband DSL/Cable & Home Wi-Fi", "Apple iPod (2001) & iPhone (2007)", "USB Flash Drives & Wikipedia", "YouTube (2005) & Early Social Networks"], 
    techSpec: "flip phones with T9 keypad texting, MP3 players holding 1,000 songs, early Wi-Fi routers, and digital point-and-shoot cameras",
    vibe: ["Shift from Analog to Broadband", "MP3 & iPod Music Era", "Early Social Media (MySpace/Facebook)", "Heightened Global Security & Travel Rules"], 
    economic: ["Early-2000s Housing Boom", "2008 Global Financial & Mortgage Crisis", "Rise of Online Retail (Amazon/eBay)", "Expansion of Service & Tech Sectors"], 
    science: ["Completion of the Human Genome Project (2003)", "Continuous Crew on the International Space Station", "Mars Rovers Spirit & Opportunity (2004)", "Isolation of Graphene (2004)"],
    medicalFact: "the complete mapping of human DNA (2003) and the introduction of targeted cancer immunotherapies",
    headline: "the rollout of broadband internet and mobile phones, major geopolitical security shifts, and the 2008 global financial crisis",
    fashion: ["Low-Rise Bootcut Denim", "Layered Polo & Graphic Shirts", "Velour & Zip-Up Hoodies", "Skate & Running Sneakers"], 
    toy: ["PlayStation 2 (best-selling console in history)", "Nintendo Wii Motion Control", "Razor Aluminum Scooters", "Xbox 360"], 
    snack: ["Red Bull & Monster Energy Drinks", "Greek Yogurt Cups", "Bakery Cupcakes", "Starbucks Iced Frappuccinos"],
    population: "approximately 6.1 to 6.9 billion people",
    gasPrice: "$1.50 (2000) rising to $3.25+ (2008)",
    homePrice: "$165,000 to $220,000",
    breadPrice: "$1.00 to $1.40",
    ticketPrice: "$5.40 to $7.50",
    income: "$42,000 to $50,000 per year",
    honestStrength: "fast digital fluency, comfort with global information, and realistic awareness of economic volatility",
    honestFlaw: "comparing personal progress to curated social-media highlights and struggling to fully disconnect from screens"
  },
  "2010": { 
    song: ["Rolling in the Deep", "Uptown Funk", "Get Lucky", "Blinding Lights (late 2019)"], 
    movie: ["Inception", "Mad Max: Fury Road", "Parasite", "The Social Network"], 
    tech: ["4G LTE Smartphones", "On-Demand Video & Music Streaming", "Cloud Storage & Tablet Computers", "GPS Ride-Sharing & Mobile Banking"], 
    techSpec: "high-resolution touchscreen smartphones, 4G LTE mobile data, cloud syncing, and algorithmic social feeds",
    vibe: ["Always-On Mobile Connectivity", "Binge-Streaming Television Era", "Creator & Podcast Culture", "Gig Economy & Remote Tools"], 
    economic: ["Long Post-2008 Low-Interest Recovery", "Subscription Software & Streaming Models", "Rapid Urban Housing Price Growth", "Tech Giant Market Dominance"], 
    science: ["Higgs Boson Discovery at CERN (2012)", "CRISPR-Cas9 Gene Editing (2012)", "First Direct Detection of Gravitational Waves (2015)", "SpaceX Reusable Orbital Booster Landings (2015)"],
    medicalFact: "CRISPR gene-editing breakthroughs and wearable continuous health monitors",
    headline: "smartphones becoming universal daily tools, the shift from cable to streaming, and major breakthroughs in physics and genetics",
    fashion: ["Tapered Chinos & Skinny Jeans", "Athleisure Leggings & Joggers", "Minimalist White Sneakers", "Workwear Flannels & Beanies"], 
    toy: ["Minecraft", "Nintendo Switch Hybrid Console", "Consumer Camera Drones", "LEGO Collector Sets"], 
    snack: ["Avocado Sourdough Toast", "LaCroix Sparkling Water", "Cold Brew Coffee", "High-Protein Snack Bars"],
    population: "around 7.0 to 7.7 billion people",
    gasPrice: "$2.40 to $3.60",
    homePrice: "$220,000 to $320,000",
    breadPrice: "$1.40 to $1.90",
    ticketPrice: "$8.00 to $9.25",
    income: "$50,000 to $65,000 per year",
    honestStrength: "rapid self-education using online resources, visual communication skills, and openness about mental health",
    honestFlaw: "fragmented attention spans from constant notifications and impatience with slow offline processes"
  },
  "2020": { 
    song: ["As It Was", "Flowers", "Anti-Hero", "Espresso"], 
    movie: ["Oppenheimer", "Dune: Part Two", "Everything Everywhere All at Once", "Top Gun: Maverick"], 
    tech: ["Large Language Models & Generative AI", "5G Wireless & Fiber Broadband", "Remote Video Collaboration Platforms", "Long-Range Electric Vehicles & LFP Batteries"], 
    techSpec: "5G mobile networks, multi-camera OLED smartphones, cloud AI models, and solid-state laptops",
    vibe: ["Hybrid & Remote Work Shifts", "Short-Form Vertical Video Feeds", "Inflation & Cost-of-Living Focus", "Return to Offline Clubs & Running Groups"], 
    economic: ["Global Supply Chain Realignment", "2021–2023 Inflation & Interest Rate Hikes", "AI & Semiconductor Infrastructure Boom", "Flexible & Hybrid Workplace Policies"], 
    science: ["Rapid mRNA Vaccine Development (2020)", "James Webb Space Telescope Infrared Deep Fields (2022)", "First Approved CRISPR Gene Therapy (2023)", "Nuclear Fusion Net-Energy Ignition Milestone (2022)"],
    medicalFact: "mRNA vaccine platforms, GLP-1 metabolic treatments, and AI-assisted protein structure prediction (AlphaFold)",
    headline: "global public-health mobilization, the shift to hybrid work, rising living costs, and the rapid rollout of artificial intelligence",
    fashion: ["Relaxed Wide-Leg Denim", "Heavyweight Oversized Hoodies", "Retro Mesh Running Sneakers", "Crossbody Nylon Bags"], 
    toy: ["PlayStation 5", "Steam Deck Portable PCs", "Custom Mechanical Keyboards", "Botanical LEGO Sets"], 
    snack: ["Artisanal Sourdough Loaves", "Iced Oat-Milk Lattes", "Air-Fryer Home Recipes", "Electrolyte Hydration Packets"],
    population: "exceeding 8.0 billion people (crossed in November 2022)",
    gasPrice: "$3.10 to $3.80",
    homePrice: "$350,000 to $420,000",
    breadPrice: "$2.00 to $2.60",
    ticketPrice: "$10.50 to $12.00",
    income: "$68,000 to $78,000 per year",
    honestStrength: "high adaptability to sudden global disruptions and comfort with advanced digital tools",
    honestFlaw: "screen saturation, algorithmic echo chambers, and over-reliance on automated tools"
  }
};
