/**
 * Demo Content Files for Each Category
 * Sample media files for demonstration purposes
 */

export interface DemoContent {
  id: string;
  title: string;
  category: 'video' | 'audio' | 'learn' | 'entertainment';
  description: string;
  pricePerMinute: number;
  duration: number; // in seconds
  thumbnail?: string;
  mediaUrl?: string;
  type: 'video' | 'audio' | 'course' | 'game';
}

export const demoContent: Record<string, DemoContent> = {
  // Video Platforms
  netflix: {
    id: 'netflix-demo',
    title: 'Netflix Demo - Sample Movie Trailer',
    category: 'video',
    description: 'Watch a sample movie trailer from Netflix',
    pricePerMinute: 0.02,
    duration: 120,
    type: 'video',
    mediaUrl: '/demo-media/video/your-video.mp4',
  },
  youtube: {
    id: 'youtube-demo',
    title: 'YouTube Demo - Sample Video',
    category: 'video',
    description: 'Watch a sample video from YouTube',
    pricePerMinute: 0.015,
    duration: 180,
    type: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  disney: {
    id: 'disney-demo',
    title: 'Disney+ Demo - Sample Content',
    category: 'video',
    description: 'Watch a sample content from Disney+',
    pricePerMinute: 0.025,
    duration: 150,
    type: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  'amazon-prime': {
    id: 'amazon-prime-demo',
    title: 'Amazon Prime Video Demo',
    category: 'video',
    description: 'Watch a sample content from Amazon Prime Video',
    pricePerMinute: 0.02,
    duration: 200,
    type: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  
  // Audio Platforms
  spotify: {
    id: 'spotify-demo',
    title: 'Spotify Demo - Sample Music',
    category: 'audio',
    description: 'Listen to a sample music track from Spotify',
    pricePerMinute: 0.01,
    duration: 240,
    type: 'audio',
    mediaUrl: '/demo-media/audio/your-audio.mp3',
  },
  audible: {
    id: 'audible-demo',
    title: 'Audible Demo - Sample Audiobook',
    category: 'audio',
    description: 'Listen to a sample audiobook from Audible',
    pricePerMinute: 0.015,
    duration: 300,
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  'apple-music': {
    id: 'apple-music-demo',
    title: 'Apple Music Demo - Sample Track',
    category: 'audio',
    description: 'Listen to a sample track from Apple Music',
    pricePerMinute: 0.01,
    duration: 210,
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  soundcloud: {
    id: 'soundcloud-demo',
    title: 'SoundCloud Demo - Sample Track',
    category: 'audio',
    description: 'Listen to a sample track from SoundCloud',
    pricePerMinute: 0.008,
    duration: 180,
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  
  // Learning Platforms
  coursera: {
    id: 'coursera-demo',
    title: 'Coursera Demo - Sample Course',
    category: 'learn',
    description: 'Watch a sample course video from Coursera',
    pricePerMinute: 0.03,
    duration: 600,
    type: 'course',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  udemy: {
    id: 'udemy-demo',
    title: 'Udemy Demo - Sample Tutorial',
    category: 'learn',
    description: 'Watch a sample tutorial from Udemy',
    pricePerMinute: 0.025,
    duration: 450,
    type: 'course',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  'khan-academy': {
    id: 'khan-academy-demo',
    title: 'Khan Academy Demo - Sample Lesson',
    category: 'learn',
    description: 'Watch a sample lesson from Khan Academy',
    pricePerMinute: 0.02,
    duration: 360,
    type: 'course',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  skillshare: {
    id: 'skillshare-demo',
    title: 'Skillshare Demo - Sample Class',
    category: 'learn',
    description: 'Watch a sample class from Skillshare',
    pricePerMinute: 0.022,
    duration: 480,
    type: 'course',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  
  // Entertainment & Games
  steam: {
    id: 'steam-demo',
    title: 'Steam Demo - Game Trailer',
    category: 'entertainment',
    description: 'Watch a game trailer from Steam',
    pricePerMinute: 0.015,
    duration: 90,
    type: 'game',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  'epic-games': {
    id: 'epic-games-demo',
    title: 'Epic Games Demo - Game Preview',
    category: 'entertainment',
    description: 'Watch a game preview from Epic Games',
    pricePerMinute: 0.015,
    duration: 120,
    type: 'game',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
  twitch: {
    id: 'twitch-demo',
    title: 'Twitch Demo - Sample Stream',
    category: 'entertainment',
    description: 'Watch a sample stream from Twitch',
    pricePerMinute: 0.01,
    duration: 300,
    type: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  },
  roblox: {
    id: 'roblox-demo',
    title: 'Roblox Demo - Game Showcase',
    category: 'entertainment',
    description: 'Watch a game showcase from Roblox',
    pricePerMinute: 0.012,
    duration: 150,
    type: 'game',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  },
};

/**
 * Get demo content by platform ID
 */
export function getDemoContent(platformId: string): DemoContent | null {
  return demoContent[platformId] || null;
}

/**
 * Get default demo content for a category
 */
export function getDefaultDemoContent(category: 'video' | 'audio' | 'learn' | 'entertainment'): DemoContent | null {
  const categoryMap: Record<string, string> = {
    video: 'netflix',
    audio: 'spotify',
    learn: 'coursera',
    entertainment: 'steam',
  };
  
  const platformId = categoryMap[category];
  return platformId ? demoContent[platformId] : null;
}

