// @ts-nocheck
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/WishlistContext";

// const products = Array(6).fill({
//     id: "4124564%$DFR3",
//     image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg",
//     name: "HP AMD Ryzen 3",
//     price: "529.99",
// });

const HomePage = () => {
    // const [products, setProducts] = useState([]);
    const { products, updateProducts } = useContext(ThemeContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/products");
                const data = await res.json();
                console.log("data", data);


                if (res.ok) {
                    updateProducts(data.items || [])
                    // setProducts(data.items || []); // adjust if your backend returns a different key
                } else {
                    console.error("Failed to fetch products:", data.message);
                    setError(data.message || "Failed to fetch products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Error fetching products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <Navbar />
            <SubHeader />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p, i) => (
                            <ProductCard key={i} product={p} />
                        ))}
                    </div>

                    <div className="mt-6">
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
