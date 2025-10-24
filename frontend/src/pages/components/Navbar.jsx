// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import FavoritesSidebar from "./FavoritesSidebar";
import { ThemeContext } from "../../context/WishlistContext";

export default function Navbar() {
    const [cartCount] = useState(0);
    // const [favCount, setFavCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { favoriteCount, updateFavoriteCount } = useContext(ThemeContext);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    console.log("favoriteCount",favoriteCount);
    

    // ✅ Fetch real wishlist count
    useEffect(() => {
        console.log("wo",favoriteCount);
        
        const fetchWishlistCount = async () => {
            try {
                const token = localStorage.getItem("token"); // assuming you store JWT
                const res = await fetch("http://localhost:5000/wishlist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    // setFavCount(data.length);
                    updateFavoriteCount(data.length)
                } else {
                    console.error("Failed to fetch wishlist");
                }
            } catch (err) {
                console.error("Error fetching wishlist:", err);
            }
        };
        fetchWishlistCount();
    }, [favoriteCount,updateFavoriteCount]);

    return (
        <>
            {/* Navbar */}
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
                    {/* Favorites Button */}
                    <button
                        title="Favorites"
                        onClick={toggleSidebar}
                        className="relative hover:text-[#F6A01A] transition text-xl cursor-pointer"
                    >
                        <FaHeart />
                        {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                {favoriteCount}
                            </span>
                        )}
                    </button>

                    <button className="hover:text-[#F6A01A] transition font-semibold cursor-pointer">
                        Logout
                    </button>

                    {/* Cart Button */}
                    <button className="relative text-xl hover:text-[#F6A01A] transition cursor-pointer">
                        <FaShoppingCart />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <button
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                        setIsSidebarOpen(false);
                    }}
                    className="md:hidden text-2xl cursor-pointer"
                >
                    ☰
                </button>

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
                            {/* Favorites (Mobile) */}
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    toggleSidebar();
                                }}
                                className="relative flex items-center gap-1 hover:text-[#F6A01A] transition-colors cursor-pointer"
                            >
                                <FaHeart /> Favorites
                                {favCount > 0 && (
                                    <span className="absolute -top-2 -right-6 bg-[#F6A01A] text-white text-xs font-bold rounded-full px-2">
                                        {favCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Favorites Sidebar */}
            <FavoritesSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
}
