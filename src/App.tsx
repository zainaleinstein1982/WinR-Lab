/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'concept' | 'replit' | 'funnel' | 'checklist'>('dashboard');
  
  // WinR Lab x Jev Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [classifiedCount, setClassifiedCount] = useState(415);
  const [labelsCount, setLabelsCount] = useState(3320);
  const [costCount, setCostCount] = useState(0.1591);
  
  const [curiosityCount, setCuriosityCount] = useState(123);
  const [recognitionCount, setRecognitionCount] = useState(99);
  const [resultCount, setResultCount] = useState(59);
  
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);

  // Hormozi Viral Reels Archive data matching reference image structure
  const reelsData = [
    {
      id: 1,
      topic: "Business",
      hook: "Result",
      structure: "Q&A",
      quote: "Been following you since you were at like 3,000 subscribers on YouTube.",
      plays: "418.3K",
      likes: "7.9K"
    },
    {
      id: 2,
      topic: "Marketing",
      hook: "Direct",
      structure: "Explanation",
      quote: "I think about the personal brand as Mosaic.",
      plays: "159.5K",
      likes: "2.5K"
    },
    {
      id: 3,
      topic: "Pricing Strategy",
      hook: "Curiosity",
      structure: "Before / After",
      quote: "Sometimes they're so desperate for jobs. I'm like, yeah, whatever. Charge 10x.",
      plays: "221.8K",
      likes: "4.1K"
    },
    {
      id: 4,
      topic: "Sales Objections",
      hook: "Result",
      structure: "Case Study",
      quote: "If you want to close high ticket clients, stop pitching features and pitch certainty.",
      plays: "342.1K",
      likes: "8.9K"
    },
    {
      id: 5,
      topic: "Offer Creation",
      hook: "Direct",
      structure: "Framework",
      quote: "Make your product so good people feel stupid saying no.",
      plays: "512.4K",
      likes: "15.3K"
    },
    {
      id: 6,
      topic: "Leverage & Teams",
      hook: "Curiosity",
      structure: "Explanation",
      quote: "You don't need a bigger funnel. You need a better product that retains customers forever.",
      plays: "670.3K",
      likes: "22.5K"
    }
  ];

  // Simulation interval effect
  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setClassifiedCount(prev => {
          if (prev >= 447) {
            setIsSimulating(false);
            return 447;
          }
          return prev + 2;
        });
        setLabelsCount(prev => (prev < 3500 ? prev + 15 : 3500));
        setCostCount(prev => (prev < 0.1850 ? Number((prev + 0.0005).toFixed(4)) : 0.1850));
        setCuriosityCount(prev => (prev < 140 ? prev + 1 : 140));
        setRecognitionCount(prev => (prev < 110 ? prev + 1 : 110));
        setResultCount(prev => (prev < 75 ? prev + 1 : 75));

        setSelectedReelIndex(prev => (prev + 1) % reelsData.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isSimulating, reelsData.length]);

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setClassifiedCount(415);
    setLabelsCount(3320);
    setCostCount(0.1591);
    setCuriosityCount(123);
    setRecognitionCount(99);
    setResultCount(59);
  };

  const currentReel = reelsData[selectedReelIndex];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#e8e4d8] text-stone-900 flex flex-col justify-center items-center font-sans selection:bg-amber-500 selection:text-white p-3">
      
      {/* Centered Framed Desktop Card Container */}
      <div className="w-full max-w-5xl bg-[#f7f5ed] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] max-h-[750px]">
        
        {/* Top Header matching reference */}
        <header className="border-b border-stone-300 bg-[#f7f5ed] px-6 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm tracking-tight text-stone-900 font-serif">WinR Lab <span className="text-emerald-600 font-sans">× jev</span></span>
            <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg border border-stone-300">
              {[
                { id: 'dashboard', label: 'WinR Lab' },
                { id: 'concept', label: 'Concept' },
                { id: 'replit', label: 'Replit' },
                { id: 'funnel', label: 'Funnel' },
                { id: 'checklist', label: 'Checklist' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-[#f7f5ed] shadow-xs font-semibold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                isSimulating ? 'bg-amber-600 text-white' : 'bg-stone-900 text-white'
              }`}
            >
              {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
              {isSimulating ? 'Pause' : 'Run Live'}
            </button>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Saved analysis replay</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="px-6 py-3.5 flex-1 w-full overflow-hidden flex flex-col justify-between">
          {activeTab === 'dashboard' && (
            <div className="space-y-3 animate-in fade-in duration-300 h-full flex flex-col justify-between">
              
              {/* Title Header: "Decode @hormozi." */}
              <div className="flex justify-between items-end border-b border-stone-300 pb-1.5 shrink-0">
                <h1 className="text-2xl font-serif font-black tracking-tight text-stone-900">
                  Decode @hormozi.
                </h1>
                <span className="text-[10px] font-mono text-stone-500">500 collected reels</span>
              </div>

              {/* Top 3 Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 shrink-0">
                
                {/* SCRIPTS CLASSIFIED - Black Box */}
                <div className="md:col-span-5 bg-stone-900 text-white rounded-xl p-3 shadow-xs flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">SCRIPTS CLASSIFIED</span>
                  <div className="text-2xl font-serif font-black tracking-tight mt-0.5">
                    {classifiedCount} <span className="text-stone-400 font-sans font-normal text-xs">/ 447</span>
                  </div>
                </div>

                {/* SCRIPT LABELS - White Box */}
                <div className="md:col-span-3 bg-white border border-stone-300 rounded-xl p-3 shadow-xs flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold">SCRIPT LABELS</span>
                  <div className="text-2xl font-serif font-black text-stone-900 tracking-tight mt-0.5">
                    {labelsCount.toLocaleString()}
                  </div>
                </div>

                {/* JEV MODEL COST EST. - Light Greenish Box */}
                <div className="md:col-span-4 bg-[#e8edd8] border border-stone-300 rounded-xl p-3 shadow-xs flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest font-bold">JEV MODEL COST · EST.</span>
                  <div className="text-2xl font-serif font-black text-stone-900 tracking-tight mt-0.5">
                    ${costCount.toFixed(4)} <span className="text-stone-500 font-sans font-normal text-[10px] font-mono">so far</span>
                  </div>
                </div>
              </div>

              {/* Split Section: Reel Archive (Left) & Inside the Reel (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 overflow-hidden">
                
                {/* REEL ARCHIVE (Left - 5 cols) */}
                <div className="lg:col-span-5 bg-white border border-stone-300 rounded-xl p-3.5 shadow-xs flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-stone-700 uppercase tracking-wider font-bold">REEL ARCHIVE</span>
                    <span className="text-[9px] font-mono text-stone-500">301–330</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1 overflow-hidden">
                    {[...Array(20)].map((_, idx) => {
                      const isSelected = selectedReelIndex === (idx % reelsData.length);
                      const isFaded = idx > 14;
                      return (
                        <div 
                          key={idx}
                          onClick={() => setSelectedReelIndex(idx % reelsData.length)}
                          className={`aspect-[9/13] rounded bg-gradient-to-br from-stone-700 to-stone-950 cursor-pointer border transition-all p-0.5 flex flex-col justify-between ${
                            isSelected ? 'border-amber-500 ring-2 ring-amber-500/35 scale-105 z-10' : isFaded ? 'border-stone-200 opacity-30' : 'border-stone-300 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="w-1 h-1 rounded-full bg-amber-400 self-end m-0.5"></div>
                          <div className="text-[5px] font-mono text-white/80 p-0.5">#{301 + idx}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* INSIDE THE REEL (Right - 7 cols) */}
                <div className="lg:col-span-7 bg-white border border-stone-300 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-1.5">
                    <span className="text-[10px] font-mono text-stone-700 uppercase tracking-wider font-bold">INSIDE THE REEL</span>
                    <span className="text-[9px] font-mono text-stone-500">JEV LABELS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start my-auto">
                    {/* Left side: Tall Portrait Thumbnail Card (Narrow width) + Quote + Plays/Likes */}
                    <div className="sm:col-span-5 space-y-2">
                      <div className="w-28 mx-auto aspect-[9/13] rounded-lg bg-gradient-to-br from-stone-800 to-stone-950 p-2 flex flex-col justify-between text-white shadow-md relative overflow-hidden">
                        <div className="text-[7px] font-mono text-stone-300 uppercase tracking-wider">Topic</div>
                        <div className="space-y-0.5">
                          <div className="text-[9px] font-serif font-bold text-amber-400">@hormozi</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[11px] text-stone-900 italic font-serif leading-tight">
                          "{currentReel.quote}"
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="font-bold text-stone-900">{currentReel.plays} <span className="font-normal text-stone-500">plays</span></span>
                          <span className="font-bold text-stone-900">{currentReel.likes} <span className="font-normal text-stone-500">likes</span></span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Topic, Hook, Structure with Green Progress Bars */}
                    <div className="sm:col-span-7 space-y-2">
                      {/* TOPIC */}
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-stone-500 uppercase font-bold">
                          <span>TOPIC</span>
                        </div>
                        <div className="text-[11px] font-bold text-stone-900">{currentReel.topic}</div>
                        <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden mt-0.5 border border-stone-200">
                          <div className="bg-[#8ab339] h-full rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>

                      {/* HOOK */}
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-stone-500 uppercase font-bold">
                          <span>HOOK</span>
                        </div>
                        <div className="text-[11px] font-bold text-stone-900">{currentReel.hook}</div>
                        <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden mt-0.5 border border-stone-200">
                          <div className="bg-[#8ab339] h-full rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>

                      {/* STRUCTURE */}
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-stone-500 uppercase font-bold">
                          <span>STRUCTURE</span>
                        </div>
                        <div className="text-[11px] font-bold text-stone-900">{currentReel.structure}</div>
                        <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden mt-0.5 border border-stone-200">
                          <div className="bg-[#8ab339] h-full rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Section: Hook Patterns Found */}
              <div className="bg-white border border-stone-300 rounded-xl p-3 shadow-xs shrink-0 space-y-1.5">
                <div className="flex justify-between items-center border-b border-stone-200 pb-1">
                  <span className="text-[10px] font-mono text-stone-700 uppercase tracking-wider font-bold">HOOK PATTERNS FOUND</span>
                  <span className="text-[9px] font-mono text-stone-500">@hormozi · 500 collected reels</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-serif font-bold text-stone-900">Curiosity</span>
                      <span className="font-mono font-bold text-stone-900">{curiosityCount}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden border border-stone-200">
                      <div className="bg-[#d97736] h-full rounded-full" style={{ width: `${Math.min(100, (curiosityCount / 150) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-serif font-bold text-stone-900">Recognition</span>
                      <span className="font-mono font-bold text-stone-900">{recognitionCount}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden border border-stone-200">
                      <div className="bg-[#8b5cf6] h-full rounded-full" style={{ width: `${Math.min(100, (recognitionCount / 150) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-serif font-bold text-stone-900">Result</span>
                      <span className="font-mono font-bold text-stone-900">{resultCount}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden border border-stone-200">
                      <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: `${Math.min(100, (resultCount / 100) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'concept' && (
            <div className="space-y-4 my-auto max-w-xl mx-auto bg-white p-6 rounded-xl border border-stone-300">
              <h3 className="text-xl font-serif font-bold">Concept & Pitch</h3>
              <p className="text-sm font-serif italic text-stone-700">"A real-time micro-habit dueling app where friends wager small stakes on daily streaks, powered by AI habit verification and monetized via Stripe & RevenueCat."</p>
            </div>
          )}

          {activeTab === 'replit' && (
            <div className="space-y-4 my-auto max-w-xl mx-auto bg-white p-6 rounded-xl border border-stone-300">
              <h3 className="text-xl font-serif font-bold">Replit & RevenueCat Blueprint</h3>
              <p className="text-xs font-mono bg-stone-900 text-stone-100 p-3 rounded-lg">Purchases.configure({{apiKey: "appl_xxx"}})</p>
            </div>
          )}

          {activeTab === 'funnel' && (
            <div className="space-y-4 my-auto max-w-xl mx-auto bg-white p-6 rounded-xl border border-stone-300">
              <h3 className="text-xl font-serif font-bold">Stripe Web Funnel Calculator</h3>
              <div className="text-2xl font-serif font-black text-emerald-600">$21,450 MRR Projected</div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4 my-auto max-w-xl mx-auto bg-white p-6 rounded-xl border border-stone-300">
              <h3 className="text-xl font-serif font-bold">Shipaton Compliance Checklist</h3>
              <p className="text-xs text-stone-600">All criteria met for Most Viral & Idea to Income.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-300 bg-[#f7f5ed] px-6 py-1.5 shrink-0">
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
            <span>@hormozi · 500 collected reels</span>
            <span>Jev cost excludes scraping + transcription</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
