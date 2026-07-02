/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Stars, Calendar, MapPin, Smile, Send, CheckCircle } from 'lucide-react';
import { Page } from '../types';
import { SUCCESS_STORIES } from '../data';

interface SuccessStoriesViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function SuccessStoriesView({ setCurrentPage }: SuccessStoriesViewProps) {
  const [formSuccess, setFormSuccess] = useState(false);
  const [names, setNames] = useState('');
  const [storyText, setStoryText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!names || !storyText) return;
    setFormSuccess(true);
    setNames('');
    setStoryText('');
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div id="stories-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Happily Ever After</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Stories</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Read about actual couples who found their perfect orbits, built secure partnerships, and started lifelong journeys together.
          </p>
        </div>
      </section>

      {/* Stories Listing */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SUCCESS_STORIES.map((story, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={story.id}
              className={`bg-white dark:bg-slate-900 rounded-none overflow-hidden border-4 border-slate-950 dark:border-slate-800 shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#1e293b] hover:shadow-[10px_10px_0px_#fb7185] dark:hover:shadow-[10px_10px_0px_#fb7185] flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } transition-all duration-300`}
            >
              {/* Photo Area */}
              <div className="lg:w-1/2 h-72 sm:h-96 relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.names}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 space-y-2 text-white">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase font-bold text-rose-400 bg-slate-950 px-3 py-1 border border-slate-800">
                    <MapPin className="w-3 h-3" />
                    <span>{story.location}</span>
                  </div>
                  <h3 className="text-2xl font-mono uppercase font-black">{story.names}</h3>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{story.date}</p>
                </div>
              </div>

              {/* Narratives Area */}
              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
                    <Stars className="w-5 h-5 fill-rose-600 dark:fill-rose-400" />
                    <span className="text-xs font-mono uppercase tracking-widest font-black">Matched Orbit Summary</span>
                  </div>
                  
                  <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed italic font-sans">
                    "{story.story}"
                  </p>
                </div>

                {/* Timeline metadata */}
                <div className="pt-6 border-t-2 border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-450 dark:text-slate-500 font-mono uppercase tracking-wider text-[9px] font-bold">First Connection</p>
                    <p className="text-slate-950 dark:text-white font-mono uppercase font-black text-xs mt-1">Planet Singles Dashboard</p>
                  </div>
                  <div>
                    <p className="text-slate-450 dark:text-slate-500 font-mono uppercase tracking-wider text-[9px] font-bold">Days Before First Date</p>
                    <p className="text-rose-500 font-mono uppercase font-black text-xs mt-1">{story.durationBeforeMeeting}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Share Your Story Form */}
      <section className="bg-slate-50 dark:bg-slate-900 border-t-4 border-slate-950 dark:border-slate-850 py-24">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Information */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="inline-flex p-3 bg-rose-500/10 border-2 border-rose-500/20 text-rose-500 rounded-none">
              <Smile className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase italic leading-none">Are You a Planet Singles Couple?</h3>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
              Did you find your partner on our platform? We would love to hear your story! Submit your details and we might feature you on our page. Featured couples receive a luxurious anniversary weekend package courtesy of Planet Singles.
            </p>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white dark:bg-slate-950 p-8 border-4 border-slate-950 dark:border-slate-800 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b]">
            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-500 rounded-none">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-mono uppercase font-black text-slate-950 dark:text-white text-sm">Story Received!</h4>
                <p className="text-xs text-slate-500 font-sans">
                  Thank you for sharing your beautiful journey with us. Our Relationship Board will reach out shortly via email!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h4 className="font-mono uppercase font-black text-sm text-slate-950 dark:text-white tracking-widest border-b-2 border-slate-100 dark:border-slate-800 pb-3">Share Your Orbit</h4>
                
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Your Names</label>
                  <input
                    type="text"
                    required
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    placeholder="Sophia & Liam, etc."
                    className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Briefly Describe Your Story</label>
                  <textarea
                    required
                    rows={4}
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    placeholder="Describe how you matched, what tier you were on, your first meeting, and how life is today..."
                    className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-sans focus:outline-none focus:ring-1 focus:ring-rose-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-widest font-black text-xs border-2 border-slate-950 dark:border-white rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Story Draft</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
