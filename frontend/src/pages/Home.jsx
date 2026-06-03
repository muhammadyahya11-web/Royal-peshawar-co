import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Star, X, Truck, Shield, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import hero1 from "./../assets/frontend_assets/hero1.png";
import ShopByCategory from "../Components/ShopByCategory";
import BestSeller from "../Components/BestSeller";
import FeaturedProduct from "../Components/FeaturedProduct";
import Tshirts from "../Components/Tshirts";
import Hoodies from "../Components/Hoodies";
import Hero from "../Components/Hero";
import SectionHeader from "../Components/SectionHeader";
import { ShopContext } from "../../src/context/ShopContext.jsx";

const marqueeItems = [
  "Free shipping over PKR 5000",
  "Premium cotton & fleece",
  "Secure checkout",
  "Cash on delivery",
  "New arrivals weekly",
];

const pillars = [
  {
    icon: Sparkles,
    title: "Premium quality",
    text: "Carefully selected fabrics on every piece we sell.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    text: "Reliable shipping across Pakistan.",
  },
  {
    icon: Shield,
    title: "Secure payments",
    text: "Stripe or cash on delivery — your choice.",
  },
  {
    icon: RefreshCw,
    title: "Easy support",
    text: "We're here if you need help with your order.",
  },
];

export default function Home() {
  const [quickView, setQuickView] = useState(null);
  const [size, setsize] = useState(null);
  const { addToCart } = useContext(ShopContext);

  const closeQuickView = () => {
    setQuickView(null);
    setsize(null);
  };

  const handleQuickAdd = () => {
    if (!size) {
      toast.info("Select a size");
      return;
    }
    addToCart(quickView, size);
    closeQuickView();
  };

  return (
    <div className="bg-[#faf8f5]">
      <Hero />

      {/* Soft announcement strip */}
      <div className="bg-white/80 border-y border-[#e8e4de] py-3 overflow-hidden backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <span
              key={i}
              className="mx-10 text-xs text-[#8f8980] font-medium tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Browse"
            title="Shop by category"
            description="Find what fits your mood — jackets, tees, hoodies and more."
            linkTo="/collaction"
          />
          <ShopByCategory />
        </div>
      </section>

      <BestSeller setQuickView={setQuickView} />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Comfort wear"
            title="Hoodies"
            description="Cozy layers for every season."
            linkTo="/hoodies"
          />
          <Hoodies setQuickView={setQuickView} />
        </div>
      </section>

      {/* Soft editorial banner */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] min-h-[300px] md:min-h-[380px] shadow-soft-lg">
            <img
              src={hero1}
              alt="Season collection"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3d3935]/75 via-[#3d3935]/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full min-h-[300px] md:min-h-[380px] px-8 md:px-14 max-w-lg">
              <p className="text-xs font-medium tracking-wide text-[#ebe4d8] mb-3">
                Limited collection
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-snug">
                Quiet luxury, everyday ease
              </h2>
              <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8">
                Pieces that feel as good as they look — tailored for clarity and
                comfort.
              </p>
              <Link
                to="/collaction"
                className="inline-block w-fit bg-white text-[#3d3935] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#f3efe8] transition shadow-soft"
              >
                View collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-4 md:py-8">
        <FeaturedProduct />
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Essentials"
            title="T-Shirts & more"
            linkTo="/collaction"
          />
          <Tshirts setQuickView={setQuickView} />
        </div>
      </section>

      {/* Trust — soft cards */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why us"
            title="Shopping made simple"
            description="Clear prices, secure checkout, and quality you can trust."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 md:p-7 border border-[#e8e4de] shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <div className="inline-flex p-3 rounded-xl bg-[#f3efe8] mb-4">
                  <Icon className="w-5 h-5 text-[#a68b5b]" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-[#3d3935] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#8f8980] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-4 sm:mx-6 mb-16 md:mb-20">
        <div className="max-w-4xl mx-auto text-center bg-[#f3efe8] rounded-[2rem] px-8 py-14 md:py-16 border border-[#e8e4de]">
          <h2 className="font-display text-3xl md:text-4xl text-[#3d3935] mb-3">
            Find your next favorite piece
          </h2>
          <p className="text-[#8f8980] mb-8 max-w-md mx-auto leading-relaxed">
            Explore the full collection — new styles added regularly.
          </p>
          <Link
            to="/collaction"
            className="inline-block bg-[#3d3935] text-white px-10 py-3.5 rounded-full text-sm font-medium hover:bg-[#5c564f] transition shadow-soft"
          >
            Start shopping
          </Link>
        </div>
      </section>

      {quickView && (
        <div
          className="fixed inset-0 bg-[#3d3935]/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={closeQuickView}
        >
          <div
            className="bg-white max-w-md w-full p-6 md:p-8 relative rounded-3xl shadow-soft-lg border border-[#e8e4de]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3efe8] text-[#8f8980]"
            >
              <X size={18} />
            </button>

            <img
              src={quickView.images?.[0]}
              alt={quickView.name}
              className="h-52 w-full object-cover rounded-2xl mb-5"
            />

            <h3 className="font-display text-2xl text-[#3d3935]">
              {quickView.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-[#8f8980] my-2">
              <Star size={14} className="fill-amber-300 text-amber-300" />
              4.8 rating
            </div>
            <p className="text-lg font-semibold text-[#3d3935] mb-5">
              PKR {quickView.price}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {quickView.sizes?.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setsize(s)}
                  className={`h-9 min-w-[2.25rem] px-3 rounded-full text-sm transition ${
                    size === s
                      ? "bg-[#3d3935] text-white"
                      : "bg-[#f3efe8] text-[#3d3935] hover:bg-[#ebe4d8]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={quickView.stock === 0}
              className="w-full bg-[#3d3935] text-white py-3.5 rounded-full text-sm font-medium hover:bg-[#5c564f] disabled:opacity-50 transition"
            >
              {quickView.stock === 0 ? "Out of stock" : "Add to cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
