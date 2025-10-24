// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EditProductModal from '../components/EditProductModal';


const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/products/${productId}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data);
                    // Set initial selected variant
                    if (data?.variants?.length > 0) {
                        setSelectedVariant(data.variants[0]);
                        setQuantity(1);
                    }
                } else {
                    setError(data.message || "Failed to fetch product");
                }
            } catch (err) {
                console.error(err);
                setError("Error fetching product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // State for selected variant and quantity
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleVariantSelect = (ram) => {
        const variant = product.variants.find(v => v.ram === ram);
        setSelectedVariant(variant);
        setQuantity(1); // reset quantity when variant changes
    };

    const handleQuantityChange = (delta) => {
        if (!selectedVariant) return;
        const newQty = quantity + delta;
        // Ensure quantity is at least 1 and at most variant qty
        setQuantity(Math.max(1, Math.min(newQty, selectedVariant.qty)));
    };

    if (!product) return <div className="p-8 text-center">Product not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto p-4 flex items-center text-sm text-gray-600 space-x-2">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <span>&gt;</span>
                <span className="font-semibold">Product details</span>
            </div>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Images */}
                    <div>
                        <div className="border border-gray-200 p-4 mb-4 flex justify-center items-center h-96">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <div className="flex space-x-4">
                            {product.images.slice(1).map((img, index) => (
                                <div key={index} className="w-24 h-24 border border-gray-300 p-1 cursor-pointer hover:border-blue-500 flex justify-center items-center">
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
                        <p className="text-4xl font-semibold text-gray-800 mb-4">
                            ${selectedVariant?.price || product.variants[0]?.price}
                        </p>

                        {/* RAM Options */}
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="font-medium text-gray-700">RAM:</span>
                            {product.variants.map((v) => (
                                <button
                                    key={v.ram}
                                    onClick={() => handleVariantSelect(v.ram)}
                                    className={`px-4 py-2 text-sm rounded-lg border transition-all ${selectedVariant?.ram === v.ram
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    {v.ram} GB
                                </button>
                            ))}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-3 mb-6">
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
                                    className="w-12 h-10 text-center border-l border-r border-gray-300 focus:outline-none"
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100 transition duration-150"
                                >
                                    +
                                </button>
                            </div>

                        </div>

                        {/* Availability */}
                        <div className="flex items-center mb-6">
                            <span className="text-lg font-medium text-gray-600 mr-2">Availability:</span>
                            {selectedVariant?.qty > 0 ? (
                                <span className="text-lg font-semibold text-green-600">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                    in stock
                                </span>
                            ) : (
                                <span className="text-lg font-semibold text-red-600">Out of stock</span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-8">
                            <button onClick={() => setOpenEditModal(true)}
                                className="py-3 px-8 rounded-lg bg-[#EDA415] text-white font-semibold text-lg hover:bg-orange-600 transition duration-150 shadow-md">
                                Edit product
                            </button>
                            <button className="py-3 px-8 rounded-lg bg-[#EDA415] text-gray-900 font-semibold text-lg hover:bg-yellow-600 transition duration-150 shadow-md">
                                Buy it now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {openEditModal && (
                <EditProductModal onClose={() => setOpenEditModal(false)} product={product} />
            )}
        </div>
    );
};

export default ProductDetailsPage;
