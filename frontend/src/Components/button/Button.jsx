const Button = ({ title, bgclr, clr, border, fntSize, pading }) => {
  return (
    <button
      className="group text-[12px] relative overflow-hidden rounded-3xl font-semibold transition-all duration-300"
      style={{
        background: bgclr,
        color: clr,
        border: border ? `${border}px solid ${clr}` : "none",
        padding: pading,
        fontSize: fntSize,
      }}
    >
      {/* Sliding Background */}
      <span
        className="slide absolute inset-0 w-full rounded-3xl transition-all duration-300"
        style={{ background: clr }}
      ></span>

      {/* Text */}
      <span
        className="label relative z-10 transition-all duration-300"
        style={{ "--hoverColor": bgclr }}
      >
        {title}
      </span>

      <style>{`
        .slide {
          transform: translateY(-100%);
        }
        .group:hover .slide {
          transform: translateY(0);
        }
        .group:hover .label {
          color: var(--hoverColor) !important;
        }
        .group:hover {
          border: none !important;
        }
      `}</style>
    </button>
  );
};

export default Button;
