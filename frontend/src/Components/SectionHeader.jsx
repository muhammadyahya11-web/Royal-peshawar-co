import React from "react";
import { Link } from "react-router-dom";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel = "View all",
  light = false,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-14">
      <div className="text-center md:text-left">
        {eyebrow && (
          <p
            className={`text-xs font-medium tracking-[0.2em] uppercase mb-3 ${
              light ? "text-[#d4c4a8]" : "text-[#a68b5b]"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight ${
            light ? "text-white" : "text-[#3d3935]"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 ${
              light ? "text-white/70" : "text-[#8f8980]"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className={`text-sm font-medium mx-auto md:mx-0 shrink-0 px-5 py-2.5 rounded-full border transition ${
            light
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-[#e8e4de] text-[#3d3935] hover:bg-[#f3efe8]"
          }`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
