/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Profile, Story, BlogPost, FAQItem, Plan } from './types';

export const MEMBERSHIP_PLANS: Plan[] = [
  {
    id: 'Free',
    name: 'Free Starter',
    priceMonthly: 0,
    priceAnnually: 0,
    features: [
      'Create a detailed profile',
      'Upload up to 3 photos',
      'Browse limited daily profiles',
      'Basic matchmaking algorithm',
      'Receive up to 5 messages/day',
    ],
    popular: false,
    color: 'from-slate-500 to-slate-700',
    borderColor: 'border-slate-200 dark:border-slate-800',
  },
  {
    id: 'Silver',
    name: 'Silver Connect',
    priceMonthly: 19.99,
    priceAnnually: 14.99,
    features: [
      'Everything in Free',
      'Unlimited profile browsing',
      'Unlimited message exchange',
      'Advanced search filters (interests, habits)',
      'See who visited your profile',
      'Upload up to 10 photos',
      'Silver badge icon',
    ],
    popular: false,
    color: 'from-gray-400 to-slate-600',
    borderColor: 'border-gray-300 dark:border-slate-700',
  },
  {
    id: 'Gold',
    name: 'Gold Premium',
    priceMonthly: 39.99,
    priceAnnually: 29.99,
    features: [
      'Everything in Silver',
      'Priority profile placement (2x views)',
      'High-definition video calling',
      'In-depth Compatibility Reports',
      'Read receipts for sent messages',
      'Unlimited photo gallery space',
      'Premium Gold badge icon',
      'No advertisements',
    ],
    popular: true,
    color: 'from-amber-400 via-amber-500 to-amber-600',
    borderColor: 'border-amber-400 dark:border-amber-500',
  },
  {
    id: 'Platinum',
    name: 'Platinum Orbit',
    priceMonthly: 79.99,
    priceAnnually: 59.99,
    features: [
      'Everything in Gold',
      'Personal Matchmaking Assistance (1-on-1)',
      'VIP concierge support 24/7',
      'Exclusive invitations to VIP singles events',
      'Official verification checkmark badge',
      'Highest search & swipe ranking (5x views)',
      'Incognito mode (browse privately)',
      'Rewind accidental left-swipes',
    ],
    popular: false,
    color: 'from-indigo-500 via-purple-600 to-pink-600',
    borderColor: 'border-purple-500 dark:border-purple-400',
  },
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    age: 28,
    location: 'Pasadena, CA',
    gender: 'female',
    interestedIn: 'male',
    bio: 'Art historian and weekend mountain climber. I appreciate a good espresso, vintage novels, and somebody who can make me laugh while attempting to pitch a tent in the rain.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Museum Curator',
    education: 'M.A. in Fine Arts, Stanford University',
    membership: 'Gold',
    matchScore: 94,
    interests: ['Art History', 'Climbing', 'Espresso', 'Literature', 'Stargazing'],
    verified: true,
    online: true,
    tagline: 'Seeking a partner for art galleries and alpine trails.'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    age: 32,
    location: 'Los Angeles, CA',
    gender: 'male',
    interestedIn: 'female',
    bio: 'Software engineer by day, amateur chef by night. When I am not building web apps, you can find me experimenting with sourdough starter or exploring the coastal highways on my motorcycle.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'DevOps Architect',
    education: 'B.S. in Computer Science, UCLA',
    membership: 'Platinum',
    matchScore: 89,
    interests: ['Cooking', 'Motorcycles', 'Coding', 'Sourdough', 'Roadtrips'],
    verified: true,
    online: true,
    tagline: 'Life is better with a bit of code and a lot of spice.'
  },
  {
    id: '3',
    name: 'Clara Jenkins',
    age: 26,
    location: 'Santa Monica, CA',
    gender: 'female',
    interestedIn: 'everyone',
    bio: 'Environmentalist, beach volleyball player, and proud plant parent. Looking for someone genuine to explore farmers markets, organic cafes, and catch sunsets along the Pacific Coast.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Sustainability Consultant',
    education: 'B.S. in Ecology, UC Berkeley',
    membership: 'Silver',
    matchScore: 88,
    interests: ['Beach Volleyball', 'Sustainability', 'Gardening', 'Yoga', 'Sunsets'],
    verified: true,
    online: false,
    tagline: 'Let us find joy in the simple, sustainable moments.'
  },
  {
    id: '4',
    name: 'David Chen',
    age: 35,
    location: 'Irvine, CA',
    gender: 'male',
    interestedIn: 'male',
    bio: 'Architect, jazz enthusiast, and vinyl record collector. I live in a house full of mid-century furniture and mid-tempo melodies. Seeking someone down-to-earth for weekend coffee dates and concert halls.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Lead Architect',
    education: 'M.Arch, Columbia University',
    membership: 'Gold',
    matchScore: 91,
    interests: ['Architecture', 'Jazz', 'Vinyl Records', 'Coffee', 'Design'],
    verified: true,
    online: false,
    tagline: 'Drafting plans for a meaningful future.'
  },
  {
    id: '5',
    name: 'Sophie Dubois',
    age: 31,
    location: 'Glendale, CA',
    gender: 'female',
    interestedIn: 'male',
    bio: 'French expat and landscape photographer. I speak three languages but my favorite is the language of visual scenery. I love exploring national parks, trying spicy street food, and late-night philosophical chats.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Freelance Photographer',
    education: 'B.F.A in Photography, Paris College of Art',
    membership: 'Platinum',
    matchScore: 95,
    interests: ['Photography', 'Travel', 'Hiking', 'Languages', 'Street Food'],
    verified: true,
    online: true,
    tagline: 'Capturing light, hoping to capture a heart.'
  },
  {
    id: '6',
    name: 'Julian Hayes',
    age: 29,
    location: 'Long Beach, CA',
    gender: 'male',
    interestedIn: 'everyone',
    bio: 'Sailor, marine biology researcher, and classic rock lover. Spend half my time at sea and the other half playing guitar or searching for the ultimate fish taco. Looking for an adventurous partner.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Marine Biologist',
    education: 'Ph.D in Marine Sciences, Scripps Institution',
    membership: 'Silver',
    matchScore: 84,
    interests: ['Sailing', 'Oceanography', 'Classic Rock', 'Guitar', 'Surfing'],
    verified: false,
    online: true,
    tagline: 'Always drawn to the ocean... and maybe to you.'
  },
  {
    id: '7',
    name: 'Maya Lin',
    age: 27,
    location: 'Anaheim, CA',
    gender: 'female',
    interestedIn: 'female',
    bio: 'Boutique owner, tea lover, and dog mother. I love setting up beautiful window displays, searching for unique vintage jewelry, and strolling through neighborhood parks with my golden retriever, Barnaby.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Fashion Retailer',
    education: 'B.A. in Business Admin, Cal State Fullerton',
    membership: 'Free',
    matchScore: 86,
    interests: ['Fashion', 'Dogs', 'Tea Tasting', 'Antiques', 'Local Parks'],
    verified: true,
    online: false,
    tagline: 'Life is custom made. Let us design it together.'
  },
  {
    id: '8',
    name: 'Adrian Sterling',
    age: 33,
    location: 'Beverly Hills, CA',
    gender: 'male',
    interestedIn: 'everyone',
    bio: 'Wine importer, classical pianist, and world traveler. I enjoy high cultural experiences, from opera nights to tasting aged wines in Tuscany. Searching for someone sophisticated to share the finer details of life.',
    avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=400&h=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    occupation: 'Luxury Wine Distributor',
    education: 'M.B.A., Oxford University',
    membership: 'Platinum',
    matchScore: 92,
    interests: ['Wine Tasting', 'Classical Piano', 'Opera', 'Fine Dining', 'International Travel'],
    verified: true,
    online: true,
    tagline: 'Pouring hearts and uncorking moments.'
  }
];

