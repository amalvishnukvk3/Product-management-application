//@ts-nocheck
// import { FaHeart, FaTimes } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { FaHeart, FaShoppingCart, FaRegStar, FaStar, FaTimes } from "react-icons/fa";

// Mock Product Data to populate the sidebar
const MOCK_FAVORITE_PRODUCTS = [
    { id: 1, name: "HP AMD Ryzen 3", price: 529.99, image: "" },
    { id: 2, name: "HP AMD Ryzen 3", price: 529.99, image: "" },
    // Add more items if needed to show scrolling
];

// Reusing the SidebarItem component structure
const SidebarItem = ({ product }) => (
    <div className="flex p-3 border-b border-gray-100 hover:bg-gray-50 transition">
        {/* Product Image */}
        <div className="w-16 h-16 mr-3 shrink-0">
            <img 
                src={" https://m.media-amazon.com/images/I/510uTHyDqGL.jpg"} // Placeholder for laptop thumbnail
                alt={product.name} 
                className="w-full h-full object-contain" 
            />
        </div>
        
        {/* Product Details */}
        <div className="grow">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
            <p className="text-sm font-medium text-gray-600">${product.price.toFixed(2)}</p>
            
            {/* Star Rating Placeholder */}
            <div className="flex text-yellow-500 text-xs mt-0.5">
                <FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
            </div>
        </div>
        
        {/* Remove Button (Styled like the screenshot's 'X' button) */}
        <button className="text-gray-400 hover:text-red-500 ml-2 mt-1" title="Remove item">
            <FaTimes size={14} />
        </button>
    </div>
);


const FavoritesSidebar = ({ isOpen, onClose, favCount }) => {
    // Tailwind CSS classes for the slide-out transition
    const sidebarClasses = isOpen
        ? "translate-x-0" // Sidebar visible
        : "translate-x-full"; // Sidebar hidden off-screen

    return (
        <>
            {/* Backdrop: Dark overlay when sidebar is open */}
            {isOpen && (
                <div 
                    // className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                    onClick={onClose} 
                />
            )}

            {/* Sidebar Container: Fixed, slides in/out from the right */}
            <div
                className={`fixed top-0 right-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${sidebarClasses}`}
            >
                {/* Header (Matching Screenshot) */}
                <div className="p-4 flex justify-between items-center text-gray-800 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <FaHeart className="text-red-500" size={20} />
                        <h2 className="text-lg font-bold">
                            Items
                        </h2>
                    </div>
                    {/* The small arrow on the right side of "Items" */}
                    <FiChevronRight size={20} className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={onClose} />
                </div>
                
                {/* Content Area - List of Favorite Items */}
                <div className="overflow-y-auto h-[calc(100%-57px)]">
                    {MOCK_FAVORITE_PRODUCTS.length > 0 ? (
                        MOCK_FAVORITE_PRODUCTS.map(product => (
                            <SidebarItem key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-10 p-4">No favorites added yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FavoritesSidebar