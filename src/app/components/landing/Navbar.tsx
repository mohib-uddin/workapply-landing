import logoMark from "../../../imports/1920WLight/2fa337d29bc6db1b8b19e40d899617ed65fc6c3d.png";

type NavLink = { label: string; href: string; active?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#", active: true },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="landing-navbar fixed top-0 left-0 right-0 z-[100] bg-[rgba(20,20,20,0.94)] backdrop-blur-md border-b border-white/[0.06]">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#"
          aria-label="WorkApply home"
          className="flex items-center gap-[10px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#611dcd]/60 rounded-md"
        >
          <img
            src={logoMark}
            alt=""
            width={28}
            height={28}
            className="h-[28px] w-[28px] shrink-0 object-contain"
          />
          <span className="font-display text-[18px] sm:text-[20px] leading-none text-[#faf9f6] tracking-[-0.005em]">
            WorkApply
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <ul className="hidden sm:flex items-center gap-1 sm:gap-2 mr-2 sm:mr-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={`group inline-flex items-center gap-[6px] px-3 py-2 text-[15px] font-display tracking-[0.02em] leading-none transition-colors duration-150 ${
                    link.active
                      ? "text-[#faf9f6]"
                      : "text-[#cfd1d4] hover:text-[#faf9f6]"
                  }`}
                >
                  {link.active && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-[5px] w-[5px] rounded-full bg-[#cfd1d4]"
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://dev-mindorbi.seedinov.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-[6px] rounded-full bg-[#faf9f6] px-[14px] py-[7px] text-[14px] font-display text-[#0f0f0f] tracking-[0.01em] leading-none transition-transform duration-150 hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-12px_rgba(250,249,246,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span>Sign In</span>
            <svg
              aria-hidden="true"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="transition-transform duration-150 group-hover:translate-x-[1px] group-hover:translate-y-[-1px]"
            >
              <path
                d="M2 8L8 2M8 2H3.5M8 2V6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
