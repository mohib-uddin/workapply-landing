import {
  Bg,
  FaqSection,
  PlatformSection,
  ProcessSectionV,
  TeamSection,
  TestimonialsSectionV,
} from "../../../imports/1920WLight/1920WLight";

export const LANDING_CANVAS_WIDTH = 1920;

/**
 * Section vertical layout inside the scaled canvas.
 *
 * The Framer export hard-codes each section as `position:absolute h-[1200px]`
 * pinned at fixed `top` values inside a 1920×7416 canvas. The 1200px slot is
 * far taller than each section's intrinsic content, so we override both the
 * `top` and `height` of every section in CSS to give each block the same
 * tight, consistent padding and stack them flush against each other.
 *
 * Source of truth: keep the constants here in lockstep with the matching
 * CSS rules in `index.css` (the `Block rhythm` section).
 */
export const LANDING_BLOCK_HEIGHTS = {
  platform: 1100,
  process: 880,
  testimonials: 880,
  team: 880,
  faq: 880,
} as const;

const PLATFORM_TOP = 0;
const PROCESS_TOP = PLATFORM_TOP + LANDING_BLOCK_HEIGHTS.platform;
const TESTIMONIALS_TOP = PROCESS_TOP + LANDING_BLOCK_HEIGHTS.process;
const TEAM_TOP = TESTIMONIALS_TOP + LANDING_BLOCK_HEIGHTS.testimonials;
const FAQ_TOP = TEAM_TOP + LANDING_BLOCK_HEIGHTS.team;

export const LANDING_BLOCK_TOPS = {
  platform: PLATFORM_TOP,
  process: PROCESS_TOP,
  testimonials: TESTIMONIALS_TOP,
  team: TEAM_TOP,
  faq: FAQ_TOP,
} as const;

export const LANDING_CANVAS_HEIGHT =
  FAQ_TOP + LANDING_BLOCK_HEIGHTS.faq;

export default function LandingBlocks() {
  return (
    <div
      className="landing-blocks-root bg-[#0a0a0c] relative w-full"
      style={{ height: `${LANDING_CANVAS_HEIGHT}px` }}
      data-name="End of bodyStart"
    >
      <Bg />

      <div className="landing-platform-section absolute inset-x-0">
        <PlatformSection />
      </div>

      <div className="landing-process-section contents">
        <ProcessSectionV />
      </div>

      <div className="landing-testimonials-section contents">
        <TestimonialsSectionV />
      </div>

      <div className="landing-team-section contents">
        <TeamSection />
      </div>

      <div className="landing-faq-section contents">
        <FaqSection />
      </div>
    </div>
  );
}
