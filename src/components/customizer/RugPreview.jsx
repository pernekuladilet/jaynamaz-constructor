import { useMemo } from 'react';
import { getColorConfig } from '../../config/colors.js';
import { getFontConfig } from '../../config/fonts.js';

/* ─── Material texture defs ─────────────────────────────────────── */
function MaterialTextureDef({ material }) {
  const id = `tex-${material}`;
  const defs = {
    velvet: (
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="3" y1="0" x2="3" y2="6" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      </pattern>
    ),
    velour: (
      <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="8" x2="8" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </pattern>
    ),
    cotton: (
      <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2.5" x2="5" y2="2.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="2.5" y1="0" x2="2.5" y2="5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      </pattern>
    ),
    memory_foam: (
      <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.5" fill="rgba(255,255,255,0.05)" />
      </pattern>
    ),
    silk: (
      <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      </pattern>
    ),
    turkish: (
      <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
        <polygon points="4,0 8,4 4,8 0,4" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      </pattern>
    ),
  };
  return defs[material] ?? defs.velvet;
}

/* ─── Border decorations ────────────────────────────────────────── */
function BorderDecoration({ border, accent, light }) {
  if (border === 'none') return null;

  const borderMap = {
    classic: (
      <g>
        <rect x="14" y="22" width="252" height="386" rx="3" fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x="19" y="27" width="242" height="376" rx="2" fill="none" stroke={light} strokeWidth="0.6" opacity="0.6" />
      </g>
    ),
    ornate: (
      <g>
        <rect x="13" y="21" width="254" height="388" rx="3" fill="none" stroke={accent} strokeWidth="2" />
        <rect x="18" y="26" width="244" height="378" rx="2" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.5" />
        {/* Corner ornaments */}
        {[
          [13, 21], [267, 21], [13, 409], [267, 409],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle r="4" fill={accent} opacity="0.9" />
            <circle r="2" fill={light} opacity="0.8" />
          </g>
        ))}
        {/* Mid-side ornaments */}
        {[[140, 21], [140, 409], [13, 215], [267, 215]].map(([cx, cy], i) => (
          <g key={`mid-${i}`} transform={`translate(${cx},${cy})`}>
            <rect x="-3" y="-3" width="6" height="6" fill={accent} transform="rotate(45)" opacity="0.8" />
          </g>
        ))}
        {/* Repeating top/bottom dots */}
        {[...Array(10)].map((_, i) => (
          <g key={`dot-t-${i}`}>
            <circle cx={35 + i * 23} cy="21" r="1.2" fill={accent} opacity="0.5" />
            <circle cx={35 + i * 23} cy="409" r="1.2" fill={accent} opacity="0.5" />
          </g>
        ))}
      </g>
    ),
    double: (
      <g>
        <rect x="12" y="20" width="256" height="390" rx="3" fill="none" stroke={accent} strokeWidth="2" />
        <rect x="20" y="28" width="240" height="374" rx="2" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
      </g>
    ),
    simple: (
      <rect x="16" y="24" width="248" height="382" rx="3" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
    ),
  };

  return borderMap[border] ?? null;
}

