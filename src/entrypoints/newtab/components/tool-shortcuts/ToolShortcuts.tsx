import { FaFilePdf } from "react-icons/fa6";
import { PiTabsDuotone } from "react-icons/pi";
import { IoColorPalette } from "react-icons/io5";
import { BsFillStickyFill } from "react-icons/bs";
import { IoIosImages, IoIosVideocam } from "react-icons/io";

import "@/assets/newtab/shortcuts.css";

const ToolShortcuts = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500 lower-box">
          <button className="w-full h-full flex justify-center items-center">
            {/* image tools */}
            <IoIosImages className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>

        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500">
          <button className="w-full h-full flex justify-center items-center">
            {/* pdf tools */}
            <FaFilePdf className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>

        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500 lower-box">
          <button className="w-full h-full flex justify-center items-center">
            {/* sticky notes */}
            <BsFillStickyFill className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>

        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500">
          <button className="w-full h-full flex justify-center items-center">
            {/* video tools */}
            <IoIosVideocam className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>

        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500 lower-box">
          <button className="w-full h-full flex justify-center items-center">
            {/* manage tabs */}
            <PiTabsDuotone className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>

        <div className="relative shortcut-box bg-gradient-to-b border group from-purple-700/30 to-purple-100/20 border-purple-500">
          <button className="w-full h-full flex justify-center items-center">
            {/* themes */}
            <IoColorPalette className="text-2xl sm:text-3xl lg:text-5xl text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolShortcuts;
