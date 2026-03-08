import { type ReactNode } from "react";

type CollapsibleProps = {
  title: string;
  sectionKey: string;
  children: ReactNode;
  openSection: string | null;
  toggleSection: (section: string) => void;
};

export default function Collapsible({
  title,
  sectionKey,
  children,
  openSection,
  toggleSection,
}: CollapsibleProps) {
  const isOpen = openSection === sectionKey;

  return (
    <div className="border-t border-gray-200 py-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex justify-between items-center text-sm uppercase tracking-wide font-semibold cursor-pointer"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#151515"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
