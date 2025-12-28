
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
    title: "How Old Would You Be on Mars? The Ultimate Guide to Space Birthdays",
    excerpt: "Discover the cosmic secrets behind your age and how a year on Mars or Jupiter would completely change your birthday celebrations.",
    category: "Science & Fun",
    readTime: "8 min",
    imageGradient: "from-indigo-900 to-purple-600",
    date: "May 22, 2024",
    imagePrompt: "A high-quality 3D Disney-style illustration of a happy child astronaut holding a glowing birthday cake while floating near Saturn's rings, vibrant cosmic nebula, stars, cinematic lighting, ultra-detailed, 4K resolution.",
    content: `
      <p>Welcome, young space explorers! Have you ever looked up at the star-studded sky and wondered: do kids in other galaxies celebrate their birthdays? And do years pass the same way there as they do on our beautiful planet, Earth? Today, we're blasting off in our imaginary spaceship to discover amazing facts that will completely change how you see your age!</p>
      
      <h2>How Does a Planet Count a "Year"?</h2>
      <p>First, we need to understand a little secret. A year on Earth is the time it takes for our planet to make one full orbit around the Sun, which is 365 days. But imagine that every planet in our solar system runs around the Sun at a different speed! Some are super fast like race champions, and some are very slow like giant turtles.</p>
      
      <h3>1. Mercury: Birthday Parties Every Few Months!</h3>
      <p>Mercury is the closest planet to the Sun, and because it's so close, it runs incredibly fast! A year on Mercury takes only 88 days. Do you know what that means? If you lived there, you'd celebrate your birthday about once every 3 months. Imagine all the presents you'd get! If you are 10 years old on Earth, you'd be over 40 years old on Mercury!</p>
      
      <h3>2. Mars: The Red Planet and Long Years</h3>
      <p>Mars is our dear neighbor, but it's a bit farther from the Sun than Earth. A year there takes 687 days, which is almost twice as long as an Earth year. If you were born on Mars, you'd have to wait two Earth years for just one birthday cake. But the advantage is that the seasons last a long time, so you'd have a very long summer to play!</p>
    `
  },
  {
    id: "birthday-animals",
    title: "The Magical Animal Kingdom: Discover Your Secret Forest Friend Born in Your Month!",
    excerpt: "Ever wondered why you love swimming like a dolphin or are as quiet as an owl? Discover the amazing link between your birth month and animal traits.",
    category: "Animal World",
    readTime: "12 min",
    imageGradient: "from-green-500 to-emerald-800",
    date: "June 1, 2024",
    imagePrompt: "A magical glowing forest scene with a majestic lion, a wise owl, and a playful dolphin all looking at a small child sitting in the grass, magical fairy dust, soft sunlight, highly detailed 3D digital art, Pixar style, 4K.",
    content: `
      <p>Welcome to the heart of the enchanted forest! Today, we won't talk about dry numbers or dates, but we'll listen to the whisper of the trees and the sounds of the animals. Did you know that nature chooses a secret friend from the animal kingdom for every child born, sharing some of their amazing traits? Let's find out together who your friend is!</p>
      
      <h2>Winter Friends: Strength and Wisdom in the Cold</h2>
      <p>If you were born in the cold winter months (December, January, February), you have a strong spirit that can face challenges with patience and determination.</p>
      
      <h3>The Polar Bear (Born in December & January)</h3>
      <p>The polar bear is the king of the snow. It's an animal that loves its family very much and has tremendous strength, but it's also very calm. If this is your friend, you are likely someone who loves to help others and has great courage that shows when needed.</p>
    `
  },
  {
    id: "ultimate-party-guide",
    title: "Secrets of the Legendary Party: How to Plan a Birthday Your Friends Will Never Forget",
    excerpt: "A comprehensive and innovative guide for kids to organize a party full of adventures, secret games, and magical moments, far from boredom.",
    category: "Tips & Parties",
    readTime: "8 min",
    imageGradient: "from-yellow-400 to-red-500",
    date: "July 15, 2024",
    imagePrompt: "A magical birthday party scene in a backyard with glowing fairy lights, a giant treasure chest, colorful balloons, happy children wearing masks, professional photography style, warm and joyful, 4K.",
    content: `
      <p>Hello, party champion! Is your birthday approaching? Are you tired of traditional parties that just have cake and singing? Today, I will reveal the "Book of Secrets" to organize a legendary party that your friends will talk about at school for months!</p>
      
      <h2>Step One: Choose the "Magical World" for Your Party</h2>
      <p>Instead of just a "party," make it an "adventure." Choose a theme you love. For example: "The World of Pirates," "The Mad Scientists' Lab," or "The School of Wizards." When your friends arrive, give each one a simple item that makes them part of this world, like a paper hat or colorful glasses.</p>
      
      <h2>Step Two: Unforgettable Games</h2>
      <p>The secret to a successful party is interactive games. Here are the top 3 ideas:</p>
      
      <h3>1. The Secret Agent Mission (Treasure Hunt)</h3>
      <p>Don't just give gifts to your friends! Create small riddles for them. "Go to the place where roses grow to find the next message." This will make them feel excited and smart as they search for their little treasure.</p>
    `
  }
];