/* ─── Pattern elements ──────────────────────────────────────────── */
function PatternElement({ pattern, accent, light, baseColor }) {
  // Arch base — always rendered (dimmer for 'none')
  const archOpacity = pattern === 'none' ? 0 : 1;

  const archPath = 'M 55,250 L 55,170 Q 55,55 140,45 Q 225,55 225,170 L 225,250 Z';
  const archInnerPath = 'M 70,245 L 70,175 Q 70,72 140,63 Q 210,72 210,175 L 210,245 Z';

  const patterns = {
    classic_mihrab: (
      <g opacity={archOpacity}>
        {/* Outer arch */}
        <path d={archPath} fill="none" stroke={accent} strokeWidth="2" />
        {/* Inner arch */}
        <path d={archInnerPath} fill="none" stroke={light} strokeWidth="1" opacity="0.7" />
        {/* Hanging lamp */}
        <line x1="140" y1="63" x2="140" y2="85" stroke={accent} strokeWidth="1.5" />
        <ellipse cx="140" cy="90" rx="7" ry="10" fill="none" stroke={accent} strokeWidth="1.5" />
        <ellipse cx="140" cy="90" rx="3" ry="5" fill={accent} opacity="0.5" />
        {/* Spandrel decorations */}
        <circle cx="90" cy="80" r="5" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
        <circle cx="190" cy="80" r="5" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
        {/* Bottom band */}
        <line x1="40" y1="270" x2="240" y2="270" stroke={accent} strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="275" x2="240" y2="275" stroke={light} strokeWidth="0.5" opacity="0.3" />
        {/* Bottom small ornament */}
        <path d="M115,310 Q140,290 165,310 Q140,330 115,310Z" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* Corner quarter-circles */}
        <path d="M40,260 Q40,240 60,240" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        <path d="M240,260 Q240,240 220,240" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      </g>
    ),

    geometric: (
      <g>
        {/* 8-pointed star centered */}
        <g transform="translate(140,160)">
          {[0, 45, 90, 135].map((angle) => (
            <rect
              key={angle}
              x="-18" y="-18" width="36" height="36"
              fill="none" stroke={accent} strokeWidth="1.5"
              transform={`rotate(${angle})`}
              opacity="0.9"
            />
          ))}
          <circle r="8" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle r="3" fill={accent} opacity="0.7" />
        </g>
        {/* Surrounding smaller stars */}
        {[
          [90, 120], [190, 120], [90, 200], [190, 200],
          [140, 250], [90, 300], [190, 300],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0, 45].map((a) => (
              <rect key={a} x="-9" y="-9" width="18" height="18"
                fill="none" stroke={accent} strokeWidth="1"
                transform={`rotate(${a})`} opacity="0.6" />
            ))}
            <circle r="3" fill={accent} opacity="0.4" />
          </g>
        ))}
        {/* Connecting lines */}
        <line x1="90" y1="120" x2="190" y2="120" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="90" y1="200" x2="190" y2="200" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="90" y1="120" x2="90" y2="300" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="190" y1="120" x2="190" y2="300" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="270" x2="240" y2="270" stroke={accent} strokeWidth="1" opacity="0.4" />
      </g>
    ),

    floral: (
      <g>
        {/* Central flower */}
        <g transform="translate(140,170)">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse key={angle}
              cx={Math.cos((angle * Math.PI) / 180) * 22}
              cy={Math.sin((angle * Math.PI) / 180) * 22}
              rx="10" ry="16"
              fill="none" stroke={accent} strokeWidth="1.5"
              transform={`rotate(${angle},${Math.cos((angle * Math.PI) / 180) * 22},${Math.sin((angle * Math.PI) / 180) * 22})`}
              opacity="0.7"
            />
          ))}
          <circle r="10" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle r="4" fill={accent} opacity="0.6" />
        </g>
        {/* Vine stems */}
        <path d="M50,120 Q80,100 100,130 Q120,160 100,190 Q80,220 100,250 Q120,280 100,310 Q80,340 100,370"
          fill="none" stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
        <path d="M230,120 Q200,100 180,130 Q160,160 180,190 Q200,220 180,250 Q160,280 180,310 Q200,340 180,370"
          fill="none" stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
        {/* Small flowers on vines */}
        {[[78, 115], [78, 195], [78, 280], [202, 115], [202, 195], [202, 280]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={Math.cos((a * Math.PI) / 180) * 6} cy={Math.sin((a * Math.PI) / 180) * 6}
                rx="3" ry="5" fill={accent} opacity="0.4"
                transform={`rotate(${a},${Math.cos((a * Math.PI) / 180) * 6},${Math.sin((a * Math.PI) / 180) * 6})`} />
            ))}
            <circle r="2.5" fill={accent} opacity="0.5" />
          </g>
        ))}
        <line x1="40" y1="270" x2="240" y2="270" stroke={accent} strokeWidth="1" opacity="0.4" />
      </g>
    ),

    minimal: (
      <g>
        {/* Simple arch */}
        <path d={archPath} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6" />
        {/* Center line */}
        <line x1="140" y1="60" x2="140" y2="250" stroke={light} strokeWidth="0.5" opacity="0.3" strokeDasharray="4,4" />
        {/* Single divider */}
        <line x1="55" y1="270" x2="225" y2="270" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* Minimal diamond */}
        <rect x="132" y="152" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.5" transform="rotate(45,140,160)" />
        <rect x="136" y="156" width="8" height="8" fill={accent} opacity="0.3" transform="rotate(45,140,160)" />
      </g>
    ),

    mosque: (
      <g>
        {/* Main dome */}
        <path d="M100,220 Q100,140 140,130 Q180,140 180,220 Z" fill="none" stroke={accent} strokeWidth="2" />
        {/* Dome crescent */}
        <path d="M132,135 Q140,125 148,135 Q143,130 137,133 Z" fill={accent} opacity="0.8" />
        {/* Minaret left */}
        <rect x="55" y="165" width="18" height="55" fill="none" stroke={accent} strokeWidth="1.5" />
        <path d="M55,165 Q64,150 73,165 Z" fill={accent} opacity="0.6" />
        <line x1="64" y1="148" x2="64" y2="143" stroke={accent} strokeWidth="1" />
        <line x1="62" y1="143" x2="66" y2="143" stroke={accent} strokeWidth="1" />
        {/* Minaret right */}
        <rect x="207" y="165" width="18" height="55" fill="none" stroke={accent} strokeWidth="1.5" />
        <path d="M207,165 Q216,150 225,165 Z" fill={accent} opacity="0.6" />
        <line x1="216" y1="148" x2="216" y2="143" stroke={accent} strokeWidth="1" />
        <line x1="214" y1="143" x2="218" y2="143" stroke={accent} strokeWidth="1" />
        {/* Ground line */}
        <line x1="40" y1="220" x2="240" y2="220" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        {/* Windows */}
        <ellipse cx="140" cy="185" rx="8" ry="11" fill="none" stroke={accent} strokeWidth="1" />
        <ellipse cx="64" cy="190" rx="4" ry="6" fill="none" stroke={accent} strokeWidth="1" />
        <ellipse cx="216" cy="190" rx="4" ry="6" fill="none" stroke={accent} strokeWidth="1" />
        {/* Door */}
        <path d="M128,220 L128,200 Q140,193 152,200 L152,220 Z" fill="none" stroke={accent} strokeWidth="1" />
        <line x1="40" y1="270" x2="240" y2="270" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* Stars */}
        {[[90, 110], [140, 100], [190, 110]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <polygon points="0,-5 1.5,-1.5 5,-1.5 2.5,1 3.5,5 0,2.5 -3.5,5 -2.5,1 -5,-1.5 -1.5,-1.5"
              fill={accent} opacity="0.4" />
          </g>
        ))}
      </g>
    ),

    arabesque: (
      <g>
        {/* Complex arabesque fill */}
        <path d="M140,60 Q160,80 155,110 Q170,100 185,115 Q175,130 160,125 Q170,145 155,155 Q140,140 125,155 Q110,145 120,125 Q105,130 95,115 Q110,100 125,110 Q120,80 140,60Z"
          fill="none" stroke={accent} strokeWidth="1.5" opacity="0.8" />
        <path d="M140,60 Q160,80 155,110 Q170,100 185,115 Q175,130 160,125 Q170,145 155,155 Q140,140 125,155 Q110,145 120,125 Q105,130 95,115 Q110,100 125,110 Q120,80 140,60Z"
          fill="none" stroke={light} strokeWidth="0.6" opacity="0.4" transform="scale(0.85) translate(21,24)" />
        {/* Repeating petals below */}
        {[80, 120, 160, 200].map((y, i) => (
          <g key={i}>
            <path d={`M${70 + (i % 2) * 10},${y} Q${80 + (i % 2) * 10},${y - 15} ${90 + (i % 2) * 10},${y} Q${80 + (i % 2) * 10},${y + 15} ${70 + (i % 2) * 10},${y}Z`}
              fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
            <path d={`M${170 - (i % 2) * 10},${y} Q${180 - (i % 2) * 10},${y - 15} ${190 - (i % 2) * 10},${y} Q${180 - (i % 2) * 10},${y + 15} ${170 - (i % 2) * 10},${y}Z`}
              fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
          </g>
        ))}
        {/* Central stem */}
        <line x1="140" y1="155" x2="140" y2="360" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeDasharray="3,3" />
        {/* Side vines */}
        <path d="M140,200 Q120,210 115,230 Q130,235 140,250 Q150,235 165,230 Q160,210 140,200Z"
          fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        <path d="M140,270 Q120,280 115,300 Q130,305 140,320 Q150,305 165,300 Q160,280 140,270Z"
          fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="270" x2="240" y2="270" stroke={accent} strokeWidth="1" opacity="0.4" />
      </g>
    ),

    kazakh: (
      <g>
        {/* Ram horns (Қошқар мүйіз) */}
        <path d="M140,80 Q100,80 85,110 Q75,135 90,150 Q105,165 115,145 Q120,130 110,120 Q105,110 115,108 Q130,106 140,120"
          fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M140,80 Q180,80 195,110 Q205,135 190,150 Q175,165 165,145 Q160,130 170,120 Q175,110 165,108 Q150,106 140,120"
          fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        {/* Geometric band */}
        <line x1="40" y1="175" x2="240" y2="175" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        {/* Diamond row */}
        {[60, 90, 120, 140, 160, 180, 210].map((x, i) => (
          <rect key={i} x={x - 5} y="180" width="10" height="10"
            fill={i % 2 === 0 ? accent : 'none'} stroke={accent} strokeWidth="1"
            transform={`rotate(45,${x},185)`} opacity="0.6" />
        ))}
        <line x1="40" y1="200" x2="240" y2="200" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* Zig-zag */}
        <polyline points="40,220 60,240 80,220 100,240 120,220 140,240 160,220 180,240 200,220 220,240 240,220"
          fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        {/* Square spiral motifs */}
        {[[90, 280], [140, 300], [190, 280]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-12" y="-12" width="24" height="24" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" />
            <rect x="-7" y="-7" width="14" height="14" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
            <rect x="-3" y="-3" width="6" height="6" fill={accent} opacity="0.4" />
          </g>
        ))}
        <line x1="40" y1="335" x2="240" y2="335" stroke={accent} strokeWidth="1" opacity="0.4" />
      </g>
    ),

    none: null,
  };

  return patterns[pattern] ?? null;
}

