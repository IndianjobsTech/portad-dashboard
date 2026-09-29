type IconProps = { className?: string };

function svgProps(className?: string) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: className ?? "h-5 w-5",
  };
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 3l7 3v5.2c0 4.3-2.9 7.3-7 8.8-4.1-1.5-7-4.5-7-8.8V6l7-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
  );
}

export function IconRefresh({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.4-6.1L21 8.5" />
      <path d="M21 4v4.5h-4.5" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.4 6.1L3 15.5" />
      <path d="M3 20v-4.5h4.5" />
    </svg>
  );
}

export function IconBadgeCheck({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 2.6l2.1 1.6 2.6-.2 1 2.4 2.4 1-.2 2.6L21.4 12l-1.5 2 .2 2.6-2.4 1-1 2.4-2.6-.2L12 21.4 9.9 19.8l-2.6.2-1-2.4-2.4-1 .2-2.6L2.6 12l1.5-2-.2-2.6 2.4-1 1-2.4 2.6.2L12 2.6z" />
      <path d="M8.6 12.3l2.3 2.3 4.6-5" />
    </svg>
  );
}

export function IconBlocks({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <path d="M17.25 14v6M14.25 17.25h6" />
    </svg>
  );
}

export function IconDoc({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6.5 2.75h7L18.5 8v13.25H6.5z" />
      <path d="M13.25 2.75V8h5.25" />
      <path d="M9.25 12.5h5.5M9.25 16h5.5" />
    </svg>
  );
}

export function IconTable({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M9.5 9.5V20" />
    </svg>
  );
}

export function IconCheckSquare({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 12.2l2.7 2.7L16.5 9" />
    </svg>
  );
}

export function IconFileStack({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M8 7V4.5A1.5 1.5 0 0 1 9.5 3h8L21 6.5v10A1.5 1.5 0 0 1 19.5 18H18" />
      <rect x="3" y="7" width="12" height="14" rx="1.6" />
      <path d="M6 11.5h6M6 15h6" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="9" cy="8.5" r="3.4" />
      <path d="M3 20c.4-3.4 3-5.6 6-5.6s5.6 2.2 6 5.6" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16.5 14.6c2.4.3 4.2 2.2 4.5 5" />
    </svg>
  );
}

export function IconComment({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M21 11.5a8 8 0 0 1-8 8H4.2l1.9-2.9A8 8 0 1 1 21 11.5z" />
      <path d="M8.5 11h7M8.5 14h4.5" />
    </svg>
  );
}

export function IconBook({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4.5 19.2A2.3 2.3 0 0 1 6.8 17H20" />
      <path d="M6.8 17H20V4.2H6.8A2.3 2.3 0 0 0 4.5 6.5v10.4z" />
      <path d="M4.5 6.5A2.3 2.3 0 0 1 6.8 4.2H20" />
    </svg>
  );
}

export function IconTicket({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M3 8.2A2.2 2.2 0 0 1 5.2 6h13.6A2.2 2.2 0 0 1 21 8.2v1.6a2.2 2.2 0 0 0 0 4.4v1.6a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 15.8v-1.6a2.2 2.2 0 0 0 0-4.4z" />
      <path d="M13 6.5v11" />
    </svg>
  );
}

export function IconTerminal({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2.4" />
      <path d="M7 9.5l3 2.75L7 15M12.5 15.25H17" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="M15.75 15.75L21 21" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M14.5 5.5L8 12l6.5 6.5" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M9.5 5.5L16 12l-6.5 6.5" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="4.75" y="10.5" width="14.5" height="10" rx="2.2" />
      <path d="M8.25 10.5V7.75a3.75 3.75 0 0 1 7.5 0v2.75" />
    </svg>
  );
}

export function IconUpload({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 15.5V4M7.5 8.5L12 4l4.5 4.5" />
      <path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function IconFingerprint({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6 11a6 6 0 0 1 12 0c0 3-.7 5.6-1.6 7.6" />
      <path d="M9 11a3 3 0 0 1 6 0c0 2.6-.4 5-1.2 7" />
      <path d="M12 11v1.6c0 2.4-.5 4.7-1.4 6.7" />
      <path d="M6.6 16.5C6.2 15 6 13.4 6 11" />
    </svg>
  );
}
