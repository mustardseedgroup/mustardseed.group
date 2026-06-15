import { BrandLogo } from "@/components/brand-logo";

const nodes = [
  { brand: "benediction" as const, label: "Benediction Lab", detail: "Research", x: "50%", y: "13%" },
  { brand: "orbit" as const, label: "Orbit", detail: "Execution OS", x: "17%", y: "50%" },
  { brand: "tuxx" as const, label: "TUXX", detail: "Systems", x: "83%", y: "50%" },
  { brand: "all-purpose" as const, label: "All Purpose", detail: "Culture", x: "50%", y: "84%" },
];

export function EcosystemMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden border border-[var(--line)] bg-[#e8e6df] p-6 md:min-h-[540px]">
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
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#fbfaf7] text-[#c69386] shadow-[0_20px_70px_rgba(11,11,9,0.12)]">
        <span className="font-mono text-5xl font-bold leading-none tracking-[-0.18em]">MS</span>
      </div>
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute flex max-w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          style={{ left: node.x, top: node.y }}
        >
          <BrandLogo brand={node.brand} />
          <p className="mt-1 text-xs text-[var(--muted)]">{node.detail}</p>
        </div>
      ))}
    </div>
  );
}
