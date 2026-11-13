import { ExactYearData } from './exactYearDatabase';

export interface YearFactExpansion {
  newsStory: string;
  techStory: string;
  popStory: string;
  priceStory: string;
  fashionStory: string;
  crimeStory: string;
  conflictStory: string;
  weatherStory: string;
}

const splitIntoSentences = (text: string): string[] => {
  if (!text) return [];
  return text
    .replace(/Mr\./g, 'Mr')
    .replace(/Mrs\./g, 'Mrs')
    .replace(/Dr\./g, 'Dr')
    .replace(/Drs\./g, 'Drs')
    .replace(/St\./g, 'St')
    .replace(/U\.S\./g, 'US')
    .replace(/Jr\./g, 'Jr')
    .replace(/No\./g, 'No')
    .replace(/Bros\./g, 'Bros')
    .replace(/F\.\s*W\./g, 'FW')
    .replace(/J\.\s*J\./g, 'JJ')
    .replace(/J\.\s*R\./g, 'JR')
    .replace(/W\.\s*C\./g, 'WC')
    .split(/(?<=\.)\s+/)
    .map((s) =>
      s
        .replace(/\bMr\b/g, 'Mr.')
        .replace(/\bMrs\b/g, 'Mrs.')
        .replace(/\bDr\b/g, 'Dr.')
        .replace(/\bDrs\b/g, 'Drs.')
        .replace(/\bSt\b/g, 'St.')
        .replace(/\bUS\b/g, 'U.S.')
        .replace(/\bJr\b/g, 'Jr.')
        .replace(/\bNo\b/g, 'No.')
        .replace(/\bBros\b/g, 'Bros.')
        .replace(/\bFW\b/g, 'F. W.')
        .replace(/\bJJ\b/g, 'J.J.')
        .replace(/\bJR\b/g, 'J.R.')
        .replace(/\bWC\b/g, 'W. C.')
        .trim()
    )
    .filter(Boolean);
};

// Enforce flowing, non-repeating sentences per section
const ensure5To7Sentences = (sentences: string[], maxSentences: number = 7): string => {
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const raw of sentences) {
    const subSents = splitIntoSentences(raw);
    for (const s of subSents) {
      const norm = s.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (norm && !seen.has(norm)) {
        seen.add(norm);
        unique.push(s);
      }
    }
  }
  return unique.slice(0, maxSentences).join(' ');
};

// Strip specific month/day references from year-wide events so only the year is mentioned
const MONTHS_PATTERN = '(?:January|February|March|April|May|June|July|August|September|October|November|December)';

const stripSpecificDatesToYearOnly = (text: string, year: number): string => {
  if (!text) return '';
  let out = text;

  // 1. Parenthetical exact dates like "(January 19, 1977)" or "(released May 25, 1977)"
  out = out.replace(new RegExp(`\\(\\s*(?:released\\s+)?${MONTHS_PATTERN}\\s+\\d{1,2},?\\s*\\d{4}\\s*\\)`, 'gi'), '');

  // 2. Date ranges like "From February 5 to February 7, 1978," or "Between November and December 2004," or "During six weeks in August and September 2004,"
  out = out.replace(
    new RegExp(`(?:From|Between|During)\\s+(?:six\\s+weeks\\s+in\\s+)?${MONTHS_PATTERN}(?:\\s+\\d{1,2})?\\s+(?:to|and|–|-)\\s+${MONTHS_PATTERN}(?:\\s+\\d{1,2})?,?\\s*\\d{4}`, 'gi'),
    `In ${year}`
  );

  // 3. "On the stormy night of July 13–14, 1977," or "On Christmas Eve 1968,"
  out = out.replace(
    new RegExp(`On\\s+the\\s+(?:[a-z-]+\\s+)?night\\s+of\\s+${MONTHS_PATTERN}\\s+\\d{1,2}(?:[–-]\\d{1,2})?,?\\s*\\d{4}`, 'gi'),
    `In ${year}`
  );
  out = out.replace(/On\s+Christmas\s+Eve\s+(\d{4})/gi, 'In $1');
  out = out.replace(/By\s+Christmas\s+(\d{4})/gi, 'In $1');

  // 4. "At 3:05 AM on December 11, 1978," or "At 8:32 AM on May 18, 1980,"
  out = out.replace(
    new RegExp(`(At\\s+\\d{1,2}:\\d{2}\\s*(?:AM|PM))\\s+on\\s+${MONTHS_PATTERN}\\s+\\d{1,2},?\\s*\\d{4}`, 'gi'),
    `$1 in ${year}`
  );

  // 5. "On August 20 and September 5, 1977," or "On April 10, 1979—known as 'Terrible Tuesday'—"
  out = out.replace(
    new RegExp(`On\\s+${MONTHS_PATTERN}\\s+\\d{1,2}\\s+and\\s+${MONTHS_PATTERN}\\s+\\d{1,2},?\\s*\\d{4}`, 'gi'),
    `In ${year}`
  );
  out = out.replace(
    new RegExp(`On\\s+${MONTHS_PATTERN}\\s+\\d{1,2}(?:[–-]\\d{1,2})?,?\\s*\\d{4}`, 'g'),
    `In ${year}`
  );
  out = out.replace(
    new RegExp(`on\\s+${MONTHS_PATTERN}\\s+\\d{1,2}(?:[–-]\\d{1,2})?,?\\s*\\d{4}`, 'g'),
    `in ${year}`
  );

  // 6. "thenight of July 20" or "On July 20," without year
  out = out.replace(
    new RegExp(`the\\s+night\\s+of\\s+${MONTHS_PATTERN}\\s+\\d{1,2}`, 'gi'),
    `a historic night in ${year}`
  );
  out = out.replace(
    new RegExp(`On\\s+${MONTHS_PATTERN}\\s+\\d{1,2}(?=,|\\s)`, 'g'),
    `In ${year}`
  );
  out = out.replace(
    new RegExp(`on\\s+${MONTHS_PATTERN}\\s+\\d{1,2}(?=,|\\s)`, 'g'),
    `in ${year}`
  );

  // 7. "In early/late <Month> <Year>" or "In <Month>–<Month> <Year>" or "In <Month> <Year>"
  out = out.replace(
    new RegExp(`(?:In|By)\\s+(?:early\\s+|late\\s+|mid-)?${MONTHS_PATTERN}(?:\\s*(?:and|–|-)\\s*${MONTHS_PATTERN})?\\s+(\\d{4})`, 'g'),
    'In $1'
  );
  out = out.replace(
    new RegExp(`(in|by|during|since|from)\\s+(?:early\\s+|late\\s+|mid-)?${MONTHS_PATTERN}(?:\\s*(?:and|–|-)\\s*${MONTHS_PATTERN})?\\s+(\\d{4})`, 'g'),
    '$1 $2'
  );

  // 8. Relative month phrases without year: "That July," "Earlier that May," "That June and July," "By November,"
  out = out.replace(
    new RegExp(`(?:Earlier\\s+that|Later\\s+that|That\\s+same|That)\\s+${MONTHS_PATTERN}(?:\\s+and\\s+${MONTHS_PATTERN})?`, 'g'),
    `In ${year}`
  );
  out = out.replace(
    new RegExp(`(?:earlier\\s+that|later\\s+that|that\\s+same|that)\\s+${MONTHS_PATTERN}(?:\\s+and\\s+${MONTHS_PATTERN})?`, 'g'),
    `in ${year}`
  );
  out = out.replace(
    new RegExp(`(?:In|By)\\s+(?:early\\s+|late\\s+)?${MONTHS_PATTERN}(?=,|\\s+of\\s+\\d{4})`, 'g'),
    `In ${year}`
  );

  // 9. Adjective month before a noun: "the November 1978 City Hall" -> "the 1978 City Hall", "its November 1975 release" -> "its 1975 release"
  out = out.replace(
    new RegExp(`\\b${MONTHS_PATTERN}\\s+(\\d{4})\\b`, 'g'),
    '$1'
  );

  // 10. Clean up any remaining "<Month> <Day>, <Year>" anywhere in the text
  out = out.replace(
    new RegExp(`${MONTHS_PATTERN}\\s+\\d{1,2},?\\s*(\\d{4})`, 'g'),
    '$1'
  );

  // 11. Avoid duplicate "In 2004, ... in 2004" in the same sentence
  out = out.replace(/\bIn\s+(\d{4})\s+of\s+\1\b/gi, 'In $1');
  out = out.replace(/\bIn\s+(\d{4}),\s+in\s+\1\b/gi, 'In $1,');
  out = out.replace(/\s{2,}/g, ' ').trim();

  return out;
};

export const getYearLeadersAndPop = (year: number): {
  usPresident: string;
  ukPm: string;
  worldPop: string;
  minWage: string;
  housePrice: string;
} => {
  const usPresident =
    year < 1945 ? "Franklin D. Roosevelt" :
    year < 1953 ? "Harry S. Truman" :
    year < 1961 ? "Dwight D. Eisenhower" :
    year < 1963 ? "John F. Kennedy" :
    year < 1969 ? "Lyndon B. Johnson" :
    year < 1974 ? "Richard M. Nixon" :
    year < 1977 ? "Gerald R. Ford" :
    year < 1981 ? "Jimmy Carter" :
    year < 1989 ? "Ronald Reagan" :
    year < 1993 ? "George H. W. Bush" :
    year < 2001 ? "Bill Clinton" :
    year < 2009 ? "George W. Bush" :
    year < 2017 ? "Barack Obama" :
    year < 2021 ? "Donald J. Trump" :
    year < 2025 ? "Joe Biden" : "Donald J. Trump";

  const ukPm =
    year < 1945 ? "Winston Churchill" :
    year < 1951 ? "Clement Attlee" :
    year < 1955 ? "Winston Churchill" :
    year < 1957 ? "Anthony Eden" :
    year < 1963 ? "Harold Macmillan" :
    year < 1964 ? "Alec Douglas-Home" :
    year < 1970 ? "Harold Wilson" :
    year < 1974 ? "Edward Heath" :
    year < 1976 ? "Harold Wilson" :
    year < 1979 ? "James Callaghan" :
    year < 1990 ? "Margaret Thatcher" :
    year < 1997 ? "John Major" :
    year < 2007 ? "Tony Blair" :
    year < 2010 ? "Gordon Brown" :
    year < 2016 ? "David Cameron" :
    year < 2019 ? "Theresa May" :
    year < 2022 ? "Boris Johnson" :
    year < 2024 ? "Rishi Sunak" : "Keir Starmer";

  const popBillions = (2.30 + Math.max(0, year - 1940) * 0.068).toFixed(2);
  const worldPop = `${popBillions} billion`;

  const minWage =
    year < 1950 ? "$0.40 per hour" :
    year < 1956 ? "$0.75 per hour" :
    year < 1961 ? "$1.00 per hour" :
    year < 1967 ? "$1.25 per hour" :
    year < 1974 ? "$1.60 per hour" :
    year < 1978 ? "$2.30 per hour" :
    year < 1981 ? "$2.90 per hour" :
    year < 1990 ? "$3.35 per hour" :
    year < 1996 ? "$4.25 per hour" :
    year < 2007 ? "$5.15 per hour" :
    year < 2009 ? "$6.55 per hour" : "$7.25 per hour";

  const housePrice =
    year < 1950 ? "$7,350" :
    year < 1960 ? "$12,400" :
    year < 1965 ? "$18,500" :
    year < 1970 ? "$23,600" :
    year < 1975 ? "$32,500" :
    year < 1980 ? "$54,800" :
    year < 1985 ? "$75,300" :
    year < 1990 ? "$106,100" :
    year < 1995 ? "$127,900" :
    year < 2000 ? "$153,800" :
    year < 2005 ? "$191,300" :
    year < 2010 ? "$232,800" :
    year < 2015 ? "$264,500" :
    year < 2020 ? "$318,400" : "$394,600";

  return { usPresident, ukPm, worldPop, minWage, housePrice };
};

