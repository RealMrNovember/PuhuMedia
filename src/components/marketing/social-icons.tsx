type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 10.5V17M8 7.5V7.51M12 17v-4c0-1.4.9-2.2 2-2.2s2 .8 2 2.2v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.65-1.22A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8.8c-.2.9.1 2 1.1 3.3 1 1.3 2.1 2 3.1 2.3.7.2 1.3 0 1.7-.4l.3-.4c.1-.2.1-.4-.1-.6l-1.1-.9c-.2-.1-.4-.1-.5 0l-.4.4c-.1.1-.3.1-.5 0-.5-.3-1-.7-1.4-1.2-.4-.5-.7-1-.9-1.5-.1-.2 0-.3.1-.4l.4-.4c.1-.1.2-.3.1-.5l-.7-1.2c-.1-.2-.3-.3-.5-.2-.5.1-1 .4-1.2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
