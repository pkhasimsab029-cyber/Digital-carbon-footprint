import React from 'react';

// EcoMind Leaf Logo SVG
export const LeafLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-8 h-8 text-emerald-500",
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="leafGrad" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="0.5" stopColor="#22C55E" />
        <stop offset="1" stopColor="#34D399" />
      </linearGradient>
      <linearGradient id="veinGrad" x1="12" y1="28" x2="32" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#065F46" stopOpacity="0.8" />
        <stop offset="1" stopColor="#A7F3D0" stopOpacity="0.9" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#glow)">
      {/* Outer Leaf Silhouette */}
      <path
        d="M36 6C20 6 6 18 6 34C22 34 36 22 36 6Z"
        fill="url(#leafGrad)"
      />
      {/* Central Tech Vein */}
      <path
        d="M6 34C14 28 24 20 34 8"
        stroke="url(#veinGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Digital Node Branches */}
      <path
        d="M16 26L21 21M22 21L28 17M27 16L30 11"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      <circle cx="21" cy="21" r="2.2" fill="#FFFFFF" />
      <circle cx="28" cy="17" r="1.8" fill="#FFFFFF" />
      <circle cx="34" cy="8" r="2.5" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
    </g>
  </svg>
);

// Globe With Laptop Illustration (used in sidebar and pages)
export const GlobeLaptopIllustration: React.FC<{ className?: string }> = ({ className = "w-44 h-36" }) => (
  <svg
    viewBox="0 0 240 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="globeGrad" x1="120" y1="20" x2="120" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E3A8A" stopOpacity="0.8" />
        <stop offset="1" stopColor="#0D9488" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="laptopGrad" x1="70" y1="90" x2="170" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#334155" />
        <stop offset="1" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="85" y1="95" x2="155" y2="135" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F172A" />
        <stop offset="1" stopColor="#064E3B" />
      </linearGradient>
    </defs>

    {/* Ambient Glow */}
    <circle cx="120" cy="90" r="70" fill="#10B981" fillOpacity="0.12" />

    {/* Orbit Ring */}
    <ellipse cx="120" cy="95" rx="90" ry="32" stroke="#34D399" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />

    {/* Globe Base */}
    <circle cx="120" cy="85" r="54" fill="url(#globeGrad)" />
    {/* Continents (Stylized) */}
    <path
      d="M100 55C92 62 94 75 99 82C104 88 114 86 112 75C110 66 106 58 100 55Z"
      fill="#34D399"
      fillOpacity="0.75"
    />
    <path
      d="M130 50C125 55 128 65 136 68C143 70 148 64 144 56C140 50 134 48 130 50Z"
      fill="#34D399"
      fillOpacity="0.75"
    />
    <path
      d="M110 100C118 105 130 108 135 118C138 123 145 126 150 120"
      stroke="#34D399"
      strokeWidth="3"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Laptop Floating in Front */}
    {/* Screen Frame */}
    <rect x="80" y="82" width="80" height="52" rx="5" fill="url(#laptopGrad)" stroke="#64748B" strokeWidth="1.5" />
    {/* Display */}
    <rect x="84" y="86" width="72" height="44" rx="3" fill="url(#screenGrad)" />
    {/* Code/Graph on Screen */}
    <path d="M90 118L104 106L116 112L130 96L146 102" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="130" cy="96" r="2.5" fill="#6EE7B7" />
    {/* Screen Eco Badge */}
    <rect x="132" y="89" width="20" height="7" rx="3.5" fill="#10B981" fillOpacity="0.3" />
    <circle cx="136" cy="92.5" r="1.5" fill="#34D399" />

    {/* Laptop Keyboard Base */}
    <path
      d="M68 138L78 134H162L172 138C174 139 174 141 172 142L166 144H74L68 142C66 141 66 139 68 138Z"
      fill="#1E293B"
      stroke="#475569"
      strokeWidth="1"
    />
    {/* Trackpad */}
    <rect x="110" y="137" width="20" height="3" rx="1.5" fill="#334155" />

    {/* Eco Sprout / Leaf emerging from laptop */}
    <path
      d="M120 78C120 70 126 64 134 65C134 73 128 78 120 78Z"
      fill="#10B981"
    />
    <path
      d="M120 78C120 71 114 66 108 68C108 75 113 79 120 78Z"
      fill="#34D399"
    />
    <path d="M120 84V78" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

    {/* Digital Sparkles */}
    <circle cx="64" cy="74" r="3" fill="#6EE7B7" />
    <circle cx="178" cy="80" r="2.5" fill="#38BDF8" />
    <circle cx="160" cy="45" r="2" fill="#FBBF24" />
    <circle cx="75" cy="115" r="2" fill="#A78BFA" />
  </svg>
);

