// @ts-nocheck
export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition w-full sm:w-64 md:w-72 lg:w-80 mx-auto cursor-pointer">
      <img 
        src={product.image} 
        alt={product.name} 
        className="mx-auto h-32 sm:h-40 md:h-48 object-contain"
      />
      <h3 className="text-[#004D80] mt-2 font-semibold text-sm sm:text-base md:text-lg">
        {product.name}
      </h3>
      <p className="font-bold text-sm sm:text-base md:text-lg">${product.price}</p>
      <div className="flex justify-center mt-2 space-x-1">
        {"★★★★★".split("").map((s, i) => (
          <span key={i} className="text-gray-300 text-sm sm:text-base">{s}</span>
        ))}
      </div>
    </div>
  );
}