export const SUCCESS_STORIES: Story[] = [
  {
    id: '1',
    names: 'Sophia & Liam',
    location: 'Laguna Beach, CA',
    story: 'We both joined Planet Singles Gold tier with some skepticism, but after our very first matching suggestions, we were struck by our deep, mutual love for ocean conservation and hiking. We talked for three weeks on the video call feature before meeting at Laguna Beach. Three years later, we got married on that very same beach. Planet Singles made our orbits match perfectly!',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&h=400&q=80',
    date: 'Married October 2025',
    durationBeforeMeeting: '3 Weeks'
  },
  {
    id: '2',
    names: 'Robert & Kenji',
    location: 'Silver Lake, LA',
    story: 'Robert was on Silver and I was on Platinum. Thanks to the advanced filters, we connected over our uncommon hobby of modular analog synthesizers and sourdough baking. We would send voice recordings of our synth beats. Our first date was a mutual bakery crawl in Los Angeles. We recently bought our first apartment together and have a dedicated music studio!',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&h=400&q=80',
    date: 'Together 2.5 Years',
    durationBeforeMeeting: '5 Days'
  },
  {
    id: '3',
    names: 'Clara & Thomas',
    location: 'Santa Barbara, CA',
    story: 'Thomas used the Platinum 1-on-1 matchmaking assistant service. The matchmaker manually paired him with me after realizing our intellectual ambitions and life goals matched in ways automated profiles could never describe. From our very first coffee date in Santa Barbara, we knew we had found our match. We are now happily engaged!',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&h=400&q=80',
    date: 'Engaged February 2026',
    durationBeforeMeeting: 'Introduced by Matchmaker'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'First Date Green Flags: Spotting Genuine Connection Early',
    excerpt: 'Dating is exciting but can feel overwhelming. Learn how to identify positive signs of emotional intelligence, respect, and mutual chemistry on a first date.',
    content: 'It is easy to focus on red flags when entering the modern dating pool. However, keeping an eye out for "green flags"—signals of a healthy, mature, and promising potential partner—is just as crucial. Here are five of the strongest positive indicators: \n\n1. **Active and Generous Listening**: A great date is an equal exchange. If they listen attentively, ask engaging follow-up questions, and make eye contact, they respect your presence. \n\n2. **Consistency and Promptness**: If they arrive on time, respect your schedule, and follow up shortly after the date, it signals clarity of intent. \n\n3. **Kindness to Service Staff**: Watch how they treat waiters, valets, and bartenders. A person\'s true character shines through in how they interact with those who serve them. \n\n4. **Respecting Boundaries**: If you state a preference—like wanting to keep the first date short, or declining a certain beverage—they should respect it immediately without debate. \n\n5. **Emotional Openness**: They speak kindly about people in their past, display a healthy relationship with friends, and show secure attachment signs.',
    category: 'Dating Advice',
    date: 'June 18, 2026',
    author: 'Dr. Rebecca Vance',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&h=400&q=80',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'How Tiered Matchmaking Outperforms Simple Swipe Apps',
    excerpt: 'Why superficial swipe mechanics lead to fatigue, and how tiered memberships and specialized algorithms create lasting relationship success.',
    content: 'In the last decade, mobile dating was dominated by rapid, superficial swiping. While it created high engagement, it also led to severe "dating fatigue." \n\nAt Planet Singles, we believe that tiered matchmaking creates a psychological commitment to quality. When members select tailored plans, they invest in their own intentions. Unlimited messaging prevents conversations from dying prematurely. Enhanced profile verification prevents catfishing. Personalized matchmakers bridges the gap between digital data and intuitive human touch.',
    category: 'Industry Insights',
    date: 'May 29, 2026',
    author: 'Daniel Mills',
    image: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=600&h=400&q=80',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Crafting the Perfect Bio: Authenticity Over Attraction',
    excerpt: 'Skip the generic cliches. Discover how to write a profile biography that acts as a beacon for high-quality, compatible matches.',
    content: 'The secret to a great bio is specificity. Instead of writing "I love hiking and traveling," write "I love scrambling up Echo Mountain at sunrise and browsing antique bookshops in Paris." Specificity invites unique, high-quality responses. Avoid trying to appeal to everyone; your goal is to appeal to the right one. List your real passions, be honest about your intentions, and include a warm conversation starter at the end.',
    category: 'Profile Tips',
    date: 'April 14, 2026',
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&h=400&q=80',
    readTime: '6 min read'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How does Planet Singles verify member profiles?',
    answer: 'We employ a robust multi-layered verification system. Platinum and Gold members receive automatic manual verification where they submit a real-time photo pose compared by our security team. Look for the colorful Verification checkmark badges on profiles for guaranteed authenticity.',
    category: 'safety'
  },
  {
    id: '2',
    question: 'Can I change or cancel my membership plan?',
    answer: 'Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly through your Membership tab in your Dashboard. If you cancel, your premium benefits remain active until the end of your billing cycle.',
    category: 'membership'
  },
  {
    id: '3',
    question: 'What is the Gold compatibility report?',
    answer: 'Our proprietary matching engine evaluates 24 psychological traits across core pillars: communication style, lifestyle habits, intellectual values, and romantic expectations. Gold and Platinum members receive an interactive dynamic breakdown of these metrics directly on matched profiles.',
    category: 'general'
  },
  {
    id: '4',
    question: 'Is my personal contact information kept private?',
    answer: 'Planet Singles strictly protects your personal privacy. We never share your phone number, email address, or specific location coordinates with other users. All initial communication, including video calling, happens safely within our secure platform.',
    category: 'safety'
  },
  {
    id: '5',
    question: 'How does the Platinum matchmaking service work?',
    answer: 'Our Platinum membership includes access to certified, dedicated relationship coaches. Once you upgrade, a matchmaker schedules a 30-minute video session to understand your unique personality, then manually suggests curated profiles and facilitates safe introductions.',
    category: 'membership'
  },
  {
    id: '6',
    question: 'Does the application support location-based searching?',
    answer: 'Yes! We use secure browser geolocation permissions to show matches within your preferred range (from 5 to 100 miles) around your local area. You can adjust this filter anytime in your Explore dashboard.',
    category: 'technical'
  }
];

