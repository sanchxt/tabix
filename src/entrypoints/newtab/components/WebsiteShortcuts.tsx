import "@/assets/newtab/site-shortcuts.css";
import { GoPlus } from "react-icons/go";

const WebsiteShortcuts = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box">
          <GoPlus className="text-4xl" />
        </button>
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box right-col-box">
          <GoPlus className="text-4xl" />
        </button>
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box">
          <GoPlus className="text-4xl" />
        </button>
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box right-col-box">
          <GoPlus className="text-4xl" />
        </button>
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box">
          <GoPlus className="text-4xl" />
        </button>
        <button className="bg-gray-500/30 border border-gray-600 shortcut-box right-col-box">
          <GoPlus className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default WebsiteShortcuts;
