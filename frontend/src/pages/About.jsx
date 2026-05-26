import React from "react";
import aboutHero from "../assets/frontend_assets/about_img.png";
import team1 from "../assets/frontend_assets/p_img12.png";
import team2 from "../assets/frontend_assets/p_img1.png";
import team3 from "../assets/frontend_assets/p_img13.png";
import team4 from "../assets/frontend_assets/p_img2.png";

function AboutUs() {
  const team = [
    { name: "Ali Khan", role: "Founder & CEO", image: team1 },
    { name: "Sara Ahmed", role: "Marketing Head", image: team2 },
    { name: "Laiba Khan", role: "Product Designer", image: team3 },
    { name: "Anees Ahmad", role: "Full Stack Developer", image: team4 },
  ];

  const stats = [
    { label: "Products", value: "120+" },
    { label: "Happy Customers", value: "5000+" },
    { label: "Awards", value: "15+" },
    { label: "Global Reach", value: "10+ Countries" },
  ];

  return (
    <div className="flex flex-col gap-20 px-4 sm:px-10 py-16 bg-white text-black">

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-6xl mx-auto">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            About <span className="text-black">Us</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
            We are a passionate team dedicated to delivering high-quality products 
            and excellent customer experiences. Our mission is to create value, 
            trust, and innovation in everything we do. From humble beginnings, we 
            have grown into a brand recognized for professionalism and excellence.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition">
              Explore Products
            </button>
            <button className="border border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={aboutHero}
            alt="About Us"
            className="rounded-xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
          <p className="text-gray-700 text-base">
            To provide premium products and services that exceed expectations while 
            fostering trust and innovation.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Vision</h2>
          <p className="text-gray-700 text-base">
            To become a globally recognized brand for excellence, quality, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <h3 className="text-3xl font-bold text-black">{stat.value}</h3>
            <p className="text-gray-700 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ===== Team Section ===== */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="font-semibold text-lg text-black">{member.name}</h3>
              <p className="text-gray-700 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-gray-900 text-white py-16 rounded-xl max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Journey</h2>
        <p className="mb-8 text-gray-200 text-base sm:text-lg">
          Discover our products and be part of our growing community. 
          Quality, passion, and excellence are what we promise.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Explore Products
        </button>
      </section>
    </div>
  );
}

export default AboutUs;
