
import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", address: "", city: "", state: "",
    country: "", pincode: "", phoneNumber: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const result = await shippingAddress(
      formData.fullName, formData.address, formData.city,
      formData.state, formData.country, formData.pincode, formData.phoneNumber
    )
    if (result.success) navigate('/checkout')
    setFormData({ fullName: "", address: "", city: "", state: "", country: "", pincode: "", phoneNumber: "" })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">🚚 Shipping Address</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Country</label>
              <input type="text" name="country" value={formData.country}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">State</label>
              <input type="text" name="state" value={formData.state}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">City</label>
              <input type="text" name="city" value={formData.city}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Pincode</label>
              <input type="number" name="pincode" value={formData.pincode}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input type="number" name="phoneNumber" value={formData.phoneNumber}
                onChange={onChangeHandler}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Address Line / Nearby</label>
            <textarea name="address" value={formData.address} onChange={onChangeHandler}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button type="submit"
              className="bg-green-600 text-white font-bold uppercase px-6 py-3 !rounded-md hover:bg-white hover:!text-green-600 border-2 border-green-600 transition-all duration-300">
              Submit
            </button>

            {userAddress && (
              <button type="button" onClick={() => navigate('/checkout')}
                className="bg-yellow-500 text-white font-bold uppercase px-6 py-3 !rounded-md hover:bg-white hover:!text-yellow-600 border-2 border-yellow-500 transition-all duration-300">
                Use Old Address
              </button>
            )}
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Address
