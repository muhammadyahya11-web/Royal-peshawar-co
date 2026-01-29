import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function AboutUs() {
  const team = [
    { name: "Ali Khan", role: "Founder & CEO", image: assets.team1 },
    { name: "Sara Ahmed", role: "Marketing Head", image: assets.team2 },
    { name: "John Doe", role: "Product Designer", image: assets.team3 },
    { name: "Mary Jane", role: "Full Stack Developer", image: assets.team4 },
  ];

  const stats = [
    { label: "Products", value: "120+" },
    { label: "Happy Customers", value: "5000+" },
    { label: "Awards", value: "15+" },
    { label: "Global Reach", value: "10+ Countries" },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 px-4 sm:px-29 py-12 bg-gray-50">

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            About <span className="text-red-700">Us</span>
          </h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We are a passionate team dedicated to delivering high-quality products 
            and excellent customer experiences. Our mission is to create value, 
            trust, and innovation in everything we do. From humble beginnings, we 
            have grown into a brand recognized for professionalism and excellence.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-800 transition">
              Explore Products
            </button>
            <button className="border border-red-700 text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={assets.about_img}
            alt="About Us"
            className="rounded-lg shadow-xl object-cover w-full hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 text-sm">
            To provide premium products and services that exceed expectations while 
            fostering trust and innovation.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h2>
          <p className="text-gray-600 text-sm">
            To become a globally recognized brand for excellence, quality, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold text-red-700">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ===== Team Section ===== */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-3 hover:scale-105 transition-transform"
              />
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-black/90 text-white py-12 rounded-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Join Our Journey
        </h2>
        <p className="mb-6 text-gray-100">
          Discover our products and be part of our growing community. 
          Quality, passion, and excellence are what we promise.
        </p>
        <button className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Explore Products
        </button>
      </section>
    </div>
  );
}

export default AboutUs;
