
import React, { useContext } from 'react'
import AppContext from '../../context/AppContext';
import ShowOrderProduct from '../product/ShowOrderProduct';

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* User Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className='text-3xl sm:text-4xl font-bold !text-green-700'>Welcome, {user?.name}</h1>
        <p className='text-gray-600 text-sm sm:text-base'>{user?.email}</p>
        <p className="mt-2 font-semibold text-lg">Total Orders: <span className="text-blue-600">{userOrder?.length}</span></p>
      </div>

      {/* Orders */}
      {userOrder?.length >= 1 ? (
        <div className="space-y-6">
          {userOrder.map((product, index) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-2 space-y-4">
              
               {/* Order Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 ">
                
                {/* {order Details} */}
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-semibold">Order Date:</span> {new Date(product?.orderDate).toLocaleString('en-GB')}</li>
                    <li><span className="font-semibold">Order ID:</span> {product?.orderId}</li>
                    <li><span className="font-semibold">Payment ID:</span> {product?.paymentId}</li>
                    <li><span className="font-semibold">Payment Status:</span> <span className={`font-bold ${product?.payStatus === 'Paid' ? 'text-green-600' : 'text-red-500'}`}>{product?.payStatus}</span></li>
                  </ul>
                </div>

                {/* Shipping Info */}
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-semibold">Name:</span> {product?.userShipping?.fullName}</li>
                    <li><span className="font-semibold">Phone:</span> {product?.userShipping?.phoneNumber}</li>
                    <li><span className="font-semibold">Country:</span> {product?.userShipping?.country}</li>
                    <li><span className="font-semibold">State:</span> {product?.userShipping?.state}</li>
                    <li><span className="font-semibold">Pin Code:</span> {product?.userShipping?.pincode}</li>
                    <li><span className="font-semibold">Address:</span> {product?.userShipping?.address}</li>
                  </ul>
                </div>

              </div>

              {/* Ordered Products */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Ordered Items:</h2>
                <ShowOrderProduct items={product?.orderItems} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">No orders yet.</p>
      )}
    </div>
  );
}

export default Profile;

