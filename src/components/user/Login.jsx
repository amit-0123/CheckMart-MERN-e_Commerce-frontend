import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
useNavigate
import { ToastContainer, toast ,Bounce} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login =  () => {
    const {login} = useContext(AppContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email:"",
      password:""
    })

  const onChangeHandler = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value} )
  }
  const {email,password} = formData;
  const submitHandler = async(e)=>{
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
      return;
  }

   const result =  await login(email,password);

   if(result.success){
    navigate('/');
   }
};
  return (
    <>
      <div className="container my-5 p-5" style={{ width: "500px", border: "2px solid yellow", borderRadius: "10px" }} >
        <h1 className="text-2xl font-bold text-left text-gray-800 !mb-10">Login to Your Account</h1>

        <form onSubmit={submitHandler} className="space-y-4">
  {/* Email */}
  <div className="relative">
    <label className="absolute left-3 -top-2 text-sm text-purple-700 bg-white px-1">
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={onChangeHandler}
      required
      placeholder="Enter your email"
      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  {/* Password */}
  <div className="relative">
    <label className="absolute left-3 -top-2 text-sm text-purple-700 bg-white px-1">
      Password <span className="text-red-500">*</span>
    </label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={onChangeHandler}
      required
      placeholder="Enter password"
      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 cursor-pointer"
  >
    Login
  </button>
</form>


      </div>
    </>

    // <div>Register</div>
  )
}

export default Login