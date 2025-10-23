import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen font-[Poppins]">
      {/* Left Section */}
      <div className="w-full md:w-[60%] lg:w-[70%] flex flex-col justify-center items-center bg-white px-6 sm:px-10 md:px-16 py-10 md:py-0">
        <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#EDA415] mb-6 text-center leading-tight">
          Sign In to <br /> Your Account
        </h1>

        <form className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 w-full outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 w-full outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-xs sm:text-sm">
            <a href="#" className="text-gray-700 font-semibold hover:underline">
              forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#EDA415] text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
          >
            SIGN IN
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] lg:w-[30%] bg-[#003F62] text-white flex flex-col justify-center items-center relative overflow-hidden py-20 md:py-0">
        {/* background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-10 left-10"></div>
          <div className="absolute w-20 h-20 bg-white/10 rotate-45 bottom-20 right-16"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full top-1/2 left-1/3"></div>
        </div>

        <div className="z-10 text-center px-6 sm:px-10">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold mb-4">
            Hello Friend!
          </h2>
          <p className="text-xs sm:text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
            Enter your personal details and start your journey with us
          </p>
          <Link to="/signup">
            <button className="border border-white px-6 sm:px-8 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-[#003B73] transition">
              SIGN up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
