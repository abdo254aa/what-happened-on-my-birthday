import { editorialTemplates, EditorialTemplate, EditorialSection } from '../data/editorialArticles';
import { MONTHS } from '../types';
import { getZodiacSign, getHistoricalMoonPhase } from '../utils/dateUtils';
import { EXACT_DATE_ARCHIVE, DAY_OF_MONTH_UNIQUE_EVENTS } from '../data/exactDateMagazineDatabase';

export interface MagazineArticleJSON {
  main_title: string;
  introduction: string;
  sections: Array<{
    creative_subtitle: string;
    content: string;
  }>;
  conclusion: string;
}

// 36 completely distinct, real historical stories so that any calendar day (1-31) and month (1-12) gets 6 unique, non-repeating 8-12 sentence stories!
const DISTINCT_HISTORICAL_STORY_VAULT: Array<{
  subtitle: string;
  story: string;
}> = [
  {
    subtitle: "The Giant Glass Crystal Palace: Building a Greenhouse Over Living Trees",
    story: "When engineers in London set out to build the Great Exhibition Hall—famous around the world as the 'Crystal Palace'—they created a sparkling castle out of 300,000 panes of clear glass and iron beams! The building was 1,851 feet long, making it three times longer than St. Paul's Cathedral and tall enough to hold a ten-story building inside! When parks workers realized that three giant, hundred-year-old elm trees were growing right where the middle of the building needed to go, architect Joseph Paxton refused to chop them down. Instead, he designed a giant curved glass barrel roof 108 feet high that arched right over the top of the living trees! That meant green leaves and chirping sparrows were flying right inside the exhibition hall! When the doors opened, six million excited kids and parents walked across the wooden floorboards to see wonders from all over the planet. Visitors marveled at chugging steam locomotives, diving bells, the giant Koh-i-Noor diamond, and even a funny mechanical 'alarm-clock bed' that rang a bell and tipped sleepers right onto their feet at wake-up time! Later, the entire glass palace was taken apart like a giant Lego set and rebuilt on Sydenham Hill, where artists built the world's very first life-sized dinosaur statues in the garden outside!"
  },
  {
    subtitle: "Mariner 9's Dusty Surprise: Discovering the Solar System's Biggest Volcano",
    story: "When NASA's robotic spacecraft Mariner 9 fired its braking rocket and became the very first spacecraft in human history to orbit another planet, Mars greeted it with a giant surprise! The moment Mariner 9 arrived in orbit, a monstrous planet-wide dust storm was raging across the entire Red Planet, hiding every single valley and crater beneath a thick orange blanket of dust for a whole month! Only four mysterious dark circles poked up through the top of the swirling dust clouds like islands in an orange ocean. Scientists back at NASA's Jet Propulsion Laboratory in California waited patiently until the Martian wind finally died down and the dust settled back to the ground. When Mariner 9's television cameras beamed back 7,329 crystal-clear photos, astronomers jumped out of their chairs! The tallest dark spot poking through the clouds turned out to be 'Olympus Mons'—a colossal volcano three times taller than Mount Everest and wide enough to cover the entire state of Arizona! Even more amazing, Mariner 9 discovered 'Valles Marineris' (named in honor of the spacecraft!), a grand canyon on Mars four miles deep that would stretch all the way from New York City to Los Angeles! It proved that Mars wasn't just a quiet, Moon-like rock, but a dramatic world of giant volcanoes and ancient river beds!"
  },
  {
    subtitle: "Apollo 12's Lightning Strike: How One Little Switch Saved a Moon Mission",
    story: "Astronauts Pete Conrad, Alan Bean, and Dick Gordon blasted off toward the Moon aboard Apollo 12 in the middle of a pouring Florida rainstorm! Just thirty-six seconds after the 363-foot Saturn V rocket roared off the launch pad, a giant bolt of lightning struck the top of the metal rocket and flashed all the way down the fiery exhaust trail to the ground! Instantly, all three fuel cells inside the spacecraft disconnected, and every single warning light and siren on the astronaut dashboard started flashing bright red at once! Up in the cabin, the computer screens went dark, while down in Mission Control in Houston, Texas, nobody had ever seen such a weird jumble of numbers on their monitors. Suddenly, a twenty-four-year-old flight controller named John Aaron—who had seen that exact same weird pattern once during a practice test a year earlier!—spoke into his headset and said five legendary words: 'Flight, try SCE to Aux!' None of the bosses or even the mission commander knew where the tiny 'SCE' (Signal Conditioning Equipment) switch was located, except astronaut Alan Bean, because it sat right beside his right knee! Alan flipped the little metal toggle switch to 'Auxiliary,' all the spacecraft power and computers blinked right back to life, and Pete Conrad laughed the rest of the way into space! Four days later, Pete and Alan walked on the Moon's Ocean of Storms and even visited an old robot lander named Surveyor 3!"
  },
  {
    subtitle: "The Birth of Island Surtsey: When an Underwater Volcano Built New Land",
    story: "Early one chilly morning off the southern coast of Iceland, the cook aboard a wooden fishing boat named the Ísleifur II stepped out onto the deck, smelled rotten-egg sulfur in the breeze, and saw a giant column of black smoke rising right out of the icy Atlantic Ocean! At first, the boat's captain thought another fishing vessel was on fire and steered closer to rescue the sailors, only to feel the ocean water underneath his hull rumbling and boiling! An underwater volcano sitting 426 feet below the waves had woken up and cracked open the sea floor! Within hours, jets of red-hot lava, pumice stones, and white steam were blasting four miles high into the sky, visible all the way from Iceland's capital city of Reykjavik! Over the next few weeks, the cooling black lava piled higher and higher above the crashing waves until it formed a brand-new island one square mile wide, which Icelanders named 'Surtsey'! Right away, scientists declared the brand-new island a strict nature reserve where ordinary tourists weren't allowed to step foot—and any scientist who visited had to scrub their boots clean so they wouldn't accidentally drop a single plant seed from their shoe! Watching with binoculars over the years, biologists saw ocean waves wash ashore wild sea-rocket seeds, seagulls build nests on the warm cliffs, and green moss carpet the rock. Surtsey showed the whole world how a bare volcanic rock turns into a living green island from scratch!"
  },
  {
    subtitle: "Nellie Bly's 72-Day Race: Beating Phileas Fogg Around the Whole World",
    story: "A fearless twenty-five-year-old newspaper reporter named Nellie Bly stepped aboard the steamship Augusta Victoria in Hoboken, New Jersey, with a wild goal: racing all the way around the planet faster than anyone in history! Millions of kids and families had read Jules Verne's famous adventure book 'Around the World in Eighty Days,' and Nellie wanted to prove a real person could beat the fictional record of Phileas Fogg! When she first pitched the idea to her boss at the New York World newspaper, he told her that only a man could travel around the world because a woman would need 'twelve huge trunks of dresses' and a bodyguard! To prove him wrong, Nellie packed her entire trip into ONE tiny sixteen-inch leather satchel—bringing only the blue plaid wool dress she was wearing, a sturdy overcoat, a change of slippers, a toothbrush, and a jar of cold cream, while keeping her travel money tucked inside a pouch around her neck! She steamed across the Atlantic to England, took a detour to France to shake hands with author Jules Verne himself in his study, and then rode trains, steamships, rickshaws, horses, and sampan boats through Egypt, Sri Lanka, Malaysia, Singapore, Hong Kong, and Japan! In Singapore, she even bought a friendly little pet monkey who rode on her shoulder all the way across the Pacific Ocean to San Francisco! When her special cross-country train pulled back into New Jersey, cannons boomed and crowds cheered because Nellie had circled the globe in a record-shattering 72 days, 6 hours, and 11 minutes!"
  },
  {
    subtitle: "The First Computer Mouse: How a Block of Pine Wood Changed Screens",
    story: "American inventor Douglas Engelbart received U.S. Patent #3,541,541 for a funny-looking little wooden box that changed how every single person on Earth uses a computer: the computer mouse! Back in the early 1960s, computers were giant metal cabinets that didn't have pointers, clickable icons, or windows on the screen—if you wanted the computer to do math or show a word, you had to punch little rectangular holes into stacks of paper cards! Sitting at a conference room table with his pocket notebook, Douglas wondered: what if you could point right at a word on the glass screen by sliding a hand-sized block across your wooden desk? He sketched a box with two metal disc wheels underneath set at a 90-degree angle—one wheel rolling forward-and-back, and the other wheel rolling left-to-right! His fellow engineer Bill English went into the workshop and carved the very first prototype out of a hollow block of brown pine wood with a single red push-button on top. When they plugged the gray electrical cord into the back of the wooden box and set it on the table, the wire stuck out just like the long skinny tail of a real mouse! Soon everyone in the laboratory was calling the gadget a 'mouse,' and they called the blinking dot on the screen a 'bug'! Even though Douglas invented it so people could collaborate and draw together on screens, he never earned royalties from his patent because it expired right before personal computers filled every home and school!"
  },
  {
    subtitle: "Arecibo's Cosmic Postcard: Beaming Pixel Art to Three Hundred Thousand Stars",
    story: "Astronomers Frank Drake and Carl Sagan gathered at the giant Arecibo Observatory in the green mountains of Puerto Rico—where a colossal 1,000-foot metal radio dish sat nestled inside a natural limestone sinkhole big enough to hold twenty-five football fields!—to beam the first deliberate radio picture message toward deep space! Using a megawatt transmitter twenty million times more powerful than a regular FM radio station, the dish sent out a three-minute stream of 1,679 musical two-tone 'beeps' and 'boops' aimed at the Great Star Cluster in Hercules! Why did Frank Drake pick the exact number 1,679? Because in math, 1,679 is a 'semiprime' number that can only be multiplied together from two prime numbers: 73 and 23! If a clever alien astronomer ever intercepts the radio signal and colors in the '1' beeps and leaves the '0' boops blank inside a grid that is 73 squares tall and 23 squares wide, a secret pixel-art picture appears right before their eyes! At the very top of the picture are the binary numbers from 1 to 10, followed by the atomic numbers for hydrogen, carbon, nitrogen, oxygen, and phosphorus—the building blocks of life! Below that, the pixel art shows the double-helix spiral ladder of human DNA, a little stick-figure human standing 4 feet 11 inches tall, a map of our Solar System with the third planet (Earth!) lifted up toward the person's feet, and a drawing of the giant Arecibo telescope dish itself!"
  },
  {
    subtitle: "Steamboat Willie's Whistle: The Night Mickey Mouse Debuted With Sound",
    story: "Inside the giant Broadway Theatre in New York City, twenty-six-year-old cartoonist Walt Disney and his best friend and chief artist Ub Iwerks premiered a seven-minute black-and-white animated short called 'Steamboat Willie'—officially celebrated around the globe as the birthday of Mickey Mouse and Minnie Mouse! Earlier that year, Walt had lost the rights to his previous cartoon character during a train trip back from New York, so he sketched a cheerful little mouse with round ears, button shorts, and big shoes originally named 'Mortimer Mouse' until Walt's wife Lillian said, 'Mortimer sounds too stuffy—call him Mickey!' What made 'Steamboat Willie' a sensation was that it was the very first cartoon ever made with fully synchronized music, voices, and sound effects printed right onto the film! To make sure the cartoon animals moved to the exact beat of the music, Ub Iwerks drew a bouncing ball and click-marks on the film at 24 frames per second so the orchestra conductor could tap along! In the cartoon, Mickey stands at the wooden wheel of a river steamboat whistling a jaunty tune, helps crank Minnie Mouse aboard with a cargo hook after she drops her guitar, and turns the boat's farm animals into a noisy orchestra! Inside the recording studio, sound-effects wizard Jimmy MacDonald banged on tin garbage cans, blew into slide whistles, shook cowbells, and Walt Disney himself stepped up to the microphone to record all of Mickey's high-pitched squeaks and laughs!"
  }
];

