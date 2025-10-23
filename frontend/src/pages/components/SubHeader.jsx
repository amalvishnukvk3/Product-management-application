// @ts-nocheck
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import AddCategoryModal from "./AddCategoryModal";

const SubHeader = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);


  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white">
      {/* Left side */}
      <div className="mb-2 sm:mb-0 flex justify-center items-center">
        <p className="text-lg flex items-center gap-1">
          Home <FaChevronRight className="text-sm" />
        </p>
      </div>

      {/* Right side buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <button className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto cursor-pointer"
          onClick={() => setOpenCategoryModal(true)}
        >
          Add category
        </button>
        <button className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto cursor-pointer">
          Add sub category
        </button>
        <button
          onClick={() => setOpenProductModal(true)}
          className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto cursor-pointer"
        >
          Add product
        </button>
      </div>

      {openCategoryModal && <AddCategoryModal onClose={() => setOpenCategoryModal(false)} />}
      {openProductModal && <AddProductModal onClose={() => setOpenProductModal(false)} />}
    </div>
  );
};

export default SubHeader;