export const MOCK_CHATS: Record<string, string[]> = {
  '1': [
    'Hey there! I saw you love hiking and vintage books. Have you ever hiked up Echo Mountain?',
    'Hi! Yes, absolutely! It is one of my favorite local spots. I love looking at the historic ruins at the top! Have you been?',
    'I have! The view from the top is unbeatable. Next time we should attempt it together and share some espresso.',
    'That sounds like a wonderful adventure! I am always down for high-altitude coffee. ☕️'
  ],
  '2': [
    'Your sourdough looks amazing! What flour blend do you use?',
    'Thanks! I use a 80% organic white wheat and 20% dark rye blend. Gives it a great nutty flavor. Are you into baking too?',
    'Yes, I just started a wild culture starter last month! Still trying to get that perfect open crumb.',
    'It takes time and patience! I would love to share some of my active starter with you sometime.'
  ],
  '5': [
    'Hi Sophie! Your photography is stunning. What is your favorite national park to shoot?',
    'Merci! I absolutely adore Yosemite during the winter. The snow on the granite is pure magic. Do you enjoy travel photography?',
    'I do! I try to capture moments on my roadtrips, though my smartphone is my main camera haha.',
    'The best camera is the one you have with you! I would love to show you some of my secret photo spots around the coast.'
  ]
};

// Preset reactive responses when user sends a message
export const SIMULATED_RESPONSES: string[] = [
  "That is so interesting! Tell me more about it. 😊",
  "I completely agree! It is rare to find someone who shares that perspective.",
  "Haha, you have a great sense of humor! We should definitely talk about this over coffee.",
  "That sounds like an amazing plan. I am free this Thursday evening if you want to meet up?",
  "I was literally just thinking about that! Are we reading each other's minds already? 💫",
  "That makes so much sense. I love how passionate you are about your hobbies!",
  "What a beautiful way to put it! I am really enjoying getting to know you."
];
