
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Collaction from './pages/Collaction'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from  './Components/Navbar/Navbar'

import AutoTextSlide from './Components/Navbar/AutoTextSlide'
import Footer from './Components/Footer/Footer'
import Newsletterbox from './Components/NewsletterBox/Newsletterbox'
import OurPolicy from './Components/Ourpolicy/OurPolicy'
import Shirts from './pages/Shirts/Shirts'
import Search from './Components/Search/Search'
import Product from './Components/Product/Product'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/CheckOut/CheckOut'

function App() {
  

  return (
    <>
     <AutoTextSlide />
     <div className=' top-0 left-0 sticky z-1000  max-w-full '>
       <Navbar />

    </div>
   
      <Search />

   
     
    <Routes>
      
      
      <Route path='/regiseter' element={ <Register/>  }/>
       <Route path='/' element={ <Home/>  }/>
       <Route path='/collaction' element={ <Collaction/> }/>
       <Route path='/shirts' element={ <Shirts/> }/>
       <Route path='/contact' element={ <Contact/>  }/>
       <Route path='/product/:productId' element={ <Product />  }/>
        <Route path='/cart' element={ <Cart />  }/>
        <Route path='/checkout' element={ <Checkout />  }/>
      
    </Routes>
        <OurPolicy />
       <Newsletterbox />
      <Footer />
    
     
     
    </>
  )
}

export default App
