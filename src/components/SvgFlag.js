import React, { useId } from 'react';

/**
 * Universal SVG Flags for 100% reliable cross-platform rendering
 * (Fixes Windows emoji limitation where flags show as text 'TR', 'GB', etc.)
 */
export default function SvgFlag({ code, size = 16, style = {} }) {
  const s = size;
  const idPrefix = useId().replace(/:/g, '');
  const clipId = `${idPrefix}-clip`;
  const unionClipId = `${idPrefix}-union`;
  const flagStyle = {
    display: 'inline-block',
    width: `${s}px`,
    height: `${s}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
    verticalAlign: 'middle',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
    ...style,
  };

  switch (code?.toLowerCase()) {
    case 'tr':
      // Turkey: Red with White Crescent & Star
      return (
        <svg viewBox="0 0 1200 800" style={flagStyle} aria-label="Turkey Flag">
          <rect width="1200" height="800" fill="#E30A17" />
          <circle cx="425" cy="400" r="200" fill="#FFFFFF" />
          <circle cx="475" cy="400" r="160" fill="#E30A17" />
          <polygon
            points="583,400 706,440 630,335 630,465 706,360"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'en':
      // UK: Union Jack
      return (
        <svg viewBox="0 0 60 30" style={flagStyle} aria-label="English / UK Flag">
          <clipPath id={clipId}>
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id={unionClipId}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${unionClipId})`} stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      );

    case 'ar':
      // Saudi Arabia / Arabic
      return (
        <svg viewBox="0 0 900 600" style={flagStyle} aria-label="Arabic Flag">
          <rect width="900" height="600" fill="#006C35" />
          <text
            x="450"
            y="310"
            fill="#FFFFFF"
            fontSize="140"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            العربية
          </text>
          <path d="M 280,380 L 620,380 L 600,400 L 280,400 Z" fill="#FFFFFF" />
        </svg>
      );

    case 'ru':
      // Russia: White, Blue, Red
      return (
        <svg viewBox="0 0 900 600" style={flagStyle} aria-label="Russian Flag">
          <rect width="900" height="200" y="0" fill="#FFFFFF" />
          <rect width="900" height="200" y="200" fill="#0039A6" />
          <rect width="900" height="200" y="400" fill="#D52B1E" />
        </svg>
      );

    case 'zh':
      // China: Red with Gold Stars
      return (
        <svg viewBox="0 0 900 600" style={flagStyle} aria-label="Chinese Flag">
          <rect width="900" height="600" fill="#DE2910" />
          {/* Big star */}
          <polygon
            points="150,55 185,164 93,97 207,97 115,164"
            fill="#FFDE00"
          />
          {/* 4 small stars */}
          <polygon points="300,50 307,72 289,58 311,58 293,72" fill="#FFDE00" />
          <polygon points="360,100 367,122 349,108 371,108 353,122" fill="#FFDE00" />
          <polygon points="360,180 367,202 349,188 371,188 353,202" fill="#FFDE00" />
          <polygon points="300,230 307,252 289,238 311,238 293,252" fill="#FFDE00" />
        </svg>
      );

    default:
      return null;
  }
}
