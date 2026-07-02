/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, X, Shield, Sparkles, Award, Star, HelpCircle } from 'lucide-react';
import { Page, MembershipTier, UserProfile } from '../types';
import { MEMBERSHIP_PLANS } from '../data';

interface PlansViewProps {
  setCurrentPage: (page: Page) => void;
  currentUser: UserProfile | null;
  onSelectPlan: (tier: MembershipTier, billing: 'monthly' | 'annually') => void;
}

export default function PlansView({ setCurrentPage, currentUser, onSelectPlan }: PlansViewProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const handlePlanClick = (tier: MembershipTier) => {
    if (!currentUser) {
      setCurrentPage('signup');
    } else {
      onSelectPlan(tier, billingPeriod);
      setCurrentPage('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const comparisonRows = [
    { name: 'Profile Customization', free: true, silver: true, gold: true, platinum: true },
    { name: 'Profile Photo Upload Limit', free: '3 Photos', silver: '10 Photos', gold: 'Unlimited', platinum: 'Unlimited' },
    { name: 'Daily Match Recommendations', free: 'Limited (10)', silver: 'Unlimited', gold: 'Unlimited', platinum: 'Unlimited' },
    { name: 'Message Sent/Received', free: '5 messages/day', silver: 'Unlimited', gold: 'Unlimited', platinum: 'Unlimited' },
    { name: 'Advanced Search Filters', free: false, silver: true, gold: true, platinum: true },
    { name: 'Profile Visitor Tracking', free: false, silver: true, gold: true, platinum: true },
    { name: 'Priority Placement Rank', free: false, silver: false, gold: '2x Views', platinum: '5x Views' },
    { name: 'In-App Video Calling', free: false, silver: false, gold: true, platinum: true },
    { name: 'Read Receipts', free: false, silver: false, gold: true, platinum: true },
    { name: 'Compatibility Metrics', free: 'Basic', silver: 'Basic', gold: 'In-Depth', platinum: 'In-Depth' },
    { name: 'Personal Matchmaker Coach', free: false, silver: false, gold: false, platinum: true },
    { name: 'VIP Singles Event Invites', free: false, silver: false, gold: false, platinum: true },
    { name: 'Incognito Mode Browsing', free: false, silver: false, gold: false, platinum: true },
    { name: 'Verified Badge check', free: false, silver: false, gold: 'Self-check', platinum: 'Official Manual' },
  ];

  return (
    <div id="plans-view" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 md:py-28 text-center relative overflow-hidden border-b-4 border-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-500 bg-rose-500/10 px-3 py-1 border border-rose-500/20">Dating Investment</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            Membership <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Plans</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            "Where Meaningful Connections Begin." Select the plan matching your level of relationship intent. Save up to 25% with annual billing commitments.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle billing period */}
        <div className="flex justify-center items-center space-x-6 mb-20">
          <span className={`text-xs font-mono uppercase tracking-widest font-black ${billingPeriod === 'monthly' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`}>Monthly</span>
          <button
            id="billing-period-toggle"
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
            className="w-16 h-9 bg-slate-950 dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-none p-1 transition-all relative cursor-pointer"
          >
            <div className={`w-5 h-5 bg-rose-500 rounded-none transition-transform ${billingPeriod === 'annually' ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-mono uppercase tracking-widest font-black ${billingPeriod === 'annually' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`}>Annually</span>
            <span className="text-[9px] uppercase font-mono font-black tracking-wider bg-rose-600 text-white px-2.5 py-1 border border-slate-950 dark:border-white shadow-[1px_1px_0px_#000000] dark:shadow-[1px_1px_0px_#ffffff] animate-pulse">Save 25%</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isCurrent = currentUser?.membership === plan.id;
            const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnually;

            return (
              <div
                key={plan.id}
                className={`bg-white dark:bg-slate-900 p-8 border-4 ${
                  plan.popular
                    ? 'border-rose-500 dark:border-rose-500 shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#fb7185] scale-[1.03] lg:-translate-y-2'
                    : 'border-slate-950 dark:border-slate-850 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b]'
                } flex flex-col justify-between h-full relative overflow-hidden transition-all`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-rose-600 text-white font-mono font-black text-[9px] uppercase tracking-widest px-2.5 py-1 border border-slate-950 flex items-center space-x-1">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>Popular</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Title & Icon */}
                  <div>
                    <h3 className="text-lg font-mono uppercase font-black text-slate-950 dark:text-white">{plan.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1.5">Tier: {plan.id}</p>
                  </div>

                  {/* Pricing Indicator */}
                  <div className="pb-6 border-b-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline text-slate-950 dark:text-white">
                      <span className="text-4xl font-mono font-black tracking-tighter">${price}</span>
                      <span className="text-slate-500 font-mono text-xs ml-1 font-bold">/MO</span>
                    </div>
                    {billingPeriod === 'annually' && plan.priceAnnually > 0 && (
                      <p className="text-[10px] text-rose-500 font-mono uppercase tracking-wider font-bold mt-1.5">Billed Annually (${(price * 12).toFixed(2)}/yr)</p>
                    )}
                    {plan.priceMonthly === 0 && <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1.5">Free forever</p>}
                  </div>

                  {/* Feature Lists */}
                  <div className="space-y-3.5">
                    <p className="text-xs font-mono uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Included Features:</p>
                    <ul className="space-y-3 text-xs text-slate-650 dark:text-slate-300">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span className="font-sans leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handlePlanClick(plan.id)}
                    disabled={isCurrent}
                    className={`w-full py-3.5 rounded-none font-mono uppercase tracking-widest font-black text-xs cursor-pointer shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff] transition-all border-2 border-slate-950 dark:border-white ${
                      isCurrent
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border-slate-200 dark:border-slate-700 shadow-none dark:shadow-none'
                        : plan.popular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-slate-950 dark:bg-slate-900 text-white hover:bg-slate-900'
                    }`}
                  >
                    {isCurrent ? 'Your Current Plan' : `Choose ${plan.id}`}
                  </button>
                  <p className="text-[9px] text-center text-slate-400 font-mono uppercase tracking-wider mt-4">Cancel anytime. Terms apply.</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grid Comparison Table */}
      <section className="bg-slate-50 dark:bg-slate-900 py-24 border-t-4 border-b-4 border-slate-950 dark:border-slate-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Comparison</span>
            <h4 className="text-3xl font-black text-slate-950 dark:text-white uppercase italic tracking-tight">Feature Breakdown</h4>
            <p className="text-xs text-slate-500 dark:text-slate-450 font-mono uppercase tracking-wider">Every single detail evaluated side-by-side to ensure clarity.</p>
          </div>

          <div className="overflow-x-auto border-4 border-slate-950 dark:border-slate-800 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#1e293b]">
            <table className="w-full text-left border-collapse min-w-[750px] bg-white dark:bg-slate-950">
              <thead>
                <tr className="border-b-4 border-slate-950 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-5 px-6 font-mono uppercase tracking-widest font-black text-slate-950 dark:text-white text-xs w-2/5">Feature Offerings</th>
                  <th className="py-5 text-center font-mono uppercase tracking-widest font-black text-slate-500 text-[10px]">Free</th>
                  <th className="py-5 text-center font-mono uppercase tracking-widest font-black text-slate-500 text-[10px]">Silver</th>
                  <th className="py-5 text-center font-mono uppercase tracking-widest font-black text-slate-500 text-[10px]">Gold</th>
                  <th className="py-5 text-center font-mono uppercase tracking-widest font-black text-slate-500 text-[10px]">Platinum</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-650 dark:text-slate-300">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="py-4 px-6 font-mono uppercase tracking-wider font-bold text-slate-950 dark:text-white">{row.name}</td>
                    
                    {/* Free Column */}
                    <td className="py-4 text-center font-medium">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-4 h-4 text-rose-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 dark:text-slate-700 mx-auto" />
                      ) : (
                        <span className="font-mono uppercase text-[10px] tracking-wider text-slate-500">{row.free}</span>
                      )}
                    </td>

                    {/* Silver Column */}
                    <td className="py-4 text-center font-medium">
                      {typeof row.silver === 'boolean' ? (
                        row.silver ? <Check className="w-4 h-4 text-rose-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 dark:text-slate-700 mx-auto" />
                      ) : (
                        <span className="font-mono uppercase text-[10px] tracking-wider text-rose-600 dark:text-rose-450">{row.silver}</span>
                      )}
                    </td>

                    {/* Gold Column */}
                    <td className="py-4 text-center font-medium">
                      {typeof row.gold === 'boolean' ? (
                        row.gold ? <Check className="w-4 h-4 text-rose-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 dark:text-slate-700 mx-auto" />
                      ) : (
                        <span className="font-mono uppercase text-[10px] tracking-wider text-rose-600 dark:text-rose-450">{row.gold}</span>
                      )}
                    </td>

                    {/* Platinum Column */}
                    <td className="py-4 text-center font-bold">
                      {typeof row.platinum === 'boolean' ? (
                        row.platinum ? <Check className="w-4 h-4 text-rose-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 dark:text-slate-700 mx-auto" />
                      ) : (
                        <span className="font-mono uppercase text-[10px] tracking-wider text-rose-600 dark:text-rose-450">{row.platinum}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Assurance banner */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-left space-y-2">
            <h5 className="font-mono uppercase font-black text-base flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-rose-500" />
              <span>30-Day Happiness Guarantee</span>
            </h5>
            <p className="text-xs text-slate-400 max-w-xl font-sans leading-relaxed">
              Not satisfied with matches or search algorithms? Reach out to support within 30 days for an effortless membership plan adjustment or full refund.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-xs font-mono uppercase tracking-widest font-black rounded-none shadow-[4px_4px_0px_#fb7185] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fb7185] transition-all cursor-pointer text-white"
          >
            Ask Pricing Support
          </button>
        </div>
      </section>
    </div>
  );
}
