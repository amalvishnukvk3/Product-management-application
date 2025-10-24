// @ts-nocheck
import { useContext, useState } from "react";
import { FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // tracks wishlist status
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { favoriteCount, updateFavoriteCount } = useContext(ThemeContext);


  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // prevent navigating when clicking heart
    if (!product?._id) return toast.error("Product not found");

    setWishlistLoading(true);
    setIsFavorite(true); // optimistic UI update
    try {
      const res = await fetch("http://localhost:5000/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: product._id,
          variant: product.variants?.[0],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Added to wishlist!");
        updateFavoriteCount(favoriteCount+1)
      } else {
        setIsFavorite(false); // revert if failed
        toast.error(data.message || "Failed to add to wishlist");
      }
    } catch (err) {
      setIsFavorite(false); // revert if error
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  const starRating = (
    <div className="flex text-gray-400 text-sm mt-0.5">
      <FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
    </div>
  );

  const title = product?.title || "N/A";
  const price = product?.variants?.[0]?.price ? `$${product.variants[0].price}` : "N/A";
  const imageUrl = product?.images?.[0];

  return (
    <div className="relative border border-blue-300 rounded-xl p-0 shadow-sm hover:shadow-md transition mx-auto cursor-pointer w-full max-w-xs h-60 ">

      {/* Wishlist Heart */}
      <div className="absolute top-3 right-5 z-10" onClick={handleAddToWishlist}>
        {wishlistLoading ? (
          <div className="text-gray-400 animate-pulse"><FaRegHeart className="text-red-500" /></div>
        ) : isFavorite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-red-500" />
        )}
      </div>

      <div onClick={handleProductClick} className="p-4 pt-8">
        <img
          src={imageUrl}
          alt={title}
         className="mx-auto h-25 w-auto max-w-full object-cover mb-4 rounded-lg transition-all duration-300 hover:scale-140"
        />
        <h3 className="text-gray-900 font-normal text-lg text-left ml-0.5 mt-2">
          {title}
        </h3>
        <p className="font-light text-xl text-left ml-0.5 mt-1 mb-1">
          {price}
        </p>
        <div className="text-left ml-0.5 mb-1">
          {starRating}
        </div>
      </div>
    </div>
  );
}
