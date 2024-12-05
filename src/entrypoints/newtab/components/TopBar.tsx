import flower from "@/assets/flower.svg";
import { HiMenuAlt1 } from "react-icons/hi";

const TopBar = () => {
  return (
    <div className="py-8 flex justify-between items-center">
      <button className="text-5xl font-thin tracking-widest text-white">
        Tabix.
      </button>

      <img src={flower} className="w-12 h-12" />

      <button>
        <HiMenuAlt1 className="w-12 h-12 text-white" />
      </button>
    </div>
  );
};

export default TopBar;
