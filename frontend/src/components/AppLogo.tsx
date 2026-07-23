import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
  tint?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  className = '', 
  size = 100, 
  tint = '#007AFF' 
}) => {
  const w = size;
  const h = size;

  // Re-creating the Android Compose Canvas path in SVG coordinates (0-100 scale)
  // Tooth quadratic path:
  // moveTo(0.2w, 0.3h)
  // quadTo(0.2w, 0.1h, 0.5w, 0.1h) -> control point (0.2, 0.1), end (0.5, 0.1)
  // quadTo(0.8w, 0.1h, 0.8w, 0.3h) -> control point (0.8, 0.1), end (0.8, 0.3)
  // quadTo(0.85w, 0.6h, 0.7w, 0.9h) -> control (0.85, 0.6), end (0.7, 0.9)
  // lineTo(0.6w, 0.8h)
  // lineTo(0.5w, 0.9h)
  // lineTo(0.4w, 0.8h)
  // lineTo(0.3w, 0.9h)
  // quadTo(0.15w, 0.6h, 0.2w, 0.3h) -> control (0.15, 0.6), end (0.2, 0.3)

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width={w} 
        height={h} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Stylized Tooth Path */}
        <path
          d="M 20,30 
             Q 20,10 50,10 
             Q 80,10 80,30 
             Q 85,60 70,90 
             L 60,80 
             L 50,90 
             L 40,80 
             L 30,90 
             Q 15,60 20,30 Z"
          stroke={tint}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Neural Nodes (3 circles) & Connection lines */}
        <line x1="50" y1="30" x2="40" y2="45" stroke={tint} strokeWidth="1" strokeOpacity="0.5" />
        <line x1="50" y1="30" x2="60" y2="45" stroke={tint} strokeWidth="1" strokeOpacity="0.5" />
        
        <circle cx="50" cy="30" r="4" fill={tint} />
        <circle cx="40" cy="45" r="3" fill={tint} />
        <circle cx="60" cy="45" r="3" fill={tint} />

        {/* 3. RDT Measurement Bracket (Red) */}
        <line x1="35" y1="60" x2="65" y2="60" stroke="#FF5252" strokeWidth="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#FF5252" strokeWidth="2" />
        <line x1="65" y1="55" x2="65" y2="65" stroke="#FF5252" strokeWidth="2" />
      </svg>
    </div>
  );
};
export default AppLogo;
