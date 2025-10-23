// @ts-nocheck
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";

const products = Array(6).fill({
    image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg",
    name: "HP AMD Ryzen 3",
    price: "529.99",
});

const HomePage = () => {
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
