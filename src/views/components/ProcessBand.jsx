import React from 'react';
import { Link } from 'react-router-dom';
import './ProcessBand.css';

// ─── Hand-drawn TV illustration (Oatly marker style, original redraw) ───────
// Oatly's TV is wobbly hand-drawn paths; this recreates that feel:
// feTurbulence wobble filter on the frame, doodle faces inside the dials,
// lemon-shaped speaker dots, white gap dot, chunky base bar.
const LEMON = 'M0,-4.5 C3,-1.5 3,1.8 0,5 C-3,1.8 -3,-1.5 0,-4.5 Z';

function TvIllustration() {
  const dots = [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      dots.push(
        <path
          key={`${row}-${col}`}
          d={LEMON}
          transform={`translate(${412 + col * 20} ${262 + row * 13})`}
          fill="#111"
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 640 430" role="img" aria-label="Retro television showing The Oatly Process">
      <defs>
        {/* Marker-wobble: roughens perfect geometry like hand ink */}
        <filter id="oatly-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
      </defs>

      {/* slim base bar */}
      <g filter="url(#oatly-wobble)">
        <rect x={70} y={394} width={500} height={20} rx={9} fill="#111" />
      </g>

      {/* body */}
      <g filter="url(#oatly-wobble)">
        <rect x={30} y={18} width={580} height={382} rx={36} fill="#111" />
        {/* white gap line inside the frame */}
        <rect x={43} y={31} width={554} height={356} rx={28} fill="none" stroke="#fff" strokeWidth={5} />
        {/* screen */}
        <rect x={64} y={54} width={322} height={310} rx={16} fill="#fff" />
        {/* thin inner screen outline (Oatly's screen has a visible inset line) */}
        <rect x={74} y={64} width={302} height={290} rx={12} fill="none" stroke="#111" strokeWidth={3} />
        {/* side panel */}
        <rect x={400} y={54} width={158} height={310} rx={16} fill="#fff" />
        {/* lone white dot on the black strip */}
        <circle cx={576} cy={240} r={6} fill="#fff" />
      </g>

      {/* screen lettering (chunky rounded, like Oatly's) */}
      <g fontFamily="'Titan One','Arial Rounded MT Bold',sans-serif" fill="#111" textAnchor="middle">
        <text x={225} y={170} fontSize={54}>THE OATLY</text>
        <text x={225} y={230} fontSize={54}>PROCESS</text>
      </g>

      {/* PLAY mark, small and centred low on the screen */}
      <g>
        <circle cx={200} cy={296} r={18} fill="none" stroke="#111" strokeWidth={6} />
        <path d="M194 286 L210 296 L194 306 Z" fill="#111" />
        <text
          x={228}
          y={303}
          fontFamily="'Montserrat','Futura',sans-serif"
          fontWeight={600}
          fontSize={17}
          letterSpacing={3}
          fill="#111"
        >
          PLAY
        </text>
      </g>

      {/* dials with quirky doodle faces (Oatly's knobs have odd little faces) */}
      <g stroke="#111" strokeWidth={6} fill="none">
        <circle cx={479} cy={120} r={27} />
        <circle cx={479} cy={196} r={27} />
      </g>
      <g fill="#111">
        <circle cx={470} cy={114} r={3.5} />
        <circle cx={488} cy={116} r={4.5} />
        <path d="M468 128 Q479 136 490 127" stroke="#111" strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <circle cx={471} cy={191} r={4.5} />
        <circle cx={487} cy={190} r={3.5} />
        <path d="M469 204 Q478 210 489 202" stroke="#111" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </g>

      {/* lemon-dot speaker grille */}
      <g>{dots}</g>
    </svg>
  );
}

// ─── PROCESS BAND (View) ────────────────────────────────────────────────────
// Same UI + same copy as oatly.com product pages. PLAY (the TV) links to our
// process story (/oatly-who); Oatly's own player loads its film dynamically,
// which can't be hotlinked, so on-site story is the honest equivalent.
export default function ProcessBand() {
  return (
    <section className="process" aria-label="How we make our oat drinks">
      <div className="process__inner">
        <Link to="/oatly-who" className="process__tv" aria-label="Play: how we make our oat drinks">
          <TvIllustration />
        </Link>
        <div>
          <h2 className="process__headline">How do we make our oat drinks?</h2>
          <p className="process__copy">
            Our oat base is just oats and water. But it&rsquo;s{' '}
            <Link to="/oatly-who">what we do</Link> with those oats and that
            water that makes Oatly so special.
          </p>
        </div>
      </div>
    </section>
  );
}
