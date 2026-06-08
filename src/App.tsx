import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { CloudBill } from './components/CloudBill';
import { Home } from './pages/Home';
import { TheYesMan } from './pages/TheYesMan';
import { CodeNuke } from './pages/CodeNuke';
import { Productivity } from './pages/Productivity';
import { HallOfFame } from './pages/HallOfFame';
import { RescueProject } from './pages/RescueProject';
import { TheTestSuite } from './pages/TheTestSuite';
import { GoldfishCopilot } from './pages/GoldfishCopilot';
import { ApologeticLoop } from './pages/ApologeticLoop';
import { VibeAgileBoard } from './pages/VibeAgileBoard';
import { ThoughtLeader } from './pages/ThoughtLeader';
import { DrunkUncle } from './pages/DrunkUncle';
import { GhostPR } from './pages/GhostPR';
import { TrueStories } from './pages/TrueStories';
import { Slopsquatting } from './pages/Slopsquatting';
import { LocalStorageDB } from './pages/LocalStorageDB';
import { RegexBomb } from './pages/RegexBomb';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-black">
      <CloudBill />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Phase 6 Advanced Arch Fails */}
        <Route path="/slopsquatting" element={<Slopsquatting />} />
        <Route path="/localstorage-db" element={<LocalStorageDB />} />
        <Route path="/regex-bomb" element={<RegexBomb />} />

        {/* Phase 5 Real Incidents */}
        <Route path="/true-stories" element={<TrueStories />} />

        {/* Phase 4 LinkedIn Cringe */}
        <Route path="/thought-leader" element={<ThoughtLeader />} />
        <Route path="/npm-install" element={<DrunkUncle />} />
        <Route path="/pr-review" element={<GhostPR />} />

        {/* Phase 3 Expansion Pages */}
        <Route path="/tests" element={<TheTestSuite />} />
        <Route path="/context" element={<GoldfishCopilot />} />
        <Route path="/debugger" element={<ApologeticLoop />} />
        <Route path="/agile" element={<VibeAgileBoard />} />

        {/* Existing Parodies */}
        <Route path="/copilot" element={<TheYesMan />} />
        <Route path="/refactor" element={<CodeNuke />} />
        <Route path="/productivity" element={<Productivity />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        
        {/* Everything else hits the Rescue Project */}
        <Route path="*" element={<RescueProject />} />
      </Routes>
    </div>
  );
}