// ============================================================================
// 1. WORLD NEWS -> "🌍 Life in [Year]: The Vibe of the Era"
// Focus purely on the human atmosphere of that year: how neighborhoods sounded on weekends,
// what people argued about over coffee, and the general mood of society without listing inventions.
// ============================================================================
const YEAR_DISTINCTIVE_LIFE: Record<number, [string, string, string]> = {
  1965: [
    "In 1965, the whole world held its breath in front of black-and-white television sets as cosmonaut Alexei Leonov and astronaut Ed White floated outside their capsules in humanity's very first spacewalks high above the Earth.",
    "That same year, 'Beatlemania' reached an unforgettable peak when 55,000 screaming fans packed New York's Shea Stadium for the first giant outdoor stadium rock concert in history.",
    "Out on neighborhood streets, teenagers walked down the sidewalk holding pocket-sized transistor radios up to their ears and gathered around glowing chrome jukeboxes at local cafés."
  ],
  1966: [
    "All through the summer of 1966, radios and café televisions around the globe were tuned to the FIFA World Cup in England—complete with its beloved cartoon lion mascot 'World Cup Willie'—turning every street into a football pitch.",
    "In living rooms everywhere, families were gathering around the first color television sets, marveling at how vibrant evening variety shows and weekend sports looked on screen.",
    "Meanwhile, television viewers tuned in each week for the campy 'Bam! Pow!' comic-book fun of the 'Batman' series and the futuristic debut of 'Star Trek.'"
  ],
  1967: [
    "In 1967, over four hundred million people across twenty-four countries watched the world's very first live global satellite television broadcast, 'Our World,' uniting continents in real time.",
    "Walk through any city square or university park during that colorful 'Summer of Love' and you would see young people strumming acoustic guitars on the grass and wearing flowers in their hair.",
    "Sports fans also witnessed the birth of a giant annual tradition in 1967 when the very first 'Super Bowl' championship game was broadcast live to living rooms everywhere."
  ],
  1968: [
    "In 1968, the entire planet shared a quiet moment of wonder when the Apollo 8 astronauts beamed back the famous 'Earthrise' photograph, showing our blue planet rising above the horizon of the Moon.",
    "At the Mexico City Summer Olympics in 1968, viewers everywhere gasped in amazement as long-jumper Bob Beamon leaped nearly twenty-nine feet through the air to shatter the world record.",
    "On Saturday mornings and weekday evenings, families laughed together at the fast-paced jokes of 'Rowan & Martin's Laugh-In' and cheered on the cartoon villains of 'Wacky Races.'"
  ],
  1969: [
    "Nothing in 1969 could match the historic night when more than 650 million people in every corner of the Earth sat transfixed in front of television sets as Neil Armstrong took humanity's first footsteps on the Moon.",
    "In London in 1969, The Beatles surprised lunchtime commuters in the street by playing an unannounced live concert high up on the rooftop of their Apple Corps headquarters.",
    "That same year, half a million young people camped out together for the legendary 'Woodstock' music festival, while children everywhere met Big Bird and Cookie Monster on the joyful television debut of 'Sesame Street.'"
  ],
  1970: [
    "In the summer of 1970, every café, barbershop, and living room on Earth came alive for the FIFA World Cup in Mexico—the first ever broadcast live in color around the world—as Pelé and Brazil lifted the trophy.",
    "Air travel entered a glamorous new age in 1970 as the first double-decker 'Boeing 747' Jumbo Jets took to the skies, complete with spiral staircases leading to an upstairs passenger lounge.",
    "And out in neighborhoods everywhere, millions of students and families stepped outside to plant trees and host park festivals for the world's very first 'Earth Day.'"
  ],
  1971: [
    "Walk down any shopping street or school hallway in 1971 and one cheerful symbol greeted you from every jacket lapel, notebook, and shop window: the bright yellow 'Have a Nice Day' smiley-face badge.",
    "Up on the Moon in 1971, astronauts gave television viewers the thrill of watching the first four-wheeled 'Lunar Roving Vehicle' bounce across the craters like a space dune buggy.",
    "Back on Earth, families celebrated the grand opening of Walt Disney World's 'Magic Kingdom' in Florida and hummed the famous hilltop commercial song 'I'd Like to Buy the World a Coke.'"
  ],
  1972: [
    "In the summer of 1972, families around the world gathered around the television for the Munich Olympic Games, cheering as swimmer Mark Spitz won seven gold medals and teenager Olga Korbut charmed the crowd on the balance beam.",
    "Even people who had never played a board game followed the front-page excitement in Iceland in 1972, where Bobby Fischer and Boris Spassky faced off in the 'Match of the Century' for the World Chess Championship.",
    "In local cafés and bowling alleys, crowds stopped in their tracks to marvel at 'Pong'—the first coin-operated video arcade cabinet where two players bounced a tiny dot of light across a screen."
  ],
  1973: [
    "In 1973, over one billion people across forty countries tuned in to watch Elvis Presley's 'Aloha from Hawaii'—the very first solo music concert in history beamed live around the globe by satellite.",
    "Later in 1973, ninety million television viewers cheered during the 'Battle of the Sexes' tennis spectacle in the Astrodome as Billie Jean King defeated Bobby Riggs in straight sets.",
    "And when Sunday highways grew quiet during the 1973 fuel-saving weekends, families and teenagers happily took over the empty avenues on ten-speed bicycles and roller skates."
  ],
  1974: [
    "In 1974, people on every continent woke up before dawn or crowded around neighborhood television sets to watch Muhammad Ali's legendary 'Rumble in the Jungle' boxing victory in Kinshasa.",
    "During the 1974 FIFA World Cup in West Germany, kids in every park and alleyway practiced Franz Beckenbauer's passes and Johan Cruyff's famous 'Cruyff Turn' with a leather football.",
    "On television in 1974, the 1950s sitcom 'Happy Days' debuted and turned leather-jacketed mechanic Arthur 'Fonzie' Fonzarelli and his thumbs-up 'Ayyy!' into a worldwide catchphrase."
  ],
  1975: [
    "In 1975, the favorite craze at school lunch tables and cafés was the color-changing 'Mood Ring'—friends held their hands up to the light and laughed as the glass stone shifted from blue to green or black.",
    "High in orbit in 1975, the whole world watched a historic moment of friendship in space when an American Apollo capsule and a Soviet Soyuz spacecraft docked together and the crews shook hands.",
    "On weekend nights, friends laced up four-wheeled skates to glide under spinning mirror balls at the local roller rink or stayed up late for the debut season of the comedy show 'Saturday Night Live.'"
  ],
  1976: [
    "In 1976, families around the world sat glued to the Montreal Summer Olympics and gasped in unison when fourteen-year-old gymnast Nadia Comăneci scored the first 'Perfect 10.0' in Olympic history—breaking the scoreboard as '1.00.'",
    "People also looked up at the sky in wonder in 1976 as the sleek, needle-nosed supersonic 'Concorde' passenger jet began flying travelers across the Atlantic at twice the speed of sound.",
    "On television, Kermit the Frog and Miss Piggy charmed the entire planet with the debut of 'The Muppet Show,' while NASA's 'Viking 1' beamed back the first color photos from Mars."
  ],
  1977: [
    "In 1977, NASA launched the 'Voyager 1' and 'Voyager 2' space probes toward the stars, each carrying a golden phonograph record filled with Earth's greatest music and greetings in fifty-five languages.",
    "Football fans around the globe celebrated the career of Pelé in 1977 as the Brazilian legend played his emotional farewell exhibition match before 75,000 cheering spectators.",
    "And when Friday night arrived in 1977, the infectious beat of disco music had young people dressing up in their sharpest collars to dance across illuminated glass floors."
  ],
  1978: [
    "In the summer of 1978, clouds of blue-and-white paper confetti rained down from stadium balconies like snowstorms as Mario Kempes led Argentina to victory in the 1978 FIFA World Cup.",
    "In newspaper comic strips around the world, a lazy, lasagna-loving orange cat named 'Garfield' made his debut in 1978 and immediately had families clipping cartoons to the refrigerator door.",
    "Meanwhile, early-morning parks and city sidewalks filled with millions of joggers in striped tube socks and terrycloth headbands as the recreational running craze swept the globe."
  ],
  1979: [
    "In 1979, fast-food trips became a childhood event with the debut of the colorful circus-themed cardboard 'Happy Meal' box—complete with puzzles on the sides and a surprise plastic toy hidden inside.",
    "On weekend nights, roller-disco rinks and outdoor block parties reached peak popularity as friends glided on four-wheeled skates to upbeat funk and disco basslines.",
    "For sports fans in 1979, television changed forever with the launch of 'ESPN,' the first 24-hour network dedicated entirely to sports highlights and live games."
  ],
  1980: [
    "In 1980, arcades and pizza parlors around the world echoed with the rhythmic 'waka-waka-waka' sound of Namco's cheerful yellow circle 'Pac-Man' gobbling dots and dodging colorful ghosts.",
    "Sports fans everywhere jumped off their couches cheering in 1980 during the unforgettable 'Miracle on Ice' college hockey upset at the Lake Placid Winter Olympics.",
    "And on television in 1980, over 350 million viewers around the globe tuned in to the famous 'Who shot J.R.?' cliffhanger episode of the prime-time drama 'Dallas.'"
  ],
  1981: [
    "In 1981, an estimated 750 million people across the globe gathered around television sets to watch the fairy-tale royal wedding of Prince Charles and Lady Diana Spencer in London.",
    "Classrooms and offices also stopped everything in 1981 to watch NASA's white-and-black winged Space Shuttle 'Columbia' roar into orbit and glide back down to land on a runway like an airplane.",
    "That same year, the launch of the 24-hour music channel 'MTV' changed youth culture overnight—suddenly, you didn't just listen to hit songs on the radio, you watched them as mini-movies on screen."
  ],
  1982: [
    "In the summer of 1982, streets emptied out across every continent during the FIFA World Cup in Spain as families and neighbors crowded into cafés and living rooms to watch Paolo Rossi's Italy lift the trophy.",
    "Music lovers in 1982 marveled at the release of the very first shiny five-inch optical 'Compact Discs' (CDs) alongside Michael Jackson's 'Thriller,' which quickly became the best-selling album in history.",
    "Meanwhile, neighborhood video rental shops began opening on street corners, letting families bring home a heavy top-loading VHS cassette player to watch movies in their own living room."
  ],
  1983: [
    "In 1983, after watching Michael Jackson debut his gravity-defying 'Moonwalk' live on television, kids in every country on Earth put on white socks and practiced sliding backward across the kitchen floor.",
    "When the 14-minute cinematic music video for 'Thriller' premiered in 1983, whole families gathered around the living-room television as if it were a Friday-night movie premiere.",
    "Out on the streets, colorful Swiss plastic 'Swatch' watches became such a joyful craze in 1983 that teenagers wore two or three strapped to the same wrist."
  ],
  1984: [
    "Walk through any city square, schoolyard, or park in 1984 and you would spot a circle of kids gathered around a flattened piece of cardboard on the pavement, cheering as breakdancers spun on their backs to a cassette boombox.",
    "At the 1984 Los Angeles Summer Olympics, television audiences marveled as a pilot wearing a real rocket-powered jetpack flew across the stadium during the opening ceremony and Carl Lewis won four gold medals.",
    "That same year, NASA astronaut Bruce McCandless stunned the world with the iconic photograph of a human floating completely untethered in the blackness of space using a jetpack backpack."
  ],
  1985: [
    "In 1985, nearly two billion people across 150 countries opened their windows and watched the same broadcast at the exact same time as the 'Live Aid' charity concerts in London and Philadelphia united the world through music.",
    "On basketball courts everywhere in 1985, rookie sensation Michael Jordan captivated fans with his high-flying dunks and debuted his famous red-and-black 'Air Jordan 1' sneakers.",
    "And in supermarket aisles in 1985, soft-drink fans staged such a passionate uproar over the taste of 'New Coke' that the company brought back the original formula as 'Coca-Cola Classic' just 79 days later."
  ],
  1986: [
    "All through the summer of 1986, the entire world was captivated by the FIFA World Cup in Mexico—where fans in every café gasped at Diego Maradona's solo 'Goal of the Century' and stood up to do the stadium 'Mexican Wave.'",
    "On clear nights in 1986, families stepped out into backyards with binoculars to spot 'Halley's Comet' streaking across the sky on its once-every-76-years visit past Earth.",
    "That same year, over five million people stood side-by-side holding hands across highways and towns for the 'Hands Across America' charity event, while Pixar debuted its little hopping desk lamp 'Luxo Jr.'"
  ],
  1987: [
    "In 1987, you couldn't attend a wedding, school party, or family gathering without seeing two friends try to recreate the famous final dance and overhead lift from the hit movie 'Dirty Dancing.'",
    "On Saturday mornings in 1987, kids poured bowls of cereal to watch the brand-new cartoon 'DuckTales' before riding their BMX bicycles around the neighborhood until the streetlights came on.",
    "Meanwhile, television viewers in 1987 got their very first glimpse of a crude, hilarious yellow animated family called 'The Simpsons' in short two-minute skits on 'The Tracey Ullman Show.'"
  ],
  1988: [
    "In 1988, it was impossible to walk past an open shop doorway or car window without smiling at the sunny, whistled melody of Bobby McFerrin's global #1 hit 'Don't Worry, Be Happy.'",
    "Sports fans around the world in 1988 fell in love with the true underdog story of the first 'Jamaican Bobsled Team' at the Calgary Winter Olympics and sprinter Florence Griffith-Joyner at the Seoul Summer Games.",
    "At the same time, Nike introduced its famous three-word sports motto—'Just Do It'—while shiny Compact Discs began overtaking vinyl records in music stores everywhere."
  ],
  1989: [
    "In 1989, families in every country sat in emotional awe around the evening television news as joyful crowds in denim jackets climbed atop the Berlin Wall to celebrate a reunited city.",
    "On television in 1989, 'The Simpsons' debuted with their very first full-length half-hour episode, turning Bart Simpson's 'Eat my shorts!' and 'Cowabunga!' into instant playground catchphrases.",
    "Meanwhile, 'Seinfeld' aired its very first pilot episode in 1989, and computer scientist Tim Berners-Lee quietly invented the 'World Wide Web' at CERN."
  ],
  1990: [
    "The summer of 1990 was pure magic from start to finish, as the 'Italia '90' FIFA World Cup united every street corner and café on Earth to the soaring operatic voice of Luciano Pavarotti singing 'Nessun Dorma.'",
    "In 1990, the whole world also watched in celebration as Nelson Mandela walked free in South Africa with his fist raised, while NASA's Space Shuttle deployed the 'Hubble Space Telescope' into orbit.",
    "Out on neighborhood sidewalks in 1990, kids glided past on neon-wheeled inline 'Rollerblades' and wore brightly colored Fresh Prince of Bel-Air baseball caps backward."
  ],
  1991: [
    "In 1991, NBA basketball became a truly global obsession as kids on playgrounds in every country stuck out their tongues like Michael Jordan while watching the Chicago Bulls win their very first championship.",
    "At the cinema in 1991, audiences burst into applause during the computer-animated golden ballroom dance of Disney's 'Beauty and the Beast'—the first animated film ever nominated for Best Picture.",
    "Meanwhile, high in the Alps in 1991, hikers made the fascinating discovery of 'Ötzi the Iceman,' a 5,300-year-old traveler preserved in glacier ice with all his gear intact."
  ],
  1992: [
    "In the summer of 1992, the Barcelona Olympic Games brought the whole planet together around the television as a flaming arrow lit the stadium cauldron and the USA basketball 'Dream Team' dazzled the world.",
    "In 1992, 'Disneyland Paris' opened its fairy-tale castle gates in Europe, while 'Cartoon Network' launched the world's first 24-hour all-cartoon television channel.",
    "Teenagers everywhere spent Sunday afternoons in 1992 sitting beside a twin-deck boombox with a finger hovering over the 'Record' button to build the ultimate 90-minute cassette mixtape off the FM radio."
  ],
  1993: [
    "In 1993, television viewers everywhere smiled at the famous 'Got Milk?' commercials, while school cafeterias and delis filled with glass bottles of Snapple iced tea with quirky trivia facts printed inside every metal cap.",
    "High in orbit in 1993, spacewalking astronauts installed corrective lenses on the Hubble Space Telescope, suddenly unveiling breathtaking color photographs of distant nebulae and galaxies.",
    "Daily life in 1993 still had a wonderful offline charm: if you wanted to see if a friend was free on Saturday afternoon, you simply rode your bike over and knocked on their front door."
  ],
  1994: [
    "In the summer of 1994, the FIFA World Cup in the United States broke every attendance record in history, ending in a dramatic penalty shootout where Brazil lifted their fourth golden trophy.",
    "In 1994, Queen Elizabeth II and French President François Mitterrand officially opened the 'Channel Tunnel' (Chunnel), allowing passenger trains to travel beneath the sea between England and France in thirty-five minutes.",
    "And on television in 1994, six twenty-somethings debuted in the sitcom 'Friends,' inspiring a worldwide love for cozy neighborhood coffeehouses where friends talked on couches over giant ceramic mugs."
  ],
  1995: [
    "In 1995, the whole world watched a historic moment of unity at the Rugby World Cup Final in Johannesburg as President Nelson Mandela wore the green Springboks jersey and handed the trophy to captain François Pienaar.",
    "Space fans stared in awe in 1995 when NASA's 'Galileo' spacecraft arrived at Jupiter after a six-year journey and dropped an atmospheric probe into the giant planet's swirling clouds.",
    "Meanwhile, British band Oasis had everyone singing 'Wonderwall' around acoustic guitars at parks and house parties across the globe."
  ],
  1996: [
    "In 1996, it was impossible to attend a wedding, school party, or summer festival anywhere in the world without seeing the entire crowd line up in rows to do the eight-step arm movements to Los Del Rio's 'Macarena.'",
    "At the 1996 Centennial Summer Olympics in Atlanta, television viewers around the globe cheered in emotion when boxing legend Muhammad Ali stepped out of the shadows to light the Olympic cauldron.",
    "On Friday evenings in 1996, the universal family ritual was walking down to the neighborhood Blockbuster or local video rental shop to pick out two VHS tapes before the 'New Releases' wall was empty."
  ],
  1997: [
    "In 1997, millions of people tuned into the news in amazement as NASA's six-wheeled 'Sojourner' rover rolled down a ramp onto the dusty red rocks of Mars and beamed back panoramic color photos.",
    "On the golf course in 1997, twenty-one-year-old phenomenon Tiger Woods stunned the sports world by winning the Masters Tournament by a record twelve strokes in his signature Sunday red shirt.",
    "That same year, newspapers everywhere marveled at 'Dolly the Sheep' in Scotland, while bookstores in the UK stocked the very first copies of 'Harry Potter and the Philosopher's Stone.'"
  ],
  1998: [
    "The summer of 1998 belonged to the carnival atmosphere of the FIFA World Cup in France—where Zinedine Zidane's two headers in Paris and Ricky Martin's anthem 'La Copa de la Vida' echoed from every street café on Earth.",
    "High in orbit in 1998, astronauts connected the very first modules of the 'International Space Station' 250 miles above the Earth.",
    "And in baseball stadiums in 1998, sports fans everywhere followed the thrilling summer-long home-run chase between Mark McGwire and Sammy Sosa."
  ],
  1999: [
    "All through 1999, every dinner-table and coffee-shop conversation circled back to one big countdown: what would the world look like when the calendar flipped to the year 2000?",
    "On television in 1999, families in dozens of countries sat on the edge of the sofa shouting answers at the screen during the worldwide quiz-show phenomenon 'Who Wants to Be a Millionaire?'",
    "Meanwhile, 90,000 fans packed the Rose Bowl in 1999 to watch Brandi Chastain's dramatic penalty kick win the FIFA Women's World Cup, while SpongeBob SquarePants debuted under the sea on Nickelodeon."
  ],
  2000: [
    "The year 2000 opened with the biggest global celebration in modern memory, as consecutive walls of fireworks lit up the sky from Sydney Harbour and the Pyramids of Giza to the Eiffel Tower and Times Square.",
    "Later in 2000, the whole world tuned in to the Sydney Summer Olympics in Australia to watch Cathy Freeman light the water-ringed cauldron, while the first permanent crew moved aboard the 'International Space Station.'",
    "On television in 2000, the reality-show phenomenon exploded overnight as millions debated who would be voted off the island on 'Survivor' and out of the house on 'Big Brother.'"
  ],
  2001: [
    "In 2001, a pocket-sized white music player called the 'iPod' debuted with a mechanical scroll wheel that could hold a thousand songs in your pocket—making white earphone cords the newest sight on city streets.",
    "In Italy in 2001, the famous Leaning Tower of Pisa officially reopened to visitors after an eleven-year engineering project stabilized its tilt, while Dennis Tito became the world's first space tourist.",
    "And at movie theaters and bookstores around the globe in 2001, fantasy adventures ruled the year as millions lined up for both 'The Lord of the Rings: The Fellowship of the Ring' and Pixar's 'Monsters, Inc.'"
  ],
  2002: [
    "In 2002, because the FIFA World Cup was hosted in South Korea and Japan, millions of fans woke up at dawn or watched live matches in school classrooms as Ronaldo's two goals in Yokohama gave Brazil their fifth trophy.",
    "At local barbershops in 2002, half the kids in town asked for Ronaldo's famous front-triangle World Cup haircut or David Beckham's mohawk.",
    "Meanwhile, over 300 million Europeans celebrated a historic everyday change in 2002 as crisp 'Euro' banknotes and coins replaced twelve national currencies overnight."
  ],
  2003: [
    "In 2003, nobody kept their mobile phone on silent—walking down a busy street or sitting in a café meant hearing a dozen different musical 'polyphonic ringtones' chiming proudly from pockets and handbags.",
    "Silver clamshell 'flip phones' with tiny built-in cameras were the ultimate status symbol in 2003, and snapping a flip phone shut with one hand at the end of a call felt effortlessly cool.",
    "In the skies of 2003, crowds gathered on rooftops and airport fences to wave a fond farewell to the supersonic 'Concorde' jet on its final retirement flights, while NASA launched the twin Mars rovers 'Spirit' and 'Opportunity.'"
  ],
  2004: [
    "Walk down any street or tune into any sports match in 2004 and you would spot a bright yellow silicone 'Livestrong' charity wristband on almost every wrist.",
    "In the summer of 2004, the Olympic Games returned to their ancient birthplace in Athens, Greece, while over 52 million viewers gathered around the TV for the emotional final episode of 'Friends.'",
    "When going out with friends on Friday night in 2004, everyone carried a pocket-sized silver digital camera to snap dozens of flash photos of the evening."
  ],
  2005: [
    "In 2005, football fans around the world witnessed one of the greatest comebacks in sports history during the 'Miracle of Istanbul,' when Liverpool erased a 3–0 halftime deficit to win the UEFA Champions League Final on penalties.",
    "Aviation fans stared in amazement in 2005 as the double-decker 'Airbus A380'—the largest passenger airliner ever built—took off on its maiden flight in France.",
    "Meanwhile, every coffee-shop table and commuter train in 2005 was filled with people penciling numbers into newspaper 'Sudoku' grids and turning the pages of 'The Da Vinci Code.'"
  ],
  2006: [
    "All through the summer of 2006, every outdoor café and town square on Earth was packed with fans watching the FIFA World Cup in Germany—culminating in Italy's penalty-shootout victory under the Berlin night sky.",
    "In school classrooms and around dinner tables in 2006, lively debates broke out when astronomers officially voted that distant 'Pluto' was a dwarf planet rather than the ninth planet.",
    "That same year, 'Twitter' launched with its strict 140-character limit, while Disney Channel's 'High School Musical' had kids everywhere singing 'We're All in This Together.'"
  ],
  2007: [
    "In 2007, people crowded around electronics-store windows in total amazement to see the very first 'iPhone'—marveling at how you could slide your finger across glass and pinch with two fingers to zoom in on a photo.",
    "Outside bookstores around the globe in 2007, millions of readers stayed up past midnight wearing wizard hats and striped scarves for the release of the seventh and final 'Harry Potter' book.",
    "And at parties and schoolyards everywhere in 2007, the moment Soulja Boy's 'Crank That' came on the speakers, the entire room lined up in rows to do the 'Superman' dance step together."
  ],
  2008: [
    "In 2008, the whole world sat glued to the television for the dazzling Beijing Summer Olympics—cheering in awe as Usain Bolt shattered the 100-meter world record with his shoelaces untied and Michael Phelps won eight gold medals.",
    "At cafés and dinner tables in 2008, anyone who owned an early touchscreen smartphone delighted in opening the viral 'iBeer' app and tilting the phone against their mouth to pretend they were drinking golden liquid from the screen.",
    "Meanwhile, moviegoers in 2008 stayed in their seats until the very end of the credits as Robert Downey Jr.'s 'Iron Man' launched the Marvel Cinematic Universe."
  ],
  2009: [
    "In 2009, the whole world celebrated the 'Miracle on the Hudson' after Captain Chesley 'Sully' Sullenberger safely glided an airliner onto the icy Hudson River in New York with all 155 passengers surviving.",
    "On the athletics track in Berlin in 2009, Jamaican sprinter Usain Bolt left the planet speechless once again by lowering his own 100-meter world record to an astonishing 9.58 seconds.",
    "And across city train stations, shopping malls, and wedding receptions in 2009, spontaneous 'Flash Mobs' became the joyful craze of the year as hundreds of people suddenly broke into synchronized dance."
  ],
  2010: [
    "If you close your eyes and remember the summer of 2010, one sound immediately rushes back: the nonstop buzz of plastic 'Vuvuzela' horns and Shakira's 'Waka Waka' echoing from every café during the first African FIFA World Cup in South Africa.",
    "Even people who didn't follow football tuned in before every match in 2010 to see which country's flag 'Paul the Octopus' would pick from his glass aquarium tank—correctly predicting eight matches in a row!",
    "That same year, Apple unveiled the first 'iPad' tablet, and smartphone owners began adding vintage square borders to their coffee photos on a brand-new app called 'Instagram.'"
  ],
  2011: [
    "In 2011, the funniest sight in parks, schoolyards, and tourist landmarks around the world was the viral 'Planking' craze—where people lay completely flat and stiff as a wooden board across benches while a friend snapped a photo.",
    "Around two billion television viewers tuned in during 2011 to watch the royal wedding of Prince William and Kate Middleton at Westminster Abbey in London.",
    "Among friends in 2011, the ultimate way to stay connected all day was trading eight-character 'BlackBerry Messenger' (BBM) PIN codes and hearing that distinctive ping in your pocket."
  ],
  2012: [
    "In 2012, there wasn't a single wedding, schoolyard, or street festival on Earth where people weren't crossing their wrists and galloping like a horse to PSY's 'Gangnam Style'—the first video in history to pass one billion views on YouTube.",
    "At the 2012 London Summer Olympics, audiences laughed out loud as 'Mr. Bean' played a one-finger keyboard note with the symphony orchestra and James Bond escorted Queen Elizabeth II to a helicopter parachute stunt.",
    "Later in 2012, tens of millions watched live in breathless silence as skydiver Felix Baumgartner stepped out of a helium balloon capsule at the edge of space and broke the sound barrier in freefall."
  ],
  2013: [
    "In 2013, Oxford Dictionaries officially named 'Selfie' the Word of the Year—and everywhere you walked in the world, groups of friends were squeezing shoulder-to-shoulder with one arm stretched out (or using a telescopic metal 'selfie stick') to snap a front-camera photo together.",
    "Classrooms, sports teams, and offices in every country filmed hilarious thirty-second 'Harlem Shake' videos in 2013, where one person danced alone in a helmet for fifteen seconds before the beat dropped and the whole room erupted in wild costumes.",
    "And on television and laptop screens worldwide in 2013, friends gathered in total silence for the unforgettable final episodes of the series 'Breaking Bad' as Walter White's story came to an end."
  ],
  2014: [
    "All through the summer of 2014, neighborhood yards and city streets around the world echoed with gasps and laughter as millions of ordinary people, athletes, and celebrities dumped buckets of ice water over their heads for the charity 'ALS Ice Bucket Challenge.'",
    "Every café patio and living room on Earth pulsed with the colors and drama of the 2014 FIFA World Cup in Brazil, while Ellen DeGeneres's star-studded group selfie at the Oscars became the most shared photo on the internet.",
    "Meanwhile, Pharrell Williams's upbeat anthem 'Happy' inspired people in hundreds of cities across the globe in 2014 to film joyful street-dance videos in their own neighborhoods."
  ],
  2015: [
    "In 2015, a single photograph of a striped dress divided every family dinner table, classroom, and office on the planet into two passionate camps: half the world swore '#TheDress' was blue-and-black, while the other half insisted it was white-and-gold!",
    "People in every country also stared in wonder at their screens in 2015 as NASA's 'New Horizons' spacecraft beamed back the first close-up portrait of distant Pluto, revealing a giant heart-shaped glacier across its icy surface.",
    "And in every school photo, football goal celebration, and wedding dance floor of 2015, friends tucked their face into the crook of their elbow to hit the viral 'Dab' pose."
  ],
  2016: [
    "Walk into any school cafeteria, park, or living room in 2016 and you would hear the rhythmic plastic thud of the 'Water Bottle Flip' challenge—followed by a loud roar whenever a half-full bottle spun through the air and landed standing straight up.",
    "Entire classrooms, sports locker rooms, and family gatherings in 2016 also froze completely motionless like wax statues while a camera moved through the room to Black Beatles for the viral 'Mannequin Challenge.'",
    "At the 2016 Rio Summer Olympics, the whole world grinned as Usain Bolt looked sideways and smiled for the cameras mid-sprint on his way to nine career gold medals, while movie fans cheered as Leonardo DiCaprio finally won his first Oscar."
  ],
  2017: [
    "Out in parks, shopping streets, and school hallways in 2017, friends would suddenly shout 'The Floor is Lava!'—forcing everyone in the group to laugh and scramble onto a bench, chair, or step within five seconds so their shoes wouldn't touch the ground.",
    "All summer long in 2017, the unmistakable Latin guitar rhythm of Luis Fonsi and Daddy Yankee's 'Despacito' poured out of every car window, beach kiosk, and café speaker on Earth, becoming the most-watched video in history.",
    "And at midday in 2017, millions of neighbors stepped out onto front lawns, rooftops, and sidewalks together, sharing cardboard solar glasses as a total solar eclipse turned afternoon daylight into twilight."
  ],
  2018: [
    "In the summer of 2018, every café screen and town square echoed with the roars of the FIFA World Cup in Russia as teenaged Kylian Mbappé and France lifted the trophy in a thrilling six-goal final in Moscow.",
    "At coffee tables and offices everywhere in 2018, friends huddled around a single phone speaker in total disbelief over the viral 'Yanny or Laurel' audio clip, amazed that two people sitting side-by-side could hear two completely different words.",
    "Earlier in 2018, nearly two billion viewers around the world tuned in to watch the sunlit royal wedding of Prince Harry and Meghan Markle at Windsor Castle."
  ],
  2019: [
    "In 2019, the playful challenge taking over streets and hallways everywhere was the 'Bottle Cap Challenge'—where friends filmed themselves in slow motion trying to unscrew the cap off a water bottle with a single spinning kick without knocking the bottle over.",
    "Astronomers in 2019 unveiled a glowing orange ring of light across every newspaper front page on Earth: the very first real photograph ever captured of a supermassive 'Black Hole' in deep space.",
    "And on Sunday evenings in 2019, millions of fans across every time zone gathered in darkened living rooms to watch the final season of the fantasy epic 'Game of Thrones' at the exact same hour."
  ],
  2020: [
    "In 2020, kitchens around the world turned into cozy home cafés as millions of families hand-whisked spoonfuls of instant coffee, sugar, and water hundreds of times to make frothy 'Dalgona Whipped Coffee' over cold milk and baked homemade banana bread.",
    "Classic drive-in movie theaters and neighborhood rooftop concerts made a nostalgic comeback in 2020, letting families watch films under the stars from the comfort of their parked cars.",
    "Space fans also cheered in 2020 when SpaceX's sleek white 'Crew Dragon' capsule—controlled by touchscreen displays—launched astronauts into orbit to dock with the International Space Station."
  ],
  2021: [
    "In 2021, Netflix's Korean series 'Squid Game' became the most talked-about show on Earth—inspiring families and friends everywhere to melt sugar and baking soda in a pan and try carving shapes out of 'Dalgona' honeycomb candy with a toothpick without cracking it.",
    "In kitchens everywhere in 2021, people baked the viral oven-roasted block of feta cheese and cherry tomatoes pasta dish while humming the nineteenth-century sea shanty 'Wellerman.'",
    "Television fans also shared an emotional nostalgia trip in 2021 when all six cast members of 'Friends' walked back onto their original studio soundstage together for their first reunion in seventeen years."
  ],
  2022: [
    "In 2022, the entire planet held its breath together in cafés, plazas, and living rooms during the historic FIFA World Cup in Qatar—culminating in Lionel Messi and Argentina's unforgettable final victory over France.",
    "Everyone also stared in awe at their screens in 2022 as the newly launched 'James Webb Space Telescope' beamed back the deepest, sharpest glittering color photographs of distant galaxies and star nurseries ever seen.",
    "And in movie theaters in 2022, groups of teenagers around the world dressed up in full formal suits and ties just to watch 'Minions: The Rise of Gru' together as '#GentleMinions.'"
  ],
  2023: [
    "In 2023, kitchen tables around the world turned into craft workshops as friends strung colorful plastic letter beads onto elastic cords to trade handmade friendship bracelets at stadium concerts and summer festivals.",
    "At dinner tables and cafés in 2023, everyone was laughing over the same viral question asked to husbands, brothers, and fathers everywhere: 'How often do you think about the Roman Empire?'",
    "Meanwhile, hundreds of millions watched live in celebration in 2023 as India's 'Chandrayaan-3' spacecraft made history by landing softly near the unexplored south pole of the Moon."
  ],
  2024: [
    "In the summer of 2024, the Paris Olympic Games turned the world's most famous landmarks into an open-air stadium—with everyone talking about the cool, casual posture of Turkish sharpshooter Yusuf Dikeç winning silver with one hand in his pocket.",
    "At sweet shops and bakeries in almost every country in 2024, people lined up down the sidewalk to break open thick bars of crispy pistachio-and-knafeh 'Dubai Chocolate.'",
    "And on weekend mornings in 2024, city parks and waterfronts filled with hundreds of young people jogging together in massive neighborhood 'Run Clubs' before sharing coffee and pastries outdoors."
  ]
};

