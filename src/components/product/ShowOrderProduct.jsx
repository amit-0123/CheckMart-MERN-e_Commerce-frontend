
import React, { useEffect, useState } from 'react';

const ShowOrderProduct = ({ items }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
      setPrice(price);
      setQty(qty);
    }
  }, [items]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm text-gray-700 border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Product Img</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Qty</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <tr key={product._id} className="border-t border-gray-200">
              <td className="py-2 px-4">
                <img
                  src={product.imageSrc}
                  alt="product"
                  className="w-12 h-12 object-cover rounded-md border"
                />
              </td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-2">₹ {product.price}</td>
              <td className="py-2 px-4">{product.qty}</td>
            </tr>
          ))}

          {/* Totals */}
          <tr className="border-t border-gray-300 bg-gray-50 font-semibold">
            <td className="py-2 px-4"></td>
            <td className="py-2 px-4">
              <p3 className="text-black">
                Total
              </p3>
            </td>
            <td className="py-2 px-2">
              <p3 className="text-black">
              ₹ {price} 
              </p3>
            </td>
            <td className="py-2 px-4">
              <p3 className="text-black">
                {qty}
              </p3>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowOrderProduct;