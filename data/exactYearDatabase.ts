import { MODERN_AND_CLASSIC_YEARS, getClassicYearRecord } from './exactYearExtended';

export interface ExactYearData {
  worldNews: string;
  techAndToys: string;
  popCulture: string;
  priceShock: {
    car: string;
    ticket: string;
    gas: string;
    burger: string;
    income: string;
  };
  fashionVibe: string;
  notoriousCrime: string;
  globalConflict: string;
  extremeWeather: string;
}

/**
 * Curated Exact-Year Historical Records (ensuring events, songs, movies, prices, crimes, conflicts, and weather match the exact year).
 */
export const EXACT_YEAR_DB: Record<number, ExactYearData> = {
  1975: {
    worldNews: "In April 1975, childhood friends Bill Gates and Paul Allen founded Microsoft in Albuquerque, New Mexico to develop BASIC software for the Altair 8800 microcomputer. In July 1975, the historic Apollo–Soyuz Test Project saw American astronauts and Soviet cosmonauts dock their spacecraft in orbit and shake hands in space for the first time. That same year, Sony introduced the Betamax videocassette system in May 1975, inaugurating the home video recording era.",
    techAndToys: "The cutting-edge tech gadget of 1975 was the MITS Altair 8800 microcomputer kit, featured on the January 1975 cover of Popular Electronics, alongside Kodak's first laboratory digital camera prototype built by engineer Steven Sasson. In the toy aisle, 1975 belonged to the 'Pet Rock'—created by Gary Dahl and sold in a cardboard pet carrier complete with breathing holes and a training manual, selling over 1 million rocks for $3.95 each by Christmas 1975.",
    popCulture: "In 1975, Captain & Tennille's 'Love Will Keep Us Together' topped the Billboard Year-End Hot 100 chart alongside Elton John's 'Philadelphia Freedom' and Queen's November 1975 release of 'Bohemian Rhapsody.' At the 1975 box office, Steven Spielberg's 'Jaws' shattered all theatrical records to become the first true summer blockbuster, while NBC premiered the sketch-comedy institution 'Saturday Night Live' on October 11, 1975.",
    priceShock: { car: "$4,950", ticket: "$2.05", gas: "$0.57", burger: "$0.30 (Big Mac: $0.75)", income: "$11,800" },
    fashionVibe: "In 1975, fashion revolved around high-waisted flared denim jeans, wide-lapel polyester leisure suits, peasant blouses, and suede platform shoes. Popular hairstyles featured feathered layers and long center parts, while people socialized offline at neighborhood roller-skating rinks and communicated on highways using 23-channel CB radios.",
    notoriousCrime: "On July 30, 1975, former Teamsters union president Jimmy Hoffa vanished from the parking lot of the Machus Red Fox restaurant in Bloomfield Township, Michigan, where he had arranged a 2:00 PM meeting. His unlocked green Pontiac Grand Ville was found in the lot, sparking one of the most famous and enduring missing-person investigations in FBI history.",
    globalConflict: "On April 30, 1975, the Fall of Saigon marked the end of the Vietnam War as North Vietnamese forces entered the South Vietnamese capital and U.S. personnel completed Operation Frequent Wind, the largest helicopter evacuation in history. In August 1975, thirty-five nations signed the Helsinki Accords in Finland to reduce Cold War tensions between the Western and Soviet blocs.",
    extremeWeather: "On November 10, 1975, a ferocious winter gale on Lake Superior—generating 70-knot hurricane-force gusts and 35-foot waves—sank the 729-foot Great Lakes freighter SS Edmund Fitzgerald near Whitefish Bay, while Super Typhoon Nina struck central China in August 1975 with record-breaking rainfall."
  },
  1976: {
    worldNews: "On January 21, 1976, the supersonic Concorde airliner began its first scheduled commercial passenger flights, crossing the Atlantic at Mach 2 in under three and a half hours. On April 1, 1976, Steve Jobs and Steve Wozniak founded Apple Computer Company in Los Altos, California, and in July 1976 NASA's Viking 1 lander touched down on Chryse Planitia on Mars to transmit the first clear photographs from the Martian surface.",
    techAndToys: "The standout tech breakthrough of 1976 was the hand-soldered Apple I single-board computer alongside JVC's Victor HR-3300, the world's first VHS (Video Home System) cassette recorder unveiled in September 1976. Toy stores in 1976 were dominated by Mattel's first handheld LED electronic sports game ('Auto Race') and the original 'Stretch Armstrong' gel-filled action figure.",
    popCulture: "In 1976, Wings' 'Silly Love Songs' was the #1 Billboard song of the year alongside Wild Cherry's 'Play That Funky Music' and ABBA's 'Dancing Queen.' Movie theaters in 1976 were packed for Sylvester Stallone's underdog boxing drama 'Rocky' (which won Best Picture) and 'All the President's Men,' while ABC's 'Charlie's Angels' and 'Happy Days' ruled prime-time television.",
    priceShock: { car: "$5,410", ticket: "$2.13", gas: "$0.59", burger: "$0.33 (Big Mac: $0.75)", income: "$12,686" },
    fashionVibe: "Fashion in 1976 celebrated the American Bicentennial with red-white-and-blue casual sportswear, wrap dresses designed by Diane von Fürstenberg, and wide-leg denim overalls.The iconic 'Farrah Fawcett feathered flip' debuted on television in autumn 1976, immediately becoming the most requested salon hairstyle of the year as teens hung out at local drive-ins and pinball parlors.",
    notoriousCrime: "In July 1976, three masked gunmen kidnapped a school bus carrying twenty-six children and their driver, Ed Ray, near Chowchilla, California, holding them inside a buried moving van in a Livermore rock quarry for sixteen hours. Remarkably, bus driver Ed Ray and the older children stacked mattresses to pry open the weighted metal lid and dug their way to safety before police tracked down and convicted all three kidnappers.",
    globalConflict: "In July 1976, Israeli commandos conducted Operation Entebbe at Entebbe Airport in Uganda to rescue 102 hostages aboard an Air France airliner that had been hijacked after departing Athens. Meanwhile, Argentina experienced a military coup in March 1976, and Cold War competition shaped the 1976 Montreal Summer Olympics.",
    extremeWeather: "On July 31, 1976, a stationary thunderstorm over Colorado's Big Thompson Canyon dumped twelve inches of rain in four hours, triggering a devastating wall of water down the narrow canyon road, while western Europe endured the historic 1976 British Isles heatwave and drought throughout the summer."
  },
  1977: {
    worldNews: "On August 20 and September 5, 1977, NASA launched the Voyager 2 and Voyager 1 deep-space probes from Cape Canaveral to explore the outer giant planets of our solar system. In August 1977, the Trans-Alaska Pipeline System completed its first oil shipment across 800 miles of Arctic terrain from Prudhoe Bay to Valdez, and on November 22, 1977, British Airways and Air France began regular supersonic Concorde service to New York's JFK Airport.",
    techAndToys: "The year 1977 marked the true birth of the home computer industry with the release of the '1977 Trinity': the Apple II, the Commodore PET, and the Tandy TRS-80. In the toy and gaming world, September 1977 saw the launch of the Atari 2600 Video Computer System with removable game cartridges, while Kenner faced such massive demand for 1977 'Star Wars' action figures that it sold 'Early Bird Certificate' boxes promising figures by mail.",
    popCulture: "In 1977, Rod Stewart's 'Tonight's the Night,' Fleetwood Mac's Grammy-winning album 'Rumours' ('Dreams'), and Debby Boone's 'You Light Up My Life' topped the music charts. At the 1977 box office, George Lucas's 'Star Wars' (released May 25, 1977) and 'Saturday Night Fever' became cultural juggernauts, while over 130 million viewers tuned into ABC's eight-night television miniseries 'Roots' in January 1977.",
    priceShock: { car: "$5,814", ticket: "$2.23", gas: "$0.62", burger: "$0.35 (Big Mac: $0.80)", income: "$13,572" },
    fashionVibe: "In 1977, 'Saturday Night Fever' and 'Annie Hall' inspired two distinct looks: white polyester three-piece disco suits and wrap dresses on one side, and relaxed menswear vests, tweed trousers, and loose ties for women on the other. Hairstyles featured feathered wings and perms, while nightlife centered on illuminated disco dance floors and local roller rinks.",
    notoriousCrime: "On the stormy night of July 13–14, 1977, lightning strikes tripped Con Edison transmission lines in Westchester County, plunging all five boroughs of New York City into the 25-hour '1977 New York City Blackout.' The blackout coincided with the final weeks of the NYPD's citywide investigation into the 'Son of Sam' case, which ended in August 1977 when a parking ticket placed on a 1970 Ford Galaxie near a fire hydrant in Yonkers led detectives to arrest postal worker David Berkowitz.",
    globalConflict: "In September 1977, U.S. President Jimmy Carter and Panamanian leader Omar Torrijos signed the Torrijos–Carter Treaties in Washington, agreeing to transfer control of the Panama Canal to Panama at the end of 1999. Just two months later, in November 1977, Egyptian President Anwar Sadat made a historic visit to Jerusalem to address the Israeli Knesset, opening the path to peace talks.",
    extremeWeather: "In late January 1977, the 'Great Blizzard of 1977' struck western New York and southern Ontario with 69-mph winds and wind chills reaching -60°F (-51°C), burying cars and houses under thirty-foot snowdrifts in Buffalo, while that same month brought the only recorded snowfall in history to Miami Beach, Florida (January 19, 1977)."
  },
  1978: {
    worldNews: "On July 25, 1978, Louise Brown—the world's first baby conceived through in vitro fertilization (IVF), pioneered by Drs. Patrick Steptoe and Robert Edwards—was born at Oldham General Hospital in England. The year 1978 was also the 'Year of Three Popes' at the Vatican, culminating in the October 1978 election of Pope John Paul II, the first non-Italian pontiff in 455 years.",
    techAndToys: "Cutting-edge tech in 1978 included Pioneer's LaserDisc optical video player and Texas Instruments' 'Speak & Spell,' the first consumer gadget to use a single-chip digital speech synthesizer to talk to children. Toy stores in 1978 were electrified by Milton Bradley's flying saucer-shaped electronic memory game 'Simon' (launched at Studio 54 in 1978) and Taito's 'Space Invaders' arcade cabinet.",
    popCulture: "The #1 songs of 1978 belonged to the Bee Gees, whose 'Shadow Dancing,' 'Night Fever,' and 'Stayin' Alive' dominated the Billboard Hot 100 for months. In 1978 movie theaters, the musical 'Grease' starring John Travolta and Olivia Newton-John was the highest-grossing film alongside 'Superman' and 'National Lampoon's Animal House,' while CBS premiered the prime-time drama 'Dallas' in April 1978.",
    priceShock: { car: "$6,370", ticket: "$2.34", gas: "$0.65", burger: "$0.38 (Big Mac: $0.90)", income: "$15,064" },
    fashionVibe: "Fashion in 1978 blended disco satin bomber jackets, high-waisted Designer jeans (such as Calvin Klein and Jordache), and athletic tube socks with striped tops. Big, voluminous perms and feathered layers ruled hair salons, while teenagers spent afternoons feeding quarters into 'Space Invaders' arcade machines at pizza parlors.",
    notoriousCrime: "At 3:05 AM on December 11, 1978, a crew of masked gunmen orchestrated by Jimmy Burke carried out the infamous Lufthansa Heist at Cargo Building 261 at New York's John F. Kennedy International Airport. With help from an inside cargo supervisor, the robbers bypassed airport security and escaped in a black Ford Econoline van with $5.875 million in untraceable U.S. currency and jewelry—the largest cash robbery on American soil at the time, later immortalized in the film 'Goodfellas.'",
    globalConflict: "In September 1978, following thirteen days of secret negotiations hosted by President Jimmy Carter at the presidential retreat in Maryland, Egyptian President Anwar Sadat and Israeli Prime Minister Menachem Begin signed the historic Camp David Accords, establishing a framework for peace in the Middle East that earned both leaders the 1978 Nobel Peace Prize.",
    extremeWeather: "From February 5 to February 7, 1978, the 'Great Blizzard of 1978'—a catastrophic bomb cyclone Nor'easter—paralyzed New England with hurricane-force winds and 27 inches of snow in Boston, stranding over 3,500 cars and trucks along Route 128 for days."
  },
  1979: {
    worldNews: "On May 4, 1979, Margaret Thatcher became the first female Prime Minister of the United Kingdom after the Conservative Party won the general election. Earlier that year, on March 28, 1979, a partial nuclear meltdown occurred in Unit 2 of the Three Mile Island nuclear power plant in Pennsylvania, transforming energy policy nationwide. In December 1979, the World Health Organization officially certified the global eradication of smallpox, and Mother Teresa was awarded the 1979 Nobel Peace Prize.",
    techAndToys: "On July 1, 1979, Sony released the TPS-L2 Walkman portable cassette player in blue-and-silver aluminum, allowing people to walk down the street listening to private stereo music on lightweight foam headphones for the first time. In computing, VisiCalc—the world's first spreadsheet program—launched for the Apple II in 1979, while toy aisles were dominated by Milton Bradley's electronic strategy board game 'Milton' and Kenner's 1979 'Alien' and 'Boba Fett' action figures.",
    popCulture: "On the 1979 Billboard Hot 100, The Knack's power-pop anthem 'My Sharona' was the #1 song of the year, followed closely by Donna Summer's 'Bad Girls,' Chic's 'Le Freak,' and Pink Floyd's late-1979 hit 'Another Brick in the Wall.' At the 1979 box office, the courtroom family drama 'Kramer vs. Kramer,' Ridley Scott's sci-fi thriller 'Alien,' and 'Apocalypse Now' dominated theaters, while CBS launched 'The Dukes of Hazzard' in January 1979.",
    priceShock: { car: "$6,847", ticket: "$2.47", gas: "$0.86", burger: "$0.43 (Big Mac: $0.95)", income: "$16,461" },
    fashionVibe: "In 1979, fashion transitioned from late-70s disco into early New Wave: tight designer denim jeans, satin baseball jackets, velour V-neck pullovers, and roller-disco shorts were everywhere. Feathered hair and asymmetrical New Wave cuts were popular, while weekend socializing revolved around roller-skating rinks and record-store listening booths.",
    notoriousCrime: "In May 1979, the nation watched the sensational San Francisco courtroom trial of former city supervisor Dan White for the November 1978 City Hall shootings of Mayor George Moscone and Supervisor Harvey Milk. Defense attorneys argued that White's depression—exemplified by a sudden diet of sugary junk food that journalists dubbed the 'Twinkie Defense'—diminished his mental capacity, resulting in a voluntary manslaughter verdict in May 1979 that prompted California voters to abolish the legal 'diminished capacity' defense.",
    globalConflict: "Geopolitics in 1979 saw three seismic shifts: the formal signing of the Egypt–Israel Peace Treaty on the White House lawn in March 1979, the November 1979 Iran Hostage Crisis at the U.S. Embassy in Tehran (which triggered the 1979 oil crisis and gas-station lines), and the December 24, 1979 Soviet military intervention in Afghanistan.",
    extremeWeather: "On April 10, 1979—known as 'Terrible Tuesday'—a mile-wide F4 wedge tornado carved an 18-mile path directly through Wichita Falls, Texas, destroying 4,000 homes, while in September 1979 Hurricane Frederic made landfall on the Alabama–Mississippi coast with 130-mph winds, becoming the costliest U.S. hurricane up to that date."
  },
  1980: {
    worldNews: "On February 22, 1980, at the Winter Olympics in Lake Placid, New York, a roster of U.S. college hockey players defeated the four-time defending gold-medal Soviet national team 4–3 in the 'Miracle on Ice.' On June 1, 1980, Ted Turner launched CNN (Cable News Network), the world's first 24-hour television news channel, and in November 1980 NASA's Voyager 1 probe flew past Saturn, revealing the intricate braided structure of its rings.",
    techAndToys: "In May 1980, Namco released the 'Pac-Man' arcade cabinet, introducing the first iconic video game character to mainstream pop culture, while Sinclair Research launched the affordable ZX80 home computer. In toy stores, 1980 was the exact year Ideal Toy Corp launched Ernő Rubik's 'Rubik's Cube' internationally, selling millions of cubes and sparking a global puzzle craze.",
    popCulture: "Blondie's 'Call Me' was the #1 Billboard song of 1980, alongside Pink Floyd's 'Another Brick in the Wall, Part II' and Michael Jackson's 'Rock with You.' In movie theaters, the May 1980 release of 'Star Wars: The Empire Strikes Back' was the highest-grossing film of the year alongside '9 to 5' and 'The Shining,' while on November 21, 1980, 83 million viewers tuned in to CBS's 'Dallas' to find out 'Who shot J.R.?'",
    priceShock: { car: "$7,574", ticket: "$2.69", gas: "$1.19", burger: "$0.48 (Big Mac: $1.20)", income: "$17,710" },
    fashionVibe: "In 1980, the 'Preppy' look peaked—inspired by 'The Official Preppy Handbook' published in October 1980—featuring Izod Lacoste alligator polo shirts, khaki chinos, boat shoes, and Fair Isle sweaters tied around the shoulders. Hairstyles shifted toward shorter, voluminous layered cuts, and friends socialized at newly expanded indoor shopping malls and arcade cabinets.",
    notoriousCrime: "Throughout 1980, a shocking FBI sting operation known as 'Abscam' dominated the news after federal agents posed as representatives of a fictitious Arab sheikh offering bribes in exchange for political favors on hidden video cameras. The 1980 investigation led to the indictment and conviction of one U.S. Senator and six members of the House of Representatives, transforming public corruption trials.",
    globalConflict: "In August 1980, shipyard electrician Lech Wałęsa led a historic strike at the Lenin Shipyard in Gdańsk, Poland, founding 'Solidarity' (Solidarność)—the first independent trade union in a Warsaw Pact nation. Simultaneously, the Iran–Iraq War broke out in September 1980, and sixty-five nations boycotted the 1980 Moscow Summer Olympics over the war in Afghanistan.",
    extremeWeather: "At 8:32 AM on May 18, 1980, Mount St. Helens in Washington State erupted with a massive lateral blast that reduced the mountain's height by 1,314 feet and sent volcanic ash across eleven states, while the brutal 1980 United States heatwave baked the Midwest and South with temperatures above 100°F for months."
  },
  2004: {
    worldNews: "In January 2004, NASA's twin rovers Spirit and Opportunity landed on Mars and uncovered geological proof that liquid water once flowed on the Red Planet. On May 1, 2004, the European Union completed its largest single expansion in history by welcoming ten new member nations, and on October 27, 2004, the Boston Red Sox swept the St. Louis Cardinals to win their first World Series title since 1918.",
    techAndToys: "Late 2004 saw the release of the ultra-thin anodized aluminum Motorola RAZR V3 flip phone and the click-wheel Apple iPod Mini, which transformed how people carried calls and music. In the gaming and toy aisles, Nintendo launched the dual-screen, touchscreen Nintendo DS handheld console in November 2004 alongside Mark Tilden's remote-controlled RoboSapien robot.",
    popCulture: "Usher's crunk anthem 'Yeah!' topped the 2004 Billboard Hot 100 for 12 weeks, while his duet 'My Boo' with Alicia Keys and Snoop Dogg's 'Drop It Like It's Hot' ruled the airwaves in November 2004. At the box office, 'Shrek 2,' 'Spider-Man 2,' and Pixar's 'The Incredibles' led ticket sales, while 52.5 million viewers watched the May 2004 finale of 'Friends' and ABC premiered 'Lost' and 'Desperate Housewives' in autumn 2004.",
    priceShock: { car: "$22,200", ticket: "$6.21", gas: "$1.88", burger: "$0.99 (Big Mac: $2.49)", income: "$44,334" },
    fashionVibe: "Fashion in 2004 centered on low-rise bootcut jeans, pastel Juicy Couture velour tracksuits, layered polo shirts with popped collars, and yellow Livestrong silicone wristbands. Women wore flat-ironed hair with chunky blonde highlights while men sported gelled faux-hawks, and friends socialized offline at Blockbuster Video aisles and mall food courts.",
    notoriousCrime: "On August 22, 2004, masked thieves entered the Munch Museum in Oslo, Norway in broad daylight and stole Edvard Munch's iconic paintings 'The Scream' and 'Madonna' directly off the gallery walls before escaping in a station wagon. That same year in New York, lifestyle mogul Martha Stewart was convicted in March 2004 of obstruction of justice and conspiracy related to her 2001 ImClone stock sale, reporting to federal prison in October 2004.",
    globalConflict: "On November 11, 2004, longtime Palestinian leader Yasser Arafat died in a military hospital near Paris, triggering a major leadership transition in the Middle East. Globally, 2004 was defined by the ongoing coalition war in Iraq and Ukraine's peaceful 'Orange Revolution' protests in Kyiv in November–December 2004 following a disputed presidential election.",
    extremeWeather: "During six weeks in August and September 2004, four major hurricanes—Charley, Frances, Ivan, and Jeanne—struck Florida, while Mount St. Helens reawakened in October–November 2004 to extrude a new lava dome inside its crater, followed on December 26, 2004 by the catastrophic M9.1 Indian Ocean earthquake and tsunami."
  }
};