const MONTH_SEASONAL_STREETSCAPE: Record<number, { seasonOpening: (year: number) => string; closingRoutine: (year: number) => string }> = {
  1: {
    seasonOpening: (y) => `January in ${y} greeted the neighborhood with crisp winter air, frosted front windshields, and pale morning sunlight glinting off quiet residential roofs as plumes of exhaust rose from warming driveways.`,
    closingRoutine: (y) => `As early winter dusk settled over the streets of ${y} around five o'clock, warm amber lamps lit up behind living-room curtains and the smell of slow-simmering dinner drifted down the hallway.`
  },
  2: {
    seasonOpening: (y) => `February in ${y} carried that unmistakable late-winter stillness, when bare tree branches framed the sky and local bakery windows steamed up with the warmth of fresh bread and paper Valentine decorations.`,
    closingRoutine: (y) => `By late Sunday afternoon in ${y}, families returned from weekend errands with rosy cheeks, hanging heavy wool coats by the door and gathering in the kitchen for the evening.`
  },
  3: {
    seasonOpening: (y) => `March in ${y} arrived with the first restless breeze of early spring, melting the last patches of winter frost along the curb and coaxing neighbors back out onto their front steps after work.`,
    closingRoutine: (y) => `With the afternoon light stretching a little longer each week in ${y}, sidewalks stayed busy with kids on bicycles and neighbors chatting across the driveway fence until dinner.`
  },
  4: {
    seasonOpening: (y) => `April in ${y} washed the streets in fresh spring rain and pale pink blossoms, when kitchen windows were finally propped open to let the mild afternoon breeze drift through the house.`,
    closingRoutine: (y) => `On weekend mornings in ${y}, the sound of broom bristles sweeping off front porches and the crack of baseballs at the local park announced that spring had truly arrived.`
  },
  5: {
    seasonOpening: (y) => `May in ${y} wrapped the neighborhood in lush green leaves and golden late-spring warmth, with garden centers stacking flats of marigolds and geraniums along the sidewalk.`,
    closingRoutine: (y) => `As twilight lingered late into the evening in ${y}, families moved dinner out onto the back patio and kids chased fireflies across the freshly cut grass.`
  },
  6: {
    seasonOpening: (y) => `June in ${y} opened with the pure, carefree electricity of early summer—school doors swinging shut for the season, canvas awnings shading storefront windows, and bicycles leaning outside the corner ice-cream parlor.`,
    closingRoutine: (y) => `Long after the sun dipped below the rooftops in ${y}, the neighborhood stayed awake with the hum of box fans in upstairs windows and friends talking on the front stoop.`
  },
  7: {
    seasonOpening: (y) => `July in ${y} shimmered with peak midsummer heat, where heat waves danced above the asphalt, lawn sprinklers ticked rhythmically across green yards, and the jingle of the ice-cream truck echoed two blocks away.`,
    closingRoutine: (y) => `When the warm purple twilight finally cooled the pavement in ${y}, the whole block smelled like charcoal grills and citronella candles as neighbors lingered outside until midnight.`
  },
  8: {
    seasonOpening: (y) => `August in ${y} had that golden, unhurried late-summer glow—cicadas buzzing high in the shade trees during the afternoon and department-store windows unveiling their first autumn displays for the new school year.`,
    closingRoutine: (y) => `People savored every last warm weekend evening of ${y}, sitting on porch swings with tall glasses of iced tea and watching the streetlights flicker on one by one.`
  },
  9: {
    seasonOpening: (y) => `September in ${y} brought a crisp, energizing shift to the air as morning dew sparkled on the grass, yellow school buses rumbled down the avenue, and stationery windows filled with fresh notebooks and sharpened pencils.`,
    closingRoutine: (y) => `Weekend afternoons in ${y} carried the roar of stadium crowds on portable radios and the cozy ritual of pulling a favorite knit sweater from the closet for an evening walk.`
  },
  10: {
    seasonOpening: (y) => `October in ${y} painted the neighborhood in deep amber and crimson, with dry leaves crunching underfoot along the sidewalk and local hardware and grocery windows stacked with pumpkins and jugs of apple cider.`,
    closingRoutine: (y) => `As the crisp autumn sun set early behind the trees in ${y}, the scent of fireplace woodsmoke curled into the evening sky and porch lights glowed warmly down the block.`
  },
  11: {
    seasonOpening: (y) => `November in ${y} wrapped the streets in brisk late-autumn air, where golden leaves swirled past brick storefronts, breath turned visible on morning walks, and diner windows fogged up with the warmth of coffee and pie.`,
    closingRoutine: (y) => `By late afternoon in ${y}, downtown shop windows were beginning to twinkle with early holiday string lights, drawing families inside from the chilly sidewalk.`
  },
  12: {
    seasonOpening: (y) => `December in ${y} transformed every street into a glowing winter postcard, with evergreen wreaths hung on front doors, department-store windows dressed in mechanical holiday scenes, and shoppers carrying brown paper parcels under their arms.`,
    closingRoutine: (y) => `Inside neighborhood homes in ${y}, evenings were spent gathered around the warm glow of the living room with hot cocoa while frost traced delicate patterns across the windowpane.`
  }
};

