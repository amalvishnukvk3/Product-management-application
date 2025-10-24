// @ts-nocheck
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";


export default function AddSubCategoryModal({ onClose }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/categories");
                const data = await res.json();

                if (res.ok) {

                    setCategories(data || []);
                } else {
                    console.error("Failed to fetch categories:", data.message);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);
    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Category  is required"),
        subCategory: Yup.string().required("Subcategory is required"),

    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const token = localStorage.getItem("token");
            // Prepare payload
            const payload = {
                name: values.subCategory,
                category: values.category,
            };

            const res = await fetch("http://localhost:5000/subcategories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Sub category added successfully!");
                resetForm();
                // onClose();
            } else {
                toast.error(data.message || "Failed to add category.");

            }
        } catch (error) {
            console.error("Error adding subcategory:", error);
            alert("Something went wrong. Please try again later.");
        }
    };



    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl border border-blue-300 relative w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 sm:px-8">
                {/* Header */}
                <div className="p-4  flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Sub Category</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                <Formik
                    initialValues={{
                        category: "",
                        subCategory: ""

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >
                    {({ values, setFieldValue }) => (
                        <Form className="py-6 space-y-4">
                            {/* category */}
                            <div>
                                <Field
                                    as="select"
                                    name="category"
                                    className="w-full border rounded-md p-2 mt-1 cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    {categories && categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div>

                                <Field
                                    type="text"
                                    name="subCategory"
                                    placeholder="Enter sub category name"
                                    className="w-full border rounded-md p-2 mt-1"
                                />
                                <ErrorMessage
                                    name="subCategory"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3  pt-4">

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
            </div>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
}
