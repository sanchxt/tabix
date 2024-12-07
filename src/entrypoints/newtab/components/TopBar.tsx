import flower from "@/assets/flower.svg";
import { HiMenuAlt1 } from "react-icons/hi";

const TopBar = () => {
  return (
    <div className="py-4 flex justify-between items-center relative">
      <button className="text-lg lg:text-5xl font-thin tracking-widest text-white">
        Tabix.
      </button>

      <div className="hidden md:inline absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2">
        <img src={flower} className="w-12 h-12 md:w-14 md:h-14" alt="Flower" />
      </div>

      <button>
        <HiMenuAlt1 className="w-10 h-10 md:w-12 md:h-12 text-white" />
      </button>
    </div>
  );
};

export default TopBar;