const YEAR_PLAYSTATION_AND_PC_VIBE: Record<number, [string, string]> = {
  1965: [
    "Long before home PlayStation consoles existed, teenagers in 1965 dropped silver coins into electromechanical pinball tables and arcade shooting galleries at the corner penny arcade.",
    "Meanwhile, the word 'computer' in 1965 meant room-sized IBM System/360 mainframes humming behind glass walls with spinning magnetic tape reels and stacks of paper punch cards."
  ],
  1966: [
    "Years before digital game consoles reached living rooms, friends in 1966 crowded around Sega's coin-operated 'Periscope' arcade cabinet to peer through a plastic viewfinder and launch coloured light torpedoes.",
    "In university labs and offices in 1966, early engineers typed commands on clattering Teletype keyboards that printed computer output onto long rolls of green-and-white striped paper."
  ],
  1967: [
    "In 1967, television viewers had no idea that engineer Ralph Baer was secretly building the wooden 'Brown Box' prototype that would one day lead to every home video game console and PlayStation.",
    "At work and school in 1967, the closest thing to a personal computer was a desktop electronic calculator that displayed glowing orange numbers inside glass Nixie tubes."
  ],
  1968: [
    "Long before 3D racing games, arcade fans in 1968 gripped the metal steering wheel of Kasco's mechanical cabinet 'Indy 500' to weave a miniature car past illuminated rivals.",
    "And in 1968, computer pioneer Douglas Engelbart amazed an auditorium in San Francisco by demonstrating a wooden block on wheels that he called the world's very first computer 'mouse.'"
  ],
  1969: [
    "In 1969, arcade regulars gathered around Chicago Coin's 'Speedway' driving cabinet to test their reflexes on a glowing rear-projected track.",
    "Meanwhile, the world marveled at the Apollo Guidance Computer in 1969—which navigated astronauts all the way to the Moon using less memory than a single digital photograph—while four university computers connected to form the first 'ARPANET.'"
  ],
  1970: [
    "At boardwalk arcades in 1970, friends competed on electromechanical baseball cabinets and mechanical air-hockey tables long before home game consoles sat beneath the TV.",
    "In computer labs in 1970, programmers loaded software by feeding ribbons of perforated paper tape into minicomputers the size of kitchen refrigerators."
  ],
  1971: [
    "In 1971, arcade history changed forever when players stepped up to the futuristic fiberglass cabinet of 'Computer Space'—the very first coin-operated video game ever built.",
    "That same year, computer engineers unveiled the tiny Intel 4004 microprocessor chip and the 8-inch flexible 'floppy disk,' laying the foundation for every home computer to come."
  ],
  1972: [
    "In 1972, before PlayStation or modern controllers were ever imagined, players crowded into arcades to turn the metal dial on Atari's 'Pong' cabinet and hear its unmistakable 'beep-boop' bounce.",
    "And in school classrooms in 1972, students got their first taste of computer gaming by typing survival choices on paper teletypes in the original 'The Oregon Trail.'"
  ],
  1973: [
    "In 1973, arcade friends raced tiny pixelated rockets against a ticking timer in Atari's coin-operated 'Space Race' and navigated fiberglass mazes in 'Gotcha.'",
    "Meanwhile, inside Xerox PARC in 1973, engineers switched on the experimental 'Alto' desktop computer—the first machine in history with a graphical desktop screen, icons, and a three-button mouse."
  ],
  1974: [
    "Walk into an arcade in 1974 and you would see teenagers gripping the real steering wheel and gear shifter of Atari's black-and-white driving cabinet 'Gran Trak 10.'",
    "On the cover of electronics magazines in 1974, hobbyists stared in excitement at the 'Altair 8800'—a blue metal microcomputer kit that you programmed by flipping rows of silver toggle switches."
  ],
  1975: [
    "In 1975, families plugged Atari's dedicated 'Home Pong' unit into the living-room television, marveling that they could play video tennis right on their own sofa.",
    "At neighborhood computer clubs in 1975, hobbyists soldered circuit boards in their garages as two young friends named Bill Gates and Paul Allen founded a tiny software startup called 'Microsoft.'"
  ],
  1976: [
    "In 1976, arcade crowds gathered around Atari's 'Breakout'—complete with colored cellophane strips across the monitor—to bounce a glowing ball into rows of bricks.",
    "And in a California garage in 1976, Steve Wozniak and Steve Jobs hand-built the 'Apple I' circuit board, sparking the birth of the home personal computer revolution."
  ],
  1977: [
    "Years before disc-based consoles like the PlayStation, 1977 brought the first programmable cartridge consoles into living rooms, turning the family TV into a glowing pixel battleground.",
    "On bedroom and classroom desks in 1977, the sleek beige 'Apple II,' the RadioShack 'TRS-80,' and the all-in-one metal 'Commodore PET' introduced families to the magic of owning a real home computer."
  ],
  1978: [
    "In 1978, every arcade and corner shop echoed with the speeding four-note bass heartbeat of Taito's 'Space Invaders,' causing temporary coin shortages as players tried to clear the last alien on screen.",
    "At home computers in 1978, loading a game meant popping a standard audio cassette tape into a 'Datasette' recorder, pressing Play, and waiting five minutes as data squealed into memory."
  ],
  1979: [
    "In 1979, arcade players hammered the five buttons of Atari's vector-graphics cabinet 'Asteroids,' where crisp white-line spaceships and boulders glowed like lasers against a pitch-black monitor.",
    "Over on the Apple II computer in 1979, players explored subterranean rooms painted purely in green text in 'Zork' while parents marveled at the first electronic spreadsheet, 'VisiCalc.'"
  ],
  1980: [
    "Beyond Pac-Man in 1980, arcade fans gripped dual joysticks in Williams's 'Defender' and navigated colorful tanks through 'Battlezone' periscopes.",
    "At home in 1980, families slid flexible 5.25-inch black floppy disks into early desktop disk drives and listened to the rhythmic 'chunka-chunka' head seek as green-phosphor monitors booted up."
  ],
  1981: [
    "In 1981, gaming friends spent Friday nights guiding a green frog across busy highways in Konami's 'Frogger' and letting a ship get captured just to unlock double firepower in 'Galaga.'",
    "On the desk in 1981, IBM launched the heavy beige 'IBM PC 5150' running 'MS-DOS,' where a blinking green 'C:\\>' prompt waited for you to type every command by hand."
  ],
  1982: [
    "In 1982, living-room gamers swung across jungle vines and alligator pits in Activision's 'Pitfall!' and raced biplanes in 'River Raid.'",
    "And in bedrooms across Europe and America in 1982, kids pressed the soft rubber keys of the 'ZX Spectrum' or typed BASIC code from computer magazines until their fingers ached."
  ],
  1983: [
    "In 1983, arcade crowds gasped in disbelief at 'Dragon's Lair,' the first laserdisc arcade cabinet that played full hand-drawn cartoon animation whenever you flicked the joystick in time.",
    "Meanwhile, in Japan in 1983, Nintendo launched the red-and-white 'Family Computer' (Famicom), while home PC users printed banners on noisy tractor-feed dot-matrix printers with tear-off perforated edges."
  ],
  1984: [
    "In 1984, friends stood shoulder-to-shoulder at arcade cabinets punching their way through 'Kung-Fu Master' and marble mazes in 'Marble Madness.'",
    "On computer desks in 1984, Apple unveiled the friendly beige 'Macintosh 128K'—complete with a crisp black-and-white screen and 'MacPaint,' where everyone spent hours drawing spray-paint patterns with a mouse."
  ],
  1985: [
    "In 1985, arcade players sat inside the moving hydraulic cockpit of Sega's 'Hang-On' motorcycle cabinet and battled ghost hordes with four friends in 'Gauntlet.'",
    "In school computer labs in 1985, classmates huddled around Apple II monitors to hunt for international thieves in 'Where in the World Is Carmen Sandiego?' and test the painted graphics of the new 'Commodore Amiga.'"
  ],
  1986: [
    "In 1986, arcade and console players cruised down palm-lined pixel highways in a red convertible to 'Magical Sound Shower' in Sega's 'Out Run' and popped bubbles in 'Bubble Bobble.'",
    "At home computers in 1986, kids clicked through Lucasfilm's graphic adventures and stored homework on sturdy new 3.5-inch hard-plastic floppy disks with sliding metal shutters."
  ],
  1987: [
    "In 1987, every gamer on the block knew the secret 'Konami Code'—Up, Up, Down, Down, Left, Right, Left, Right, B, A—by heart to unlock thirty lives for two-player co-op in 'Contra.'",
    "Over on the PC in 1987, the introduction of 'VGA' 256-color graphics cards and 'AdLib' sound cards suddenly made home computer monitors burst with rich arcade-style color and music."
  ],
  1988: [
    "In 1988, living rooms echoed with the eight-bit boss themes of 'Mega Man 2' and the raccoon-tail flight of 'Super Mario Bros. 3' in Japan, while Sony quietly agreed to design a sound chip for Nintendo that would spark the PlayStation story.",
    "At the family computer desk in 1988, players cracked the cardboard code-wheel to play 'Pool of Radiance' and built highway interchanges on MS-DOS."
  ],
  1989: [
    "In 1989, console players battled side-by-side through the streets of 'Final Fight' and 'Golden Axe' on 16-bit screens.",
    "On the home PC in 1989, gamers marveled at the lifelike rotoscoped swordfights and sixty-minute countdown clock of 'Prince of Persia' and zoned power plants as mayor in the original 'SimCity.'"
  ],
  1990: [
    "In 1990, friends gathered around the television to unlock hidden warp zones in 'Super Mario World' and 'Final Fantasy III' while engineers in Tokyo began drafting a CD-ROM console project code-named 'Play Station.'",
    "At the family computer in 1990, Microsoft launched 'Windows 3.0'—and suddenly everyone in the house was dragging green playing cards across the screen just to watch the bouncing card waterfall at the end of 'Solitaire.'"
  ],
  1991: [
    "In 1991, Sony and Nintendo publicly unveiled a prototype CD-ROM console called the 'Play Station' at the Consumer Electronics Show, while arcades and living rooms erupted with 'Street Fighter II' Hadouken fireballs and 'Sonic the Hedgehog.'",
    "On home computers in 1991, players laughed at the pirate insults of 'The Secret of Monkey Island,' guided tiny green-haired 'Lemmings' to safety, and heard a Finnish student named Linus Torvalds release the first 'Linux' kernel."
  ],
  1992: [
    "In 1992, as Ken Kutaragi convinced Sony's board to build a standalone 3D 'PlayStation' console, gamers crowded around arcade cabinets to whisper secret button combinations in 'Mortal Kombat' and 'Virtua Racing.'",
    "At the desktop PC in 1992, installing a 'Sound Blaster 16' card meant hearing real digitized voices in 'Wolfenstein 3D' and 'Dune II' while navigating the colorful program windows of 'Windows 3.1.'"
  ],
  1993: [
    "In 1993, Sony officially founded 'Sony Computer Entertainment' to prepare the PlayStation for the world, while living rooms echoed with 'He's on fire!' from 'NBA Jam' and the polygonal Arwing battles of 'Star Fox.'",
    "On the family PC in 1993, late-night gamers turned off the desk lamp to play id Software's groundbreaking 'Doom,' solved the surreal puzzles of 'Day of the Tentacle,' and tried the first graphical web browser, 'Mosaic.'"
  ],
  1994: [
    "In 1994, gaming history changed forever when Sony launched the original gray 'PlayStation' (PS1) in Japan—leaving players speechless as the 3D sports cars of 'Ridge Racer' drifted smoothly across the television screen.",
    "Over at the family computer desk in 1994, kids popped shiny 'Microsoft Encarta' encyclopedia CD-ROMs into the drive, explored the mysterious island of 'Myst,' and watched the 'Netscape Navigator' ship wheel spin as early websites loaded."
  ],
  1995: [
    "In 1995, nothing beat the magic of pressing the circular power button on Sony's brand-new gray 'PlayStation,' hearing that deep, hypnotic amber-diamond startup chime fill the living room, and facing off with friends in 'Tekken' and 'Wipeout.'",
    "At the home computer in 1995, everyone was clicking the new 'Start' button in 'Windows 95,' spraying pixel graffiti in 'MS Paint,' and listening to the screeching thirty-second tone of a dial-up modem while shouting, 'Don't pick up the house phone, I'm on the Internet!'"
  ],
  1996: [
    "After school in 1996, the sweetest hangout was sitting cross-legged on the rug in front of the PlayStation 1, guiding 'Crash Bandicoot' away from giant rolling boulders or jumping in unison when zombie dogs crashed through the hallway window in 'Resident Evil.'",
    "Over on the beige desktop PC in 1996, kids spent rainy afternoons clicking gray squares in 'Minesweeper,' watching the '3D Brick Maze' screensaver wind across the heavy CRT monitor, and building tank armies in 'Command & Conquer: Red Alert.'"
  ],
  1997: [
    "In 1997, PlayStation 1 owners treasured their little gray 15-block 'Memory Card' like pure gold as they swapped between the three CD-ROM discs of 'Final Fantasy VII,' unlocked licence tests in 'Gran Turismo,' and played 'Winning Eleven' until midnight.",
    "At the family computer in 1997, siblings took turns guiding stone-age villagers in 'Age of Empires,' dragging neon equalizer skins onto the 'Winamp' MP3 player, and unscrewing the bottom of the mouse to blow dust off the heavy rubber trackball."
  ],
  1998: [
    "On the PlayStation in 1998, Sony's new twin-stick 'DualShock' controller rumbled right in your palms during 'Metal Gear Solid'—where Psycho Mantis famously read your Memory Card until you plugged your controller into Port 2—and as 'Spyro the Dragon' glided across sunny valleys.",
    "Meanwhile, in bedrooms and computer labs in 1998, boxy beige monitors sat alongside Apple's translucent bondi-blue 'iMac G3' as friends booted up 'Windows 98,' battled in 'StarCraft,' and typed their first searches into a brand-new site called 'Google.'"
  ],
  1999: [
    "In 1999, Friday afternoons belonged to the PlayStation 1, where friends passed the controller to land 900-degree spins in the Warehouse level of 'Tony Hawk's Pro Skater,' escaped raptors in 'Dino Crisis,' and survived the chaotic parking-garage tutorial of 'Driver.'",
    "At the family computer desk in 1999, teenagers rushed home to sign into 'MSN Messenger' and 'ICQ,' listened for the famous 'Uh-oh!' message alert, and built looping theme-park rides in 'RollerCoaster Tycoon.'"
  ],
  2000: [
    "In the year 2000, Sony's monolithic black 'PlayStation 2' (PS2)—with its rotating blue logo and floating crystal-towers startup screen—arrived in living rooms alongside the compact white 'PS One' for nonstop neighborhood football tournaments.",
    "Over on the home PC in 2000, teenagers waited twenty minutes to download a single MP3 song, burned custom mixes onto shiny blank CD-R discs using 'Nero Burning ROM,' and wrote the tracklist on the front with a felt-tip marker."
  ],
  2001: [
    "Around the living-room TV in 2001, the PlayStation 2 entered a golden era as friends cruised the rainy streets of Liberty City listening to chatterbox radio in 'Grand Theft Auto III,' dove in slow-motion in 'Max Payne,' and summoned Aeons in 'Final Fantasy X.'",
    "And when you pressed the power button on the family computer in 2001, the rolling green hill and blue sky of the 'Windows XP' Bliss wallpaper greeted you before hours of launching silver balls in '3D Pinball: Space Cadet.'"
  ],
  2002: [
    "Nothing captured the sweetness of 2002 quite like switching on the PlayStation 2 after school to drive down the neon-lit 1980s beachfront of 'Grand Theft Auto: Vice City' or swing a Keyblade alongside Donald and Goofy in 'Kingdom Hearts.'",
    "At the desktop computer in 2002, siblings argued over whose turn it was to build two-story houses with swimming pools in 'The Sims,' command fantasy armies in 'Warcraft III: Reign of Chaos,' or feed their virtual 'Neopets.'"
  ],
  2003: [
    "On Friday nights in 2003, friends gathered around the PlayStation 2 to customize neon street-racing cars in 'Need for Speed: Underground,' rewind fatal jumps with the Dagger of Time in 'Prince of Persia: The Sands of Time,' and settle rivalries in 'PES 3.'",
    "Over on the family computer in 2003, teenagers spent the evening sending screen-shaking 'Nudges' and custom winks on 'MSN Messenger,' playing 'Counter-Strike 1.6' at neighborhood LAN cafés, and watching hypnotic 'Windows Media Player' audio visualizers."
  ],
  2004: [
    "In 2004, Sony released the ultra-thin 'PS2 Slim,' and every living room echoed with friends passing the DualShock 2 controller as CJ rode a BMX bike down Grove Street in 'Grand Theft Auto: San Andreas' or camouflaged in the jungle in 'Metal Gear Solid 3: Snake Eater.'",
    "Meanwhile, on the family PC in 2004, players lost entire weekends exploring Azeroth in the brand-new 'World of Warcraft,' mining ore in browser-based 'RuneScape,' and guiding generations of virtual families in 'The Sims 2.'"
  ],
  2005: [
    "On the PlayStation 2 in 2005, gamers sat on the edge of the sofa scaling towering ancient beasts in 'Shadow of the Colossus' and swinging the Blades of Chaos in 'God of War,' while Sony's handheld 'PSP' spun tiny optical UMD discs on the bus.",
    "At the home computer in 2005, friends pulled up extra chairs around the monitor to watch the very first viral clips on a brand-new video site called 'YouTube,' arranged their 'MySpace' Top 8 friends, and played 'Age of Empires III.'"
  ],
  2006: [
    "In 2006, Sony unveiled the glossy black 'PlayStation 3' (PS3) with its Blu-ray drive and orchestral string startup sound, while PS2 owners spent endless weekend afternoons riding skateboards through Bullworth Academy in 'Bully' and playing 'PES 6.'",
    "On the family PC in 2006, kids waddled across snowy virtual plazas to adopt colorful Puffles in browser-based 'Club Penguin,' played 'Miniclip' and 'Newgrounds' Flash games after homework, and customized desktop widgets."
  ],
  2007: [
    "Sitting in front of the PlayStation 3 in 2007 felt like controlling a summer blockbuster, whether you were swinging across jungle ruins with Nathan Drake in 'Uncharted: Drake's Fortune' or leaping from medieval towers into haystacks in the original 'Assassin's Creed.'",
    "Over on the desktop computer in 2007, PC players tested whether their graphics card could run the tropical jungles of 'Crysis,' solved mind-bending teleportation puzzles in Valve's 'Portal,' and hopped on group 'Skype' calls."
  ],
  2008: [
    "In 2008, the PlayStation 3 turned the couch into a creative playground as four friends slapped stickers onto knitted 'Sackboy' characters in 'LittleBigPlanet,' stepped out of Vault 101 in 'Fallout 3,' and watched Old Snake's emotional finale in 'Metal Gear Solid 4.'",
    "Meanwhile, on home computers and laptops in 2008, players evolved quirky microscopic creatures into space civilizations in 'Spore,' survived four-player zombie campaigns in 'Left 4 Dead,' and chatted on early Facebook walls."
  ],
  2009: [
    "In 2009, Sony launched the lighter matte-black 'PS3 Slim,' and every bedroom echoed with the satisfying chime of unlocking PlayStation 'Trophies' in 'Uncharted 2: Among Thieves,' 'Batman: Arkham Asylum,' and late-night 'Modern Warfare 2' lobbies.",
    "On the computer in 2009, Microsoft rolled out the beloved 'Windows 7' desktop, while millions planted rows of peashooters and sunflowers on their lawn in 'Plants vs. Zombies,' harvested digital strawberries in 'FarmVille,' and tried early browser builds of 'Minecraft.'"
  ],
  2010: [
    "In living rooms in 2010, the PlayStation 3 delivered unforgettable nights as players rode across the wild frontier at sunset in 'Red Dead Redemption,' battled Olympian titans in 'God of War III,' and swung glowing 'PlayStation Move' motion spheres.",
    "Over on the PC in 2010, strategy fans clicked at lightning speed in 'StarCraft II: Wings of Liberty,' built sprawling pixel castles in 'Minecraft' Alpha on laptops, and laughed until they cried over ragdoll obstacle courses in browser-based 'Happy Wheels.'"
  ],
  2011: [
    "On the PlayStation 3 in 2011, players clung to the desert cargo plane in 'Uncharted 3: Drake's Deception,' shouted 'Fus Ro Dah!' across the snowy peaks of 'The Elder Scrolls V: Skyrim,' and marveled at Sony's OLED 'PS Vita' handheld.",
    "At computer desks in 2011, five-person friend groups stayed up late on voice calls climbing the ranks in 'League of Legends,' digging deep underground together in 'Terraria,' and solving two-player robot puzzles in 'Portal 2.'"
  ],
  2012: [
    "In 2012, PlayStation 3 owners shared silent, emotional journeys across golden desert dunes with anonymous travelers in 'Journey,' agonized over story choices in Telltale's 'The Walking Dead,' and played heated weekend derbies in 'FIFA 13.'",
    "On the home PC in 2012, Valve launched 'Counter-Strike: Global Offensive' (CS:GO) on Steam, while friends clicked through dungeons in 'Diablo III' and dared each other to play 'Slender: The Eight Pages' in the dark."
  ],
  2013: [
    "For gamers, 2013 was a magical bridge between two generations: experiencing the unforgettable journey of Joel and Ellie in 'The Last of Us' and cruising Los Santos in 'Grand Theft Auto V' on PS3, right before unboxing Sony's angled black 'PlayStation 4' (PS4) with its glowing blue DualShock 4 light bar.",
    "Over on the PC in 2013, friends hopped onto 'TeamSpeak' servers for five-versus-five 'Dota 2' matches, sailed pirate ships across the Caribbean in 'Assassin's Creed IV: Black Flag,' and tried performative physics games like 'Surgeon Simulator.'"
  ],
  2014: [
    "On the PlayStation 4 in 2014, six friends teamed up on headsets to conquer the 'Vault of Glass' raid in Bungie's 'Destiny,' handed a virtual controller to a friend over the internet using 'Share Play,' and crept down the eerie looping hallway of 'P.T.'",
    "At laptop and desktop screens in 2014, players jumped out of their chairs checking security cameras in 'Five Nights at Freddy's,' built digital card decks in Blizzard's 'Hearthstone,' and designed quirky neighborhoods in 'The Sims 4.'"
  ],
  2015: [
    "Nothing captured the magic of 2015 gaming quite like switching on the PlayStation 4 to ride across windswept valleys in 'The Witcher 3: Wild Hunt,' brave the gothic streets of 'Bloodborne,' or score last-second aerial car goals with friends in 'Rocket League.'",
    "On the PC in 2015, Microsoft released 'Windows 10' and friend groups everywhere moved onto a brand-new voice app called 'Discord' while playing the heartfelt RPG 'Undertale,' designing highways in 'Cities: Skylines,' and swallowing smaller cells in browser-based 'Agar.io.'"
  ],
  2016: [
    "In 2016, Sony rolled out the sleeker 'PS4 Slim' and 4K 'PS4 Pro,' while players experienced Nathan Drake's cinematic treasure-hunting finale in 'Uncharted 4: A Thief's End' and put on the glowing white 'PlayStation VR' headset for the first time.",
    "At desktop PCs in 2016, six-person squads coordinated hero ultimates every evening in Blizzard's 'Overwatch,' tended peaceful pixelated farms in 'Stardew Valley,' and steered glowing neon snakes in browser-based 'Slither.io.'"
  ],
  2017: [
    "On the PlayStation 4 in 2017, players hunted giant mechanical beasts across lush valleys with Aloy in 'Horizon Zero Dawn,' relived classic platforming jumps in the 'Crash Bandicoot N. Sane Trilogy,' and jammed to the stylish soundtrack of 'Persona 5.'",
    "Over on the PC in 2017, a hundred players parachuted onto Erangel together in 'PlayerUnknown's Battlegrounds' (PUBG) chasing a 'Winner Winner Chicken Dinner,' while RGB mechanical keyboards and tempered-glass PC cases lit up every bedroom desk."
  ],
  2018: [
    "For PlayStation 4 owners, 2018 was an unforgettable peak: recalling the Leviathan Axe into Kratos's hand in 'God of War,' swinging between sunlit Manhattan skyscrapers in 'Marvel's Spider-Man,' and riding with Arthur Morgan's gang in 'Red Dead Redemption 2.'",
    "Meanwhile, on PCs in 2018, friend groups gathered in 'Discord' voice channels to dive into glowing alien oceans in 'Subnautica,' build automated conveyor-belt factories in 'Factorio,' and watch 'Twitch' streams on a second monitor."
  ],
  2019: [
    "On the PlayStation 4 in 2019, gamers crossed misty mountain landscapes delivering cargo in 'Death Stranding,' parried katana blades in 'Sekiro: Shadows Die Twice,' and dropped into three-player squads for the surprise launch of 'Apex Legends.'",
    "At the computer desk in 2019, millions of players logged into 'World of Warcraft Classic' to relive 2004 nostalgia, honked at villagers as a mischievous bird in 'Untitled Goose Game,' and saw real-time ray-tracing reflections debut on 'RTX' graphics cards."
  ],
  2020: [
    "In 2020, players followed autumn wind gusts across feudal Japan in 'Ghost of Tsushima' and returned to Midgar in 'Final Fantasy VII Remake' on PS4, before celebrating the arrival of Sony's futuristic white-and-black 'PlayStation 5' (PS5) and 'Spider-Man: Miles Morales.'",
    "On the PC in 2020, friends spent every evening planting spikes in Riot's tactical shooter 'Valorant,' hunting ghosts with voice-recognition microphones in four-player 'Phasmophobia,' and battling out of the Underworld in 'Hades.'"
  ],
  2021: [
    "In 2021, wrapping your hands around the PlayStation 5's two-tone 'DualSense' controller—feeling its adaptive triggers push back against your fingers as you hopped through dimensional rifts in 'Ratchet & Clank: Rift Apart' or teamed up on the couch in 'It Takes Two'—felt like pure next-gen magic.",
    "At the computer desk in 2021, Microsoft introduced the centered taskbar of 'Windows 11,' while groups of friends sailed Viking longships together in 'Valheim' and raced exotic supercars across Mexico in 'Forza Horizon 5.'"
  ],
  2022: [
    "On the PlayStation 5 in 2022, living rooms became epic theaters as Kratos and Atreus faced the Norse apocalypse in 'God of War Ragnarök,' Aloy soared on the wings of a Sunwing in 'Horizon Forbidden West,' and players meowed on command as an orange cat in 'Stray.'",
    "Over on the PC in 2022, players dodged waves of thousands of monsters in the indie phenomenon 'Vampire Survivors,' customized dual-monitor setups with animated 'Wallpaper Engine' backgrounds, and built sprawling colonies in 'Dwarf Fortress.'"
  ],
  2023: [
    "In 2023, PlayStation 5 owners glided effortlessly across the East River using Web Wings in 'Marvel's Spider-Man 2,' unleashed fiery Eikon battles in 'Final Fantasy XVI,' and streamed PS5 games around the house on the handheld 'PlayStation Portal.'",
    "On the PC in 2023, friend groups laughed until tears rolled down their faces collecting scrap metal on haunted moons in 'Lethal Company,' dove for sushi ingredients in 'Dave the Diver,' and jumped into the remastered 'Counter-Strike 2.'"
  ],
  2024: [
    "In 2024, Sony celebrated thirty years of PlayStation as PS5 players rescued classic franchise bots in Team ASOBI's joyful platformer 'Astro Bot,' unlocked the sharper frame rates of the 'PS5 Pro,' and cherished the retro gray 30th Anniversary DualSense controller.",
    "Meanwhile, on the PC in 2024, four-player squads called down orbital stratagems together in 'Helldivers 2,' battled mythological bosses in 'Black Myth: Wukong,' and lost hours building hypnotic poker hands in 'Balatro.'"
  ]
};

const buildWorldNewsVibe = (year: number, month: number = 11, rawNews?: string, day: number = 1): string => {
  const distinctive = YEAR_DISTINCTIVE_LIFE[year];
  const psAndPc = YEAR_PLAYSTATION_AND_PC_VIBE[year];
  const season = MONTH_SEASONAL_STREETSCAPE[month] || MONTH_SEASONAL_STREETSCAPE[11];

  if (distinctive) {
    const offset = Math.max(0, day - 1) % distinctive.length;
    const rotated = [
      distinctive[offset],
      distinctive[(offset + 1) % distinctive.length],
      distinctive[(offset + 2) % distinctive.length]
    ];
    return ensure5To7Sentences([
      season.seasonOpening(year),
      stripSpecificDatesToYearOnly(rotated[0], year),
      stripSpecificDatesToYearOnly(rotated[1], year),
      stripSpecificDatesToYearOnly(rotated[2], year),
      ...(psAndPc ? [stripSpecificDatesToYearOnly(psAndPc[0], year), stripSpecificDatesToYearOnly(psAndPc[1], year)] : [])
    ], 7);
  }

  const extraNewsSents = rawNews ? splitIntoSentences(stripSpecificDatesToYearOnly(rawNews, year)) : [];

  return ensure5To7Sentences([
    season.seasonOpening(year),
    ...extraNewsSents,
    `Down at the local soda fountain and record counter in ${year}, teenagers gathered around glowing chrome jukeboxes and electromechanical pinball machines dropping coins to play the week's top hits.`,
    `In offices and university labs in ${year}, early room-sized mainframe computers hummed with spinning magnetic tape reels and glowing vacuum tubes long before personal computers or PlayStation consoles existed.`
  ], 7);
};

