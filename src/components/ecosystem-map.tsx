import { BrandLogo } from "@/components/brand-logo";

const nodes = [
  { brand: "benediction" as const, label: "Benediction Lab", detail: "Research", x: "50%", y: "13%" },
  { brand: "orbit" as const, label: "Orbit", detail: "Execution OS", x: "17%", y: "50%" },
  { brand: "tuxx" as const, label: "TUXX", detail: "Systems", x: "83%", y: "50%" },
  { brand: "all-purpose" as const, label: "All Purpose", detail: "Culture", x: "50%", y: "84%" },
];

export function EcosystemMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden border border-[var(--line)] bg-[#e8e6df] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] md:min-h-[560px]">
      <div className="absolute left-6 top-6 z-10 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        Capability field
      </div>
      <div className="absolute bottom-6 left-6 z-10 max-w-44 text-xs leading-5 text-[var(--muted)]">
        Research, products, services and culture orbit one operating question.
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="7" y="8" width="86" height="84" fill="none" stroke="#d9d2c7" strokeWidth="0.22" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="#c69386" strokeWidth="0.22" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#d9d2c7" strokeWidth="0.2" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="29" fill="none" stroke="#d9d2c7" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#d9d2c7" strokeWidth="0.2" strokeDasharray="1 2" />
        <path d="M50 12 L50 84 M17 48 L83 48" stroke="#d2cabd" strokeWidth="0.3" fill="none" />
        <path d="M50 50 C42 32 27 39 17 50 M50 50 C61 34 73 38 83 50 M50 50 C38 63 43 76 50 84" stroke="#c69386" strokeWidth="0.18" fill="none" />
        {[22, 34, 46, 58, 70, 82].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 === 0 ? 34 : 66} r="0.75" fill="#0b0b09" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-28 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#fbfaf7] px-4 text-center shadow-[0_20px_70px_rgba(11,11,9,0.12)]">
        <BrandLogo brand="msg" className="text-xl" />
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
