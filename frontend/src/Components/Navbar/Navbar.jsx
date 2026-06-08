import React, { useState, useContext } from "react";
import logo from "./../../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext.jsx";
import { Menu, X, User, ShoppingBag } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-[#3d3935]" : "text-[#8f8980] hover:text-[#a68b5b]"
  }`;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    showSearch,
    setshowSearch,
    visible,
    tooken,
    cartlength,
    LogOut,
  } = useContext(ShopContext);

  const mobileLinks = [
    { to: "/", label: "Home" },
    { to: "/collaction", label: "Collection" },
    { to: "/hoodies", label: "Hoodies" },
    { to: "/aboutus", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e4de]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Royal Peshawar"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/collaction" className={navLinkClass}>
              Collection
            </NavLink>
            <NavLink to="/aboutus" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            {visible && (
              <button
                type="button"
                onClick={() => setshowSearch(true)}
                className="p-1 hover:opacity-70"
                aria-label="Search"
              >
                <img src={assets.search_icon} className="w-5" alt="" />
              </button>
            )}

            <div className="relative group">
              <button
                type="button"
                onClick={() => !tooken && navigate("/login")}
                className="p-1 text-neutral-700 hover:text-neutral-900"
                aria-label="Account"
              >
                {tooken ? <User size={22} /> : <img src={assets.profile_icon} className="w-5" alt="" />}
              </button>

              {tooken && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-neutral-100 shadow-lg rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/order"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    Orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => LogOut(navigate)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-1 text-neutral-800">
              <ShoppingBag size={22} />
              {cartlength > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] font-medium h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                  {cartlength}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-1">
          {mobileLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-neutral-800 font-medium border-b border-neutral-50 last:border-0"
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://royal-peshawar-co-admin.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="block py-3 text-emerald-700 font-medium"
          >
            Admin panel
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
