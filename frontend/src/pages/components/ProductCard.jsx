// @ts-nocheck
export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="mx-auto h-32" />
      <h3 className="text-[#004D80] mt-2 font-semibold">{product.name}</h3>
      <p className="font-bold">${product.price}</p>
      <div className="flex justify-center mt-2">
        {"★★★★★".split("").map((s, i) => (
          <span key={i} className="text-gray-300">{s}</span>
        ))}
      </div>
    </div>
  );
}
