import React, { useState } from 'react';
import { MULTIMEDIA_CURRICULUM } from '../data/academyData';
import {
  Layers,
  Image,
  Volume2,
  Video,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const MultimediaPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Graphics');
  
  // Interactive Animation Principle Demo (Squash & Stretch Simulator)
  const [animSpeed, setAnimSpeed] = useState<number>(1);
  const [isSquashActive, setIsSquashActive] = useState<boolean>(true);

  // Interactive Green Screen Compositing Simulator State
  const [showBgPlate, setShowBgPlate] = useState<boolean>(true);
  const [showKeyedActor, setShowKeyedActor] = useState<boolean>(true);
  const [showColorGrade, setShowColorGrade] = useState<boolean>(true);
  const [showAtmosphere, setShowAtmosphere] = useState<boolean>(true);

  const selectedTrack = MULTIMEDIA_CURRICULUM.find(c => c.category === activeCategory) || MULTIMEDIA_CURRICULUM[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <Layers className="w-4 h-4" />
          <span>Technical Learning Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Multimedia & Animation
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          The technical foundation of digital cinema: Graphics, Audio Acoustics, Digital Video Sensors, The 12 Principles of Animation, and Visual Effects Compositing.
        </p>
      </div>

      {/* Track Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800">
        {MULTIMEDIA_CURRICULUM.map(track => {
          const isActive = track.category === activeCategory;
          return (
            <button
              key={track.category}
              onClick={() => setActiveCategory(track.category)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {track.category === 'Graphics' && <Image className="w-4 h-4" />}
              {track.category === 'Audio' && <Volume2 className="w-4 h-4" />}
              {track.category === 'Video' && <Video className="w-4 h-4" />}
              {track.category === 'Animation' && <Sparkles className="w-4 h-4" />}
              {track.category === 'Visual Effects' && <Sliders className="w-4 h-4" />}
              <span>{track.category}</span>
            </button>
          );
        })}
      </div>

      {/* Track Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Syllabus & Theoretical Foundations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Module: {selectedTrack.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
              {selectedTrack.title}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {selectedTrack.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300 font-mono">
              Key Concepts & Technical Rules
            </h3>
            <div className="space-y-3">
              {selectedTrack.topics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 flex items-start gap-3"
                >
                  <span className="text-amber-400 font-mono text-xs font-bold mt-0.5">
                    0{i + 1}.
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Interactive Lab Demo */}
        <div className="space-y-6">
          
          {/* LAB 1: If Animation is selected, show the Squash & Stretch Physics Lab */}
          {activeCategory === 'Animation' && (
            <div className="p-6 rounded-xl bg-[#0C0E14] border border-amber-500/30 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Interactive Animation Lab
                </span>
                <h4 className="text-base font-bold text-white font-cinzel mt-0.5">
                  Principle 01: Squash & Stretch
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Notice how the ball deforms to express weight without losing its volume.
                </p>
              </div>

              {/* Bouncing Ball Canvas simulation */}
              <div className="aspect-square bg-[#08090C] rounded-lg border border-stone-800 relative overflow-hidden flex items-end justify-center pb-4">
                {/* Ground */}
                <div className="absolute inset-x-0 bottom-0 h-4 bg-stone-800/80 border-t border-stone-700" />

                {/* Animated Ball */}
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-t from-amber-600 to-amber-400 shadow-xl shadow-amber-500/20 transition-all ${
                    isSquashActive
                      ? 'animate-bounce'
                      : 'translate-y-0'
                  }`}
                  style={{
                    animationDuration: `${1 / animSpeed}s`
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-stone-800">
                <button
                  onClick={() => setIsSquashActive(!isSquashActive)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors"
                >
                  {isSquashActive ? 'Pause Animation' : 'Resume Animation'}
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400">Speed:</span>
                  <button
                    onClick={() => setAnimSpeed(s => (s === 1 ? 0.5 : s === 0.5 ? 2 : 1))}
                    className="px-2 py-1 rounded bg-stone-900 border border-stone-700 font-mono text-amber-400"
                  >
                    {animSpeed}x
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: If Visual Effects is selected, show the Compositing Layers Simulator */}
          {activeCategory === 'Visual Effects' && (
            <div className="p-6 rounded-xl bg-[#0C0E14] border border-amber-500/30 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Interactive Compositing Lab
                </span>
                <h4 className="text-base font-bold text-white font-cinzel mt-0.5">
                  VFX Layer Stack Simulator
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Toggle individual passes to see how a final shot is composited in Nuke/Fusion.
                </p>
              </div>

              {/* Viewport Simulation */}
              <div
                className={`aspect-[16/9] rounded-lg border border-stone-800 relative overflow-hidden flex items-center justify-center transition-all ${
                  showColorGrade ? 'sepia-25 contrast-125' : ''
                }`}
                style={{
                  background: showBgPlate
                    ? 'radial-gradient(ellipse at bottom, #2b1d0c 0%, #08090C 100%)'
                    : '#000000'
                }}
              >
                {/* Background Matte Mountains */}
                {showBgPlate && (
                  <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-between px-4 opacity-50">
                    <div className="w-20 h-16 bg-stone-800 rounded-t-full" />
                    <div className="w-32 h-24 bg-stone-700 rounded-t-full" />
                    <div className="w-24 h-12 bg-stone-800 rounded-t-full" />
                  </div>
                )}

                {/* Keyed Foreground Hero Subject */}
                {showKeyedActor ? (
                  <div className="relative z-10 text-center space-y-1">
                    <div className="w-16 h-28 mx-auto bg-gradient-to-t from-stone-900 to-amber-500 rounded-t-xl border border-amber-400/40 shadow-2xl flex items-center justify-center text-[10px] text-black font-bold">
                      ACTOR
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-600 font-mono">[ACTOR MATTE DISABLED]</span>
                )}

                {/* Atmospheric Fog */}
                {showAtmosphere && (
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* Layer Toggles */}
              <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                <label className="flex items-center justify-between text-stone-300 cursor-pointer">
                  <span>Pass 1: CGI Background Plate</span>
                  <input
                    type="checkbox"
                    checked={showBgPlate}
                    onChange={e => setShowBgPlate(e.target.checked)}
                    className="accent-amber-400"
                  />
                </label>

                <label className="flex items-center justify-between text-stone-300 cursor-pointer">
                  <span>Pass 2: Green-Screen Keyed Actor</span>
                  <input
                    type="checkbox"
                    checked={showKeyedActor}
                    onChange={e => setShowKeyedActor(e.target.checked)}
                    className="accent-amber-400"
                  />
                </label>

                <label className="flex items-center justify-between text-stone-300 cursor-pointer">
                  <span>Pass 3: Atmospheric Fog & Particles</span>
                  <input
                    type="checkbox"
                    checked={showAtmosphere}
                    onChange={e => setShowAtmosphere(e.target.checked)}
                    className="accent-amber-400"
                  />
                </label>

                <label className="flex items-center justify-between text-stone-300 cursor-pointer">
                  <span>Pass 4: DI Color Grade (Warm Sepia)</span>
                  <input
                    type="checkbox"
                    checked={showColorGrade}
                    onChange={e => setShowColorGrade(e.target.checked)}
                    className="accent-amber-400"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Standard Quick Reference Box */}
          <div className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
              Industry Standard Software
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center justify-between">
                <span>Graphics</span>
                <span className="text-stone-400 font-mono">Photoshop / Illustrator</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audio</span>
                <span className="text-stone-400 font-mono">Pro Tools / Nuendo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Video Editing</span>
                <span className="text-stone-400 font-mono">DaVinci Resolve / Premiere</span>
              </div>
              <div className="flex items-center justify-between">
                <span>3D Animation</span>
                <span className="text-stone-400 font-mono">Maya / Blender / Houdini</span>
              </div>
              <div className="flex items-center justify-between">
                <span>VFX Compositing</span>
                <span className="text-stone-400 font-mono">Nuke / After Effects</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
