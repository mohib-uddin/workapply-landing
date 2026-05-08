import logoMark from "../../../imports/1920WLight/2fa337d29bc6db1b8b19e40d899617ed65fc6c3d.png";

const SERVICES_LINKS = [
  { label: "AUTO APPLY", href: "#auto-apply" },
  { label: "COVER LETTER BUILDER", href: "#cover-letter-builder" },
  { label: "MOCK INTERVIEW", href: "#mock-interview" },
] as const;

const COMPANY_LINKS = [
  { label: "TERMS OF USE", href: "#terms" },
  { label: "PRIVACY POLICY", href: "#privacy" },
  { label: "REFUND POLICY", href: "#refund" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function Footer() {
  return (
    <footer
      className="landing-footer relative z-[1] w-full bg-[#1a1a1a] text-[#faf9f6]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.18]" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 sm:px-10 lg:px-16 py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-10">
          <div className="md:col-span-5 lg:col-span-6 flex flex-col gap-9">
            <a
              href="#"
              aria-label="WorkApply home"
              className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <img
                src={logoMark}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </a>
            <p className="font-display text-[11px] tracking-[0.18em] text-white/55">
              @2025 WORKAPPLY
            </p>
          </div>

          <FooterColumn
            heading="SERVICES"
            links={SERVICES_LINKS}
            className="md:col-span-4 lg:col-span-3"
          />

          <FooterColumn
            heading="COMPANY"
            links={COMPANY_LINKS}
            className="md:col-span-3 lg:col-span-3"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
  className,
}: {
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  className?: string;
}) {
  return (
    <nav
      aria-label={heading}
      className={`flex flex-col gap-4 ${className ?? ""}`}
    >
      <p className="font-display text-[15px] tracking-[0.16em] leading-none text-white">
        {heading}
      </p>
      <ul className="flex flex-col gap-[14px]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-display text-[14px] tracking-[0.14em] leading-none text-white/85 transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
