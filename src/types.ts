/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'plans'
  | 'stories'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'login'
  | 'signup'
  | 'dashboard';

export type DashboardTab = 'explore' | 'messages' | 'favorites' | 'profile' | 'membership';

export type MembershipTier = 'Free' | 'Silver' | 'Gold' | 'Platinum';

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  gender: 'male' | 'female' | 'other';
  interestedIn: 'male' | 'female' | 'everyone';
  bio: string;
  avatar: string;
  images: string[];
  occupation: string;
  education?: string;
  membership: MembershipTier;
  matchScore: number;
  interests: string[];
  verified: boolean;
  online: boolean;
  tagline?: string;
}

export interface Message {
  id: string;
  senderId: string; // "user" or profile.id
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Story {
  id: string;
  names: string;
  location: string;
  story: string;
  image: string;
  date: string;
  durationBeforeMeeting: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'membership' | 'safety' | 'technical';
}

export interface Plan {
  id: MembershipTier;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  features: string[];
  popular: boolean;
  color: string;
  borderColor: string;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  interestedIn: 'male' | 'female' | 'everyone';
  location: string;
  bio: string;
  avatar: string;
  images: string[];
  occupation: string;
  interests: string[];
  membership: MembershipTier;
  billingPeriod: 'monthly' | 'annually';
  email: string;
  verified: boolean;
}