// ============================================================================
// 2. TECH & TOYS -> "🕹️ Tech & Toys: What We Played With in [Year]"
// Progress across distinct play scenes so no toy or game is repeated redundantly in consecutive sentences.
// ============================================================================
const YEAR_SINGLE_TOY_CRAZE: Record<number, { item: string; unboxing: string; physicalDetail: string; sharingScene: string; lastingMemory: string }> = {
  1965: {
    item: "Hasbro's 12-inch 'G.I. Joe' movable action figure",
    unboxing: "Lifting Hasbro's 'G.I. Joe' out of his olive-drab footlocker box in 1965 felt revolutionary because his twenty-one articulating joints let him crouch, salute, and grip miniature gear like a real soldier.",
    physicalDetail: "Kids spent hours swapping the tiny cloth uniforms, metal dog tags, and molded plastic binoculars before staging backyard obstacle courses in the dirt.",
    sharingScene: "Across the driveway, sisters and friends were just as captivated by Mattel's new 'See 'n Say' pull-string talking toy and the red-plastic 'Rock 'Em Sock 'Em Robots' boxing ring.",
    lastingMemory: "Trading accessories across neighborhood fences and crowding around the living-room rug made 1965 a golden year for hands-on neighborhood play."
  },
  1966: {
    item: "Milton Bradley's 'Twister' vinyl floor mat game",
    unboxing: "Unfolding the giant white vinyl 'Twister' mat across the living-room rug in 1966—splashed with twenty-four bold red, yellow, blue, and green circles—instantly turned any quiet afternoon into a party.",
    physicalDetail: "Whoever served as referee flicked the plastic arrow on the square spinner board and called out 'Right hand red!' or 'Left foot green!' while players tried not to lose their balance.",
    sharingScene: "Once everyone collapsed onto the carpet laughing, friends moved over to the coffee table to carefully pluck tiny plastic bones from the buzzing patient in Milton Bradley's 'Operation' board game.",
    lastingMemory: "Pulling those colorful game boxes off the hall closet shelf became the ultimate icebreaker for every sleepover and family gathering of 1966."
  },
  1967: {
    item: "Hasbro's glowing 'Lite-Brite' light box",
    unboxing: "Turning off the bedroom lamp and flipping on Hasbro's 'Lite-Brite' magic light box in 1967 felt like painting with pure neon stardust.",
    physicalDetail: "You clipped a crisp black construction-paper stencil over the front grille and pushed translucent plastic pegs in ruby red, emerald green, and violet through the paper with a satisfying pop.",
    sharingScene: "Earlier in the afternoon, the kitchen table belonged to Mattel's 'Hot-Molds' Thingmaker and 'Spirograph' plastic gear rings, where friends traced intricate geometric mandalas with four-color ballpoint pens.",
    lastingMemory: "From sunlit afternoon drawing tables to that warm 25-watt bulb shining through jewel-toned pegs at bedtime, 1967 turned every bedroom into a creative studio."
  },
  1968: {
    item: "Mattel's 'Hot Wheels' die-cast race cars and orange track set",
    unboxing: "Popping one of Mattel's original sixteen 'Hot Wheels' cars—like the metallic Custom Camaro—out of its blister pack in 1968 was pure childhood adrenaline.",
    physicalDetail: "With shiny Spectraflame paint, redline low-friction wheels, and springy torsion-bar suspension, each miniature racer glided across the kitchen linoleum faster than any toy car ever built.",
    sharingScene: "Friends snapped twenty feet of flexible orange plastic track down the staircase banister, releasing two cars side-by-side through the vertical loop-the-loop before switching to Ideal's trap-filled 'Mouse Trap' board game.",
    lastingMemory: "Carrying a vinyl collector's case packed with miniature metal racers to a best friend's house defined every weekend afternoon of 1968."
  },
  1969: {
    item: "Wham-O's orange foam 'Nerf Ball'",
    unboxing: "Squeezing Wham-O's bright orange 'Nerf Ball' in your palm in 1969—billed on the box as the world's first official indoor ball—felt like a license to turn the living room into a stadium.",
    physicalDetail: "Made of four inches of feather-light polyurethane foam, it could bounce off lampshades, bookshelves, and television screens without breaking a single piece of glassware.",
    sharingScene: "Outside on the sidewalk, kids pedaled banana-seat 'Schwinn Sting-Ray' bicycles with high chrome ape-hanger handlebars and colorful plastic streamers fluttering from the grips.",
    lastingMemory: "Whether diving across the hallway rug on a rainy day or racing down the block before dinner, 1969 was built for nonstop motion."
  },
  1970: {
    item: "Topper Toys' 'Johnny Lightning' racers and 'Dawn' miniature dolls",
    unboxing: "Opening a 'Johnny Lightning' die-cast speed set in 1970 brought big-screen raceway excitement straight to the bedroom carpet.",
    physicalDetail: "Kids loved pressing the red levers on the mechanical launcher to send chrome-plated cars rocketing down twin plastic lanes at blur-inducing speeds.",
    sharingScene: "Across the room, friends spread out miniature velvet outfits for six-inch bendable 'Dawn' fashion dolls or took turns bouncing down the driveway on yellow plastic 'Hopper' balls with loop handles.",
    lastingMemory: "Those colorful molded carrying cases stacked in the corner of the bedroom remained the signature playtime treasure of 1970."
  },
  1971: {
    item: "the 'Mastermind' code-breaking board game and 'Clackers'",
    unboxing: "Setting up the 'Mastermind' pegboard on the coffee table in 1971 turned a quiet evening into a tense battle of wits between two players.",
    physicalDetail: "One player secretly hid four colored code pegs behind the hinged shield while the challenger lined up rows of red, blue, yellow, and green guesses down the plastic grid.",
    sharingScene: "Out on the schoolyard pavement, the unmistakable sound of the year was the rapid 'clack-clack-clack' of acrylic 'Clackers' balls swinging up and down on a heavy white string.",
    lastingMemory: "From cracking secret tabletop codes at night to mastering string tricks at recess, 1971 rewarded patience and quick hands."
  },
  1972: {
    item: "the Magnavox 'Odyssey' home video game console",
    unboxing: "Hooking the white-and-black Magnavox 'Odyssey' console up to the family television antenna terminals in 1972 felt like stepping into the twenty-first century.",
    physicalDetail: "You taped a translucent plastic graphic overlay directly onto the glass TV screen and rotated the two boxy horizontal and vertical control knobs to move your glowing white square paddle.",
    sharingScene: "When it was someone else's turn at the television, the rest of the kids headed out to the driveway to test the squishy orange tires of Kenner's 'SSP' pull-cord racers.",
    lastingMemory: "Controlling a dot of light on your own TV screen for the very first time made 1972 the true birth year of living-room gaming."
  },
  1973: {
    item: "Kenner's 'Easy-Bake Oven' and 'Shrinky Dinks' plastic craft sheets",
    unboxing: "Switching on a turquoise 'Easy-Bake Oven' in 1973 turned the kitchen counter into a working miniature bakery.",
    physicalDetail: "Powered by a simple 100-watt household lightbulb, the toy oven let kids push a tiny aluminum cake pan through the narrow slot and watch real chocolate batter rise through the peekaboo window.",
    sharingScene: "While the cake cooled, friends gathered around the dining table with colored pencils to draw on flexible 'Shrinky Dinks' plastic sheets that shrank into thick, glossy charms inside the family oven.",
    lastingMemory: "The warm sugary smell of vanilla frosting and freshly baked crafts on a Saturday afternoon remains one of the sweetest memories of 1973."
  },
  1974: {
    item: "Parker Brothers' 'NERF Basketball' hoop and 'Dungeons & Dragons'",
    unboxing: "Clipping Parker Brothers' indoor 'NERF Basketball' metal rim over the top of the bedroom door in 1974 transformed after-school hangouts overnight.",
    physicalDetail: "With the soft orange foam ball in hand, you could practice fadeaway jump shots from the edge of the bed and stage high-flying slam-dunk contests down the hallway.",
    sharingScene: "Meanwhile, down at the basement table, older siblings were opening the woodgrain box of 'Dungeons & Dragons' for the first time, rolling twenty-sided polyhedral dice on hand-drawn graph paper maps.",
    lastingMemory: "Between bedroom-door basketball tournaments and six-hour tabletop quests, 1974 was a landmark year for indoor imagination."
  },
  1975: {
    item: "Gary Dahl's cardboard-boxed 'Pet Rock'",
    unboxing: "In 1975, the craze that took over living rooms wasn't a complex machine at all, but Gary Dahl's hilarious cultural phenomenon, the 'Pet Rock.'",
    physicalDetail: "Unwrapping that brown cardboard carrying case—complete with breathing holes punched in the sides—and lifting the lid to find a smooth stone resting on wood shavings felt like being let in on the funniest joke in the world.",
    sharingScene: "After laughing over the tongue-in-cheek training manual, kids grabbed Kenner's 'Six Million Dollar Man' action figure to look through the bionic magnifying lens built right into the back of his head.",
    lastingMemory: "By December 1975, over a million families had joined the joke, proving that a clever shared laugh could captivate an entire generation."
  },
  1976: {
    item: "Kenner's gel-filled 'Stretch Armstrong' action figure",
    unboxing: "Walk onto any schoolyard or living-room carpet in 1976 and the toy everyone wanted to test was Kenner's muscular blond hero, 'Stretch Armstrong.'",
    physicalDetail: "Pulling him out of his box for the first time, his thick latex skin filled with warm corn-syrup gel felt impossibly heavy and pliable in your hands.",
    sharingScene: "Two friends would grab him by the arms and legs in a tug-of-war across the rug until he spanned four feet wide, then head outside to ride smooth red urethane 'Bahne' and 'Logan Earth Ski' skateboards down the hill.",
    lastingMemory: "Watching that stretchy figure slowly shrink right back to his original fifteen-inch size turned him into the undisputed star of 1976 playtime."
  },
  1977: {
    item: "the woodgrain Atari 2600 Video Computer System",
    unboxing: "Nothing in 1977 could rival the heart-pounding excitement of unboxing the woodgrain Atari 2600 Video Computer System and hooking its metal switchbox up to the back of the family television.",
    physicalDetail: "Pressing a 'Combat' cartridge into the console slot with a heavy mechanical clunk and gripping the stiff black rubber joystick with its single red fire button felt like pure magic.",
    sharingScene: "Across the bedroom floor, kids were also lining up Mattel's red-LED handheld 'Auto Race' game and trading 'Star Wars' Early Bird action-figure certificates with their best friends.",
    lastingMemory: "Bringing home programmable video cartridges in 1977 meant the thrill of the arcade now lived right inside your own living room on Friday nights."
  },
  1978: {
    item: "Milton Bradley's electronic memory game 'Simon'",
    unboxing: "In 1978, the electronic craze that turned every sleepover into a high-stakes showdown was Milton Bradley's glowing saucer-shaped memory game, 'Simon.'",
    physicalDetail: "The second you slid the chrome power switch and tapped start, its four giant red, blue, yellow, and green plastic lenses flashed across the darkened room with four unmistakable musical tones.",
    sharingScene: "When someone finally missed a sequence and triggered the dreaded razz buzz, friends switched over to the brown football-shaped Mattel 'Classic Football' handheld to dodge tiny red LED defenders.",
    lastingMemory: "The springy click of those glowing electronic buttons under your palms made it impossible to go to sleep before midnight in 1978."
  },
  1979: {
    item: "Sony's blue-and-silver 'Walkman' TPS-L2 portable cassette player",
    unboxing: "In the summer of 1979, holding Sony's original blue-and-silver 'Walkman' TPS-L2 cassette player in your palm felt like pure everyday sorcery.",
    physicalDetail: "You popped your favorite mixtape into the hinged metal door, slid the lightweight orange-foam headphones over your ears, and pushed down the heavy physical 'Play' key.",
    sharingScene: "Because Sony built two headphone jacks into the top of the player, two friends could listen together on the bus while passing around Milton Bradley's futuristic white programmable 'Big Trak' six-wheeled tank on the living-room floor.",
    lastingMemory: "Sharing a private stereo soundtrack on the walk home from school turned ordinary afternoons in 1979 into a movie scene."
  },
  1980: {
    item: "Ernő Rubik's six-color 'Rubik's Cube' puzzle",
    unboxing: "In 1980, one deceptively simple plastic puzzle took over every backpack, lunch table, and living room on Earth: the six-sided 'Rubik's Cube.'",
    physicalDetail: "Fresh out of its clear plastic cylinder, the six solid faces of white, red, blue, orange, yellow, and green stickers looked so neat that you couldn't resist giving it just one twist.",
    sharingScene: "Once the colors were hopelessly scrambled, friends traded solution tips on the front porch or unfolded the red vinyl case of Texas Instruments' 'Speak & Spell' to hear its robotic synthesizer voice.",
    lastingMemory: "Whether you mastered all six faces or proudly finished just one side, that gritty 'clack-clack-clack' of rotating plastic squares defined 1980."
  },
  1981: {
    item: "Nintendo's 'Donkey Kong' arcade cabinet and Coleco handhelds",
    unboxing: "Walk into any dimly lit mall arcade or corner pizza parlor in 1981 and the biggest crowd was gathered four rows deep around Nintendo's bright blue 'Donkey Kong' cabinet.",
    physicalDetail: "Setting your silver coin on the bottom edge of the glass bezel to reserve the next turn, you gripped the red ball-top joystick and timed every press of the 'Jump' button to hop Mario over rolling wooden barrels.",
    sharingScene: "On the walk home, friends pulled pocket-sized Nintendo 'Game & Watch' dual-screen LCD games and 'Smurfs' PVC figures out of their jacket pockets to compare collections.",
    lastingMemory: "Hearing that electronic four-note opening arcade fanfare with a crowd of friends behind you remains the ultimate gaming memory of 1981."
  },
  1982: {
    item: "the Commodore 64 home computer and 'Masters of the Universe' figures",
    unboxing: "In 1982, lifting the thick beige keyboard unit of the Commodore 64 out of its styrofoam box and plugging it into the bedroom TV felt like owning a personal command center.",
    physicalDetail: "Typing 'LOAD \"*\",8,1' on the mechanical keys and plugging a Competition Pro joystick into the side port launched hours of 'Choplifter' and 'Jupiter Lander.'",
    sharingScene: "Meanwhile, out on the living-room carpet, younger kids were unfolding the hinged plastic 'Castle Grayskull' playset to stage battles between Mattel's 'He-Man' and 'Skeletor' action figures.",
    lastingMemory: "From that blinking blue computer prompt on the desk to plastic swords clashing on the rug, 1982 was pure imagination."
  },
  1983: {
    item: "Coleco's 'Cabbage Patch Kids' dolls and the 'View-Master' 3D viewer",
    unboxing: "Nothing in 1983 matched the pandemonium and sheer joy of untying the ribbon on a green-and-yellow 'Cabbage Patch Kids' box from Babyland General Hospital.",
    physicalDetail: "Every single doll had a soft sculpted fabric face, yarn hair, a fresh baby-powder scent, and an official birth certificate and adoption oath stamped with a unique name.",
    sharingScene: "At neighborhood sleepovers, kids compared their dolls' adoption papers before holding a red plastic 'View-Master' up to the ceiling lamp and clicking the side lever through 3D cardboard reels.",
    lastingMemory: "Signing your name on that official adoption certificate made it the most treasured holiday memory of 1983."
  },
  1984: {
    item: "Hasbro's die-cast 'Transformers' (Optimus Prime and Megatron)",
    unboxing: "In 1984, peeling open a red-and-purple Hasbro 'Transformers' blister card to hold the die-cast metal cab of 'Optimus Prime' felt like holding two toys in one.",
    physicalDetail: "You pressed the warm thermal 'rubsign' decal on the figure's chest with your thumb until body heat revealed the secret holographic Autobot or Decepticon emblem.",
    sharingScene: "After racing to fold sports cars and jets into standing robots on the recess bench, friends headed home to slap neon-colored sticky rubber 'Wacky WallWalkers' against the bedroom door and watch them tumble down.",
    lastingMemory: "Swapping red decoder tech-spec cards and staging robot battles on the bedroom floor defined childhood in 1984."
  },
  1985: {
    item: "the gray boxy Nintendo Entertainment System (NES) and 'Super Mario Bros.'",
    unboxing: "In late 1985, lifting the two-tone gray Nintendo Entertainment System (NES) Deluxe Set out of the box—complete with the orange Zapper light gun—changed living rooms forever.",
    physicalDetail: "You pushed the gray 'Super Mario Bros.' cartridge into the front-loading chamber, pressed it down until it clicked into place, and gripped the rectangular controller with its black cross-shaped D-pad.",
    sharingScene: "When it was time to give your thumbs a rest, friends gathered on the floor around a plush 'Care Bears' collection or unfolded the giant plastic aircraft carrier USS Flagg for 'G.I. Joe.'",
    lastingMemory: "Even the ritual of blowing dust out of the bottom of a game cartridge before sliding it back into the console became an iconic badge of 1985."
  },
  1986: {
    item: "Worlds of Wonder's animated bear 'Teddy Ruxpin' and 'Lazer Tag'",
    unboxing: "Flipping the switch on the back of Worlds of Wonder's 'Teddy Ruxpin' in 1986 made kids feel like their favorite storybook had come to life.",
    physicalDetail: "When you snapped a cassette tape into his back, the bear's motorized eyes blinked and his furry jaw moved in perfect sync with the narrator's voice.",
    sharingScene: "As soon as twilight fell outside, older siblings strapped glowing sensor vests over their jackets and sprinted behind neighborhood trees firing red infrared beams from black-and-silver 'Lazer Tag' StarLyte pistols.",
    lastingMemory: "From animated storytime in the bedroom to neighborhood tag showdowns in the dark, 1986 felt like stepping into tomorrow."
  },
  1987: {
    item: "Nintendo's gold-cartridge 'The Legend of Zelda' and 'Pogo Balls'",
    unboxing: "In 1987, pulling the shimmering metallic-gold NES cartridge of 'The Legend of Zelda' out of its box made your hands tremble before you even turned on the television.",
    physicalDetail: "Unlike earlier games, the gold cartridge contained an internal battery that saved your progress, along with a fold-out paper map of Hyrule that you annotated with pencil clues.",
    sharingScene: "Out on the driveway that afternoon, every kid on the block was locking their sneakers around a neon purple-and-green plastic disc wedged around a rubber ball—trying to bounce fifty times in a row on a Hasbro 'Pogo Ball.'",
    lastingMemory: "Hearing that triumphant eight-bit secret-discovery chime indoors after an afternoon of bouncing down the sidewalk was the pinnacle of 1987."
  },
  1988: {
    item: "Playmates' 'Teenage Mutant Ninja Turtles' action figures and 'Micro Machines'",
    unboxing: "Walk down any toy aisle in 1988 and the green cardbacks everyone scrambled to grab were Playmates' original 'Teenage Mutant Ninja Turtles' figures—Leonardo, Donatello, Raphael, and Michelangelo.",
    physicalDetail: "Each rubbery green figure came with a removable plastic weapons rack that you snapped the miniature katanas and nunchucks out of, alongside tubs of neon green 'Turtle Ooze' slime.",
    sharingScene: "Right beside the sewer lair on the carpet, friends unfolded Galoob's 'Micro Machines' Super Van City, lining up dozens of tiny palm-sized cars on miniature bridges and service ramps.",
    lastingMemory: "Dumping a backpack full of action figures and miniature cars onto a friend's rug made 1988 an unforgettable time to be a kid."
  },
  1989: {
    item: "Nintendo's original gray handheld 'Game Boy' with 'Tetris'",
    unboxing: "In the summer of 1989, sliding Nintendo's original gray Dot Matrix 'Game Boy' out of its box and popping four AA batteries into the back changed every road trip and recess forever.",
    physicalDetail: "You clicked the 'Tetris' cartridge into the top slot, flipped the power switch, and heard that crisp 'ba-ding!' chime as the olive-green LCD screen lit up with falling geometric blocks.",
    sharingScene: "Across the bedroom, sisters and friends were unlocking heart-shaped pastel plastic compacts to discover miniature 'Polly Pocket' worlds no bigger than a coat button.",
    lastingMemory: "Huddling under a passing streetlamp in the backseat of the car just to see that non-backlit handheld screen is a core memory for anyone who lived through 1989."
  },
  1990: {
    item: "the 16-bit Sega Genesis and metallic 'Slap Bracelets'",
    unboxing: "In 1990, schoolyards echoed with the sharp metallic snap of fabric-covered 'Slap Bracelets' wrapping around wrists, while living rooms bowed to the sleek black 16-bit Sega Genesis.",
    physicalDetail: "Powering on the black console to hear the bold 'SEGA!' chant and holding its rounded three-button controller made arcade graphics feel impossibly fast at home.",
    sharingScene: "At school lunch tables, friends traded neon animal-print bracelets by slapping them flat-to-curled on each other's forearms and spun brightly colored 'Koosh Balls' made of thousands of soft rubber filaments.",
    lastingMemory: "Walking home with ten colorful bands stacked up your arm before a Friday night of 16-bit gaming gave 1990 an energy all its own."
  },
  1991: {
    item: "Larami's 'Super Soaker 50' water blaster and the Super Nintendo (SNES)",
    unboxing: "On hot summer afternoons in 1991, neighborhood backyards turned into giant water arenas the moment someone unscrewed the green bottle of a neon 'Super Soaker 50' at the garden hose.",
    physicalDetail: "You pumped the orange pressure slide handle twenty times until the air chamber hissed and pulled the trigger to send a pinpoint stream of water fifty feet across the lawn.",
    sharingScene: "Once everyone came inside to dry off, the whole group crowded onto the rug to plug in the purple-and-gray Super Nintendo Entertainment System (SNES) and ride Yoshi through 'Super Mario World.'",
    lastingMemory: "From high-pressure backyard water battles in the afternoon to 16-bit adventures at night, 1991 was pure childhood bliss."
  },
  1992: {
    item: "'Super Mario Kart' on SNES and 'Troll Dolls'",
    unboxing: "In 1992, plugging the 'Super Mario Kart' cartridge into the Super Nintendo turned friendly Friday-night hangouts into legendary living-room rivalries.",
    physicalDetail: "The split-screen television view let two players drift around Ghost Valley and Rainbow Road while launching red homing turtle shells and dropping banana peels right in front of a best friend's kart.",
    sharingScene: "At school desks during the day, kids lined up plastic 'Troll Dolls' with jewel bellybuttons and combed their towering tufts of neon pink, purple, and lime-green hair for good luck.",
    lastingMemory: "Those late-nightthree-balloon 'Battle Mode' showdowns on the living-room floor cemented 1992 as the golden age of couch multiplayer."
  },
  1993: {
    item: "Tiger Electronics' 'Talkboy' cassette recorder and 'Mighty Morphin Power Rangers'",
    unboxing: "In 1993, every kid begged for the silver-and-black Tiger Electronics 'Talkboy' deluxe cassette recorder that Kevin McCallister used in 'Home Alone 2.'",
    physicalDetail: "Holding the recorder by its chunky side handle, you extended the directional microphone, recorded your voice onto a standard cassette tape, and flipped the thumb switch to play it back in hilarious slow-motion.",
    sharingScene: "After recording prank interviews in the hallway, friends gathered on the carpet to snap five dinozords together into the towering 'Mighty Morphin Power Rangers' Megazord.",
    lastingMemory: "Hearing 'Hi kids, we're home early!' warble out of that little silver speaker is the unmistakable sound of 1993."
  },
  1994: {
    item: "cardboard 'Pogs' milk-cap tubes and Nintendo's 'Donkey Kong Country'",
    unboxing: "Walk onto any school blacktop or driveway in 1994 and you would see kids unscrewing clear plastic tubes packed four feet high with colorful cardboard 'Pogs' discs.",
    physicalDetail: "You stacked your favorite printed cardboard caps face-down in a neat tower, balanced a heavy brass or holographic torpedo 'Slammer' between two fingers, and whipped it down onto the stack with a sharp crack.",
    sharingScene: "When the school bell rang to end the day, everyone raced home to marvel at the pre-rendered 3D jungle graphics and mine-cart levels of 'Donkey Kong Country' on the Super Nintendo.",
    lastingMemory: "The rattle of metal slammers inside a backpack pocket followed by an evening of jungle platforming defined the rhythm of 1994."
  },
  1995: {
    item: "Galoob's flying 'Sky Dancers' launchers and Nintendo's 3D 'Virtual Boy' visor",
    unboxing: "In 1995, nothing drew a bigger crowd on the front lawn than pulling the cord on a handheld 'Sky Dancers' launcher and watching the foam-winged doll spin twenty feet into the air like a fairy-tale helicopter.",
    physicalDetail: "Indoors at the kitchen table, curious gamers leaned their faces into the red-and-black tabletop visor of Nintendo's stereoscopic 'Virtual Boy' to play three-dimensional 'Mario's Tennis' in glowing red LEDs.",
    sharingScene: "Meanwhile, friends squeezed glitter-filled 'Gooze' slime jars at their school desks or snapped together 'Star Wars: Power of the Force' action figures on the bedroom carpet.",
    lastingMemory: "From launching spinning dolls across the yard at dusk to trading holographic Pogs on the sidewalk, playtime in 1995 was full of hands-on wonder."
  },
  1996: {
    item: "the Nintendo 64 (N64) console and Tyco's 'Tickle Me Elmo'",
    unboxing: "In 1996, nothing matched the thrill of unboxing the charcoal-gray Nintendo 64 (N64) and wrapping your hands around its futuristic three-pronged controller with the center analog thumbstick.",
    physicalDetail: "The moment you switched on 'Super Mario 64,' tilting that central gray stick let you make Mario tiptoe, somersault, and fly through a full 360-degree courtyard outside Peach's Castle.",
    sharingScene: "Meanwhile, in every toy store and living room that December, parents and kids couldn't stop pressing the belly of Tyco's bright red 'Tickle Me Elmo' plush as it shook and giggled uncontrollably.",
    lastingMemory: "With four controller ports built directly into the front of the console, Friday nights in 1996 meant four friends playing together on the same screen."
  },
  1997: {
    item: "Bandai's egg-shaped 'Tamagotchi' virtual pet and 'GoldenEye 007'",
    unboxing: "In 1997, the gadget that took over every pocket, belt loop, and school desk was Bandai's tiny plastic egg-shaped digital pet, the 'Tamagotchi.'",
    physicalDetail: "Pulling the plastic insulation tab out of the side hatched a pixelated creature on the miniature LCD screen that relied on three tiny rubber buttons for food, games, and cleanup.",
    sharingScene: "Once homework was finished on Friday evening, four friends crowded around a single television divided into four quadrants for split-screen 'GoldenEye 007' matches on the Nintendo 64, strictly enforcing a 'no picking Oddjob' rule.",
    lastingMemory: "Keeping your keychain pet alive through the school week and staying up late for four-player spy showdowns was the ultimate badge of 1997."
  },
  1998: {
    item: "Nintendo's 'Game Boy Color' with 'Pokémon Red and Blue' and Tiger's 'Furby'",
    unboxing: "In the autumn of 1998, unboxing an atomic-purple translucent 'Game Boy Color' alongside a red or blue 'Pokémon' cartridge took over youth culture overnight.",
    physicalDetail: "Through the clear purple plastic shell, you could see the green circuit board inside as your thumbs guided Pikachu and Charizard across the Kanto region.",
    sharingScene: "At lunch tables, kids connected two handhelds with a coiled Link Cable to trade monsters, while back home on the dresser a furry animatronic owl-like 'Furby' blinked its plastic eyes and spoke 'Furbish.'",
    lastingMemory: "Trading creatures across a physical wire with your best friend while an electronic toy chattered in the corner made 1998 completely unforgettable."
  },
  1999: {
    item: "holographic 'Pokémon Trading Card Game' booster packs and Sega's 'Dreamcast'",
    unboxing: "Nothing in 1999 could beat the heart-pounding suspense of tearing open the foil wrapper of a 'Pokémon Trading Card Game' Base Set booster pack.",
    physicalDetail: "You slowly thumb-shifted through the eleven crisp cardboard cards—past Pikachu and Squirtle—praying to catch the rainbow sparkle of a holographic First Edition 'Charizard' on the rare slot.",
    sharingScene: "After organizing their three-ring card binders, friends gathered around Sega's white 'Dreamcast' console—watching the killer whale leap across the dock in 'Sonic Adventure' while practicing finger flips on miniature 'Tech Deck' fingerboards.",
    lastingMemory: "Sliding a shiny holographic card into a protective plastic sleeve before an evening of Dreamcast adventures remains the ultimate thrill of 1999."
  },
  2000: {
    item: "the folding aluminum 'Razor Scooter' and Tiger's 'HitClips'",
    unboxing: "In the year 2000, the metallic whir of a shiny aircraft-aluminum 'Razor Scooter' unfolding on the driveway was the sound of pure freedom.",
    physicalDetail: "You clicked open the heavy metal hinge latch, adjusted the T-bar handlebars, and pressed your heel onto the rear steel fender brake over bright translucent urethane wheels—careful never to let the spinning deck whack your ankle!",
    sharingScene: "After riding in a pack down to the corner store, friends sat on the front steps swapping postage-stamp-sized 'HitClips' plastic cartridges into a miniature keychain boombox to hear sixty-second pop hooks through a single earpiece.",
    lastingMemory: "A row of silver scooters parked across the front lawn meant the whole neighborhood was hanging out at your house in 2000."
  },
  2001: {
    item: "Microsoft's original 'Xbox' with 'Halo: Combat Evolved' and the 'Game Boy Advance'",
    unboxing: "In November 2001, hoisting Microsoft's massive black 'Xbox' console—stamped with its jewel-green 'X' logo—out of the box kicked off a new era of multiplayer gaming.",
    physicalDetail: "You gripped the hefty original controller, pulled the spring-loaded triggers, and heard the echoing Gregorian chant of 'Halo: Combat Evolved' fill the basement as Master Chief stepped onto the ringworld.",
    sharingScene: "For car rides and school buses, kids switched to Nintendo's wide horizontal 'Game Boy Advance' in translucent glacier-blue, snapping a bendable 'Worm Light' into the top port to see the screen in the dark.",
    lastingMemory: "Running long blue Ethernet cables across the hallway for sixteen-player LAN parties made weekend nights in 2001 legendary."
  },
  2002: {
    item: "Hasbro's 'Beyblade' spinning tops and the purple 'Nintendo GameCube'",
    unboxing: "In 2002, every schoolyard patio rang with the shout '3, 2, 1—Let it rip!' as kids yanked the serrated plastic ripcords on customizable 'Beyblade' spinning tops.",
    physicalDetail: "You snapped together your attack ring, heavy metal weight disk, and spin gear, launching the top into a concave plastic Beystadium bowl where sparks practically flew on impact.",
    sharingScene: "Back home on the living-room carpet, four friends plugged controllers into the indigo cube-shaped 'Nintendo GameCube' (complete with its rear carrying handle) for frantic four-player matches in 'Super Smash Bros. Melee' and 'Super Mario Sunshine.'",
    lastingMemory: "From high-speed spinning-top clashes at recess to four-player GameCube showdowns at night, 2002 was nonstop excitement."
  },
  2003: {
    item: "Nintendo's clamshell 'Game Boy Advance SP' with its front-lit screen",
    unboxing: "In the spring of 2003, flipping open the metallic cobalt-blue or platinum clamshell lid of Nintendo's 'Game Boy Advance SP' felt like the answer to every handheld player's prayers.",
    physicalDetail: "For the first time ever on a Game Boy, pressing the tiny brightness button at the top center lit up the screen with a built-in light—and it charged directly from a wall outlet without needing AA batteries.",
    sharingScene: "Friends sat together under blankets at sleepovers exploring the Hoenn region in 'Pokémon Ruby and Sapphire,' or teamed up two-per-kart on the GameCube in 'Mario Kart: Double Dash!!'",
    lastingMemory: "Snapping that pocket-sized clamshell screen shut when the teacher walked by made it the sleekest gadget of 2003."
  },
  2004: {
    item: "the dual-screen 'Nintendo DS' with 'PictoChat' and 'Halo 2'",
    unboxing: "In late 2004, unfolding the silver dual-screen 'Nintendo DS' for the first time and sliding the tiny plastic stylus out of its side slot felt like holding a gadget from a sci-fi movie.",
    physicalDetail: "Before you even inserted a game cartridge, turning on the console opened 'PictoChat'—letting you hand-draw doodles and messages on the bottom touchscreen and beam them wirelessly to friends down the hall.",
    sharingScene: "Meanwhile, in basements and dorm rooms everywhere, friends slipped on voice headsets over 'Xbox Live' for late-night capture-the-flag matches on Zanzibar in 'Halo 2.'",
    lastingMemory: "Tapping a handheld touchscreen with a plastic stylus while chatting with sixteen classmates on the bus made 2004 a turning point for play."
  },
  2005: {
    item: "RedOctane's five-button 'Guitar Hero' controller and 'Nintendogs'",
    unboxing: "In 2005, pulling the black-and-white plastic Gibson SG guitar controller out of the 'Guitar Hero' box and slinging the strap over your shoulder turned the living room into a rock arena.",
    physicalDetail: "Your left fingers danced across the five colored fret buttons—green, red, yellow, blue, and orange—while your right hand clicked the strum bar and tilted the guitar neck upward to trigger 'Star Power.'",
    sharingScene: "On the school bus the next morning, kids spoke directly into the built-in microphone of their Nintendo DS to call their virtual puppies by name and rub their bellies with the stylus in 'Nintendogs.'",
    lastingMemory: "The rhythmic 'clack-clack-clack' of that plastic guitar strum bar echoing through the house was the undisputed soundtrack of 2005 hangouts."
  },
  2006: {
    item: "the motion-controlled 'Nintendo Wii' console and 'Gears of War'",
    unboxing: "In November 2006, unboxing the compact white 'Nintendo Wii' console and tightening the gray wrist strap of the 'Wii Remote' around your hand brought every generation in the house off the couch.",
    physicalDetail: "Shaped like a sleek TV remote with a built-in speaker and motion sensor, the controller let you physically swing your arm like a tennis racket or bowling ball in 'Wii Sports.'",
    sharingScene: "Coffee tables were pushed against the wall so grandparents and kids could design custom 'Mii' avatars together, while in the next room older gamers teamed up on the Xbox 360 for co-op campaigns in 'Gears of War.'",
    lastingMemory: "Hearing the breezy five-note 'Wii Sports' theme song while the whole family bowled in the living room made 2006 a landmark year."
  },
  2007: {
    item: "Harmonix's four-player 'Rock Band' instrument kit and 'Halo 3'",
    unboxing: "In 2007, hauling the massive rectangular 'Rock Band' bundle box into the house and assembling the four-pad plastic drum kit, foot pedal, microphone, and Stratocaster guitar was an event in itself.",
    physicalDetail: "One friend gripped the wooden drumsticks to hit the colored pads while two others strummed guitar and bass and a fourth belted lyrics into the USB microphone.",
    sharingScene: "When the band took an intermission, the whole group switched over to the Xbox 360 to drink bright orange 'Mountain Dew Game Fuel' and play four-player Forge mode in 'Halo 3.'",
    lastingMemory: "Stomping that orange plastic kick pedal in unison with three of your best friends made 2007 the peak of living-room party gaming."
  },
  2008: {
    item: "Nintendo's 'Mario Kart Wii' with the white 'Wii Wheel' and 'Wii Fit'",
    unboxing: "In the spring of 2008, snapping your white remote sideways into the circular plastic 'Wii Wheel' steering ring included with 'Mario Kart Wii' turned every living room into a racetrack.",
    physicalDetail: "Instead of pushing a tiny thumbstick, you held the white steering ring out in the air with both hands, physically turning it left and right to drift around Coconut Mall.",
    sharingScene: "Right beside the sofa sat Nintendo's white rectangular 'Wii Balance Board,' where family members stood barefoot to ski down virtual slalom hills and test their center of balance in 'Wii Fit.'",
    lastingMemory: "Four friends sitting on the edge of the couch leaning their whole bodies into every sharp turn made 2008 pure multiplayer joy."
  },
  2009: {
    item: "Apple's pocket-sized 'iPod touch' games and 'Wii Sports Resort'",
    unboxing: "In 2009, peeling the protective film off the mirror-polished stainless-steel back of an 'iPod touch' defined what everyone played with between classes.",
    physicalDetail: "On the glass touchscreen, you tilted the device left and right to bounce higher on green platforms in 'Doodle Jump' or flicked crumpled paper balls past a desk fan in 'Paper Toss.'",
    sharingScene: "As soon as Friday night arrived, families snapped the 'Wii MotionPlus' sensor onto the bottom of their remotes for 100-pin bowling and island swordplay in 'Wii Sports Resort' or four-player chaos in 'New Super Mario Bros. Wii.'",
    lastingMemory: "Passing a touchscreen down the lunch table to beat a 50,000-point high score before a weekend of living-room matches was a daily ritual in 2009."
  },
  2010: {
    item: "Rovio's 'Angry Birds,' 'Fruit Ninja,' and animal-shaped 'Silly Bandz'",
    unboxing: "In 2010, school hallways were filled with kids wearing twenty colorful die-cut silicone 'Silly Bandz' up their forearms—bracelets that looked like wavy rubber bands on your wrist but sprang back into dinosaurs and guitars when you took them off.",
    physicalDetail: "On phones and iPads, everyone was pulling back a virtual wooden slingshot with one fingertip in 'Angry Birds' to launch red and yellow birds into towers of glass and wood.",
    sharingScene: "Friends passed the screen to the next person on the couch to slice flying watermelons and dodge bombs with two fingers in 'Fruit Ninja,' or stood up in front of the Xbox 360 'Kinect' camera to play games using only full-body motion without holding a controller at all.",
    lastingMemory: "Trading shaped rubber bracelets at school lockers and helping a friend earn three gold stars on a tricky puzzle level takes you straight back to 2010."
  },
  2011: {
    item: "Activision's 'Skylanders: Spyro's Adventure' and the glasses-free 3D 'Nintendo 3DS'",
    unboxing: "In 2011, unfolding the aqua-blue 'Nintendo 3DS' and sliding the side '3D Depth Slider' upward made players rub their eyes in disbelief as 'Super Mario 3D Land' leaped out with real depth—without wearing 3D glasses.",
    physicalDetail: "Whenever you walked through school or the mall with the 3DS closed in your pocket, its little green notification LED lit up to tell you that 'StreetPass' had just exchanged Mii characters and puzzle pieces with a stranger walking by.",
    sharingScene: "On the living-room floor, kids plugged a glowing plastic 'Portal of Power' into their console for 'Skylanders,' setting real physical action figures onto the base and gasping as the toy instantly materialized inside the television game.",
    lastingMemory: "Checking your green StreetPass light after a walk through town and swapping Skylanders figures on the glowing portal remains an unforgettable memory of 2011."
  },
  2012: {
    item: "Imangi's 'Temple Run,' 'Subway Surfers,' and the 'Nintendo Wii U' GamePad",
    unboxing: "In 2012, any quiet five minutes on the school bleachers or living-room couch immediately turned into a high-speed swipe marathon on 'Temple Run' and 'Subway Surfers.'",
    physicalDetail: "Gripping a phone with one thumb poised on the glass, you swiped left, right, up, and down at lightning speed to leap over tree roots or dodge oncoming trains while collecting trail coins.",
    sharingScene: "At home, five friends gathered in the living room around Nintendo's new 'Wii U' console, where one player hid their moves on the six-inch touchscreen built right into the white 'GamePad' controller while four others chased them on the big TV in 'Nintendo Land.'",
    lastingMemory: "Handing your phone to your best friend the second a run ended to see who could set the highest score defined every hangout of 2012."
  },
  2013: {
    item: "colorful 'Rainbow Loom' rubber-band kits, 'Candy Crush Saga,' and 'Pokémon X and Y'",
    unboxing: "In 2013, kitchen tables and school backpacks were taken over by plastic organizer cases filled with thousands of tiny colorful rubber bands for the 'Rainbow Loom.'",
    physicalDetail: "Using a miniature plastic pegboard and a crochet-style metal hook, kids looped neon bands into intricate 'Fishtail' and 'Dragon Scale' bracelets until their wrists were covered from hand to elbow.",
    sharingScene: "Between bracelet-weaving sessions, friends battled Mega-Evolved creatures in full 3D in 'Pokémon X and Y' on the flat wedge-shaped 'Nintendo 2DS' while commuters everywhere swiped striped candies in 'Candy Crush Saga.'",
    lastingMemory: "Trading handmade rubber-band bracelets at school lockers and unlocking Mega Charizard with friends captured 2013 playtime to perfection."
  },
  2014: {
    item: "Dong Nguyen's tap-to-flap craze 'Flappy Bird,' '2048,' and 'Mario Kart 8'",
    unboxing: "In early 2014, a deceptively simple eight-bit mobile game called 'Flappy Bird' turned ordinary smartphones into the most intense arcade machines on the block.",
    physicalDetail: "All you had to do was tap your thumb on the glass to keep a tiny pixelated yellow bird airborne between narrow green pipes—yet after its creator suddenly deleted it from app stores, any phone that still had it installed was treated like solid gold.",
    sharingScene: "Friends crowded ten deep around a single desk during lunch to slide numbered tiles together in '2048,' or raced upside-down on anti-gravity tracks in 'Mario Kart 8' while laughing at Luigi's famous slow-motion 'death stare' replay.",
    lastingMemory: "Holding your breath with a circle of friends as someone approached pipe number 50 made 2014 a legendary year for shared suspense."
  },
  2015: {
    item: "the glowing self-balancing electric 'Hoverboard,' 'Super Mario Maker,' and 'Pie Face'",
    unboxing: "In 2015, nothing caused a bigger commotion on neighborhood driveways than lifting a heavy, two-wheeled self-balancing electric 'Hoverboard' out of its box and pressing the silver power button to watch its twin blue LED fender lights flash across the pavement.",
    physicalDetail: "Friends held each other's hands for balance as the internal gyroscopic motors hummed beneath the rubber footpads, leaning their toes forward just a fraction of an inch to glide effortlessly down the sidewalk and spin 360 degrees in place.",
    sharingScene: "When the sun went down, the whole group headed inside to design impossible obstacle courses with the touchscreen stylus in 'Super Mario Maker' or spray neon ink across the map in 'Splatoon.'",
    lastingMemory: "Meanwhile, around the dining table, families howled with laughter as the spring-loaded plastic hand of Hasbro's 'Pie Face' game launched a dollop of whipped cream at a suspenseful click."
  },
  2016: {
    item: "Niantic's 'Pokémon GO,' the palm-sized 'NES Classic Edition,' and 'Clash Royale'",
    unboxing: "In July 2016, launching Niantic's augmented-reality game 'Pokémon GO'—and clipping on the red-and-white wrist-worn 'Pokémon GO Plus' button—turned every real-world park and street corner into a giant living game board.",
    physicalDetail: "Through your camera lens, a wild Squirtle or Snorlax appeared standing right on the actual sidewalk in front of you, waiting for you to flick a virtual Poké Ball across the glass with your fingertip.",
    sharingScene: "Between outdoor walks, school lunch tables turned into real-time card arenas in Supercell's 'Clash Royale,' while families lined up outside electronics stores for Nintendo's palm-sized miniature 'NES Classic Edition' pre-loaded with thirty retro games.",
    lastingMemory: "Those warm summer evenings of 2016 when dozens of friends and neighbors sprinted across the park grass together to catch a rare Dragonite remain one of a kind."
  },
  2017: {
    item: "the hybrid 'Nintendo Switch' console, ball-bearing 'Fidget Spinners,' and 'Cuphead'",
    unboxing: "In the spring of 2017, sliding the neon blue and red 'Joy-Con' controllers onto the sides of the 'Nintendo Switch' with that crisp, unmistakable mechanical 'snap!' changed how and where people played games forever.",
    physicalDetail: "Midway through climbing a mountain in 'The Legend of Zelda: Breath of the Wild' on the living-room TV, you could lift the console straight out of its black dock, flip out the rear kickstand on a table, and hand one detachable Joy-Con to a friend for instant two-player 'Mario Kart 8 Deluxe.'",
    sharingScene: "At the same time, every classroom desk and backpack pocket in the world held a three-pronged metallic ball-bearing 'Fidget Spinner'—friends balanced them on the tip of one thumb or stacked two spinners together to see whose bearing could spin for three full minutes.",
    lastingMemory: "From trading trick spins at school desks to teaming up in the 1930s hand-drawn boss battles of 'Cuphead' at night, 2017 was packed with tactile fun."
  },
  2018: {
    item: "Epic Games' 'Fortnite: Battle Royale,' 'Super Smash Bros. Ultimate,' and 'Nintendo Labo'",
    unboxing: "In 2018, every afternoon after the school bell rang revolved around flipping down your headset microphone and leaping out of the flying blue Battle Bus in 'Fortnite: Battle Royale.'",
    physicalDetail: "With controller in hand, your four-person squad glided down toward Tilted Towers, swung pickaxes to harvest wood and brick, and built towering four-story ramps in seconds as the storm circle closed in.",
    sharingScene: "When friends gathered in person on Friday nights, eight players plugged GameCube and Pro controllers into a single Nintendo Switch dock for massive 'Super Smash Bros. Ultimate' couch tournaments, or folded corrugated cardboard sheets into working pianos and fishing rods with 'Nintendo Labo.'",
    lastingMemory: "Hearing all four friends scream in unison over party chat the second that blue '#1 Victory Royale' banner flashed across the screen defined 2018."
  },
  2019: {
    item: "the turquoise 'Nintendo Switch Lite,' 'Pokémon Sword and Shield,' and the 'Oculus Quest' VR headset",
    unboxing: "In 2019, pulling the compact turquoise or yellow unibody 'Nintendo Switch Lite' out of its box—complete with a classic cross-shaped D-pad molded right into the matte shell—made portable gaming feel lighter and sleeker than ever.",
    physicalDetail: "Friends sat side-by-side on couches cheering inside giant stadiums as their creatures grew stories tall through 'Dynamax' transformations in 'Pokémon Sword and Shield.'",
    sharingScene: "For the ultimate party trick in 2019, someone would bring out the all-in-one wireless 'Oculus Quest' virtual-reality headset, strapping it on in the middle of the living room to slice flying neon cubes with two glowing light sabers in 'Beat Saber.'",
    lastingMemory: "And in 2019, millions of players sat staring at their screens together on group calls as the entire 'Fortnite' island was sucked into a mysterious silent Black Hole for thirty-six hours."
  },
  2020: {
    item: "Nintendo's 'Animal Crossing: New Horizons,' 'Among Us,' and 'Fall Guys'",
    unboxing: "In the spring of 2020, booting up 'Animal Crossing: New Horizons' on a pastel green-and-blue Nintendo Switch turned the screen into a peaceful, sunlit island getaway shared with friends.",
    physicalDetail: "You shook peach trees, decorated outdoor cafés, paid off bells to Tom Nook, and opened your Dodo Airlines airport gate so seven friends from around the world could fly over to visit your island at the same time.",
    sharingScene: "By evening, ten friends hopped onto a group voice call with InnerSloth's space-station mystery game 'Among Us' open in their hands, laughing hysterically during 'Emergency Meetings' as everyone debated whether Red had just vented in Electrical.",
    lastingMemory: "Between hosting virtual graduation parties on island beaches and tumbling through pastel obstacle courses in 'Fall Guys,' games in 2020 kept every friend group connected."
  },
  2021: {
    item: "rainbow silicone 'Pop It' fidget boards, the 'Nintendo Switch OLED,' and 'Metroid Dread'",
    unboxing: "In 2021, every backpack, car seat, and school desk echoed with the soft, rhythmic 'pop-pop-pop' of rainbow-colored silicone 'Pop It' fidget boards.",
    physicalDetail: "Shaped like octagons, dinosaurs, and cupcakes, you pressed each row of rubber bubbles down until it snapped to the other side, then flipped the whole board over to start again like infinite reusable bubble wrap.",
    sharingScene: "Indoors on Friday nights, friends gathered around the crisp white dock and vibrant seven-inch screen of the 'Nintendo Switch OLED' to roll classic board-game dice in 'Mario Party Superstars' or outrun relentless E.M.M.I. robots in 'Metroid Dread.'",
    lastingMemory: "Trading giant 100-bubble fidget boards during the day and stealing stars from your best friend in Mario Party at night defined 2021 playtime."
  },
  2022: {
    item: "FromSoftware's 'Elden Ring,' Valve's handheld 'Steam Deck,' and the daily 'Wordle'",
    unboxing: "In early 2022, every morning began with a quiet five-minute puzzle ritual: opening the browser game 'Wordle' to guess the daily five-letter word in six tries and texting that little grid of green and yellow squares to your group chat.",
    physicalDetail: "By night, living rooms belonged to the vast golden landscapes of FromSoftware's 'Elden Ring,' where players summoned spectral steeds and passed the controller back and forth to conquer towering bosses like Starscourge Radahn.",
    sharingScene: "Meanwhile, tech fans marveled at Valve's matte-black 'Steam Deck'—a handheld console with dual thumbsticks and square haptic trackpads that let you carry a massive library of games straight to the sofa or train ride.",
    lastingMemory: "Comparing your morning three-try word puzzle at breakfast and teaming up in the Lands Between at midnight gave 2022 a rhythm that every player shared."
  },
  2023: {
    item: "Nintendo's 'The Legend of Zelda: Tears of the Kingdom,' 'Baldur's Gate 3,' and 'Super Mario Bros. Wonder'",
    unboxing: "In 2023, snapping the gold-patterned 'The Legend of Zelda: Tears of the Kingdom' cartridge into the Switch turned every living room into a backyard engineering lab.",
    physicalDetail: "Using Link's new 'Ultrahand' ability, you could fuse wooden logs, spinning fans, wheels, and Zonai rockets together at the press of a button to build working hoverbikes, airships, and catapults.",
    sharingScene: "Later in 2023, groups of friends gathered for months-long tabletop-style campaigns in 'Baldur's Gate 3'—cheering every time a giant twenty-sided virtual die rolled across the center of the screen—or transformed into comical Elephant Mario in 'Super Mario Bros. Wonder.'",
    lastingMemory: "Showing off your wildest homemade flying machines and rolling critical 20s with friends made 2023 a modern golden age of play."
  },
  2024: {
    item: "'Pokémon Trading Card Game Pocket,' 'The Legend of Zelda: Echoes of Wisdom,' and 'College Football 25'",
    unboxing: "In 2024, friends sitting at cafés and living rooms everywhere held their phones side-by-side to count down '3, 2, 1' and swipe their fingers across the glass to slice open gleaming 3D foil booster packs in 'Pokémon Trading Card Game Pocket.'",
    physicalDetail: "Tilting your screen in the light let you admire parallax 3D immersive illustrations of Charizard and Pikachu before placing your favorite cards into digital display binders.",
    sharingScene: "On the television, college sports fans celebrated the long-awaited return of 'EA Sports College Football 25' after an eleven-year hiatus, while Nintendo Switch players conjured tables, trampolines, and monsters as Princess Zelda in 'The Legend of Zelda: Echoes of Wisdom.'",
    lastingMemory: "Trading Wonder Picks with friends over morning coffee and competing in 20-player mini-game marathons in 'Super Mario Party Jamboree' brought pure joy to every hangout in 2024."
  }
};

