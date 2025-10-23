// @ts-nocheck
import { useState } from "react";
import { FaBars, FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]); // Track expanded categories
  const [selectedItems, setSelectedItems] = useState([]); // Track checked items

  const toggleCategory = (category) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCheckbox = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const categories = {
    Laptop: ["Hp", "Dell", "Lenovo"],
    Tablet: ["iPad", "Samsung", "Lenovo"],
    Headphones: ["Bose", "Sony", "JBL"],
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-2 m-2 bg-[#003B5C] text-white rounded"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
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
            <li
              key={category}
              className="cursor-pointer select-none"
              // onClick={() => toggleCategory(category)}
            >
              {/* Category header */}
              <div className="flex justify-between items-center" onClick={() => toggleCategory(category)}>
                {category}
                {activeCategories.includes(category) ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </div>

              {/* Category items */}
              {activeCategories.includes(category) && (
                <ul className="ml-4 mt-1 space-y-1">
                  {categories[category].map((item) => (
                    <li key={item}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          onChange={(e) => {
                            e.stopPropagation(); // prevent collapsing
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
