import { PopupProps } from "../../utils/types/website-shortcuts";

const Popup = ({
  inputUrl,
  errorMessage,
  setInputUrl,
  setPopupIndex,
  handleSaveUrl,
}: PopupProps) => {
  return (
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
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setPopupIndex(null);
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
  );
};

export default Popup;