const YEAR_EXTRA_PLAY_SCENE: Record<number, string> = {
  1965: "In between backyard missions, kids also stretched pink 'Super Elastic Bubble Plastic' on the end of a tiny straw or bounced 'Super Balls' manufactured from Zectron rubber over the garage roof.",
  1966: "Out on the sidewalk, kids also snapped together plastic 'Slot Car' figure-eight tracks and squeezed the thumb-trigger controllers to keep their racers from flying off the hairpin turns.",
  1967: "Outdoors, anyone with a pocketful of change bought balsa-wood gliders with red plastic nose clips for ten cents at the corner store and launched them across the park lawn.",
  1968: "At the kitchen table, siblings also took turns pushing plastic marbles across the hexagonal board of Ideal's 'KerPlunk'—holding their breath as they slid each plastic straw out of the translucent tube.",
  1969: "Meanwhile, inspired by Apollo 11, kids everywhere pumped water and air into red-and-white plastic 'Park Plastics Water Rockets' on the lawn and watched them shoot eighty feet into the summer sky.",
  1970: "Out on the porch, friends also competed with plastic 'Toss Across' tic-tac-toe beanbags and snapped together motorized 'Lego' gear sets on the carpet.",
  1971: "Indoors, kids also pressed warm crayons onto spinning paper discs inside 'Spin-Art' machines to create psychedelic splatter paintings for their bedroom walls.",
  1972: "At the dining-room table, friends also tested their nerve with Ideal's plastic camel game 'Last Straw' or raced wind-up 'Evel Knievel Stunt Cycle' motorcycles off homemade plywood ramps.",
  1973: "Out on the front walk, friends also traded Wacky Packages parody stickers and practiced yoyo 'Walk the Dog' and 'Around the World' tricks with wooden 'Duncan Imperial' yoyos.",
  1974: "Out in the yard, kids also squeezed the dual handles of plastic 'Slip 'N Slide' water mats hooked up to the garden hose, skimming across the wet yellow vinyl all afternoon.",
  1975: "Across the living-room floor, kids also lined up wooden 'Domino Rally' chains and guided magnetic metal football players vibrating across an electric 'Tudor Tru-Action Electric Football' tin board.",
  1976: "At the kitchen table, friends also poured cherry syrup into the crank-operated 'Snoopy Sno-Cone Machine' to shave ice with a metal plunger after an afternoon in the sun.",
  1977: "Out on the patio, kids also pumped the yellow handle of Kenner's 'Stretch Monster' and fired soft foam discs from gray plastic 'Star Trek' tracer guns.",
  1978: "Meanwhile, on neighborhood driveways, younger kids pedaled low-slung black-and-red plastic 'Green Machine' and 'Big Wheel' tricycles, pulling the handbrake to spin into 180-degree power slides.",
  1979: "Across the bedroom rug, friends also assembled detailed plastic 'Star Wars' Millennium Falcon spaceships with secret smuggling compartments under the floor panels.",
  1980: "And whenever two friends sat down at the kitchen table, out came the red-and-blue plastic cases of Milton Bradley's 'Battleship,' calling out 'B-4!' and snapping white and red pegs into the ocean grid.",
  1981: "Out in the driveway, kids also clicked colorful plastic beads onto their bicycle spokes and traded 'Strawberry Shortcake' scented dolls that smelled like real berries.",
  1982: "At school lunch tables, friends also pulled foldable 'Transformers'-precursor 'Diaclone' cars and colorful 'My Little Pony' figures with nylon manes out of their backpacks.",
  1983: "And out on the curb, kids spent hours flipping 'Garbage Pail Kids' and Return of the Jedi trading cards or guiding metal balls through the tilting labyrinth of Tomy's 'Screwball Scramble.'",
  1984: "In the backyard, kids also strapped tin canisters to their backs to play 'Ghostbusters' or snapped plastic caps into heavy die-cast cap-guns until the porch smelled like sulfur.",
  1985: "At recess, friends also pulled furry electronic 'Pound Puppies' and 'M.A.S.K.' transforming vehicles with hidden spring-loaded wings out of their school bags.",
  1986: "At the kitchen table, kids also squeezed neon 'Madballs' foam faces and raced radio-controlled Tamiya 'Grasshopper' buggies up and down the sidewalk curb.",
  1987: "In the afternoon, kids also launched foam-tipped arrows from orange 'Nerf Bow 'n' Arrow' sets and collected holographic 'Visionaries' action figures.",
  1988: "Out on the sidewalk, kids also strapped plastic 'Skip-It' counters around one ankle—hopping in circles for twenty minutes straight as the spinning ball tallied every jump.",
  1989: "Out in the yard, kids also pumped up the bright orange inflatable tongue of 'Reebok Pump' sneakers and batted tethered tennis balls around metal 'Swingball' poles.",
  1990: "And whenever friends stayed over for the weekend, out came Milton Bradley's 'HeroQuest' board game or Tiger's voice-activated LCD handhelds.",
  1991: "At school desks, kids also folded paper fortune-tellers, traded shiny Marvel Series II hologram cards, and bounced high-density 'Monster Face' balls down the hallway.",
  1992: "Out on the sidewalk, kids also strapped purple-and-green 'Moon Shoes' mini-trampolines onto their sneakers and tried walking across the lawn without tipping over.",
  1993: "At kitchen tables everywhere, kids also baked rubbery bugs in 'Creepy Crawlers' toy ovens and carefully stacked plastic groceries into the 'Grape Escape' and 'Don't Wake Daddy' board games.",
  1994: "And in bedrooms everywhere, friends slid plastic cartridges into the 'Sega Game Gear' handheld or customized 'Street Sharks' and 'Biker Mice from Mars' figures.",
  1995: "At recess, kids also traded 'Goosebumps' books with raised embossed covers and spun metallic 'Spinjas' battle tops inside plastic stadium rings.",
  1996: "Out on the playground, kids also mastered tricks with spring-loaded 'Yomega Brain' auto-return yoyos and raced 'Tyco RC Terrain Twister' vehicles across puddles.",
  1997: "At the same time, every toy basket in the house was overflowing with plush 'Beanie Babies'—each with its heart-shaped red 'Ty' tag carefully sealed inside a clear plastic protector case.",
  1998: "And on the living-room floor, friends twisted and pulled the yellow plastic handles of Hasbro's 'Bop It!' as the voice shouted 'Bop it! Twist it! Pull it!' faster and faster.",
  1999: "Out in the yard, kids also pumped the air tank on silver-and-orange 'Nerf SuperMAXX' blasters and battled motorized plastic tops.",
  2000: "Meanwhile, bedrooms echoed with the metallic bark of Sony's robotic silver dog 'AIBO' and Hasbro's 'Poo-Chi,' alongside stacks of glowing blue 'Yu-Gi-Oh!' deck boxes.",
  2001: "At the kitchen table, kids also snapped together articulated plastic masks and gears for LEGO's new 'Bionicle' Toa heroes—Tahu, Kopaka, and Gali—straight out of their cylindrical canisters.",
  2002: "And at school lunch tables, duelists strapped plastic 'Yu-Gi-Oh!' Duel Disks onto their forearms to summon 'Blue-Eyes White Dragon' and 'Dark Magician' cards.",
  2003: "Out on the driveway, kids also rode two-wheeled 'Caster Boards' and 'Heelys' sneakers with a single removable wheel hidden inside the heel so you could transition from walking to rolling in one step.",
  2004: "And at school hallways, kids pointed the infrared ports of their 'Tamagotchi Connection' keychains together so their virtual pets could visit each other's screens and exchange gifts.",
  2005: "Meanwhile, in bedrooms everywhere, kids scratched secret codes off the tags of plush 'Webkinz' pets to adopt their digital twins, or spun 'Fly Pentop' smart-pens across special dotted paper.",
  2006: "At school desks, kids also popped tiny magnetic 'Bakugan' spheres onto metal cards to watch them spring open into miniature dragons, or clipped colorful 'Jibbitz' charms into foam Crocs.",
  2007: "On the Nintendo DS, friends also gathered in four-player circles to race 'Mario Kart DS' and trade Stylus notes while testing who could survive 'Through the Fire and Flames' on Expert.",
  2008: "Out in the backyard, kids also loaded thirty-dart chains into Hasbro's battery-powered 'Nerf N-Strike Vulcan' tripod blaster and staged neighborhood foam-dart battles.",
  2009: "Out on neighborhood streets, teenagers rode wavy two-wheeled 'RipStik' caster boards that propelled forward by twisting your hips without ever setting a foot on the pavement.",
  2010: "And in backyards everywhere, friends tested trick shots with motorized 'Nerf N-Strike Stampede' blasters and launched metal 'Beyblade: Metal Fusion' tops.",
  2011: "Meanwhile, on phones and tablets, everyone was slicing fruit combos, running from temple monkeys in 'Temple Run,' or stacking blocks in 'Tiny Tower.'",
  2012: "Across school cafeterias, kids also traded 'Beyblade' customization parts and jumped into four-player split-screen 'Minecraft: Xbox 360 Edition' worlds.",
  2013: "And on smartphones everywhere, friends challenged classmates across the world to live seven-question trivia duels in 'QuizUp' or dodged oncoming trains in 'Subway Surfers.'",
  2014: "At home on the Wii U, players also tapped plastic 'Amiibo' figurines directly onto the controller to bring their favorite characters to life inside the game.",
  2015: "From gliding down the pavement on LED-lit wheels before dinner to building custom Mario levels and tabletop pranks at night, playtime in 2015 turned every weekend into an event.",
  2016: "And in toy aisles everywhere, kids tapped on speckled plastic 'Hatchimals' eggs for twenty minutes until the glowing-eyed plush creature inside pecked its own way through the shell.",
  2017: "And at kitchen tables, kids peeled back seven layers of wrapping on spherical 'L.O.L. Surprise!' balls or battled friends in 'Splatoon 2.'",
  2018: "Meanwhile, anyone with a smartphone was either slinging magnetic marbles down rotating towers in 'Helix Jump' or riding shared electric kick-scooters down neighborhood bike lanes with friends.",
  2019: "From compact handheld consoles in every backpack to wireless virtual-reality headsets in the living room, 2019 made gaming feel more social and immediate than ever.",
  2020: "And in living rooms everywhere, kids placed plastic cardboard gates across the carpet to race real camera-equipped RC karts in 'Mario Kart Live: Home Circuit.'",
  2021: "Meanwhile, collectors lined up for shiny gold-box 'Pokémon 25th Anniversary Celebrations' card tins and built motorized LEGO Technic supercars on the bedroom floor.",
  2022: "And on the Nintendo Switch, friends gathered for chaotic four-player ink battles in 'Splatoon 3' while lining their beds with ultra-soft 'Squishmallows' plushies.",
  2023: "Meanwhile, tabletop card shops packed every table on Friday nights as players opened booster packs for the brand-new Disney 'Lorcana' trading card game.",
  2024: "And out in backyards and parks, friends rallied feathered paddles in neighborhood 'Pickleball' tournaments and built intricate botanical LEGO flower bouquets."
};

