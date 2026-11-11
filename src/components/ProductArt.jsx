import { useId } from 'react'

/**
 * Studio-lit vector renders for every product type.
 * `a` / `b` are the two neon accent colours of the selected variant.
 */
export default function ProductArt({ type, a = '#39ff14', b = '#00ffa3', animated = true, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}-${uid}`

  const Defs = (
    <defs>
      <linearGradient id={id('acc')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={a} />
        <stop offset="100%" stopColor={b} />
      </linearGradient>
      <linearGradient id={id('metal')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3a3a44" />
        <stop offset="35%" stopColor="#0d0d12" />
        <stop offset="60%" stopColor="#24242c" />
        <stop offset="100%" stopColor="#060608" />
      </linearGradient>
      <linearGradient id={id('chrome')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f4f4ff" />
        <stop offset="45%" stopColor="#6d6d7a" />
        <stop offset="55%" stopColor="#1b1b22" />
        <stop offset="100%" stopColor="#9a9aaa" />
      </linearGradient>
      <radialGradient id={id('face')} cx="0.4" cy="0.35" r="0.75">
        <stop offset="0%" stopColor="#1d1d26" />
        <stop offset="100%" stopColor="#020203" />
      </radialGradient>
      <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.04" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
      </linearGradient>
      <linearGradient id={id('liquid')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.95" />
        <stop offset="100%" stopColor={b} stopOpacity="0.55" />
      </linearGradient>
      <radialGradient id={id('floor')} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor={a} stopOpacity="0.55" />
        <stop offset="60%" stopColor={b} stopOpacity="0.12" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <filter id={id('glow')} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="b1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b2" />
        <feMerge>
          <feMergeNode in="b2" />
          <feMergeNode in="b1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={id('soft')} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="18" />
      </filter>
    </defs>
  )

  const floor = (
    <g>
      <ellipse cx="200" cy="352" rx="150" ry="22" fill={`url(#${id('floor')})`} />
      <ellipse cx="200" cy="350" rx="90" ry="8" fill="#000" opacity="0.7" filter={`url(#${id('soft')})`} />
    </g>
  )

  const shapes = {
    watch: (
      <g>
        {/* strap */}
        <path d="M150 20 h100 l-8 105 h-84z" fill={`url(#${id('metal')})`} />
        <path d="M158 300 h84 l8 75 h-100z" fill={`url(#${id('metal')})`} />
        {[40, 60, 80, 100].map((y) => (
          <line key={y} x1="160" x2="240" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        {/* crown */}
        <rect x="318" y="196" width="22" height="18" rx="4" fill={`url(#${id('chrome')})`} />
        {/* case */}
        <circle cx="200" cy="205" r="122" fill={`url(#${id('chrome')})`} />
        <circle cx="200" cy="205" r="114" fill={`url(#${id('metal')})`} />
        {/* neon chapter ring */}
        <circle cx="200" cy="205" r="104" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="3" filter={`url(#${id('glow')})`} />
        <circle cx="200" cy="205" r="98" fill={`url(#${id('face')})`} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="200" y1="115" x2="200" y2={i % 3 === 0 ? 135 : 125}
            stroke={i % 3 === 0 ? b : '#8a8a99'}
            strokeWidth={i % 3 === 0 ? 4 : 2}
            strokeLinecap="round"
            transform={`rotate(${i * 30} 200 205)`}
          />
        ))}
        {/* sub-dials */}
        <circle cx="200" cy="250" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
        <circle cx="160" cy="205" r="16" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
        <text x="200" y="168" textAnchor="middle" fontSize="11" letterSpacing="4" fill="#d8d8e8" fontFamily="Manrope">KOEWAN</text>
        {/* hands */}
        <line x1="200" y1="205" x2="200" y2="138" stroke="#f2f2ff" strokeWidth="5" strokeLinecap="round" transform="rotate(-50 200 205)" />
        <line x1="200" y1="205" x2="200" y2="158" stroke="#f2f2ff" strokeWidth="6" strokeLinecap="round" transform="rotate(62 200 205)" />
        <g className={animated ? 'kw-spin-sec' : ''} style={{ transformOrigin: '200px 205px' }}>
          <line x1="200" y1="225" x2="200" y2="118" stroke={a} strokeWidth="2" filter={`url(#${id('glow')})`} />
        </g>
        <circle cx="200" cy="205" r="6" fill={a} filter={`url(#${id('glow')})`} />
        {/* crystal reflection */}
        <path d="M120 160 A100 100 0 0 1 250 112 A120 120 0 0 0 128 190z" fill="#fff" opacity="0.07" />
      </g>
    ),

    headphones: (
      <g>
        <path d="M95 235 C95 80 305 80 305 235" fill="none" stroke={`url(#${id('chrome')})`} strokeWidth="16" strokeLinecap="round" />
        <path d="M95 235 C95 80 305 80 305 235" fill="none" stroke="#0a0a0e" strokeWidth="8" strokeLinecap="round" />
        <path d="M115 150 C140 100 260 100 285 150" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="3" filter={`url(#${id('glow')})`} />
        {[{ x: 95, flip: -1 }, { x: 305, flip: 1 }].map(({ x, flip }) => (
          <g key={x}>
            <rect x={x - 12} y="200" width="24" height="40" rx="6" fill={`url(#${id('chrome')})`} />
            <rect x={x - 48} y="225" width="96" height="125" rx="46" fill={`url(#${id('metal')})`} stroke="#2a2a33" />
            <rect x={x - 38} y="237" width="76" height="101" rx="36" fill="#050507" />
            <rect
              x={x - 38} y="237" width="76" height="101" rx="36" fill="none"
              stroke={`url(#${id('acc')})`} strokeWidth="3" filter={`url(#${id('glow')})`}
              className={animated ? 'kw-pulse' : ''}
            />
            <ellipse cx={x + flip * -14} cy="262" rx="10" ry="22" fill="#fff" opacity="0.06" />
          </g>
        ))}
      </g>
    ),

    fragrance: (
      <g>
        {/* cap */}
        <rect x="165" y="40" width="70" height="70" rx="6" fill={`url(#${id('metal')})`} stroke="#33333d" />
        <rect x="165" y="40" width="70" height="70" rx="6" fill="none" stroke={`url(#${id('acc')})`} strokeOpacity="0.6" />
        <rect x="183" y="110" width="34" height="22" fill={`url(#${id('chrome')})`} />
        {/* bottle */}
        <rect x="105" y="130" width="190" height="215" rx="22" fill="#0b0b10" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />
        <clipPath id={id('bottle')}>
          <rect x="113" y="138" width="174" height="199" rx="16" />
        </clipPath>
        <g clipPath={`url(#${id('bottle')})`}>
          <g className={animated ? 'kw-wave' : ''}>
            <path
              d="M60 190 Q110 175 160 190 T260 190 T360 190 V345 H60z"
              fill={`url(#${id('liquid')})`}
              opacity="0.85"
            />
          </g>
          <rect x="113" y="138" width="174" height="199" fill={`url(#${id('glass')})`} />
        </g>
        <rect x="105" y="130" width="190" height="215" rx="22" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} opacity="0.8" />
        <rect x="140" y="232" width="120" height="58" rx="2" fill="#050507" opacity="0.88" />
        <text x="200" y="258" textAnchor="middle" fontSize="15" letterSpacing="6" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="276" textAnchor="middle" fontSize="7" letterSpacing="3" fill={b} fontFamily="Manrope">EXTRAIT DE PARFUM</text>
        <rect x="122" y="145" width="10" height="180" rx="5" fill="#fff" opacity="0.12" />
      </g>
    ),

    eyewear: (
      <g transform="translate(0 30)">
        <path d="M30 150 L5 130" stroke={`url(#${id('chrome')})`} strokeWidth="7" strokeLinecap="round" />
        <path d="M370 150 L395 130" stroke={`url(#${id('chrome')})`} strokeWidth="7" strokeLinecap="round" />
        <path d="M178 160 Q200 140 222 160" fill="none" stroke={`url(#${id('chrome')})`} strokeWidth="8" />
        {[{ x: 30 }, { x: 222 }].map(({ x }) => (
          <g key={x}>
            <path
              d={`M${x} 145 Q${x} 135 ${x + 12} 135 H${x + 136} Q${x + 148} 135 ${x + 148} 147 Q${x + 148} 230 ${x + 74} 240 Q${x} 230 ${x} 145z`}
              fill={`url(#${id('metal')})`} stroke="#2e2e38" strokeWidth="8"
            />
            <path
              d={`M${x + 8} 150 Q${x + 8} 143 ${x + 16} 143 H${x + 132} Q${x + 140} 143 ${x + 140} 151 Q${x + 140} 222 ${x + 74} 231 Q${x + 8} 222 ${x + 8} 150z`}
              fill={`url(#${id('acc')})`} opacity="0.85"
            />
            <path
              d={`M${x + 8} 150 Q${x + 8} 143 ${x + 16} 143 H${x + 132} Q${x + 140} 143 ${x + 140} 151 Q${x + 140} 222 ${x + 74} 231 Q${x + 8} 222 ${x + 8} 150z`}
              fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`}
            />
            <path d={`M${x + 22} 152 L${x + 70} 152 L${x + 30} 210z`} fill="#fff" opacity="0.18" />
            <rect x={x} y="135" width="148" height="105" fill="#000" opacity="0.25" />
          </g>
        ))}
      </g>
    ),

    ring: (
      <g>
        <ellipse cx="200" cy="245" rx="120" ry="95" fill="none" stroke={`url(#${id('chrome')})`} strokeWidth="26" />
        <ellipse cx="200" cy="245" rx="120" ry="95" fill="none" stroke="#08080b" strokeWidth="14" />
        <ellipse cx="200" cy="245" rx="120" ry="95" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} strokeDasharray="6 10" className={animated ? 'kw-dash' : ''} />
        {/* setting */}
        <path d="M165 160 L180 120 L220 120 L235 160z" fill={`url(#${id('chrome')})`} />
        {/* gem */}
        <g filter={`url(#${id('glow')})`}>
          <polygon points="200,30 250,70 230,125 170,125 150,70" fill={`url(#${id('acc')})`} />
        </g>
        <polygon points="200,30 250,70 200,80 150,70" fill="#fff" opacity="0.35" />
        <polygon points="150,70 200,80 170,125" fill="#000" opacity="0.25" />
        <polygon points="250,70 200,80 230,125" fill="#fff" opacity="0.12" />
        <line x1="200" y1="80" x2="200" y2="125" stroke="#fff" strokeOpacity="0.3" />
        <g className={animated ? 'kw-twinkle' : ''}>
          <path d="M235 42 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z" fill="#fff" />
        </g>
      </g>
    ),

    speaker: (
      <g>
        <rect x="125" y="40" width="150" height="290" fill={`url(#${id('metal')})`} />
        <ellipse cx="200" cy="40" rx="75" ry="20" fill="#1c1c24" stroke="#3a3a46" />
        <ellipse cx="200" cy="40" rx="40" ry="10" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} />
        {Array.from({ length: 16 }).map((_, r) =>
          Array.from({ length: 9 }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={139 + c * 15.5}
              cy={78 + r * 14}
              r="2.4"
              fill="#000"
              opacity={0.35 + Math.sin((c / 8) * Math.PI) * 0.5}
            />
          ))
        )}
        <rect x="125" y="40" width="150" height="290" fill={`url(#${id('glass')})`} />
        <ellipse cx="200" cy="330" rx="75" ry="20" fill="#09090c" />
        <ellipse
          cx="200" cy="330" rx="75" ry="20" fill="none"
          stroke={`url(#${id('acc')})`} strokeWidth="4" filter={`url(#${id('glow')})`}
          className={animated ? 'kw-pulse' : ''}
        />
      </g>
    ),

    /* ---------- K-beauty ---------- */
    serum: (
      <g>
        {/* dropper bulb + collar */}
        <rect x="183" y="30" width="34" height="80" rx="17" fill="#0c0c10" stroke="#2c2c36" />
        <rect x="189" y="38" width="6" height="56" rx="3" fill="#fff" opacity="0.1" />
        <rect x="168" y="106" width="64" height="46" rx="6" fill={`url(#${id('chrome')})`} />
        <rect x="168" y="146" width="64" height="4" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
        <rect x="178" y="150" width="44" height="22" fill={`url(#${id('metal')})`} />
        {/* bottle */}
        <rect x="140" y="168" width="120" height="180" rx="20" fill="#0a0a0e" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />
        <clipPath id={id('serum')}><rect x="146" y="174" width="108" height="168" rx="15" /></clipPath>
        <g clipPath={`url(#${id('serum')})`}>
          <g className={animated ? 'kw-wave' : ''}>
            <path d="M90 215 Q130 203 170 215 T250 215 T330 215 V350 H90z" fill={`url(#${id('liquid')})`} opacity="0.85" />
          </g>
          <rect x="146" y="174" width="108" height="168" fill={`url(#${id('glass')})`} />
        </g>
        {/* pipette */}
        <rect x="196" y="170" width="8" height="150" rx="4" fill="#fff" opacity="0.18" />
        <rect x="196" y="300" width="8" height="20" rx="4" fill={a} filter={`url(#${id('glow')})`} />
        <rect x="140" y="168" width="120" height="180" rx="20" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} opacity="0.8" />
        <text x="200" y="258" textAnchor="middle" fontSize="13" letterSpacing="5" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="274" textAnchor="middle" fontSize="6.5" letterSpacing="2.5" fill="#fff" opacity="0.75" fontFamily="Manrope">AMPOULE · SEOUL</text>
        <rect x="152" y="182" width="7" height="150" rx="3.5" fill="#fff" opacity="0.14" />
      </g>
    ),

    toner: (
      <g>
        <rect x="160" y="40" width="80" height="62" rx="10" fill={`url(#${id('metal')})`} stroke="#33333d" />
        {[52, 62, 72, 82, 92].map((y) => (
          <line key={y} x1="164" x2="236" y1={y} y2={y} stroke="#fff" strokeOpacity="0.06" />
        ))}
        <rect x="160" y="96" width="80" height="4" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
        <rect x="132" y="100" width="136" height="248" rx="34" fill="#0b0b10" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />
        <clipPath id={id('toner')}><rect x="139" y="107" width="122" height="234" rx="28" /></clipPath>
        <g clipPath={`url(#${id('toner')})`}>
          <g className={animated ? 'kw-wave' : ''}>
            <path d="M70 160 Q115 148 160 160 T250 160 T340 160 V350 H70z" fill={`url(#${id('liquid')})`} opacity="0.7" />
          </g>
          <rect x="139" y="107" width="122" height="234" fill={`url(#${id('glass')})`} />
        </g>
        <rect x="132" y="100" width="136" height="248" rx="34" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} opacity="0.8" />
        <rect x="150" y="215" width="100" height="70" rx="2" fill="#050507" opacity="0.88" />
        <text x="200" y="243" textAnchor="middle" fontSize="14" letterSpacing="5" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="260" textAnchor="middle" fontSize="6.5" letterSpacing="2.5" fill={b} fontFamily="Manrope">ESSENCE TONER</text>
        <text x="200" y="274" textAnchor="middle" fontSize="6" letterSpacing="2" fill="#8d8b9e" fontFamily="Manrope">150 ml</text>
        <rect x="146" y="118" width="9" height="210" rx="4.5" fill="#fff" opacity="0.12" />
      </g>
    ),

    jar: (
      <g>
        {/* lid */}
        <rect x="88" y="138" width="224" height="72" rx="16" fill={`url(#${id('metal')})`} stroke="#34343f" />
        {Array.from({ length: 26 }).map((_, i) => (
          <line key={i} x1={98 + i * 8} x2={98 + i * 8} y1="146" y2="202" stroke="#fff" strokeOpacity="0.045" />
        ))}
        <rect x="88" y="138" width="224" height="72" rx="16" fill="none" stroke={`url(#${id('acc')})`} strokeOpacity="0.6" />
        <rect x="96" y="204" width="208" height="5" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
        {/* jar body */}
        <rect x="100" y="208" width="200" height="140" rx="26" fill="#0b0b10" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2" />
        <clipPath id={id('jar')}><rect x="107" y="214" width="186" height="128" rx="21" /></clipPath>
        <g clipPath={`url(#${id('jar')})`}>
          <rect x="107" y="226" width="186" height="120" fill={`url(#${id('liquid')})`} opacity="0.55" />
          <path d="M107 230 Q150 218 200 232 T293 228 V240 H107z" fill="#fff" opacity="0.22" />
          <rect x="107" y="214" width="186" height="128" fill={`url(#${id('glass')})`} />
        </g>
        <rect x="100" y="208" width="200" height="140" rx="26" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} opacity="0.7" />
        <rect x="140" y="262" width="120" height="44" rx="2" fill="#050507" opacity="0.88" />
        <text x="200" y="283" textAnchor="middle" fontSize="13" letterSpacing="5" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="297" textAnchor="middle" fontSize="6" letterSpacing="2.5" fill={b} fontFamily="Manrope">BARRIER CREAM</text>
        <rect x="114" y="222" width="8" height="112" rx="4" fill="#fff" opacity="0.12" />
      </g>
    ),

    cushion: (
      <g>
        {/* open lid with mirror */}
        <ellipse cx="200" cy="140" rx="132" ry="96" fill={`url(#${id('chrome')})`} />
        <ellipse cx="200" cy="140" rx="122" ry="87" fill="#0d0d13" />
        <ellipse cx="200" cy="140" rx="112" ry="78" fill={`url(#${id('glass')})`} stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} />
        <path d="M120 110 Q160 70 230 72 Q170 92 135 140z" fill="#fff" opacity="0.12" />
        <text x="200" y="146" textAnchor="middle" fontSize="15" letterSpacing="6" fill="#f2f2ff" opacity="0.8" fontFamily="Cormorant Garamond">KOEWAN</text>
        {/* hinge */}
        <rect x="178" y="226" width="44" height="16" rx="5" fill={`url(#${id('chrome')})`} />
        {/* base */}
        <ellipse cx="200" cy="300" rx="146" ry="56" fill={`url(#${id('metal')})`} stroke="#34343f" />
        <path d="M54 300 V316 A146 56 0 0 0 346 316 V300" fill="#08080b" />
        <ellipse cx="200" cy="298" rx="146" ry="56" fill="none" stroke={`url(#${id('acc')})`} strokeWidth="2" filter={`url(#${id('glow')})`} opacity="0.7" />
        <ellipse cx="200" cy="292" rx="112" ry="38" fill="#14141a" />
        <ellipse cx="200" cy="292" rx="100" ry="32" fill={`url(#${id('acc')})`} opacity="0.85" />
        <ellipse cx="170" cy="282" rx="36" ry="10" fill="#fff" opacity="0.25" />
        {/* puff texture */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} cx={130 + (i % 6) * 28} cy={280 + Math.floor(i / 6) * 12} r="1.6" fill="#000" opacity="0.18" />
        ))}
      </g>
    ),

    lipstick: (
      <g>
        {/* cap lying beside */}
        <g transform="rotate(-18 310 300)">
          <rect x="262" y="250" width="80" height="92" rx="8" fill={`url(#${id('metal')})`} stroke="#34343f" />
          <rect x="262" y="250" width="80" height="6" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
          <text x="302" y="305" textAnchor="middle" fontSize="9" letterSpacing="3" fill="#d8d8e8" fontFamily="Cormorant Garamond">K</text>
        </g>
        {/* bullet */}
        <path d="M168 150 V82 Q168 70 180 64 L222 42 Q232 38 232 50 V150z" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
        <path d="M174 148 V86 Q174 76 184 70 L196 64 V148z" fill="#fff" opacity="0.22" />
        {/* inner sleeve */}
        <rect x="160" y="146" width="80" height="62" rx="4" fill={`url(#${id('chrome')})`} />
        {/* base tube */}
        <rect x="150" y="204" width="100" height="144" rx="8" fill={`url(#${id('metal')})`} stroke="#34343f" />
        <rect x="150" y="204" width="100" height="6" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
        <rect x="160" y="216" width="8" height="122" rx="4" fill="#fff" opacity="0.1" />
        <text x="200" y="290" textAnchor="middle" fontSize="12" letterSpacing="4" fill="#d8d8e8" fontFamily="Cormorant Garamond" transform="rotate(-90 200 285)">KOEWAN</text>
      </g>
    ),

    mask: (
      <g>
        <rect x="108" y="36" width="184" height="310" rx="14" fill={`url(#${id('metal')})`} stroke="#34343f" />
        {/* crimp edges */}
        <path d={`M112 52 ${Array.from({ length: 22 }).map((_, i) => `L${116 + i * 8} ${i % 2 ? 52 : 46}`).join(' ')}`} fill="none" stroke="#fff" strokeOpacity="0.12" />
        <path d={`M112 330 ${Array.from({ length: 22 }).map((_, i) => `L${116 + i * 8} ${i % 2 ? 330 : 336}`).join(' ')}`} fill="none" stroke="#fff" strokeOpacity="0.12" />
        <rect x="108" y="36" width="184" height="310" rx="14" fill="none" stroke={`url(#${id('acc')})`} strokeOpacity="0.55" />
        {/* neon face line art */}
        <g fill="none" stroke={`url(#${id('acc')})`} strokeWidth="3" strokeLinecap="round" filter={`url(#${id('glow')})`} className={animated ? 'kw-pulse' : ''}>
          <path d="M200 82 C150 82 138 130 140 168 C142 214 170 246 200 248 C230 246 258 214 260 168 C262 130 250 82 200 82z" />
          <path d="M166 150 q12 -8 24 0" />
          <path d="M210 150 q12 -8 24 0" />
          <path d="M184 210 q16 10 32 0" />
        </g>
        <text x="200" y="286" textAnchor="middle" fontSize="15" letterSpacing="6" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="304" textAnchor="middle" fontSize="7" letterSpacing="3" fill={b} fontFamily="Manrope">SHEET MASK · 25 ml</text>
        <path d="M118 60 L150 60 L120 200z" fill="#fff" opacity="0.05" />
      </g>
    ),

    tube: (
      <g>
        {/* tube body (cap at bottom) */}
        <path d="M118 40 H282 L250 292 H150z" fill={`url(#${id('metal')})`} stroke="#34343f" />
        <rect x="114" y="34" width="172" height="16" rx="3" fill="#121218" stroke="#34343f" />
        {[38, 42, 46].map((y) => (
          <line key={y} x1="118" x2="282" y1={y} y2={y} stroke="#fff" strokeOpacity="0.1" />
        ))}
        <path d="M134 120 H266 L262 150 H138z" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} opacity="0.9" />
        <text x="200" y="196" textAnchor="middle" fontSize="15" letterSpacing="6" fill="#f2f2ff" fontFamily="Cormorant Garamond">KOEWAN</text>
        <text x="200" y="214" textAnchor="middle" fontSize="7" letterSpacing="3" fill={b} fontFamily="Manrope">SEOUL · 50 ml</text>
        <path d="M128 56 L148 56 L160 280 L152 280z" fill="#fff" opacity="0.08" />
        {/* cap */}
        <rect x="146" y="290" width="108" height="56" rx="10" fill={`url(#${id('chrome')})`} />
        <rect x="146" y="290" width="108" height="5" fill={`url(#${id('acc')})`} filter={`url(#${id('glow')})`} />
      </g>
    ),
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={`product-art ${className}`}
      role="img"
      aria-label={`${type} render`}
    >
      {Defs}
      {floor}
      {shapes[type] ?? shapes.watch}
    </svg>
  )
}
