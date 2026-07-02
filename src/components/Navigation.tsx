/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Heart, Globe, User, LogOut, Moon, Sun } from 'lucide-react';
import { Page, UserProfile } from '../types';

interface NavigationProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
  currentUser,
  onLogout,
  darkMode,
  toggleDarkMode,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Membership Plans', page: 'plans' },
    { label: 'Success Stories', page: 'stories' },
    { label: 'Blog', page: 'blog' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav id="nav-container" className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b-4 border-slate-950 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative w-8 h-8 mr-3 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-rose-500 opacity-50 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_12px_#fb7185]"></div>
              <div className="absolute inset-0 rounded-full border border-slate-500 rotate-45"></div>
            </div>
            <span className="font-sans font-black text-xl tracking-tighter uppercase italic text-slate-950 dark:text-white">
              Planet <span className="text-rose-500 font-black">Singles</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  id={`nav-link-${link.page}`}
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-2.5 rounded-none text-xs font-mono uppercase tracking-widest font-black transition-all duration-150 ${
                    isActive
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Panel (Actions & Theme) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-none text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-350 dark:hover:border-slate-800 transition-all"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                <button
                  id="nav-to-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center space-x-2 text-xs font-mono uppercase tracking-wider font-black px-4 py-2.5 rounded-none border border-slate-950 dark:border-slate-750 transition-all duration-200 ${
                    currentPage === 'dashboard'
                      ? 'bg-rose-600 text-white shadow-[2px_2px_0px_#000000]'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                  }`}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-none border border-slate-950 dark:border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>Dashboard</span>
                  {currentUser.membership !== 'Free' && (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-rose-600 text-white border border-slate-950">
                      {currentUser.membership}
                    </span>
                  )}
                </button>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-red-950/20 rounded-none transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                <button
                  id="nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-black text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  Login
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-black text-white bg-rose-600 hover:bg-rose-500 border border-slate-950 dark:border-white rounded-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#ffffff] transition-all"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              id="theme-toggle-mobile"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 transition-all">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                id={`mobile-nav-link-${link.page}`}
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 space-y-2">
            {currentUser ? (
              <>
                <button
                  id="mobile-nav-to-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-base font-semibold"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border border-indigo-200 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-sm font-bold">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 font-normal">Go to Dashboard ({currentUser.membership} Membership)</p>
                  </div>
                </button>
                <button
                  id="mobile-nav-logout"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 text-base font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-2">
                <button
                  id="mobile-nav-login"
                  onClick={() => handleNavClick('login')}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Login
                </button>
                <button
                  id="mobile-nav-signup"
                  onClick={() => handleNavClick('signup')}
                  className="w-full text-center py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-sm"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
