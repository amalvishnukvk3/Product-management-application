// @ts-nocheck
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaRegStar, FaStar, FaTimes } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import FavoritesSidebar from "./FavoritesSidebar";


export default function Navbar() {
    const MOCK_FAVORITE_PRODUCTS = [
    { id: 1, name: "HP AMD Ryzen 3", price: 529.99, image: "" },
    { id: 2, name: "HP AMD Ryzen 3", price: 529.99, image: "" },
    // Add more items if needed to show scrolling
];
    const [cartCount] = useState(3);
    const [favCount] = useState(MOCK_FAVORITE_PRODUCTS.length); // Use the mock data length
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Navbar (Header) Component */}
            <nav className="bg-[#003B5C] text-white px-4 md:px-6 py-3 flex items-center justify-between relative z-30">

                {/* Search bar */}
                <div className="hidden md:flex items-center w-1/2 max-w-md">
                    <input
                        type="text"
                        placeholder="Search any things"
                        className="w-full p-2 rounded-l-md bg-[#ffffff] text-gray-800 focus:outline-none"
                    />
                    <button className="bg-[#F6A01A] px-4 py-2 rounded-r-md font-semibold hover:bg-[#e59500] transition cursor-pointer">
                        Search
                    </button>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Favorites Button - Opens Sidebar */}
                    <button
                        title="Favorites"
                        onClick={toggleSidebar} // <--- CLICK HANDLER ADDED
                        className="relative hover:text-[#F6A01A] transition text-xl cursor-pointer"
                    >
                        <FaHeart />
                        {favCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                {favCount}
                            </span>
                        )}
                    </button>

                    <button className="hover:text-[#F6A01A] transition font-semibold cursor-pointer">
                        Logout
                    </button>

                    {/* Cart with Badge */}
                    <button className="relative text-xl hover:text-[#F6A01A] transition cursor-pointer">
                        <FaShoppingCart />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button (Toggle mobile menu AND close sidebar if open) */}
                <button
                    onClick={() => { setMenuOpen(!menuOpen); setIsSidebarOpen(false); }}
                    className="md:hidden text-2xl cursor-pointer"
                >
                    ☰
                </button>

                {/* Mobile Dropdown Menu (Close sidebar if menu opens) */}
                {menuOpen && (
                    <div className="absolute top-14 left-0 w-full bg-[#003B5C] flex flex-col items-center py-4 space-y-4 md:hidden z-50 shadow-md">
                        <div className="flex items-center w-10/12">
                            <input
                                type="text"
                                placeholder="Search any things"
                                className="w-full p-2 rounded-l-md bg-[#ffffff] text-gray-800 focus:outline-none"
                            />
                            <button className="bg-[#F6A01A] px-4 py-2 rounded-r-md font-semibold hover:bg-[#e59500] transition cursor-pointer">
                                Search
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Favorites Button - Mobile */}
                            <button
                                onClick={() => { setMenuOpen(false); toggleSidebar(); }}
                                className="relative flex items-center gap-1 hover:text-[#F6A01A] transition-colors cursor-pointer"
                            >
                                <FaHeart /> Favorites
                                {favCount > 0 && (
                                    <span className="absolute -top-2 -right-6 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                        {favCount}
                                    </span>
                                )}
                            </button>
                            {/* ... (Other mobile buttons) ... */}
                        </div>
                    </div>
                )}
            </nav>

            {/* Favorites Sidebar Component */}
            <FavoritesSidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
            />
        </>
    );
}