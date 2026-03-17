export default function NavIcon({ type }: { type: string }) {
  if (type === "user") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 14C2 11.24 4.69 9 8 9C11.31 9 14 11.24 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  if (type === "pin") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C5.52 1.5 3.5 3.52 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.52 10.48 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
  if (type === "wallet") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="4" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 7H14.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.5" cy="10" r="1.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
  if (type === "shield") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L14 4V8C14 11.5 11.3 14.5 8 15.5C4.7 14.5 2 11.5 2 8V4L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
}
