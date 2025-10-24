// @ts-nocheck
import { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaHeart, FaRegStar, FaStar, FaTimes } from "react-icons/fa";

const SidebarItem = ({ product }) => (
  <div className="flex p-3 border-b border-gray-100 hover:bg-gray-50 transition">
    <div className="w-16 h-16 mr-3 shrink-0">
      <img
        src={product?.images?.[0] || "https://via.placeholder.com/100"}
        alt={product?.title}
        className="w-full h-full object-contain"
      />
    </div>

    <div className="grow">
      <h3 className="text-sm font-semibold text-gray-800 truncate">
        {product?.title}
      </h3>
      <p className="text-sm font-medium text-gray-600">
        ${product?.variants?.[0]?.price?.toFixed(2) || "N/A"}
      </p>

      <div className="flex text-yellow-500 text-xs mt-0.5">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
        <FaRegStar />
      </div>
    </div>

    <button
      className="text-gray-400 hover:text-red-500 ml-2 mt-1"
      title="Remove item"
    >
      <FaTimes size={14} />
    </button>
  </div>
);

const FavoritesSidebar = ({ isOpen, onClose }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchWishlist();
  }, [isOpen]);

  const sidebarClasses = isOpen ? "translate-x-0" : "translate-x-full";

  return (
    <>
      {isOpen && <div onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${sidebarClasses}`}
      >
        <div className="p-4 flex justify-between items-center text-gray-800 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaHeart className="text-red-500" size={20} />
            <h2 className="text-lg font-bold">Wishlist Items</h2>
          </div>
          <FiChevronRight
            size={20}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <div className="overflow-y-auto h-[calc(100%-57px)]">
          {loading ? (
            <p className="text-gray-500 text-center mt-10">Loading...</p>
          ) : wishlist.length > 0 ? (
            wishlist.map((item) => (
              <SidebarItem key={item._id} product={item.product} />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10 p-4">
              No favorites added yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesSidebar;