const buildTechSingleCraze = (_rawTech: string, year: number): string => {
  const entry = YEAR_SINGLE_TOY_CRAZE[year];
  const extraScene = YEAR_EXTRA_PLAY_SCENE[year];
  if (entry) {
    return ensure5To7Sentences([
      entry.unboxing,
      entry.physicalDetail,
      entry.sharingScene,
      entry.lastingMemory,
      extraScene || `Every Friday afternoon in ${year}, neighborhoods and living rooms came alive as friends gathered to share the newest games and inventions together.`
    ]);
  }

  // Varied fallback for years before 1965
  const fallbackItem =
    year < 1958 ? "a gleaming 'Lionel O-Gauge Electric Train Set'" :
    year < 1960 ? "Wham-O's brightly colored plastic 'Hula Hoop'" :
    "Ohio Art's red-framed 'Etch A Sketch' drawing screen";

  return ensure5To7Sentences([
    `In ${year}, the undisputed toy craze that took over every neighborhood sidewalk and living-room floor was ${fallbackItem}.`,
    `There was an unforgettable rush of excitement the moment you lifted ${fallbackItem} out of its box and tested it in your hands for the very first time.`,
    `Out on the front porch and driveway, kids also spent hours walking metal 'Slinky' springs down the front steps, shooting glass cat's-eye marbles in dirt rings, and spinning wooden tops.`,
    `Inside on rainy afternoons, siblings gathered around the parlor rug to build miniature log cabins out of notched reddish-brown 'Lincoln Logs' and bolt steel girders together with 'Erector Sets.'`,
    `From simple sidewalk games before dinner to imaginative living-room creations at night, playtime in ${year} brought every kid on the block together.`
  ]);
};

