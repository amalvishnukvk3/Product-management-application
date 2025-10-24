// @ts-nocheck
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategoryModal({ onClose }) {
    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Category name is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: values.category }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Category added successfully!");
                resetForm();
                // onClose();
                

            } else {
                toast.error(data.message || "Failed to add category.");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl border border-blue-300 relative w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 sm:px-8">
                {/* Header */}
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Category</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                <Formik
                    initialValues={{ category: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="py-6 space-y-4">
                            {/* Category Input */}
                            <div>
                                <Field
                                    type="text"
                                    name="category"
                                    placeholder="Enter category name"
                                    className="w-full border rounded-md p-2 mt-1"
                                />
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#F6A01A] text-white px-4 py-2 rounded-md cursor-pointer w-full sm:w-auto"
                                >
                                    ADD
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer w-full sm:w-auto"
                                >
                                    DISCARD
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* Toastify container */}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}
