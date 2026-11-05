import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTION_PIPELINE_STAGES, PRODUCTION_LESSONS, PipelineStage } from '../data/academyData';
import { ProductionStageLesson } from '../types';
import {
  Clapperboard,
  Bookmark,
  CheckCircle2,
  Film,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2
} from 'lucide-react';

export const AcademyPage: React.FC = () => {
  const { user, toggleBookmarkLesson, setActivePage } = useApp();
  const [activeStageTab, setActiveStageTab] = useState<'All' | 'Pre-Production' | 'Production' | 'Post-Production'>('All');
  const [selectedPipelineNode, setSelectedPipelineNode] = useState<PipelineStage>(PRODUCTION_PIPELINE_STAGES[2]); // Default to Storyboarding
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const filteredLessons = activeStageTab === 'All'
    ? PRODUCTION_LESSONS
    : PRODUCTION_LESSONS.filter(l => l.stage === activeStageTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <Clapperboard className="w-4 h-4" />
          <span>Filmmaking & Production Academy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          The Craft of Cinema
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Master the three stages of film production — Pre-Production, Production, and Post-Production. Grounded in real-world Telugu cinema case studies from S.S. Rajamouli, Sukumar, Trivikram, Marcus Bartley, and K.K. Senthil Kumar.
        </p>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE PRODUCTION PIPELINE MAP                      */}
      {/* ======================================================== */}
      <section className="p-6 sm:p-8 rounded-xl bg-[#0C0E14] border border-amber-500/30 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Interactive Production Pipeline
          </span>
          <h2 className="text-2xl font-bold text-white font-cinzel mt-1">
            From Script to Theatrical Release
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Click on any phase below to inspect the craft breakdown and real Telugu case studies:
          </p>
        </div>

        {/* The 9 Nodes */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {PRODUCTION_PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = selectedPipelineNode.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedPipelineNode(stage)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-black font-semibold border-amber-400 shadow-md'
                    : 'bg-[#12151D] border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-black' : 'text-amber-400'}`}>
                  0{idx + 1}
                </span>
                <div className="mt-2">
                  <p className="text-xs font-bold leading-tight font-cinzel truncate">
                    {stage.name}
                  </p>
                  <span className={`text-[9px] block mt-0.5 truncate ${isSelected ? 'text-black/80' : 'text-stone-400'}`}>
                    {stage.stageGroup}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail */}
        <div className="p-6 rounded-lg bg-[#0F1218] border border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Stage {PRODUCTION_PIPELINE_STAGES.findIndex(s => s.id === selectedPipelineNode.id) + 1} of 9 · {selectedPipelineNode.stageGroup}
              </span>
              <h3 className="text-xl font-bold text-white font-cinzel mt-0.5">
                {selectedPipelineNode.name}
              </h3>
            </div>

            {selectedPipelineNode.id === 'storyboard' && (
              <button
                onClick={() => setActivePage('storyboard')}
                className="px-4 py-2 rounded bg-amber-400 text-black font-semibold text-xs transition-colors hover:bg-amber-300"
              >
                Open Storyboard Studio
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedPipelineNode.detailedOverview}
              </p>

              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block font-semibold">
                  Telugu Cinema Industry Case Study
                </span>
                <p className="text-xs text-stone-300 mt-1 italic">
                  "{selectedPipelineNode.teluguCinemaReference}"
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-[#090B0E] p-4 rounded-lg border border-stone-800">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                Key Tools & Deliverables
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {selectedPipelineNode.keyToolsAndDeliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3 STAGES DETAILED CURRICULUM                             */}
      {/* ======================================================== */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Deep Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel mt-1">
              The Three Stages of Production
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Select a stage below to study lessons on camera placement, lighting, scriptwriting, and editing.
            </p>
          </div>

          {/* Stage Filter Buttons */}
          <div className="flex items-center gap-1 bg-[#12151D] p-1 rounded-lg border border-stone-800">
            {(['All', 'Pre-Production', 'Production', 'Post-Production'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveStageTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeStageTab === tab
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-6">
          {filteredLessons.map(lesson => {
            const isBookmarked = user.bookmarkedLessonIds.includes(lesson.id);
            const isExpanded = expandedLessonId === lesson.id;

            return (
              <div
                key={lesson.id}
                className="bg-[#0E1116] rounded-xl border border-stone-800 overflow-hidden space-y-4 p-6 transition-all hover:border-amber-500/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                        {lesson.stage}
                      </span>
                      <span className="text-stone-600">·</span>
                      <span className="text-xs text-stone-400">Masterclass Lesson</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-cinzel">
                      {lesson.topic}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleBookmarkLesson(lesson.id)}
                      className={`p-2 rounded-md transition-colors ${
                        isBookmarked
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                      className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 transition-colors"
                    >
                      {isExpanded ? 'Collapse Lesson' : 'Read Full Lesson'}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed">
                  {lesson.shortSummary}
                </p>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="pt-4 border-t border-stone-800/80 space-y-5 animate-in fade-in duration-150">
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                      {lesson.fullContent}
                    </div>

                    {lesson.teluguCinemaCaseStudy && (
                      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                            Telugu Cinema Spotlight: {lesson.teluguCinemaCaseStudy.movie}
                          </span>
                          <span className="text-xs text-amber-400/80">
                            Craftsperson: {lesson.teluguCinemaCaseStudy.craftsperson}
                          </span>
                        </div>
                        <p className="text-xs text-stone-300 italic leading-relaxed">
                          "{lesson.teluguCinemaCaseStudy.craftInsight}"
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-lg bg-[#090B0E] border border-stone-800 space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                        Core Takeaways
                      </span>
                      <ul className="space-y-1 text-xs text-stone-300">
                        {lesson.keyTakeaways.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">✓</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Link to Studio Tools */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-stone-900 to-[#0A0C10] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white font-cinzel">
            Ready to experiment with actual filmmaking tools?
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            Try the Camera Angle Explorer, Shot Planner, and Production Checklists in the Studio.
          </p>
        </div>
        <button
          onClick={() => setActivePage('studio')}
          className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shrink-0"
        >
          Explore Studio Tools
        </button>
      </div>

    </div>
  );
};