// CO2 Cloud Footprint Illustration
export const Co2CloudIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-32" }) => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cloudGrad" x1="40" y1="40" x2="160" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F1F5F9" />
        <stop offset="1" stopColor="#E2E8F0" />
      </linearGradient>
      <linearGradient id="greenArrowGrad" x1="100" y1="95" x2="100" y2="135" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="100" cy="80" r="60" fill="#10B981" fillOpacity="0.08" />

    {/* Cloud Body */}
    <path
      d="M65 105H145C161.569 105 175 91.5685 175 75C175 59.8398 163.708 47.3093 148.97 45.312C146.402 32.0622 134.821 22 121 22C110.871 22 101.954 27.4243 97.0544 35.5393C93.4245 32.747 88.9056 31 84 31C72.9543 31 64 39.9543 64 51C64 52.3789 64.1396 53.7252 64.4055 55.0272C50.6974 57.0601 40 68.7909 40 83C40 95.1503 49.8497 105 62 105H65Z"
      fill="url(#cloudGrad)"
      stroke="#CBD5E1"
      strokeWidth="2"
    />

    {/* CO2 Text inside Cloud */}
    <text
      x="100"
      y="76"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontWeight="800"
      fontSize="24"
      fill="#334155"
      letterSpacing="-0.5"
    >
      CO<tspan dy="6" fontSize="17" fill="#10B981">2</tspan>
    </text>

    {/* Downward Green Reduction Arrow */}
    <g transform="translate(0, 10)">
      <path
        d="M100 85V128M100 128L88 116M100 128L112 116"
        stroke="url(#greenArrowGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="138" r="4" fill="#10B981" />
    </g>

    {/* Orbiting Green Leaf */}
    <g transform="translate(150, 40) rotate(25)">
      <path
        d="M18 3C10 3 3 9 3 17C11 17 18 11 18 3Z"
        fill="#10B981"
      />
      <path d="M3 17C7 14 12 10 17 4" stroke="#047857" strokeWidth="1" />
    </g>

    {/* Tiny Data Dots */}
    <circle cx="48" cy="70" r="2.5" fill="#94A3B8" />
    <circle cx="152" cy="85" r="2.5" fill="#94A3B8" />
    <circle cx="118" cy="35" r="2" fill="#38BDF8" />
  </svg>
);

// Person With Laptop in Green Eco Environment (used on Auth page)
export const PersonTechIllustration: React.FC<{ className?: string }> = ({ className = "w-full max-w-sm" }) => (
  <svg
    viewBox="0 0 360 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bgCircGrad" x1="180" y1="30" x2="180" y2="270" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ECFDF5" />
        <stop offset="1" stopColor="#D1FAE5" />
      </linearGradient>
      <linearGradient id="shirtGrad" x1="140" y1="130" x2="220" y2="230" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#065F46" />
      </linearGradient>
    </defs>

    {/* Eco Soft Circle Backdrop */}
    <circle cx="180" cy="150" r="130" fill="url(#bgCircGrad)" />

    {/* Gentle foliage leaves background */}
    <path
      d="M70 240C70 190 100 160 140 160C140 210 110 240 70 240Z"
      fill="#A7F3D0"
      fillOpacity="0.7"
    />
    <path
      d="M290 230C290 180 260 155 225 160C228 205 255 235 290 230Z"
      fill="#6EE7B7"
      fillOpacity="0.5"
    />

    {/* Floating Globe Eco Badge */}
    <g transform="translate(60, 60)">
      <circle cx="28" cy="28" r="24" fill="#0284C7" fillOpacity="0.15" />
      <circle cx="28" cy="28" r="20" fill="#0284C7" />
      <path d="M18 24C24 20 28 25 34 22C38 28 35 34 26 36C20 32 15 28 18 24Z" fill="#34D399" />
      <circle cx="44" cy="14" r="5" fill="#10B981" />
      <path d="M44 14L48 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Floating CO2 Cloud Bubble */}
    <g transform="translate(240, 50)">
      <rect x="0" y="0" width="70" height="42" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
      <text x="35" y="24" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="13" fill="#334155">
        -32% <tspan fill="#10B981" fontSize="11">CO₂</tspan>
      </text>
      <path d="M30 42L35 48L40 42H30Z" fill="#FFFFFF" />
    </g>

    {/* Person Character */}
    {/* Head & Hair */}
    <circle cx="180" cy="100" r="24" fill="#FBD5BD" />
    {/* Stylish dark modern hair */}
    <path
      d="M160 96C160 80 172 70 185 70C198 70 205 78 205 90C195 86 186 88 178 94C172 98 166 98 160 96Z"
      fill="#1E293B"
    />
    {/* Smiling face features */}
    <ellipse cx="174" cy="98" rx="2" ry="2.5" fill="#334155" />
    <ellipse cx="186" cy="98" rx="2" ry="2.5" fill="#334155" />
    <path d="M177 106C179 108 182 108 184 106" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />

    {/* Neck */}
    <rect x="175" y="122" width="10" height="12" fill="#FBD5BD" />

    {/* Green Polo / Hoodie */}
    <path
      d="M152 134C162 130 198 130 208 134L228 185H132L152 134Z"
      fill="url(#shirtGrad)"
    />
    <path d="M175 134L180 148L185 134" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />

    {/* Laptop held in hands */}
    <rect x="135" y="170" width="90" height="56" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
    <rect x="140" y="175" width="80" height="46" rx="2" fill="#0F172A" />
    {/* Laptop screen code & leaf icon */}
    <path d="M148 190L158 182L168 186L180 178L195 194" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <circle cx="180" cy="204" r="7" fill="#059669" />
    <path d="M180 200C177 202 178 206 182 206C182 203 181 201 180 200Z" fill="#A7F3D0" />

    {/* Hands holding the laptop */}
    <path d="M130 190C130 198 136 205 144 204" stroke="#FBD5BD" strokeWidth="6" strokeLinecap="round" />
    <path d="M230 190C230 198 224 205 216 204" stroke="#FBD5BD" strokeWidth="6" strokeLinecap="round" />

    {/* Desk or Floating base line */}
    <path d="M60 250H300" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <circle cx="95" cy="250" r="4" fill="#10B981" />
    <circle cx="265" cy="250" r="4" fill="#10B981" />
  </svg>
);
