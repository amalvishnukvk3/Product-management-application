// @ts-nocheck
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddProductModal({ onClose }) {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]); // subcategories for selected category
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/categories");
                const data = await res.json();
                if (res.ok) {
                    setCategories(data || []);
                } else {
                    console.error("Failed to fetch categories", data.message);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                // setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        if (selectedCategoryId.trim() === "") return;
        const fetchSubcategories = async () => {
            // setLoadingSubcategories(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/subcategories/category/${selectedCategoryId}`
                );
                const data = await res.json();
                if (res.ok) {
                    setSubcategories(data || []);
                } else {
                    console.error("Failed to fetch subcategories", data.message);
                }
            } catch (err) {
                console.error("Error fetching subcategories:", err);
            } finally {
                // setLoadingSubcategories(false);
            }
        };

        fetchSubcategories();
    }, [selectedCategoryId]);

    console.log("selectedCategoryId", selectedCategoryId);



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
        // subCategory: Yup.string().required("Subcategory is required"),
        // category: Yup.string().required("category is required"),
        category: Yup.object()
            .shape({
                _id: Yup.string().required("Category ID required"),
                name: Yup.string().required("Category name required"),
            })
            .required("Category is required"),
        subcategory: Yup.object()
            .shape({
                _id: Yup.string().required("Subcategory ID required"),
                name: Yup.string().required("Subcategory name required"),
            }),
        description: Yup.string().required("Description is required"),
        images: Yup.array()
            .min(1, "At least 1 image is required")
            .max(3, "Maximum 3 images allowed"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const token = localStorage.getItem("token");

            // Prepare payload based on your form structure
            const payload = {
                title: values.title,
                category: values.category,        // category _id
                subcategory: values.subcategory,  // subcategory _id
                description: values.description,
                images,                           // image array from state
                variants: values.variants,        // e.g. [{ ram, price, qty }]
            };

            const res = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Product added successfully!");
                resetForm();
                setImages([]);
                onClose();
            } else {
                alert(data.message || "Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Something went wrong. Please try again later.");
        }
    };


    const handleImageUpload = async (e, setFieldValue, values) => {
        const files = Array.from(e.target.files);
        if (values.images.length + files.length > 3) {
            alert("Maximum 3 images allowed");
            return;
        }
        try {
            const uploadedImages = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "my_uploads");
                const res = await fetch(`https://api.cloudinary.com/v1_1/dwbbsotgs/upload`, {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    uploadedImages.push(data.secure_url);
                } else {
                    console.error("Cloudinary upload error:", data);
                }
            }

            // Merge new uploaded URLs with existing ones
            const allImages = [...values.images, ...uploadedImages];
            setFieldValue("images", allImages);
            setImages(allImages);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Failed to upload image(s). Please try again.");
        }
    };
    console.log("images", images);

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
                        category: { _id: "", name: "" },
                        subcategory: { _id: "", name: "" },
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

                            {/* category */}
                            <div>
                                <label className="font-medium text-gray-700">Category :</label>
                                <Field
                                    as="select"
                                    name="categoryId" // use _id only
                                    className="w-full border rounded-md p-2 mt-1 cursor-pointer"
                                    value={values.category._id} // bind _id
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedCat = categories.find((cat) => cat._id === selectedId);
                                        if (selectedCat) {
                                            setFieldValue("category", { _id: selectedCat._id, name: selectedCat.name });
                                            setSelectedCategoryId(selectedCat._id);
                                        }
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category.name" component="div" className="text-red-500 text-sm" />
                            </div>


                            {/* Subcategory */}
                            <div>
                                <label className="font-medium text-gray-700">Subcategory :</label>
                                <Field
                                    as="select"
                                    name="subcategoryId"
                                    className="w-full border rounded-md p-2 mt-1 cursor-pointer"
                                    value={values.subcategory._id} // bind _id
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedSub = subcategories.find((sub) => sub._id === selectedId);
                                        if (selectedSub) {
                                            setFieldValue("subcategory", { _id: selectedSub._id, name: selectedSub.name });
                                        }
                                    }}
                                >
                                    <option value="">Select Subcategory</option>
                                    {subcategories.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="subcategory.name" component="div" className="text-red-500 text-sm" />
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
