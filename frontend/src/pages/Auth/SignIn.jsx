// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignIn = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        console.log("sub");

        setSubmitting(true);
        try {
            const response = await handleSignIn(values);
            if (response.success) {
                localStorage.setItem("token", response.token);
                toast.success("Signed in successfully!");
                navigate("/");
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        }

        setSubmitting(false);
    };

    const handleSignIn = async ({ email, password }) => {
        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save JWT token if needed
                localStorage.setItem("token", data.token);
                return { success: true, token: data.token, user: data.user };
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
            <div className="w-full md:w-[60%] lg:w-[70%] flex flex-col justify-center items-center bg-white px-6 sm:px-10 md:px-16 py-10 md:py-0">
                <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#EDA415] mb-6 text-center leading-tight">
                    Sign In to <br /> Your Account
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full max-w-sm space-y-4">
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

                            {/* Forgot Password */}
                            <div className="text-right text-xs sm:text-sm">
                                <a href="#" className="text-gray-700 font-semibold hover:underline">
                                    forgot password?
                                </a>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#EDA415] text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-600 transition cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Signing In..." : "SIGN IN"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[40%] lg:w-[30%] bg-[#003F62] text-white flex flex-col justify-center items-center relative overflow-hidden py-20 md:py-0">
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
                        <button className="border border-white px-6 sm:px-8 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-[#003B73] transition cursor-pointer">
                            SIGN UP
                        </button>
                    </Link>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default SignIn;