const DISTINCT_CELEB_STORY_VAULT: Array<{
  name: string;
  birthYear: number;
  subtitle: string;
  story: string;
}> = [
  {
    name: "Whoopi Goldberg",
    birthYear: 1955,
    subtitle: "Whoopi Goldberg's EGOT Trophy Shelf: From Disney's Lion King to Star Trek",
    story: "Born in New York City as Caryn Elaine Johnson, superstar actress and comedian Whoopi Goldberg is one of the very few performers in world history to win an 'EGOT'—an Emmy Award, a Grammy Award, an Oscar (Academy Award), AND a Tony Award! Growing up in Manhattan, she loved watching classic movies on television with her mom and performing in children's theater workshops at the Hudson Guild Theater when she was just eight years old! Animation fans recognize her hilarious, unmistakable voice right away as Shenzi, the leader of the laughing hyena trio in Disney's 'The Lion King,' as well as the purple stuffed octopus Stretch in Pixar's 'Toy Story 3'! When she was a little girl in the 1960s watching 'Star Trek' on television, she saw actress Nichelle Nichols playing Lieutenant Uhura on the bridge of the Starship Enterprise and ran through her apartment shouting, 'Mama, come quick—there's a Black lady on television and she ain't no maid!' Inspired by that moment, even after Whoopi won an Academy Award for the movie 'Ghost,' she personally called the creator of 'Star Trek: The Next Generation' and asked if she could be on the show—creating the fan-favorite character Guinan, a wise alien bartender from a species of 'listeners' who gave advice to Captain Picard! Her joyful career proves that big laughter and big dreams can take you all the way to the stars!"
  },
  {
    name: "Robert Louis Stevenson",
    birthYear: 1850,
    subtitle: "Robert Louis Stevenson's Treasure Map: Inventing Pirate Gold on a Rainy Day",
    story: "Every pirate story you have ever read—with wooden-legged sea captains, squawking shoulder parrots, black 'Jolly Roger' flags, and crinkled parchment maps where 'X marks the spot'!—comes straight from the imagination of Scottish author Robert Louis Stevenson! Growing up in Edinburgh, Scotland, Robert came from a famous family of 'lighthouse engineers' who built giant stone lighthouses on stormy ocean rocks all around the Scottish coast. Because young Robert had weak lungs and caught bad colds every winter, he spent weeks propped up in bed with pillows, playing with lead toy soldiers and listening to his nurse Alison Cunningham ('Cummy') tell spooky Scottish adventure stories by candlelight! Years later, during a rainy summer vacation in the Scottish Highlands when his twelve-year-old stepson Lloyd Osbourne was stuck indoors bored and painting with watercolors, Robert sat down on the floor with him and helped draw a make-believe map of a hook-shaped island! As Robert labeled spots on the map with cool names like 'Spy-glass Hill' and 'Skeleton Island' and drew a red 'X' for buried gold, the characters of young Jim Hawkins, Long John Silver, and his talking green parrot Captain Flint ('Pieces of eight!') popped right into his head! Every evening after dinner, he read a brand-new chapter of 'Treasure Island' aloud by the fireplace while twelve-year-old Lloyd cheered and insisted the story have 'no mushy romance—only pirates and ships!' Later in life, Robert sailed across the Pacific Ocean to the sunny island of Samoa, where local islanders loved his stories so much they named him 'Tusitala,' which means 'The Teller of Tales'!"
  },
  {
    name: "Claude Monet",
    birthYear: 1840,
    subtitle: "Claude Monet's Water Lily Pond: Painting Sunshine Outdoors With Bright Colors",
    story: "French painter Claude Monet changed the history of art forever by taking his wooden easel out of dark, dusty indoor studios and setting it up right in the middle of sunny flower fields, beaches, and rowboats! When Claude was a schoolboy growing up in the port town of Le Havre by the sea, he hated sitting still at his wooden school desk and filled the margins of his math workbooks with funny cartoon caricatures of his teachers! Soon, his cartoons became so famous in town that the local framing-shop owner hung them in the front window, where fifteen-year-old Claude sold his drawings for twenty francs each and saved up a whole treasure chest of silver coins! One day in the framing shop, an older landscape painter named Eugène Boudin told young Claude a secret: 'Come outside to the beach with me—painting directly in the open air and sunlight is ten times better than staying indoors!' When Claude and his friends displayed their bright, dabbed-paint canvases in Paris—including Claude's misty sunrise painting called 'Impression, Sunrise'—grumpy art critics laughed and called them 'Impressionists,' claiming the paintings looked unfinished like wallpaper! Instead of giving up, Claude bought a house in the village of Giverny, planted a giant rainbow garden with a green Japanese footbridge and weeping willow trees, and painted 250 giant canvases of floating water lilies that now fill whole oval rooms in Paris museums!"
  },
  {
    name: "Astrid Lindgren",
    birthYear: 1907,
    subtitle: "Astrid Lindgren's Super-Strong Heroine: How a Sick Day Created Pippi Longstocking",
    story: "Swedish children's author Astrid Lindgren grew up on a red wooden farmhouse called Näs in southern Sweden, where she spent her childhood climbing apple trees, jumping into giant haystacks in the barn, and playing 'Don't Touch the Floor' across the kitchen furniture with her brother and sisters! Years later, during the snowy winter of 1941 in Stockholm, Astrid's seven-year-old daughter Karin was stuck in bed with a bad cold and begged every night, 'Tell me a story!' When Astrid asked what the story should be about, seven-year-old Karin invented a silly name right on the spot and said, 'Tell me about Pippi Longstocking!' Because it was such a funny name, Astrid made up an equally funny girl to match it: a nine-year-old girl with bright carrot-orange pigtails that stuck straight out like wooden pegs, mismatched stockings, shoes twice as big as her feet, and such superhuman strength that she could lift her spotted horse right onto the front porch of her house, Villa Villekulla, with one hand! Three years later, when Astrid slipped on an icy sidewalk in Stockholm and sprained her ankle, she spent her time on the sofa writing down all the Pippi stories in shorthand and mailed a copy to a book publisher with a funny note saying, 'I hope you don't call the child welfare office on me!' Since then, 'Pippi Longstocking' has been translated into 77 languages and sold over 165 million copies, proving that the best books in the world start as bedtime stories for kids!"
  },
  {
    name: "Shigeru Miyamoto",
    birthYear: 1952,
    subtitle: "Shigeru Miyamoto's Lantern Caves: How Childhood Hikes Created Mario and Zelda",
    story: "Every time you help Mario jump down a green warp pipe in 'Super Mario Bros.,' race a banana-peel kart in 'Mario Kart,' or explore Hyrule with Link in 'The Legend of Zelda,' you are playing inside the childhood memories of Japanese game designer Shigeru Miyamoto! Growing up in the quiet, green countryside town of Sonobe outside Kyoto, Japan, young Shigeru's family didn't own a television set or a car. Instead, Shigeru spent his afternoons making wooden toys with his hands, drawing flip-book cartoons in his school notebooks, and hiking through the bamboo forests and rice paddies around his house! One day in the woods, Shigeru discovered a dark, hidden hole in the side of a hill; after coming back the next afternoon with a homemade lantern, he crawled through a narrow tunnel and emerged inside a secret chain of underground caves! Decades later, when Nintendo hired him as their very first staff artist—where he originally painted colorful pictures on the sides of arcade cabinets!—Nintendo asked him to rescue a flopped arcade game. Shigeru drew a giant cartoon gorilla ('Donkey Kong') tossing wooden barrels at a little carpenter in red overalls and a cap (drawn with a hat and mustache because early arcade screens didn't have enough pixels to draw hair or a mouth!), whom Nintendo later named 'Mario' after their friendly warehouse landlord, Mario Segale! Then Shigeru turned his childhood lantern-cave hikes directly into 'The Legend of Zelda,' becoming the most celebrated video game creator in history!"
  },
  {
    name: "Ed White",
    birthYear: 1930,
    subtitle: "Astronaut Ed White's Golden Cord: The First American to Walk in Space",
    story: "When NASA astronaut Edward H. White II opened the hatch of the Gemini 4 spacecraft 120 miles above the Pacific Ocean, he stepped out into the vacuum of space to become the very first American in history to perform a spacewalk! Growing up as the son of an Air Force general, Ed was a star athlete who ran the 400-meter hurdles at the West Point military academy and missed making the 1952 U.S. Olympic track team by just fractions of a second! Before becoming a test pilot and astronaut, he earned a master's degree in aeronautical engineering and practiced flying inside giant 'Vomit Comet' airplanes that dove through the sky to create twenty-five seconds of weightlessness at a time! During his historic spacewalk on Gemini 4, Ed was attached to the capsule by a twenty-five-foot golden umbilical cord covered in shiny gold tape that carried his oxygen and radio wires. Holding a special handheld 'zip gun' in his right glove that shot out puffs of compressed oxygen gas like a miniature jetpack, Ed propelled himself from Hawaii all the way to Florida at 17,500 miles per hour while doing somersaults above the blue clouds! He was having so much fun floating outside in space that when Mission Control radioed his partner Jim McDivitt to tell Ed his twenty minutes were up and he had to get back inside, Ed groaned into his microphone, 'This is the saddest moment of my life!' before climbing back into the hatch with a giant grin!"
  },
  {
    name: "Danny DeVito",
    birthYear: 1944,
    subtitle: "Danny DeVito's Big Voice: From Roald Dahl's Matilda to Disney's Hercules",
    story: "Standing just 4 feet 10 inches tall with a booming voice and a giant laugh, actor, director, and voice star Danny DeVito grew up in Asbury Park, New Jersey, where he loved going to the boardwalk arcade and watching monster movies at the beachside cinema! When Danny arrived in Hollywood with almost no money in his pocket, he shared a tiny apartment with his best friend, future movie star Michael Douglas, and practiced funny character voices until he landed a starring role on the hit television comedy 'Taxi,' winning both an Emmy Award and a Golden Globe! Kids and families know and love Danny best for two legendary movies from the 1990s! First, in 1996, after his own kids read him Roald Dahl's book 'Matilda' at bedtime, Danny directed, produced, narrated, AND starred in the movie version of 'Matilda' as Harry Wormwood! Behind the scenes on the 'Matilda' movie set, whenever the cameras stopped rolling, Danny was the nicest adult in the studio—taking young actress Mara Wilson (who played Matilda!) out for ice cream and hosting pool parties for all the kid actors! The very next year, in 1997, Disney cast Danny as the voice of Philoctetes ('Phil'), the grumpy but lovable half-man, half-goat trainer of heroes in the animated musical 'Hercules,' followed in 2012 by voicing the orange tree-protecting Lorax in Dr. Seuss's 'The Lorax'—recording the Lorax's voice in five different languages, including Spanish, Italian, German, and Russian!"
  },
  {
    name: "Owen Wilson",
    birthYear: 1968,
    subtitle: "Owen Wilson's 'Ka-Chow!' Magic: Giving Lightning McQueen His Famous Racecar Voice",
    story: "Whenever racecar #95—Lightning McQueen!—flashes his shiny headlight sticker in Pixar's 'Cars' movies and shouts his famous catchphrase 'Ka-Chow!', you are hearing the unmistakable voice of Texas-born actor and screenwriter Owen Wilson! Growing up in Dallas, Texas, with his two brothers Andrew and Luke (who also both grew up to become movie actors!), Owen loved playing backyard football, pulling harmless pranks with walkie-talkies, and writing funny adventure stories with his college roommate, movie director Wes Anderson. In FACT, Owen got his very first job in Hollywood not as an actor, but as a writer—earning an Academy Award nomination for Best Original Screenplay for co-writing the comedy 'The Royal Tenenbaums'! Kids around the world love Owen as the miniature cowboy figurine Jedediah in the 'Night at the Museum' movies, where he battles a giant Tyrannosaurus rex skeleton alongside a three-inch-tall Roman general inside the American Museum of Natural History! When Pixar founder John Lasseter cast Owen as the voice of rookie racecar Lightning McQueen in 'Cars,' 'Cars 2,' and 'Cars 3,' Owen recorded hundreds of different versions of the word 'Wow!' and 'Ka-Chow!' in the sound booth! He even voiced the comic-strip Great Dane dog 'Marmaduke' and starred in Disney's 'Haunted Mansion,' making every family movie night ten times funnier!"
  }
];

