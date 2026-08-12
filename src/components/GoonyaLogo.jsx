/**
 * Goonya wordmark — “GO on ya” (good on ya / go on ya).
 * Reads as encouragement; sounds like Goonya when said fast.
 */
export default function GoonyaLogo({ height = 44, className = "", style = {}, showTag = false }) {
  const base = Math.round(height * 0.46);
  const goSize = Math.round(base * 1.18);
  const onYaSize = Math.round(base * 0.92);

  return (
    <span
      className={className}
      aria-label="Goonya — go on ya"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: "0.22em",
          fontFamily: "'Space Grotesk', sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        {/* GO — punchy, energetic */}
        <span
          style={{
            fontSize: goSize,
            fontWeight: 800,
            letterSpacing: "-0.075em",
            background: "linear-gradient(125deg, #f0ebff 0%, #9b7cff 50%, #6d4fd4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px rgba(155,124,255,.32))",
          }}
        >
          GO
        </span>

        {/* on ya — the Aussie “good on ya” */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            fontSize: onYaSize,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#f0eef5",
          }}
        >
          <span style={{ opacity: 0.88 }}>on</span>
          <span
            style={{
              marginLeft: "0.16em",
              fontWeight: 700,
              color: "#9b7cff",
            }}
          >
            ya
          </span>
          <span
            style={{
              fontSize: onYaSize * 1.2,
              fontWeight: 800,
              color: "#9b7cff",
              marginLeft: "0.02em",
              lineHeight: 0.75,
            }}
            aria-hidden="true"
          >
            !
          </span>
        </span>
      </span>

      {showTag && (
        <span
          style={{
            marginTop: "0.35em",
            fontSize: Math.max(8, Math.round(base * 0.3)),
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.28)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          goonya.com.au
        </span>
      )}

    </span>
  );
}
