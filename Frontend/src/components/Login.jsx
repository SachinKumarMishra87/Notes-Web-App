import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);

      if (res.data.success) {
        toast.success("Login Successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user",  JSON.stringify(res.data.user));
        console.log("loginData",res.data);
        navigate('/');
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };


  return (
    <div className="h-screen w-full bg-black/90 flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[90%] sm:w-[400px] text-white">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Login Account</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-green-400 hover:underline hover:text-green-300 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
