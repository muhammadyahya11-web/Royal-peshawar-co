
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Collaction from './pages/Collaction'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './Components/Navbar/Navbar'

import AutoTextSlide from './Components/Navbar/AutoTextSlide'
import Footer from './Components/Footer/Footer'
import Newsletterbox from './Components/NewsletterBox/Newsletterbox'
import OurPolicy from './Components/Ourpolicy/OurPolicy'
import Shirts from './pages/Shirts/Shirts'
import Search from './Components/Search/Search'
import Product from './Components/Product/Product'
import Cart from './Components/Cart/Cart'

import AboutUs from './pages/About'
import MyOrders from './Components/Order'
import MyProfile from './Components/Profile'
import EditProfile from './Components/Editprofile'
import Login from './pages/Login'
import Hoodies from './Components/Hoodies'
import Jackets from './Components/Jackets'
import Baggy from './Components/Baggy'
import Dropshoulder from './Components/Dropshoulder'
import RoundedNeckShirts from './Components/RoundedNeckCotton'
import Checkout from './Components/Checkout'

function App() {


  return (
    <>
      <AutoTextSlide />
      <div className=' top-0 left-0 sticky z-1000  max-w-full '>
        <Navbar />

      </div>

      <Search />



      <Routes>


        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/collaction' element={<Collaction />} />
        <Route path='/shirts' element={<Shirts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout/> } />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/order' element={<MyOrders />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hoodies' element={<Hoodies />} />
        <Route path='/jacket' element={<Jackets />} />
        <Route path='/baggy' element={<Baggy />} />
         <Route path='/dropshouder' element={<Dropshoulder />} />
            <Route path='/roundedNeckShirts' element={<RoundedNeckShirts />} />
      </Routes>
       <OurPolicy />
      <Newsletterbox /> 
      <Footer />


    </>
  )
}

export default App
