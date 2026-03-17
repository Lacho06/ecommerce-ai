export default function OrderIcon({ type }: { type: string }) {
  if (type === "box") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 6L10 2L18 6V14L10 18L2 14V6Z" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 6L10 10M10 10L18 6M10 10V18" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="7" width="15" height="9" rx="2" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M16 10H17.5C18.33 10 19 10.67 19 11.5V13.5C19 14.33 18.33 15 17.5 15H16" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M1 11H16" stroke="#6B7280" strokeWidth="1.3" />
      <circle cx="5" cy="18" r="1.5" stroke="#6B7280" strokeWidth="1.3" />
      <circle cx="12" cy="18" r="1.5" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M4 7L6 3H11L13 7" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
