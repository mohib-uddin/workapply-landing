import { useCallback, useEffect, useRef } from "react";
import imgUber from "../../../imports/1920WLight/70dd798c4c96bc9c0ccb8d2f9aa30703f51dafc5.png";
import imgOpenAI from "../../../imports/1920WLight/bece725db47a0a7e712f1945c933068c2965a668.png";
import imgNetflix from "../../../imports/1920WLight/81e473d7a73c68eeba9af433553b43c0e1b8c080.png";
import imgMeta from "../../../imports/1920WLight/c96010d70bcd4ccd41b89c0f7a0445c8709da851.png";
import imgGoldman from "../../../imports/1920WLight/b136254d87f1fbcbb5ac9bc912589629070c26a6.png";
import imgGoogle from "../../../imports/1920WLight/4f66a7cfea1853a471678080b4ee28a7da4353f7.png";
import imgDelta from "../../../imports/1920WLight/69e8960278402cd0dc0c361b0b8497e9a8d39a8c.png";
import imgAmazon from "../../../imports/1920WLight/71050d4b09ecb17ad08aed67cbb13cfe0b0e9a13.png";
import jpMorganLogo from "../../../imports/jp-morgan-1.svg";

const TICKER_LOGOS = [
  { src: imgUber, alt: "Uber", w: 96 },
  { src: imgOpenAI, alt: "OpenAI", w: 102 },
  { src: imgNetflix, alt: "Netflix", w: 110 },
  { src: imgMeta, alt: "Meta", w: 96 },
  { src: imgGoldman, alt: "Goldman Sachs", w: 96 },
  { src: jpMorganLogo, alt: "JPMorgan Chase", w: 140 },
  { src: imgGoogle, alt: "Google", w: 36, isIcon: true },
  { src: imgDelta, alt: "Delta", w: 130 },
  { src: imgAmazon, alt: "Amazon", w: 120 },
] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const node = sectionRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      node.style.setProperty("--hero-mx", `${x}px`);
      node.style.setProperty("--hero-my", `${y}px`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    node.style.removeProperty("--hero-mx");
    node.style.removeProperty("--hero-my");
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="landing-hero relative w-full overflow-hidden bg-[#0a0a0c]"
      aria-labelledby="hero-heading"
    >
      <div className="hero-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="hero-pattern-hover absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="hero-content relative z-[1] mx-auto w-full max-w-[1440px]">
        <div className="hero-grid">
          <div className="hero-left">
            <h1
              id="hero-heading"
              className="hero-heading font-display text-[#faf9f6]"
            >
              Land Your Dream Job
            </h1>

            <a
              href="https://dev-mindorbi.seedinov.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex items-center gap-[6px] rounded-full bg-[#faf9f6] font-display text-[#0f0f0f] tracking-[-0.005em] transition-transform duration-200 hover:translate-y-[-1px] hover:shadow-[0_18px_40px_-18px_rgba(250,249,246,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span>Get Started</span>
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[-2px]"
              >
                <path
                  d="M5 15L15 5M15 5H7M15 5V13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <p className="hero-caption text-[#faf9f6]/85">
              Money back guarantee if you don&rsquo;t get an interview within 30 days!
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-divider" aria-hidden="true" />
            <h2 className="hero-subheading font-display text-[#faf9f6]">
              Automate Your Job Application Process
            </h2>
            <p className="hero-description text-[#faf9f6]/75">
              Our AI-powered job search automation platform continuously finds and
              applies to relevant job openings until you&rsquo;re hired.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-ticker relative z-[1] w-full overflow-hidden">
        <div className="hero-ticker-track flex items-center gap-16 sm:gap-20 py-5 will-change-transform">
          {[...TICKER_LOGOS, ...TICKER_LOGOS].map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="hero-ticker-logo h-[26px] sm:h-[30px] w-auto shrink-0 select-none opacity-90"
              style={{ maxWidth: `${logo.w * 1.1}px` }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
