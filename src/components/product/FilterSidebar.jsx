// import React, { useContext, useState } from 'react'
// import AppContext from '../../context/AppContext'

// const FilterSidebar = () => {
//   const { products, setFilteredData } = useContext(AppContext)
//   const [isOpen, setIsOpen] = useState(false)

//   const filterByCategory = (cat) => {
//     setFilteredData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase()))
//     setIsOpen(false)
//   }

//   const filterByPrice = (price) => {
//     setFilteredData(products.filter((data) => data.price >= price))
//     setIsOpen(false)
//   }

//   const clearFilters = () => {
//     setFilteredData(products)
//     setIsOpen(false)
//   }

//   return (
//     <>
//       {/* Filter Button for Mobile */}
//       <div className="sm:hidden flex justify-end px-4 pt-4">
//         <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
//           Filters
//         </button>
//       </div>

//       {/* Drawer Sidebar */}
//       <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
//         <div className="absolute top-0 left-0 w-3/4 h-full bg-white p-5 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-4">Filters</h2>
//           <button onClick={() => setIsOpen(false)} className="text-red-500 font-bold mb-4">Close</button>

//           <div className="space-y-2">
//             <button onClick={clearFilters} className="block w-full text-left text-blue-600 font-semibold">No Filter</button>

//             <h3 className="font-semibold mt-4">Category</h3>
//             <button onClick={() => filterByCategory("mobiles")} className="block w-full text-left">Mobiles</button>
//             <button onClick={() => filterByCategory("laptops")} className="block w-full text-left">Laptops</button>
//             <button onClick={() => filterByCategory("cameras")} className="block w-full text-left">Cameras</button>
//             <button onClick={() => filterByCategory("headphones")} className="block w-full text-left">Headphones</button>

//             <h3 className="font-semibold mt-4">Price</h3>
//             <button onClick={() => filterByPrice(15999)} className="block w-full text-left">₹ 15999</button>
//             <button onClick={() => filterByPrice(25999)} className="block w-full text-left">₹ 25999</button>
//             <button onClick={() => filterByPrice(49999)} className="block w-full text-left">₹ 49999</button>
//             <button onClick={() => filterByPrice(69999)} className="block w-full text-left">₹ 69999</button>
//             <button onClick={() => filterByPrice(89999)} className="block w-full text-left">₹ 89999</button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default FilterSidebar
