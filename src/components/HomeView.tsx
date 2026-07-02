/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Shield, Sparkles, Users, ArrowRight, MessageSquare, BadgeCheck, CheckCircle } from 'lucide-react';
import { Page } from '../types';
import { SUCCESS_STORIES, MEMBERSHIP_PLANS } from '../data';

interface HomeViewProps {
  setCurrentPage: (page: Page) => void;
  onQuickSignUp: (name: string, email: string) => void;
}

export default function HomeView({ setCurrentPage, onQuickSignUp }: HomeViewProps) {
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickSuccess, setQuickSuccess] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickEmail) return;
    onQuickSignUp(quickName, quickEmail);
    setQuickSuccess(true);
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div id="home-view" className="bg-[#fcf8f8] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:py-36 bg-gradient-to-b from-rose-50/30 via-white to-slate-50 dark:from-slate-900/10 dark:via-slate-950 dark:to-slate-950">
        {/* Glowing Decorative Background Orbs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-rose-500/10 dark:bg-rose-950/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-950/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Slogan & Copy */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-rose-500/10 dark:bg-rose-500/10 border border-rose-500/30 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Premium Matchmaking Experience</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black tracking-tighter uppercase italic text-slate-950 dark:text-white leading-[0.9] select-none">
                Where <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 dark:from-rose-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent font-black">Meaningful Connections</span> Begin.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Planet Singles is not just about swiping. We are a premier, tiered dating platform designed to align your romantic expectations, lifestyle goals, and core values with certified matchmaking precision.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-join-now-btn"
                  onClick={() => {
                    setCurrentPage('signup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-rose-600 dark:bg-rose-600 text-white font-mono text-xs uppercase tracking-[0.2em] font-black rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] border-2 border-slate-950 dark:border-white hover:bg-rose-500 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] dark:hover:shadow-[6px_6px_0px_#ffffff] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-browse-memberships-btn"
                  onClick={() => {
                    setCurrentPage('plans');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-transparent text-slate-950 dark:text-slate-200 border-2 border-slate-950 dark:border-slate-800 font-mono text-xs uppercase tracking-[0.2em] font-black rounded-none hover:bg-slate-950 hover:text-white dark:hover:bg-slate-900 dark:hover:text-white hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer"
                >
                  Browse Memberships
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t-2 border-slate-950/10 dark:border-slate-800/60 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-4xl sm:text-5xl font-mono font-black text-rose-600 dark:text-rose-400 tracking-tight">94%</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono mt-1">Match Accuracy</p>
                </div>
                <div>
                  <p className="text-4xl sm:text-5xl font-mono font-black text-purple-600 dark:text-purple-400 tracking-tight">45K+</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono mt-1">Happy Couples</p>
                </div>
                <div>
                  <p className="text-4xl sm:text-5xl font-mono font-black text-indigo-600 dark:text-indigo-400 tracking-tight">24/7</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono mt-1">Safety Support</p>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Registration Form */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900/90 p-8 shadow-2xl border-4 border-slate-950 dark:border-slate-800 rounded-none relative">
                {quickSuccess ? (
                  <div className="text-center py-16 space-y-6">
                    <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-500 rounded-none border border-emerald-500/20">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-mono uppercase font-black text-slate-950 dark:text-white">Connecting Orbit...</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Your temporary profile has been initialized! Sending you to your Dashboard...
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-sans uppercase font-black text-slate-950 dark:text-white mb-2 text-center">Find Your Orbit</h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center mb-6">Create a free profile and preview members instantly.</p>

                    <form onSubmit={handleQuickSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={quickName}
                          onChange={(e) => setQuickName(e.target.value)}
                          placeholder="Elena, David, etc."
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 text-sm font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={quickEmail}
                          onChange={(e) => setQuickEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 text-sm font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">I Am A</label>
                          <select className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:border-rose-500">
                            <option>Woman</option>
                            <option>Man</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">Seeking A</label>
                          <select className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:border-rose-500">
                            <option>Man</option>
                            <option>Woman</option>
                            <option>Everyone</option>
                          </select>
                        </div>
                      </div>

                      <button
                        id="quick-submit-btn"
                        type="submit"
                        className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-[0.2em] font-black rounded-none shadow-[4px_4px_0px_#000000] border-2 border-slate-950 transition-all cursor-pointer"
                      >
                        Create Free Account
                      </button>
                    </form>

                    <div className="mt-6 pt-5 border-t-2 border-slate-950/10 dark:border-slate-800/80 text-center">
                      <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
                        By joining, you agree to our <span className="underline hover:text-rose-500 cursor-pointer">Terms of Service</span> & <span className="underline hover:text-rose-500 cursor-pointer">Privacy Policy</span>.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Benefits (Why Us) */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y-4 border-slate-950 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-rose-500 font-bold">Why Planet Singles?</h2>
            <p className="font-sans text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-slate-950 dark:text-white leading-tight">
              Safe Haven for Serious Seekers
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-sans text-base leading-relaxed">
              We move beyond the shallow gamification of romance. Planet Singles is built upon principles of transparency, secure boundaries, and emotional alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {/* Benefit 1 */}
            <div className="bg-[#faf6f6] dark:bg-slate-950 p-8 border-4 border-slate-950 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_#f43f5e] dark:shadow-[4px_4px_0px_#e11d48] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#f43f5e] dark:hover:shadow-[6px_6px_0px_#e11d48] transition-all duration-200 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-none border border-rose-500/30 flex items-center justify-center mb-8">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white mb-3">Verified Profiles Only</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  We manual-review profile credentials and provide official checkmarks so you always converse with genuine individuals who value safety as much as you.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#faf6f6] dark:bg-slate-950 p-8 border-4 border-slate-950 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_#f43f5e] dark:shadow-[4px_4px_0px_#e11d48] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#f43f5e] dark:hover:shadow-[6px_6px_0px_#e11d48] transition-all duration-200 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-none border border-purple-500/30 flex items-center justify-center mb-8">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white mb-3">Advanced matching</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  Our algorithm processes lifestyle habits, emotional values, and dating expectations to generate an accurate compatibility score, helping narrow down options.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#faf6f6] dark:bg-slate-950 p-8 border-4 border-slate-950 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_#f43f5e] dark:shadow-[4px_4px_0px_#e11d48] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#f43f5e] dark:hover:shadow-[6px_6px_0px_#e11d48] transition-all duration-200 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-none border border-indigo-500/30 flex items-center justify-center mb-8">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white mb-3">Tiered Membership Control</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  Choose exactly how you want to interact, from comfortable secure messaging to real-time high-definition video calling or dedicated 1-on-1 expert matching support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Matching Works (Step by Step) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-rose-500 font-bold">Methodology</h2>
            <h3 className="text-3xl sm:text-5xl font-sans uppercase italic font-black tracking-tighter text-slate-950 dark:text-white mt-2">How Matching Works</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              Simple, logical, and structured step-by-step framework to guide you from registration to genuine relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Step 1 */}
            <div className="text-center space-y-5 bg-white dark:bg-slate-900 p-6 border-2 border-slate-950 dark:border-slate-800">
              <div className="w-14 h-14 bg-rose-600 text-white font-mono rounded-none border-2 border-slate-950 flex items-center justify-center font-black mx-auto text-xl shadow-[4px_4px_0px_#000000]">1</div>
              <h4 className="text-lg font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white">Build Your Profile</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans px-2">
                Complete our intuitive personality evaluation and share your authentic hobbies, background, and relationship goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-5 bg-white dark:bg-slate-900 p-6 border-2 border-slate-950 dark:border-slate-800">
              <div className="w-14 h-14 bg-purple-600 text-white font-mono rounded-none border-2 border-slate-950 flex items-center justify-center font-black mx-auto text-xl shadow-[4px_4px_0px_#000000]">2</div>
              <h4 className="text-lg font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white">Discover Orbits</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans px-2">
                Review verified profiles curated specifically based on high compatibility scores, location metrics, and preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-5 bg-white dark:bg-slate-900 p-6 border-2 border-slate-950 dark:border-slate-800">
              <div className="w-14 h-14 bg-indigo-500 text-white font-mono rounded-none border-2 border-slate-950 flex items-center justify-center font-black mx-auto text-xl shadow-[4px_4px_0px_#000000]">3</div>
              <h4 className="text-lg font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white">Converse Securely</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans px-2">
                Exchange rich messages, visit profiles, and safely interact with built-in voice messages or encrypted video calls.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-5 bg-white dark:bg-slate-900 p-6 border-2 border-slate-950 dark:border-slate-800">
              <div className="w-14 h-14 bg-amber-500 text-white font-mono rounded-none border-2 border-slate-950 flex items-center justify-center font-black mx-auto text-xl shadow-[4px_4px_0px_#000000]">4</div>
              <h4 className="text-lg font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white">Meet & Align</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans px-2">
                Transition to the real world with curated local events or personal matchmaking support, forging deep lasting relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Success Stories */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t-4 border-slate-950 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-rose-500 font-bold">Success Stories</h2>
              <h3 className="text-3xl sm:text-5xl font-sans uppercase italic font-black tracking-tighter text-slate-950 dark:text-white mt-2">Happily Aligned Orbits</h3>
            </div>
            <button
              id="view-all-stories-btn"
              onClick={() => {
                setCurrentPage('stories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 md:mt-0 px-6 py-3.5 bg-transparent text-slate-950 dark:text-white border-2 border-slate-950 dark:border-slate-750 hover:bg-slate-950 hover:text-white dark:hover:bg-slate-800 font-mono text-xs uppercase tracking-[0.2em] font-black rounded-none transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <span>View All Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {SUCCESS_STORIES.map((story) => (
              <div key={story.id} className="bg-white dark:bg-slate-950 rounded-none border-4 border-slate-950 dark:border-slate-800 flex flex-col h-full hover:border-rose-500 dark:hover:border-rose-500 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_rgba(244,63,94,0.1)] transition-all duration-300 overflow-hidden">
                <div className="h-56 overflow-hidden relative border-b-2 border-slate-950 dark:border-slate-800">
                  <img
                    src={story.image}
                    alt={story.names}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-[9px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-none border border-slate-950">
                    {story.location}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-rose-500">{story.date}</p>
                    <h4 className="text-xl font-sans uppercase font-black tracking-tight text-slate-950 dark:text-white">{story.names}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic font-sans">
                      "{story.story}"
                    </p>
                  </div>
                  <div className="pt-4 border-t-2 border-dashed border-slate-100 dark:border-slate-800/60 flex justify-between text-[11px] text-slate-400 font-semibold font-mono">
                    <span>TIMELINE:</span>
                    <span className="text-rose-500 uppercase tracking-wider">{story.durationBeforeMeeting}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Plans Preview & CTA */}
      <section className="py-24 bg-slate-950 text-white relative border-t-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-rose-400 font-bold">Unlock Premium Matches</h2>
            <h3 className="text-3xl sm:text-5xl font-sans uppercase italic font-black tracking-tighter text-white">Flexible Membership Options</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-sans">
              Whether you want standard secure messaging or 1-on-1 expert coaching introductions, we offer four tiered plans tailored precisely around your dating commitment levels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-slate-900 border-4 ${plan.popular ? 'border-rose-500 shadow-[8px_8px_0px_#f43f5e]' : 'border-slate-800'} rounded-none p-8 flex flex-col justify-between h-full relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-mono uppercase font-black tracking-widest px-4 py-1.5 rounded-none border-2 border-slate-950">
                    Most Popular
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-sans uppercase font-black tracking-tight text-white">{plan.name}</h4>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-mono font-black text-white">${plan.priceMonthly}</span>
                    <span className="text-slate-400 text-xs font-mono ml-2">/ MO</span>
                  </div>
                  <ul className="mt-8 space-y-4 text-xs text-slate-300 border-t border-slate-800 pt-6">
                    {plan.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-slate-300 leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  id={`home-plan-btn-${plan.id}`}
                  onClick={() => {
                    setCurrentPage('plans');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full py-4.5 mt-10 text-xs font-mono uppercase tracking-[0.15em] font-black rounded-none cursor-pointer transition-all ${
                    plan.popular
                      ? 'bg-rose-600 text-white hover:bg-rose-500 border border-transparent'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-750'
                  }`}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 pt-8 border-t border-slate-900">
            <p className="text-xs font-mono text-slate-400">
              Not sure which plan matches your goals? <span onClick={() => setCurrentPage('contact')} className="text-rose-400 underline cursor-pointer hover:text-rose-300">Consult with our Matchmakers</span> or take our alignment quiz.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Sign-Up */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t-4 border-slate-950 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex p-4 bg-rose-500/10 text-rose-500 rounded-none border border-rose-500/20">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-sans uppercase italic font-black tracking-tighter text-slate-950 dark:text-white">Subscribe to "The Alignment"</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            Get monthly relationship guidance, dating insights from certified psychologists, green flag spotlights, and exclusive invitations to local singles mixers.
          </p>

          <div className="max-w-md mx-auto pt-4">
            {newsletterSuccess ? (
              <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-none text-xs font-mono uppercase tracking-wider border border-emerald-500/20 flex items-center justify-center space-x-2">
                <BadgeCheck className="w-5 h-5 flex-shrink-0" />
                <span>You are subscribed! Check your inbox for our Relationship Starter Kit.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 border-2 border-slate-950 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-none text-sm focus:outline-none focus:border-rose-500 font-sans"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-widest font-black rounded-none shadow-[3px_3px_0px_#000000] border border-slate-950 transition-all cursor-pointer flex-shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}
            <p className="text-[10px] font-mono text-slate-400 mt-4">
              Zero spam. Unsubscribe at any time. We respect your security and digital boundary settings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
