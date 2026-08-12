import StatCounter from "./StatCounter";

export default function SiteStatsRow({ items, className = "" }) {
  return (
    <div className={`site-stats ${className}`.trim()}>
      <div className="site-stats-inner">
        {items.map(({ value, suffix, label }, i) => (
          <div key={label} className="site-stat-cell">
            <div className="site-stat-value">
              <StatCounter value={value} suffix={suffix} />
            </div>
            <p className="site-stat-label">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