const ZODIAC_KID_MAGAZINE_DATA: Record<string, {
  element: string;
  planet: string;
  constellationStar: string;
  birthstone: string;
  symbolAnimal: string;
  superpowerName: string;
  superpowerDetail: string;
  bestFriends: string;
  oppositeSign: string;
}> = {
  "Scorpio": {
    element: "Water",
    planet: "Mars and Pluto",
    constellationStar: "Antares (a giant red supergiant star 700 times wider than our Sun!)",
    birthstone: "Golden Topaz and Sunny Citrine",
    symbolAnimal: "the clever Scorpion and the soaring Eagle",
    superpowerName: "Secret-Agent Detective Focus",
    superpowerDetail: "Whenever someone hides a clue in a riddle, loses their house keys in the grass, or says a science puzzle is 'impossible,' a Scorpio brain locks on like a laser beam until the mystery is solved!",
    bestFriends: "Cancer and Pisces (your fellow Water signs) plus steady Earth signs Taurus and Virgo",
    oppositeSign: "Taurus"
  },
  "Virgo": {
    element: "Earth",
    planet: "Mercury (the speedy messenger planet that circles the Sun in just 88 days!)",
    constellationStar: "Spica (a dazzling blue-white binary star system 250 light-years from Earth!)",
    birthstone: "Royal Blue Sapphire",
    symbolAnimal: "the harvest maiden and the clever fox",
    superpowerName: "Master-Builder Blueprint Vision",
    superpowerDetail: "If a thousand-piece Lego castle is missing one tiny gray connector brick or a group project needs a smart step-by-step game plan, a Virgo spots the exact solution in five seconds flat!",
    bestFriends: "Taurus and Capricorn (your fellow Earth signs) plus loyal Water signs Cancer and Scorpio",
    oppositeSign: "Pisces"
  },
  "Sagittarius": {
    element: "Fire",
    planet: "Jupiter (the giant king of planets, big enough to hold 1,300 Earths inside!)",
    constellationStar: "Kaus Australis (pointing right toward the center of our Milky Way galaxy!)",
    birthstone: "Blue Topaz and Turquoise",
    symbolAnimal: "the half-horse Archer pointing an arrow at the stars",
    superpowerName: "World-Explorer Optimism",
    superpowerDetail: "You love big outdoor quests, funny jokes, and learning about distant countries and animals, turning even a rainy Tuesday into an epic expedition!",
    bestFriends: "Aries and Leo (your fellow Fire signs) plus adventurous Air signs Aquarius and Gemini",
    oppositeSign: "Gemini"
  },
  "Capricorn": {
    element: "Earth",
    planet: "Saturn (the jewel of the solar system with its giant icy rings!)",
    constellationStar: "Deneb Algedi (a bright star system 39 light-years away!)",
    birthstone: "Deep Red Garnet",
    symbolAnimal: "the unstoppable Mountain Goat that climbs the steepest peaks",
    superpowerName: "Mountain-Climber Patience",
    superpowerDetail: "While others give up when a game or skateboard trick gets tough, you keep practicing step by step with a cool smile until you reach the very top!",
    bestFriends: "Taurus and Virgo (your fellow Earth signs) plus Scorpio and Pisces",
    oppositeSign: "Cancer"
  },
  "Aquarius": {
    element: "Air",
    planet: "Uranus (the icy blue planet that spins completely sideways like a rolling bowling ball!)",
    constellationStar: "Sadalsuud (a bright yellow supergiant star!)",
    birthstone: "Purple Amethyst",
    symbolAnimal: "the cosmic Water-Bearer pouring out new ideas",
    superpowerName: "Future-Inventor Originality",
    superpowerDetail: "Your brain works like a science-fiction lab—always dreaming up wild gadgets, original art, and clever ways to help animals and friends!",
    bestFriends: "Gemini and Libra (your fellow Air signs) plus Sagittarius and Aries",
    oppositeSign: "Leo"
  },
  "Pisces": {
    element: "Water",
    planet: "Neptune (the deep-blue ocean planet at the edge of the solar system!)",
    constellationStar: "Eta Piscium (a bright golden star 350 light-years away!)",
    birthstone: "Ocean-Blue Aquamarine",
    symbolAnimal: "two silver fish swimming together",
    superpowerName: "Storybook Imagination & Empathy",
    superpowerDetail: "You can dream up entire movie plots, comic books, and melodies in your head while making every friend around you feel completely welcome!",
    bestFriends: "Cancer and Scorpio (your fellow Water signs) plus Taurus and Capricorn",
    oppositeSign: "Virgo"
  },
  "Aries": {
    element: "Fire",
    planet: "Mars (the rusty red planet home to the solar system's tallest volcanoes!)",
    constellationStar: "Hamal (an orange giant star twice as massive as our Sun!)",
    birthstone: "Sparkling Diamond",
    symbolAnimal: "the fearless Golden Ram",
    superpowerName: "Rocket-Booster Courage",
    superpowerDetail: "You are always the first kid to raise your hand, try a brand-new sport, or lead your friends on a backyard treasure hunt!",
    bestFriends: "Leo and Sagittarius (your fellow Fire signs) plus Gemini and Aquarius",
    oppositeSign: "Libra"
  },
  "Taurus": {
    element: "Earth",
    planet: "Venus (the brightest planet in the evening sky, shining like a lantern!)",
    constellationStar: "Aldebaran (the glowing orange 'eye' of the Bull sitting near the Pleiades star cluster!)",
    birthstone: "Bright Green Emerald",
    symbolAnimal: "the strong, steady Bull",
    superpowerName: "Unbreakable Loyalty & Craftsmanship",
    superpowerDetail: "Once you start building an art project, learning a song, or helping a best friend, you stick with it until it is a total masterpiece!",
    bestFriends: "Virgo and Capricorn (your fellow Earth signs) plus Cancer and Pisces",
    oppositeSign: "Scorpio"
  },
  "Gemini": {
    element: "Air",
    planet: "Mercury (the fastest planet zooming around the Sun!)",
    constellationStar: "Castor and Pollux (the famous twin stars of the northern sky!)",
    birthstone: "Glowing Pearl and Alexandrite",
    symbolAnimal: "the cosmic Twins",
    superpowerName: "Lightning-Fast Curiosity",
    superpowerDetail: "You can learn ten weird science facts, tell a hilarious joke, and invent a new playground game all before lunchtime!",
    bestFriends: "Libra and Aquarius (your fellow Air signs) plus Leo and Aries",
    oppositeSign: "Sagittarius"
  },
  "Cancer": {
    element: "Water",
    planet: "The Moon (Earth's glowing silver companion 240,000 miles away!)",
    constellationStar: "Tarf and the Beehive Star Cluster (a twinkling swarm of 1,000 stars!)",
    birthstone: "Glowing Red Ruby",
    symbolAnimal: "the armored Crab that carries its cozy home everywhere",
    superpowerName: "Photographic Memory & Big Heart",
    superpowerDetail: "You remember every inside joke, favorite snack, and special adventure with your friends, making everyone on your team feel like family!",
    bestFriends: "Scorpio and Pisces (your fellow Water signs) plus Taurus and Virgo",
    oppositeSign: "Capricorn"
  },
  "Leo": {
    element: "Fire",
    planet: "The Sun (the giant nuclear star at the center of our Solar System!)",
    constellationStar: "Regulus (a quadruple star system spinning so fast it is shaped like a pumpkin!)",
    birthstone: "Lime-Green Peridot",
    symbolAnimal: "the brave, golden-maned Lion",
    superpowerName: "Sunshine Leadership & Stage Presence",
    superpowerDetail: "Whether you are directing a living-room play, captaining a soccer team, or cheering up a friend, your warm energy lights up the whole room!",
    bestFriends: "Aries and Sagittarius (your fellow Fire signs) plus Gemini and Libra",
    oppositeSign: "Aquarius"
  },
  "Libra": {
    element: "Air",
    planet: "Venus (the dazzling evening star of art and harmony!)",
    constellationStar: "Zubeneschamali (a star so bright that stargazers say it shines with a faint emerald-green tint!)",
    birthstone: "Rainbow Opal and Pink Tourmaline",
    symbolAnimal: "the golden Scales of Balance",
    superpowerName: "Teamwork Peacemaker & Style",
    superpowerDetail: "You have an awesome eye for art and design, and you always make sure every single kid on the playground gets a fair turn in the game!",
    bestFriends: "Gemini and Aquarius (your fellow Air signs) plus Leo and Sagittarius",
    oppositeSign: "Aries"
  }
};

