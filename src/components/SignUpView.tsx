/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Globe, Heart, ArrowRight, MapPin, Calendar, Briefcase, Sparkles } from 'lucide-react';
import { Page, UserProfile, MembershipTier } from '../types';

interface SignUpViewProps {
  setCurrentPage: (page: Page) => void;
  onSignUpSuccess: (user: UserProfile) => void;
}

export default function SignUpView({ setCurrentPage, onSignUpSuccess }: SignUpViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [interestedIn, setInterestedIn] = useState<'male' | 'female' | 'everyone'>('male');
  const [location, setLocation] = useState('Pasadena, CA');
  const [occupation, setOccupation] = useState('Creative Designer');
  const [bio, setBio] = useState('Just looking for an honest connection built around genuine conversations.');
  const [membership, setMembership] = useState<MembershipTier>('Free');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !location) return;

    // Use customized avatar depending on selection
    const avatar = gender === 'female'
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80';

    const user: UserProfile = {
      name,
      age: Number(age),
      gender,
      interestedIn,
      location,
      bio,
      avatar,
      images: [avatar],
      occupation,
      interests: ['Espresso', 'Literature', 'Sunset Strolls', 'Art History'],
      membership,
      billingPeriod: 'monthly',
      email,
      verified: membership !== 'Free' // automatically verify premium trials
    };

    onSignUpSuccess(user);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="signup-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/10 left-1/10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/10 right-1/10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-none p-8 border-4 border-slate-950 dark:border-slate-850 shadow-[10px_10px_0px_#000000] dark:shadow-[10px_10px_0px_#1e293b] space-y-6 relative z-10">
        
        {/* Brand Logo */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative mr-2 flex items-center justify-center w-9 h-9 rounded-none bg-rose-600 p-[2px] border-2 border-slate-950">
              <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-none">
                <Globe className="w-4 h-4 text-rose-400 absolute animate-pulse" />
                <Heart className="w-3 h-3 text-pink-500 absolute" />
              </div>
            </div>
            <span className="font-mono font-black text-xl tracking-tight text-slate-950 dark:text-white uppercase italic">
              Planet <span className="text-rose-500">Singles</span>
            </span>
          </div>
          <h2 className="text-lg font-mono uppercase font-black text-slate-950 dark:text-white leading-none">Create Your Dating Profile</h2>
          <p className="text-xs text-slate-400 font-sans">Where Meaningful Connections Begin.</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Age */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Age</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  required
                  min={18}
                  max={99}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">I am a</label>
              <select
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
                className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-700 dark:text-slate-300 text-xs font-mono focus:outline-none"
              >
                <option value="female">Woman</option>
                <option value="male">Man</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Seeking */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Seeking a</label>
              <select
                value={interestedIn}
                onChange={(e: any) => setInterestedIn(e.target.value)}
                className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-700 dark:text-slate-300 text-xs font-mono focus:outline-none"
              >
                <option value="male">Man</option>
                <option value="female">Woman</option>
                <option value="everyone">Everyone</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Location */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Proximity Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Pasadena, CA"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Occupation</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="E.g. Creative Designer"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Bio */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Introduce Yourself (Dating Bio)</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other singles who you are, what you enjoy doing, and what your perfect orbit looks like..."
              className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-sans focus:outline-none leading-relaxed"
            />
          </div>

          {/* Select Initial Membership plan */}
          <div className="p-5 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none space-y-3 shadow-[4px_4px_0px_#000000]">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-rose-500 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Select Initial Membership Orbit</span>
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
              {(['Free', 'Silver', 'Gold', 'Platinum'] as MembershipTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setMembership(tier)}
                  className={`p-3.5 border-2 transition-all cursor-pointer rounded-none uppercase tracking-wider font-black ${
                    membership === tier
                      ? 'bg-rose-600 border-slate-950 dark:border-white text-white shadow-[2px_2px_0px_#000000]'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-widest font-black text-xs border-2 border-slate-950 dark:border-white rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Launch Dating Orbit</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </form>

        {/* Toggle option */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-sans">
            Already have an account?{' '}
            <span onClick={() => setCurrentPage('login')} className="text-rose-500 font-mono font-black uppercase underline cursor-pointer hover:text-rose-600">
              Access Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