// ============================================================================
// 3. POP CULTURE -> "🎵 Pop Culture: The Soundtrack and Screens of [Year]"
// Capture the cultural obsession of the year: describe the exact feeling of hearing the biggest hit song
// on the radio or sitting in a packed, dark movie theater (5-7 sentences, explicitly naming song, artist, and movie).
// ============================================================================
const EXACT_YEAR_SONG_AND_MOVIE: Record<number, {
  song: string;
  artist: string;
  movie: string;
  creator: string;
  sceneVibe: string;
}> = {
  1965: { song: "(I Can't Get No) Satisfaction", artist: "The Rolling Stones", movie: "The Sound of Music", creator: "Robert Wise and Julie Andrews", sceneVibe: "watching Julie Andrews spin across the green Alpine meadow as the opening orchestral swell filled the theater" },
  1966: { song: "Good Vibrations", artist: "The Beach Boys", movie: "The Good, the Bad and the Ugly", creator: "Sergio Leone and Clint Eastwood", sceneVibe: "leaning forward in the dark as Ennio Morricone's echoing two-note whistle built tension during the final three-way circular standoff" },
  1967: { song: "Respect", artist: "Aretha Franklin", movie: "The Jungle Book", creator: "Walt Disney Productions", sceneVibe: "tapping your feet in the velvet theater seats as Baloo the bear and Mowgli sang 'The Bare Necessities' down the jungle river" },
  1968: { song: "Hey Jude", artist: "The Beatles", movie: "2001: A Space Odyssey", creator: "Stanley Kubrick", sceneVibe: "staring up in awe at the giant curved Cinerama screen as the 'Star Gate' light show and 'Thus Spake Zarathustra' thundered through the auditorium" },
  1969: { song: "Sugar, Sugar", artist: "The Archies", movie: "Butch Cassidy and the Sundance Kid", creator: "Paul Newman and Robert Redford", sceneVibe: "holding your breath with the entire crowd as Paul Newman and Robert Redford leaped off the rocky cliff into the roaring river below" },
  1970: { song: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", movie: "Love Story", creator: "Arthur Hiller", sceneVibe: "hearing sniffles across every row of the darkened theater as the piano theme played and Ali MacGraw spoke the famous line about love" },
  1971: { song: "Joy to the World", artist: "Three Dog Night", movie: "Willy Wonka & the Chocolate Factory", creator: "Gene Wilder", sceneVibe: "watching the candyman's factory doors swing open to reveal a glowing edible wonderland of chocolate rivers and giant gummy bears" },
  1972: { song: "American Pie", artist: "Don McLean", movie: "The Godfather", creator: "Francis Ford Coppola and Marlon Brando", sceneVibe: "sitting in pin-drop silence as the haunting trumpet solo faded in and Marlon Brando spoke from the shadows of his study" },
  1973: { song: "Superstition", artist: "Stevie Wonder", movie: "The Sting", creator: "Paul Newman and Robert Redford", sceneVibe: "grinning with the whole audience as Scott Joplin's ragtime piano bounced from the speakers and the ultimate big-con twist clicked into place" },
  1974: { song: "The Way We Were", artist: "Barbra Streisand", movie: "Young Frankenstein", creator: "Mel Brooks and Gene Wilder", sceneVibe: "hearing the entire auditorium roar with nonstop laughter as Gene Wilder and Peter Boyle performed 'Puttin' On the Ritz' in top hats and tails" },
  1975: { song: "Love Will Keep Us Together", artist: "Captain & Tennille", movie: "Jaws", creator: "Steven Spielberg", sceneVibe: "feeling the whole theater jump out of their seats in unison when the great white shark suddenly lunged out of the dark water behind Roy Scheider" },
  1976: { song: "Dancing Queen", artist: "ABBA", movie: "Rocky", creator: "Sylvester Stallone", sceneVibe: "cheering out loud with hundreds of strangers as Rocky Balboa sprinted up the stone steps of the Philadelphia Museum of Art with his fists raised high" },
  1977: { song: "Dreams", artist: "Fleetwood Mac", movie: "Star Wars", creator: "George Lucas", sceneVibe: "feeling the floor rumble beneath your shoes as the golden fanfare blasted and a giant Imperial Star Destroyer rumbled endlessly overhead across the stars" },
  1978: { song: "Stayin' Alive", artist: "the Bee Gees", movie: "Grease", creator: "John Travolta and Olivia Newton-John", sceneVibe: "singing along in the dark as John Travolta and Olivia Newton-John danced through the carnival finale to 'You're the One That I Want'" },
  1979: { song: "My Sharona", artist: "The Knack", movie: "Alien", creator: "Ridley Scott and Sigourney Weaver", sceneVibe: "gripping the armrests in the pitch-black cinema as Sigourney Weaver crept through the strobing, steam-filled corridors of the Nostromo" },
  1980: { song: "Call Me", artist: "Blondie", movie: "Star Wars: The Empire Strikes Back", creator: "George Lucas and Irvin Kershner", sceneVibe: "hearing a collective gasp ripple through the packed theater when Darth Vader looked at Luke Skywalker over the Cloud City abyss and revealed the truth" },
  1981: { song: "Bette Davis Eyes", artist: "Kim Carnes", movie: "Raiders of the Lost Ark", creator: "Steven Spielberg and Harrison Ford", sceneVibe: "cheering as Harrison Ford's Indiana Jones snatched his fedora from under a closing stone door and sprinted away from a giant rolling boulder" },
  1982: { song: "Eye of the Tiger", artist: "Survivor", movie: "E.T. the Extra-Terrestrial", creator: "Steven Spielberg", sceneVibe: "watching in wonder as Elliott's BMX bicycle lifted off the forest trail and glided silhouetted across a giant full moon" },
  1983: { song: "Billie Jean", artist: "Michael Jackson", movie: "Star Wars: Return of the Jedi", creator: "George Lucas", sceneVibe: "feeling the rush of speed as Rebel speeder bikes weaved between giant redwood trees on Endor and green lightsabers clashed in the throne room" },
  1984: { song: "When Doves Cry", artist: "Prince", movie: "Ghostbusters", creator: "Ivan Reitman and Bill Murray", sceneVibe: "laughing and cheering with the packed house as a hundred-foot Stay Puft Marshmallow Man stomped down the avenues of Manhattan" },
  1985: { song: "Everybody Wants to Rule the World", artist: "Tears for Fears", movie: "Back to the Future", creator: "Robert Zemeckis and Michael J. Fox", sceneVibe: "holding your breath as lightning struck the Hill Valley clock tower and Marty McFly's DeLorean vanished in twin trails of fire at 88 miles per hour" },
  1986: { song: "Walk Like an Egyptian", artist: "The Bangles", movie: "Top Gun", creator: "Tony Scott and Tom Cruise", sceneVibe: "feeling the roar of F-14 Tomcat afterburners rattle the theater walls as Tom Cruise raced a motorcycle down the sunset runway" },
  1987: { song: "I Wanna Dance with Somebody (Who Loves Me)", artist: "Whitney Houston", movie: "The Princess Bride", creator: "Rob Reiner", sceneVibe: "smiling from ear to ear in the dark as swordfighters traded witty banter atop the Cliffs of Insanity and 'As you wish' became an instant classic" },
  1988: { song: "Sweet Child o' Mine", artist: "Guns N' Roses", movie: "Who Framed Roger Rabbit", creator: "Robert Zemeckis", sceneVibe: "rubbing your eyes in disbelief as live-action Hollywood noir and hand-drawn cartoon characters shared the exact same screen in Toontown" },
  1989: { song: "Like a Prayer", artist: "Madonna", movie: "Batman", creator: "Tim Burton and Michael Keaton", sceneVibe: "watching the sleek black Batmobile ignite its jet turbine and streak through the gothic shadows of Gotham City to Danny Elfman's brass score" },
  1990: { song: "U Can't Touch This", artist: "MC Hammer", movie: "Home Alone", creator: "Chris Columbus and Macaulay Culkin", sceneVibe: "crying with laughter alongside the entire auditorium as eight-year-old Macaulay Culkin sprung paint-can booby traps on two hapless burglars" },
  1991: { song: "Smells Like Teen Spirit", artist: "Nirvana", movie: "Terminator 2: Judgment Day", creator: "James Cameron and Arnold Schwarzenegger", sceneVibe: "staring in amazement as a liquid-metal T-1000 morphed right through solid steel prison bars in groundbreaking computer animation" },
  1992: { song: "I Will Always Love You", artist: "Whitney Houston", movie: "Aladdin", creator: "Walt Disney Animation and Robin Williams", sceneVibe: "laughing nonstop at Robin Williams's rapid-fire Genie transformations before soaring over the clouds on a magic carpet to 'A Whole New World'" },
  1993: { song: "Dreams", artist: "The Cranberries", movie: "Jurassic Park", creator: "Steven Spielberg", sceneVibe: "watching the ripples vibrate in a cup of water on a Ford Explorer dashboard just before a life-sized Tyrannosaurus rex stepped out into the rain" },
  1994: { song: "I'll Make Love to You", artist: "Boyz II Men", movie: "The Lion King", creator: "Walt Disney Feature Animation", sceneVibe: "feeling chills run down your spine as the red African sun rose on the giant screen and the opening chant of 'Circle of Life' echoed through the theater" },
  1995: { song: "Gangsta's Paradise", artist: "Coolio", movie: "Toy Story", creator: "Pixar Animation Studios and Tom Hanks", sceneVibe: "discovering the magic of the world's first computer-animated feature as Woody and Buzz Lightyear glided gracefully into the moving van" },
  1996: { song: "Wannabe", artist: "the Spice Girls", movie: "Independence Day", creator: "Roland Emmerich and Will Smith", sceneVibe: "hearing the entire Friday-night crowd erupt into applause after Bill Pullman's rousing speech and Will Smith's cockpit cigar celebration" },
  1997: { song: "My Heart Will Go On", artist: "Celine Dion", movie: "Titanic", creator: "James Cameron, Leonardo DiCaprio, and Kate Winslet", sceneVibe: "sitting in a sold-out theater where everyone held their breath as Jack and Rose stood with arms outstretched at the bow of the ship" },
  1998: { song: "...Baby One More Time", artist: "Britney Spears", movie: "Saving Private Ryan", creator: "Steven Spielberg and Tom Hanks", sceneVibe: "sitting in stunned, reverent silence as the visceral history of Normandy unfolded on screen with unmatched realism" },
  1999: { song: "Smooth", artist: "Santana featuring Rob Thomas", movie: "The Matrix", creator: "the Wachowskis and Keanu Reeves", sceneVibe: "watching the camera spin 360 degrees in 'bullet time' as Keanu Reeves leaned backward in a black trench coat on a skyscraper roof" },
  2000: { song: "Bye Bye Bye", artist: "*NSYNC", movie: "Gladiator", creator: "Ridley Scott and Russell Crowe", sceneVibe: "feeling the roar of the Roman Colosseum crowd as Russell Crowe removed his spiked helmet and declared, 'Are you not entertained?'" },
  2001: { song: "Fallin'", artist: "Alicia Keys", movie: "Harry Potter and the Sorcerer's Stone", creator: "Chris Columbus and Daniel Radcliffe", sceneVibe: "watching wooden boats glide across a dark lake toward the candlelit towers of Hogwarts Castle as John Williams's celesta melody twinkled" },
  2002: { song: "Lose Yourself", artist: "Eminem", movie: "Spider-Man", creator: "Sam Raimi and Tobey Maguire", sceneVibe: "feeling your stomach drop with excitement as Tobey Maguire swung between Manhattan skyscrapers at sunset for the very first time" },
  2003: { song: "In Da Club", artist: "50 Cent", movie: "The Lord of the Rings: The Return of the King", creator: "Peter Jackson", sceneVibe: "getting goosebumps as six thousand Rohirrim horsemen charged across the Pelennor Fields at dawn to the sound of battle horns" },
  2004: { song: "Yeah!", artist: "Usher featuring Lil Jon and Ludacris", movie: "Shrek 2", creator: "DreamWorks Animation", sceneVibe: "laughing with a packed auditorium as Puss in Boots flashed his giant adorable eyes and a fifty-foot Gingerbread Man stormed the castle" },
  2005: { song: "We Belong Together", artist: "Mariah Carey", movie: "Star Wars: Episode III – Revenge of the Sith", creator: "George Lucas", sceneVibe: "watching blue lightsabers clash above rivers of glowing lava on Mustafar in a packed midnight screening where fans waved plastic sabers in the aisles" },
  2006: { song: "Hips Don't Lie", artist: "Shakira featuring Wyclef Jean", movie: "Pirates of the Caribbean: Dead Man's Chest", creator: "Gore Verbinski and Johnny Depp", sceneVibe: "cheering as Johnny Depp's Captain Jack Sparrow dueled atop a giant runaway wooden waterwheel rolling through the Caribbean jungle" },
  2007: { song: "Umbrella", artist: "Rihanna featuring Jay-Z", movie: "Spider-Man 3", creator: "Sam Raimi and Tobey Maguire", sceneVibe: "sitting in a packed opening-weekend theater as Spider-Man battled Sandman and Venom high above the glittering avenues of New York" },
  2008: { song: "Viva la Vida", artist: "Coldplay", movie: "The Dark Knight", creator: "Christopher Nolan, Christian Bale, and Heath Ledger", sceneVibe: "leaning forward in electric silence every single time Heath Ledger's Joker walked onto the IMAX screen during the Gotham bank heist and hospital scenes" },
  2009: { song: "I Gotta Feeling", artist: "The Black Eyed Peas", movie: "Avatar", creator: "James Cameron", sceneVibe: "putting on polarized 3D glasses in the dark and reaching out your hand as glowing bioluminescent seeds drifted through the forests of Pandora" },
  2010: { song: "Rolling in the Deep", artist: "Adele", movie: "Inception", creator: "Christopher Nolan and Leonardo DiCaprio", sceneVibe: "hearing a collective gasp across the entire theater as the silver spinning top wobbled on the table just before the screen cut to black" },
  2011: { song: "Party Rock Anthem", artist: "LMFAO", movie: "Harry Potter and the Deathly Hallows – Part 2", creator: "David Yates", sceneVibe: "sharing an emotional farewell with a theater full of fans who had grown up together over ten years as the Battle of Hogwarts reached its finale" },
  2012: { song: "Somebody That I Used to Know", artist: "Gotye featuring Kimbra", movie: "Marvel's The Avengers", creator: "Joss Whedon and Robert Downey Jr.", sceneVibe: "hearing the entire audience cheer like a football stadium as the camera circled all six Avengers standing back-to-back in midtown Manhattan" },
  2013: { song: "Get Lucky", artist: "Daft Punk featuring Pharrell Williams", movie: "Frozen", creator: "Walt Disney Animation Studios", sceneVibe: "watching Queen Elsa build a glittering palace of ice up the mountainside while the whole theater hummed 'Let It Go'" },
  2014: { song: "Uptown Funk", artist: "Mark Ronson featuring Bruno Mars", movie: "Interstellar", creator: "Christopher Nolan and Matthew McConaughey", sceneVibe: "feeling Hans Zimmer's pipe-organ score vibrate right through your chest as the spacecraft docked in spinning orbit above a giant black hole" },
  2015: { song: "Hello", artist: "Adele", movie: "Star Wars: The Force Awakens", creator: "J.J. Abrams", sceneVibe: "erupting into applause with the opening-night crowd the second the Millennium Falcon tarp flew off and Han Solo said, 'Chewie, we're home'" },
  2016: { song: "Closer", artist: "The Chainsmokers featuring Halsey", movie: "Captain America: Civil War", creator: "Anthony and Joe Russo", sceneVibe: "cheering out loud when the word 'QUEENS' flashed on screen and a teenage Spider-Man flipped into the airport tarmac battle" },
  2017: { song: "Shape of You", artist: "Ed Sheeran", movie: "Star Wars: The Last Jedi", creator: "Rian Johnson", sceneVibe: "experiencing five seconds of complete, breathless silence across a packed theater as Vice Admiral Holdo's cruiser jumped to lightspeed" },
  2018: { song: "God's Plan", artist: "Drake", movie: "Avengers: Infinity War", creator: "Anthony and Joe Russo", sceneVibe: "hearing the thunderous roar when Thor arrived in Wakanda—followed ten minutes later by stunned, pin-drop disbelief as heroes turned to dust" },
  2019: { song: "Old Town Road", artist: "Lil Nas X featuring Billy Ray Cyrus", movie: "Avengers: Endgame", creator: "Anthony and Joe Russo", sceneVibe: "experiencing the loudest theater cheer of a lifetime when golden portals opened, Captain America caught Mjolnir, and shouted 'Avengers... assemble'" },
  2020: { song: "Blinding Lights", artist: "The Weeknd", movie: "Tenet", creator: "Christopher Nolan", sceneVibe: "watching time literally run backward and forward at once across the screen in a mind-bending espionage spectacle" },
  2021: { song: "drivers license", artist: "Olivia Rodrigo", movie: "Spider-Man: No Way Home", creator: "Jon Watts and Tom Holland", sceneVibe: "jumping out of your seat as Andrew Garfield and Tobey Maguire stepped through glowing portals to unite three generations of Spider-Man" },
  2022: { song: "As It Was", artist: "Harry Styles", movie: "Top Gun: Maverick", creator: "Joseph Kosinski and Tom Cruise", sceneVibe: "gripping your seat as real cockpit cameras put you inside roaring Navy jets diving through a narrow snow-covered canyon" },
  2023: { song: "Flowers", artist: "Miley Cyrus", movie: "Barbie", creator: "Greta Gerwig and Margot Robbie", sceneVibe: "sitting in a sea of pink outfits laughing and wiping away tears together as Barbie stepped out of pastel Barbieland into the real world" },
  2024: { song: "Espresso", artist: "Sabrina Carpenter", movie: "Inside Out 2", creator: "Pixar Animation Studios", sceneVibe: "laughing in recognition with a packed family crowd as new emotions led by orange-haired Anxiety took over headquarters inside Riley's mind" }
};

const buildPopVibe = (year: number, rawPop: string = ''): string => {
  const item = EXACT_YEAR_SONG_AND_MOVIE[year] || {
    song: "Rock Around the Clock",
    artist: "Bill Haley & His Comets",
    movie: "Singin' in the Rain",
    creator: "Gene Kelly and Stanley Donen",
    sceneVibe: "smiling in the darkened theater as Gene Kelly splashed joyfully through puddles under a glowing streetlamp"
  };

  const rawPopSents = splitIntoSentences(rawPop);

  return ensure5To7Sentences([
    `Tune into the airwaves of ${year} and the defining anthem pouring out of car windows and stereos everywhere was '${item.song}' by ${item.artist}.`,
    ...rawPopSents,
    `When Friday night arrived, moviegoers lined up down the sidewalk for ${item.creator}'s box-office phenomenon '${item.movie},' sinking into their theater seats with buttered popcorn and ${item.sceneVibe}.`
  ], 5);
};

// ============================================================================
// 4. PRICE SHOCK -> "💸 The Price Shock: What Everyday Life Cost"
// Concrete, zero-filler comparison of everyday costs in that exact year.
// ============================================================================
const buildPriceShockVibe = (year: number, exact: ExactYearData): string => {
  const { housePrice, minWage } = getYearLeadersAndPop(year);
  const cleanBurger = exact.priceShock.burger.replace(/\s*\([^)]*\)/g, '');

  const groceries =
    year < 1960 ? "$0.92 for a gallon of milk, $0.18 for a loaf of bread, and $0.57 for a dozen eggs" :
    year < 1975 ? "$1.32 for a gallon of milk, $0.28 for a loaf of bread, and $0.69 for a dozen eggs" :
    year < 1985 ? "$1.89 for a gallon of milk, $0.52 for a loaf of bread, and $0.84 for a dozen eggs" :
    year < 1995 ? "$2.48 for a gallon of milk, $0.75 for a loaf of bread, and $0.98 for a dozen eggs" :
    year < 2005 ? "$2.89 for a gallon of milk, $0.96 for a loaf of bread, and $1.18 for a dozen eggs" :
    year < 2015 ? "$3.49 for a gallon of milk, $1.38 for a loaf of bread, and $1.82 for a dozen eggs" :
    "$3.98 for a gallon of milk, $1.89 for a loaf of bread, and $2.65 for a dozen eggs";

  return ensure5To7Sentences([
    `In ${year}, pulling into a neighborhood service station meant filling the tank with regular gasoline at an average of just ${exact.priceShock.gas} per gallon.`,
    `A Friday-night outing cost pocket change by modern standards: a hot fast-food burger went for ${cleanBurger} and a prime-time cinema ticket averaged ${exact.priceShock.ticket}.`,
    `At the supermarket checkout in ${year}, families picked up everyday staples at ${groceries}.`,
    `Across the broader economy of ${year}, the federal minimum wage stood at ${minWage} and median household income averaged ${exact.priceShock.income} per year.`,
    `For major life purchases in ${year}, a brand-new automobile carried a sticker price of ${exact.priceShock.car}, while a newly built family home averaged ${housePrice}.`
  ], 5);
};

// ============================================================================
// 5. FASHION & VIBE -> "👗 Fashion & Vibe: The Iconic Style of [Year]"
// Concise, year-specific wardrobe, textures, brands, and footwear without generic filler.
// ============================================================================
const buildFashionVibeStory = (rawFashion: string, year: number): string => {
  const rawSents = splitIntoSentences(rawFashion);

  const eraDetails =
    year < 1980
      ? [
          `Everyday wardrobes favored tactile fabrics like brushed corduroy, ribbed knit turtlenecks, suede vests, and high-waisted Levi's or Wrangler bell-bottom flares in warm earth tones.`,
          `Classic canvas Converse Chuck Taylors, crisp white Adidas Stan Smiths, platform shoes, and Ray-Ban Wayfarer sunglasses completed the signature street look of ${year}.`
        ]
      : year < 1990
      ? [
          `Wardrobes leaned into acid-washed Levi's and Guess denim jackets, crinkly neon nylon windbreakers, slouchy Esprit sweatshirts, and tightly pegged jeans rolled twice at the ankle.`,
          `Fresh leather Nike Air Jordans, white double-strap Reebok Freestyles, checkerboard Vans slip-ons, and colorful plastic Swatch watches anchored the street style of ${year}.`
        ]
      : year < 2000
      ? [
          `Streetwear paired wide-leg Levi's SilverTab denim and brushed-cotton plaid flannel shirts with bold red-white-and-blue Tommy Hilfiger nylon jackets and cozy Gap fleece pullovers.`,
          `Heavy leather Dr. Martens 1460 boots, scuffed suede Vans, chunky Nike Air Max runners, and unisex CK One cologne rounded out the unmistakable look of ${year}.`
        ]
      : year < 2010
      ? [
          `Signature Y2K outfits combined low-rise bootcut denim, pastel Juicy Couture velour tracksuits, layered polo shirts, metallic belts, and shiny Lancôme Juicy Tubes lip gloss.`,
          `Spotless all-white Nike Air Force 1 low-tops, tan sheepskin UGG boots, flat-ironed highlights, and a silver flip phone or iPod in your pocket defined going out in ${year}.`
        ]
      : [
          `Everyday street style paired vintage high-waisted Levi's 501 denim with oversized Champion reverse-weave crewnecks, cropped North Face puffer jackets, and matte athletic knits.`,
          `Retro leather Nike Air Jordan 1 high-tops, gum-sole Adidas Sambas, chunky New Balance 550 runners, and heavyweight canvas tote bags completed the silhouette of ${year}.`
        ];

  return ensure5To7Sentences([
    ...rawSents,
    ...eraDetails
  ], 5);
};

// ============================================================================
// 7. NOTORIOUS CRIMES -> "🕵️ True Crime & Mysteries of [Year]"
// Direct, factual true-crime & investigative stories from that year without boilerplate filler.
// ============================================================================
const expandCompoundClauses = (text: string, year: number): string[] => {
  const baseSents = splitIntoSentences(text);
  const expanded: string[] = [];
  for (const s of baseSents) {
    if (s.includes(', while ')) {
      const parts = s.split(', while ');
      expanded.push(parts[0].trim() + '.');
      const second = parts.slice(1).join(', while ').trim();
      if (second) {
        const cap = second.charAt(0).toUpperCase() + second.slice(1);
        expanded.push(`In ${year}, ${cap.endsWith('.') ? cap : cap + '.'}`);
      }
    } else {
      expanded.push(s);
    }
  }
  return expanded;
};

const buildCrimeCampfireStory = (rawCrime: string, year: number, day: number = 1): string => {
  const sents = expandCompoundClauses(rawCrime, year);

  const eraForensicContext = [
    `The investigation dominated newspaper front pages and evening broadcasts throughout ${year}, prompting sweeping upgrades to forensic trace analysis, surveillance protocols, and federal security standards.`,
    `Across courtrooms and police precincts in ${year}, detectives combined traditional shoe-leather witness interviews with emerging forensic science and cross-border law-enforcement coordination to piece together the timeline.`,
    `From coffee-shop tables to prime-time news specials in ${year}, the case sparked nationwide debate over courtroom law, high-stakes security, and how modern investigators track down elusive suspects.`
  ];

  return ensure5To7Sentences([
    ...sents,
    eraForensicContext[(year + day) % eraForensicContext.length]
  ], 4);
};

// ============================================================================
// 8. GLOBAL CONFLICTS -> "⚔️ The Global Stage: Major Shifts in [Year]"
// Diverse, factual turning points of that year rotated by date, with zero generic TV-anchor filler.
// ============================================================================
const buildConflictEveningNewsStory = (rawConflict: string, year: number, day: number = 1, month: number = 11): string => {
  const { usPresident, ukPm, worldPop } = getYearLeadersAndPop(year);
  const baseClauses = expandCompoundClauses(rawConflict, year);

  const extraGlobalMilestones: string[] = [
    `On the international stage in ${year}—as world population reached approximately ${worldPop}—diplomatic summits under U.S. President ${usPresident} and UK Prime Minister ${ukPm} reshaped trade agreements, security alliances, and cross-border cooperation.`,
    `Throughout ${year}, international observers followed historic elections, treaty ratifications, and United Nations diplomatic missions as countries navigated a rapidly changing global map.`,
    `With U.S. President ${usPresident} in the White House, Prime Minister ${ukPm} at 10 Downing Street, and ${worldPop} people sharing the planet in ${year}, economic integration and landmark international accords defined the year's geopolitical horizon.`
  ];

  // Rotate clauses by (day + month) so different days in September or any month lead with diverse events
  const offset = baseClauses.length > 1 ? (day + month) % baseClauses.length : 0;
  const rotatedClauses = [
    ...baseClauses.slice(offset),
    ...baseClauses.slice(0, offset)
  ];

  return ensure5To7Sentences([
    ...rotatedClauses,
    extraGlobalMilestones[(year + day + month) % extraGlobalMilestones.length]
  ], 4);
};

// ============================================================================
// 9. EXTREME WEATHER -> "🌪️ Forces of Nature: Extreme Weather in [Year]"
// Complete weather and natural events from that year without repetitive filler.
// ============================================================================
const buildWeatherSolidarityStory = (rawWeather: string, year: number, day: number = 1): string => {
  const weatherClauses = expandCompoundClauses(rawWeather, year);

  const weatherContext = [
    `Meteorologists and weather-satellite teams in ${year} tracked these extreme systems closely, leading to improved early-warning broadcasts, stronger civil engineering codes, and rapid neighborhood relief efforts.`,
    `In affected towns and cities in ${year}, emergency crews and neighbors worked side-by-side to clear roads, restore power lines, and support local families in the aftermath of the extreme weather.`,
    `Recorded across weather stations and atmospheric observatories worldwide, the natural events of ${year} became landmark case studies in modern meteorology and community resilience.`
  ];

  const offset = weatherClauses.length > 1 ? day % weatherClauses.length : 0;
  const rotatedWeather = [
    ...weatherClauses.slice(offset),
    ...weatherClauses.slice(0, offset)
  ];

  return ensure5To7Sentences([
    ...rotatedWeather,
    weatherContext[(year + day) % weatherContext.length]
  ], 4);
};

export const buildYearFactExpansion = (year: number, exact: ExactYearData, month: number = 11, day: number = 1): YearFactExpansion => {
  return {
    newsStory: buildWorldNewsVibe(year, month, exact.worldNews, day),
    techStory: stripSpecificDatesToYearOnly(buildTechSingleCraze(exact.techAndToys, year), year),
    popStory: stripSpecificDatesToYearOnly(buildPopVibe(year, exact.popCulture), year),
    priceStory: buildPriceShockVibe(year, exact),
    fashionStory: stripSpecificDatesToYearOnly(buildFashionVibeStory(exact.fashionVibe, year), year),
    crimeStory: stripSpecificDatesToYearOnly(buildCrimeCampfireStory(exact.notoriousCrime, year, day), year),
    conflictStory: stripSpecificDatesToYearOnly(buildConflictEveningNewsStory(exact.globalConflict, year, day, month), year),
    weatherStory: stripSpecificDatesToYearOnly(buildWeatherSolidarityStory(exact.extremeWeather, year, day), year)
  };
};

