/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Calendar, User, ArrowLeft, ThumbsUp, Heart, X } from 'lucide-react';
import { Page, BlogPost } from '../types';
import { BLOG_POSTS } from '../data';

interface BlogViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function BlogView({ setCurrentPage }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Simulated like counters
  const [reactions, setReactions] = useState<Record<string, { likes: number; hearts: number }>>({
    '1': { likes: 34, hearts: 56 },
    '2': { likes: 18, hearts: 22 },
    '3': { likes: 45, hearts: 39 },
  });

  const categories = ['All', 'Dating Advice', 'Profile Tips', 'Industry Insights'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const handleReaction = (postId: string, type: 'likes' | 'hearts') => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [type]: prev[postId][type] + 1
      }
    }));
  };

  return (
    <div id="blog-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">The Alignment Journal</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            Relationship <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Blog</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Psychological dating advice, profile building optimization secrets, and romance insights curated by our coaches.
          </p>
        </div>
      </section>

      {/* Category Selectors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap justify-center gap-3 border-b-4 border-slate-950 dark:border-slate-850">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActivePost(null);
            }}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-black rounded-none border-2 transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-rose-600 border-slate-950 dark:border-white text-white shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff]'
                : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const rx = reactions[post.id] || { likes: 0, hearts: 0 };
            return (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-none overflow-hidden border-4 border-slate-950 dark:border-slate-850 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b] hover:shadow-[8px_8px_0px_#fb7185] dark:hover:shadow-[8px_8px_0px_#fb7185] transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => setActivePost(post)}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-rose-600 text-white text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 border border-slate-950">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-slate-400 text-[10px] font-mono uppercase font-bold">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3
                      onClick={() => setActivePost(post)}
                      className="text-base sm:text-lg font-mono uppercase font-black text-slate-950 dark:text-white leading-snug hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card footer: Reactions & Read More */}
                <div className="p-6 pt-4 border-t-2 border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleReaction(post.id, 'likes')}
                      className="flex items-center space-x-1 hover:text-rose-600 transition-colors cursor-pointer text-[10px] uppercase font-bold"
                      title="Like this article"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{rx.likes}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'hearts')}
                      className="flex items-center space-x-1 hover:text-rose-600 transition-colors cursor-pointer text-[10px] uppercase font-bold"
                      title="Heart this article"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{rx.hearts}</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setActivePost(post)}
                    className="font-black text-rose-600 dark:text-rose-400 hover:text-rose-500 flex items-center space-x-1 cursor-pointer uppercase text-[10px] tracking-widest"
                  >
                    <span>Read</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full-Article Modal View */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-none overflow-hidden shadow-[12px_12px_0px_#000000] border-4 border-slate-950 dark:border-slate-800 max-h-[90vh] flex flex-col transition-all">
            
            {/* Modal Header Control */}
            <div className="p-5 border-b-4 border-slate-950 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/40">
              <button
                onClick={() => setActivePost(null)}
                className="text-xs font-mono uppercase tracking-widest font-black text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Journal</span>
              </button>
              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 border border-transparent hover:border-slate-350 dark:hover:border-slate-800 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono uppercase font-black tracking-widest text-rose-600 bg-rose-500/10 px-3 py-1.5 border border-rose-500/25">
                  {activePost.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-mono uppercase font-black text-slate-950 dark:text-white leading-tight">
                  {activePost.title}
                </h2>

                <div className="flex items-center space-x-4 text-slate-400 text-[10px] font-mono uppercase font-bold">
                  <span className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                    <User className="w-4 h-4 text-rose-500" />
                    <span>{activePost.author}</span>
                  </span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>

              {/* Large Image */}
              <div className="h-64 sm:h-80 border-4 border-slate-950 dark:border-slate-850 rounded-none overflow-hidden">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Core Text Body */}
              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-650 dark:text-slate-300 space-y-4 whitespace-pre-line font-sans">
                {activePost.content}
              </div>

              {/* Share/Reaction Foot */}
              <div className="pt-6 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Did you find this article helpful?</p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleReaction(activePost.id, 'likes')}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-950 dark:border-slate-700 text-xs font-mono uppercase font-black hover:text-rose-500 cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{reactions[activePost.id]?.likes || 0} Likes</span>
                  </button>
                  <button
                    onClick={() => handleReaction(activePost.id, 'hearts')}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-950 dark:border-slate-700 text-xs font-mono uppercase font-black hover:text-rose-500 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>{reactions[activePost.id]?.hearts || 0} Hearts</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
