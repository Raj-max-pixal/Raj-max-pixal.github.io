export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2rem clamp(1.25rem,4vw,3.5rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
          RAJ
          <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", marginLeft: 2, marginBottom: 6, verticalAlign: "middle" }} />
        </span>
        <span className="t-small" style={{ color: "var(--text-tertiary)" }}>
          Software Engineer · AI Builder
        </span>
      </div>

      <span className="t-small" style={{ color: "var(--text-muted)" }}>
        Built with Next.js · TypeScript · GSAP
      </span>

      <span className="t-small" style={{ color: "var(--text-tertiary)" }}>
        © 2026 Rajasaranya.T
      </span>
    </footer>
  );
}
