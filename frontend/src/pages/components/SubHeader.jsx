// @ts-nocheck
const SubHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white ">
            {/* Left side */}
            <div className="mb-2 sm:mb-0">
                <p className="text-lg ">Home</p>
            </div>

            {/* Right side buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <button className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto">
                    Add category
                </button>
                <button className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto">
                    Add sub category
                </button>
                <button className="bg-[#F6A01A] text-white px-4 py-2 rounded-md w-full sm:w-auto">
                    Add product
                </button>
            </div>
        </div>
    );
};

export default SubHeader;
