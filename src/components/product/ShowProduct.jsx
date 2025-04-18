import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
// import FilterSidebar from './FilterSidebar'

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

   {/* <FilterSidebar /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData?.map((product) => (
          <div key={product._id} className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col justify-between p-4">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imageSrc}
                alt={product.title}
                className="w-full h-48  border-2 border-yellow-500 rounded"
              />
            </Link>
            <div className="mt-4">
            <Link to={`/product/${product._id}`} className='!no-underline'>
              
              <h2 className="text-lg font-bold text-white ">{product.title}</h2>

            </Link>
              <p className="text-sm">{product.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-400 font-bold">{product.price} ₹</span>
              <button
                className="bg-yellow-500 text-black font-bold py-1 px-3 rounded hover:bg-yellow-400"
                onClick={() =>
                  addToCart(product._id, product.title, product.price, 1, product.imageSrc)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowProduct

