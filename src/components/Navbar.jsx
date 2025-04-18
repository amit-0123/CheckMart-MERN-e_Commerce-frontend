
import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterByCategory = (cat) => {
    setFilteredData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase()))
  }

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
  }

  return (
    <div className="bg-gray-900 text-white sticky top-0 z-50">

<div className="max-w-7xl mx-auto flex flex-row items-center justify-between px-2 py-3 gap-3">

{/* Logo */}
<Link to="/" className="font-bold text-white text-xl" style={{ textDecoration: 'none' }}>
  CHECKMART
</Link>

{/* Search (stretches) */}
<form onSubmit={submitHandler} className="w-90 sm:w-80 flex items-center mx-2">
  <div className="relative w-full">
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      type="text"
      placeholder="Search...."
      className="w-full px-4 py-2 pr-10 rounded-full bg-white text-black"
    />
    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
      search
    </span>
  </div>
</form>

{/* Cart + Profile/Logout */}
<div className="flex-none flex items-center space-x-2">
  {isAuthenticated ? (
    <>
      <Link to="/cart" className="relative">
        <span className="material-symbols-outlined text-2xl">shopping_cart</span>
        {cart?.items?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cart.items.length}
          </span>
        )}
      </Link>
      <Link to="/profile" className="px-2 py-1 rounded-md text-white hover:bg-gray-700 !no-underline ">
        Profile
      </Link>
      <button
        onClick={() => { logout(); navigate('/') }}
        className="px-2 py-1 !rounded-md hover:bg-gray-700"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => navigate("/login")}
        className="font-semibold px-2 py-1 rounded-md text-white"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="font-semibold px-2 py-1 rounded-md text-white"
      >
        Register
      </button>
    </>
  )}
</div>

</div>


      {location.pathname === '/' && (
        <div className="overflow-x-auto whitespace-nowrap bg-gray-800 py-2 px-4 sm:px-10 ">
          <div className="flex justify-around sm:justify-center items-center gap-6 sm:gap-6 min-w-max ">
            <button onClick={() => setFilteredData(products)} className="text-white px-3 py-1 bg-gray-700  hover:bg-black rounded">No Filter</button>
            <button onClick={() => filterByCategory("mobiles")} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">Mobiles</button>
            <button onClick={() => filterByCategory("laptops")} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">Laptops</button>
            <button onClick={() => filterByCategory("cameras")} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">Cameras</button>
            <button onClick={() => filterByCategory("headphones")} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">Headphones</button>
            <button onClick={() => filterByPrice(15999)} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">₹ 15999</button>
            <button onClick={() => filterByPrice(25999)} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">₹ 25999</button>
            <button onClick={() => filterByPrice(49999)} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">₹ 49999</button>
            <button onClick={() => filterByPrice(69999)} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">₹ 69999</button>
            <button onClick={() => filterByPrice(89999)} className="text-white px-3 py-1 bg-gray-700 hover:bg-black rounded">₹ 89999</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar
