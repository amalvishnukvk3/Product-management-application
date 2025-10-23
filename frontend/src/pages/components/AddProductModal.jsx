// @ts-nocheck
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddProductModal({ onClose }) {
    const [images, setImages] = useState([]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        variants: Yup.array().of(
            Yup.object().shape({
                ram: Yup.string().required("RAM is required"),
                price: Yup.number()
                    .typeError("Price must be a number")
                    .required("Price is required"),
                qty: Yup.number()
                    .typeError("Quantity must be a number")
                    .min(1, "Minimum quantity is 1")
                    .required("Quantity is required"),
            })
        ),
        subCategory: Yup.string().required("Subcategory is required"),
        description: Yup.string().required("Description is required"),
        images: Yup.array()
            .min(1, "At least 1 image is required")
            .max(3, "Maximum 3 images allowed"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log("Form values:", values);
        alert("Product added successfully!");
        resetForm(); // Clear form after submit
        setImages([]);
        onClose();
    };


    const handleImageUpload = (e, setFieldValue, values) => {
        const files = Array.from(e.target.files);
        if (values.images.length + files.length > 3) {
            alert("Maximum 3 images allowed");
            return;
        }
        const newImages = files.map((f) => URL.createObjectURL(f));
        const allImages = [...values.images, ...newImages];
        setFieldValue("images", allImages);
        setImages(allImages);
    };

    const handleRemoveImage = (index, setFieldValue, values) => {
        const updatedImages = values.images.filter((_, i) => i !== index);
        setFieldValue("images", updatedImages);
        setImages(updatedImages);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl border border-blue-300 relative w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 sm:px-8">
                {/* Header */}
                <div className="p-4  flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                <Formik
                    initialValues={{
                        title: "",
                        variants: [{ ram: "", price: "", qty: 1 }],
                        subCategory: "",
                        description: "",
                        images: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit} 

                >
                    {({ values, setFieldValue }) => (
                        <Form className="py-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="font-medium text-gray-700">Title :</label>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="HP AMD Ryzen 3"
                                    className="w-full border rounded-md p-2 mt-1"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Variants */}
                            <div>
                                <label className="font-medium text-gray-700">Variants :</label>
                                <FieldArray name="variants">
                                    {({ push, remove }) => (
                                        <div className="space-y-2 mt-2">
                                            {values.variants.map((variant, i) => (
                                                <div
                                                    key={i}
                                                    className="flex flex-wrap gap-2 sm:gap-3 items-center"
                                                >
                                                    <div className="flex-1 min-w-[70px]">
                                                        <Field
                                                            type="text"
                                                            name={`variants[${i}].ram`}
                                                            placeholder="RAM"
                                                            className="border rounded-md p-2 w-full"
                                                        />
                                                        <ErrorMessage
                                                            name={`variants[${i}].ram`}
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                        />
                                                    </div>

                                                    <div className="flex-1 min-w-[90px]">
                                                        <Field
                                                            type="number"
                                                            name={`variants[${i}].price`}
                                                            placeholder="Price"
                                                            className="border rounded-md p-2 w-full"
                                                        />
                                                        <ErrorMessage
                                                            name={`variants[${i}].price`}
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2 min-w-[90px]">
                                                        <label>QTY:</label>
                                                        <Field
                                                            type="number"
                                                            name={`variants[${i}].qty`}
                                                            className="border rounded-md p-2 w-16"
                                                        />
                                                        <ErrorMessage
                                                            name={`variants[${i}].qty`}
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                        />
                                                    </div>

                                                    {i > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(i)}
                                                            className="text-red-500 font-bold"
                                                        >
                                                            X
                                                        </button>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => push({ ram: "", price: "", qty: 1 })}
                                                className="bg-gray-800 text-white px-4 py-2 mt-2 rounded-md cursor-pointer"
                                            >
                                                Add Variant
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Subcategory */}
                            <div>
                                <label className="font-medium text-gray-700">Sub category :</label>
                                <Field
                                    as="select"
                                    name="subCategory"
                                    className="w-full border rounded-md p-2 mt-1 cursor-pointer"
                                >
                                    <option value="">Select subcategory</option>
                                    <option value="HP">HP</option>
                                    <option value="Dell">Dell</option>
                                    <option value="Lenovo">Lenovo</option>
                                </Field>
                                <ErrorMessage
                                    name="subCategory"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="font-medium text-gray-700">Description :</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Product description..."
                                    className="w-full border rounded-md p-2 mt-1"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="font-medium text-gray-700">Upload image:</label>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {values.images.map((img, i) => (
                                        <div key={i} className="relative w-20 h-20">
                                            <img
                                                src={img}
                                                alt=""
                                                className="w-full h-full object-cover rounded-md border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(i, setFieldValue, values)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {values.images.length < 3 && (
                                        <label className="w-20 h-20 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md cursor-pointer">
                                            <input
                                                type="file"
                                                className="hidden"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, setFieldValue, values)}
                                            />
                                            📷
                                        </label>
                                    )}
                                </div>
                                <ErrorMessage
                                    name="images"
                                    component="div"
                                    className="text-red-500 text-sm"
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
        </div>
    );
}
