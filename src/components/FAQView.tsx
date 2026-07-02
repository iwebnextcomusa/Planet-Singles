/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Page, FAQItem } from '../types';
import { FAQ_ITEMS } from '../data';

interface FAQViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function FAQView({ setCurrentPage }: FAQViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('1'); // Keep first open by default

  const categories = [
    { key: 'All', label: 'All Questions' },
    { key: 'general', label: 'General Orbit' },
    { key: 'membership', label: 'Memberships & Billing' },
    { key: 'safety', label: 'Safety & Verification' },
    { key: 'technical', label: 'Technical Support' },
  ];

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="faq-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Knowledge Base</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            FAQ<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">s</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Have questions about compatibility metrics, payment safety, or matchmaking? Find immediate solutions below.
          </p>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto border-4 border-slate-950 dark:border-slate-850 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#1e293b] rounded-none overflow-hidden">
          <Search className="w-5 h-5 text-slate-450 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. verification, video calls)..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-none text-xs font-mono focus:outline-none"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-black rounded-none border-2 transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-rose-600 border-slate-950 dark:border-white text-white shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff]'
                  : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-6">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 border-4 border-slate-950 dark:border-slate-850 rounded-none overflow-hidden shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#1e293b] transition-all duration-250"
              >
                {/* Accordion header button */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center space-x-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 cursor-pointer"
                >
                  <span className="font-mono uppercase font-black text-sm sm:text-base text-slate-950 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <span className="text-slate-400 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </span>
                </button>

                {/* Accordion content body */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed border-t-2 border-slate-100 dark:border-slate-800/80 whitespace-pre-line font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-none border-4 border-slate-950 dark:border-slate-800 space-y-4">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-mono uppercase font-black text-slate-950 dark:text-white">No FAQ match found</h4>
            <p className="text-xs text-slate-500 font-sans">Try searching for other terms or view another category.</p>
          </div>
        )}
      </section>

      {/* Support box */}
      <section className="bg-slate-950 text-white py-16 border-t-4 border-slate-950 dark:border-slate-850">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-black flex items-center justify-center md:justify-start space-x-2.5 uppercase italic">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
              <span>Still Have Questions?</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto md:mx-0 font-sans">
              Our support board and certified matchmakers are here to assist. We offer quick email support and direct matchmaking phone assistance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 text-xs font-mono">
            <a
              href="tel:6266969234"
              className="flex items-center space-x-1.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-none font-bold border-2 border-slate-800 transition-all text-white"
            >
              <Phone className="w-4 h-4" />
              <span>Call 626-696-9234</span>
            </a>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-rose-600 text-white hover:bg-rose-500 rounded-none font-black uppercase tracking-widest border-2 border-slate-950 dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>Contact Experts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
