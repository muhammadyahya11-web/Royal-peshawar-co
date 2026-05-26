import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import AutoTextSlide from "./Components/Navbar/AutoTextSlide";
import Footer from "./Components/Footer/Footer";
import Search from "./Components/Search/Search";
import "./App.css";

/* ================= LAZY IMPORTS ================= */

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Collaction = lazy(() => import("./pages/Collaction"));
const Contact = lazy(() => import("./pages/Contact"));

const Shirts = lazy(() => import("./pages/Shirts/Shirts"));
const Product = lazy(() => import("./Components/Product/Product"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Checkout = lazy(() => import("./Components/Checkout"));

const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));

const AboutUs = lazy(() => import("./pages/About"));
const MyOrders = lazy(() => import("./Components/Order"));
const MyProfile = lazy(() => import("./Components/Profile"));
const EditProfile = lazy(() => import("./Components/Editprofile"));

const Hoodies = lazy(() => import("./Components/Hoodies"));
const Jackets = lazy(() => import("./Components/Jackets"));
const Baggy = lazy(() => import("./Components/Baggy"));
const Dropshoulder = lazy(() => import("./Components/Dropshoulder"));
const RoundedNeckShirts = lazy(() =>
  import("./Components/RoundedNeckCotton")
);

/* ================= LOADER ================= */

const PageLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
    Loading...
  </div>
);

/* ================= APP ================= */

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* TOP BAR */}
      <AutoTextSlide />

      {/* NAVBAR */}
      <div className="sticky top-0 z-[1000]">
        <Navbar />
      </div>

      {/* SEARCH */}
      <Search />

      {/* ROUTES */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collaction" element={<Collaction />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/shirts" element={<Shirts />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/order" element={<MyOrders />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/hoodies" element={<Hoodies />} />
          <Route path="/jacket" element={<Jackets />} />
          <Route path="/baggy" element={<Baggy />} />
          <Route path="/dropshouder" element={<Dropshoulder />} />
          <Route
            path="/roundedNeckShirts"
            element={<RoundedNeckShirts />}
          />
        </Routes>
      </Suspense>

      {/* FOOTER */}
      <Footer />

      {/* TOAST */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;