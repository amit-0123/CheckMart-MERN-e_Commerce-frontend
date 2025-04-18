
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeProduct, clearCart } = useContext(AppContext)
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
      setPrice(price);
      setQty(qty);
    }
  }, [cart])

  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full text-sm text-center text-black bg-white">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Title</th>
            <th className="py-2">(₹) Price </th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">+</th>
            <th className="px-4 py-2">-</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id} className="border-t border-gray-700 border-1">
              <td className="p-2">
                <img src={product.imageSrc} alt={product.title} className="w-12 h-12 rounded mx-auto" />
              </td>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.price} ₹</td>
              <td className="p-2">{product.qty}</td>
              <td className="p-2">
                <button
                  className="text-green-500 hover:text-green-300"
                  onClick={() =>
                    addToCart(product?.productId, product.title, product.price / product.qty, 1, product.imageSrc)
                  }
                >
                  ➕
                </button>
              </td>
              <td className="p-2">
                <button
                  className="text-yellow-500 hover:text-yellow-300"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  ➖
                </button>
              </td>
              <td className="p-2">
                <button
                  className="text-red-500 hover:text-red-300"
                  onClick={() => {
                    if (confirm('Are you sure you want to remove this item?')) {
                      removeProduct(product?.productId)
                    }
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}

          <tr className="border-t-2 border-gray-600 font-bold">
            <td></td>
            <td className="py-3">Total</td>
            <td className="text-black-300">₹ {price} </td>
            <td className="text-black-300">{qty}</td>
            <td colSpan={3}></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableProduct