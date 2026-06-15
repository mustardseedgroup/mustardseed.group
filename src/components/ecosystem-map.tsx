const nodes = [
  { label: "Benediction Lab", detail: "Research", x: "50%", y: "12%" },
  { label: "Orbit", detail: "Execution OS", x: "17%", y: "48%" },
  { label: "TUXX", detail: "Systems", x: "83%", y: "48%" },
  { label: "All Purpose", detail: "Culture", x: "50%", y: "84%" },
];

export function EcosystemMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden bg-[radial-gradient(circle_at_center,#ffffff_0%,#fbfaf7_55%,#f4efe7_100%)] p-6 md:min-h-[540px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="50" cy="50" r="12" fill="none" stroke="#d9d2c7" strokeWidth="0.25" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#d9d2c7" strokeWidth="0.2" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="29" fill="none" stroke="#d9d2c7" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#d9d2c7" strokeWidth="0.2" strokeDasharray="1 2" />
        <path d="M50 12 L50 84 M17 48 L83 48" stroke="#d2cabd" strokeWidth="0.3" fill="none" />
        {[22, 34, 46, 58, 70, 82].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 === 0 ? 34 : 66} r="0.75" fill="#0b0b09" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-[0_20px_70px_rgba(11,11,9,0.18)]">
        <span className="font-serif text-4xl leading-none">ms</span>
      </div>
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute max-w-40 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: node.x, top: node.y }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.12em]">{node.label}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{node.detail}</p>
        </div>
      ))}
    </div>
  );
}
