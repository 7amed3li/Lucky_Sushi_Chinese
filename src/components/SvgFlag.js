import React from 'react';

/**
 * Compact, consistent SVG flags for the language controls.
 * A fixed 3:2 frame keeps the header polished across platforms.
 */
export default function SvgFlag({ code, size = 16, style = {} }) {
  const flagStyle = {
    display: 'inline-block',
    width: `${Math.round(size * 1.5)}px`,
    height: `${size}px`,
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    verticalAlign: 'middle',
    boxShadow: '0 0 0 1px rgba(23, 21, 26, 0.16), 0 2px 5px rgba(23, 21, 26, 0.12)',
    ...style,
  };

  switch (code?.toLowerCase()) {
    case 'tr':
      return (
        <svg viewBox="0 0 3 2" style={flagStyle} aria-label="Turkey Flag" preserveAspectRatio="none">
          <rect width="3" height="2" fill="#E30A17" />
          <circle cx="1.08" cy="1" r=".52" fill="#FFFFFF" />
          <circle cx="1.22" cy="1" r=".42" fill="#E30A17" />
          <polygon
            points="1.8,1 2.12,1.1 1.93,.84 1.93,1.16 2.12,.9"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'en':
      return (
        <svg viewBox="0 0 3 2" style={flagStyle} aria-label="English / UK Flag" preserveAspectRatio="none">
          <rect width="3" height="2" fill="#012169" />
          <path d="M0 0 L3 2 M3 0 L0 2" stroke="#FFFFFF" strokeWidth=".42" />
          <path d="M0 0 L3 2 M3 0 L0 2" stroke="#C8102E" strokeWidth=".18" />
          <path d="M1.5 0 V2 M0 1 H3" stroke="#FFFFFF" strokeWidth=".62" />
          <path d="M1.5 0 V2 M0 1 H3" stroke="#C8102E" strokeWidth=".34" />
        </svg>
      );

    case 'ar':
      return (
        <svg viewBox="0 0 3 2" style={flagStyle} aria-label="Arabic Flag" preserveAspectRatio="none">
          <rect width="3" height="2" fill="#006C35" />
          <path d="M.58 .76 C.95 .61 1.52 .62 2.34 .76" fill="none" stroke="#FFFFFF" strokeWidth=".08" strokeLinecap="round" />
          <path d="M.7 .94 H2.28" stroke="#FFFFFF" strokeWidth=".08" strokeLinecap="round" />
          <path d="M.72 1.28 H2.28" stroke="#FFFFFF" strokeWidth=".1" strokeLinecap="round" />
          <path d="M.72 1.36 H2.02" stroke="#FFFFFF" strokeWidth=".06" strokeLinecap="round" />
        </svg>
      );

    case 'ru':
      return (
        <svg viewBox="0 0 3 2" style={flagStyle} aria-label="Russian Flag" preserveAspectRatio="none">
          <rect width="3" height=".667" fill="#FFFFFF" />
          <rect width="3" y=".667" height=".666" fill="#0039A6" />
          <rect width="3" y="1.333" height=".667" fill="#D52B1E" />
        </svg>
      );

    case 'zh':
      return (
        <svg viewBox="0 0 3 2" style={flagStyle} aria-label="Chinese Flag" preserveAspectRatio="none">
          <rect width="3" height="2" fill="#DE2910" />
          <polygon points=".55,.32 .61,.49 .79,.49 .65,.6 .7,.78 .55,.67 .4,.78 .45,.6 .31,.49 .49,.49" fill="#FFDE00" />
          <circle cx="1.03" cy=".3" r=".045" fill="#FFDE00" />
          <circle cx="1.25" cy=".48" r=".045" fill="#FFDE00" />
          <circle cx="1.25" cy=".75" r=".045" fill="#FFDE00" />
          <circle cx="1.03" cy=".93" r=".045" fill="#FFDE00" />
        </svg>
      );

    default:
      return null;
  }
}
