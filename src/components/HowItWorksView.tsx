/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, ShieldAlert, Sparkles, MessageSquare, Heart, Video, Calendar, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface HowItWorksViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function HowItWorksView({ setCurrentPage }: HowItWorksViewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const steps = [
    {
      id: 0,
      icon: <ClipboardList className="w-5 h-5" />,
      title: '1. Personality & Value Alignment',
      short: 'A comprehensive 24-point evaluation of lifestyle habits, relationship goals, and emotional pillars.',
      long: 'Most dating applications rely purely on physical aesthetics. Planet Singles begins with an intuitive, detailed value survey created by Dr. Rebecca Vance. We evaluate 24 specific metrics including: communication styles (direct vs. nurturing), financial expectations, career alignments, and future family expectations. This helps ensure that the foundation of a potential match is built on alignment.',
      bulletTitle: 'Key elements analyzed:',
      bullets: ['Intellectual curiosity and hobbies', 'Attachment styles and conflict resolution mechanisms', 'Long-term relationship timelines', 'Spiritual, family, and political alignments']
    },
    {
      id: 1,
      icon: <ShieldAlert className="w-5 h-5" />,
      title: '2. Sincerity Verification',
      short: 'Stringent identity checks and validation protocols to block malicious profiles and catfishing.',
      long: 'To keep our planet safe, we screen and verify every single profile. When joining, users submit real-time identity selfies. Platinum and Gold members are manually reviewed by our security staff to verify credentials, employment tags, and location settings. Verified members are awarded our signature checkmark emblem, which increases visibility on our swiping and search interfaces.',
      bulletTitle: 'Our Safety Safeguards:',
      bullets: ['Encrypted, private messaging layers', 'Real-time phone and email checks', 'Active reporting systems to ban scammers instantly', 'Strict photo policies against catfishing']
    },
    {
      id: 2,
      icon: <Sparkles className="w-5 h-5" />,
      title: '3. Compatibility Scoring',
      short: 'Calculating true percentages based on reciprocal data to connect matching orbits.',
      long: 'When you view another member, you do not just see a photo; you see a dynamic compatibility indicator. This score represents how closely your answers in step 1 align. High Scores (90%+) indicate a significant reciprocal overlap. Our search algorithm prioritizes showing you members within your specified age, location, and interest brackets with the highest matching scores first.',
      bulletTitle: 'How we calculate scores:',
      bullets: ['Mutual goals weighting (40% match strength)', 'Communication compatibility (30% match strength)', 'Reciprocal interests overlap (30% match strength)', 'Proximity metrics']
    },
    {
      id: 3,
      icon: <MessageSquare className="w-5 h-5" />,
      title: '4. Encrypted Conversations',
      short: 'Private text boxes, voice logs, and high-definition in-app video calling features.',
      long: 'Once a mutual connection occurs, conversations open. Depending on your tiered membership, you can use secure text chats, read receipts, and audio voice messages. If you upgrade to Gold or Platinum, you can launch a high-definition in-app video call directly within the chat window, removing the necessity of sharing personal phone numbers or social media accounts before you feel completely ready.',
      bulletTitle: 'Communication Tools:',
      bullets: ['Real-time read receipts (Gold/Platinum)', 'Audio message recordings', 'Secured high-definition video calls', 'Intelligent icebreaker suggestions']
    },
    {
      id: 4,
      icon: <Calendar className="w-5 h-5" />,
      title: '5. Guided Matchmaking (VIP)',
      short: 'Offline singles mixers and manual 1-on-1 introductions facilitated by certified matchmakers.',
      long: 'For members who want the highest standards of offline assistance, our Platinum tier pairs you with a dedicated relationship coach. Your matchmaker manually screens our database, looking beyond computer data to find subtle intuitive matches. They schedule private phone calls, organize secure dates, facilitate safety checks, and send you exclusive invitations to elegant, members-only mixers.',
      bulletTitle: 'VIP Concierge Perks:',
      bullets: ['Dedicated, certified offline relationship coach', 'Curated, structured local date scheduling', 'Vetted list of members-only local events', 'Post-date evaluation feedback reviews']
    }
  ];

  return (
    <div id="how-it-works-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Our Science</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Works</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Discover our multi-layered approach to matching, combining psychological survey data, tight profile verification safeguards, and high-touch concierge support.
          </p>
        </div>
      </section>

      {/* Interactive Step Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Step-by-Step</span>
          <h3 className="text-3xl font-black text-slate-950 dark:text-white uppercase italic tracking-tight">The Matchmaking Lifecycle</h3>
          <p className="text-xs text-slate-500 dark:text-slate-450 font-mono uppercase tracking-wider">
            Click on the steps below to explore our core operations from profile creation to meeting your partner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Step Selectors (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step) => {
              const isSelected = activeTab === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`w-full text-left p-5 rounded-none border-4 transition-all duration-150 flex items-start space-x-4 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 dark:border-rose-500 shadow-[4px_4px_0px_#fb7185] dark:shadow-[4px_4px_0px_#ffffff]'
                      : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-850 hover:border-slate-950 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className={`p-2.5 rounded-none border border-current flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-mono uppercase font-black transition-colors ${
                      isSelected ? 'text-rose-400' : 'text-slate-900 dark:text-slate-200'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-1.5 line-clamp-1 font-sans ${
                      isSelected ? 'text-slate-350' : 'text-slate-500 dark:text-slate-400'
                    }`}>{step.short}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Detail Display (Right Column) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-none border-4 border-slate-950 dark:border-slate-800 shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#1e293b] min-h-[440px] flex flex-col justify-between transition-all">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 border-b-2 border-slate-100 dark:border-slate-800 pb-5">
                <div className="p-3 bg-rose-500/10 border-2 border-rose-500/30 text-rose-500 dark:text-rose-400 rounded-none">
                  {steps[activeTab].icon}
                </div>
                <h3 className="text-lg md:text-xl font-mono uppercase font-black text-slate-950 dark:text-white">
                  {steps[activeTab].title}
                </h3>
              </div>

              <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-sans">
                {steps[activeTab].long}
              </p>

              <div className="space-y-4 pt-5 border-t-2 border-slate-100 dark:border-slate-800">
                <h5 className="text-xs font-mono uppercase font-black text-rose-600 dark:text-rose-400 tracking-widest">
                  {steps[activeTab].bulletTitle}
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                  {steps[activeTab].bullets.map((b, idx) => (
                    <li key={idx} className="flex items-center space-x-2.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span className="font-sans font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button
                onClick={() => {
                  if (activeTab < steps.length - 1) {
                    setActiveTab(activeTab + 1);
                  } else {
                    setCurrentPage('signup');
                  }
                }}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-widest font-black text-xs border-2 border-slate-950 dark:border-white rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>{activeTab < steps.length - 1 ? 'Next Step' : 'Get Started Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security emphasis card */}
      <section className="bg-slate-950 border-t-4 border-slate-950 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-400">Security Layers</span>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white">Your Privacy is Our Absolute Priority</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              We never publish your profile visitor lists, sell search parameters to advertisers, or display exact coordinate positions. Our platform uses end-to-end encryption for video services and strictly verified credentials to guarantee safety on every step.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="p-5 bg-slate-900 border-4 border-slate-850 rounded-none flex items-center justify-center space-x-4 shadow-[4px_4px_0px_#fb7185]">
              <Video className="w-8 h-8 text-rose-500" />
              <div className="text-left">
                <p className="text-xs font-mono uppercase tracking-wider font-black text-white">In-App Calling</p>
                <p className="text-[10px] text-slate-500 font-mono">No phone number shared</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
