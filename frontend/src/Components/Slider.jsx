import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import hero1 from "./../assets/frontend_assets/hero1.png";
import hero2 from "./../assets/frontend_assets/hero2.png";
import hero3 from "./../assets/frontend_assets/hero3.png";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    type: "image",
    img: hero1,
    title: "Luxury Streetwear",
    subtitle: "Royal Peshawar Co.",
  },
  {
    type: "video",
    videoId: "zI_sjJY5aro", 
    title: "Crafted for Royalty",
    subtitle: "Premium Hoodies & Shirts",
  },
  {
    type: "image",
    img: hero3,
    title: "Minimal. Powerful.",
    subtitle: "Wear Confidence",
  },
];

export default function ImgSlider() {
  return (
    <section className="h-[80vh] sticky top-[30vh] overflow-hidden rounded-3xl bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        navigation={{
          prevEl: ".img-prev",
          nextEl: ".img-next",
        }}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[90vh]">
              {/* IMAGE / VIDEO */}
              {slide.type === "video" ? (
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&loop=1&playlist=${slide.videoId}&controls=0&showinfo=0&rel=0`}
                  title={slide.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  
                  allowFullScreen
                />
              ) : (
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}

              {/* Overlay (UNCHANGED) */}
              <div className="absolute inset-0 bg-black/40 via-black/40 to-black/40 flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                  <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-10">
                    {slide.subtitle}
                  </p>

                  <button className="border border-[#C6A75E] text-[#C6A75E] px-10 py-4 tracking-widest hover:bg-[#C6A75E] hover:text-black transition">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation (UNCHANGED) */}
      <button className="img-prev absolute left-6 top-1/2 -translate-y-1/2    p-3 z-10  text-white  transition">
        <ChevronLeft />
      </button>

      <button className="img-next absolute right-6 top-1/2 -translate-y-1/2  text-white p-3 z-10   transition">
        <ChevronRight />
      </button>
    </section>
  );
}