/* ─── Tassels ───────────────────────────────────────────────────── */
function Tassels({ position, color }) {
  const y = position === 'top' ? 12 : 418;
  const dir = position === 'top' ? -1 : 1;
  return (
    <g>
      {[...Array(22)].map((_, i) => {
        const x = 12 + i * 12;
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x + (i % 3 - 1) * 1.5} y2={y + dir * 10}
              stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            <circle cx={x + (i % 3 - 1) * 1.5} cy={y + dir * 10} r="1.5"
              fill={color} opacity="0.8" />
          </g>
        );
      })}
    </g>
  );
}

/* ─── Color-base photos map ─────────────────────────────────────── */
// Когда кладёшь фото в public/rugs/colors/ — раскомментируй нужные строки
const COLOR_PHOTOS = {
  // dark_green: '/rugs/colors/dark_green.jpg',
  // burgundy:   '/rugs/colors/burgundy.jpg',
  // dark_blue:  '/rugs/colors/dark_blue.jpg',
  // black:      '/rugs/colors/black.jpg',
  // beige:      '/rugs/colors/beige.jpg',
  // gray:       '/rugs/colors/gray.jpg',
  // emerald:    '/rugs/colors/emerald.jpg',
  // teal:       '/rugs/colors/teal.jpg',
};

