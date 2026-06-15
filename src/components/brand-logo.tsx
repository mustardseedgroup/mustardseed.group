import clsx from "clsx";
import Image from "next/image";

type Brand =
  | "msg"
  | "tuxx"
  | "benediction"
  | "orbit"
  | "orion"
  | "all-purpose"
  | "cheekygains"
  | "naira"
  | "horizon"
  | "pattern-up";

const imageBrands: Partial<Record<Brand, { src: string; alt: string; className: string; width: number; height: number }>> = {
  benediction: {
    src: "/brand/benediction-logo.png",
    alt: "Benediction Lab",
    className: "h-8 w-auto object-contain",
    width: 276,
    height: 86,
  },
  orbit: {
    src: "/brand/orbit-mark-alt.png",
    alt: "Orbit",
    className: "h-12 w-12 rounded-[14px] object-contain",
    width: 512,
    height: 512,
  },
  orion: {
    src: "/brand/orion-mark.png",
    alt: "Orion",
    className: "h-12 w-12 rounded-[14px] object-contain",
    width: 512,
    height: 512,
  },
  cheekygains: {
    src: "/brand/cheekygains-logo.png",
    alt: "CheekyGains",
    className: "h-12 w-12 rounded-[14px] object-contain",
    width: 1024,
    height: 1024,
  },
  horizon: {
    src: "/brand/horizon-logo.png",
    alt: "Horizon",
    className: "h-12 w-12 rounded-[14px] object-contain",
    width: 512,
    height: 512,
  },
  "pattern-up": {
    src: "/brand/pattern-up-logo.avif",
    alt: "Pattern Up",
    className: "h-10 w-auto object-contain",
    width: 256,
    height: 120,
  },
};

export function BrandLogo({ brand, className }: { brand: Brand; className?: string }) {
  if (brand === "msg") {
    return (
      <span className={clsx("font-serif text-[1.6rem] leading-none tracking-[-0.02em]", className)}>
        Mustard Seed Group
      </span>
    );
  }

  if (brand === "tuxx") {
    return (
      <span className={clsx("text-3xl font-semibold tracking-[0.42em] text-[#85837c]", className)}>
        TUXX
      </span>
    );
  }

  if (brand === "all-purpose") {
    return (
      <span className={clsx("font-serif text-2xl leading-none", className)}>
        All Purpose
      </span>
    );
  }

  if (brand === "naira") {
    return (
      <span className={clsx("flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--line)] bg-[#f4f1ea] font-serif text-2xl", className)}>
        N
      </span>
    );
  }

  const image = imageBrands[brand];
  if (!image) return null;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={clsx(image.className, className)}
    />
  );
}
