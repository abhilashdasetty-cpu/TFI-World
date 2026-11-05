import React from 'react';
import { useApp } from '../context/AppContext';
import { Film, Award, Clapperboard, Heart, Sparkles, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Brand Hero */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-12">
        <div className="w-12 h-12 rounded bg-amber-500 text-black flex items-center justify-center font-black text-sm mx-auto shadow-lg shadow-amber-500/20">
          TFI
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
          About TFI Universe
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-cinzel tracking-tight">
          Beyond the Screen. Into the World of Telugu Cinema.
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          "Don't just watch cinema. Understand it. Explore it. Create it."
        </p>
      </div>

      {/* Brand Philosophy & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-[#0E1116] border border-stone-800 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
            Our Brand Philosophy
          </span>
          <h2 className="text-xl font-bold text-white font-cinzel">
            Elevating Cinema From Entertainment to Living Art
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Telugu cinema is one of the world's most vibrant, technically daring, and culturally rich storytelling traditions. TFI UNIVERSE was established to bridge the gap between fans, students, and filmmakers. We provide an encyclopedic archive of Telugu male heroes and cinema landmarks, alongside a hands-on digital film academy and creative production studio.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#0E1116] border border-stone-800 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
            Our Core Vision
          </span>
          <h2 className="text-xl font-bold text-white font-cinzel">
            A Global Digital Hub for Creators & Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            To create an internationally benchmarked digital destination where visitors can discover authentic actor legacies, explore timeless movie records, enjoy curated YouTube discovery, learn the science of pre-production, production, and post-production, and actively architect scenes using interactive storyboard and shot planning tools.
          </p>
        </div>
      </div>

      {/* Pillars of TFI Universe */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white font-cinzel text-center">
          The Five Architectural Pillars of TFI Universe
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-300">
          <div className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white font-cinzel">
              Authentic Actor Archive
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Strictly authenticated real photographs of male Telugu stars, verified career milestones, complete chronological filmographies, and zero fictitious claims.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Film className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white font-cinzel">
              Verified YouTube Discovery
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Curated official movie trailers, making-of videos, and actor interviews directly linked to official YouTube channels with automated search query redirection.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clapperboard className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white font-cinzel">
              Filmmaking Academy
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Rigorous curricula covering screenwriting, 3-point lighting, camera angles, Foley sound design, the 12 principles of animation, and VFX compositing pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Strict Ethical & Copyright Standards */}
      <div className="p-6 rounded-xl bg-[#090B0E] border border-stone-800 space-y-3 text-xs text-stone-400 leading-relaxed">
        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
          Ethical & Photographic Integrity Policy
        </h4>
        <p>
          TFI Universe adheres to strict identity accuracy. Actor profiles display verified authentic portraits sourced from official and public domain repositories. All YouTube videos link directly to their rightful rights-holders' official channels. Educational materials are crafted to inspire the next generation of Indian cinematographers, animators, and directors.
        </p>
      </div>

    </div>
  );
};
