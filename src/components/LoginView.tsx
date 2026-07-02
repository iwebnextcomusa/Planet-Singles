/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Globe, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { Page, UserProfile } from '../types';

interface LoginViewProps {
  setCurrentPage: (page: Page) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function LoginView({ setCurrentPage, onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demoAccounts = [
    { email: 'admin@planetsingles.com', name: 'Elena Rostova', age: 28, membership: 'Platinum' },
    { email: 'free_demo@planetsingles.com', name: 'James Carter', age: 30, membership: 'Free' }
  ];

  const handleDemoSelect = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword('demo_password_123');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide all credentials.');
      return;
    }

    // Accept any valid looking credentials
    const isFree = email.includes('free_demo');
    const name = isFree ? 'James Carter' : 'Elena Rostova';
    const age = isFree ? 30 : 28;
    const membership = isFree ? 'Free' : 'Platinum';
    const avatar = isFree 
      ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80';

    const user: UserProfile = {
      name,
      age,
      gender: isFree ? 'male' : 'female',
      interestedIn: 'everyone',
      location: isFree ? 'Pasadena, CA' : 'Beverly Hills, CA',
      bio: isFree 
        ? 'Dating trial profile for testing the Planet Singles interface.' 
        : 'Art historian and weekend climber. Seeking an intellectual partner to explore mountains and galleries.',
      avatar,
      images: [avatar],
      occupation: isFree ? 'Product Specialist' : 'Museum Curator',
      interests: ['Adventure', 'Literature', 'Espresso', 'Art History'],
      membership: membership as any,
      billingPeriod: 'monthly',
      email,
      verified: true
    };

    onLoginSuccess(user);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="login-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/10 left-1/10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/10 right-1/10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-none p-8 border-4 border-slate-950 dark:border-slate-850 shadow-[10px_10px_0px_#000000] dark:shadow-[10px_10px_0px_#1e293b] space-y-6 relative z-10">
        
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
          <h2 className="text-lg font-mono uppercase font-black text-slate-950 dark:text-white leading-none">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-sans">Where Meaningful Connections Begin.</p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-center py-2 bg-rose-500/10 text-rose-500 rounded-none text-xs font-mono font-black border-2 border-rose-500/20">{error}</div>}

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@planetsingles.com"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest font-black text-slate-450 dark:text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800 rounded-none text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
            <label className="flex items-center space-x-1.5 text-slate-500 cursor-pointer">
              <input type="checkbox" className="rounded-none border-2 border-slate-950" />
              <span>Remember me</span>
            </label>
            <span className="text-rose-600 hover:text-rose-500 font-bold cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono uppercase tracking-widest font-black text-xs border-2 border-slate-950 dark:border-white rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Access Dashboard</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-5 border-t-2 border-slate-100 dark:border-slate-800 space-y-3">
          <p className="text-[9px] uppercase font-mono font-black text-slate-400 tracking-widest text-center">Quick Demo Accounts (Instant Test)</p>
          <div className="grid grid-cols-2 gap-3 text-center text-[10px] font-mono">
            {demoAccounts.map((ac) => (
              <button
                key={ac.email}
                onClick={() => handleDemoSelect(ac)}
                className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white font-black uppercase border-2 border-slate-950 hover:bg-rose-600 hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_#000000]"
              >
                {ac.name.split(' ')[0]} ({ac.membership})
              </button>
            ))}
          </div>
        </div>

        {/* Toggle option */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-sans">
            Do not have an account?{' '}
            <span onClick={() => setCurrentPage('signup')} className="text-rose-500 font-mono font-black uppercase underline cursor-pointer hover:text-rose-600">
              Register Free
            </span>
          </p>
        </div>

        {/* Security guarantee */}
        <div className="bg-slate-50 dark:bg-slate-950/50 rounded-none p-3.5 flex items-center space-x-2.5 text-[9px] font-mono uppercase tracking-wider text-slate-450 border-2 border-slate-950">
          <ShieldCheck className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <span>Secured encryption. Verified safe portal.</span>
        </div>
      </div>
    </div>
  );
}
