// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUp = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await handleSignUp(values);
            if (response.success) {
                toast.success("Account created successfully!");
                navigate("/");
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error(err);
        }
        setSubmitting(false);
    };

    // Mock API
    const handleSignUp = async ({ email, password, name }) => {
        try {
            const res = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save JWT token if needed
                // localStorage.setItem("token", data.token);
                toast.success("Signup successful! Please login")
                return { success: true, };
            } else {
                return { success: false, message: data.message || "Invalid credentials" };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Something went wrong. Try again later." };
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen font-[Poppins]">
            {/* Left Section */}
            <div className="w-full md:w-[40%] lg:w-[30%] bg-[#003F62] text-white flex flex-col justify-center items-center relative overflow-hidden py-20 md:py-0">
                {/* background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-32 h-32 bg-white/10 rounded-full top-10 left-10"></div>
                    <div className="absolute w-20 h-20 bg-white/10 rotate-45 bottom-20 right-16"></div>
                    <div className="absolute w-16 h-16 bg-white/10 rounded-full top-1/2 left-1/3"></div>
                </div>

                <div className="z-10 text-center px-6 sm:px-10">
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold mb-4">
                        Welcome Back!
                    </h2>
                    <p className="text-xs sm:text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                        To keep connected with us, please login with your personal info
                    </p>
                    <Link to="/signin">
                        <button className="border border-white px-6 sm:px-8 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-[#003B73] transition cursor-pointer">
                            SIGN IN
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[60%] lg:w-[70%] flex flex-col justify-center items-center bg-white px-6 sm:px-10 md:px-16 py-10 md:py-0">
                <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#EDA415] mb-6 text-center leading-tight">
                    Create Account
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full max-w-sm space-y-4">
                            {/* Name */}
                            <div className="flex flex-col">
                                <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
                                    <FaUser className="text-gray-400 mr-2" />
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="bg-gray-100 w-full outline-none text-gray-700 text-sm sm:text-base"
                                    />
                                </div>
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
                                    <FaEnvelope className="text-gray-400 mr-2" />
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="bg-gray-100 w-full outline-none text-gray-700 text-sm sm:text-base"
                                    />
                                </div>
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
                                    <FaLock className="text-gray-400 mr-2" />
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="bg-gray-100 w-full outline-none text-gray-700 text-sm sm:text-base"
                                    />
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#EDA415] text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-600 transition cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Signing Up..." : "SIGN UP"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default SignUp;
