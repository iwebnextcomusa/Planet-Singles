/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Globe, Phone, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleLinkClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container" className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
              <img
                src="/logo.jpg"
                alt="Planet Singles Logo"
                className="w-10 h-10 mr-3 object-cover border-2 border-slate-950 dark:border-white rounded-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff]"
              />
              <span className="font-sans font-black text-xl tracking-tighter uppercase italic text-white">
                Planet <span className="text-rose-500 font-black">Singles</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "Where Meaningful Connections Begin." Connecting singles globally through sophisticated matching, personal coaching, and tiered options built around sincere relationship goals.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Verified Secure & Private Dating Platform</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">Explore Planet</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('how-it-works')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('plans')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('stories')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-pink-400 hover:underline transition-colors text-left w-full">
                  Relationship Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">Contact Us</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a href="tel:6266969234" className="hover:text-pink-400 transition-colors">
                  626-696-9234
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <Mail className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:daniel.mills36@aol.com" className="hover:text-pink-400 transition-all break-all">
                  daniel.mills36@aol.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>100 N Garfield Ave, Pasadena, CA 91101, USA</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">Office Hours</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <div className="text-slate-400">
                  <p className="font-semibold text-slate-300">Matchmaking Concierge:</p>
                  <p className="text-xs">Mon - Fri: 8:00 AM - 8:00 PM PST</p>
                  <p className="text-xs">Sat: 10:00 AM - 4:00 PM PST</p>
                  <p className="text-xs text-indigo-400">Sun: Closed (Support Available Online)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright/legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p>&copy; {currentYear} Planet Singles Inc. "Where Meaningful Connections Begin." All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <span className="text-slate-700">|</span>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <span className="text-slate-700">|</span>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
            <span className="text-slate-700">|</span>
            <button onClick={() => handleLinkClick('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
