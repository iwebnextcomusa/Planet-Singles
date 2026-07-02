/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, Globe, Heart } from 'lucide-react';
import { Page } from '../types';

interface ContactViewProps {
  setCurrentPage: (page: Page) => void;
}

export default function ContactView({ setCurrentPage }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Clear success notification after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div id="contact-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Matchmakers</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Have questions about our compatibility algorithm, premium upgrades, or offline mixers? Send us a message or call us directly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Parameters & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-none border-4 border-slate-950 dark:border-slate-850 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b] space-y-6">
              <h3 className="text-lg font-mono uppercase font-black text-slate-950 dark:text-white border-l-4 border-rose-600 pl-3">Direct Details</h3>
              <p className="text-xs text-slate-500 font-sans">Reach out directly to speak with a verified representative.</p>
              
              <ul className="space-y-5 text-sm font-sans">
                {/* Phone */}
                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-rose-500/10 border-2 border-slate-950 dark:border-rose-500/20 text-rose-500 rounded-none">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-widest font-black text-slate-450">Phone Call (Hotline)</p>
                    <a href="tel:6266969234" className="text-base font-mono uppercase font-black text-slate-950 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      626-696-9234
                    </a>
                    <p className="text-[10px] text-slate-400 mt-0.5">Toll-free across North America</p>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-rose-500/10 border-2 border-slate-950 dark:border-rose-500/20 text-rose-500 rounded-none">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-mono uppercase tracking-widest font-black text-slate-450">Email Inquiry</p>
                    <a href="mailto:daniel.mills36@aol.com" className="text-sm font-mono font-black text-slate-950 dark:text-white hover:text-rose-600 transition-colors break-all">
                      daniel.mills36@aol.com
                    </a>
                    <p className="text-[10px] text-slate-400 mt-0.5">Response within 12 business hours</p>
                  </div>
                </li>

                {/* Headquarters */}
                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-rose-500/10 border-2 border-slate-950 dark:border-rose-500/20 text-rose-500 rounded-none">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-widest font-black text-slate-450">Global Headquarters</p>
                    <p className="text-sm font-mono uppercase font-black text-slate-950 dark:text-white">100 N Garfield Ave</p>
                    <p className="text-[10px] text-slate-500">Pasadena, CA 91101, USA</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Office hours */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-none border-4 border-slate-950 dark:border-slate-850 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b] space-y-4">
              <h3 className="text-lg font-mono uppercase font-black text-slate-950 dark:text-white border-l-4 border-rose-600 pl-3 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-rose-500" />
                <span>Business Hours</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our support lines are monitored around the clock, while manual matchmaking coaches consult during the following hours:
              </p>
              <div className="space-y-2 text-xs border-t-2 border-slate-100 dark:border-slate-800/80 pt-4 font-mono uppercase">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Monday - Friday:</span>
                  <span className="text-slate-950 dark:text-white font-black">8:00 AM - 8:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Saturday:</span>
                  <span className="text-slate-950 dark:text-white font-black">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between text-rose-600 dark:text-rose-450 font-bold">
                  <span>Sunday:</span>
                  <span>Closed (Tickets Monitored)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-none border-4 border-slate-950 dark:border-slate-850 shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#1e293b]">
            {success ? (
              <div className="text-center py-20 space-y-4">
                <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-500 rounded-none">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="font-mono uppercase font-black text-xl text-slate-950 dark:text-white">Message Dispatched!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out. A certified relationship coach from Planet Singles will respond to your email at <span className="font-bold text-rose-600 dark:text-rose-400">daniel.mills36@aol.com</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-mono uppercase font-black text-slate-950 dark:text-white border-b-2 border-slate-100 dark:border-slate-800 pb-3">Send Us a Direct Message</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Fields marked with an asterisk (*) are required.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 mb-1.5">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@example.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 mb-1.5">Subject (Optional)</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="E.g. Membership billing, custom matching questions..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-sans focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed questions, relationship requirements, or notes..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white font-sans focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-widest font-black text-xs border-2 border-slate-950 dark:border-white rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting Orbit...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* HQ Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-none border-4 border-slate-950 dark:border-slate-850 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-mono uppercase font-black text-base text-slate-950 dark:text-white">Planet Singles Pasadena HQ</h4>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">100 N Garfield Ave, Pasadena, CA</p>
            </div>
            <div className="flex items-center space-x-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-rose-600 bg-rose-500/10 px-3 py-1 border border-rose-500/20">
              <Globe className="w-3.5 h-3.5" />
              <span>HQ Coordinates</span>
            </div>
          </div>

          {/* Map area */}
          <div className="h-64 sm:h-80 bg-slate-150 dark:bg-slate-950 rounded-none relative overflow-hidden border-4 border-slate-950 dark:border-slate-800 flex items-center justify-center">
            {/* Map Roads lines (Vector style) */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="w-full h-[1px] bg-slate-950 absolute top-1/4"></div>
              <div className="w-full h-[1px] bg-slate-950 absolute top-2/3"></div>
              <div className="w-full h-[1px] bg-slate-950 absolute top-1/2"></div>
              <div className="h-full w-[1px] bg-slate-950 absolute left-1/4"></div>
              <div className="h-full w-[1px] bg-slate-950 absolute left-2/3"></div>
              <div className="h-full w-[1px] bg-slate-950 absolute left-1/2"></div>
              <div className="h-full w-[1px] bg-slate-950 absolute left-1/10 rotate-12"></div>
              <div className="w-full h-[1px] bg-slate-950 absolute top-1/10 -rotate-12"></div>
            </div>

            {/* Pulse Marker */}
            <div className="relative flex flex-col items-center">
              <div className="absolute -top-6 w-16 h-16 bg-rose-500/35 rounded-full animate-ping"></div>
              <div className="absolute -top-3 w-10 h-10 bg-purple-500/20 rounded-full"></div>
              
              <div className="z-10 flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-950 border-2 border-rose-500 rounded-none shadow-lg relative">
                <Globe className="w-5 h-5 text-rose-600 absolute" />
                <Heart className="w-4 h-4 text-rose-500 absolute animate-pulse" />
              </div>
              <div className="mt-3 bg-slate-950 text-white text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 border border-slate-800 shadow-[2px_2px_0px_#fb7185]">
                Planet Singles HQ
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
