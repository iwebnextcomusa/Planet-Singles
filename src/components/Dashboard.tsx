/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  X,
  MessageSquare,
  User,
  Star,
  Settings,
  ShieldCheck,
  MapPin,
  Sparkles,
  Search,
  SlidersHorizontal,
  Send,
  Trash2,
  Plus,
  CreditCard,
  Award,
  CheckCircle,
  Video
} from 'lucide-react';
import { Page, DashboardTab, UserProfile, Profile, Message, MembershipTier } from '../types';
import { MOCK_PROFILES, SIMULATED_RESPONSES, MEMBERSHIP_PLANS, MOCK_CHATS } from '../data';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
  currentUser: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export default function Dashboard({ setCurrentPage, currentUser, onUpdateUser }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('explore');
  
  // Localized Profile States
  const [exploreProfiles, setExploreProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>(['1', '5']); // Initial liked profiles
  const [matches, setMatches] = useState<Profile[]>([MOCK_PROFILES[0], MOCK_PROFILES[1], MOCK_PROFILES[4]]); // Initial matched
  
  // Filter States
  const [filterAgeMax, setFilterAgeMax] = useState<number>(38);
  const [filterGender, setFilterGender] = useState<string>('everyone');
  const [filterInterest, setFilterInterest] = useState<string>('All');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Chat/Messaging States
  const [selectedChatProfile, setSelectedChatProfile] = useState<Profile | null>(MOCK_PROFILES[0]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Detail Modal State
  const [selectedDetailProfile, setSelectedDetailProfile] = useState<Profile | null>(null);

  // Upgrade/Payment States
  const [upgradeTier, setUpgradeTier] = useState<MembershipTier | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // "It's a Match!" Celebration Modal State
  const [matchCelebration, setMatchCelebration] = useState<Profile | null>(null);
  const [matchFirstMessage, setMatchFirstMessage] = useState('');

  // Interests Pool for Profile Editor
  const availableInterests = [
    'Espresso', 'Literature', 'Climbing', 'Art History', 'Stargazing', 'Sourdough',
    'Coding', 'Roadtrips', 'Sailing', 'Classic Rock', 'Yoga', 'Sunsets', 'Wine Tasting'
  ];

  // Initialize Chat Messages
  useEffect(() => {
    const initialMessages: Message[] = [];
    Object.keys(MOCK_CHATS).forEach((profId) => {
      const prof = MOCK_PROFILES.find((p) => p.id === profId);
      if (prof) {
        MOCK_CHATS[profId].forEach((text, i) => {
          initialMessages.push({
            id: `init-${profId}-${i}`,
            senderId: i % 2 === 0 ? 'user' : profId,
            senderName: i % 2 === 0 ? currentUser.name : prof.name,
            receiverId: i % 2 === 0 ? profId : 'user',
            text,
            timestamp: new Date(Date.now() - (10 - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true
          });
        });
      }
    });
    setChatMessages(initialMessages);
  }, [currentUser]);

  // Handle Filtering on Profiles
  const filteredProfiles = exploreProfiles.filter((prof) => {
    const matchGender = filterGender === 'everyone' || prof.gender === filterGender;
    const matchAge = prof.age <= filterAgeMax;
    const matchInterest = filterInterest === 'All' || prof.interests.includes(filterInterest);
    return matchGender && matchAge && matchInterest;
  });

  const activeProfile = filteredProfiles[currentIndex] || null;

  // Swiping Actions
  const handleSwipe = (direction: 'left' | 'right') => {
    if (!activeProfile) return;

    if (direction === 'right') {
      // Add to favorites
      if (!favorites.includes(activeProfile.id)) {
        setFavorites((prev) => [...prev, activeProfile.id]);
      }

      // 35% chance to trigger an instant match if user swipes right!
      const rand = Math.random();
      if (rand < 0.35 && !matches.some((m) => m.id === activeProfile.id)) {
        setMatches((prev) => [...prev, activeProfile]);
        setMatchCelebration(activeProfile);
      }
    }

    // Move to next card
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRewind = () => {
    if (currentUser.membership === 'Free' || currentUser.membership === 'Silver') {
      alert('Rewind is a premium Gold and Platinum feature. Please upgrade your tier!');
      setActiveTab('membership');
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Submit First Message from Match celebration
  const handleCelebrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchCelebration) return;

    const text = matchFirstMessage || "Hey! I am so glad our orbits connected. 😊";
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: currentUser.name,
      receiverId: matchCelebration.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setSelectedChatProfile(matchCelebration);
    setMatchCelebration(null);
    setMatchFirstMessage('');
    setActiveTab('messages');
  };

  // Send Message inside Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput || !selectedChatProfile) return;

    const userMsgText = chatInput;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: currentUser.name,
      receiverId: selectedChatProfile.id,
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate Reply after 1.5 seconds
    setTimeout(() => {
      setIsTyping(false);
      // Select random reply text
      const replyText = SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
      const replyMsg: Message = {
        id: `reply-${Date.now()}`,
        senderId: selectedChatProfile.id,
        senderName: selectedChatProfile.name,
        receiverId: 'user',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  // Profile Editor Actions
  const handleProfileFieldChange = (field: keyof UserProfile, value: any) => {
    onUpdateUser({
      ...currentUser,
      [field]: value
    });
  };

  const handleAddInterest = (interest: string) => {
    if (!currentUser.interests.includes(interest)) {
      handleProfileFieldChange('interests', [...currentUser.interests, interest]);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    handleProfileFieldChange('interests', currentUser.interests.filter((i) => i !== interest));
  };

  const handleAddPhoto = () => {
    const url = prompt('Please enter an image URL to add to your photo gallery:');
    if (url) {
      handleProfileFieldChange('images', [...currentUser.images, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    if (currentUser.images.length <= 1) {
      alert('You must retain at least one profile photo.');
      return;
    }
    handleProfileFieldChange('images', currentUser.images.filter((_, idx) => idx !== index));
  };

  // Membership upgrade action
  const handleUpgradeSelect = (tier: MembershipTier) => {
    setUpgradeTier(tier);
    setPaymentSuccess(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upgradeTier || !cardNumber || !cardExpiry || !cardCvv) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      
      // Update user state with the upgraded membership
      onUpdateUser({
        ...currentUser,
        membership: upgradeTier,
        verified: true // automatically verify on payment!
      });

      // Clear fields
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');

      // Auto clear payment state after 3 seconds
      setTimeout(() => {
        setUpgradeTier(null);
        setPaymentSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div id="dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Dashboard Subheader Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-slate-950 dark:border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 border border-rose-500/20">Welcome Inside</span>
          <h1 className="text-2xl sm:text-4xl font-mono uppercase font-black text-slate-950 dark:text-white mt-1.5 flex items-center space-x-2">
            <span>Hi, {currentUser.name}</span>
            {currentUser.membership !== 'Free' && (
              <span className="text-xs uppercase font-mono font-black tracking-widest px-3 py-1 bg-rose-600 text-white rounded-none border-2 border-slate-950 flex items-center space-x-1 shadow-[2px_2px_0px_#000000]">
                <Award className="w-3.5 h-3.5 fill-white" />
                <span>{currentUser.membership}</span>
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">Discover partners, chat with matches, and customize your dating orbit.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {([
            { id: 'explore', label: 'Explore Orbits' },
            { id: 'messages', label: 'Dating Chats' },
            { id: 'favorites', label: 'Liked & Favorites' },
            { id: 'profile', label: 'My Profile' },
            { id: 'membership', label: 'My Membership' }
          ] as { id: DashboardTab; label: string }[]).map((tab) => (
            <button
              id={`tab-btn-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-black rounded-none border-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-600 border-slate-950 dark:border-white text-white shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff]'
                  : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 hover:text-slate-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXPLORE / SWIPING */}
      {activeTab === 'explore' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Swiping stage */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* Filter Toggle Header */}
            <div className="w-full max-w-md flex justify-between items-center mb-4">
              <span className="text-xs text-slate-400 font-bold">Matching recommendations</span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-sm hover:bg-slate-50"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            {/* Expandable Filters Tray */}
            {showFilters && (
              <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 shadow-md space-y-4">
                <h4 className="text-xs font-black uppercase text-indigo-600 tracking-wider">Refine Matched Orbits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Max Age: {filterAgeMax}</label>
                    <input
                      type="range"
                      min={18}
                      max={60}
                      value={filterAgeMax}
                      onChange={(e) => { setFilterAgeMax(Number(e.target.value)); setCurrentIndex(0); }}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Looking for</label>
                    <select
                      value={filterGender}
                      onChange={(e) => { setFilterGender(e.target.value); setCurrentIndex(0); }}
                      className="w-full px-2 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded text-[11px]"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="male">Men</option>
                      <option value="female">Women</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Specific Interest</label>
                    <select
                      value={filterInterest}
                      onChange={(e) => { setFilterInterest(e.target.value); setCurrentIndex(0); }}
                      className="w-full px-2 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded text-[11px]"
                    >
                      <option value="All">All Interests</option>
                      {availableInterests.map((interest) => (
                        <option key={interest} value={interest}>{interest}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Deck Card Card */}
            {activeProfile ? (
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative group">
                
                {/* Photo space */}
                <div className="h-96 sm:h-[420px] overflow-hidden relative cursor-pointer" onClick={() => setSelectedDetailProfile(activeProfile)}>
                  <img
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute metadata badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Top indicators */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1.5 bg-slate-900/75 px-3 py-1 rounded-full border border-slate-700 text-[10px] text-white font-extrabold uppercase tracking-widest backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                      <span>{activeProfile.matchScore}% Match strength</span>
                    </div>
                    {activeProfile.online && (
                      <div className="flex items-center space-x-1 bg-emerald-500/90 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        <span>Online</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom details block overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-2xl font-black leading-tight flex items-center space-x-1.5">
                        <span>{activeProfile.name}, {activeProfile.age}</span>
                        {activeProfile.verified && (
                          <ShieldCheck className="w-5 h-5 text-emerald-400 fill-white dark:fill-slate-950" title="Manual security verified" />
                        )}
                      </h3>
                      <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase tracking-wider border border-indigo-500/50">
                        {activeProfile.membership}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-semibold italic">"{activeProfile.tagline || 'Ready to meet someone genuine.'}"</p>
                    
                    <div className="flex items-center space-x-1 text-xs text-slate-300">
                      <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{activeProfile.location}</span>
                    </div>
                  </div>
                </div>

                {/* Additional parameters section */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Occupation & Education</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{activeProfile.occupation} • <span className="text-slate-400">{activeProfile.education || 'Self-Employed'}</span></p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Interests Alignment</p>
                    <div className="flex flex-wrap gap-1">
                      {activeProfile.interests.map((interest) => {
                        const userHasInterest = currentUser.interests.includes(interest);
                        return (
                          <span
                            key={interest}
                            className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all ${
                              userHasInterest
                                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {interest} {userHasInterest && '❤️'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Swiping control footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-around">
                  {/* Rewind */}
                  <button
                    onClick={handleRewind}
                    className="p-3.5 bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 rounded-full border border-slate-250 dark:border-slate-700 hover:scale-105 shadow-sm transition-all cursor-pointer"
                    title="Rewind Swipe"
                  >
                    <Star className="w-5 h-5 fill-slate-50 dark:fill-transparent" />
                  </button>

                  {/* Swipe Left (Pass) */}
                  <button
                    onClick={() => handleSwipe('left')}
                    className="p-4 bg-white dark:bg-slate-800 text-red-500 rounded-full border-2 border-red-100 dark:border-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/20 hover:scale-110 shadow-md transition-all cursor-pointer"
                    title="Pass/Left"
                  >
                    <X className="w-7 h-7" />
                  </button>

                  {/* Swipe Right (Like) */}
                  <button
                    onClick={() => handleSwipe('right')}
                    className="p-4 bg-white dark:bg-slate-800 text-emerald-500 rounded-full border-2 border-emerald-100 dark:border-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:scale-110 shadow-md transition-all cursor-pointer"
                    title="Like/Right"
                  >
                    <Heart className="w-7 h-7 fill-emerald-500" />
                  </button>

                  {/* View Full Info */}
                  <button
                    onClick={() => setSelectedDetailProfile(activeProfile)}
                    className="p-3.5 bg-white dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-full border border-slate-250 dark:border-slate-700 hover:scale-105 shadow-sm transition-all cursor-pointer"
                    title="Profile Details"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-6 shadow-xl">
                <div className="w-16 h-16 bg-pink-50 dark:bg-pink-950/40 text-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 fill-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">That's All For Today!</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You have reviewed all compatible matching orbits based on your parameters. Try expanding your age limits, changing specific filters, or editing your biography to align with other stargazers.
                </p>
                <div className="flex justify-center space-x-2 text-xs">
                  <button
                    onClick={() => { setFilterAgeMax(60); setFilterGender('everyone'); setFilterInterest('All'); setCurrentIndex(0); }}
                    className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg cursor-pointer hover:bg-indigo-700"
                  >
                    Reset Filter parameters
                  </button>
                  <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-lg cursor-pointer hover:bg-slate-200"
                  >
                    Rewind Deck list
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Mini Match Overview panel */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
            <h3 className="text-sm font-black uppercase text-indigo-600 tracking-wider">Matched Orbits List ({matches.length})</h3>
            
            {matches.length > 0 ? (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {matches.map((prof) => (
                  <div
                    key={prof.id}
                    onClick={() => { setSelectedChatProfile(prof); setActiveTab('messages'); }}
                    className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 rounded-xl hover:bg-indigo-50/40 hover:border-indigo-200 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">{prof.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{prof.location} • {prof.age} yrs</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold text-emerald-500">{prof.matchScore}%</span>
                      <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 space-y-1">
                <p>No active matched connections yet.</p>
                <p className="text-[10px]">Swipe Right (Heart) on profiles to form matches!</p>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-950 p-4 rounded-xl text-center space-y-2">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Exclusive Event Mixer</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Next Offline Mixer: **Pasadena Wine Align**</p>
              <p className="text-[10px] text-indigo-500 font-bold">Platinum & Gold Members RSVP Free</p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MESSAGING/CHATS */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-[600px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Matches Sidebar (Left column) */}
          <div className="md:col-span-4 border-r border-slate-150 dark:border-slate-850 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/30">
            <div className="p-4 border-b border-slate-150 dark:border-slate-850">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Conversations</h3>
            </div>
            
            <div className="flex-grow overflow-y-auto p-2 space-y-1">
              {matches.map((prof) => {
                const isSelected = selectedChatProfile?.id === prof.id;
                const lastMsg = chatMessages
                  .filter((m) => m.senderId === prof.id || m.receiverId === prof.id)
                  .slice(-1)[0];

                return (
                  <div
                    key={prof.id}
                    onClick={() => setSelectedChatProfile(prof)}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900'
                        : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="relative">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {prof.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{prof.name}</p>
                        <p className="text-[11px] text-slate-400 truncate leading-snug">
                          {lastMsg ? lastMsg.text : 'Click to send a welcome icebreaker...'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Chat Window (Right column) */}
          <div className="md:col-span-8 flex flex-col justify-between h-full relative">
            {selectedChatProfile ? (
              <>
                {/* Chat Partner Header */}
                <div className="p-4 border-b border-slate-150 dark:border-slate-850/80 bg-slate-50/20 dark:bg-slate-950/20 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedChatProfile.avatar}
                      alt={selectedChatProfile.name}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={() => setSelectedDetailProfile(selectedChatProfile)}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span className="hover:underline cursor-pointer" onClick={() => setSelectedDetailProfile(selectedChatProfile)}>
                          {selectedChatProfile.name}
                        </span>
                        {selectedChatProfile.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-snug">{selectedChatProfile.occupation} • {selectedChatProfile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert('HD Video calling is a Gold/Platinum member feature! This simulates connection on active threads.')}
                      className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                      title="Start Video Call"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedDetailProfile(selectedChatProfile)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Messages Feed Area */}
                <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
                  {chatMessages
                    .filter(
                      (m) =>
                        (m.senderId === 'user' && m.receiverId === selectedChatProfile.id) ||
                        (m.senderId === selectedChatProfile.id && m.receiverId === 'user')
                    )
                    .map((msg) => {
                      const isUser = msg.senderId === 'user';
                      return (
                        <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isUser
                              ? 'bg-indigo-600 text-white rounded-br-none'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                          }`}>
                            <p>{msg.text}</p>
                            <span className={`block text-[9px] text-right mt-1.5 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start items-center space-x-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      <span className="text-[10px] text-slate-400">{selectedChatProfile.name} is typing...</span>
                    </div>
                  )}
                </div>

                {/* Input Text Box Footer */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-150 dark:border-slate-850/80 bg-slate-50/50 dark:bg-slate-950/20 flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Write an aligned message to ${selectedChatProfile.name}...`}
                    className="flex-grow px-4 py-3 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-md shadow-indigo-600/10"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-3">
                <MessageSquare className="w-12 h-12 text-slate-300" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300">Select a Conversation</h4>
                <p className="text-xs text-slate-400">Choose one of your matched connections from the left menu to start typing.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: FAVORITES/LIKES */}
      {activeTab === 'favorites' && (
        <div>
          <div className="mb-6">
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Your Liked Profiles</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any profile card to view full detail listings, galleries, and alignment reports.</p>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {exploreProfiles
                .filter((p) => favorites.includes(p.id))
                .map((prof) => (
                  <div
                    key={prof.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:-translate-y-1 transition-all"
                  >
                    <div className="h-44 overflow-hidden relative cursor-pointer" onClick={() => setSelectedDetailProfile(prof)}>
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-pink-500/90 text-white p-1.5 rounded-full backdrop-blur-sm">
                        <Heart className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-900/75 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        {prof.matchScore}% Match
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-1.5">
                          <span>{prof.name}, {prof.age}</span>
                          {prof.verified && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{prof.location}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">"{prof.bio}"</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedDetailProfile(prof)}
                          className="py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded font-bold text-[10px] uppercase tracking-wider"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            if (!matches.some((m) => m.id === prof.id)) {
                              setMatches((prev) => [...prev, prof]);
                            }
                            setSelectedChatProfile(prof);
                            setActiveTab('messages');
                          }}
                          className="py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-[10px] uppercase tracking-wider"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 max-w-md mx-auto">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-bold">No Favorites Yet</h4>
              <p className="text-xs text-slate-400 leading-relaxed px-6">
                When swiping in Explore, liking a profile adds them to this quick-access favorites panel. Go to Explore to match with some stars!
              </p>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Go Swiping
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY PROFILE EDITOR */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Editor Fields Column */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-3 border-indigo-600 pl-3">Edit Profile Settings</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Occupation</label>
                  <input
                    type="text"
                    value={currentUser.occupation}
                    onChange={(e) => handleProfileFieldChange('occupation', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Proximity Location</label>
                  <input
                    type="text"
                    value={currentUser.location}
                    onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age</label>
                  <input
                    type="number"
                    value={currentUser.age}
                    onChange={(e) => handleProfileFieldChange('age', Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Biography</label>
                <textarea
                  rows={4}
                  value={currentUser.bio}
                  onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Interests Manager */}
              <div className="space-y-2 pt-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Alignments & Hobbies</label>
                
                {/* Active Interests */}
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 rounded-full text-[10px] font-bold flex items-center space-x-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                      title="Click to remove interest"
                    >
                      <span>{interest}</span>
                      <X className="w-3 h-3 flex-shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Quick Add Pool */}
                <p className="text-[10px] text-slate-400 font-semibold pt-2">Click below to add more parameters:</p>
                <div className="flex flex-wrap gap-1">
                  {availableInterests
                    .filter((i) => !currentUser.interests.includes(i))
                    .map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleAddInterest(interest)}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[9px] hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 dark:border-slate-800 cursor-pointer"
                      >
                        + {interest}
                      </button>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Changes synchronized instantly! Check your header details.')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Photo Gallery Manager */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase text-indigo-600 tracking-wider">Photo Gallery</h3>
              <button
                onClick={handleAddPhoto}
                className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                title="Add photo url"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400">Add or remove photographs from your dating catalog. We suggest uploading high-resolution portraits with clear lightning.</p>

            <div className="grid grid-cols-2 gap-3">
              {currentUser.images.map((img, index) => (
                <div key={index} className="h-32 rounded-xl overflow-hidden relative group border border-slate-100 dark:border-slate-800">
                  <img
                    src={img}
                    alt="Gallery item"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Delete overlay button */}
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/75 hover:bg-red-600 text-white rounded-full backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              
              {/* Empty slot placeholder */}
              <button
                onClick={handleAddPhoto}
                className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-850 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-950/20"
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold">Add Photo URL</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: MEMBERSHIP BILLING & UPGRADES */}
      {activeTab === 'membership' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tiers Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-3 border-indigo-600 pl-3">Your Current Membership</h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Level</p>
                  <p className="text-lg font-extrabold text-slate-950 dark:text-white mt-0.5">{currentUser.membership} Starter</p>
                  <p className="text-xs text-slate-500 mt-1">Status: **Active** • Verified: {currentUser.verified ? 'Yes' : 'No'}</p>
                </div>
                <div className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider rounded-lg border border-indigo-100">
                  Active
                </div>
              </div>
            </div>

            {/* Upgrades grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['Silver', 'Gold', 'Platinum'] as MembershipTier[]).map((tier) => {
                const plan = MEMBERSHIP_PLANS.find((p) => p.id === tier);
                const isSelected = upgradeTier === tier;
                if (!plan) return null;

                return (
                  <button
                    key={tier}
                    onClick={() => handleUpgradeSelect(tier)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-48 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 ring-2 ring-indigo-500/10'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350'
                    }`}
                  >
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{plan.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Tier {plan.id}</p>
                    </div>

                    <div>
                      <p className="text-2xl font-black text-slate-950 dark:text-white">${plan.priceMonthly}<span className="text-xs text-slate-400 font-semibold">/mo</span></p>
                      <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded mt-2 block w-max">Select Upgrade</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Payment Drawer */}
          <div className="lg:col-span-5">
            {upgradeTier ? (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
                
                {paymentSuccess ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Transaction Approved!</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Congratulations! Your account has been upgraded to **{upgradeTier} Premium**. Your signature badge checkmark and prioritized view rankings are unlocked instantly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Confirm Upgraded Subscription</h3>
                    <p className="text-xs text-slate-500">Upgrade request: **{upgradeTier} connect** • billed monthly.</p>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Credit Card Number</label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 • 2222 • 3333 • 4444"
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          placeholder="12/28"
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Security Code (CVV)</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          placeholder="•••"
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>{isProcessingPayment ? 'Validating Secures...' : `Authorize & Upgrade`}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-slate-100/50 dark:bg-slate-900/40 p-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Award className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Upgrade Checkout</h4>
                <p className="text-xs text-slate-400 px-4">Select one of our premium tiers (Silver, Gold, or Platinum) on the left to review the Stripe secure payment desk.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FLOATING ABSOLUTE MODAL 1: PROFILE DETAIL MODAL --- */}
      {selectedDetailProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/65 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
            
            {/* Modal Head */}
            <div className="p-4 border-b border-slate-150 dark:border-slate-850 flex items-center justify-between bg-slate-50 dark:bg-slate-950/40">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Detailed Planet Orbit</h4>
              <button
                onClick={() => setSelectedDetailProfile(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Profile Main Header Layout */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left pb-6 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={selectedDetailProfile.avatar}
                  alt={selectedDetailProfile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-indigo-200 object-cover shadow"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-1">
                      <span>{selectedDetailProfile.name}, {selectedDetailProfile.age}</span>
                      {selectedDetailProfile.verified && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                    </h3>
                    <span className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-150">
                      {selectedDetailProfile.membership} Member
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-semibold">{selectedDetailProfile.occupation} • <span className="text-slate-350">{selectedDetailProfile.education || 'Self-Made'}</span></p>
                  
                  <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-xs text-slate-500">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{selectedDetailProfile.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio & taglines */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Biography & expectations</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line italic">
                  "{selectedDetailProfile.bio}"
                </p>
              </div>

              {/* Photos Gallery */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Photos Catalog</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedDetailProfile.images.map((img, idx) => (
                    <div key={idx} className="h-32 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                      <img
                        src={img}
                        alt="Gallery item"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility alignment parameters */}
              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-4 border border-slate-150 dark:border-slate-850/80 space-y-3">
                <h5 className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                  <span>24-Metric Compatibility Report: {selectedDetailProfile.matchScore}% overlapping</span>
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 leading-snug">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Matched long-term timelines</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Symmetrical attachment styles</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Reciprocal hobby alignment</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Equivalent proximity ranges</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Foot Actions */}
            <div className="p-4 border-t border-slate-150 dark:border-slate-850 flex justify-end space-x-2 bg-slate-50 dark:bg-slate-950/40">
              <button
                onClick={() => {
                  if (!favorites.includes(selectedDetailProfile.id)) {
                    setFavorites((prev) => [...prev, selectedDetailProfile.id]);
                  }
                  setSelectedDetailProfile(null);
                }}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-pink-500"
              >
                Like Orbit
              </button>
              <button
                onClick={() => {
                  if (!matches.some((m) => m.id === selectedDetailProfile.id)) {
                    setMatches((prev) => [...prev, selectedDetailProfile]);
                  }
                  setSelectedChatProfile(selectedDetailProfile);
                  setSelectedDetailProfile(null);
                  setActiveTab('messages');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-extrabold uppercase tracking-wider"
              >
                Start Encrypted Conversation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- FLOATING ABSOLUTE MODAL 2: "IT'S A MATCH!" CELEBRATION MODAL --- */}
      {matchCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4">
          <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-950 text-white w-full max-w-md rounded-3xl p-8 border border-indigo-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Spinning decorative background layout */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse pointer-events-none"></div>

            <div className="space-y-2">
              <div className="inline-flex p-3 bg-pink-500/20 text-pink-500 rounded-full animate-bounce">
                <Heart className="w-8 h-8 fill-pink-500" />
              </div>
              <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                It's a Match!
              </h2>
              <p className="text-xs text-slate-300">Your orbits around the romantic solar system have fully connected!</p>
            </div>

            {/* Double Avatar Orbit graphic */}
            <div className="flex items-center justify-center space-x-6 relative py-4">
              {/* User Avatar */}
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-2 -right-2 text-xs bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full border border-indigo-400">You</span>
              </div>

              {/* Sparkle line */}
              <div className="text-indigo-400 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>

              {/* Matched Avatar */}
              <div className="relative">
                <img
                  src={matchCelebration.avatar}
                  alt={matchCelebration.name}
                  className="w-20 h-20 rounded-full border-4 border-pink-500 object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-2 -right-2 text-[10px] bg-pink-600 text-white font-bold px-2 py-0.5 rounded-full border border-pink-400">Match</span>
              </div>
            </div>

            {/* Icebreaker First Message Input Form */}
            <form onSubmit={handleCelebrationSubmit} className="space-y-3">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider text-left">Send Your First Message</label>
              <input
                type="text"
                value={matchFirstMessage}
                onChange={(e) => setMatchFirstMessage(e.target.value)}
                placeholder={`Type something sweet to ${matchCelebration.name}...`}
                className="w-full px-4 py-3 bg-slate-900/60 border border-indigo-500/30 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMatchCelebration(null)}
                  className="py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg font-bold"
                >
                  Keep Browsing
                </button>
                <button
                  type="submit"
                  className="py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg shadow"
                >
                  Send Icebreaker
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
