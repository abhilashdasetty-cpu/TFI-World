import React, { useState } from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface AuthenticActorImageProps {
  src: string;
  actorName: string;
  generation?: string;
  className?: string;
  aspectRatio?: 'portrait' | 'square' | 'banner';
}

export const AuthenticActorImage: React.FC<AuthenticActorImageProps> = ({
  src,
  actorName,
  generation,
  className = '',
  aspectRatio = 'portrait'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Compute initials for clean authentic monogram fallback
  const initials = actorName
    .split(' ')
    .filter(n => !n.includes('.') && n.length > 0)
    .slice(0, 2)
    .map(n => n[0])
    .join('') || actorName.slice(0, 2).toUpperCase();

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'banner'
      ? 'aspect-[16/9]'
      : 'aspect-square';

  return (
    <div className={`relative overflow-hidden bg-[#111319] ${aspectClass} ${className} group`}>
      {/* Loading Shimmer */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#111319] via-[#1a1e28] to-[#111319] animate-pulse z-0" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={`Authentic portrait of ${actorName}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        /* Verified Fallback Shield */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#151922] to-[#0d0f14] border border-amber-500/20">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-xl tracking-wider mb-3">
            {initials}
          </div>
          <span className="text-sm font-semibold text-stone-200 tracking-wide font-cinzel">{actorName}</span>
          {generation && (
            <span className="text-xs text-amber-400/80 mt-1 uppercase tracking-widest">{generation} Icon</span>
          )}
          <div className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-sm bg-black/40 border border-stone-800 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Actor Record</span>
          </div>
        </div>
      )}

      {/* Subtle bottom gradient scrim for legible text contrast */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
    </div>
  );
};
