import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import img from "./../assets/banner.jpg";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-[#f3efe8] to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ebe4d8]/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#f5efe6]/80 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-7 animate-fade-up order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#8f8980] text-xs font-medium tracking-wide border border-[#e8e4de] shadow-soft">
              New season · 2026
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] text-[#3d3935] leading-[1.12]">
              Soft fabrics.
              <span className="block text-[#a68b5b] italic font-normal">
                Refined style.
              </span>
            </h1>

            <p className="text-[#8f8980] text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Discover calm, premium pieces from Royal Peshawar Co. — made for
              comfort you can feel and style that stays clear.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
              <Link
                to="/collaction"
                className="group inline-flex items-center justify-center gap-2 bg-[#3d3935] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#5c564f] transition-all shadow-soft"
              >
                Shop collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/aboutus"
                className="inline-flex items-center justify-center bg-white text-[#3d3935] px-8 py-3.5 rounded-full text-sm font-medium border border-[#e8e4de] hover:bg-[#f3efe8] transition shadow-soft"
              >
                About us
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6">
              {[
                { n: "500+", l: "Happy customers" },
                { n: "100%", l: "Quality fabrics" },
                { n: "PK", l: "Nationwide delivery" },
              ].map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <p className="font-display text-xl text-[#3d3935]">{s.n}</p>
                  <p className="text-xs text-[#8f8980] mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-up">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-3 bg-white/60 rounded-[2rem] blur-sm" />
              <img
                src={img}
                alt="Royal Peshawar collection"
                className="relative w-full aspect-[4/5] object-cover rounded-[1.75rem] shadow-soft-lg"
              />
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-2xl px-5 py-4 shadow-soft-lg border border-[#e8e4de]">
                <p className="text-xs text-[#8f8980]">Starting from</p>
                <p className="font-display text-2xl text-[#a68b5b]">PKR 999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
