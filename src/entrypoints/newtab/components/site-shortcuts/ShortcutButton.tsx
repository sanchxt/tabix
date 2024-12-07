import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";

import { ShortcutButtonProps } from "../../utils/types/website-shortcuts";

const ShortcutButton = ({
  shortcut,
  onClick,
  onRemove,
  isOddIndex,
}: ShortcutButtonProps) => {
  return (
    <div
      className={`relative shortcut-box bg-gradient-to-b border group ${
        isOddIndex ? "lower-box" : ""
      } ${
        shortcut
          ? "from-purple-700/30 to-purple-100/20 border-purple-500"
          : "from-gray-500/30 to-gray-200/20 border-gray-600"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full h-full flex justify-center items-center"
      >
        {shortcut ? (
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain=${
              new URL(shortcut).hostname
            }`}
            alt="Website Favicon"
            className="h-12 w-12"
          />
        ) : (
          <GoPlus className="text-5xl text-gray-300" />
        )}
      </button>

      {shortcut && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 bg-gray-700 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <IoClose size={16} />
        </button>
      )}
    </div>
  );
};

export default ShortcutButton;
