import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LandingBlocks, {
  LANDING_CANVAS_HEIGHT,
  LANDING_CANVAS_WIDTH,
} from "./LandingBlocks";
import Navbar from "./Navbar";

function getScale(viewportWidth: number) {
  return Math.min(viewportWidth / LANDING_CANVAS_WIDTH, 1);
}

const MOBILE_FLOW_BREAKPOINT = 1024;

gsap.registerPlugin(useGSAP);

const PROCESS_COPY = [
  {
    title: "1 / Onboarding",
    line1: "Upload your current resume to our platform. Choose your job search preferences: preferred locations, industries, minimum salary, and companies you want to avoid.",
    line2: "We use this to build an accurate, high-signal profile before any outreach begins.",
  },
  {
    title: "2 / Application",
    line1: "We find matching roles and tailor each application to the job and company—cover letters, forms, and follow-ups handled for you.",
    line2: "You stay in control while we keep volume and quality high without repetitive busywork.",
  },
  {
    title: "3 / Analytics",
    line1: "Track applications, responses, and pipeline status in one place so you always know what is working.",
    line2: "We refine strategy from real outcomes so your search improves week over week.",
  },
  {
    title: "4 / Interview",
    line1: "When interviews start, we help you prioritize opportunities and keep momentum through the final rounds.",
    line2: "From first screen to offer, your process stays organized and you never lose a thread.",
  },
] as const;

const FAQ_ANSWERS = [
  "WorkApply blends automation with human recruiters: we target roles, personalize applications, and refine your pipeline so you can focus on interviews.",
  "Human review keeps applications accurate and tailored. That typically beats fully unattended bulk applying for response quality and fit.",
  "Yes. We are a real team, transparent about the process, and every search is actively managed—not a black box.",
  "We work with clients globally and operate as a distributed team.",
] as const;

