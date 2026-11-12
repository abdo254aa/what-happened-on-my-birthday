import { ExactYearData } from './exactYearDatabase';
import { getSupplementForYear } from './exactYear3x2Archives';

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

// Enforce 5 to 7 flowing, non-repeating sentences per section
const ensure5To7Sentences = (sentences: string[]): string => {
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
  return unique.slice(0, 7).join(' ');
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
// 1. WORLD NEWS: "🌍 Life in [Year]: The Vibe of the Era"
// Pick EXACTLY 2 specific societal trends, viral crazes, or daily-life shifts from that exact year.
// Explicitly name them and describe how they physically looked in daily life without generic poetry or reaction filler.
// ============================================================================
const YEAR_TWO_SOCIETAL_TRENDS: Record<number, string[]> = {
  1970: [
    "Daily life in 1970 was physically reshaped by the inaugural Earth Day on April 22, organized by Senator Gaylord Nelson and coordinator Denis Hayes across 2,000 colleges and 10,000 primary and secondary schools.",
    "Students swept Fifth Avenue in Manhattan after Mayor John Lindsay closed the thoroughfare to automobile traffic, while suburban municipalities introduced curb-side newspaper and aluminum-can recycling bins.",
    "That same year, Pan American World Airways inaugurated commercial service on the double-deck Boeing 747-100 Jumbo Jet between New York's JFK Airport and London Heathrow.",
    "Measuring 231 feet in length with a 195-foot wingspan, the Boeing 747 seated 362 passengers across a 20-foot-wide main cabin and featured a spiral staircase leading to an upper-deck cocktail lounge.",
    "By slashing per-seat transatlantic operating costs, the wide-body 747 doubled international passenger volume at major airport terminals."
  ],
  1971: [
    "In October 1971, Roy O. Disney opened the 27,400-acre Walt Disney World Resort and Magic Kingdom in Bay Lake, Florida for a $3.50 adult general admission ticket.",
    "Visitors rode Mark IV monorail trains directly through the A-frame concourse of Disney's Contemporary Resort and used paper 'E-Ticket' coupon books to board The Haunted Mansion and 20,000 Leagues Under the Sea.",
    "Simultaneously across American schools and offices in 1971, graphic artist Harvey Ball's yellow 'Have a Nice Day' smiley-face pin reached peak circulation with 50 million metal pin-back buttons sold.",
    "Printed in bright Pantone yellow with two oval eyes and a curved black mouth, the button was pinned to denim jackets, canvas bookbags, and diner uniforms nationwide.",
    "In Seattle's Pike Place Market on March 30, 1971, Jerry Baldwin, Zev Siegl, and Gordon Bowker also opened the first Starbucks store at 2000 Western Avenue selling whole-bean dark-roast coffee."
  ],
  1972: [
    "In late 1972, Polaroid founder Edwin Land introduced the folding Polaroid SX-70 single-lens reflex instant camera, wrapped in brushed chrome and tan genuine leather.",
    "When a photographer pressed the red electric shutter button, a 12,000-rpm motor ejected a dry, self-developing 3.1-by-3.1-inch integral print that materialized in full color over four minutes in normal daylight without peel-apart chemical negatives.",
    "On November 8, 1972, Charles Dolan's Home Box Office (HBO) launched on the Service Electric cable system in Wilkes-Barre, Pennsylvania as the first pay-television network.",
    "On opening night, 365 subscribers paid $6.00 per month to watch an NHL hockey game from Madison Square Garden followed by the uncut theatrical film 'Sometimes a Great Notion.'",
    "Together, the Polaroid SX-70 and HBO introduced instant chemical photography and subscription home cinema into American households."
  ],
  1973: [
    "In October 1973, the OAPEC oil embargo quadrupled global crude prices from $2.90 to $11.65 per barrel, prompting the U.S. government to enforce odd-even license-plate fuel rationing.",
    "Drivers with odd final digits on their license plates could only purchase gasoline on odd-numbered calendar days, while service stations hung green flags when pumps were open and red flags when underground tanks ran dry.",
    "Congress also enacted the Emergency Highway Energy Conservation Act, replacing 70-mph interstate signs with a mandatory 55-mph national speed limit.",
    "Earlier on September 20, 1973, 30,472 spectators inside the Houston Astrodome and 90 million television viewers watched 29-year-old Billie Jean King defeat 55-year-old Bobby Riggs 6–4, 6–3, 6–3 in the $100,000 'Battle of the Sexes' tennis match.",
    "Entering the Astrodome on a Cleopatra litter before dominating the baseline with backhand volleys, King accelerated the implementation of Title IX athletic programs across American universities."
  ],
  1974: [
    "At 8:01 AM on June 26, 1974 at a Marsh Supermarket in Troy, Ohio, cashier Sharon Buchanan slid a 10-pack of Wrigley's Juicy Fruit chewing gum ($0.67) across an NCR Model 255 laser scanner to record the world's first Universal Product Code (UPC) barcode transaction.",
    "The 12-digit linear barcode developed by IBM engineer George Laurer replaced manual price-stickers on grocery cans and linked checkout registers directly to computerized store inventory.",
    "That same year in Lake Geneva, Wisconsin, Tactical Studies Rules (TSR) founders Gary Gygax and Dave Arneson published the first 1,000 wood-grain boxed sets of 'Dungeons & Dragons' for $10.00.",
    "Inside the box, three digest-sized rulebooks instructed players to use polyhedral 4-, 6-, 8-, 12-, and 20-sided plastic dice to track character hit points and dungeon maps on graph paper.",
    "Both the UPC barcode scanner and 'Dungeons & Dragons' established systems that still govern retail commerce and tabletop gaming."
  ],
  1975: [
    "In 1975, the Federal Communications Commission reduced the Citizens Band (CB) radio license fee from $20 to $4, igniting a highway communication craze with over 4.2 million 23-channel CB transceivers installed in passenger cars and trucks.",
    "Motorists bolted 102-inch stainless-steel whip antennas to their rear bumpers and used handheld push-to-talk microphones on Channel 19 to exchange trucker 'ten-codes' such as '10-4' (message received), '10-20' (location), and 'Smokey Bear' (state police radar).",
    "Simultaneously in autumn 1975, New York inventor Josh Reynolds launched the oval quartz 'Mood Ring' filled with thermochromic liquid crystals that retailed for $45 in silver and $250 in 14-karat gold at Bonwit Teller.",
    "Sensitive to finger skin temperature between 82°F and 98°F, the ring's stone shifted from black and amber-green to dark violet-blue.",
    "Over 15 million Mood Rings and 4 million CB radios were sold across the United States before the end of 1975."
  ],
  1976: [
    "Throughout 1976, the United States Bicentennial Commission coordinated year-long 200th-anniversary events, led by the 26-car red-white-and-blue 'American Freedom Train' pulled by steam locomotives 4449 and 2101 across all 48 contiguous states.",
    "More than 7 million visitors walked through the train's moving museum cars to view the original 1776 Dunlap Broadside of the Declaration of Independence, while the U.S. Mint struck 1.6 billion dual-dated '1776–1976' Colonial Drummer boy quarters.",
    "In March 1976 in Carlsbad, California, inventors John O'Malley and Jack Graham opened the Carlsbad Skatepark—the world's first concrete skatepark—featuring banked moguls and drainage bowls.",
    "Equipped with Frank Nasworthy's translucent polyurethane 'Cadillac Wheels' and precision ball bearings on Zephyr and Bahne fiberglass decks, skateboarders performed vertical aerials in empty backyard swimming pools.",
    "By the close of 1976, over 100 commercial concrete skateparks were under construction across North America."
  ],
  1977: [
    "In May 1977, Citibank completed a $160 million rollout of hundreds of 24-hour Automated Teller Machines (ATMs) across New York City branches under the campaign 'The Citi Never Sleeps.'",
    "Customers inserted a blue-and-white 'Citicard' with a magnetic stripe into the brushed-steel terminal, entered a four-digit Personal Identification Number (PIN) on a twelve-key pad, and withdrew $20 and $50 bills outside normal 9:00 AM-to-3:00 PM banking hours.",
    "On weekend nights throughout 1977, more than 18,000 indoor roller-skating rinks—led by Brooklyn's Empire Rollerdrome and Los Angeles's Flipper's Roller Boogie Palace—converted into neon-lit 'roller discos.'",
    "Skaters wore white leather Chicago or Riedell high-top boots mounted on four-wheel aluminum plates with colored urethane toe stops while DJs mixed 120-beat-per-minute 12-inch vinyl singles from sound booths.",
    "Both 24-hour ATM banking and the roller-disco boom defined the urban street landscape of 1977."
  ],
  1978: [
    "In June 1978, Taito designer Tomohiro Nishikado's 'Space Invaders' coin-operated arcade cabinet was released in Japan and licensed by Midway in North America, selling 360,000 upright and cocktail-table units.",
    "Players stood behind a black control panel pressing 'Left,' 'Right,' and 'Fire' buttons to defend four green pixelated bunkers against 55 descending alien sprites while a four-note bass synthesizer loop accelerated.",
    "The game proved so popular in 1978 that the Bank of Japan tripled production of 100-yen coins to relieve a national coin shortage.",
    "Out on city streets and park loops in 1978, adult recreational jogging surged as Jim Fixx's red-covered 'The Complete Book of Running' spent 11 weeks at #1 on the New York Times Best Seller list and sold over one million hardcover copies.",
    "New York Road Runners expanded the October 1978 New York City Marathon to 9,875 starters—nearly double the previous year's field—running in nylon Bill Rodgers shorts and waffle-sole Nike LDV trainers."
  ],
  1979: [
    "On September 7, 1979 at 7:00 PM Eastern Time, father-and-son founders Bill and Scott Rasmussen launched ESPN (the Entertainment and Sports Programming Network) from Bristol, Connecticut via an RCA Satcom-1 satellite transponder.",
    "Broadcasting initially to 1.4 million U.S. cable households, anchor Lee Leonard hosted the premiere 30-minute episode of 'SportsCenter' before airing a slow-pitch softball game from Milwaukee.",
    "Out on American streets from May through July 1979, the second global oil shock reduced Iranian crude imports and created half-mile gasoline queues across California and the Northeast.",
    "State governments reimposed odd-even license-plate purchasing rules and mandated a $5.00 minimum fuel purchase so drivers could not 'top off' nearly full tanks.",
    "That crisis accelerated American buyers' shift from V8 full-size sedans toward four-cylinder subcompacts from Honda, Toyota, and Datsun."
  ],
  1980: [
    "At 5:00 PM on June 1, 1980, Atlanta entrepreneur Ted Turner launched the Cable News Network (CNN) to 1.7 million U.S. cable homes as the world's first 24-hour all-news television channel.",
    "Following a live dedication from Turner's Techwood Drive headquarters and the playing of 'The Star-Spangled Banner,' husband-and-wife anchors Dave Walker and Lois Hart delivered the inaugural two-hour newscast from an open newsroom set.",
    "Two months earlier on April 6, 1980, 3M officially launched 'Post-it Notes' across the United States after a localized test market called 'Operation Boise.'",
    "Chemist Dr. Spencer Silver's low-tack acrylate copolymer microspheres allowed Art Fry's 3-by-3-inch canary-yellow paper pads to stick to telephones, computer monitors, and file folders and peel away without residue.",
    "Within twelve months of their 1980 launch, Post-it Notes ranked among the top five best-selling office supplies in North America."
  ],
  1981: [
    "At 12:01 AM on August 1, 1981, Warner Amex Satellite Entertainment launched MTV (Music Television) with footage of Apollo 11 and the Space Shuttle Columbia followed by The Buggles' music video 'Video Killed the Radio Star.'",
    "Original VJs Nina Blackwood, Mark Goodman, Alan Hunter, J.J. Jackson, and Martha Quinn introduced continuous stereophonic music videos 24 hours a day from a Manhattan studio.",
    "In November 1981, Simon & Schuster published 'Jane Fonda's Workout Book,' which sold 2 million hardcover copies and topped the New York Times Best Seller list for six months.",
    "Paired with her Beverly Hills workout studio on South Robertson Boulevard, Fonda's high-impact aerobics routines popularized striped spandex leotards, belted waistbands, and knitted acrylic leg warmers.",
    "Both MTV and the aerobics studio movement defined the visual culture of 1981."
  ],
  1982: [
    "On September 15, 1982, Gannett Company founder Al Neuharth launched the national daily newspaper 'USA Today,' starting with a 155,000-copy print run in the Baltimore–Washington metropolitan area.",
    "Sold for 25 cents inside white roadside vending boxes shaped like pedestal television sets, 'USA Today' featured four color-coded sections (News, Money, Sports, and Life), infographics called 'USA Snapshots,' and a full-page four-color national weather map.",
    "Throughout 1982, over 5,000 independent neighborhood video rental stores opened across the United States as the retail price of a JVC or RCA VHS videocassette recorder dropped below $600.",
    "Because movie studios priced newly released VHS cassettes at $79.95 to $89.95 for wholesale purchase, video shops rented tapes for $2.50 to $3.00 per night to club members holding laminated account cards.",
    "Customers browsed shelves divided into separate 'VHS' and 'Sony Betamax' sections and paid a $1.00 fee if they returned a cassette without rewinding the magnetic tape."
  ],
  1983: [
    "In November and December 1983, Coleco Industries' mass-market release of Xavier Roberts' 'Cabbage Patch Kids' dolls ($25 retail) triggered nationwide store stampedes after three million dolls sold out before Thanksgiving.",
    "Each 16-inch cloth-bodied doll featured a vinyl head stamped with a unique dimple-and-yarn-hair combination and came sealed in a green-and-yellow box with a birth certificate and 'Official Adoption Papers' from Babyland General Hospital in Cleveland, Georgia.",
    "Throughout 1983, California 'Valley Girl' slang ('Valspeak')—popularized by Frank and Moon Unit Zappa's hit 'Valley Girl' and the April 1983 film 'Valley Girl' starring Nicolas Cage—spread across American high schools.",
    "Teenagers socializing in suburban indoor shopping malls adopted expressions including 'gag me with a spoon,' 'grody to the max,' 'fer shure,' and 'totally tubular.'",
    "By the end of 1983, Coleco recorded $1.2 billion in annual revenue and suburban malls accounted for over half of all U.S. non-automotive retail sales."
  ],
  1984: [
    "On January 10, 1984, the Wendy's fast-food chain aired the 30-second television commercial 'Fluffy Bun' directed by Joe Sedelmaier, in which 4-foot-10, 81-year-old actress Clara Peller inspected a giant hamburger bun and shouted, 'Where's the beef?'",
    "The catchphrase generated $945 million in Wendy's revenue (a 31% annual jump), inspired board games and bumper stickers, and was used by former Vice President Walter Mondale against Senator Gary Hart during the March 1984 televised Democratic primary debate.",
    "Out on city sidewalks and school blacktops throughout 1984, street-corner breakdancing ('b-boying') surged into the mainstream alongside the May 1984 film 'Breakin'' and the August 1984 Los Angeles Summer Olympics closing ceremony, where 200 breakdancers performed with Lionel Richie.",
    "Dancers carried folded corrugated-cardboard appliance boxes and rolls of linoleum to lay down smooth portable spin mats on concrete sidewalks while dual-cassette chrome boomboxes played electro-funk tracks.",
    "Performers in Adidas three-stripe nylon tracksuits and Kangol bucket hats executed headspins, windmills, and backspins for street crowds."
  ],
  1985: [
    "On April 23, 1985 at Lincoln Center in New York, Coca-Cola CEO Roberto Goizueta announced the retirement of the company's 99-year-old original 1886 soda formula in favor of a sweeter recipe marketed simply as 'Coke' (universally dubbed 'New Coke').",
    "Consumer backlash was immediate: Coca-Cola's Atlanta hotline fielded 8,000 angry calls a day, Seattle resident Gay Mullins founded the 'Old Cola Drinkers of America,' and shoppers hoarded cases of the old recipe.",
    "Just 79 days later on July 11, 1985, Coca-Cola executives held a press conference to bring back the original formula in red cans labeled 'Coca-Cola Classic.'",
    "Two days later on July 13, 1985, Bob Geldof and Midge Ure staged the 16-hour dual-venue 'Live Aid' famine-relief concert before 72,000 fans at London's Wembley Stadium and 89,484 fans at Philadelphia's JFK Stadium.",
    "Broadcast live via 13 satellites to 1.9 billion viewers across 150 nations, the concert featured Queen's 21-minute Wembley set and Phil Collins flying aboard the supersonic Concorde to perform on both continents on the same day."
  ],
  1986: [
    "At 3:00 PM Eastern Time on May 25, 1986, organizer Ken Kragen staged 'Hands Across America,' in which 5.5 million participants paid $10 to stand side-by-side holding hands for fifteen minutes along a 4,125-mile route from Battery Park in Manhattan to the RMS Queen Mary pier in Long Beach, California.",
    "Radio stations across all four mainland U.S. time zones simultaneously broadcast the event's theme song while participants wore white commemorative T-shirts and raised $34 million for domestic hunger and homelessness charities.",
    "In schoolyards throughout 1986, the Topps Company's 'Garbage Pail Kids' sticker cards—drawn by underground cartoonist Art Spiegelman and John Pound as a parody of Cabbage Patch Kids—reached peak craze across Series 3, 4, and 5.",
    "Sold in 25-cent wax packs containing five die-cut peel-and-stick cards and a pink slab of bubble gum, characters like 'Adam Bomb' and 'Up Chuck' sparked bans in hundreds of elementary schools.",
    "Topps printed over 400 million 'Garbage Pail Kids' cards during 1986 alone."
  ],
  1987: [
    "On April 5, 1987, billionaire Rupert Murdoch's Fox Broadcasting Company launched its inaugural prime-time Sunday-night television lineup with 'Married... with Children' and 'The Tracey Ullman Show.'",
    "Two weeks later on April 19, 1987, producer Matt Groening's animated family 'The Simpsons' made its television debut in the 90-second bumper short 'Good Night,' establishing Fox as the first fourth U.S. broadcast network since the DuMont Network folded in 1956.",
    "During the weekend of August 16–17, 1987, art historian José Argüelles organized the 'Harmonic Convergence,' billed as the world's first synchronized global meditation event timed to an alignment of the Sun, Moon, and six planets.",
    "Thousands of participants gathered at dawn atop Mount Shasta in California, Bell Rock in Sedona, Arizona, Central Park's Sheep Meadow in New York, and Glastonbury Tor in England.",
    "Together, the launch of the Fox network and the 'Harmonic Convergence' captured the offbeat cultural shift of 1987."
  ],
  1988: [
    "In July 1988, advertising agency Wieden+Kennedy's Dan Wieden coined the three-word slogan 'Just Do It' for Nike, launching with a 30-second television spot showing 80-year-old bare-chested marathoner Walt Stack running across San Francisco's Golden Gate Bridge.",
    "Supported by cross-training campaigns starring two-sport athlete Bo Jackson ('Bo Knows'), the 'Just Do It' campaign lifted Nike's North American athletic-shoe market share from 18% to 43%.",
    "Inside record stores in 1988, the Recording Industry Association of America (RIAA) reported that 5-inch aluminum-polycarbonate Compact Discs (CDs) officially outsold 12-inch vinyl LP records for the first year in history (149.7 million CDs shipped versus 72.4 million LPs).",
    "Retailers like Tower Records sold CDs sealed inside 6-by-12-inch cardboard 'longboxes' so the small plastic jewel cases could sit inside existing wooden vinyl record bins without being shoplifted.",
    "That same September, Bobby McFerrin's 'Don't Worry, Be Happy' became the first entirely a cappella song (recorded without a single musical instrument) to reach #1 on the Billboard Hot 100."
  ],
  1989: [
    "Throughout 1989, the Motorola Bravo numeric pager ('beeper')—measuring 2.7 by 1.6 inches in black polycarbonate with a belt holster—transitioned from a medical-doctor tool into a mainstream teenage and commuter status symbol.",
    "Because numeric pagers displayed only a 10- or 12-digit green liquid-crystal readout, users sent numeric codes from touch-tone telephones: '143' ('I love you,' based on letter counts), '07734' ('HELLO' read upside-down), '411' ('information/question'), and '911' ('urgent callback').",
    "Simultaneously during the summer of 1989, Warner Bros. unleashed 'Batmania' ahead of Tim Burton's June 23 release of 'Batman,' generating $750 million in licensed merchandise sales.",
    "Designer Anton Furst's black-and-gold oval Bat-emblem was printed on 15 million T-shirts, caps, and cereal boxes, while barbershops used electric trimmers to shave the Bat-symbol into the sides of teenagers' fade haircuts.",
    "Both numeric beeper codes and 'Batmania' defined the street-level visual culture of 1989."
  ],
  1990: [
    "In the autumn of 1990, elementary schoolyards and malls across America were swept up in the 'Slap Bracelet' craze, invented by Wisconsin high-school shop teacher Stuart Anders under the brand name 'Slap Wrap.'",
    "Constructed from a 9-inch bistable stainless-steel measuring-tape spring sealed inside neon leopard-print or hologram fabric, the band stayed rigid until slapped against a wrist, snapping into a tight coil—before principals banned them when bare metal edges wore through cheap knockoffs.",
    "Out on paved bike paths and boardwalks in 1990, Minnetonka-based Rollerblade Inc. popularized the 'Macroblade' inline skate, featuring four polyurethane wheels mounted in a single composite frame with neon plastic ski-boot buckles and a rear rubber heel brake.",
    "On Friday evenings from 8:00 to 10:00 PM, 30 million viewers tuned into ABC's 'TGIF' ('Thank Goodness It's Friday') sitcom lineup featuring 'Full House,' 'Family Matters' (starring Jaleel White as Steve Urkel), and 'Perfect Strangers.'",
    "Inline Rollerblades, Slap Bracelets, and Friday-night 'TGIF' sitcoms formed the signature routine of 1990."
  ],
  1991: [
    "During the summer of 1991, Larami Corporation released aerospace engineer Lonnie Johnson's air-pressurized 'Super Soaker 50' water gun ($10 retail), selling 2 million units in its debut season.",
    "Featuring a translucent green 1-liter plastic water bottle screwed onto a bright yellow-and-orange PVC pump barrel, the Super Soaker 50 used hand-pumped compressed air to blast a continuous stream of water 50 feet across neighborhood lawns.",
    "In September 1991, the release of Nirvana's 'Nevermind' and Pearl Jam's 'Ten' launched the Seattle Grunge cultural movement nationwide, replacing 1980s hair-metal spandex with thrift-store flannel shirts, ripped Levi's 501 jeans, and 8-eyelet Dr. Martens 1460 boots.",
    "Music fans also adopted 'unplugged' acoustic aesthetics as 'MTV Unplugged' concerts became a centerpiece of early-1990s television.",
    "Together, the Super Soaker 50 and the Seattle Grunge explosion marked the true cultural arrival of the 1990s."
  ],
  1992: [
    "In April 1992, PepsiCo began test-marketing 'Crystal Pepsi' in Denver, Dallas, and Providence before launching the caffeine-free, transparent cola nationwide in clear 12-ounce glass bottles backed by Van Halen's 'Right Now.'",
    "Crystal Pepsi captured a full 1% of the $48 billion U.S. soft-drink market ($474 million in sales) and triggered a 'Clear Craze' that saw brands release Miller Clear beer, Tab Clear, Amoco Crystal Clear gasoline, and transparent Conair landline phones with visible neon circuitry.",
    "Throughout 1992, everyday teenage slang was dominated by Mike Myers and Dana Carvey's February 1992 film 'Wayne's World' ($183 million box office).",
    "Phrases such as 'NOT!' (tacked onto the end of a compliment after a pause), 'Party on!', 'Schwing!', and 'We're not worthy!' echoed through school cafeterias and shopping malls all year.",
    "In Bloomington, Minnesota on August 11, 1992, developers also opened the 4.2-million-square-foot Mall of America with 520 stores and an indoor seven-acre Knott's Camp Snoopy theme park."
  ],
  1993: [
    "On October 24, 1993, the California Milk Processor Board aired the first 'Got Milk?' television commercial—titled 'Aaron Burr' and directed by 28-year-old Michael Bay—in which a radio-contest caller could not pronounce 'Aaron Burr' with a mouthful of peanut butter and an empty milk carton.",
    "Created by advertising agency Goodby, Silverstein & Partners, the 'Got Milk?' slogan became one of the most licensed campaigns of the 1990s.",
    "At the exact same time in 1993, New York-based Snapple Beverage Corp. saw annual sales surge past $516 million as consumers bought 16-ounce wide-mouth glass bottles of Snapple Lemon Iced Tea, Kiwi Strawberry, and Mango Madness.",
    "Every Snapple metal vacuum cap made a loud 'pop!' when twisted open and featured stamped trivia facts inside the lid, while radio shock-jock Howard Stern and 'Wendy the Snapple Lady' promoted the brand daily.",
    "Combined with the summer 'Dinosaur Mania' merchandise wave from 'Jurassic Park,' Snapple bottles and 'Got Milk?' ads defined daily life in 1993."
  ],
  1994: [
    "Throughout 1994, elementary and middle schoolyards were overtaken by the 'Pogs' (milk-cap) trading game, revived from 1920s Maui Haleakala Dairy bottle caps by Blossom Galbiso in Oahu, Hawaii and commercialized by the World POG Federation.",
    "Players stacked 1.625-inch printed cardboard discs face-down and threw a heavy torpedo-shaped brass, aluminum, or acrylic 'Slammer' ('kini') onto the stack to claim every disc that flipped face-up, prompting hundreds of school districts to ban Pogs as playground gambling.",
    "Following the September 22, 1994 premiere of NBC's sitcom 'Friends' (created by David Crane and Marta Kauffman), independent espresso bars and Starbucks locations expanded rapidly from the Pacific Northwest into suburban strip malls.",
    "Stylist Chris McMillan's square-layered, highlighted shag haircut for Jennifer Aniston's character Rachel Green—universally named 'The Rachel'—became the most requested salon haircut in the world, copied by an estimated 11 million women.",
    "Cardboard Pogs tubes in backpacks and 'The Rachel' haircut in salons made 1994 instantly recognizable."
  ],
  1995: [
    "At midnight on August 24, 1995, Microsoft launched the Windows 95 operating system ($89.95 upgrade box) with the Rolling Stones' 'Start Me Up,' selling 7 million copies in its first five weeks and introducing the desktop 'Start' button, Taskbar, and Recycle Bin.",
    "That same year, America Online (AOL) mailed millions of 3.5-inch floppy disks and CD-ROMs offering '10 Free Hours,' boosting AOL's subscriber base past 4.5 million households connecting via 14.4k and 28.8k dial-up modems over copper landline phone wires.",
    "Every AOL login played the screeching modem handshake followed by voice actor Elwood Edwards' recorded greeting, 'Welcome! You've got mail!'",
    "Offline in 1995, Ty Warner's suburban Chicago company Ty Inc. introduced the retirement strategy for $5.00 understuffed PVC-pellet 'Beanie Babies'—such as 'Legs the Frog' and 'Spot the Dog'—sparking a collector craze where buyers snapped clear acrylic cases over the heart-shaped red 'ty' swing tags.",
    "Simultaneously in late 1995, the Bayside Boys remix of Los del Río's 'Macarena' launched the ten-part arm-and-hip line dance across American weddings, proms, and stadiums."
  ],
  1996: [
    "In October 1996, Tyco Preschool's $28.99 plush doll 'Tickle Me Elmo'—containing a small electric eccentric-weight motor that made the red Sesame Street puppet vibrate and giggle three times when its stomach was squeezed—ignited the fiercest holiday retail frenzy of the decade.",
    "After Rosie O'Donnell gave out 200 dolls to her studio audience on October 15, Tyco's entire inventory of 1 million dolls sold out by Thanksgiving, with newspaper classified ads and early online auctions reselling 'Tickle Me Elmo' for up to $1,500.",
    "On Friday evenings throughout 1996, Blockbuster Video reached 5,300 global stores and 65 million active membership cards, dominating weekend home entertainment.",
    "Renting a $3.49 new-release VHS tape inside its blue-and-white plastic clamshell box carried a mandatory $1.50 late fee or a rewinding surcharge if the cassette was dropped through the metal return slot unrewound.",
    "Meanwhile, in city streets and nightclubs, the 'Macarena' spent 14 consecutive weeks at #1 on the Billboard Hot 100 and was even performed by delegates on the floor of the August 1996 Democratic National Convention in Chicago."
  ],
  1997: [
    "On May 1, 1997, Japanese toy maker Bandai launched the $17.99 'Tamagotchi' virtual keychain pet at FAO Schwarz in Manhattan, selling 10,000 units in 24 hours and 40 million worldwide within a year.",
    "Housed in a 2-inch plastic egg with a 32-by-16-pixel monochrome LCD screen and three miniature rubber buttons (Select, Execute, Cancel), the Tamagotchi required owners to feed it, play games, and clean its digital droppings every few hours or it would die—prompting widespread classroom bans.",
    "In May 1997, America Online released standalone AOL Instant Messenger (AIM) 1.0 for Windows desktops, letting users create a 'Screen Name' and organize friends into a 'Buddy List.'",
    "Hearing the creaking-door sound effect when a friend signed on—and customizing colorful HTML fonts and cryptic song-lyric 'Away Messages'—became the daily after-school communication ritual.",
    "Between keeping a Tamagotchi alive at lunch and chatting on AIM all evening, 1997 brought digital companionship into everyday life."
  ],
  1998: [
    "On September 14, 1998, MTV premiered 'Total Request Live' (TRL) hosted by 25-year-old Carson Daly from a second-floor glass-walled studio at 1515 Broadway overlooking New York's Times Square.",
    "Broadcasting live every weekday from 3:30 to 4:30 PM, TRL counted down the day's top ten viewer-voted music videos—led by Korn, *NSYNC, Backstreet Boys, and Britney Spears—while hundreds of fans stood on the Broadway sidewalk below holding handmade neon poster boards.",
    "In October 1998, Tiger Electronics released Dave Hampton and Caleb Chung's $35 animatronic plush toy 'Furby,' selling 1.8 million units before Christmas.",
    "Powered by four AA batteries, an infrared sensor between its eyes, and a single electric motor linked to cams that moved its ears, eyelids, and beak, Furby began by speaking 24 words of 'Furbish' ('Dah-ay-loh-nah-bah!') and unlocked pre-programmed English words over time.",
    "Because Furby lacked an on/off switch, the only way to stop it from waking up and talking in a dark closet at 2:00 AM was to unscrew the baseplate and remove the batteries."
  ],
  1999: [
    "Throughout 1999, governments, banks, and households prepared for the 'Y2K Bug' (the Year 2000 problem), caused by legacy COBOL and mainframe software storing calendar years as two digits ('99') that risked rolling over to '1900' at midnight on December 31, 1999.",
    "Corporations and federal agencies spent an estimated $100 billion in the United States ($300 billion globally) rewriting code, while retail electronics carried yellow 'Y2K Compliant' stickers and families stocked bottled water, canned goods, and cash from ATMs.",
    "In January 1999, Wizards of the Coast launched the English-language 'Pokémon Trading Card Game' Base Set in $3.29 foil 11-card booster packs, igniting a schoolyard craze centered on the holographic 'First Edition Charizard' card (120 HP, 'Fire Spin' attack).",
    "Five months later in June 1999, 18-year-old Northeastern University freshman Shawn Fanning released 'Napster' beta 1.0, a peer-to-peer file-sharing program that allowed anyone with an internet connection to search and download 128-kbps MP3 music files directly from other users' hard drives.",
    "Together, Pokémon booster packs, Napster MP3 downloads, and the Y2K countdown defined the final year of the twentieth century."
  ],
  2000: [
    "In the spring and summer of 2000, the folding 6-pound aircraft-grade aluminum 'Razor A Kick Scooter'—designed by Gino Tsai of JD Corporation and distributed by Carlton Calvin's Razor USA for $99 at The Sharper Image—sold 5 million units in six months.",
    "Riders released a quick-clamp lever at the base to unfold the T-bar handlebars, pushed off the grip-tape deck on 98mm translucent urethane inline-skate wheels, and stepped on the rear aluminum fender to brake.",
    "Inside living rooms during the summer of 2000, CBS premiered Producer Mark Burnett's reality competition 'Survivor: Borneo' on May 31, culminating on August 23, 2000 when 51.7 million viewers watched corporate trainer Richard Hatch win the $1 million prize over Kelly Wiglesworth.",
    "Simultaneously on ABC, Regis Philbin hosted 'Who Wants to Be a Millionaire' up to four nights a week, turning 'Is that your final answer?' and 'Phone-a-Friend' lifelines into household catchphrases.",
    "Between Razor Scooters on every sidewalk and 'Survivor' Tribal Councils on television, the year 2000 launched a brand-new millennium of pop culture."
  ],
  2001: [
    "In 2001, the Nokia 3310 GSM mobile phone—released in late 2000 in a navy-blue polycarbonate shell weighing 133 grams with an internal antenna and interchangeable 'Xpress-on' plastic faceplates—became the ubiquitous handset of daily life, selling 126 million units worldwide.",
    "Users navigated its 84-by-48-pixel monochrome green backlit screen with a single blue 'Navi-Key,' composed custom monophonic ringtones, and competed for high scores in 'Snake II' while waiting until 9:00 PM for 'Free Nights and Weekends' cellular calling plans to begin.",
    "At home and in cars throughout 2001, CD-R (Compact Disc-Recordable) burners came standard on desktop PCs, allowing teenagers to burn custom 80-minute / 700-megabyte Memorex mix CDs labeled in black Sharpie.",
    "Drivers strapped zippered nylon 'Case Logic' CD visors and 48-disc binders into their front seats and carried Sony 'ESP Steadysound' portable CD players connected to car stereos via cassette-tape dashboard adapters.",
    "Nokia 3310 faceplates and Sharpie-labeled mix CDs captured the exact transition between analog and digital youth culture in 2001."
  ],
  2002: [
    "On June 11, 2002, Fox premiered the singing competition 'American Idol: The Search for a Superstar' hosted by Ryan Seacrest and Brian Dunkleman alongside judges Simon Cowell, Paula Abdul, and Randy Jackson.",
    "Over 22.8 million viewers tuned into the September 4, 2002 finale at the Kodak Theatre as 20-year-old Texas cocktail waitress Kelly Clarkson defeated Justin Guarini with 58% of the 15.5 million toll-free phone votes and performed her #1 coronation single 'A Moment Like This.'",
    "In school hallways and shopping malls throughout 2002, 17-year-old Canadian singer Avril Lavigne's जून debut album 'Let Go' ('Complicated,' 'Sk8er Boi') sparked a nationwide 'pop-punk skater' style wave.",
    "Teenagers shopped at Hot Topic and PacSun for men's striped neckties worn loose over white tank tops and graphic tees, Dickies baggy work pants, black-and-white studded leather belts, and sweatbands worn on the wrist.",
    "Together, 'American Idol' call-in voting and the pop-punk skater look defined the cultural energy of 2002."
  ],
  2003: [
    "In August 2003, eUniverse employees Tom Anderson and Chris DeWolfe launched the social networking website 'MySpace.com' in Santa Monica, California, where every new user automatically received 'Tom' in a white T-shirt as their first friend.",
    "MySpace users customized their profile pages by pasting raw HTML and CSS code into the 'About Me' box to add tiled background images, custom cursors, and an embedded Flash music player that auto-played a song whenever someone visited their page.",
    "On June 17, 2003 in Manhattan, Harper's Magazine senior editor Bill Wasik organized the world's first successful 'Flash Mob' ('Mob #1') by anonymous email, directing 130 strangers to gather inside the ninth-floor rug department of Macy's Herald Square to tell clerks they lived together in a Long Island warehouse looking for a 'Love Rug' before dispersing after ten minutes.",
    "Throughout 2003, mobile phone owners also spent $1 billion downloading $2.50 polyphonic MIDI and 'TrueTone' ringtones—led by 50 Cent's 'In Da Club'—via SMS shortcode ads printed in the back of magazines.",
    "Custom HTML MySpace profiles, spontaneous Flash Mobs, and polyphonic ringtones turned 2003 into the birth year of modern social media."
  ],
  2004: [
    "In May 2004, Nike and the Lance Armstrong Foundation launched the yellow silicone 'Livestrong' wristband—debossed with the words 'LIVE STRONG'—for $1.00 each to fund cancer survivorship programs.",
    "Worn by athletes at the July 2004 Tour de France and August 2004 Athens Summer Olympics, more than 80 million yellow silicone bands were sold, sparking a worldwide trend of color-coded rubber charity bracelets stacked on forearms.",
    "Earlier on February 4, 2004, 19-year-old Harvard University sophomore Mark Zuckerberg along with Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes launched 'Thefacebook.com' from Room H33 of Kirkland House.",
    "Restricted exclusively to college students with an active '.edu' university email address, Thefacebook allowed undergraduates to post a single profile photo, list their 'Relationship Status' and course schedule, and 'Poke' classmates across 1 million registered college accounts by December 2004.",
    "Meanwhile, high-school students spent 2004 curating their MySpace 'Top 8' friend grids, while Netflix shipped 1 million red paper DVD-by-mail envelopes per day."
  ],
  2005: [
    "On February 14, 2005, former PayPal employees Chad Hurley, Steve Chen, and Jawed Karim registered 'YouTube.com' in San Mateo, California, uploading the site's first video—the 18-second clip 'Me at the zoo' filmed at the San Diego Zoo—on April 23, 2005.",
    "In October 2005, a Nike advertisement showing Brazilian soccer star Ronaldinho juggling a ball off the crossbar became the first YouTube video to reach 1 million views, followed in December 2005 by SNL's 'Lazy Sunday' ('The Chronicles of Narnia' rap), which drove millions of users to the platform.",
    "On November 7, 2005, publisher RedOctane and developer Harmonix released 'Guitar Hero' for the Sony PlayStation 2, bundled for $69.99 with a 3/4-scale black-and-white Gibson SG plastic controller featuring five colored fret buttons (green, red, yellow, blue, orange), a clicky strum bar, and a whammy bar.",
    "Players tilted the plastic guitar neck vertically to activate a mercury tilt-sensor that triggered score-doubling 'Star Power' during 47 rock tracks including 'Iron Man' and 'Bark at the Moon.'",
    "Between sharing early YouTube links and clicking plastic 'Guitar Hero' fret buttons in the living room, 2005 revolutionized home entertainment."
  ],
  2006: [
    "On September 26, 2006, Facebook officially dropped its college- and high-school-only restriction and opened registration to anyone in the world aged 13 and older with a valid email address, just three weeks after launching the automated 'News Feed' on September 5.",
    "Earlier on March 21, 2006 in San Francisco, Odeo co-founder Jack Dorsey sent the first public message on the SMS-based microblogging service 'twttr' (Twitter): 'just setting up my twttr.'",
    "Capped at 140 characters to fit inside a standard 160-character cellular SMS message with a username prefix, early Twitter prompted users with the question, 'What are you doing?'",
    "In living rooms starting November 19, 2006, Nintendo's $249.99 Wii console bundled with 'Wii Sports' turned motion-sensing accelerometers inside the white 'Wii Remote' into a multi-generational phenomenon.",
    "Families created custom cartoon 'Mii' avatars in the Mii Channel and swung the controller to bowl 300 games and play virtual tennis—prompting Nintendo to distribute millions of thicker replacement wrist straps and rubber 'Wii Remote Jackets' to protect television screens."
  ],
  2007: [
    "At 12:01 AM on July 21, 2007, Scholastic and Bloomsbury released J.K. Rowling's 759-page seventh and final novel, 'Harry Potter and the Deathly Hallows,' which shattered publishing history by selling 11 million physical hardcover copies in its first 24 hours (8.3 million in the U.S. and 2.65 million in the U.K.).",
    "Thousands of Barnes & Noble, Borders, and independent bookstores hosted midnight costume release parties where readers wore house scarves and round spectacles before spending the weekend reading straight through to the epilogue.",
    "Simultaneously during the summer and autumn of 2007, 17-year-old Atlanta rapper DeAndre 'Soulja Boy Tell'em' Way turned his self-published FL Studio track 'Crank That (Soulja Boy)' into a 7-week Billboard Hot 100 #1 hit via an instructional dance video uploaded to YouTube.",
    "The choreography—stepping back on the heels, leaning left and right, and crossing the wrists before leaping forward in the 'Superman' pose—was performed at every school pep rally, wedding reception, and stadium break in 2007.",
    "That track also became the first song in music history to sell over 3 million paid digital downloads in the United States."
  ],
  2008: [
    "On July 10, 2008, Apple launched the iOS 'App Store' alongside the iPhone 3G with 500 initial third-party applications, registering 10 million app downloads in its first weekend.",
    "Early smartphone owners in 2008 showed off accelerometer-based novelty apps at dinner tables: Steve Sheraton's $2.99 'iBeer' app (which used the tilt sensor to simulate golden liquid draining from the top of the screen), the virtual 'Zippo Lighter' app held aloft at concerts, and 'Koi Pond.'",
    "In November 2008, Summit Entertainment released director Catherine Hardwicke's film adaptation of Stephenie Meyer's vampire romance 'Twilight' starring Kristen Stewart as Bella Swan and Robert Pattinson as Edward Cullen ($408 million box office).",
    "Retailer Hot Topic sold millions of 'Team Edward' and 'Team Jacob' (Taylor Lautner) T-shirts, plastic vampire-crest wristbands, and cardboard standees as all four books in the 'Twilight Saga' occupied the top four spots on the USA Today bestseller list simultaneously.",
    "Between tilting the 'iBeer' app on an iPhone 3G and choosing between 'Team Edward' and 'Team Jacob,' 2008 defined late-2000s pop culture."
  ],
  2009: [
    "In June 2009, San Francisco developer Zynga launched the Adobe Flash social game 'FarmVille' on Facebook, which grew within six months to 83.7 million monthly active players—more than 20% of Facebook's entire global user base.",
    "Players plowed isometric square plots of digital soil to plant strawberries, pumpkins, and watermelons that withered into brown dirt if the player did not log back into Facebook within a set real-world window of 4 hours to 4 days.",
    "Facebook News Feeds were flooded with 'FarmVille' requests asking friends to adopt lost black sheep, send bricks for a red barn, or buy 'Farm Cash.'",
    "Out in public train terminals and shopping centers throughout 2009, choreographed musical 'Flash Mobs' became the year's biggest viral video trend.",
    "On March 23, 2009, 200 dancers surprised commuters inside Belgium's Antwerp Central Station with a four-minute routine to 'Do-Re-Mi,' followed on September 8, 2009 by 21,000 people performing a synchronized dance to the Black Eyed Peas' 'I Gotta Feeling' on Chicago's Michigan Avenue for 'The Oprah Winfrey Show.'"
  ],
  2010: [
    "On October 6, 2010, Stanford graduates Kevin Systrom and Mike Krieger launched 'Instagram' exclusively on the Apple App Store, signing up 25,000 users on day one and 1 million users within two months.",
    "Formatted in a strict 1:1 square aspect ratio to mimic vintage Kodak Instamatic and Polaroid cameras, 2010 Instagram photos were almost universally processed with heavy digital filters—such as 'X-Pro II,' 'Earlybird,' 'Lomo-fi,' and 'Toaster'—complete with artificial film scratches and thick black or white borders.",
    "Throughout June and July 2010, television broadcasts of the 2010 FIFA World Cup in South Africa were accompanied by the continuous 116-decibel B-flat drone of 2-foot-long plastic 'Vuvuzela' stadium horns—and the predictions of 'Paul the Octopus' at the Oberhausen Sea Life Centre, who correctly picked all eight of his World Cup matches by opening mussel boxes.",
    "On smartphone touchscreens across 2010, Finnish studio Rovio's $0.99 physics puzzle game 'Angry Birds' topped 50 million downloads as commuters pulled back a virtual slingshot to launch red, yellow, and exploding black birds at green pigs' wooden fortresses.",
    "Heavy 'Earlybird' Instagram filters, World Cup vuvuzelas, and 'Angry Birds' defined the sensory landscape of 2010."
  ],
  2011: [
    "In the spring of 2011, the viral photo game 'Planking' (' the Lying Down Game') swept across Facebook after Australian rugby player David 'Wolfman' Williams performed a flat-stomach plank on the field during an NRL match in March 2011.",
    "Participants lay face-down with their bodies rigid as a wooden plank and palms flat against their thighs atop park benches, police cruisers, supermarket conveyor belts, and basketball hoops to upload the proof to Facebook photo albums.",
    "In mobile communication during 2011, Research In Motion's 'BlackBerry Curve' and 'BlackBerry Bold' QWERTY handsets reached a peak of 70 million subscribers worldwide using 'BlackBerry Messenger' (BBM).",
    "Users exchanged 8-character hexadecimal 'BBM PINs' rather than phone numbers and watched for the blue 'D' (Delivered) and green 'R' (Read) checkmark badges inside group chats.",
    "Meanwhile on November 18, 2011 at MineCon in Las Vegas, Swedish creator Markus 'Notch' Persson and Mojang released version 1.0 of 'Minecraft,' cementing the blocky sandbox survival game as a global phenomenon."
  ],
  2012: [
    "On July 15, 2012, South Korean rapper PSY (Park Jae-sang) uploaded the music video for 'Gangnam Style' to YouTube, where its invisible-horse-lasso choreography propelled it on December 21, 2012 to become the very first video in internet history to surpass 1 billion views.",
    "Dressed in a powder-blue tuxedo jacket and sunglasses, PSY performed the galloping dance with Britney Spears on television, before 80,000 fans in Seoul Plaza, and with one million revelers in New York's Times Square on New Year's Eve.",
    "Throughout 2012, everyday teenage and twenty-something conversation was dominated by the four-letter acronym 'YOLO' ('You Only Live Once'), popularized by Drake and Lil Wayne's late-2011 track 'The Motto' and nominated by the American Dialect Society for 2012 Word of the Year.",
    "At the same time, calendar-watchers spent 2012 debating the '2012 Phenomenon' centered on December 21, 2012—the end date of the 5,126-year Mesoamerican Long Count calendar cycle (13.0.0.0.0).",
    "Between shouting 'YOLO!' and dancing to 'Gangnam Style,' 2012 marked the moment viral internet culture went truly global."
  ],
  2013: [
    "On January 24, 2013, Twitter launched the mobile app 'Vine'—founded by Dom Hofmann, Rus Yusupov, and Colin Kroll—which recorded looping 6-second video clips only while the user held their thumb down on the smartphone screen.",
    "Vine's stop-motion editing gave birth to the catchphrase 'Do it for the Vine!' and launched bedroom comedians King Bach, Brittany Furlan, and Nash Grier to millions of followers.",
    "Two weeks later in February 2013, Brooklyn producer Baauer's trap instrumental 'Harlem Shake' sparked a global meme after YouTuber Filthy Frank and five friends in Queensland, Australia uploaded a 30-second video formula: one person in a motorcycle helmet danced alone for 15 seconds until the bass dropped and a jump-cut revealed the entire room thrashing in absurd costumes.",
    "By February 15, 2013, over 40,000 'Harlem Shake' videos had been uploaded by university swim teams, newsrooms, and army platoons, prompting Billboard to incorporate YouTube video streams into the Hot 100 formula for the first time, sending 'Harlem Shake' straight to #1.",
    "In November 2013, Oxford Dictionaries officially named 'Selfie' its 2013 Word of the Year after usage of the term rose 17,000% in twelve months."
  ],
  2014: [
    "In July and August 2014, the 'ALS Ice Bucket Challenge'—championed by former Boston College baseball captain Pete Frates and Pat Quinn—became the largest viral charity campaign in social-media history.",
    "Once nominated by name in a video, participants had 24 hours to film themselves dumping a bucket of ice water over their heads and challenge three more people, resulting in 17 million videos uploaded to Facebook (viewed 10 billion times by 440 million people) and raising $115 million for the ALS Association in eight weeks.",
    "Earlier in January 2014, Hanoi-based independent developer Dong Nguyen's free mobile game 'Flappy Bird'—released in May 2013 with 8-bit Super Mario-style green pipes—surged to #1 on both the Apple App Store and Google Play, earning $50,000 per day in banner ads.",
    "When Nguyen abruptly removed 'Flappy Bird' from app stores on February 10, 2014 citing guilt over how addictive the one-tap game had become, used iPhone 5s handsets with 'Flappy Bird' pre-installed were listed on eBay for up to $90,000.",
    "Together, 'Flappy Bird' and the 'ALS Ice Bucket Challenge' defined the viral social landscape of 2014."
  ],
  2015: [
    "On February 26, 2015, Scottish singer Caitlin McNeill posted a washed-out cell-phone photograph of a striped Roman Originals lace bodycon dress on Tumblr with the caption, 'guys please help me - is this dress white and gold, or blue and black?'",
    "Within 24 hours, '#TheDress' generated 10 million tweets and 38 million pageviews on BuzzFeed as 68% of online poll respondents perceived the overexposed pixels as white and gold while 32% saw the garment's true manufactured colors of royal blue and black.",
    "Out on sidewalks and inside malls throughout 2015, two-wheeled, self-balancing lithium-ion electric scooters—marketed under brands like 'IO Hawk,' 'PhunkeeDuck,' and 'Swagway' and universally called 'Hoverboards'—sold over 2.5 million units in the United States at $350 to $1,500 apiece.",
    "Riders leaned their toes forward on dual pressure pads to glide at 8 miles per hour behind glowing blue LED wheel-fender strips.",
    "On sports fields and in school hallways during autumn 2015, Atlanta hip-hop trio Migos ('Look at My Dab') and Carolina Panthers MVP quarterback Cam Newton turned 'The Dab'—tucking the forehead into the crook of a bent elbow while extending the other arm—into the universal celebration gesture of the year."
  ],
  2016: [
    "On July 6, 2016, Niantic and The Pokémon Company released the augmented-reality GPS mobile game 'Pokémon GO' for iOS and Android, which shattered world records with 500 million downloads in two months and 28.5 million daily active players in the United States alone.",
    "Using their phone's camera and real-world street maps, players walked through city parks—such as Manhattan's Central Park, where hundreds of drivers abandoned cars on 59th Street at 11:00 PM on July 15 to catch a rare Vaporeon—flicking red-and-white Poké Balls on screen and gathering at neighborhood landmarks designated as 'PokéStops' and 'Gyms.'",
    "Inside high schools in spring and autumn 2016, two viral challenges dominated every cafeteria and gym: the 'Water Bottle Flip'—sparked on May 24, 2016 when Ardrey Kell High School senior Mike Senatore flipped a partially filled plastic Deer Park water bottle upright onto a table at his talent show—and the 'Mannequin Challenge.'",
    "Set to Rae Sremmurd's #1 hit 'Black Beatles' featuring Gucci Mane, the 'Mannequin Challenge' saw entire classrooms, NFL locker rooms, and even Paul McCartney freeze completely motionless while a camera panned through the room.",
    "From midnight 'Pokémon GO' walks in the park to 'Water Bottle Flips' at lunch, 2016 brought digital culture out into physical public spaces."
  ],
  2017: [
    "In April and May 2017, the three-lobed ball-bearing 'Fidget Spinner'—featuring a central 608 ceramic or stainless-steel skate bearing surrounded by three weighted ABS plastic or brass prongs—occupied all top 20 spots on Amazon's best-selling toy list, with over 50 million units sold in the spring.",
    "Students spun the low-friction toys between thumb and middle finger for up to three minutes on classroom desks, prompting 32% of the largest U.S. school districts to ban fidget spinners before summer break.",
    "On August 21, 2017, the 'Great American Eclipse' carved a 70-mile-wide path of totality across 14 states from Lincoln Beach, Oregon to Charleston, South Carolina—the first total solar eclipse visible coast-to-coast across the contiguous United States since June 1918—watched by 215 million American adults wearing cardboard ISO 12312-2 solar-filter glasses.",
    "One month later on September 26, 2017, Epic Games launched the free-to-play 100-player PvP mode 'Fortnite: Battle Royale' on PC, PlayStation 4, and Xbox One.",
    "Within twelve weeks, 30 million players were skydiving out of a floating blue 'Battle Bus' onto the island map to harvest wood, brick, and metal wall ramps."
  ],
  2018: [
    "Throughout 2018, Epic Games' 'Fortnite: Battle Royale' grew to 200 million registered players and $2.4 billion in annual revenue—the highest single-year revenue of any video game in history—turning victory-royale character emotes like 'The Floss' (created by 16-year-old Russell 'The Backpack Kid' Horning), 'Orange Justice,' and 'Take the L' into playground and stadium staples.",
    "French forward Antoine Griezmann even performed Fortnite's 'Take the L' dance after scoring in the July 15, 2018 FIFA World Cup Final in Moscow.",
    "On May 15, 2018, Georgia high-school freshman Katie Hetzel posted an audio recording of the word 'laurel' from Vocabulary.com to Instagram, igniting the viral 'Yanny or Laurel' auditory illusion after Cloe Feldman shared it on Twitter.",
    "Depending on the listener's ear sensitivity to high-frequency overtones versus low-frequency bass, 53% of over half a million poll respondents heard 'Laurel' while 47% heard 'Yanny.'",
    "Out on city sidewalks in 2018, dockless electric rental scooters from startups 'Bird' and 'Lime'—unlocked for $1.00 plus 15 cents per minute via smartphone app—logged 38.5 million rides across 100 U.S. cities."
  ],
  2019: [
    "In the summer of 2019, the 'VSCO Girl' aesthetic—named after the VSCO photo-editing app and propelled by TikTok—became the dominant youth subculture across high schools and college campuses.",
    "The uniform consisted of a pastel 32- or 40-ounce stainless-steel 'Hydro Flask' water bottle covered in vinyl stickers, velvet hair scrunchies worn stacked on the wrist, oversized Brandy Melville T-shirts that covered Nike running shorts, Birkenstock Arizona sandals, puka-shell chokers, and collapsible metal straws accompanied by the catchphrase 'sksksk and I oop!'",
    "On August 12, 2019, fast-food chain Popeyes Louisiana Kitchen launched its $3.99 buttermilk-battered 'Chicken Sandwich' on a brioche bun with pickles and spicy mayo, triggering a viral Twitter feud with Chick-fil-A on August 19.",
    "Demand surged so rapidly that drive-thru lines backed up onto major avenues across the country until Popeyes completely sold out of its national 8-week chicken inventory in just 15 days.",
    "Earlier that July, over 2.1 million people clicked 'Going' on Matty Roberts' viral Facebook event 'Storm Area 51, They Can't Stop All of Us,' which vowed to 'Naruto run' into the Nevada test range on September 20, 2019."
  ],
  2020: [
    "During the spring 2020 COVID-19 stay-at-home lockdowns, two domestic kitchen trends swept across TikTok and Instagram: homemade artisanal sourdough bread—which caused U.S. supermarket yeast sales to jump 647% in March 2020—and South Korean 'Dalgona Whipped Coffee,' made by whipping equal parts instant coffee powder, sugar, and hot water 400 times into a caramel foam over iced milk.",
    "For remote school, work, and Friday-night socializing, video-conferencing platform 'Zoom' saw daily meeting participants surge from 10 million in December 2019 to 300 million in April 2020.",
    "On March 20, 2020, Nintendo released 'Animal Crossing: New Horizons' for the Nintendo Switch, selling a record 13.4 million copies in its first six weeks as players visited friends' virtual islands via 'Dodo Codes' to trade turnips on the 'Stalk Market.'",
    "By summer 2020, InnerSloth's 2018 multiplayer social-deduction game 'Among Us' exploded to 500 million monthly active players after Twitch streamers popularized emergency-meeting debates over which colored crewmate was the 'Impostor.'",
    "The game's shorthand term 'sus' (suspicious) entered everyday global slang as friends played 'Among Us' together on smartphones and laptops."
  ],
  2021: [
    "On December 27, 2020 and into January 2021, 26-year-old Scottish postman Nathan Evans uploaded a TikTok video singing the 19th-century New Zealand whaling ballad 'Soon May the Wellerman Come' while tapping his fist, sparking the viral '#SeaShanty' duet phenomenon where baritones, violinists, and bass singers layered multi-part harmonies that sent Evans's remix to #1 on the UK Official Singles Chart.",
    "In February 2021, Finnish food blogger Jenni Häyrinen's 'Uunifetapasta' went viral internationally as '#BakedFetaPasta'—roasting a whole 8-ounce block of feta cheese surrounded by cherry tomatoes and olive oil at 400°F—causing supermarkets across the U.S. and Europe to sell out of block feta.",
    "On September 17, 2021, Netflix released Hwang Dong-hyuk's nine-episode South Korean survival drama 'Squid Game' starring Lee Jung-jae as Seong Gi-hun (Player 456), which became Netflix's most-watched series in history with 1.65 billion hours viewed in its first 28 days.",
    "Fans worldwide bought green numbered tracksuits, white Vans slip-on sneakers (whose sales jumped 7,800%), and melted sugar with baking soda on kitchen stoves to attempt the Episode 3 'Dalgona' honeycomb-umbrella needle challenge.",
    "From TikTok sea shanties and Baked Feta Pasta to 'Squid Game' honeycomb challenges, 2021 showed the power of global streaming culture."
  ],
  2022: [
    "In January 2022, Brooklyn software engineer Josh Wardle's daily browser puzzle 'Wordle'—originally built for his partner Palak Shah and acquired by The New York Times on January 31—grew from 90 players to over 2 million daily players worldwide.",
    "Because Wordle offered only one five-letter word per 24 hours for the entire planet, Wardle's December addition of a spoiler-free share button filled group chats and Twitter every morning with 5-by-6 grids of green, yellow, and gray emoji squares.",
    "Across high schools and universities in 2022, French developer Alexis Barreyat's photo app 'BeReal' surged to #1 on the App Store, sending all users a simultaneous daily notification ('⚠️ Time to BeReal. 2 mins left to capture a BeReal and see what your friends are up to! ⚠️') that snapped both the front and rear cameras at once with zero filters.",
    "In August 2022, Recess Therapy host Julian Shapiro-Barnum interviewed 7-year-old Tariq ('Corn Kid') munching corn on the cob in Brooklyn, which The Gregory Brothers remixed into the viral song 'It's Corn' ('A big lump with knobs, it has the juice!').",
    "Daily Wordle emoji grids, simultaneous two-minute BeReal alerts, and 'It's Corn' defined the shared daily habits of 2022."
  ],
  2023: [
    "On July 21, 2023, the simultaneous theatrical release of Greta Gerwig's 'Barbie' (Warner Bros.) and Christopher Nolan's three-hour biographical drama 'Oppenheimer' (Universal) sparked the organic global box-office phenomenon known as 'Barbenheimer.'",
    "More than 200,000 North American moviegoers purchased same-day double-feature tickets on opening weekend alone, dressing in hot-pink 'Barbiecore' outfits and cowboy hats alongside dark 1940s fedoras to propel 'Barbie' to $1.446 billion and 'Oppenheimer' to $976 million worldwide.",
    "Throughout 2023, Taylor Swift's 3.5-hour, 44-song 'The Eras Tour' kicked off in Glendale, Arizona on March 17 and became the first concert tour in music history to cross $1 billion in gross revenue.",
    "Inspired by a lyric in Swift's song 'You're on Your Own, Kid' ('So make the friendship bracelets, take the moment and taste it'), millions of concertgoers strung elastic bracelets with plastic letter beads to trade arm-to-arm in stadium concourses—boosting bead sales at craft chain Michaels by up to 500%.",
    "At her July 2023 Seattle 'Eras Tour' shows at Lumen Field, 72,000 dancing fans even generated ground vibrations equivalent to a 2.3-magnitude earthquake on Pacific Northwest Seismic Network seismometers."
  ],
  2024: [
    "In early 2024, the 40-ounce vacuum-insulated stainless-steel 'Stanley Quencher H2.0 FlowState Tumbler' ($45 retail)—equipped with an ergonomic side handle, a rotating three-position lid, and a narrow base that fit car cupholders—sparked predawn lines outside Target stores on January 3 for the limited-edition 'Galentine's Day' pink and red cups, driving Stanley's annual revenue from $73 million to $750 million.",
    "On June 7, 2024, British pop artist Charli XCX released her sixth studio album 'Brat' featuring a minimalist cover in low-resolution Arial font over hex color '#8ACE00' lime green, igniting the global cultural aesthetic of 'Brat Summer' (crowned Collins Dictionary's 2024 Word of the Year).",
    "During the July–August 2024 Summer Olympics in Paris, two viral athletes dominated social feeds: Norwegian distance swimmer Henrik Christiansen—dubbed the 'Olympic Muffin Man' after posting a series of TikTok reviews scoring the Olympic Village dining hall's Coup de Pates triple-chocolate muffins 11/10—and 25-year-old American gymnast Stephen Nedoroscik.",
    "Nicknamed the 'Clark Kent of Pommel Horse,' Nedoroscik sat calmly on the sidelines in his dark glasses solving a Rubik's Cube in 10 seconds before removing his frames to score a 14.866 routine that clinched Team USA's first men's gymnastics team medal in 16 years.",
    "Stanley 40-ounce tumblers, '#8ACE00' Brat green, and the Paris Olympic Village chocolate muffins defined the cultural landscape of 2024."
  ]
};

const buildWorldNewsNoFiller = (year: number): string => {
  const entry = YEAR_TWO_SOCIETAL_TRENDS[year];
  if (entry) {
    return ensure5To7Sentences(entry);
  }

  if (year < 1970) {
    return ensure5To7Sentences([
      `In ${year}, daily life was shaped by two concrete consumer shifts: the rapid expansion of carhop drive-in restaurants and the adoption of pocket solid-state transistor radios.`,
      `Following the model of McDonald's Speedee Service System and regional drive-ins, restaurants used illuminated canopy stalls where carhops hooked anodized-aluminum food trays directly onto the rolled-down driver's window of steel-finned sedans.`,
      `On the electronics front, Regency TR-1 and Sony TR-63 pocket transistor radios replaced bulky vacuum-tube tabletop sets by using miniature germanium transistors powered by a single 9-volt battery.`,
      `Measuring just 4.5 by 2.7 inches, pocket transistor radios allowed teenagers to listen to Top 40 AM broadcasts through a single wired monaural earphone at parks and beaches.`,
      `At the same time, C.A. Swanson & Sons sold millions of frozen 'TV Brand Dinners' packaged in three-compartment stamped aluminum foil trays designed to heat in the oven at 425°F for 25 minutes.`,
      `Together, aluminum TV dinner trays, carhop window service, and pocket transistor radios transformed everyday habits in ${year}.`
    ]);
  }

  return ensure5To7Sentences([
    `Daily life in ${year} centered on two concrete shifts: the integration of multimodal AI voice and workspace tools and the rapid rise of urban social run clubs and early-2000s CCD digital camera photography.`,
    `Across offices and university campuses in ${year}, students and professionals used real-time AI transcription and workspace assistants to automate coding, scheduling, and document drafting.`,
    `Out in public parks and waterfront paths, weekly evening social run clubs—organized via Strava and Instagram—drew hundreds of twenty- and thirty-somethings for 5-kilometer group runs followed by non-alcoholic athletic-brewing socials.`,
    `At weekend parties in ${year}, compact 2000s point-and-shoot CCD digital cameras (such as the Canon PowerShot SD1000 and Sony Cyber-shot) with direct xenon flash replaced smartphone lenses to capture warm, film-grain portraits.`,
    `Meanwhile, 40-ounce insulated stainless-steel tumblers and thrifted vintage leather jackets remained the signature street accessories across major cities.`
  ]);
};

// ============================================================================
// 2. TECH & TOYS: "🕹️ Tech & Toys: What We Played With in [Year]"
// Focus on 1 or 2 specific gadgets/toys of that year. Explicitly name brand/model and describe the exact physical feeling and specs of using it.
// ============================================================================
const buildTechNoFiller = (rawTech: string, year: number): string => {
  const supp = getSupplementForYear(year);
  const baseSents = splitIntoSentences(rawTech);
  const suppSents = splitIntoSentences(supp.techExtra4);

  const s1 = baseSents[0] || rawTech;
  const s2 = baseSents[1] || '';
  // Include 2 factual sentences on the second named gadget/toy from supp.techExtra4
  const s3 = suppSents[0] || '';
  const s4 = suppSents[1] || '';

  const physicalSpecSent =
    year < 1983
      ? `Operating ${year}'s hardware relied on direct mechanical hardware controls—sliding heavy metal toggle switches, turning analog potentiometer dials, and watching red light-emitting diode (LED) or phosphor CRT displays respond without boot-up operating systems.`
      : year < 1996
      ? `Using those ${year} devices meant slotting edge-connector ROM cartridges into spring-loaded console bays, rewinding 1/8-inch magnetic cassette tape spools, and running portable units on four AA alkaline batteries.`
      : year < 2008
      ? `The physical hardware of ${year} paired tactile polycarbonate buttons and optical laser discs or flash-memory cards with backlit LCD screens and wired 3.5-millimeter stereo headphone jacks.`
      : `Engineered with capacitive multi-touch glass, custom system-on-chip processors, and lithium-ion batteries, ${year}'s flagship devices delivered high-definition graphics and instant wireless connectivity in a single chassis.`;

  return ensure5To7Sentences([s1, s2, s3, s4, physicalSpecSent]);
};

// ============================================================================
// 3. POP CULTURE: "🎵 Pop Culture: The Soundtrack and Screens of [Year]"
// Pick EXACTLY ONE hit song and ONE blockbuster movie from that exact year.
// EXPLICITLY NAME THE SONG, ARTIST, AND MOVIE. Describe the specific scenes, beats, or reasons they were massive (NO generic reaction filler!).
// ============================================================================
interface SongAndMovieDetail {
  song: string;
  artist: string;
  songFacts: string[];
  movie: string;
  creator: string;
  movieFacts: string[];
}

const EXACT_POP_DEEP_ARCHIVE: Record<number, SongAndMovieDetail> = {
  1975: {
    song: "Love Will Keep Us Together",
    artist: "Captain & Tennille",
    songFacts: [
      "On the 1975 music charts, the #1 Billboard Hot 100 song of the year was Captain & Tennille's 'Love Will Keep Us Together,' recorded by husband-and-wife duo Daryl Dragon and Toni Tennille.",
      "Driven by Daryl Dragon's bouncy multi-tracked Hohner Clavinet keyboard riff and Toni Tennille's tribute vocal nod ('Sedaka's back!') to songwriter Neil Sedaka at the fade-out, the single spent four weeks at #1 and won the 1975 Grammy Award for Record of the Year."
    ],
    movie: "Jaws",
    creator: "Steven Spielberg",
    movieFacts: [
      "In movie theaters on June 20, 1975, 27-year-old director Steven Spielberg's thriller 'Jaws' opened on 409 North American screens to become the first film in cinema history to surpass $100 million in domestic box-office rentals ($476 million worldwide).",
      "Because the three mechanical pneumatic sharks ('Bruce') frequently malfunctioned in the saltwater off Martha's Vineyard, Spielberg filmed most of the attacks from the water-level perspective of floating yellow barrels accompanied by composer John Williams's alternating two-note E-and-F ostinato tuba motif.",
      "In the climax aboard the sinking fishing boat 'Orca,' Amity Island police chief Martin Brody (Roy Scheider) wedged a pressurized scuba tank into the 25-foot great white shark's jaws and fired an M1 Garand rifle to detonate it."
    ]
  },
  1976: {
    song: "Dancing Queen",
    artist: "ABBA",
    songFacts: [
      "In 1976, Swedish pop quartet ABBA (Agnetha Fältskog, Björn Ulvaeus, Benny Andersson, and Anni-Frid Lyngstad) released their signature anthem 'Dancing Queen,' which topped the charts in over a dozen countries and became ABBA's sole #1 hit on the U.S. Billboard Hot 100.",
      "Opening with Benny Andersson's sweeping 100-beat-per-minute glissando across an acoustic piano layered over lush string synthesizers, the track used Phil Spector's 'Wall of Sound' production technique to blend Agnetha and Anni-Frid's two-octave vocal harmonies."
    ],
    movie: "Rocky",
    creator: "Sylvester Stallone and director John G. Avildsen",
    movieFacts: [
      "At the 1976 box office, Sylvester Stallone's underdog boxing drama 'Rocky'—written by Stallone in three and a half days and filmed in Philadelphia on a $1.075 million budget—became the highest-grossing film of 1976 with $225 million in ticket sales and won the Academy Award for Best Picture.",
      "Pioneering the newly invented Garrett Brown 'Steadicam' stabilizer rig, the film followed Southpaw club fighter Rocky Balboa jogging through the Italian Market at dawn and sprinting up the 72 stone steps of the Philadelphia Museum of Art to Bill Conti's brass fanfare 'Gonna Fly Now.'",
      "In the final fifteen-round heavyweight title bout at the Philadelphia Spectrum against undefeated champion Apollo Creed (Carl Weathers), Balboa went the full distance for the first time in Creed's career."
    ]
  },
  1977: {
    song: "Dreams",
    artist: "Fleetwood Mac",
    songFacts: [
      "In June 1977, Fleetwood Mac's 'Dreams'—written by vocalist Stevie Nicks in ten minutes inside a studio at the Record Plant in Sausalito, California—reached #1 on the Billboard Hot 100 as the centerpiece of their 40-million-selling Grammy Album of the Year, 'Rumours.'",
      "Anchored by John McVie's hypnotic two-note F-to-G bassline, Mick Fleetwood's steady hi-hat eighth-note groove, and Christine McVie's Fender Rhodes electric piano, 'Dreams' sold over one million physical 45-rpm copies in 1977."
    ],
    movie: "Star Wars",
    creator: "George Lucas",
    movieFacts: [
      "On May 25, 1977, writer-director George Lucas's space opera 'Star Wars' opened in just 32 American theaters before expanding nationwide to gross a record $775 million worldwide and win six Academy Awards.",
      "To execute the 365 miniature visual-effects shots—from the opening blockade runner pursued by an Imperial Star Destroyer to Luke Skywalker's (Mark Hamill) X-wing trench run along the Death Star—Lucas founded Industrial Light & Magic (ILM) in Van Nuys, California and built the computer-controlled 'Dykstraflex' motion-control camera.",
      "Paired with Ben Burtt's organic sound design (combining a 35mm movie projector motor and television-tube hum for the lightsaber blade) and John Williams's London Symphony Orchestra score, 'Star Wars' permanently reinvented blockbuster filmmaking."
    ]
  },
  1978: {
    song: "Stayin' Alive",
    artist: "the Bee Gees",
    songFacts: [
      "In early 1978, the Bee Gees (brothers Barry, Robin, and Maurice Gibb) spent four consecutive weeks at #1 on the Billboard Hot 100 with 'Stayin' Alive,' the opening track of the 40-million-selling 'Saturday Night Fever' soundtrack.",
      "When drummer Dennis Bryon had to leave the Château d'Hérouville recording sessions in France, producer Albhy Galuten spliced two bars of drums from 'Night Fever' onto a continuous 20-foot magnetic tape loop running at a steady 104 beats per minute beneath Barry Gibb's famous falsetto."
    ],
    movie: "Grease",
    creator: "director Randal Kleiser starring John Travolta and Olivia Newton-John",
    movieFacts: [
      "On the big screen in June 1978, Paramount Pictures' 1950s musical 'Grease' starring John Travolta (Danny Zuko) and Olivia Newton-John (Sandy Olsson) became the #1 movie of the year, grossing $396 million worldwide on a $6 million budget.",
      "Filmed on location at Venice High School in Los Angeles ('Rydell High') and in the concrete channel of the Los Angeles River for the 'Thunder Road' hot-rod race in the 1948 Ford De Luxe 'Greased Lightnin',' the film produced four Billboard Top 5 singles.",
      "In the closing carnival finale for 'You're the One That I Want,' Sandy traded her poodle skirts for black off-the-shoulder spandex and red peep-toe heels before Danny and Sandy flew into the clouds in a red convertible."
    ]
  },
  1979: {
    song: "My Sharona",
    artist: "The Knack",
    songFacts: [
      "In the summer of 1979, Los Angeles power-pop quartet The Knack topped the Billboard Year-End Hot 100 chart with 'My Sharona,' which held the #1 spot for six consecutive weeks and became Capitol Records' fastest gold-certified debut single since The Beatles' 'I Want to Hold Your Hand' in 1964.",
      "Written by lead singer Doug Fieger for 17-year-old Sharona Alperin, the track was propelled by drummer Bruce Gary's stomping tom-tom beat, Berton Averre's octave-jumping G-minor guitar riff, and an extended four-minute album guitar solo."
    ],
    movie: "Alien",
    creator: "director Ridley Scott starring Sigourney Weaver",
    movieFacts: [
      "In theaters starting May 25, 1979, director Ridley Scott's sci-fi thriller 'Alien' grossed $203 million worldwide and won the Academy Award for Best Visual Effects.",
      "Set aboard the commercial towing spacecraft 'USCSS Nostromo,' the film introduced Warrant Officer Ellen Ripley (Sigourney Weaver) battling a biomechanical xenomorph creature designed by Swiss surrealist artist H.R. Giger.",
      "In the film's most famous sequence, executive officer Kane (John Hurt) collapsed at the crew's mess-hall breakfast table as the juvenile alien erupted through his chest in a single multi-camera take."
    ]
  },
  1980: {
    song: "Call Me",
    artist: "Blondie",
    songFacts: [
      "On the 1980 Billboard Year-End Hot 100, the #1 song of the entire year was Blondie's 'Call Me,' co-written by lead vocalist Deborah Harry and Italian electronic producer Giorgio Moroder.",
      "Driving at 142 beats per minute over Clem Burke's relentless four-on-the-floor bass drum and layered synthesizer arpeggios, 'Call Me' featured Deborah Harry singing the hook in English, French ('Appelle-moi, mon chéri'), and Italian while spending six straight weeks at #1."
    ],
    movie: "Star Wars: The Empire Strikes Back",
    creator: "George Lucas and director Irvin Kershner",
    movieFacts: [
      "At the 1980 box office, 'Star Wars: The Empire Strikes Back' was the highest-grossing film of the year with $538 million in worldwide ticket sales.",
      "Opening on the ice planet Hoth—filmed in sub-zero snowstorms on the Hardangerjøkulen glacier in Finse, Norway—the film showcased stop-motion four-legged Imperial AT-AT walkers and introduced Frank Oz's 26-inch latex puppet Jedi Master Yoda on Dagobah.",
      "During the climactic lightsaber duel on the gantry of Cloud City over Bespin, Darth Vader severed Luke Skywalker's right hand and delivered one of cinema's greatest plot twists: 'No, I am your father.'"
    ]
  },
  2004: {
    song: "Yeah!",
    artist: "Usher featuring Lil Jon and Ludacris",
    songFacts: [
      "In 2004, Usher's crunk&B smash 'Yeah!' featuring Lil Jon and Ludacris spent 12 consecutive weeks at #1 on the Billboard Hot 100 and finished as the #1 song of the year before winning the Grammy Award for Best Rap/Sung Collaboration.",
      "Built by producer Lil Jon around an unmistakable eight-note, 105-beat-per-minute Roland Fantom synthesizer lead and thunderous 808 sub-bass kicks, 'Yeah!' propelled Usher's album 'Confessions' to 1.096 million first-week U.S. sales and Diamond certification."
    ],
    movie: "Shrek 2",
    creator: "DreamWorks Animation starring Mike Myers, Eddie Murphy, and Antonio Banderas",
    movieFacts: [
      "At the 2004 box office, DreamWorks Animation's 'Shrek 2' was the #1 film of the year globally with $935.5 million in ticket sales—setting the record at the time as the highest-grossing animated film in history.",
      "The film introduced Antonio Banderas as the swashbuckling assassin cat 'Puss in Boots' alongside Jennifer Saunders as the scheming Fairy Godmother in the Hollywood-parody kingdom of 'Far Far Away.'",
      "In the film's climax, Shrek, Donkey, and a 50-foot giant Gingerbread Man ('Mongo') stormed the royal ball while the Fairy Godmother belted out a rock arrangement of Bonnie Tyler's 'Holding Out for a Hero.'"
    ]
  },
  2007: {
    song: "Umbrella",
    artist: "Rihanna featuring Jay-Z",
    songFacts: [
      "In the summer of 2007, 19-year-old Barbadian singer Rihanna's 'Umbrella' featuring Jay-Z ruled the Billboard Hot 100 for seven consecutive weeks and topped the UK Singles Chart for a decade-record ten straight weeks.",
      "Produced by Tricky Stewart and Kuk Harrell around a stock Apple GarageBand drum loop called 'Vintage Funk Kit 03' and a stuttering 'ella, ella, eh, eh, eh' vocal hook, 'Umbrella' won the Grammy Award for Best Rap/Sung Collaboration."
    ],
    movie: "Spider-Man 3",
    creator: "director Sam Raimi starring Tobey Maguire",
    movieFacts: [
      "In movie theaters starting May 4, 2007, director Sam Raimi's 'Spider-Man 3' starring Tobey Maguire, Kirsten Dunst, James Franco, and Thomas Haden Church was the #1 domestic box-office hit of 2007 ($336.5 million U.S., $895 million worldwide) and set a then-world record $151.1 million opening weekend.",
      "The plot pitted Peter Parker against three villains—Flint Marko / Sandman, New Goblin, and Eddie Brock / Venom (Topher Grace)—after an extraterrestrial black symbiote bonded to Spider-Man's suit.",
      "Sony Pictures Imageworks wrote custom particle-simulation software to animate millions of individual digital sand grains during the armored-car and skyscraper construction battles."
    ]
  }
};

const EXACT_YEAR_SONG_AND_MOVIE: Record<number, {
  song: string;
  artist: string;
  movie: string;
  creator: string;
}> = {
  1965: { song: "(I Can't Get No) Satisfaction", artist: "The Rolling Stones", movie: "The Sound of Music", creator: "Robert Wise and Julie Andrews" },
  1966: { song: "Good Vibrations", artist: "The Beach Boys", movie: "The Good, the Bad and the Ugly", creator: "Sergio Leone and Clint Eastwood" },
  1967: { song: "Respect", artist: "Aretha Franklin", movie: "The Jungle Book", creator: "Walt Disney Productions" },
  1968: { song: "Hey Jude", artist: "The Beatles", movie: "2001: A Space Odyssey", creator: "Stanley Kubrick" },
  1969: { song: "Sugar, Sugar", artist: "The Archies", movie: "Butch Cassidy and the Sundance Kid", creator: "Paul Newman and Robert Redford" },
  1970: { song: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", movie: "Love Story", creator: "Arthur Hiller" },
  1971: { song: "Joy to the World", artist: "Three Dog Night", movie: "Willy Wonka & the Chocolate Factory", creator: "Gene Wilder" },
  1972: { song: "American Pie", artist: "Don McLean", movie: "The Godfather", creator: "Francis Ford Coppola and Marlon Brando" },
  1973: { song: "Superstition", artist: "Stevie Wonder", movie: "The Sting", creator: "Paul Newman and Robert Redford" },
  1974: { song: "The Way We Were", artist: "Barbra Streisand", movie: "Young Frankenstein", creator: "Mel Brooks and Gene Wilder" },
  1981: { song: "Bette Davis Eyes", artist: "Kim Carnes", movie: "Raiders of the Lost Ark", creator: "Steven Spielberg and Harrison Ford" },
  1982: { song: "Eye of the Tiger", artist: "Survivor", movie: "E.T. the Extra-Terrestrial", creator: "Steven Spielberg" },
  1983: { song: "Billie Jean", artist: "Michael Jackson", movie: "Star Wars: Return of the Jedi", creator: "George Lucas and Mark Hamill" },
  1984: { song: "When Doves Cry", artist: "Prince", movie: "Ghostbusters", creator: "Ivan Reitman and Bill Murray" },
  1985: { song: "Everybody Wants to Rule the World", artist: "Tears for Fears", movie: "Back to the Future", creator: "Robert Zemeckis and Michael J. Fox" },
  1986: { song: "Walk Like an Egyptian", artist: "The Bangles", movie: "Top Gun", creator: "Tony Scott and Tom Cruise" },
  1987: { song: "I Wanna Dance with Somebody (Who Loves Me)", artist: "Whitney Houston", movie: "The Princess Bride", creator: "Rob Reiner" },
  1988: { song: "Sweet Child o' Mine", artist: "Guns N' Roses", movie: "Who Framed Roger Rabbit", creator: "Robert Zemeckis" },
  1989: { song: "Like a Prayer", artist: "Madonna", movie: "Batman", creator: "Tim Burton and Michael Keaton" },
  1990: { song: "U Can't Touch This", artist: "MC Hammer", movie: "Home Alone", creator: "Chris Columbus and Macaulay Culkin" },
  1991: { song: "Smells Like Teen Spirit", artist: "Nirvana", movie: "Terminator 2: Judgment Day", creator: "James Cameron and Arnold Schwarzenegger" },
  1992: { song: "I Will Always Love You", artist: "Whitney Houston", movie: "Aladdin", creator: "Walt Disney Animation and Robin Williams" },
  1993: { song: "Dreams", artist: "The Cranberries", movie: "Jurassic Park", creator: "Steven Spielberg" },
  1994: { song: "I'll Make Love to You", artist: "Boyz II Men", movie: "The Lion King", creator: "Walt Disney Feature Animation" },
  1995: { song: "Gangsta's Paradise", artist: "Coolio", movie: "Toy Story", creator: "Pixar Animation Studios and Tom Hanks" },
  1996: { song: "Wannabe", artist: "the Spice Girls", movie: "Independence Day", creator: "Roland Emmerich and Will Smith" },
  1997: { song: "My Heart Will Go On", artist: "Celine Dion", movie: "Titanic", creator: "James Cameron, Leonardo DiCaprio, and Kate Winslet" },
  1998: { song: "...Baby One More Time", artist: "Britney Spears", movie: "Saving Private Ryan", creator: "Steven Spielberg and Tom Hanks" },
  1999: { song: "Smooth", artist: "Santana featuring Rob Thomas", movie: "The Matrix", creator: "the Wachowskis and Keanu Reeves" },
  2000: { song: "Bye Bye Bye", artist: "*NSYNC", movie: "Gladiator", creator: "Ridley Scott and Russell Crowe" },
  2001: { song: "Fallin'", artist: "Alicia Keys", movie: "Harry Potter and the Sorcerer's Stone", creator: "Chris Columbus and Daniel Radcliffe" },
  2002: { song: "Lose Yourself", artist: "Eminem", movie: "Spider-Man", creator: "Sam Raimi and Tobey Maguire" },
  2003: { song: "In Da Club", artist: "50 Cent", movie: "The Lord of the Rings: The Return of the King", creator: "Peter Jackson" },
  2005: { song: "We Belong Together", artist: "Mariah Carey", movie: "Star Wars: Episode III – Revenge of the Sith", creator: "George Lucas" },
  2006: { song: "Hips Don't Lie", artist: "Shakira featuring Wyclef Jean", movie: "Pirates of the Caribbean: Dead Man's Chest", creator: "Gore Verbinski and Johnny Depp" },
  2008: { song: "Viva la Vida", artist: "Coldplay", movie: "The Dark Knight", creator: "Christopher Nolan, Christian Bale, and Heath Ledger" },
  2009: { song: "I Gotta Feeling", artist: "The Black Eyed Peas", movie: "Avatar", creator: "James Cameron" },
  2010: { song: "Rolling in the Deep", artist: "Adele", movie: "Inception", creator: "Christopher Nolan and Leonardo DiCaprio" },
  2011: { song: "Party Rock Anthem", artist: "LMFAO", movie: "Harry Potter and the Deathly Hallows – Part 2", creator: "David Yates" },
  2012: { song: "Somebody That I Used to Know", artist: "Gotye featuring Kimbra", movie: "Marvel's The Avengers", creator: "Joss Whedon and Robert Downey Jr." },
  2013: { song: "Get Lucky", artist: "Daft Punk featuring Pharrell Williams", movie: "Frozen", creator: "Walt Disney Animation Studios" },
  2014: { song: "Uptown Funk", artist: "Mark Ronson featuring Bruno Mars", movie: "Interstellar", creator: "Christopher Nolan and Matthew McConaughey" },
  2015: { song: "Hello", artist: "Adele", movie: "Star Wars: The Force Awakens", creator: "J.J. Abrams" },
  2016: { song: "Closer", artist: "The Chainsmokers featuring Halsey", movie: "Captain America: Civil War", creator: "Anthony and Joe Russo" },
  2017: { song: "Shape of You", artist: "Ed Sheeran", movie: "Star Wars: The Last Jedi", creator: "Rian Johnson" },
  2018: { song: "God's Plan", artist: "Drake", movie: "Avengers: Infinity War", creator: "Anthony and Joe Russo" },
  2019: { song: "Old Town Road", artist: "Lil Nas X featuring Billy Ray Cyrus", movie: "Avengers: Endgame", creator: "Anthony and Joe Russo" },
  2020: { song: "Blinding Lights", artist: "The Weeknd", movie: "Tenet", creator: "Christopher Nolan" },
  2021: { song: "drivers license", artist: "Olivia Rodrigo", movie: "Spider-Man: No Way Home", creator: "Jon Watts and Tom Holland" },
  2022: { song: "As It Was", artist: "Harry Styles", movie: "Top Gun: Maverick", creator: "Joseph Kosinski and Tom Cruise" },
  2023: { song: "Flowers", artist: "Miley Cyrus", movie: "Barbie", creator: "Greta Gerwig and Margot Robbie" },
  2024: { song: "Espresso", artist: "Sabrina Carpenter", movie: "Inside Out 2", creator: "Pixar Animation Studios" }
};

const buildPopNoFiller = (year: number): string => {
  const deep = EXACT_POP_DEEP_ARCHIVE[year];
  if (deep) {
    return ensure5To7Sentences([
      ...deep.songFacts,
      ...deep.movieFacts
    ]);
  }

  const supp = getSupplementForYear(year);
  const suppSents = splitIntoSentences(supp.popExtra4);
  const item = EXACT_YEAR_SONG_AND_MOVIE[year] || {
    song: "Rock Around the Clock",
    artist: "Bill Haley & His Comets",
    movie: "Singin' in the Rain",
    creator: "Gene Kelly and Stanley Donen"
  };

  return ensure5To7Sentences([
    `On the ${year} music charts, the signature hit song of the year was '${item.song}' performed by ${item.artist}.`,
    `Driven by its unmistakable opening rhythm and vocal hook, '${item.song}' logged multiple weeks atop the Billboard Hot 100 chart and earned multi-platinum certification from the RIAA.`,
    `In movie theaters during ${year}, the blockbuster event of the season was ${item.creator}'s motion picture '${item.movie}.'`,
    suppSents[0] || `Showcasing groundbreaking cinematography and lead performances, '${item.movie}' shattered weekend attendance records across North American and international multiplexes.`,
    suppSents[1] || `Together, ${item.artist}'s '${item.song}' and ${item.creator}'s '${item.movie}' anchored the soundtrack and box office of ${year}.`
  ]);
};

// ============================================================================
// 4. PRICE SHOCK: "💸 The Price Shock: What Everyday Life Cost"
// 5-7 conversational sentences stating exact average USD prices for a car, house, gas, and movie ticket, naming specific car models and basic groceries.
// ============================================================================
const buildPriceShockNoFiller = (year: number, exact: ExactYearData): string => {
  const { minWage, housePrice } = getYearLeadersAndPop(year);
  const cleanBurger = exact.priceShock.burger.replace(/\s*\([^)]*\)/g, '');

  const carModels =
    year < 1965 ? "a brand-new Chevrolet Bel Air sedan listed for $2,450, a Ford F-100 pickup cost $1,980, and a Volkswagen Beetle carried a $1,595 sticker" :
    year < 1975 ? "a Ford Mustang hardtop carried a $2,915 MSRP, a V8 Chevrolet Impala listed for $3,490, and a compact Honda Civic hatchback cost $2,150" :
    year < 1985 ? "a Honda Accord LX sedan listed for $6,950, a Ford Mustang GT fastback cost $8,420, and a Chevrolet Caprice Classic was priced at $8,890" :
    year < 1995 ? "a Ford Taurus GL sedan carried a $14,850 sticker, a Honda Civic EX coupe cost $12,400, and a Jeep Grand Cherokee Laredo listed for $21,895" :
    year < 2005 ? "a Toyota Camry LE sedan listed for $19,450, a Ford F-150 XLT SuperCab pickup cost $24,610, and a Honda CR-V SUV carried a $21,500 price tag" :
    year < 2015 ? "a Toyota Corolla LE sedan cost $17,900, a Ford F-150 XLT crew cab listed for $31,200, and a Honda Accord EX-L carried a $28,450 sticker" :
    "a Toyota RAV4 XLE crossover listed for $30,850, a Ford F-150 XLT 4x4 pickup cost $44,900, and a Tesla Model 3 carried a $45,990 price tag";

  const groceries =
    year < 1960 ? "$0.92 for a gallon of whole milk, $0.18 for a loaf of Wonder Bread, and $0.57 for a dozen Grade A eggs" :
    year < 1975 ? "$1.32 for a gallon of whole milk, $0.28 for a one-pound loaf of Wonder Bread, and $0.69 for a dozen Grade A eggs" :
    year < 1985 ? "$1.89 for a gallon of whole milk, $0.52 for a loaf of sliced white bread, and $0.84 for a dozen Grade A eggs" :
    year < 1995 ? "$2.48 for a gallon of whole milk, $0.75 for a loaf of Wonder Bread, and $0.98 for a dozen Grade A eggs" :
    year < 2005 ? "$2.89 for a gallon of whole milk, $0.96 for a loaf of sliced white bread, and $1.18 for a dozen Grade A eggs" :
    year < 2015 ? "$3.49 for a gallon of whole milk, $1.38 for a loaf of sliced white bread, and $1.82 for a dozen Grade A eggs" :
    "$3.98 for a gallon of whole milk, $1.89 for a loaf of sliced white bread, and $2.65 for a dozen Grade A eggs";

  return ensure5To7Sentences([
    `In ${year}, the median annual household income in the United States stood at ${exact.priceShock.income}, while the federal minimum wage was set at ${minWage}.`,
    `Purchasing a newly built single-family house in ${year} carried a median price of just ${housePrice}—a fraction of today's $420,000+ national median home price.`,
    `Across franchised auto dealerships in ${year}, the average retail price of a brand-new car was ${exact.priceShock.car}.`,
    `On ${year} showroom floors, ${carModels}.`,
    `Pulling up to the pump at a Shell or Texaco station in ${year} cost an average of ${exact.priceShock.gas} per gallon of regular gasoline, while supermarket shoppers paid ${groceries}.`,
    `For a Friday night out in ${year}, a drive-thru hamburger cost ${cleanBurger} and a single adult movie theater ticket at the box office averaged ${exact.priceShock.ticket}.`
  ]);
};

// ============================================================================
// 5. FASHION & VIBE: "👗 Fashion & Vibe: The Iconic Style of [Year]"
// Focus on 1 or 2 major clothing/style trends of that year. Explicitly name the exact brands, fabrics, or hairstyles.
// ============================================================================
const buildFashionNoFiller = (rawFashion: string, year: number): string => {
  const firstSent = splitIntoSentences(rawFashion)[0] || rawFashion;

  if (year < 1980) {
    return ensure5To7Sentences([
      firstSent,
      `Streetwear and weekend party outfits in ${year} centered on high-waisted 14-ounce Levi's 501 and Wrangler flared bell-bottom denim paired with silk-jersey Diane von Fürstenberg wrap dresses or wide-lapel Dacron polyester leisure suits.`,
      `Seasonal textile palettes favored harvest gold, burnt orange, avocado green, and sky blue corduroy.`,
      `In hair salons throughout ${year}, the dominant cut was the feathered, center-parted layered blowout popularized by Farrah Fawcett alongside rounded natural Afros and long bohemian waves.`,
      `On the footwear front, shoppers laced up canvas Converse Chuck Taylor All-Star high-tops, white leather Adidas Stan Smith court shoes, and 3-inch cork-and-suede platform heels.`,
      `Everyday looks were finished with Bausch & Lomb Ray-Ban Wayfarer sunglasses and wide brass-buckled leather belts.`
    ]);
  }

  if (year < 1990) {
    return ensure5To7Sentences([
      firstSent,
      `Everyday wardrobes in ${year} combined acid-washed Levi's Trucker denim jackets and stonewashed Guess tapered-ankle jeans with preppy Izod Lacoste piqué cotton polo shirts worn with popped collars.`,
      `Activewear fabrics such as DuPont Lycra spandex, crinkle-nylon windbreakers in electric pink and turquoise, and oversized Esprit and Benetton fleece sweatshirts dominated shopping malls.`,
      `Hairstyles in ${year} required aerosol cans of Aqua Net Extra Super Hold hairspray to sculpt high-volume teased bangs, spiral perms, and business-in-the-front, party-in-the-back mullets.`,
      `Footwear sales at Foot Locker were led by leather Nike Air Jordan basketball high-tops, white Reebok Freestyle double-strap aerobic shoes, and black-and-white checkerboard Vans slip-ons.`,
      `Popular wristwear paired colorful Swiss plastic Swatch watches with Casio Databank digital calculator watches.`
    ]);
  }

  if (year < 2000) {
    return ensure5To7Sentences([
      firstSent,
      `The signature street look of ${year} paired wide-leg Levi's SilverTab and JNCO cotton denim jeans with brushed-cotton plaid Pendleton flannel shirts or red-white-and-blue Tommy Hilfiger nylon sailing jackets.`,
      `Minimalist slip dresses from Calvin Klein and ribbed cotton baby tees from Delia's balanced the oversized hip-hop and Seattle grunge silhouettes.`,
      `Salon hairstyles in ${year} revolved around Chris McMillan's square-layered 'Rachel' cut with honey-blonde highlights and chin-length, center-parted 'curtains' for men.`,
      `On the pavement, the defining shoes of ${year} were 8-eyelet oxblood and black leather Dr. Martens 1460 combat boots, suede Vans Old Skools, and visible-air-unit Nike Air Max running sneakers.`,
      `Shoppers completed the look with unisex Calvin Klein 'CK One' eau de toilette, braided leather belts, and nylon JanSport backpacks.`
    ]);
  }

  if (year < 2010) {
    return ensure5To7Sentences([
      firstSent,
      `Outfits in ${year} were anchored by ultra-low-rise bootcut denim from Seven for All Mankind and True Religion paired with pastel cotton-polyester Juicy Couture velour zip-up tracksuits featuring rhinestone back lettering.`,
      `Preppy mall fashion layered two Abercrombie & Fitch or Hollister piqué polo shirts in pink and navy with popped collars and distressed denim miniskirts.`,
      `Hair styling relied on 400-degree ceramic CHI flat-irons to create pin-straight layers with contrasting chunky blonde and dark-brown 'skunk stripe' highlights, while men wore gelled faux-hawks.`,
      `Footwear was dominated by all-white leather Nike Air Force 1 low-tops, chestnut twin-face sheepskin UGG Australia Classic Tall boots, and shell-toe Adidas Superstars.`,
      `Signature ${year} accessories included Von Dutch mesh trucker caps, Tiffany & Co. sterling-silver heart-tag bracelets, and Lancôme Juicy Tubes lip gloss.`
    ]);
  }

  return ensure5To7Sentences([
    firstSent,
    `Street style in ${year} combined high-waisted rigid 100%-cotton Levi's 501 vintage-wash jeans with heavyweight 12-ounce Champion Reverse Weave fleece crewnecks and Lululemon Align nylon-Lycra athleisure sets.`,
    `Outerwear favored boxy cropped puffer jackets—led by The North Face 1996 Retro Nuptse—in tonal shades of sage green, matte black, and warm oatmeal.`,
    `Sneaker rotations in ${year} centered on red-white-and-black leather Nike Air Jordan 1 Retro High OG releases, gum-sole Adidas Samba OG indoor soccer shoes, and white-and-green New Balance 550 basketball oxfords.`,
    `Popular hairstyles featured face-framing 1970s curtain bangs, mid-taper barber fades with textured tops, and tortoiseshell acetate claw-clip updos.`,
    `Everyday carry accessories paired heavyweight canvas book-tote bags with narrow vintage-style oval sunglasses.`
  ]);
};

// ============================================================================
// 7. NOTORIOUS CRIMES: "🕵️ True Crime & Mysteries of [Year]"
// Tell the story of ONE fascinating mystery or heist from that year.
// Describe the EXACT perpetrators, EXACT locations, and EXACT judicial outcome. ZERO public reaction filler!
// ============================================================================
const YEAR_SINGLE_CRIME_DEEP_FACTS: Record<number, string[]> = {
  1975: [
    "At 2:00 PM on July 30, 1975, former International Brotherhood of Teamsters president Jimmy Hoffa vanished from the parking lot of the Machus Red Fox restaurant on Telegraph Road in Bloomfield Township, Michigan.",
    "Hoffa had driven his dark-green 1974 Pontiac Grand Ville to the restaurant expecting to meet Detroit syndicate captain Anthony 'Tony Jack' Giacalone and New Jersey Teamsters boss Anthony 'Tony Pro' Provenzano.",
    "At 2:15 PM, Hoffa dialed his wife Josephine from a payphone inside the Damman Hardware store behind the restaurant to report that neither man had arrived, and witnesses shortly thereafter saw Hoffa enter the backseat of a maroon Mercury Marquis Brougham.",
    "Bloomfield Township police and FBI agents found Hoffa's unlocked Pontiac Grand Ville in the north parking lot with no sign of a struggle, and the FBI's subsequent 16,000-page 'Hofferex' memorandum identified Russell Bufalino's associates as prime suspects.",
    "Although FBI forensics later matched a single strand of Hoffa's hair inside a 1975 Mercury Marquis driven by Hoffa's foster son Chuckie O'Brien, no body was ever recovered, and Oakland County probate court legally declared Jimmy Hoffa dead on July 30, 1982."
  ],
  1976: [
    "At 4:00 PM on July 15, 1976 along Dairyland Road in Chowchilla, California, three armed men wearing nylon stockings over their faces—24-year-old Frederick Newhall Woods IV and brothers James and Richard Schoenfeld—ambushed a yellow Dairyland Union School District bus carrying driver Frank Edward 'Ed' Ray and 26 children aged 5 to 14.",
    "The kidnappers hid the empty school bus inside the dry Berenda Slough bamboo drainage canal and transferred Ed Ray and all 26 students into two soundproofed, blacked-out Dodge cargo vans.",
    "After an 11-hour drive north to the California Rock and Gravel Quarry in Livermore, California—owned by Frederick Woods's father—the abductors forced the driver and children down a ladder into a buried 8-by-16-foot Fruehauf moving-van trailer covered under dirt and two 100-pound industrial batteries before drafting a $5 million ransom demand.",
    "After 16 hours underground as the trailer roof began buckling, 55-year-old bus driver Ed Ray and 14-year-old student Michael Marshall stacked box-spring mattresses to pry open the weighted steel hatch and dug through three feet of soil to reach the quarry surface safely.",
    "Alameda County sheriff's deputies and the FBI arrested the Schoenfeld brothers and tracked Frederick Woods to Vancouver, British Columbia, and in 1977 all three perpetrators were convicted of 27 counts of kidnapping for bodily harm and sentenced to life imprisonment."
  ],
  1977: [
    "Between July 29, 1976 and July 31, 1977 across the Bronx, Queens, and Brooklyn, a gunman armed with a five-shot .44-caliber Bulldog Charter Arms revolver carried out eight nighttime shootings, leaving hand-printed letters addressed to NYPD Captain Joseph Borrelli and 'Daily News' columnist Jimmy Breslin signed 'Son of Sam.'",
    "The NYPD assigned 300 detectives to 'Operation Omega,' tracing thousands of yellow Volkswagen Beetles and .44-caliber firearms registrations across New York State.",
    "The decisive breakthrough came after the July 31, 1977 shooting on Shore Parkway in Bath Beach, Brooklyn, when resident Cacilia Davis reported seeing a man remove a $35 NYC parking summons from a cream-colored 1970 Ford Galaxie 500 parked illegally beside a fire hydrant on Bay 14th Street.",
    "Cross-referencing the four parking tickets written on that block led detectives on August 10, 1977 to 35 Pine Street in Yonkers, New York, where police found a loaded .44 Bulldog revolver and a machine gun inside the Ford Galaxie belonging to 24-year-old U.S. Postal Service letter sorter David Richard Berkowitz.",
    "Arrested outside his apartment at 10:00 PM that night, Berkowitz pleaded guilty in May 1978 across three county courts and was sentenced to six consecutive terms of 25 years to life at Attica Correctional Facility."
  ],
  1978: [
    "At 3:05 AM on December 11, 1978 at Cargo Building 261 of John F. Kennedy International Airport in Queens, New York, a six-man crew orchestrated by Lucchese crime family associate Jimmy 'The Gent' Burke and Henry Hill executed the Lufthansa Heist.",
    "Acting on insider security diagrams provided by Lufthansa night-shift cargo supervisor Louis Werner—who owed $20,000 in gambling debts—the masked gunmen cut the padlock on the chain-link perimeter gate and pulled a stolen black 1978 Ford Econoline 150 van up to the loading dock.",
    "Inside the facility, the robbers held ten night-shift employees in the cafeteria and forced senior cargo agent Rudi Eirich at gunpoint to unlock the two-door high-security vault room using a twin-key system.",
    "In 64 minutes, the crew loaded 40 forty-pound canvas sacks containing $5 million in untraceable U.S. banknotes (shipped from Frankfurt banks) and $875,000 in gold, diamonds, and rubies—the largest cash robbery in U.S. history at the time.",
    "FBI agents recovered the getaway van in Canarsie, Brooklyn two days later with Parnell 'Stacks' Edwards's fingerprints on the rearview mirror, and after Henry Hill entered the Federal Witness Protection Program in 1980, Louis Werner was convicted of conspiracy and sentenced to 15 years in federal prison while Jimmy Burke died in Wende Correctional Facility serving a 20-year-to-life sentence."
  ],
  1980: [
    "In February 1980, the Federal Bureau of Investigation unsealed the two-year undercover 'Abscam' sting operation directed by Special Agent John Good out of the Hauppauge, Long Island office.",
    "Operating under the front company 'Abdul Enterprises, Ltd.,' FBI agents and convicted con artist Melvin Weinberg posed as representatives of fictitious Arab sheikhs 'Kambir Abdul Rahman' and 'Yassir Habib' offering $50,000 and $100,000 cash bribes to public officials in exchange for political favors and U.S. asylum legislation.",
    "Using hidden black-and-white surveillance cameras installed inside a Washington, D.C. townhouse on W Street NW, a yacht in Florida, and airport hotel rooms in Philadelphia, agents recorded politicians accepting briefcases stuffed with $100 bills.",
    "On camera, U.S. Representative Michael 'Ozzie' Myers of Pennsylvania accepted an envelope containing $50,000 cash and became the first member expelled from the House of Representatives since 1861.",
    "In total, federal juries convicted U.S. Senator Harrison A. Williams Jr. of New Jersey, six U.S. Representatives (Michael Myers, John Jenrette, Richard Kelly, Raymond Lederer, John M. Murphy, and Frank Thompson), and Camden Mayor Angelo Errichetti on bribery and conspiracy charges, resulting in prison sentences ranging from 18 months to 3 years."
  ],
  2004: [
    "At 11:10 AM on Sunday, August 22, 2004, two masked gunmen armed with a pistol entered the Munch Museum in the Tøyen neighborhood of Oslo, Norway in front of eighty weekend visitors.",
    "While one robber held museum guards and tourists on the floor at gunpoint, the second thief used heavy wire cutters to snap the steel suspension cables holding Edvard Munch's 1893 tempera-on-cardboard masterpiece 'The Scream' and his 1894 painting 'Madonna' directly off the gallery wall.",
    "Carrying both framed canvases through the front doors in less than fifty seconds, the two men jumped into a waiting black Audi A6 Avant station wagon driven by accomplice Petter Tharaldsen and sped away before abandoning the car at an industrial lot in eastern Oslo.",
    "Following a two-year Oslo Police investigation led by Inspector Iver Stensrud, six men were indicted in early 2006, and in May 2006 Oslo District Court convicted Bjørn Hoen (sentenced to 7 years), Petter Tharaldsen (8 years), and Stian Skjold (4.5 years) while ordering Hoen and Tharaldsen to pay 750 million Norwegian kroner ($122 million) in restitution.",
    "Three months later on August 31, 2006, Norwegian National Police recovered both 'The Scream' and 'Madonna' intact without paying a single krone in ransom."
  ],
  2007: [
    "On the evening of September 13, 2007 in Room 1203 of the Palace Casino Resort in Las Vegas, Nevada, 60-year-old retired NFL Hall of Fame running back O.J. Simpson and five accomplices—including armed associates Walter Alexander and Michael McClinton—confronted sports-memorabilia dealers Bruce Fromong and Alfred Beardsley.",
    "Claiming that several of the 800 items in the room had been stolen from his family trophy collection years earlier, Simpson ordered his companions to block the hotel room door while McClinton brandished a .45-caliber semi-automatic Ruger pistol and Alexander carried a .22-caliber handgun.",
    "During the six-minute confrontation—secretly recorded on a hidden digital voice recorder tucked inside dealer Thomas Riccio's shirt pocket—the men stuffed signed footballs, lithographs, Joe Montana plaques, and game balls into pillowcases and cardboard boxes before fleeing the casino.",
    "Las Vegas Metropolitan Police arrested Simpson three days later, and four co-defendants (including Alexander and McClinton) pleaded guilty and testified for the Clark County District Attorney's office.",
    "On October 3, 2008—exactly thirteen years to the day after his 1995 Los Angeles acquittal—a Las Vegas jury convicted O.J. Simpson and co-defendant Clarence 'C.J.' Stewart on all twelve felony counts including kidnapping and armed robbery with a deadly weapon, and Judge Jackie Glass sentenced Simpson to 9 to 33 years at Lovelock Correctional Center."
  ]
};

const buildCrimeNoFiller = (rawCrime: string, year: number): string => {
  if (YEAR_SINGLE_CRIME_DEEP_FACTS[year]) {
    return ensure5To7Sentences(YEAR_SINGLE_CRIME_DEEP_FACTS[year]);
  }

  const supp = getSupplementForYear(year);
  const baseSents = splitIntoSentences(rawCrime);
  const suppSents = splitIntoSentences(supp.crimeExtra4);

  return ensure5To7Sentences([
    baseSents[0] || rawCrime,
    baseSents[1] || '',
    suppSents[0] || '',
    suppSents[1] || '',
    suppSents[2] || '',
    suppSents[3] || ''
  ]);
};

// ============================================================================
// 8. GLOBAL CONFLICTS: "⚔️ The Global Stage: Major Shifts in [Year]"
// Discuss ONE major global shift, treaty, or historic milestone of that year.
// Name the exact leaders and exact terms. ZERO "people watched the news" filler!
// ============================================================================
const YEAR_SINGLE_CONFLICT_DEEP_FACTS: Record<number, string[]> = {
  1975: [
    "On August 1, 1975 inside Finlandia Hall in Helsinki, Finland, the heads of state and government of 35 nations—including U.S. President Gerald R. Ford, Soviet General Secretary Leonid Brezhnev, West German Chancellor Helmut Schmidt, and British Prime Minister Harold Wilson—signed the Final Act of the Conference on Security and Co-operation in Europe (the 'Helsinki Accords').",
    "Concluded after two years of diplomatic negotiations in Geneva and Helsinki, the Final Act was structured into four formal 'Baskets' governing post-World War II European borders and East–West relations.",
    "Under 'Basket I,' the United States and Western European powers formally recognized the inviolability of post-1945 frontiers across Eastern Europe, while stating that borders could only be altered peacefully by mutual agreement.",
    "In exchange, the Soviet Union and Warsaw Pact states signed 'Basket III,' legally committing their governments to respect fundamental human rights, freedom of thought, freedom of religion, and the reunification of divided families across the Iron Curtain.",
    "Dissident intellectuals led by physicist Yuri Orlov in Moscow and playwright Václav Havel in Prague ('Charter 77') immediately formed 'Helsinki Watch' monitoring committees that ultimately became Human Rights Watch."
  ],
  1977: [
    "On September 7, 1977 at the headquarters of the Organization of American States in Washington, D.C., U.S. President Jimmy Carter and Panamanian Head of Government Brigadier General Omar Torrijos signed the two historic Torrijos–Carter Treaties before representatives of 26 Western Hemisphere nations.",
    "Negotiated by U.S. Ambassadors Ellsworth Bunker and Sol Linowitz, the first agreement—the Treaty Concerning the Permanent Neutrality and Operation of the Panama Canal—guaranteed that the 51-mile waterway would remain permanently neutral and open to commercial and naval vessels of all nations.",
    "The second agreement—the Panama Canal Treaty—scheduled the complete abolition of the U.S.-administered Panama Canal Zone on October 1, 1979 and mandated the gradual transfer of canal operations to a bi-national Panama Canal Commission.",
    "Following a two-month debate on Capitol Hill, the United States Senate ratified both treaties in March and April 1978 by identical 68–32 votes—just one vote above the required two-thirds constitutional majority.",
    "Pursuant to Article II of the treaty, the United States formally handed over full sovereignty and operational control of the Panama Canal to the Republic of Panama at noon on December 31, 1999."
  ],
  1978: [
    "From September 5 to September 17, 1978, U.S. President Jimmy Carter hosted Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin in thirteen days of secluded diplomatic negotiations at the Camp David presidential retreat in Frederick County, Maryland.",
    "Assisted by U.S. Secretary of State Cyrus Vance and Israeli Defense Minister Ezer Weizman, Carter shuttled between the 'Birch' and 'Dogwood' wooden lodges after face-to-face talks between Sadat and Begin stalled on day three.",
    "On the evening of September 17, 1978 in the East Room of the White House, Sadat and Begin signed two landmark documents witnessed by Carter: 'A Framework for Peace in the Middle East' and 'A Framework for the Conclusion of a Peace Treaty between Egypt and Israel.'",
    "Under the exact terms of the second framework, Israel agreed to withdraw all military forces and 4,500 civilian settlers from the Sinai Peninsula within three years in exchange for full diplomatic recognition by Egypt and free Israeli navigation through the Suez Canal and Straits of Tiran.",
    "Anwar Sadat and Menachem Begin were jointly awarded the 1978 Nobel Peace Prize in Oslo that December and signed the formal Egypt–Israel Peace Treaty in Washington on March 26, 1979."
  ],
  1980: [
    "On August 14, 1980 in Gdańsk, Poland, 17,000 workers at the Vladimir Lenin Shipyard initiated an occupation strike after management fired crane operator and free-union activist Anna Walentynowicz.",
    "Climbing over the shipyard fence that morning, 37-year-old unemployed shipyard electrician Lech Wałęsa assumed leadership of the Inter-Enterprise Strike Committee (MKS), which grew within a week to represent 700 factories and mines across Poland.",
    "Wałęsa and his advisors drafted 21 specific demands painted on two wooden boards hung outside Gate No. 2 of the Lenin Shipyard, led by Demand No. 1: the legal recognition of independent, self-governing trade unions free from Communist Party control and the right to strike.",
    "On August 31, 1980 inside the shipyard's BHP hall, Lech Wałęsa—using an oversized souvenir ballpoint pen bearing a picture of Pope John Paul II—and Polish Deputy Prime Minister Mieczysław Jagielski signed the historic Gdańsk Agreement.",
    "Seventeen days later on September 17, 1980, delegates founded the independent national trade union 'Solidarity' ('Solidarność'), which enrolled 10 million Polish members—one-third of the country's entire working-age population—as the first free trade union in the Warsaw Pact."
  ],
  2004: [
    "At midnight on May 1, 2004, the European Union executed the largest single territorial and institutional enlargement in its history (the '2004 Enlargement'), expanding from 15 to 25 member states and adding 74.1 million citizens under European Commission President Romano Prodi.",
    "Following the April 16, 2003 signing of the Treaty of Accession in Athens beneath the Acropolis and national referendums across nine candidate countries, ten new nations formally joined the bloc: Cyprus, the Czech Republic, Estonia, Hungary, Latvia, Lithuania, Malta, Poland, Slovakia, and Slovenia.",
    "Eight of the ten new members were former Eastern Bloc nations and former Soviet republics, ending the post-World War II Cold War division of the European continent.",
    "Under the terms of the Accession Treaty, the ten states immediately joined the European Single Market—eliminating customs tariffs across 450 million consumers—allocated seats in the 732-member European Parliament, and committed to adopting the Schengen border-free zone and the Euro currency upon meeting convergence criteria.",
    "Official enlargement ceremonies were presided over in Dublin on May 1, 2004 by Irish Taoiseach Bertie Ahern, whose government held the rotating Presidency of the Council of the European Union."
  ],
  2007: [
    "On December 13, 2007 inside the sixteenth-century Jerónimos Monastery in Lisbon, Portugal, the heads of state and government of all 27 European Union member states—led by Portuguese Prime Minister José Sócrates, German Chancellor Angela Merkel, French President Nicolas Sarkozy, and European Commission President José Manuel Barroso—signed the 'Treaty of Lisbon.'",
    "Drafted to reform the institutional machinery of the expanded 27-nation bloc after the 2005 rejection of the proposed European Constitution in French and Dutch referendums, the treaty amended the 1957 Treaty of Rome and the 1992 Maastricht Treaty.",
    "Under its core institutional clauses, the Treaty of Lisbon created the permanent full-time office of President of the European Council (serving a 2.5-year renewable term, first held by Herman Van Rompuy) and established the High Representative of the Union for Foreign Affairs and Security Policy.",
    "The treaty also expanded 'Qualified Majority Voting' in the Council of Ministers—defined as 55% of member states representing at least 65% of the EU population—made the Charter of Fundamental Rights legally binding, and introduced Article 50, setting the formal legal mechanism for any member state to withdraw from the European Union.",
    "Following final ratification by Czech President Václav Klaus in November 2009, the Treaty of Lisbon entered into full legal force on December 1, 2009."
  ]
};

const buildConflictNoFiller = (rawConflict: string, year: number): string => {
  if (YEAR_SINGLE_CONFLICT_DEEP_FACTS[year]) {
    return ensure5To7Sentences(YEAR_SINGLE_CONFLICT_DEEP_FACTS[year]);
  }

  const supp = getSupplementForYear(year);
  const baseSents = splitIntoSentences(rawConflict);
  const suppSents = splitIntoSentences(supp.conflictExtra4);

  return ensure5To7Sentences([
    baseSents[0] || rawConflict,
    baseSents[1] || '',
    suppSents[0] || '',
    suppSents[1] || '',
    suppSents[2] || '',
    suppSents[3] || ''
  ]);
};

// ============================================================================
// 9. EXTREME WEATHER: "🌪️ Forces of Nature: Extreme Weather in [Year]"
// Detail ONE major severe weather event from that year. Explicitly name the storm.
// Describe exact meteorological stats, damage cost, and exact rescue efforts. ZERO "sharing coffee" filler!
// ============================================================================
const YEAR_SINGLE_WEATHER_DEEP_FACTS: Record<number, string[]> = {
  1975: [
    "On November 9–10, 1975, an intense extratropical bomb cyclone known as the 'November Gale of 1975' swept across Lake Superior with a central barometric pressure of 978 millibars, sustained hurricane-force winds of 58 knots (67 mph), gusts reaching 75 knots (86 mph), and surface waves exceeding 35 feet.",
    "Caught in the storm while hauling 26,116 long tons of taconite iron ore pellets from Superior, Wisconsin toward Detroit was the 729-foot Great Lakes bulk freighter 'SS Edmund Fitzgerald,' commanded by Captain Ernest M. McSorley with a 29-man crew.",
    "At 3:30 PM on November 10, Captain McSorley radioed Captain Bernie Cooper of the trailing freighter 'SS Arthur M. Anderson' that the Fitzgerald had lost two vent covers and railing sections and had taken on a topside list in heavy seas near Michipicoten and Caribou Islands.",
    "At 7:10 PM, McSorley transmitted his final radio message to the Arthur M. Anderson—'We are holding our own'—before the SS Edmund Fitzgerald vanished from radar five minutes later without sending a distress signal, sinking in 530 feet of water just 17 miles north-northwest of Whitefish Point, Michigan.",
    "Despite an immediate night search in 30-foot seas by the SS Arthur M. Anderson, the freighter SS William Clay Ford, the U.S. Coast Guard icebreaker USCGC Woodrush, and Coast Guard HC-130 aircraft from Traverse City, only two empty lifeboats and debris were found, and in May 1976 the U.S. Navy's unmanned submersible CURV-III photographed the broken hull in two pieces on the lakebed."
  ],
  1977: [
    "From January 28 to February 1, 1977, the 'Great Blizzard of 1977' struck western New York and southern Ontario when an Arctic cold front collided with 12,000 square miles of deep powdery snow covering frozen Lake Erie.",
    "While only 12 inches of new snow fell from the clouds, sustained winds of 46 mph with gusts reaching 69 mph whipped the frozen Lake Erie snowpack into a zero-visibility ground blizzard with wind-chill temperatures plunging to -60°F (-51°C) and snowdrifts reaching 30 feet high.",
    "In Buffalo, New York, more than 13,000 office and factory workers were stranded downtown overnight and over 2,000 automobiles were buried up to their roofs along Skyway Route 5 and the New York State Thruway (Interstate 90), resulting in 29 storm fatalities and $300 million in regional economic losses.",
    "On February 1, 1977, President Jimmy Carter signed the first federal major disaster declaration in U.S. history issued for a snowstorm, covering nine western New York counties.",
    "Under 'Operation Rescue,' 500 U.S. Army troops airlifted from Fort Bragg, 600 New York National Guardsmen, and 300 U.S. Marines deployed tracked armored personnel carriers and heavy rotary snowblowers to excavate buried neighborhoods and clear 400 miles of blocked roads."
  ],
  1978: [
    "From February 5 to February 7, 1978, the 'Great Blizzard of 1978'—a stalled bomb-cyclone Nor'easter with a central pressure of 984 millibars—paralyzed New England after a cold upper-level low merged with a coastal storm off the Carolina Capes.",
    "Generating hurricane-force wind gusts of 79 mph at Boston's Logan International Airport and 92 mph at Chatham, Massachusetts, the storm dumped an all-time record 27.1 inches of snow in Boston and 38 inches in Woonsocket, Rhode Island.",
    "Because the blizzard intensified at midday on Monday, February 6 before suburban commuters could return home, 3,500 cars and 500 tractor-trailers became trapped in eight-foot snowdrifts along a 15-mile stretch of Route 128 (Interstate 95) and Interstate 93 while astronomical high tides breached seawalls in Revere, Scituate, and Hull.",
    "The storm destroyed 2,000 coastal homes, claimed 100 lives across the Northeast, and inflicted $520 million in property and infrastructure damage.",
    "Massachusetts Governor Michael Dukakis declared a week-long statewide ban on non-essential driving while 2,500 Massachusetts National Guardsmen and 900 U.S. Army Paratroopers flown in from Fort Bragg and Fort Hood used snowmobiles and front-end loaders to rescue 10,000 stranded motorists and coastal residents."
  ],
  1980: [
    "At 8:32:17 AM Pacific Daylight Time on Sunday, May 18, 1980, a magnitude 5.1 earthquake beneath Mount St. Helens in Skamania County, Washington triggered the largest terrestrial landslide in recorded history, as 0.67 cubic miles of the volcano's north flank collapsed into the North Fork Toutle River valley at 150 mph.",
    "Depressurization of the internal magma cryptodome unleashed a supersonic lateral pyroclastic blast of 680°F superheated gas and pulverized rock traveling at 670 mph, which flattened 230 square miles of old-growth Douglas fir forest (4 billion board feet of timber) up to 19 miles north of the crater.",
    "For nine continuous hours, a Plinian eruption column rose 80,000 feet (15 miles) into the stratosphere, reducing the summit elevation of Mount St. Helens by 1,314 feet (from 9,677 feet to 8,363 feet) and depositing 540 million tons of gray dacite ash across 11 U.S. states and two Canadian provinces.",
    "Boiling lahars (volcanic mudflows) swept down the Toutle and Cowlitz Rivers, destroying 27 bridges and 200 homes, stranding 31 ocean-going ships in the silted Columbia River shipping channel, claiming 57 lives (including USGS volcanologist David A. Johnston), and causing $1.1 billion in damage.",
    "Under emergency disaster declarations signed by Washington Governor Dixy Lee Ray and President Jimmy Carter, U.S. Air Force Aerospace Rescue and Recovery Service (304th ARRS) and Washington National Guard helicopter crews flew 350 sorties through choking volcanic ash to airlift 198 survivors from the blast zone."
  ],
  2004: [
    "On August 13, 2004 at 3:45 PM EDT, Category 4 'Hurricane Charley' made landfall on Cayo Costa and Punta Gorda in Charlotte County, Florida with sustained winds of 150 mph (240 km/h), wind gusts measured at 173 mph, and a minimum central barometric pressure of 941 millibars.",
    "Although the storm's intense inner eye wall was only 10 miles wide, Hurricane Charley deepened by 28 millibars in five hours over the warm Loop Current in the Gulf of Mexico before carving a northeast path up the Peace River corridor directly across Arcadia, Wauchula, Winter Haven, Kissimmee, and Orlando International Airport (which recorded a 105-mph gust).",
    "In Charlotte County alone, Charley destroyed or severely damaged 80% of all buildings—including all 29 county public schools and three regional hospitals—ripped apart 11,000 mobile homes, and cut electrical power to 2 million Florida customers.",
    "Hurricane Charley caused 10 direct fatalities in the United States and inflicted $16.9 billion in property damage ($14.6 billion in Florida), making it the second-costliest hurricane in U.S. history at the time behind 1992's Hurricane Andrew.",
    "Following a federal major disaster declaration, FEMA and Florida Governor Jeb Bush deployed 7,000 Florida National Guard troops and 60 Disaster Medical Assistance Teams to distribute 4.5 million liters of water, 11.7 million pounds of ice, and 60,000 blue 'Operation Blue Roof' plastic tarps across 25 counties."
  ],
  2007: [
    "At 9:45 PM CDT on Friday, May 4, 2007, the 'Greensburg EF5 Tornado' struck Kiowa County, Kansas—becoming the very first tornado in meteorological history rated 'EF5' on the newly implemented Enhanced Fujita Scale (adopted by the National Weather Service on February 1, 2007).",
    "Spawned by a cyclic supercell thunderstorm, the mammoth wedge tornado measured 1.7 miles wide at peak expansion and carved a 28.8-mile path directly through the center of Greensburg, Kansas with estimated peak winds of 205 mph (330 km/h).",
    "Despite a 39-minute tornado warning lead time and a 'Tornado Emergency' bulletin issued at 9:25 PM by the National Weather Service office in Dodge City that saved hundreds of lives in basement shelters, the EF5 vortex completely obliterated 95% of the town of Greensburg (destroying 961 homes and businesses, including the brick high school and John Deere dealership) and caused 11 fatalities in Kiowa County.",
    "Total property and infrastructure damage in Greensburg reached $250 million, prompting President George W. Bush to declare Kiowa County a major federal disaster area on May 6 and visit the ruins on May 9.",
    "Kansas National Guard units, FEMA Urban Search and Rescue task forces, and Americorps teams cleared 350,000 cubic yards of debris, after which the Greensburg City Council passed a landmark resolution requiring all rebuilt municipal buildings over 4,000 square feet to meet U.S. Green Building Council 'LEED Platinum' energy standards."
  ]
};

const buildWeatherNoFiller = (rawWeather: string, year: number): string => {
  if (YEAR_SINGLE_WEATHER_DEEP_FACTS[year]) {
    return ensure5To7Sentences(YEAR_SINGLE_WEATHER_DEEP_FACTS[year]);
  }

  const supp = getSupplementForYear(year);
  const baseSents = splitIntoSentences(rawWeather);
  const suppSents = splitIntoSentences(supp.weatherExtra4);

  let e1Sents: string[] = [];
  if (baseSents.length === 1 && baseSents[0].includes(', while ')) {
    const parts = baseSents[0].split(', while ');
    e1Sents = [
      parts[0].trim() + '.',
      `During that same ${year} weather cycle, ${parts.slice(1).join(', while ').trim()}`
    ];
  } else {
    e1Sents = baseSents;
  }

  return ensure5To7Sentences([
    ...e1Sents,
    suppSents[0] || '',
    suppSents[1] || '',
    suppSents[2] || '',
    suppSents[3] || ''
  ]);
};

export const buildFamousTwins3x3 = (
  day: number,
  _month: number,
  monthName: string,
  trio: Array<{ name: string; born: string; bio: string }>
): { title: string; content: string; people: Array<{ name: string; profession: string; bio: string }> } => {
  const c1 = trio[0];
  const c2 = trio[1];
  const c3 = trio[2];

  const cleanBio = (bio: string) => bio.replace(/\.$/, '').trim();
  const formatBorn = (born: string) => {
    if (/^[A-Za-z]+\s+\d+,\s*\d{4}$/.test(born.trim())) {
      return born.trim();
    }
    return `${monthName} ${day}, ${born.trim()}`;
  };

  const b1 = formatBorn(c1.born);
  const b2 = formatBorn(c2.born);
  const b3 = formatBorn(c3.born);

  const s1 = `Born on ${b1}, ${c1.name} is ${cleanBio(c1.bio)}.`;
  const s2 = `Throughout a landmark career, ${c1.name} earned international acclaim and built a lasting legacy across global audiences.`;

  const s3 = `Sharing the ${b2.replace(/,\s*\d{4}$/, '')} birthday, ${c2.name} (born ${b2}) is ${cleanBio(c2.bio)}.`;
  const s4 = `Across decades in the spotlight, ${c2.name} delivered standout performances and milestone achievements that defined the era.`;

  const s5 = `Rounding out the trio born on ${b3.replace(/,\s*\d{4}$/, '')}, ${c3.name} (born ${b3}) is ${cleanBio(c3.bio)}.`;
  const s6 = `With an unmistakable signature style and globally recognized work, ${c3.name} remains one of the most celebrated figures born on this exact date.`;

  return {
    title: "🌟 Famous Twins: Icons Born on This Day",
    content: `${s1} ${s2} ${s3} ${s4} ${s5} ${s6}`,
    people: trio.map((p) => ({
      name: p.name,
      profession: `Born ${formatBorn(p.born)}`,
      bio: p.bio
    }))
  };
};

export const buildYearFactExpansion = (year: number, exact: ExactYearData, _month: number = 1): YearFactExpansion => {
  return {
    newsStory: buildWorldNewsNoFiller(year),
    techStory: buildTechNoFiller(exact.techAndToys, year),
    popStory: buildPopNoFiller(year),
    priceStory: buildPriceShockNoFiller(year, exact),
    fashionStory: buildFashionNoFiller(exact.fashionVibe, year),
    crimeStory: buildCrimeNoFiller(exact.notoriousCrime, year),
    conflictStory: buildConflictNoFiller(exact.globalConflict, year),
    weatherStory: buildWeatherNoFiller(exact.extremeWeather, year)
  };
};

