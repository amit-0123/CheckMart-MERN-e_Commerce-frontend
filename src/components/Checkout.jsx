
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import TableProduct from './TableProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      console.log("OrderResponse:  ", orderResponse)

      const { orderId, amount: orderAmount } = orderResponse.data;

      const options = {
        key: 'rzp_test_WfvARE4NkCAyLr',
        amount: orderAmount * 100,
        currency: 'INR',
        name: 'CheckMart',
        description: 'Check Mart',
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_payment_id,
            paymentId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(`${url}/payment/verify-payment`, paymentData);

          if (api.data.success) {
            clearCart();
            navigate('/orderconfirmation');
          }
        },
        prefill: {
          name: 'Amit Yadav',
          email: 'yadavamit34996@gmail.com',
          contact: '9696739213',
        },
        notes: {
          address: 'Gyanpur, Bhadohi, Uttar Pradesh',
        },
        theme: {
          color: '#6c63ff',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="container my-5 py-4 shadow-lg rounded bg-light">
        <h2 className="text-center fw-bold text-dark mb-4">🧾 Order Summary</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-dark text-light">
              <div className="card-header text-center fw-bold fs-4">
                🛒 Cart Items
              </div>
              <div className="card-body">
                <TableProduct cart={cart} />
              </div>
            </div>
          </div>

          <div className="col-md-6 border-red-500">
            <div className="card bg-dark text-light">
              <div className="card-header text-center fw-bold fs-4">
                🚚 Shipping Address
              </div>
              <div className="card-body bg-gray">
                <ul className="list-group list-group-flush text-start">
                  <li className="list-group-item bg-white text-black">Name: {userAddress?.fullName}</li>
                  <li className="list-group-item bg-white text-black">Phone: {userAddress?.phoneNumber}</li>
                  <li className="list-group-item bg-white text-black">Country: {userAddress?.country}</li>
                  <li className="list-group-item bg-white text-black">State: {userAddress?.state}</li>
                  <li className="list-group-item bg-white text-black">PinCode: {userAddress?.pincode}</li>
                  <li className="list-group-item bg-white text-black">Address: {userAddress?.address}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <button
            className="
    bg-green-500 hover:bg-green-600
    text-white font-bold text-xl
    px-5 py-2
    rounded shadow
  "
            onClick={handlePayment}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;

