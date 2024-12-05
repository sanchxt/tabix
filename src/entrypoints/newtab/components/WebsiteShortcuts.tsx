import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

import "@/assets/newtab/site-shortcuts.css";

const WebsiteShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<string[]>([]);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // load saved shortcuts
  useEffect(() => {
    chrome.storage.local.get("websiteShortcuts", (result) => {
      if (result.websiteShortcuts) {
        setShortcuts(result.websiteShortcuts);
      } else {
        const emptyShortcuts = new Array(6).fill("");
        setShortcuts(emptyShortcuts);
        chrome.storage.local.set({ websiteShortcuts: emptyShortcuts });
      }
    });
  }, []);

  const saveShortcuts = (updatedShortcuts: string[]) => {
    setShortcuts(updatedShortcuts);
    chrome.storage.local.set({ websiteShortcuts: updatedShortcuts });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSaveUrl = () => {
    if (!inputUrl.trim()) {
      setErrorMessage("URL cannot be empty.");
      return;
    }

    if (!isValidUrl(inputUrl.trim())) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    const updatedShortcuts = [...shortcuts];
    updatedShortcuts[popupIndex!] = inputUrl;
    saveShortcuts(updatedShortcuts);

    setInputUrl("");
    setPopupIndex(null);
    setErrorMessage("");
  };

  const handleRemoveShortcut = (index: number) => {
    const updatedShortcuts = [...shortcuts];
    updatedShortcuts[index] = "";
    saveShortcuts(updatedShortcuts);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        {shortcuts.map((shortcut, idx) => (
          <div
            key={idx}
            className={`relative shortcut-box bg-gradient-to-b border group ${
              idx % 2 === 1 ? "right-col-box" : ""
            } ${
              shortcut
                ? "from-purple-700/30 to-purple-100/20 border-purple-500"
                : "from-gray-500/30 to-gray-200/20 border-gray-600"
            }`}
          >
            <button
              onClick={() => {
                if (shortcut) window.location.href = shortcut;
                else setPopupIndex(idx);
              }}
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
                <GoPlus className="text-4xl text-gray-400" />
              )}
            </button>

            {shortcut && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveShortcut(idx);
                }}
                className="absolute top-1 right-1 bg-gray-700 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <IoClose size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* popup */}
      {popupIndex !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setPopupIndex(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-950 via-gray-900/95 to-gray-800 rounded-lg p-6 w-96 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <label
              htmlFor="shortcut"
              className="text-xl font-bold mb-4 text-slate-200"
            >
              Add a URL
            </label>
            <input
              type="url"
              id="shortcut"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full text-white bg-gray-700/70 focus:bg-gray-700 transition-colors duration-300 rounded-md p-2 focus:ring-0 focus:ring-transparent focus:outline-none active:border-transparent active:ring-transparent"
              placeholder="Enter URL (e.g., https://www.google.com)"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setPopupIndex(null);
                  setErrorMessage("");
                }}
                className="px-4 py-2 text-white hover:bg-slate-200/70 hover:text-black transition-colors duration-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUrl}
                className="px-4 py-2 bg-blue-700/40 hover:bg-blue-500/60 transition-colors duration-200 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteShortcuts;