/**
 * Builds 6 rich, 8-12 sentence sections with 8-12 word two-part subtitles for ANY date,
 * guaranteeing that changing the day or month produces completely new historical events, celebrities, and examples.
 */
export const generateSidebarMagazineArticleJson = (id: string, day: number, month: number): MagazineArticleJSON => {
  const validMonth = Math.min(12, Math.max(1, month || 1));
  const validDay = Math.min(31, Math.max(1, day || 1));
  const monthName = MONTHS[validMonth - 1];
  const dateStr = `${monthName} ${validDay}`;
  const dateKey = `${validMonth}-${validDay}`;
  const zodiac = getZodiacSign(validDay, validMonth);
  const zData = ZODIAC_KID_MAGAZINE_DATA[zodiac] || ZODIAC_KID_MAGAZINE_DATA["Scorpio"];
  const moon = getHistoricalMoonPhase(validDay, validMonth, 2004);

  const exactArchive = EXACT_DATE_ARCHIVE[dateKey];
  const daySpecificEvents = DAY_OF_MONTH_UNIQUE_EVENTS[validDay];

  // Deterministic non-overlapping offset for dates not in EXACT_DATE_ARCHIVE so every day has unique stories
  const dateHash = (validMonth * 37) + (validDay * 7);

  const eventEmojis = ['🌍', '🚀', '⚡', '🏛️', '🌟', '🧭'];
  const celebEmojis = ['🌟', '🎬', '🎭', '🏆', '🚀', '👑'];

  const formatShortSubtitle = (raw: string, emoji: string, fallbackPrefix?: string): string => {
    const clean = raw.replace(/^[^\w\s]+\s*/, '').trim();
    const head = clean.includes(':') ? clean.split(':')[0].trim() : clean;
    if (fallbackPrefix && !head.includes(fallbackPrefix)) {
      const combined = `${emoji} ${fallbackPrefix}: ${head}`;
      if (combined.length <= 36) return combined;
    }
    return `${emoji} ${head}`;
  };

  if (id === 'history-of-birthdays') {
    let sixEvents: Array<{ creative_subtitle: string; content: string }> = [];

    if (exactArchive && exactArchive.events.length >= 6) {
      sixEvents = exactArchive.events.slice(0, 6).map((ev, idx) => ({
        creative_subtitle: formatShortSubtitle(ev.subtitle, eventEmojis[idx % eventEmojis.length], String(ev.year)),
        content: ev.story
      }));
    } else if (daySpecificEvents && daySpecificEvents.length >= 6) {
      sixEvents = daySpecificEvents.slice(0, 6).map((ev, idx) => ({
        creative_subtitle: formatShortSubtitle(ev.title, eventEmojis[idx % eventEmojis.length], String(ev.year)),
        content: `${ev.story} Imagine being a kid on ${dateStr}, ${ev.year}, reading about that incredible moment in the morning newspaper or hearing the announcer's excited voice crackle over the living-room radio! Before smartphones or the internet existed, news of big breakthroughs traveled by telegraph wires and front-page photographs that families clipped out with scissors and pasted into scrapbooks. Teachers even paused regular math and spelling lessons so students could trace the location on the classroom globe and draw pictures of what had happened on ${dateStr}! It showed everyone that when curious inventors, explorers, and communities team up on ${dateStr}, they can build things that seemed completely impossible just a day earlier! Even today, museums around the world still display artifacts from that exact ${dateStr} milestone so new generations of kids can see how history was made.`
      }));
    } else {
      for (let i = 0; i < 6; i++) {
        const vaultItem = DISTINCT_HISTORICAL_STORY_VAULT[(dateHash + i) % DISTINCT_HISTORICAL_STORY_VAULT.length];
        sixEvents.push({
          creative_subtitle: formatShortSubtitle(vaultItem.subtitle, eventEmojis[i % eventEmojis.length]),
          content: `Celebrating ${dateStr} connects your special calendar day to some of the most jaw-dropping true stories of exploration and invention! ${vaultItem.story}`
        });
      }
    }

    return {
      main_title: `Historical Events of ${dateStr}`,
      introduction: `Strap on your time-travel goggles and hold onto your hat, because ${dateStr} is packed with six of the most jaw-dropping real-life adventures, exploding stars, and giant celebrations in world history! Instead of boring textbook dates, this exact square on the calendar reads like an action-packed movie filled with rocket launches, secret caves, and world-changing inventions. Let's fire up the time machine and explore six true stories that actually happened on ${dateStr}!`,
      sections: sixEvents,
      conclusion: `From exploding supernovas in deep space and giant peace parades to legendary highways and space shuttles, ${dateStr} is a calendar date overflowing with real-life wonder! Every single story proves that big curiosity and teamwork can change the whole planet. Next time ${dateStr} rolls around on the calendar, smile knowing your special day is written right into the most exciting pages of history!`
    };
  }

  if (id === 'famous-birthdays' || id === 'famous-birthday-twins') {
    let sixCelebs: Array<{ creative_subtitle: string; content: string }> = [];

    if (exactArchive && exactArchive.celebs.length >= 6) {
      sixCelebs = exactArchive.celebs.slice(0, 6).map((c, idx) => ({
        creative_subtitle: formatShortSubtitle(c.subtitle, celebEmojis[idx % celebEmojis.length]),
        content: c.story
      }));
    } else {
      for (let i = 0; i < 6; i++) {
        const cItem = DISTINCT_CELEB_STORY_VAULT[(dateHash + i) % DISTINCT_CELEB_STORY_VAULT.length];
        sixCelebs.push({
          creative_subtitle: formatShortSubtitle(cItem.subtitle, celebEmojis[i % celebEmojis.length]),
          content: cItem.story
        });
      }
    }

    const isTwins = id === 'famous-birthday-twins';
    return {
      main_title: isTwins ? `Celebrity Twins on ${dateStr}` : `Famous Birthdays on ${dateStr}`,
      introduction: isTwins
        ? `Did you know that when you blow out your birthday candles on ${dateStr}, a whole crew of world-famous movie stars, Disney voice actors, Olympic champions, and sci-fi storytellers are celebrating their birthday on the exact same day? Having a celebrity birthday twin is like sharing a secret cosmic high-five with the heroes of your favorite movies and adventures! Let's roll out the red carpet and meet six extraordinary real-life legends who call ${dateStr} their birthday too!`
        : `Get the confetti cannons ready and roll out the VIP carpet, because ${dateStr} boasts one of the most star-studded birthday guest lists on the entire calendar! From Oscar-winning movie stars who save wild tigers to Disney voice heroes, championship athletes, and brilliant writers, the famous icons born on ${dateStr} know how to turn big dreams into reality. Let's step inside the party and meet six unforgettable people born on ${dateStr}!`,
      sections: sixCelebs,
      conclusion: `From Hollywood movie sets and Olympic stadiums to art studios and wildlife rescues, the six famous icons born on ${dateStr} prove your birthday is packed with superstar talent! Every single one of them started out as a curious kid with a big imagination who refused to give up on what they loved. Whenever you celebrate ${dateStr}, remember that you belong to one of the coolest birthday clubs on Earth!`
    };
  }

  if (id === 'zodiac-magic-guide') {
    const celebNames = exactArchive
      ? exactArchive.celebs.slice(0, 3).map(c => `${c.name} (born ${dateStr}, ${c.birthYear})`).join(', ')
      : `${DISTINCT_CELEB_STORY_VAULT[dateHash % DISTINCT_CELEB_STORY_VAULT.length].name} and ${DISTINCT_CELEB_STORY_VAULT[(dateHash + 1) % DISTINCT_CELEB_STORY_VAULT.length].name}`;

    return {
      main_title: `Horoscope Secrets for ${dateStr}`,
      introduction: `Grab a telescope and open the cosmic treasure chest, because kids and families born on ${dateStr} have one of the most magical star blueprints in the entire galaxy! As a proud ${zodiac} born on day number ${validDay} of ${monthName}, your birthday mixes giant red supergiant stars, secret numerology codes, and museum-sized birthstones. Let's explore six awesome horoscope secrets written in the night sky specifically for ${dateStr}!`,
      sections: [
        {
          creative_subtitle: `🌌 Your ${zodiac} Constellation & Stars`,
          content: `Because you were born on ${dateStr}, the Sun was lined up with the famous zodiac constellation ${zodiac}, making ${zodiac} your official star sign! If you step outside into your backyard with a pair of binoculars to look at the ${zodiac} constellation, its brightest jewel is ${zData.constellationStar} Your sign is also ruled in astrology by ${zData.planet} For thousands of years, ancient sailors steering wooden ships across the ocean and desert travelers used the bright stars of ${zodiac} as a giant glow-in-the-dark map in the sky! Being a ${dateStr} ${zodiac} means you belong to the ${zData.element} element, represented by ${zData.symbolAnimal}. That cosmic combination gives you a brain that loves big questions and a heart that is always ready for adventure! Whenever you look up at the stars on a clear night, remember that your very own birthday constellation is shining right back at you!`
        },
        {
          creative_subtitle: `⚡ Your ${dateStr} Secret Superpower`,
          content: `Every kid born on ${dateStr} comes equipped with a special ${zodiac} superpower that teachers, parents, and friends notice right away: ${zData.superpowerName}! ${zData.superpowerDetail} While other people might get bored halfway through building a giant cardboard fort, coding a computer game, or practicing a tricky skateboard flip, a ${dateStr} ${zodiac} has built-in turbo determination! You don't like half-baked answers—if someone tells you how a volcano erupts or how a magic trick works, you want to see the actual moving parts for yourself! That is why famous ${dateStr} icons like ${celebNames} became world-famous masters of their craft. Even when a school project or sport feels super tricky on the first try, your ${zodiac} brain treats every obstacle like a fun boss level in a video game! Once you decide to master a skill, nothing on Earth can slow you down!`
        },
        {
          creative_subtitle: `🔢 Numerology Magic of Day ${validDay}`,
          content: `Have you ever wondered why a ${zodiac} born on ${dateStr} acts a little different from someone born on another day of ${monthName}? The secret lies in birthday numerology—the ancient puzzle game of numbers—where your exact day number (${validDay}!) adds its own special flavor to your star sign!${validDay === 11 && validMonth === 11 ? " Look closely at November 11 written in numbers: 11/11 is the most famous 'Double Master Number' wish portal on the entire 365-day calendar! All year long, whenever people glance at a digital microwave or bedside clock at 11:11, they close their eyes to make a wish—and you were born on actual 11/11 Day! In numerology, 11 is the number of inventors, storytellers, and big dreamers, so having TWO elevens gives you double the creative lightning!" : ` When numerologists study the number ${validDay}, they call it a 'SparkPlug Number' of quick thinking, storytelling humor, and lucky timing! While your ${zodiac} star sign gives you steady focus, arriving specifically on day ${validDay} adds a playful sense of humor and a love for hands-on experiments.`} Kids born on day ${validDay} are famous for coming up with the funniest jokes at the dinner table and inventing brand-new rules to make backyard games ten times more exciting! It is like having a secret rocket booster attached to your imagination!`
        },
        {
          creative_subtitle: `🧭 Your Built-In Friendship Radar`,
          content: `One of the coolest horoscope secrets about being born on ${dateStr} is what astrologers call your 'Built-In Friend Radar'! Because your ${zodiac} (${zData.element}-sign) intuition is so sharp, you can walk into a brand-new classroom, summer camp, or soccer practice and figure out who the kindest, most trustworthy kids are in about three minutes flat! You have zero interest in bullies or people who brag with fake stories just to show off. Instead, you love hanging out with authentic friends who will laugh at silly jokes, trade Pokémon cards fairly, and help build a treehouse in the backyard! Even better, once someone earns a spot in your ${dateStr} inner circle, you are the most loyal friend on the planet. If a teammate drops their lunch tray or gets picked last in gym class, a ${dateStr} ${zodiac} is always the first person to walk over, share a snack, and make them feel like a champion! Your friends know that when you give your word or pinky-promise a secret, it is locked in a titanium vault forever!`
        },
        {
          creative_subtitle: `💎 Your Birthstone & Power Colors`,
          content: `Every birthday on the calendar guards a real geological treasure buried deep inside the Earth, and being born on ${dateStr} gives you ${zData.birthstone} as your official birthstone! Ancient kings, queens, and explorers wore ${zData.birthstone} on their belts and crowns because they believed the sparkling crystal held captured starlight that kept travelers brave during dark storms! Did you know that the largest cut yellow topaz gemstone in the world—the 'American Golden Topaz' sitting inside the Smithsonian National Museum of Natural History in Washington, D.C.—has 172 polished facets and weighs a whopping 22,892 carats? That single sparkling crystal weighs more than ten pounds—as heavy as a bowling ball or a newborn baby! In nature, these crystals grow inside underground pockets of volcanic rock called 'pegmatites,' where super-hot water and minerals cool down over millions of years to form giant six-sided prisms. Along with your birthstone, your lucky ${dateStr} power colors are cosmic crimson, royal sapphire blue, and golden sunshine yellow! Keeping a cool polished rock or crystal on your desk is an awesome way to celebrate your Earth-and-sky connection!`
        },
        {
          creative_subtitle: `🌙 Lunar Glow & Five Ways to Shine`,
          content: `Did you know that the Moon's glow also plays a giant part in your ${dateStr} astrological blueprint? Because the Moon takes 29.5 days to orbit around Earth—changing shape from a thin silver banana-crescent to a giant glowing pizza-pie Full Moon!—astrologers say the lunar cycle tunes your creative battery! Whenever you see a bright Gibbous or Full Moon shining outside your bedroom window, your ${dateStr} imagination goes into overdrive with cool story ideas and big dreams! Want five fun ways to use your ${dateStr} ${zodiac} stardust this year? First, start a 'Secret Inventor Notebook' to sketch your wildest game ideas, comics, and goals! Second, team up with friends who share your love for hands-on building and outdoor quests. Third, whenever a puzzle feels frustrating, take a ten-minute bike ride or listen to your favorite song to reset your brain! Fourth, speak up and share your funny ideas in class instead of keeping them hidden! And fifth, every year on ${dateStr}, look up at the night sky and make your biggest, boldest birthday wish!`
        }
      ],
      conclusion: `From the giant glowing star ${zData.constellationStar.split(' ')[0]} in the ${zodiac} constellation to your 22,000-carat birthstone treasure and day-number ${validDay} magic, ${dateStr} has an out-of-this-world horoscope! You were born with a detective's sharp eyes, an inventor's imagination, and a best friend's loyal heart. Keep exploring, keep laughing, and let your ${dateStr} starlight shine all year long!`
    };
  }

  // 'birthday-love-compatibility'
  const celebFriendExample = exactArchive && exactArchive.celebs.length >= 2
    ? `${exactArchive.celebs[0].name} and ${exactArchive.celebs[1].name}`
    : "Leonardo DiCaprio, Stanley Tucci, and Jesse Owens";

  return {
    main_title: `Birthday Love Compatibility`,
    introduction: `Have you ever wondered why you click with certain friends in five seconds flat—finishing each other's sentences and laughing at the exact same jokes—while other people feel like they are speaking a different language? Being born on ${dateStr} as a proud ${zodiac} gives you a super-loyal, big-hearted friendship style that turns ordinary afternoons into epic adventures! Let's open the ultimate ${dateStr} star-compatibility playbook and discover which zodiac signs make your dream squad!`,
    sections: [
      {
        creative_subtitle: `💖 Why ${dateStr} Friends Are Pure Gold`,
        content: `If there were an Olympic gold medal for being the most loyal, fun-loving teammate on the block, someone born on ${dateStr} would win first place on the podium! Because you are a ${zodiac} (${zData.element} element), you don't care about fake popularity contests—you care about real adventures, honest laughs, and standing by your friends through thick and thin! You are the friend who notices when someone got a new haircut, remembers everyone's favorite ice-cream flavor, and never leaves a teammate behind during a game of tag or soccer. When you invite a friend over to your house, you share your best controllers, your coolest toys, and your biggest snack stash without thinking twice! Just like famous ${dateStr} stars ${celebFriendExample}, your magnetic energy draws people toward you because you are 100% genuine. Once someone earns your trust, they have a ride-or-die best friend who will cheer for their victories forever! That warm, protective heart is what makes ${dateStr} compatibility so magical!`
      },
      {
        creative_subtitle: `✨ Instant Magic With ${zData.element} Signs`,
        content: `When you look at the giant twelve-slice pizza wheel of the zodiac, your fastest 'instant besties' are the signs that share your exact ${zData.element} element! In astrology, the twelve signs are divided into four teams of three: Water signs (Scorpio, Cancer, Pisces), Earth signs (Virgo, Taurus, Capricorn), Fire signs (Aries, Leo, Sagittarius), and Air signs (Gemini, Libra, Aquarius)! Whenever you hang out with a fellow ${zData.element} sign, it feels like both of you have walkie-talkies tuned to the exact same secret radio channel! You don't even have to explain why something is funny—one look across the classroom and both of you start giggling at the exact same second! If you are building a science-fair volcano, putting on a backyard play, or trading cards at lunch, your ${zData.element}-sign teammates naturally agree on the rules without arguing. One friend brings the wild creative blueprint, the second brings the snacks and music, and your ${dateStr} ${zodiac} brain brings the master strategy to make it work! Together, your element trio is practically unstoppable!`
      },
      {
        creative_subtitle: `🌊 Earth & Water Power Partners`,
        content: `Think about how nature works outdoors: when cool, refreshing Water teams up with rich, sturdy Earth, giant green forests and colorful flower gardens grow! That exact same nature magic happens in zodiac compatibility when Water signs (Scorpio, Cancer, Pisces) and Earth signs (Virgo, Taurus, Capricorn) team up with a ${dateStr} ${zodiac}! These signs love doing real, hands-on activities together instead of just sitting around staring at a wall. A Virgo or Capricorn friend will happily spend three hours helping you build a ten-foot Lego skyscraper or crack a secret detective code in a book! Meanwhile, a Cancer or Taurus friend brings the coziest energy on the planet—making sure the blanket fort has plenty of pillows, hot cocoa, and popcorn for movie night! And Pisces friends bring wild storybook ideas that turn a boring rainy Saturday into an indoor pirate treasure hunt! When you mix ${dateStr} determination with Earth-and-Water imagination, every single weekend feels like summer camp!`
      },
      {
        creative_subtitle: `🧲 Your Zodiac Opposite: ${zData.oppositeSign}`,
        content: `Here is one of the coolest secrets in the entire astrology compatibility book: if you draw a straight line from ${zodiac} directly across the center of the zodiac wheel, you land on your 'Opposite Sign'—which for you is ${zData.oppositeSign}! At first, you might think an opposite sign would be completely different from you, like hot fudge and cold vanilla ice cream! But just like hot fudge and cold ice cream make the world's most delicious sundae when you put them in the same bowl, ${zodiac} and ${zData.oppositeSign} act like two halves of a magnet that snap together! Where a ${dateStr} ${zodiac} might zoom in closely on solving a tricky mystery or perfecting a detail, ${zData.oppositeSign} zooms out to bring a totally different superpower that balances the team! In school projects, sports doubles, or family adventures, having a ${zData.oppositeSign} partner means the two of you have zero blind spots—what one person misses, the other person catches right away! Many of the most famous creative partnerships in movie and music history are zodiac-opposite duos who learned to high-five each other's different strengths!`
      },
      {
        creative_subtitle: `🔥 High-Voltage Fire & Air Squads`,
        content: `What happens when a ${dateStr} ${zodiac} teams up with energetic Fire signs (Aries, Leo, Sagittarius) or fast-talking Air signs (Gemini, Libra, Aquarius)? Get ready for non-stop action, backyard obstacle courses, and laughing until your stomach hurts! Aries and Sagittarius friends are human rocket ships who will dare you to race bicycles to the end of the street, climb the tallest climbing wall, or explore a new park trail! Leo friends bring giant theatrical sunshine—they love dressing up in costumes, making home movies, and cheering your name like a stadium announcer whenever you score a goal! Meanwhile, Gemini, Libra, and Aquarius friends have brains stuffed with weird animal trivia, space facts, and board-game strategies that keep every conversation bouncing like a ping-pong ball! The only secret trick to remember with Fire and Air buddies is that they move fast and sometimes change games every ten minutes—so take turns being the team captain and let everyone steer the adventure!`
      },
      {
        creative_subtitle: `👑 Five Golden Rules of Friendship`,
        content: `Want to know the ultimate cosmic recipe for keeping your ${dateStr} ${zodiac} friendships and family bonds super strong all year long? Rule #1: Ditch the 'Mind-Reading Game'—because your ${zodiac} brain is so observant, you sometimes expect friends to guess why you are quiet, so always use clear, friendly words to say what you need! Rule #2: Share the captain's hat—you have awesome ideas for how a game or project should go, and letting your best friend pick their silly way half the time doubles the fun! Rule #3: Forgive small oopsies fast—if someone accidentally steps on your drawing or forgets a turn, laugh it off together instead of keeping score! Rule #4: Plan active 'Quest Hangouts' like baking giant chocolate-chip cookies, building model rockets, or solving riddles, because ${dateStr} kids bond best when they are creating something side-by-side! And Rule #5: Keep cheering loudly for your friends' weird and wonderful talents, because your ${dateStr} kindness makes everyone around you shine brighter!`
      }
    ],
    conclusion: `Whether you are solving mysteries with a Scorpio or Virgo, dreaming up stories with a Pisces or Cancer, or racing down the block with an Aries or Leo, your ${dateStr} ${zodiac} heart was built for amazing friendships! You bring rare loyalty, quick humor, and 100% effort to every team you join. Keep being your kind, curious, and authentic self—because anyone who gets to be friends with a ${dateStr} original has hit the cosmic jackpot!`
  };
};

export const getEditorialArticle = (id: string, day: number, month: number): EditorialTemplate | null => {
  const template = editorialTemplates[id];
  if (!template) return null;

  const magJson = generateSidebarMagazineArticleJson(id, day, month);

  const iconPalette: Array<EditorialSection['iconType']> = ['globe', 'sparkles', 'music', 'zap', 'star', 'users'];
  const colorPalette = ['text-blue-600', 'text-emerald-600', 'text-pink-600', 'text-amber-500', 'text-cyan-500', 'text-purple-600'];

  const dynamicSections: EditorialSection[] = magJson.sections.map((sec, idx) => ({
    title: sec.creative_subtitle,
    content: `<p>${sec.content}</p>`,
    iconType: iconPalette[idx % iconPalette.length],
    colorClass: colorPalette[idx % colorPalette.length]
  }));

  return {
    ...template,
    title: magJson.main_title,
    intro: magJson.introduction,
    sections: dynamicSections,
    conclusionTitle: template.conclusionTitle,
    conclusionContent: magJson.conclusion
  };
};
