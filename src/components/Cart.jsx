
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeProduct, clearCart } = useContext(AppContext)
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let qty = 0, price = 0
    cart?.items?.forEach(item => {
      qty += item.qty
      price += item.price
    })
    setQty(qty)
    setPrice(price)
  }, [cart])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {cart?.items?.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          
          {/* Left: Products */}
          <div className="flex-1 space-y-4">
            {cart.items.map(product => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
                <img src={product.imageSrc} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600">Price: ₹{product.price}</p>
                  <p className="text-gray-600">Qty: {product.qty}</p>
                </div>

                <div className="flex flex-row sm:flex-row gap-2">
                  <button onClick={() => decreaseQty(product.productId, 1)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Qty--</button>
                  <button onClick={() => addToCart(product.productId, product.title, product.price / product.qty, 1, product.imageSrc)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Qty++</button>
                  <button onClick={() => confirm("Remove this product?") && removeProduct(product.productId)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                </div>

              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">🛒 Cart Summary</h2>
              <div className="flex justify-between text-gray-700 font-medium mb-2">
                <span>Total Quantity</span>
                <span>{qty}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium mb-4">
                <span>Total Price</span>
                <span>₹{price}</span>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => navigate('/shipping')} className="bg-[#16a34a] text-white text-md uppercase font-semibold py-3 px-10 !rounded-md
  border-2 border-[#16a34a] hover:bg-white hover:!text-[#16a34a] transition-all duration-300 ease-in-out hover:!font-bold ">
                   Proceed to Checkout
                </button>
                <button
                  onClick={() => confirm("Clear your cart?") && clearCart()}
                  className="bg-red-600 text-white text-md uppercase font-bold py-3 px-10 !rounded-md 
  border-2 border-red-600 hover:bg-white hover:!text-red-600 hover:font-bold 
  transition-all duration-300 ease-in-out"

                >
                   Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your cart is empty !</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-[#16a34a] text-white text-md uppercase font-semibold py-3 px-10 !rounded-md
  border-2 border-[#16a34a] hover:bg-white hover:!text-[#16a34a] transition-all duration-300 ease-in-out">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart








// import React, { useContext, useEffect, useState } from 'react'
// import AppContext from '../context/AppContext'
// import { useNavigate } from 'react-router-dom'

// const Cart = () => {
//   const { cart, decreaseQty, addToCart, removeProduct, clearCart } = useContext(AppContext)
//   const [qty, setQty] = useState(0)
//   const [price, setPrice] = useState(0)
//   const navigate = useNavigate()

//   useEffect(() => {
//     let qty = 0, price = 0
//     cart?.items?.forEach(item => {
//       qty += item.qty
//       price += item.price
//     })
//     setQty(qty)
//     setPrice(price)
//   }, [cart])

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
//       {cart?.items?.length > 0 ? (
//         <>
//           {/* Summary section */}
//           <div className="max-w-4xl mx-auto mb-6 p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
//             <h2 className="text-xl font-bold text-gray-800">🛒 Your Cart Summary</h2>
//             <div className="flex flex-wrap gap-4">
//               <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-semibold">Total Qty: {qty}</span>
//               <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md font-semibold">Total Price: ₹{price}</span>
//             </div>
//           </div>

//           {/* Cart items */}
//           <div className="max-w-4xl mx-auto space-y-6">
//             {cart.items.map(product => (
//               <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
//                 <img src={product.imageSrc} alt={product.title} className="w-24 h-24 rounded object-cover" />
//                 <div className="flex-1 text-center sm:text-left">
//                   <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
//                   <p className="text-gray-600">Price: ₹{product.price}</p>
//                   <p className="text-gray-600">Qty: {product.qty}</p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <button onClick={() => decreaseQty(product.productId, 1)} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">Qty--</button>
//                   <button
//                     onClick={() => addToCart(product.productId, product.title, product.price / product.qty, 1, product.imageSrc)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Qty++
//                   </button>
//                   <button
//                     onClick={() => confirm("Remove this product?") && removeProduct(product.productId)}
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Checkout & Clear Cart */}
//           <div className="max-w-4xl mx-auto text-center mt-8 flex flex-col sm:flex-row justify-center gap-4">
//             <button onClick={() => navigate('/shipping')} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">🧾 Proceed to Checkout</button>
//             <button
//               onClick={() => confirm("Clear your cart?") && clearCart()}
//               className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
//             >
//               🗑️ Clear Cart
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-10">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Your cart is empty 😕</h2>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cart