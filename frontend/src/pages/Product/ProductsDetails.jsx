// @ts-nocheck
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock data for a single product. In a real app, you'd fetch this.
const MOCK_PRODUCT = {
    id: 'hp-amd-ryzen-3-laptop',
    name: 'HP AMD Ryzen 3',
    price: 529.99,
    availability: {
        inStock: true,
        quantityLeft: 34,
    },
    images: [
        'path/to/large/laptop-main.png',
        'path/to/thumbnail/laptop-thumb1.png',
        'path/to/thumbnail/laptop-thumb2.png',
    ],
    ramOptions: ['4 GB', '8 GB', '16 GB'],
};

const ProductDetailsPage = () => {
    const { productId } = useParams(); // Get product ID from URL
    const product = MOCK_PRODUCT; // Use mock data for display

    const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
    const [quantity, setQuantity] = useState(1);

    // In a real application, you would check if the product exists based on productId
    if (!product) {
        return <div className="p-8 text-center">Product not found.</div>;
    }

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        // Main container and navigation header based on the screenshot
        <div className="min-h-screen bg-gray-50">
            <Navbar />


            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto p-4 flex items-center text-sm text-gray-600 space-x-2">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <span>&gt;</span>
                <span className="font-semibold">Product details</span>
            </div>

            {/* Product Details Section */}
            <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Image Gallery Column */}
                    <div>
                        <div className="border border-gray-200 p-4 mb-4 flex justify-center items-center h-96">
                            {/* Main Product Image Placeholder */}
                            <img
                                src="https://i.imgur.com/82b399.png" // Placeholder URL to match screenshot aspect
                                alt={product.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>

                        {/* Image Thumbnails */}
                        <div className="flex space-x-4">
                            {product.images.slice(1).map((img, index) => (
                                <div key={index} className="w-24 h-24 border border-gray-300 p-1 cursor-pointer hover:border-blue-500 flex justify-center items-center">
                                    <img
                                        src="https://i.imgur.com/82b399_thumb.png" // Placeholder thumbnail
                                        alt={`Thumbnail ${index + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Column */}
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                        <p className="text-4xl font-semibold text-gray-800 mb-4">${product.price.toFixed(2)}</p>

                        {/* Availability */}
                        <div className="flex items-center mb-6">
                            <span className="text-lg font-medium text-gray-600 mr-2">Availability:</span>
                            {product.availability.inStock ? (
                                <span className="text-lg font-semibold text-green-600">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                    in stock
                                </span>
                            ) : (
                                <span className="text-lg font-semibold text-red-600">Out of stock</span>
                            )}
                        </div>

                        {/* Low Stock Warning */}
                        {product.availability.inStock && product.availability.quantityLeft <= 35 && (
                            <p className="text-orange-600 font-medium mb-8">
                                Hurry up! only **{product.availability.quantityLeft}** product left in stock!
                            </p>
                        )}

                        <div className="space-y-6">
                            {/* RAM Options */}
                            <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-700">Ram:</span>
                                {product.ramOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setSelectedRam(option)}
                                        className={`px-4 py-2 text-sm rounded-lg border transition-all ${selectedRam === option
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-10 h-10 text-center border-l border-r border-gray-300 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-8">
                            <button
                                className="py-3 px-8 rounded-lg bg-[#EDA415] text-white font-semibold text-lg hover:bg-orange-600 transition duration-150 shadow-md"
                            >
                                Edit product
                            </button>
                            <button
                                className="py-3 px-8 rounded-lg bg-[#EDA415] text-gray-900 font-semibold text-lg hover:bg-yellow-600 transition duration-150 shadow-md"
                            >
                                Buy it now
                            </button>
                            <button
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition duration-150"
                                aria-label="Add to favorites"
                            >
                                {/* Heart Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;