export default function LandingPage() {
  const initialWidth =
    typeof window === "undefined" ? LANDING_CANVAS_WIDTH : window.innerWidth;
  const [scale, setScale] = useState(() => getScale(initialWidth));
  const [isMobileFlow, setIsMobileFlow] = useState(
    () => initialWidth < MOBILE_FLOW_BREAKPOINT,
  );
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      setScale(getScale(w));
      setIsMobileFlow(w < MOBILE_FLOW_BREAKPOINT);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const wireInteractions = useCallback(() => {
    const root = pageRef.current;
    if (!root) return () => {};

    const processSection = root.querySelector(".landing-process-section");
    const onboarding = processSection?.querySelector<HTMLElement>("[data-name='Onboarding']");

    const processStepNodes = Array.from(
      root.querySelectorAll<HTMLElement>(".landing-process-section [data-name='Steps'] > div"),
    );

    let line1El: HTMLElement | null = null;
    let line2El: HTMLElement | null = null;

    if (onboarding) {
      const legacyDesc = onboarding.querySelector<HTMLElement>("[data-name='div.framer-i095ma:align-stretch']");
      if (legacyDesc) {
        legacyDesc.classList.add("process-desc-legacy-hidden");
        legacyDesc.setAttribute("aria-hidden", "true");
      }

      let panel = onboarding.querySelector<HTMLElement>(".process-tab-panel");
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "process-tab-panel";
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-live", "polite");
        const p1 = document.createElement("p");
        p1.className = "process-tab-line1";
        const p2 = document.createElement("p");
        p2.className = "process-tab-line2";
        panel.append(p1, p2);
        const steps = onboarding.querySelector("[data-name='Steps']");
        if (steps?.nextSibling) onboarding.insertBefore(panel, steps.nextSibling);
        else onboarding.appendChild(panel);
      }
      line1El = panel.querySelector(".process-tab-line1");
      line2El = panel.querySelector(".process-tab-line2");
    }

    const setActiveProcessStep = (index: number) => {
      const i = Math.max(0, Math.min(index, PROCESS_COPY.length - 1));
      processStepNodes.forEach((step, stepIndex) => {
        const isActive = stepIndex === i;
        const label = step.querySelector("p");
        const bar = step.querySelector<HTMLElement>("[data-name='div.framer-15t87m2']");
        if (label) {
          label.textContent = PROCESS_COPY[stepIndex].title;
          (label as HTMLElement).style.color = isActive ? "#faf9f6" : "#9ba1a5";
          (label as HTMLElement).style.fontWeight = isActive ? "600" : "500";
        }
        if (bar) {
          bar.style.height = isActive ? "4px" : "2px";
          bar.style.backgroundColor = isActive ? "#611dcd" : "#6b7280";
        }
      });

      if (line1El && line2El) {
        line1El.textContent = PROCESS_COPY[i].line1;
        line2El.textContent = PROCESS_COPY[i].line2;
      }
    };

    const stepListeners: { el: HTMLElement; click: () => void; keydown: (e: KeyboardEvent) => void }[] = [];

    processStepNodes.forEach((step, index) => {
      step.setAttribute("role", "tab");
      step.setAttribute("tabindex", "0");
      step.setAttribute("aria-selected", index === 0 ? "true" : "false");
      step.style.cursor = "pointer";
      const click = () => {
        processStepNodes.forEach((s, j) => s.setAttribute("aria-selected", j === index ? "true" : "false"));
        setActiveProcessStep(index);
      };
      const keydown = (e: KeyboardEvent) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        click();
      };
      step.addEventListener("click", click);
      step.addEventListener("keydown", keydown);
      stepListeners.push({ el: step, click, keydown });
    });
    setActiveProcessStep(0);

    const faqRows = Array.from(root.querySelectorAll<HTMLElement>(".landing-faq-section [data-name='Closed']"));

    const toggleFaqRow = (targetIndex: number) => {
      const targetRow = faqRows[targetIndex];
      const targetWasOpen = targetRow?.classList.contains("faq-open") ?? false;
      faqRows.forEach((row, index) => {
        const isOpen = index === targetIndex && !targetWasOpen;
        row.classList.toggle("faq-open", isOpen);
        row.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    };

    const faqHandlers: Array<{ row: HTMLElement; click: () => void; key: (e: KeyboardEvent) => void }> = [];

    faqRows.forEach((row, index) => {
      row.classList.add("faq-row-runtime");
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-expanded", "false");
      row.style.cursor = "pointer";

      if (!row.querySelector(".faq-answer-runtime")) {
        const answer = document.createElement("p");
        answer.className = "faq-answer-runtime";
        answer.textContent = FAQ_ANSWERS[index] ?? FAQ_ANSWERS[0];
        row.appendChild(answer);
      }

      const click = () => toggleFaqRow(index);
      const key = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFaqRow(index);
        }
      };
      row.addEventListener("click", click);
      row.addEventListener("keydown", key);
      faqHandlers.push({ row, click, key });
    });
    toggleFaqRow(0);

    // Team cards: ensure every Name Card exposes both LinkedIn + Email
    // icons (the Framer export only ships email on the first card). We clone
    // the existing Email Icon node from whichever card already has one, then
    // append a copy into every other "Logos" row that's missing it.
    const teamLogosRows = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".landing-team-section [data-name='Logos']",
      ),
    );

    const referenceEmailIcon = root.querySelector<HTMLElement>(
      ".landing-team-section [data-name='Email Icon']",
    );

    if (referenceEmailIcon) {
      teamLogosRows.forEach((row) => {
        if (row.querySelector("[data-name='Email Icon']")) return;
        const clone = referenceEmailIcon.cloneNode(true) as HTMLElement;
        clone.classList.add("team-email-icon-clone");
        row.appendChild(clone);
      });
    }

    // Mark every team card so we can target it with hover styles without
    // touching the auto-generated Framer markup.
    const teamCards = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".landing-team-section [data-name='Variant 1']",
      ),
    );
    teamCards.forEach((card) => card.classList.add("team-card-runtime"));

    return () => {
      stepListeners.forEach(({ el, click, keydown }) => {
        el.removeEventListener("click", click);
        el.removeEventListener("keydown", keydown);
      });
      faqHandlers.forEach(({ row, click, key }) => {
        row.removeEventListener("click", click);
        row.removeEventListener("keydown", key);
      });
    };
  }, []);

  useEffect(() => {
    const teardown = wireInteractions();
    return () => teardown?.();
  }, [wireInteractions, scale]);

  useGSAP(
    () => {
      const root = pageRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".landing-navbar",
            ".landing-hero",
            ".landing-platform-section [data-name='Left']",
            ".landing-platform-section [data-name='Right']",
          ],
          { autoAlpha: 1, x: 0, y: 0, clearProps: "transform" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".landing-navbar",
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.04 },
        );

        gsap.fromTo(
          ".landing-hero",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.02 },
        );

        // Continuous slow spin on the platform background ring.
        // The ring is wrapped in a div with a static 39.77deg rotation from
        // the Framer export; we attach our infinite spin to its inner Oval
        // node so transforms compound naturally.
        const ovalRoot =
          root.querySelector<HTMLElement>(
            ".landing-platform-section [data-name='Oval']",
          ) || null;
        let ovalSpin: gsap.core.Tween | null = null;
        if (ovalRoot) {
          ovalRoot.classList.add("platform-oval-spin");
          ovalSpin = gsap.to(ovalRoot, {
            rotation: "+=360",
            duration: 60,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          });
        }

        // Platform section text reveal (left + right slide in on scroll).
        const platformLeft = root.querySelector<HTMLElement>(
          ".landing-platform-section [data-name='Left']",
        );
        const platformRight = root.querySelector<HTMLElement>(
          ".landing-platform-section [data-name='Right']",
        );

        const platformTriggers: Array<() => void> = [];
        if (platformLeft && platformRight) {
          gsap.set(platformLeft, { autoAlpha: 0, x: -48, y: 12 });
          gsap.set(platformRight, { autoAlpha: 0, x: 48, y: 12 });

          const platformIO = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                platformIO.unobserve(entry.target);
                const target = entry.target as HTMLElement;
                const isRight = target === platformRight;
                gsap.to(target, {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  duration: 1.05,
                  ease: "power3.out",
                  delay: isRight ? 0.12 : 0,
                  overwrite: "auto",
                  clearProps: "transform",
                });
              });
            },
            { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0 },
          );
          platformIO.observe(platformLeft);
          platformIO.observe(platformRight);
          platformTriggers.push(() => platformIO.disconnect());
        }

        return () => {
          ovalSpin?.kill();
          platformTriggers.forEach((teardown) => teardown());
        };
      });

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  const scaledHeight = Math.ceil(LANDING_CANVAS_HEIGHT * scale - 1e-6);

  return (
    <main
      className="landing-root bg-[#0a0a0c] min-h-screen overflow-x-clip text-[#faf9f6] antialiased w-full"
      ref={pageRef}
      data-mobile-flow={isMobileFlow ? "true" : undefined}
    >
      <Navbar />
      <HeroSection />

      {isMobileFlow ? (
        // Mobile / tablet (< 1024 px): render LandingBlocks directly so the
        // sections flow at native viewport width. The CSS overrides under
        // `[data-mobile-flow="true"]` flatten the absolute Framer layout.
        <div className="landing-mobile-blocks w-full">
          <LandingBlocks />
        </div>
      ) : (
        <div
          className="landing-scroll-spacer mx-auto relative w-full"
          style={{ height: `${scaledHeight}px`, maxWidth: `${LANDING_CANVAS_WIDTH}px` }}
        >
          <div
            className="landing-canvas-clip absolute left-1/2 top-0 overflow-hidden"
            style={{
              height: `${scaledHeight}px`,
              width: `${LANDING_CANVAS_WIDTH * scale}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="will-change-transform"
              style={{
                height: `${LANDING_CANVAS_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${LANDING_CANVAS_WIDTH}px`,
              }}
            >
              <LandingBlocks />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
