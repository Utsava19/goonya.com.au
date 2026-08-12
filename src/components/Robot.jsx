export default function Robot({ compact = false, onDark = false }) {
  const A = "#9b7cff";
  const gridOpacity = onDark ? 0.08 : 0.12;

  return (
    <div className={compact ? "robot-compact" : "robot-full"}>
      <svg viewBox="0 0 420 480" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
        <defs>
          <filter id="robot-glow4">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="robot-glow2">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <style>{`
            .r-arm1 { animation: armSwing1 2.5s ease-in-out infinite alternate; transform-origin: 148px 249px; }
            .r-arm2 { animation: armSwing2 2s ease-in-out infinite alternate; transform-origin: 148px 249px; }
            .r-eye  { animation: eyePulse 1.2s ease-in-out infinite alternate; }
            .r-node { animation: nodePulse 2s ease-in-out infinite alternate; }
            .r-node:nth-child(2) { animation-delay: .5s; }
            .r-node:nth-child(3) { animation-delay: 1s; }
            .r-node:nth-child(4) { animation-delay: 1.5s; }
            .r-pkt1 { animation: pkt 2s linear infinite; }
            .r-pkt2 { animation: pkt 2s linear infinite .8s; }
            .r-ring1 { animation: spin 12s linear infinite; transform-origin: 210px 280px; }
            .r-ring2 { animation: spinR 8s linear infinite; transform-origin: 210px 280px; }
            @keyframes armSwing1 { from{transform:rotate(-8deg)} to{transform:rotate(8deg)} }
            @keyframes armSwing2 { from{transform:rotate(6deg)} to{transform:rotate(-6deg)} }
            @keyframes eyePulse  { from{opacity:.6} to{opacity:.2} }
            @keyframes nodePulse { from{transform:scale(1)} to{transform:scale(1.15)} }
            @keyframes pkt { from{stroke-dashoffset:0} to{stroke-dashoffset:-220} }
            @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes spinR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
          `}</style>
        </defs>
        <g opacity={gridOpacity} stroke={A} strokeWidth=".7" fill="none">
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" strokeDasharray="3 9" />
          ))}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="420" y2={y} strokeDasharray="3 9" />
          ))}
        </g>
        <ellipse className="r-ring1" cx="210" cy="280" rx="160" ry="50" fill="none" stroke={A} strokeWidth=".8" opacity=".2" strokeDasharray="4 8" />
        <ellipse className="r-ring2" cx="210" cy="280" rx="120" ry="35" fill="none" stroke={A} strokeWidth=".8" opacity=".15" strokeDasharray="2 6" />
        <path d="M40,440 L40,370 L120,370 L120,310" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" opacity=".4" />
        <path d="M380,440 L380,350 L300,350 L300,270" stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="220" opacity=".4" />
        <path className="r-pkt1" d="M40,440 L40,370 L120,370 L120,310" stroke={A} strokeWidth="2.5" fill="none" strokeDasharray="8 212" filter="url(#robot-glow2)" opacity=".8" />
        <path className="r-pkt2" d="M380,440 L380,350 L300,350 L300,270" stroke={A} strokeWidth="2.5" fill="none" strokeDasharray="8 212" filter="url(#robot-glow2)" opacity=".8" />
        <rect x="155" y="378" width="110" height="20" rx="4" fill="#1a1230" stroke={A} strokeWidth="1" />
        <rect x="165" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9" />
        <rect x="225" y="366" width="30" height="14" rx="4" fill="#0f0c1e" stroke={A} strokeWidth=".9" />
        <rect x="145" y="228" width="130" height="140" rx="12" fill="#0f0c1e" stroke={A} strokeWidth="1.2" />
        <line x1="145" y1="276" x2="275" y2="276" stroke={A} strokeWidth=".6" opacity=".35" />
        <line x1="145" y1="316" x2="275" y2="316" stroke={A} strokeWidth=".6" opacity=".35" />
        <circle cx="168" cy="252" r="4" fill={A} filter="url(#robot-glow2)" opacity=".9" />
        <circle cx="185" cy="252" r="4" fill="#4ade80" filter="url(#robot-glow2)" opacity=".9" />
        <circle cx="202" cy="252" r="4" fill="#f87171" filter="url(#robot-glow2)" opacity=".7" />
        <rect x="162" y="288" width="96" height="50" rx="6" fill="#080614" stroke={A} strokeWidth=".8" />
        <text x="210" y="308" textAnchor="middle" fontSize="9" fill="#4ade80" fontFamily="monospace">■■■■■■░░</text>
        <text x="210" y="326" textAnchor="middle" fontSize="8" fill={A} fontFamily="monospace" opacity=".6">STATUS: OK</text>
        <rect x="196" y="226" width="28" height="14" rx="3" fill="#1a1230" stroke={A} strokeWidth=".8" />
        <rect x="155" y="138" width="110" height="88" rx="14" fill="#0f0c1e" stroke={A} strokeWidth="1.5" />
        <ellipse className="r-eye" cx="191" cy="170" rx="14" ry="10" fill={A} opacity=".6" />
        <ellipse className="r-eye" cx="229" cy="170" rx="14" ry="10" fill={A} opacity=".6" />
        <ellipse cx="191" cy="170" rx="8" ry="7" fill={A} filter="url(#robot-glow4)" />
        <ellipse cx="229" cy="170" rx="8" ry="7" fill={A} filter="url(#robot-glow4)" />
        <circle cx="191" cy="170" r="3" fill="white" />
        <circle cx="229" cy="170" r="3" fill="white" />
        <rect x="178" y="196" width="64" height="6" rx="3" fill="#1a1230" stroke={A} strokeWidth=".8" />
        <line x1="210" y1="138" x2="210" y2="113" stroke={A} strokeWidth="1.5" />
        <circle cx="210" cy="106" r="7" fill="#0f0c1e" stroke={A} strokeWidth="1.5" />
        <circle cx="210" cy="106" r="3" fill={A} filter="url(#robot-glow4)" />
        <g className="r-arm1">
          <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1" />
          <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2" />
          <g className="r-arm2">
            <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9" />
            <path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9" />
            <path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9" />
          </g>
        </g>
        <g transform="translate(420,0) scale(-1,1)">
          <rect x="80" y="238" width="68" height="22" rx="8" fill="#0f0c1e" stroke={A} strokeWidth="1" />
          <circle cx="148" cy="249" r="10" fill="#1a1230" stroke={A} strokeWidth="1.2" />
          <rect x="30" y="243" width="54" height="16" rx="6" fill="#0f0c1e" stroke={A} strokeWidth=".9" />
          <path d="M30,246 Q15,238 8,243 Q15,251 30,251" fill="#1a1230" stroke={A} strokeWidth=".9" />
          <path d="M30,252 Q15,258 8,253 Q15,246 30,252" fill="#1a1230" stroke={A} strokeWidth=".9" />
        </g>
        {[
          { cx: 50, cy: 118, label: "GROW" },
          { cx: 372, cy: 98, label: "BUILD" },
          { cx: 388, cy: 298, label: "SCALE" },
          { cx: 32, cy: 318, label: "WIN" },
        ].map(({ cx, cy, label }) => (
          <g key={label} className="r-node">
            <circle cx={cx} cy={cy} r="24" fill="#0a0818" stroke={A} strokeWidth="1" opacity=".85" />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={A} fontFamily="monospace" fontWeight="bold" letterSpacing="1">{label}</text>
          </g>
        ))}
        <ellipse cx="210" cy="398" rx="80" ry="12" fill={A} opacity=".1" filter="url(#robot-glow4)" />
      </svg>
      <style>{`
        .robot-full { height: 500px; max-width: 420px; margin: 0 auto; }
        .robot-compact { height: 280px; max-width: 260px; margin: 0 auto; }
        @media (max-width: 850px) {
          .robot-compact { height: 220px; max-width: 220px; }
        }
      `}</style>
    </div>
  );
}
