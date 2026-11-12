export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageGradient: string;
  content: string; 
  date: string;
  imagePrompt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "space-birthdays",
    title: "How Old Would You Be on Mars? The Real Astronomy Behind Planetary Years",
    excerpt: "A factual look at orbital periods across our solar system and how astronomers measure days and years on other planets.",
    category: "Science & Astronomy",
    readTime: "8 min",
    imageGradient: "from-indigo-900 to-purple-600",
    date: "May 22, 2024",
    imagePrompt: "A realistic astronomical visualization of the solar system showing Earth, Mars, and Saturn orbiting the Sun, clean scientific illustration style, 4K resolution.",
    content: `
      <p>When we measure our age in years, we are really counting how many times Earth has completed a full orbit around the Sun. On Earth, one orbital period takes approximately 365.24 solar days—which is why we add a leap day every four years to keep our calendar aligned with the seasons. Because every planet in our solar system sits at a different distance from the Sun and travels at a different orbital velocity, a "year" changes dramatically depending on which planet you use as your clock.</p>
      
      <h2>How Orbital Mechanics Define a Year</h2>
      <p>According to Kepler's Third Law of Planetary Motion, the farther a planet is from the Sun, the longer its orbital path and the slower it moves along that path. Meanwhile, a planet's "day" (its sidereal or solar rotation period) depends on how fast it spins on its own axis—which is completely independent of its year.</p>
      
      <h3>1. Mercury and Venus: Fast Orbits, Strange Days</h3>
      <p>Mercury is the closest planet to the Sun, orbiting at an average speed of nearly 47 kilometers per second. A full year on Mercury takes just <strong>87.97 Earth days</strong>. If you are 25 years old on Earth, you have lived through more than 103 Mercurian years. However, Mercury rotates so slowly on its axis that one solar day on Mercury (sunrise to sunrise) lasts about 176 Earth days—meaning a single day on Mercury is twice as long as its year.</p>
      <p>Venus orbits the Sun every <strong>224.7 Earth days</strong>, so a 25-year-old on Earth would be about 40.6 Venusian years old. Even more unusually, Venus rotates backward (retrograde) so slowly that one rotation takes 243 Earth days.</p>
      
      <h3>2. Mars: The 687-Day Calendar</h3>
      <p>Mars orbits further out from the Sun at an average distance of about 228 million kilometers. While a Martian day (called a <em>sol</em>) is remarkably similar to Earth's at <strong>24 hours, 39 minutes, and 35 seconds</strong>, Mars takes <strong>687 Earth days</strong> (or 668.6 sols) to complete one orbit. That makes a Martian year roughly 1.88 Earth years long. A 30-year-old person on Earth is just shy of 16 Martian years old.</p>
      
      <h3>3. The Outer Gas Giants: Decades for a Single Orbit</h3>
      <p>Once you cross the asteroid belt, orbital periods stretch into decades:</p>
      <ul>
        <li><strong>Jupiter:</strong> Takes <strong>11.86 Earth years</strong> (4,333 Earth days) to orbit the Sun. You only celebrate your third "Jovian birthday" around age 35 on Earth.</li>
        <li><strong>Saturn:</strong> Takes <strong>29.45 Earth years</strong> (10,759 Earth days) per orbit. Completing three Saturnian years takes nearly 89 Earth years.</li>
        <li><strong>Uranus & Neptune:</strong> Uranus takes <strong>84 Earth years</strong> to complete a single orbit, while Neptune takes <strong>164.8 Earth years</strong>—meaning Neptune has only completed one full orbit since its mathematical discovery in 1846.</li>
      </ul>
    `
  },
  {
    id: "birthday-animals",
    title: "Birth Months, Seasons, and Nature: What Biology Actually Says",
    excerpt: "Separating folklore from real environmental science: how seasonal daylight, weather, and natural cycles influence early life and wildlife.",
    category: "Nature & Biology",
    readTime: "10 min",
    imageGradient: "from-green-500 to-emerald-800",
    date: "June 1, 2024",
    imagePrompt: "A realistic nature photograph showing the four seasons transitioning across a temperate forest landscape with wildlife, natural daylight, 4K.",
    content: `
      <p>Many cultures have traditional stories linking birth months to specific animals, plants, or personality traits. While symbolic "birth totems" are folklore rather than science, biologists and epidemiologists have found that the season in which a person or animal is born does have real, measurable effects on early development—mostly due to daylight hours, temperature, nutrition, and seasonal exposure to microbes.</p>
      
      <h2>Winter Months (December – February):Adapting to Low Light</h2>
      <p>In the Northern Hemisphere, winter brings shorter photoperiods (hours of daylight) and colder temperatures. In the natural world, animals like bears, badgers, and ground squirrels rely on metabolic conservation or hibernation, while species like wolves and snowy owls remain active hunters. For humans born in winter, researchers note practical factors such as lower maternal vitamin D synthesis during late pregnancy and spending the first few months indoors, which historically shaped early immune system exposure.</p>
      
      <h2>Spring Months (March – May): The Biological Growth Window</h2>
      <p>In temperate ecosystems, spring is the primary breeding and birthing season for most mammals and migratory birds. Rising temperatures and emerging plant life provide the caloric surplus needed for raising offspring. For human communities prior to modern refrigeration, spring births coincided with increasing daylight and fresh produce after winter food stores ran low.</p>
      
      <h2>Summer & Autumn (June – November): Daylight and School-Age Cutoffs</h2>
      <p>Babies born in summer experience long daylight hours and warmer weather early in life. Interestingly, modern social science shows that one of the biggest real-world impacts of your birth month has nothing to do with mystic traits—it is the <strong>relative age effect</strong> created by school enrollment cutoff dates (often September 1). Children born just after the cutoff are the oldest in their grade cohort, which statistically gives them a noticeable temporary advantage in youth sports and early classroom confidence compared to classmates born eleven months later.</p>
    `
  },
  {
    id: "ultimate-party-guide",
    title: "Practical Birthday Planning: How to Host a Memorable Gathering Without the Stress",
    excerpt: "A realistic, budget-conscious guide to organizing a birthday get-together that people actually enjoy, without overspending or overcomplicating.",
    category: "Practical Guides",
    readTime: "7 min",
    imageGradient: "from-yellow-400 to-red-500",
    date: "July 15, 2024",
    imagePrompt: "A warm, realistic backyard gathering at dusk with string lights, simple wooden table with food and cake, friends talking naturally, documentary photography style, 4K.",
    content: `
      <p>Whether you are planning a birthday for a child, a friend, or yourself, it is easy to get caught up in social media pressure to stage an elaborate event. In reality, guests rarely remember expensive decorations—they remember whether they felt comfortable, had good food, and had time to actually talk and laugh together. Here is a practical approach to hosting a gathering that works.</p>
      
      <h2>1. Match the Format to the Guest List, Not a Trend</h2>
      <p>Before buying supplies, ask what the person celebrating genuinely enjoys. An introvert might prefer a quiet dinner with four close friends or a day trip, while kids usually prefer unstructured active play over a rigid schedule. Keep the guest list to a size where the host can actually spend a few minutes talking to everyone.</p>
      
      <h2>2. Keep Food Simple and Self-Serve</h2>
      <p>The biggest mistake hosts make is spending the entire gathering stuck in the kitchen cooking to order. Choose a menu that can be prepared ahead of time or served buffet-style—such as baked pasta, taco bars, finger foods, or a backyard grill where people can help themselves. Always label common allergens clearly so guests don't have to ask.</p>
      
      <h2>3. Structure One Simple Activity</h2>
      <p>For children's parties, having one focused activity—like a backyard scavenger hunt with written clues, a craft table, or a neighborhood game—prevents boredom without overwhelming the schedule. For adults, good background music at a volume where people can still hear each other talk, plus a simple icebreaker for guests who don't know one another, goes much further than forced party games.</p>
      
      <h2>4. Set a Clear Start and End Time</h2>
      <p>Especially for family and daytime gatherings, stating a clear two-to-three-hour window on the invitation helps parents plan their day and ensures the gathering ends on a high note before everyone gets tired.</p>
    `
  }
];
