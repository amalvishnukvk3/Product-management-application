// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { FaBars, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { ThemeContext } from "../../context/WishlistContext";

export default function Sidebar({ onFilterChange }) {
  const { favoriteCount, updateFavoriteCount, products, updateProducts } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categories, setCategories] = useState({});

  const toggleCategory = (category) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCheckbox = (item) => {
    setSelectedItems((prev) => {
      const updated = prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item];

      // Call the parent callback with updated selected subcategories
      if (onFilterChange) onFilterChange(updated);

      return updated;
    });
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const catRes = await fetch("http://localhost:5000/categories");
        const catData = await catRes.json();

        const formatted = {};
        for (const cat of catData || []) {
          const subRes = await fetch(
            `http://localhost:5000/subcategories/category/${cat._id}`
          );
          const subData = await subRes.json();
          formatted[cat.name] = subRes.ok ? subData.map((s) => s.name) : [];
        }

        setCategories(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryData();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        console.log("selectedItems", selectedItems);

        // selectedItems.forEach((sub) => params.append("subcategory", sub));
        const filters = {
          subcategory: selectedItems.join(","), // comma-separated subcategory names
        };

        const query = new URLSearchParams(filters).toString();

        const res = await fetch(`http://localhost:5000/products?${query}`);
        const data = await res.json();
        updateProducts(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [selectedItems]);

  return (
    <>
      <button
        className="md:hidden p-2 m-2 bg-[#003B5C] text-white rounded"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white p-4
          w-64 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-1/5
        `}
      >
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {Object.keys(categories).map((category) => (
            <li key={category} className="cursor-pointer select-none">
              <div className="flex justify-between items-center" onClick={() => toggleCategory(category)}>
                {category}
                {activeCategories.includes(category) ? <FaChevronDown /> : <FaChevronRight />}
              </div>

              {activeCategories.includes(category) && (
                <ul className="ml-4 mt-1 space-y-1">
                  {categories[category].map((item) => (
                    <li key={item}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleCheckbox(item);
                          }}
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

