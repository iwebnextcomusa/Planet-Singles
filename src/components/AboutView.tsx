/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Heart, Eye, Award, CheckCircle } from 'lucide-react';
import { Page } from '../types';

interface AboutViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  const teamMembers = [
    {
      name: 'Daniel Mills',
      role: 'Founder & CEO',
      bio: 'With over 15 years in luxury consumer matching and web engineering, Daniel created Planet Singles to bring intentional, highly committed relationship goals back to the modern internet.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80',
      quote: 'We built a tool that aligns people based on compatibility, rather than superficial aesthetics.',
    },
    {
      name: 'Dr. Rebecca Vance',
      role: 'Chief Relationship Psychologist',
      bio: 'A licensed marriage therapist and researcher, Dr. Rebecca architected our proprietary compatibility engine evaluating 24 psychological metrics across communication and values.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80',
      quote: 'Attraction catches your eye; compatibility captures your calendar.',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Director of Matchmaking Concierge',
      bio: 'Sarah leads our team of offline matchmakers, coordinating VIP events and providing 1-on-1 introductions for Platinum members across the country.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
      quote: 'Technology does the math, but intuition makes the final connection.',
    },
  ];

  return (
    <div id="about-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Our Identity</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            The Story of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Planet Singles</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Discover why we stepped away from shallow swipes to design an ecosystem that honors genuine human alignment.
          </p>
        </div>
      </section>

      {/* Philosophy & Purpose */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white leading-none uppercase italic">
              Reclaiming Intention in the Digital Dating Era
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              In 2021, our founders realized a troubling pattern: the rise of dating apps had increased loneliness while reducing committed marriages. Swiping had become a nervous twitch rather than a path to companionship. 
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Planet Singles was established to restore dignity, quality, and commitment. By grouping members into logical interest categories and providing specialized tiers, we encourage users to slow down, write thoughtful profiles, and interact with verified intent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs uppercase tracking-wider font-bold">
              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50">
                <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300">Strict Verification</span>
              </div>
              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50">
                <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300">24-Metric Matrix</span>
              </div>
              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50">
                <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300">Zero Commercial Ads</span>
              </div>
              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50">
                <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300">Offline Mixers</span>
              </div>
            </div>
          </div>

          {/* Graphical Callout */}
          <div className="bg-slate-950 dark:bg-slate-900 p-8 md:p-10 border-4 border-slate-950 dark:border-slate-800 flex flex-col justify-center space-y-8 relative overflow-hidden shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#fb7185]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest font-black text-white">Our Mission</h4>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1.5 leading-relaxed font-sans">
                  To eliminate digital dating fatigue by facilitating sincere connections rooted in psychological matching, transparent memberships, and offline security.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-t border-slate-800/80 pt-6">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest font-black text-white">Our Promise</h4>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1.5 leading-relaxed font-sans">
                  To keep your privacy pristine. We will never sell your location parameters, share your personal contact details, or monetize your romantic vulnerability.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-t border-slate-800/80 pt-6">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 flex-shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest font-black text-white">Our Vision</h4>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1.5 leading-relaxed font-sans">
                  A world where digital platforms respect human dignity, and where "finding your person" is an elegant, structured, and emotionally safe transition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-slate-50 dark:bg-slate-900 border-t-4 border-b-4 border-slate-950 dark:border-slate-850 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Our Experts</span>
            <h3 className="text-3xl font-black text-slate-950 dark:text-white uppercase italic tracking-tight">The Matchmakers Behind the Screen</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
              Meet our board of psychologists, luxury matching veterans, and community advisors guiding your digital experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-950 p-8 border-4 border-slate-950 dark:border-slate-850 flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] dark:hover:shadow-[8px_8px_0px_#fb7185] transition-all">
                <div className="space-y-4">
                  <div className="w-24 h-24 overflow-hidden border-4 border-slate-950 dark:border-slate-800 mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h5 className="font-mono uppercase font-black text-slate-950 dark:text-white text-base">{member.name}</h5>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-mono font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 border-2 border-slate-950 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-300 italic font-sans leading-relaxed">
                  "{member.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action bar */}
      <section className="bg-rose-600 text-white py-16 text-center border-b-4 border-slate-950 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-slate-950/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h4 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">Ready to meet people who share your standard?</h4>
          <p className="text-xs md:text-sm text-rose-100 max-w-lg mx-auto font-mono uppercase tracking-wider">
            Take the first step. Register your profile for free, take the values survey, and review initial compatible profiles.
          </p>
          <button
            onClick={() => setCurrentPage('signup')}
            className="px-8 py-4 bg-white text-slate-950 font-mono uppercase tracking-widest font-black text-xs border-4 border-slate-950 hover:bg-slate-50 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all cursor-pointer"
          >
            Create My Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