/**
 * Generates an exact-year historical data profile for ANY year (1940–2026),
 * dynamically computing accurate year-specific prices and events if not in the hand-keyed map.
 */
export const getExactYearData = (year: number): ExactYearData => {
  if (EXACT_YEAR_DB[year]) return EXACT_YEAR_DB[year];

  // Year-accurate historical lookup table for every year 1940–2025
  const yearEventsTable: Record<number, {
    news: string;
    tech: string;
    pop: string;
    car: string; ticket: string; gas: string; burger: string; income: string;
    fashion: string;
    crime: string;
    conflict: string;
    weather: string;
  }> = {
    1981: {
      news: "On April 12, 1981, NASA launched Space Shuttle Columbia (STS-1), the world's first reusable crewed spacecraft. On July 29, 1981, an estimated 750 million viewers watched the royal wedding of Prince Charles and Lady Diana Spencer at St. Paul's Cathedral, and in September 1981 Sandra Day O'Connor became the first female Justice of the U.S. Supreme Court.",
      tech: "In August 1981, IBM introduced the IBM 5150 Personal Computer running MS-DOS, establishing the desktop standard for offices worldwide. In the arcade and toy world, Nintendo released 'Donkey Kong' (introducing Mario) in July 1981 alongside the Osborne 1 luggable computer.",
      pop: "Kim Carnes's 'Bette Davis Eyes' and Diana Ross & Lionel Richie's 'Endless Love' were the #1 Billboard hits of 1981, while MTV launched on August 1, 1981. At the 1981 box office, Steven Spielberg's 'Raiders of the Lost Ark' was the #1 film of the year, and 'Hill Street Blues' and 'Dynasty' debuted on network television.",
      car: "$8,910", ticket: "$2.78", gas: "$1.31", burger: "$0.50 (Big Mac: $1.35)", income: "$19,074",
      fashion: "In 1981, Lady Diana's 'Sloane Ranger' style popularized ruffled pie-crust collars and puff sleeves, while teenagers wore striped rugby shirts, Jordache jeans, and feathered blowouts as they hung out at mall video arcades.",
      crime: "On March 30, 1981, John Hinckley Jr. attempted to assassinate U.S. President Ronald Reagan outside the Washington Hilton Hotel, leading to landmark Secret Service protocol changes and eventual federal legislation on background checks (the Brady Bill).",
      conflict: "On January 20, 1981, the 444-day Iran Hostage Crisis ended with the release of 52 American diplomats minutes after Ronald Reagan's inauguration, while in December 1981 martial law was declared in Poland to suppress the Solidarity trade union movement.",
      weather: "In May 1981, a massive 400-foot-wide sinkhole opened in Winter Park, Florida, swallowing a house, five Porsche sports cars, and a municipal swimming pool during a severe regional drought."
    },
    1982: {
      news: "In December 1982, Dr. Barney Clark received the Jarvik-7, the world's first permanent artificial heart, at the University of Utah Medical Center. Earlier that year, in October 1982, EPCOT Center opened at Walt Disney World in Florida, and the Vietnam Veterans Memorial designed by Maya Lin was dedicated in Washington, D.C. in November 1982.",
      tech: "In October 1982, Sony and Philips released the Sony CDP-101, the world's first commercial Compact Disc (CD) player, alongside the launch of the Commodore 64 home computer (the best-selling single computer model in history). Toy stores in 1982 introduced Hasbro's 'G.I. Joe: A Real American Hero' 3.75-inch figures and 'My Little Pony.'",
      pop: "Olivia Newton-John's 'Physical' and Survivor's 'Eye of the Tiger' topped the 1982 Billboard Hot 100, while Michael Jackson released 'Thriller'—the best-selling album of all time—on November 30, 1982. Steven Spielberg's 'E.T. the Extra-Terrestrial' dominated the 1982 box office, and NBC premiered 'Cheers' and 'Knight Rider' in autumn 1982.",
      car: "$9,875", ticket: "$2.94", gas: "$1.22", burger: "$0.52 (Big Mac: $1.45)", income: "$20,171",
      fashion: "Fashion in 1982 embraced aerobic fitness culture with spandex leg warmers, headbands, and Reebok Freestyle sneakers, paired with acid-wash denim and high-volume perms at local roller rinks and video rental shops.",
      crime: "In September 1982, the 'Chicago Tylenol tampering case' shocked the nation and prompted Johnson & Johnson to conduct an unprecedented nationwide recall of 31 million bottles, leading the FDA to mandate triple-seal tamper-evident packaging on all over-the-counter medicines.",
      conflict: "From April to June 1982, the Falklands War was fought between Argentina and the United Kingdom over the Falkland Islands in the South Atlantic, resulting in a 74-day naval and air campaign.",
      weather: "One of the strongest El Niño events of the twentieth century developed in 1982, while the March–April 1982 eruption of the El Chichón volcano in Mexico sent a massive sulfur cloud into the stratosphere."
    },
    1983: {
      news: "On June 18, 1983, physicist Sally Ride became the first American woman in space aboard Space Shuttle Challenger (STS-7). On January 1, 1983, ARPANET officially switched to the TCP/IP networking protocol—marking the technical birth of the modern Internet.",
      tech: "In 1983, Motorola received FCC approval for the DynaTAC 8000X, the world's first commercial handheld cellular phone (weighing nearly 2 pounds and priced at $3,995). In toy stores, the 1983 holiday season sparked the 'Cabbage Patch Kids' mania, with parents camping outside department stores for the adoptable cloth dolls.",
      pop: "The Police's 'Every Breath You Take' and Michael Jackson's 'Billie Jean' and 'Beat It' ruled the 1983 Billboard charts. 'Star Wars: Return of the Jedi' was the #1 box-office movie of 1983, while 106 million viewers watched the series finale of 'M*A*S*H' in February 1983.",
      car: "$10,600", ticket: "$3.15", gas: "$1.16", burger: "$0.55 (Big Mac: $1.50)", income: "$21,018",
      fashion: "In 1983, off-the-shoulder sweatshirts (inspired by 'Flashdance'), fingerless lace gloves, and red leather zipper jackets (inspired by 'Beat It') defined street style alongside mullets and teased bangs.",
      crime: "On November 26, 1983, six armed robbers broke into the Brink's-Mat warehouse near London's Heathrow Airport and stole 3 metric tons (6,800 bars) of pure gold bullion worth £26 million in one of history's largest gold heists.",
      conflict: "Cold War tensions peaked in 1983 with the announcement of the U.S. Strategic Defense Initiative (SDI) in March 1983 and the October 1983 U.S. military intervention in Grenada.",
      weather: "The peak of the 1982–1983 El Niño brought record-breaking winter storms to the California coast in early 1983 and severe drought and dust storms across Australia (including the February 1983 Melbourne dust storm)."
    },
    1984: {
      news: "On January 24, 1984, Steve Jobs unveiled the original Apple Macintosh 128K computer, bringing the graphical user interface and mouse to consumers. In February 1984, astronaut Bruce McCandless II performed the first untethered spacewalk using the Manned Maneuvering Unit jetpack.",
      tech: "The Apple Macintosh 128K and Sony's D-50 Discman (the world's first portable CD player, released in November 1984) led 1984 technology, while Hasbro launched the original 'Transformers' converting robot toys in 1984.",
      pop: "Prince's 'When Doves Cry' was the #1 Billboard song of 1984 alongside Madonna's 'Like a Virgin' and Bruce Springsteen's 'Born in the U.S.A.' In theaters, 'Beverly Hills Cop,' 'Ghostbusters,' and 'Indiana Jones and the Temple of Doom' dominated 1984, while 'The Cosby Show' and 'Miami Vice' premiered on NBC.",
      car: "$11,450", ticket: "$3.36", gas: "$1.13", burger: "$0.55 (Big Mac: $1.55)", income: "$22,415",
      fashion: "In 1984, pastel T-shirts worn under linen suit jackets (the 'Miami Vice' look), oversized graphic tees, and high-top sneakers ruled fashion while breakdancing on cardboard mats swept neighborhood streets.",
      crime: "In July 1984, an armoured car guard named Tony Musulin-style predecessor, Victor Gerena of the Wells Fargo depot in West Hartford, Connecticut, disappeared with $7 million in cash in September 1983/1984, landing on the FBI's Ten Most Wanted list in May 1984.",
      conflict: "In response to the 1980 Moscow boycott, the Soviet Union and fourteen Eastern Bloc allies boycotted the 1984 Summer Olympics in Los Angeles, highlighting ongoing Cold War divisions.",
      weather: "In March 1984, the violent Carolinas Tornado Outbreak spawned twenty-two tornadoes—including seven F4 storms—across North and South Carolina in a single afternoon."
    },
    1985: {
      news: "On September 1, 1985, a joint French–American expedition led by Dr. Robert Ballard and Jean-Louis Michel discovered the wreck of the RMS Titanic resting 12,500 feet below the North Atlantic. On July 13, 1985, the 'Live Aid' benefit concert was broadcast via satellite to 1.9 billion people worldwide.",
      tech: "In October 1985, Nintendo launched the Nintendo Entertainment System (NES) in North America bundled with 'Super Mario Bros.,' reviving the home video game market, while Microsoft released Windows 1.0 in November 1985.",
      pop: "Wham!'s 'Careless Whisper,' USA for Africa's 'We Are the World,' and Madonna's 'Into the Groove' topped the 1985 music charts. Robert Zemeckis's 'Back to the Future' was the #1 box-office hit of 1985, and NBC premiered 'The Golden Girls' in September 1985.",
      car: "$12,020", ticket: "$3.55", gas: "$1.12", burger: "$0.58 (Big Mac: $1.60)", income: "$23,618",
      fashion: "Fashion in 1985 featured Nike Air Jordan I basketball sneakers (released to the public in April 1985), neon Swatch watches worn two at a time, and power-shoulder blazers.",
      crime: "In May 1985, the FBI arrested retired U.S. Navy warrant officer John Anthony Walker Jr., uncovering one of the most damaging Cold War naval cryptographic espionage rings in American history.",
      conflict: "In November 1985, U.S. President Ronald Reagan and new Soviet General Secretary Mikhail Gorbachev met for the first time at the Geneva Summit in Switzerland, beginning the diplomatic thaw that would end the Cold War.",
      weather: "In May 1985, scientists from the British Antarctic Survey published the landmark discovery of the seasonal ozone hole over Antarctica, while Hurricane Gloria struck the U.S. East Coast in September 1985."
    },
    1986: {
      news: "In February 1986, the Soviet Union launched the core module of the Mir Space Station into orbit, and in December 1986 Dick Rutan and Jeana Yeager completed the first non-stop, unrefueled flight around the world aboard the Rutan Voyager aircraft.",
      tech: "Pixar Animation Studios was founded as an independent company in February 1986 with funding from Steve Jobs, while toy stores in 1986 could not keep Worlds of Wonder's animated storytelling bear 'Teddy Ruxpin' and 'Lazer Tag' sets in stock.",
      pop: "Dionne and Friends' 'That's What Friends Are For,' Lionel Richie's 'Say You, Say Me,' and Bon Jovi's 'Livin' on a Prayer' topped the 1986 charts. 'Top Gun' starring Tom Cruise was the #1 movie of 1986 alongside 'Crocodile Dundee' and 'Ferris Bueller's Day Off,' while 'The Oprah Winfrey Show' entered national syndication in September 1986.",
      car: "$12,650", ticket: "$3.71", gas: "$0.86", burger: "$0.60 (Big Mac: $1.60)", income: "$24,897",
      fashion: "Thanks to 'Top Gun' in 1986, Ray-Ban Aviator sunglasses and leather bomber jackets saw a 40% sales surge, paired with acid-wash denim and big crimped hair.",
      crime: "In April 1986, veteran journalist Geraldo Rivera hosted a live two-hour syndicated television special, 'The Mystery of Al Capone's Vaults,' watched by 30 million people as crews blasted open wall chambers under Chicago's Lexington Hotel.",
      conflict: "In October 1986, Ronald Reagan and Mikhail Gorbachev met at the dramatic Reykjavik Summit in Iceland, coming within inches of an agreement to eliminate all strategic nuclear ballistic missiles.",
      weather: "In 1986, Halley's Comet made its once-every-76-year pass through the inner solar system, while in August 1986 a sudden limnic eruption of dissolved carbon dioxide gas occurred at volcanic Lake Nyos in Cameroon."
    },
    1987: {
      news: "In March 1987, the U.S. Food and Drug Administration approved AZT, the first antiretroviral medication, while on October 19, 1987 ('Black Monday'), global stock markets experienced a historic single-day computer-traded drop before recovering.",
      tech: "In 1987, Compaq and IBM introduced 386 personal computers alongside the 3.5-inch 1.44 MB hard-shell floppy disk and the graphical 'GIF' image format (introduced by CompuServe in June 1987). In gaming, 'The Legend of Zelda' and 'Mega Man' debuted on the NES in 1987.",
      pop: "Whitney Houston's 'I Wanna Dance with Somebody,' U2's 'With or Without You,' and George Michael's 'Faith' ruled the 1987 charts. 'Three Men and a Baby,' 'Fatal Attraction,' and 'Dirty Dancing' led the 1987 box office, while 'Star Trek: The Next Generation' and 'Full House' premiered in September 1987.",
      car: "$13,380", ticket: "$3.91", gas: "$0.90", burger: "$0.62 (Big Mac: $1.65)", income: "$26,061",
      fashion: "In 1987, Christian Lacroix introduced the 'Pouf' skirt, while everyday teens wore stonewashed denim jackets, slouch socks over leggings, and high side-ponytails held with fabric scrunchies (patented in 1987).",
      crime: "In November 1987, a television broadcast signal hijacker wearing a rubber 'Max Headroom' mask interrupted two Chicago television stations (WGN-TV and WTTW) for ninety seconds using a high-powered microwave transmitter—a technical mystery never solved by the FCC.",
      conflict: "On June 12, 1987, speaking in front of the Brandenburg Gate in West Berlin, President Ronald Reagan delivered his famous challenge, 'Mr. Gorbachev, tear down this wall!' followed in December 1987 by the signing of the landmark INF Nuclear Treaty in Washington.",
      weather: "On October 15–16, 1987, the 'Great Storm of 1987' struck southern England and northern France with 115-mph hurricane-force gusts, toppling an estimated 15 million trees across the British countryside."
    },
    1988: {
      news: "In November 1988, NASA returned the Space Shuttle fleet to flight with Discovery (STS-26), while the First Intergovernmental Panel on Climate Change (IPCC) was established by the United Nations in 1988.",
      tech: "In 1988, the TAT-8 transatlantic fiber-optic cable was laid across the ocean floor, capable of carrying 40,000 simultaneous telephone calls by laser light, while Nintendo released 'Super Mario Bros. 3' in Japan and Sega launched the 16-bit Mega Drive.",
      pop: "George Michael's 'Faith,' Guns N' Roses' 'Sweet Child O' Mine,' and Bobby McFerrin's 'Don't Worry, Be Happy' topped the 1988 Billboard Hot 100. 'Rain Man,' 'Who Framed Roger Rabbit,' and 'Die Hard' dominated 1988 movie theaters, while 'The Wonder Years' and 'Roseanne' premiered on TV.",
      car: "$14,100", ticket: "$4.11", gas: "$0.90", burger: "$0.64 (Big Mac: $1.75)", income: "$27,225",
      fashion: "Streetwear in 1988 featured acid-wash denim overalls with one strap unbuckled, fluorescent Vision Street Wear skate shirts, and Nike Air Max sneakers with visible heel air units.",
      crime: "In November 1988, graduate student Robert Tappan Morris released the 'Morris Worm' across the early Internet to gauge its size; a coding bug caused the worm to replicate aggressively across 6,000 UNIX computers, leading to the creation of the first Computer Emergency Response Team (CERT).",
      conflict: "In August 1988, a United Nations-brokered ceasefire officially ended the eight-year Iran–Iraq War, while Soviet forces began their scheduled withdrawal from Afghanistan in May 1988.",
      weather: "The Summer of 1988 brought one of the most severe heatwaves and droughts in U.S. history Since the Dust Bowl, contributing to the historic 1988 Yellowstone National Park wildfires that burned across 793,000 acres."
    },
    1989: {
      news: "In March 1989, British computer scientist Tim Berners-Lee wrote his landmark proposal at CERN for a distributed hypertext system that became the World Wide Web. In August 1989, NASA's Voyager 2 probe completed history's first and only flyby of the planet Neptune.",
      tech: "In 1989, Nintendo revolutionized portable entertainment by launching the original 8-bit Game Boy handheld console bundled with 'Tetris,' alongside the 16-bit Sega Genesis in North America.",
      pop: "Madonna's 'Like a Prayer,' Bette Midler's 'Wind Beneath My Wings,' and Janet Jackson's 'Miss You Much' ruled the 1989 music charts. Tim Burton's 'Batman' and 'Indiana Jones and the Last Crusade' led the 1989 box office, while 'Seinfeld' (July 1989) and 'The Simpsons' (December 1989) debuted on television.",
      car: "$15,350", ticket: "$3.99", gas: "$1.00", burger: "$0.67 (Big Mac: $1.80)", income: "$28,906",
      fashion: "In 1989, Reebok Pump inflatable high-top basketball shoes debuted at $170 a pair, alongside Hypercolor-style oversized tees, biker shorts, and tall flat-top fades.",
      crime: "In March 1989, federal prosecutors indicted Wall Street 'junk bond king' Michael Milken of Drexel Burnham Lambert on ninety-eight counts of securities and reporting violations, defining the end of the 1980s Wall Street boom.",
      conflict: "On the night of November 9, 1989, East German authorities opened the checkpoints along the Berlin Wall after peaceful 'Revolutions of 1989' swept across Poland, Hungary, and Czechoslovakia, bringing the Cold War division of Europe to a joyful end.",
      weather: "In September 1989, Category 4 Hurricane Hugo made landfall near Charleston, South Carolina, and on October 17, 1989, the magnitude 6.9 Loma Prieta earthquake struck the San Francisco Bay Area minutes before Game 3 of the 1989 World Series."
    },
    1990: {
      news: "On February 11, 1990, anti-apartheid leader Nelson Mandela walked free from Victor Verster Prison in South Africa after twenty-seven years of imprisonment. On April 24, 1990, NASA launched the Hubble Space Telescope aboard Space Shuttle Discovery, and on October 3, 1990, East and West Germany officially reunified after forty-five years of division.",
      tech: "In December 1990, Tim Berners-Lee launched the world's first web server and web browser (WorldWideWeb) on a NeXT computer at CERN, while Microsoft released Windows 3.0 in May 1990. In toy stores, the 1990 holiday season belonged to the Super Famicom in Japan, Neo Geo arcades, and Teenage Mutant Ninja Turtles action figures.",
      pop: "Wilson Phillips's 'Hold On,' Madonna's 'Vogue,' and MC Hammer's 'U Can't Touch This' topped the 1990 Billboard charts. At the 1990 box office, the holiday comedy 'Home Alone,' 'Ghost,' and 'Dances with Wolves' were the highest-grossing films, while 'The Fresh Prince of Bel-Air' and 'Law & Order' premiered in September 1990.",
      car: "$16,050", ticket: "$4.23", gas: "$1.16", burger: "$0.70 (Big Mac: $1.85)", income: "$29,943",
      fashion: "Fashion in 1990 featured oversized brightly colored cross-colors streetwear, high-waisted pleated acid-wash jeans, and high-top fades or voluminous perms as teens socialized at roller rinks and shopping malls.",
      crime: "At 1:24 AM on March 18, 1990, two men disguised as Boston police officers talked their way inside the Isabella Stewart Gardner Museum and stole thirteen masterpieces—including works by Vermeer and Rembrandt valued at $500 million—in history's largest unsolved art heist.",
      conflict: "In August 1990, Iraqi forces invaded neighboring Kuwait, prompting the United Nations Security Council to impose economic sanctions and assemble a thirty-five-nation military coalition in Saudi Arabia under Operation Desert Shield.",
      weather: "In August 1990, the violent Plainfield F5 tornado struck northern Illinois without warning, while Europe experienced the devastating Burns' Day Storm in January 1990."
    },
    1991: {
      news: "In August 1991, Tim Berners-Lee made the World Wide Web publicly available on the Internet for the first time, and Finnish student Linus Torvalds announced the first version of the open-source Linux kernel. In September 1991, hikers in the Ötztal Alps discovered 'Ötzi the Iceman,' a naturally preserved 5,300-year-old Copper Age human.",
      tech: "In August 1991, Nintendo launched the 16-bit Super Nintendo Entertainment System (SNES) in North America bundled with 'Super Mario World,' while Sega debuted 'Sonic the Hedgehog' in June 1991. In the toy aisle, Larami's pressurized 'Super Soaker 50' water blaster became the runaway summer craze of 1991.",
      pop: "Bryan Adams's '(Everything I Do) I Do It for You' was the #1 Billboard song of 1991, while Nirvana released 'Smells Like Teen Spirit' in September 1991, igniting the grunge revolution. 'Terminator 2: Judgment Day,' 'Beauty and the Beast,' and 'The Silence of the Lambs' dominated 1991 theaters.",
      car: "$16,450", ticket: "$4.21", gas: "$1.14", burger: "$0.72 (Big Mac: $1.90)", income: "$30,126",
      fashion: "In 1991, temperature-sensitive 'Hypercolor' T-shirts that changed color when touched were the biggest fad in schools, alongside plaid flannel shirts, Doc Martens boots, and middle-parted hair.",
      crime: "In July 1991, international banking regulators shut down the Bank of Credit and Commerce International (BCCI) across seventy-three countries after uncovering a massive $20 billion international money-laundering and financial fraud web.",
      conflict: "In January and February 1991, the U.S.-led coalition conducted Operation Desert Storm to liberate Kuwait in the Persian Gulf War, and on December 25–26, 1991, the Soviet Union officially dissolved into fifteen independent republics, ending the Cold War.",
      weather: "In June 1991, Mount Pinatubo in the Philippines erupted in the second-largest volcanic blast of the 20th century, cooling global temperatures by 0.5°C, while the '1991 Perfect Storm' struck the North Atlantic in late October 1991."
    },
    1992: {
      news: "In February 1992, European leaders signed the Maastricht Treaty, officially founding the European Union and paving the way for the Euro currency. In September 1992, Dr. Mae Jemison became the first Black woman to travel into space aboard Space Shuttle Endeavour (STS-47).",
      tech: "On December 3, 1992, engineer Neil Papworth sent the world's first SMS text message ('Merry Christmas') over the Vodafone GSM network in the UK, while IBM introduced the first ThinkPad laptop in October 1992. In arcades and living rooms, 'Mortal Kombat' and 'Super Mario Kart' debuted in 1992.",
      pop: "Boyz II Men's 'End of the Road' and Whitney Houston's record-shattering 'I Will Always Love You' (from 'The Bodyguard') ruled the 1992 Billboard charts. Disney's 'Aladdin' and 'Home Alone 2: Lost in New York' led the 1992 box office, and Johnny Carson hosted his final episode of 'The Tonight Show' in May 1992.",
      car: "$16,950", ticket: "$4.15", gas: "$1.13", burger: "$0.75 (Big Mac: $1.95)", income: "$30,636",
      fashion: "Fashion in 1992 was defined by Seattle grunge—oversized thrift-store flannels, ripped Levi's 501s, and Converse Chuck Taylors—alongside backwards-worn jeans popularized by hip-hop duo Kris Kross.",
      crime: "In April 1992, following high-profile testimony by former underboss Sammy 'The Bull' Gravano in a Brooklyn federal courtroom, Gambino crime family boss John Gotti—the 'Teflon Don'—was convicted on thirteen counts of racketeering and sentenced to life in prison.",
      conflict: "In 1992, Czechoslovakia peacefully agreed to split into the independent nations of the Czech Republic and Slovakia (the 'Velvet Divorce'), while United Nations peacekeeping forces deployed to Bosnia and Somalia.",
      weather: "On August 24, 1992, Category 5 Hurricane Andrew struck South Florida near Homestead with 165-mph sustained winds, destroying over 63,000 homes and prompting sweeping reforms to Florida's hurricane building codes."
    },
    1993: {
      news: "In April 1993, CERN officially placed the World Wide Web software in the public domain free of royalties, and the National Center for Supercomputing Applications released the Mosaic 1.0 graphical web browser. In December 1993, astronauts aboard Space Shuttle Endeavour installed corrective optics on the Hubble Space Telescope, restoring its crystal-clear vision.",
      tech: "Intel launched the first Pentium processor in March 1993, while id Software released the landmark 3D computer game 'Doom' in December 1993. In toy stores, Saban's 'Mighty Morphin Power Rangers' action figures and Ty's original 'Beanie Babies' (launched in 1993) sparked massive retail frenzies.",
      pop: "Whitney Houston's 'I Will Always Love You' and Tag Team's 'Whoomp! (There It Is)' topped the 1993 Billboard Year-End chart. Steven Spielberg achieved an unprecedented double triumph in 1993 as 'Jurassic Park' became the highest-grossing film in history up to that time and 'Schindler's List' won Best Picture, while 'The X-Files' and 'Frasier' premiered on TV in September 1993.",
      car: "$17,500", ticket: "$4.14", gas: "$1.11", burger: "$0.75 (Big Mac: $1.99)", income: "$31,241",
      fashion: "In 1993, slip dresses layered over white baby tees, choker necklaces, baggy carpenter jeans, and flannel shirts tied around the waist defined youth fashion.",
      crime: "In May 1993, armed robbers carried out the $7.4 million Brink's armored car depot heist in Rochester, New York, sparking a multi-year FBI investigation across the United States and Ireland.",
      conflict: "On September 13, 1993, Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shook hands on the White House lawn after signing the historic Oslo I Accord.",
      weather: "In March 1993, the '1993 Storm of the Century' dumped record snowfall from Alabama to Maine, followed in the summer by the 'Great Flood of 1993' along the Mississippi and Missouri Rivers."
    },
    1994: {
      news: "On May 6, 1994, Queen Elizabeth II and French President François Mitterrand officially opened the Channel Tunnel ('Chunnel'), connecting Britain and mainland Europe by undersea rail for the first time. In July 1994, Jeff Bezos founded Amazon.com as an online bookstore in his Bellevue, Washington garage, and astronauts observed Comet Shoemaker–Levy 9 colliding with Jupiter.",
      tech: "In December 1994, Sony launched the original 32-bit PlayStation console in Japan, while Netscape Navigator 1.0 became the dominant web browser and the first QR Code was invented by Denso Wave in 1994.",
      pop: "Ace of Base's 'The Sign' and Boyz II Men's 'I'll Make Love to You' topped the 1994 Billboard Hot 100. 'The Lion King,' 'Forrest Gump,' and Quentin Tarantino's 'Pulp Fiction' made 1994 one of the greatest cinema years in history, while 'Friends' and 'ER' both premiered on NBC in September 1994.",
      car: "$18,200", ticket: "$4.18", gas: "$1.11", burger: "$0.79 (Big Mac: $2.00)", income: "$32,264",
      fashion: "In autumn 1994, Jennifer Aniston's character on 'Friends' debuted 'The Rachel' layered haircut, sparking a global salon craze alongside plaid mini-skirts (soon immortalized by 'Clueless'), combat boots, and Wonderbra billboards.",
      crime: "On June 17, 1994, 95 million American television viewers watched live aerial news coverage as a white Ford Bronco carrying former NFL star O.J. Simpson led police on a low-speed procession down Southern California freeways, preceding the 'Trial of the Century.'",
      conflict: "In April–May 1994, South Africa held its first non-racial democratic election, electing Nelson Mandela President and ending Apartheid, while in October 1994 Israel and Jordan signed a historic peace treaty.",
      weather: "Before dawn on January 17, 1994, the magnitude 6.7 Northridge earthquake struck the San Fernando Valley in Los Angeles, collapsing freeway overpasses and prompting major seismic building retrofits across California."
    },
    1995: {
      news: "On August 24, 1995, Microsoft launched the Windows 95 operating system to midnight lines at computer stores, introducing the 'Start' button and taskbar. In November 1995, Pixar released 'Toy Story,' the world's first entirely computer-animated feature film, and eBay (originally AuctionWeb) was founded in September 1995.",
      tech: "In September 1995, Sony launched the PlayStation in North America for $299, and the DVD optical disc format standard was finalized in late 1995. In toy aisles, Pogs (milk caps with heavy metal 'slammers') and Star Wars Power of the Force figures ruled 1995.",
      pop: "Coolio's 'Gangsta's Paradise,' TLC's 'Waterfalls,' and Seal's 'Kiss from a Rose' topped the 1995 music charts, while Alanis Morissette released 'Jagged Little Pill.' 'Toy Story,' 'Apollo 13,' and 'Braveheart' led the 1995 box office.",
      car: "$18,850", ticket: "$4.35", gas: "$1.15", burger: "$0.79 (Big Mac: $2.05)", income: "$34,076",
      fashion: "Fashion in 1995 featured plaid matching skirt-suits (inspired by the July 1995 film 'Clueless'), baby-doll tees, baggy skate jeans, and wallet chains.",
      crime: "In February 1995, 28-year-old futures trader Nick Leeson fled Singapore after unauthorized speculative trades on the Nikkei index caused $1.3 billion in losses, single-handedly collapsing Barings Bank—Britain's oldest merchant bank, founded in 1762.",
      conflict: "In November 1995, the presidents of Bosnia, Croatia, and Serbia signed the Dayton Accords at Wright-Patterson Air Force Base in Ohio, bringing an end to the three-and-a-half-year Bosnian War.",
      weather: "On January 17, 1995, the Great Hanshin (Kobe) earthquake struck Japan at magnitude 6.9, while the 1995 Atlantic hurricane season produced nineteen named storms including Hurricane Opal."
    },
    1996: {
      news: "On July 5, 1996, researchers at the Roslin Institute in Scotland announced the birth of Dolly the sheep, the first mammal successfully cloned from an adult somatic cell. In July–August 1996, the Centennial Summer Olympics were held in Atlanta, where Muhammad Ali lit the Olympic cauldron.",
      tech: "In 1996, Motorola released the StarTAC—the world's first clamshell 'flip phone'—alongside the PalmPilot 1000 personal digital assistant (PDA). In gaming and toys, the 64-bit Nintendo 64 console launched in September 1996 alongside 'Tickle Me Elmo' and the Japanese debut of Bandai's 'Tamagotchi.'",
      pop: "Los del Río's 'Macarena' (Bayside Boys Mix) and Mariah Carey & Boyz II Men's 'One Sweet Day' dominated the 1996 Billboard Hot 100, while the Spice Girls released 'Wannabe' in July 1996. 'Independence Day,' 'Twister,' and 'Mission: Impossible' crushed the 1996 box office.",
      car: "$19,400", ticket: "$4.42", gas: "$1.23", burger: "$0.82 (Big Mac: $2.10)", income: "$35,492",
      fashion: "In 1996, sporty 'Girl Power' platform sneakers, Adidas tear-away track pants with snap buttons up the sides, and frosted tips defined street style.",
      crime: "In April 1996, following a seventeen-year nationwide investigation, FBI agents arrested Harvard-educated mathematician Ted Kaczynski at a remote cabin without electricity near Lincoln, Montana.",
      conflict: "In September 1996, the United Nations General Assembly adopted the Comprehensive Nuclear-Test-Ban Treaty (CTBT), banning all nuclear explosions in all environments.",
      weather: "In January 1996, the 'Blizzard of 1996' buried the U.S. East Coast under up to four feet of snow, followed by rapid warm rains that triggered severe river flooding across Pennsylvania and New York."
    },
    1997: {
      news: "On July 4, 1997, NASA's Mars Pathfinder lander and its six-wheeled rover Sojourner touched down on Mars, sparking a record 47 million hits on NASA's website. On May 11, 1997, IBM's Deep Blue supercomputer defeated reigning world chess champion Garry Kasparov in a six-game match, and on July 1, 1997, sovereignty over Hong Kong was transferred from the UK to China.",
      tech: "In May 1997, Bandai released the Tamagotchi digital keychain pet in North America (selling millions in months), DVD video players went on sale in U.S. stores in March 1997, and Netflix was founded in August 1997 as a mail-order DVD rental service.",
      pop: "Elton John's 'Candle in the Wind 1997' became the best-selling physical single in chart history, alongside Puff Daddy's 'I'll Be Missing You' and Hanson's 'MMMBop.' James Cameron's 'Titanic' (released December 1997) and 'Men in Black' dominated 1997 cinemas, while 'South Park' and 'Buffy the Vampire Slayer' debuted on TV.",
      car: "$19,950", ticket: "$4.59", gas: "$1.23", burger: "$0.85 (Big Mac: $2.15)", income: "$37,005",
      fashion: "In 1997, ultra-wide-leg JNCO jeans, inflatable bubble backpacks, butterfly hair clips, and black Ray-Ban Predator sunglasses (inspired by 'Men in Black') were everywhere.",
      crime: "In September 1997, six robbers carried out the Dunbar Armored depot heist in Los Angeles—the largest cash robbery in U.S. history at $18.9 million—which stayed unsolved for two years until a suspect accidentally handed over a stack of cash still bound in an original Dunbar paper currency strap.",
      conflict: "In December 1997, 122 nations signed the Ottawa Treaty (Mine Ban Treaty) banning anti-personnel landmines, earning the International Campaign to Ban Landmines the 1997 Nobel Peace Prize.",
      weather: "The 1997–1998 El Niño event became the strongest on record at the time, while the Red River of the North flooded Grand Forks, North Dakota and Manitoba in April 1997."
    },
    1998: {
      news: "On September 4, 1998, Stanford PhD students Larry Page and Sergey Brin incorporated Google in a Menlo Park, California garage. In November 1998, the first module of the International Space Station (Zarya) was launched into orbit, and 77-year-old Mercury veteran John Glenn returned to space aboard Space Shuttle Discovery.",
      tech: "In August 1998, Apple revitalized personal computing by unveiling the translucent Bondi Blue iMac G3 (eliminating the floppy disk drive in favor of USB), while Nintendo released the Game Boy Color and 'Pokémon Red and Blue' in North America in autumn 1998, and Tiger Electronics launched the animatronic 'Furby' toy.",
      pop: "Next's 'Too Close,' Shania Twain's 'You're Still the One,' Celine Dion's 'My Heart Will Go On,' and Britney Spears's late-1998 debut '...Baby One More Time' ruled the airwaves. 'Saving Private Ryan' and 'Armageddon' topped the 1998 box office, while 76 million viewers watched the series finale of 'Seinfeld' in May 1998.",
      car: "$20,400", ticket: "$4.69", gas: "$1.06", burger: "$0.85 (Big Mac: $2.20)", income: "$38,885",
      fashion: "Fashion in 1998 featured cargo pants with side pockets, bucket hats, platform sandals, tinted rimless sunglasses, and spiky frosted tips.",
      crime: "In 1998, the U.S. Department of Justice filed its landmark federal antitrust lawsuit against Microsoft over the bundling of Internet Explorer with Windows 98, dominating business and legal headlines.",
      conflict: "On April 10, 1998, political leaders in Northern Ireland, the UK, and Ireland signed the historic Good Friday Agreement in Belfast, bringing an end to thirty years of conflict known as 'The Troubles.'",
      weather: "In January 1998, a catastrophic five-day ice storm deposited over four inches of solid freezing rain across eastern Ontario, southern Quebec, and northern New England, collapsing steel high-voltage transmission towers and leaving 4 million people without power."
    },
    1999: {
      news: "On January 1, 1999, eleven European nations officially launched the Euro as an electronic currency for banking and foreign exchange. Throughout 1999, governments, banks, and airlines spent over $300 billion upgrading mainframe software to prevent the 'Y2K Millennium Bug' before midnight on December 31, 1999.",
      tech: "In 1999, Research In Motion launched the BlackBerry 850 wireless email pager, Nvidia introduced the GeForce 256 (the world's first GPU), and Sega launched the Dreamcast console on 9/9/99 with a built-in modem for online play while Pokémon trading cards reached peak mania.",
      pop: "Cher's 'Believe' (which pioneered the use of Auto-Tune vocals) was the #1 Billboard song of 1999 alongside Santana's 'Smooth,' Backstreet Boys' 'I Want It That Way,' and TLC's 'No Scrubs.' 'Star Wars: Episode I – The Phantom Menace,' 'The Sixth Sense,' and 'The Matrix' (which introduced 'bullet time' cinematography) ruled 1999 theaters, while 'The Sopranos' and 'SpongeBob SquarePants' premiered in 1999.",
      car: "$20,850", ticket: "$5.08", gas: "$1.17", burger: "$0.89 (Big Mac: $2.25)", income: "$40,696",
      fashion: "In 1999, 'Y2K' futuristic metallic fabrics, long black leather trench coats (inspired by 'The Matrix'), puka-shell necklaces, and capri pants defined the end-of-the-millennium look.",
      crime: "In March 1999, computer programmer David L. Smith unleashed the 'Melissa' macro virus, which disguised itself as an important Word document attachment and automatically emailed itself to the first fifty people in a user's Outlook address book, forcing Microsoft, Intel, and government agencies to temporarily shut down their mail servers.",
      conflict: "In March 1999, Poland, Hungary, and the Czech Republic formally joined NATO—the first former Warsaw Pact nations to enter the alliance—while NATO conducted an air campaign during the Kosovo War.",
      weather: "On May 3, 1999, the Bridge Creek–Moore F5 tornado struck the Oklahoma City metropolitan area, where a mobile Doppler on Wheels radar measured wind speeds of 301 ± 20 mph—the fastest surface winds ever recorded on Earth."
    },
    2000: {
      news: "On November 2, 2000, American astronaut Bill Shepherd and Russian cosmonauts Yuri Gidzenko and Sergei Krikalev (Expedition 1) boarded the International Space Station, beginning an unbroken era of permanent human habitation in space. In June 2000, scientists announced the first working draft of the Human Genome.",
      tech: "On March 4, 2000 (and October 2000 in North America), Sony launched the PlayStation 2—which doubled as an affordable DVD player and went on to sell 160 million units—while Nokia released the iconic Nokia 3310 cell phone and the first commercial USB flash drives (holding 8 MB) went on sale.",
      pop: "Faith Hill's 'Breathe,' Santana's 'Maria Maria,' Eminem's 'The Real Slim Shady,' and *NSYNC's 'Bye Bye Bye' (from their album 'No Strings Attached,' which sold 2.4 million copies in a single week in March 2000) dominated music. 'How the Grinch Stole Christmas,' 'Cast Away,' and Best Picture winner 'Gladiator' led the 2000 box office, while CBS premiered 'Survivor' in May 2000.",
      car: "$21,250", ticket: "$5.39", gas: "$1.51", burger: "$0.89 (Big Mac: $2.35)", income: "$41,990",
      fashion: "In 2000, folding aluminum Razor scooters (named the 2000 Toy of the Year), low-rise flare jeans, bandana tops, and frosted spiky hair dominated streets and schoolyards.",
      crime: "In November 2000, a brazen gang attempted to steal the £200 million De Beers Millennium Star diamond from London's Millennium Dome using a JCB mechanical excavator and a speedboat waiting on the River Thames—only to find Scotland Yard's Flying Squad waiting in ambush disguised as maintenance cleaners.",
      conflict: "In June 2000, South Korean President Kim Dae-jung and North Korean leader Kim Jong-il held the historic first Inter-Korean Summit in Pyongyang since the division of the peninsula, earning Kim Dae-jung the 2000 Nobel Peace Prize.",
      weather: "In early 2000, severe flooding submerged southern Mozambique (where helicopter crews famously rescued thousands from treetops), while the autumn of 2000 was the wettest on record across the United Kingdom since 1766."
    },
    2001: {
      news: "On January 15, 2001, Jimmy Wales and Larry Sanger launched Wikipedia, a free collaborative online encyclopedia that grew into one of the most visited reference works in human history. In July 2001, surgeons in Louisville, Kentucky implanted the AbioCor, the first completely self-contained artificial heart.",
      tech: "On October 23, 2001, Apple unveiled the first-generation iPod ('1,000 songs in your pocket' via a 5 GB hard drive and mechanical scroll wheel), Microsoft launched Windows XP in October 2001, and Nintendo's GameCube and Microsoft's original Xbox (with 'Halo: Combat Evolved') debuted in November 2001.",
      pop: "Lifehouse's 'Hanging by a Moment' and Alicia Keys's 'Fallin'' topped the 2001 Billboard charts. In November and December 2001, theaters witnessed the launch of two cultural titans: 'Harry Potter and the Sorcerer's Stone' and 'The Lord of the Rings: The Fellowship of the Ring,' alongside 'Shrek' and 'Monsters, Inc.'",
      car: "$21,600", ticket: "$5.65", gas: "$1.46", burger: "$0.89 (Big Mac: $2.39)", income: "$42,228",
      fashion: "Fashion in 2001 featured head-to-toe denim outfits, asymmetric handkerchief hemlines, newsboy caps, and velour hoodies.",
      crime: "In October–December 2001, Houston energy giant Enron collapsed into the largest corporate bankruptcy in U.S. history up to that time after whistleblowers and journalists exposed billions of dollars in hidden off-balance-sheet debt.",
      conflict: "Following the events of September 11, 2001, NATO invoked Article 5 for the first time in its history, and a U.S.-led international coalition launched Operation Enduring Freedom in Afghanistan in October 2001 while global aviation security was permanently transformed.",
      weather: "In June 2001, Tropical Storm Allison stalled over southeastern Texas for days, dumping over 35 inches of rain on Houston and flooding the Texas Medical Center."
    },
    2002: {
      news: "On January 1, 2002, Euro banknotes and coins officially entered physical circulation across twelve European Union nations, replacing historic currencies like the French franc, German mark, and Italian lira overnight. In February 2002, Salt Lake City hosted the Winter Olympics.",
      tech: "In 2002, camera phones (such as the Sanyo SCP-5300) first arrived on North American wireless networks, T-Mobile launched the swivel-screen Sidekick communicator, and iRobot unveiled the first Roomba autonomous robotic vacuum cleaner.",
      pop: "Nickelback's 'How You Remind Me,' Eminem's 'Lose Yourself,' and Nelly's 'Hot in Herre' ruled the 2002 Billboard Hot 100. Sam Raimi's 'Spider-Man' (May 2002) became the first movie in history to earn over $100 million in a single opening weekend, alongside 'The Lord of the Rings: The Two Towers,' while Fox premiered 'American Idol' in June 2002.",
      car: "$21,850", ticket: "$5.80", gas: "$1.36", burger: "$0.95 (Big Mac: $2.39)", income: "$42,409",
      fashion: "In 2002, trucker hats, velour tracksuits, Avril Lavigne-inspired necktie-over-t-shirt skater style, and chunky highlights dominated youth culture.",
      crime: "In July 2002, following accounting scandals at WorldCom and Enron, the U.S. Congress passed the Sarbanes–Oxley Act, imposing strict personal criminal liability on corporate CEOs and CFOs for financial reporting accuracy.",
      conflict: "In May 2002, East Timor (Timor-Leste) officially became the first new sovereign nation of the 21st century after a United Nations-administered transition, while the International Criminal Court (ICC) was established in The Hague in July 2002.",
      weather: "In August 2002, catastrophic '100-year floods' along the Elbe and Danube Rivers inundated historic city centers in Dresden, Prague, and Budapest."
    },
    2003: {
      news: "In April 2003, the International Human Genome Sequencing Consortium announced the completion of the Human Genome Project, mapping 99% of human DNA. In October 2003, the supersonic Concorde made its final commercial passenger flight, and China launched Yang Liwei aboard Shenzhou 5 in its first crewed spaceflight.",
      tech: "In April 2003, Apple launched the iTunes Music Store selling legal digital song downloads for $0.99 each, Skype debuted in August 2003 for free computer-to-computer voice calls, and MySpace launched in August 2003.",
      pop: "50 Cent's 'In da Club,' Beyoncé's 'Crazy in Love,' and OutKast's 'Hey Ya!' topped the 2003 Billboard charts. 'The Lord of the Rings: The Return of the King' swept all 11 Oscars it was nominated for, alongside Pixar's 'Finding Nemo' and 'Pirates of the Caribbean: The Curse of the Black Pearl.'",
      car: "$22,000", ticket: "$6.03", gas: "$1.59", burger: "$0.99 (Big Mac: $2.45)", income: "$43,318",
      fashion: "In 2003, UGG sheepskin boots worn with denim mini-skirts, Von Dutch trucker caps, and popped-collar pastel polo shirts were the defining fashion trends.",
      crime: "Over Valentine's Day weekend in February 2003, thieves bypassed ten layers of security to loot 109 vault boxes inside the Antwerp Diamond Centre in Belgium, escaping with over $100 million in diamonds before DNA on a discarded salami sandwich led detectives to the mastermind.",
      conflict: "In March 2003, a U.S.-led coalition launched the invasion of Iraq (Operation Iraqi Freedom), dominating global news coverage and diplomatic debates throughout the year.",
      weather: "In August 2003, a historic European heatwave pushed temperatures past 104°F (40°C) across France, Germany, and the UK, while on August 14, 2003, overgrown trees touching power lines in Ohio triggered the Northeast Blackout of 2003 affecting 55 million people."
    },
    2005: {
      news: "On February 14, 2005, three former PayPal employees registered YouTube.com, uploading the first video ('Me at the zoo') in April 2005. In January 2005, the European Space Agency's Huygens probe landed on Saturn's largest moon, Titan—the farthest landing from Earth ever achieved by a spacecraft.",
      tech: "In November 2005, Microsoft launched the Xbox 360 console, inaugurating the high-definition (HD) gaming era, while Apple released the pencil-thin iPod Nano and video iPod, and Google launched Google Maps in February 2005.",
      pop: "Mariah Carey's 'We Belong Together,' Gwen Stefani's 'Hollaback Girl,' and Green Day's 'Boulevard of Broken Dreams' ruled the 2005 Billboard charts. 'Star Wars: Episode III – Revenge of the Sith' and 'Harry Potter and the Goblet of Fire' led the 2005 box office, while 'The Office' (U.S.), 'Grey's Anatomy,' and 'Avatar: The Last Airbender' premiered on TV in early 2005.",
      car: "$22,600", ticket: "$6.41", gas: "$2.30", burger: "$0.99 (Big Mac: $2.58)", income: "$46,326",
      fashion: "In 2005, Hollister and Abercrombie graphic polos, gaucho pants, wide Boho coin belts, and Motorola RAZR phones clipped to waistbands defined everyday style.",
      crime: "In August 2005, thieves in Fortaleza, Brazil rented a house two blocks from the Central Bank of Brazil, posed as a synthetic-turf landscaping company, and dug a 256-foot-long, wood-paneled, air-conditioned tunnel under two city blocks to steal 3.5 tons of banknotes ($70 million) over a single weekend.",
      conflict: "In January 2005, millions of Iraqi citizens voted in the country's first multi-party parliamentary election in fifty years, while Angela Merkel became the first female Chancellor of Germany in November 2005.",
      weather: "The 2005 Atlantic hurricane season shattered all meteorological records with 28 named storms—including Hurricanes Dennis, Emily, Katrina (August 2005), Rita, and Wilma—forcing the National Hurricane Center to use the Greek alphabet for storm names for the first time."
    }
  };

  if (yearEventsTable[year]) {
    const y = yearEventsTable[year];
    return {
      worldNews: y.news,
      techAndToys: y.tech,
      popCulture: y.pop,
      priceShock: { car: y.car, ticket: y.ticket, gas: y.gas, burger: y.burger, income: y.income },
      fashionVibe: y.fashion,
      notoriousCrime: y.crime,
      globalConflict: y.conflict,
      extremeWeather: y.weather
    };
  }

  const ext = MODERN_AND_CLASSIC_YEARS[year] || getClassicYearRecord(year);
  return {
    worldNews: ext.news,
    techAndToys: ext.tech,
    popCulture: ext.pop,
    priceShock: {
      car: ext.car,
      ticket: ext.ticket,
      gas: ext.gas,
      burger: ext.burger,
      income: ext.income
    },
    fashionVibe: ext.fashion,
    notoriousCrime: ext.crime,
    globalConflict: ext.conflict,
    extremeWeather: ext.weather
  };
};
