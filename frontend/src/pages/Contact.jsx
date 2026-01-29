import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

/* ================== ANIMATION ================== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================== FLOATING INPUT ================== */
const FloatingInput = ({ label, type = "text" }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-3 
        text-gray-900 focus:border-black focus:outline-none transition"
      />
      <label
        className="absolute left-4 top-4 text-gray-400 transition-all
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-4
        peer-focus:top-2
        peer-focus:text-sm
        peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
};

/* ================== FLOATING TEXTAREA ================== */
const FloatingTextarea = ({ label }) => {
  return (
    <div className="relative">
      <textarea
        rows="5"
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-3 
        text-gray-900 focus:border-black focus:outline-none transition resize-none"
      />
      <label
        className="absolute left-4 top-4 text-gray-400 transition-all
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-4
        peer-focus:top-2
        peer-focus:text-sm
        peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
};

/* ================== INFO CARD ================== */
const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-5 bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
      <div className="p-4 bg-gray-100 rounded-xl text-black">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-500 text-sm">{value}</p>
      </div>
    </div>
  );
};

/* ================== MAIN PAGE ================== */
export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-24"
        >
          <span className="uppercase tracking-[4px] text-gray-500 text-sm">
            Contact
          </span>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mt-4">
            Let’s talk
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Reach out to us for premium support and exclusive service.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT INFO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <InfoCard
              icon={<Mail />}
              title="Email"
              value="support@royalpeshawar.com"
            />
            <InfoCard
              icon={<Phone />}
              title="Phone"
              value="+92 300 1234567"
            />
            <InfoCard
              icon={<MapPin />}
              title="Location"
              value="Peshawar, Pakistan"
            />
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl border shadow-2xl p-12"
          >
            <h2 className="text-3xl font-semibold mb-10 text-gray-900">
              Send a message
            </h2>

            <form className="space-y-8">
              <FloatingInput label="Full Name" />
              <FloatingInput label="Email Address" type="email" />
              <FloatingTextarea label="Message" />

              <button
                type="submit"
                className="group w-full bg-black text-white py-4 rounded-xl
                flex items-center justify-center gap-2 text-lg font-medium
                hover:scale-[1.02] transition"
              >
                Send Message
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* MAP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-28"
        >
          <div className="w-full h-80 rounded-3xl overflow-hidden border shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Peshawar&output=embed"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
