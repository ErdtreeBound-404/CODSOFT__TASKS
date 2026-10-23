import React from 'react';

interface NetworkLogoProps {
  isCapturing?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const NetworkLogo: React.FC<NetworkLogoProps> = ({
  isCapturing = false,
  className = '',
  size = 'lg',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Emblem container */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900 border border-cyan-500/30 p-2 shadow-2xl transition-all duration-300 group ${sizeClasses}`}
        style={{
          boxShadow: isCapturing
            ? '0 0 35px -5px rgba(6, 182, 212, 0.45), inset 0 0 25px rgba(2, 132, 199, 0.2)'
            : '0 10px 25px -5px rgba(15, 23, 42, 0.8)',
        }}
      >
        {/* Vector SVG replicating Gemini Image Logo */}
        <svg
          viewBox="0 0 500 420"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nl-band-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="60%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="nl-band-navy" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a1931" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            <linearGradient id="nl-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0099ff" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>

            <linearGradient id="nl-stream-arrow" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="70%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <filter id="nl-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subtle network node lines in background */}
          <g opacity="0.3" stroke="#38bdf8" strokeWidth="1">
            <line x1="160" y1="90" x2="220" y2="50" />
            <line x1="220" y1="50" x2="280" y2="70" />
            <line x1="280" y1="70" x2="360" y2="80" />
            <line x1="360" y1="80" x2="390" y2="140" />
            <line x1="160" y1="90" x2="140" y2="160" />
            <line x1="390" y1="140" x2="360" y2="220" />
            <line x1="120" y1="280" x2="170" y2="310" />
          </g>

          <g fill="#38bdf8" opacity="0.4">
            <circle cx="160" cy="90" r="3" />
            <circle cx="220" cy="50" r="2.5" />
            <circle cx="280" cy="70" r="3" />
            <circle cx="360" cy="80" r="2.5" />
            <circle cx="390" cy="140" r="3.5" />
            <circle cx="360" cy="220" r="3" />
          </g>

          {/* Magnifying Glass Angled Handle (down-right) */}
          <g transform="rotate(45, 275, 185)">
            <rect
              x="330"
              y="173"
              width="68"
              height="24"
              rx="12"
              fill="#004d80"
              stroke="#0099ff"
              strokeWidth="2"
            />
            <rect x="334" y="177" width="60" height="16" rx="8" fill="#0284c7" />
          </g>

          {/* Concentric Radar Glass Ring */}
          <circle
            cx="275"
            cy="165"
            r="92"
            fill="none"
            stroke="url(#nl-ring-1)"
            strokeWidth="18"
            className={isCapturing ? 'animate-pulse' : ''}
          />
          <circle
            cx="275"
            cy="165"
            r="75"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            opacity="0.3"
          />
          <circle
            cx="275"
            cy="165"
            r="62"
            fill="none"
            stroke="#0369a1"
            strokeWidth="12"
          />
          <circle
            cx="275"
            cy="165"
            r="48"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* 3 Dynamic Curved Speed Data Ribbons */}
          {/* Ribbon 1: Dark Navy Bottom Stripe */}
          <path
            d="M 130 235 L 155 210 Q 200 210 235 190 L 268 200 Q 220 235 165 235 Z"
            fill="#0a1931"
          />
          {/* Ribbon 2: Electric Cyan Middle Stripe */}
          <path
            d="M 115 210 L 145 180 Q 200 180 242 155 L 268 165 Q 215 210 155 210 Z"
            fill="url(#nl-band-cyan)"
          />
          {/* Ribbon 3: Azure Top Stripe */}
          <path
            d="M 125 180 L 150 155 Q 205 155 250 125 L 272 135 Q 220 180 160 180 Z"
            fill="#0284c7"
          />

          {/* Forward Flow Data Stream Arrow (Top Right) */}
          <g>
            <path
              d="M 275 165 Q 315 140 345 138 Q 370 138 382 135 L 382 120 L 435 142 L 382 165 L 382 150 Q 365 152 340 152 Q 305 160 275 165 Z"
              fill="url(#nl-stream-arrow)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            {/* Packet Cubes Inside Flow Stream */}
            <rect
              x="315"
              y="142"
              width="7"
              height="7"
              rx="1.5"
              fill="#ffffff"
              filter={isCapturing ? 'url(#nl-glow)' : undefined}
            >
              {isCapturing && (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
            <rect
              x="345"
              y="134"
              width="8.5"
              height="8.5"
              rx="2"
              fill="#e0f2fe"
            >
              {isCapturing && (
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
            <rect x="372" y="132" width="6" height="6" rx="1.5" fill="#ffffff" />
          </g>

          {/* Central Hexagonal Core Badge with Arrow */}
          <g transform="translate(272, 165)">
            <polygon
              points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
              fill="#08182b"
              stroke="#00d4ff"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="0,-25 21,-12 21,12 0,25 -21,12 -21,-12"
              fill="#0284c7"
              opacity="0.3"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* Crisp Directional Forward Arrow Inside Hexagon */}
            <path
              d="M -10 10 L 4 -4 L 4 -12 L -4 -12 L -4 -8 L 0 -8 L -12 4 Z"
              fill="#ffffff"
            />
            <polygon points="9,-12 0,-12 9,-3" fill="#ffffff" />
          </g>
        </svg>

        {/* Small branding badge tag */}
        <span className="absolute -bottom-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-slate-950 border border-cyan-500/50 text-cyan-300">
          LOGO
        </span>
      </div>

      {showText && (
        <div className="mt-3 text-center">
          <div className="text-base font-extrabold tracking-wider text-slate-100 uppercase font-sans">
            NETWORK PACKET
          </div>
          <div className="text-sm font-bold tracking-wider text-cyan-400 uppercase font-sans">
            ANALYZER
          </div>
        </div>
      )}
    </div>
  );
};