/* ─── Main RugPreview component ─────────────────────────────────── */
export default function RugPreview({ design, className = '' }) {
  const {
    color = 'dark_green',
    material = 'velvet',
    pattern = 'classic_mihrab',
    border = 'classic',
    text = '',
    textFont = 'playfair',
    textColor = '#C9A227',
    tassels = false,
    tasselColor = '#C9A227',
  } = design;

  const colorConfig = useMemo(() => getColorConfig(color), [color]);
  const fontConfig = useMemo(() => getFontConfig(textFont), [textFont]);

  const baseColor = colorConfig.hex;
  const accent = colorConfig.accentHex;
  const light = accent === '#C9A227' ? '#F5D48A' : '#ffffff';
  const photoUrl = COLOR_PHOTOS[color] ?? null;

  // Slightly lighter shade for the inner rug field
  const fieldColor = useMemo(() => {
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    const lighten = (v) => Math.min(255, Math.round(v + (255 - v) * 0.12));
    return `rgb(${lighten(r)},${lighten(g)},${lighten(b)})`;
  }, [baseColor]);

  // ── Hybrid mode: real photo base + SVG overlay ──────────────────
  if (photoUrl) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
      >
        {tassels && (
          <div className="absolute top-0 inset-x-0 flex justify-around px-2 -translate-y-2 z-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-0.5 h-3 rounded-full" style={{ backgroundColor: tasselColor, opacity: 0.9 }} />
            ))}
          </div>
        )}

        {/* Real photo */}
        <img
          src={photoUrl}
          alt="Жайнамаз"
          className="w-full rounded-md transition-all duration-300"
          draggable={false}
        />

        {/* SVG pattern + border + text overlay */}
        <svg
          viewBox="0 0 280 430"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <BorderDecoration border={border} accent={accent} light={light} />
          <PatternElement pattern={pattern} accent={accent} light={light} baseColor={baseColor} />
          {text && text.trim().length > 0 && (
            <text x="140" y="380" textAnchor="middle"
              fill={textColor} fontFamily={fontConfig.family}
              fontSize="13" fontWeight="500" letterSpacing="1" opacity="0.95">
              {text.trim()}
            </text>
          )}
        </svg>

        {tassels && (
          <div className="absolute bottom-0 inset-x-0 flex justify-around px-2 translate-y-2 z-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-0.5 h-3 rounded-full" style={{ backgroundColor: tasselColor, opacity: 0.9 }} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── SVG-only mode (default — пока нет фото) ──────────────────────
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 280 430"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
          maxHeight: '70vh',
        }}
        className="w-full max-w-[280px] transition-all duration-300"
        aria-label="Превью жайнамаза"
        role="img"
      >
        <defs>
          <MaterialTextureDef material={material} />
          {/* Subtle vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
          {/* Sheen for silk */}
          {material === 'silk' && (
            <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
          )}
        </defs>

        {/* ── Tassels (top) */}
        {tassels && <Tassels position="top" color={tasselColor} />}

        {/* ── Rug body */}
        <rect x="5" y="15" width="270" height="400" rx="5" fill={baseColor} />

        {/* ── Material texture */}
        <rect x="5" y="15" width="270" height="400" rx="5"
          fill={`url(#tex-${material})`} />

        {/* ── Field (slightly lighter inner area) */}
        <rect x="30" y="40" width="220" height="350" rx="3" fill={fieldColor} opacity="0.3" />

        {/* ── Border decoration */}
        <BorderDecoration border={border} accent={accent} light={light} />

        {/* ── Pattern */}
        <PatternElement
          pattern={pattern}
          accent={accent}
          light={light}
          baseColor={baseColor}
        />

        {/* ── Silk sheen overlay */}
        {material === 'silk' && (
          <rect x="5" y="15" width="270" height="400" rx="5" fill="url(#sheen)" />
        )}

        {/* ── Vignette */}
        <rect x="5" y="15" width="270" height="400" rx="5" fill="url(#vignette)" />

        {/* ── Personal text */}
        {text && text.trim().length > 0 && (
          <text
            x="140"
            y="380"
            textAnchor="middle"
            fill={textColor}
            fontFamily={fontConfig.family}
            fontSize="13"
            fontWeight="500"
            letterSpacing="1"
            opacity="0.95"
          >
            {text.trim()}
          </text>
        )}

        {/* ── Tassels (bottom) */}
        {tassels && <Tassels position="bottom" color={tasselColor} />}
      </svg>
    </div>
  );
}
