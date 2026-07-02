/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import HowItWorksView from './components/HowItWorksView';
import PlansView from './components/PlansView';
import SuccessStoriesView from './components/SuccessStoriesView';
import BlogView from './components/BlogView';
import FAQView from './components/FAQView';
import ContactView from './components/ContactView';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import Dashboard from './components/Dashboard';
import { Page, UserProfile, MembershipTier } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  
  // Theme state: default to dark for premium romantic aesthetics
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('planet_singles_theme');
    return saved ? saved === 'dark' : true;
  });

  // Track user session inside localStorage to prevent resets on accidental reloads
  useEffect(() => {
    const cachedUser = localStorage.getItem('planet_singles_user');
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (err) {
        console.error('Failed to parse cached user', err);
      }
    }
  }, []);

  // Sync Dark Mode state to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('planet_singles_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('planet_singles_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('planet_singles_user', JSON.stringify(user));
  };

  const handleSignUpSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('planet_singles_user', JSON.stringify(user));
  };

  // Fast quick register flow directly from Home Hero
  const handleQuickSignUp = (name: string, email: string) => {
    const user: UserProfile = {
      name,
      age: 26,
      gender: 'female',
      interestedIn: 'everyone',
      location: 'Pasadena, CA',
      bio: 'Ready to discover romantic orbits on Planet Singles!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
      images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80'],
      occupation: 'Consultant',
      interests: ['Espresso', 'Literature', 'Yoga'],
      membership: 'Free',
      billingPeriod: 'monthly',
      email,
      verified: false,
    };
    handleSignUpSuccess(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('planet_singles_user');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('planet_singles_user', JSON.stringify(updatedUser));
  };

  const handleSelectPlan = (tier: MembershipTier, billing: 'monthly' | 'annually') => {
    if (currentUser) {
      const updated: UserProfile = {
        ...currentUser,
        membership: tier,
        billingPeriod: billing,
        verified: true, // Auto-verify on purchase
      };
      handleUpdateUser(updated);
    }
  };

  // Render correct page view depending on current routing state
  const renderPageView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} onQuickSignUp={handleQuickSignUp} />;
      case 'about':
        return <AboutView setCurrentPage={setCurrentPage} />;
      case 'how-it-works':
        return <HowItWorksView setCurrentPage={setCurrentPage} />;
      case 'plans':
        return (
          <PlansView
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'stories':
        return <SuccessStoriesView setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <BlogView setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQView setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactView setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginView setCurrentPage={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignUpView setCurrentPage={setCurrentPage} onSignUpSuccess={handleSignUpSuccess} />;
      case 'dashboard':
        if (!currentUser) {
          // Guard Dashboard route
          return <LoginView setCurrentPage={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
        }
        return (
          <Dashboard
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        );
      default:
        return <HomeView setCurrentPage={setCurrentPage} onQuickSignUp={handleQuickSignUp} />;
    }
  };

  return (
    <div id="app-root-wrapper" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between transition-colors duration-300">
      <div>
        <Navigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main id="app-content-stage" className="flex-grow">
          {renderPageView()}
        </main>
      </div>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
