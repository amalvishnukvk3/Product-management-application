// @ts-nocheck
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaRegStar, FaStar, FaTimes } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    // Navigates to the product details page using the product's ID
    navigate(`/products/${product.id}`);
  };
  return (
    <div onClick={handleProductClick} className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition w-full sm:w-64 md:w-72 lg:w-80 mx-auto cursor-pointer">
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-32 sm:h-40 md:h-48 object-contain"
      />
      <h3 className="text-[#004D80] mt-2 font-semibold text-sm sm:text-base md:text-lg">
        {product.name}
      </h3>
      <p className="font-bold text-sm sm:text-base md:text-lg">${product.price}</p>
      <div className="flex text-yellow-500 text-xs mt-0.5">
        <FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
      </div>
    </div>
  );
}
