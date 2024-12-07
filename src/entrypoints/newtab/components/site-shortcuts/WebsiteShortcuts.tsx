import { useState } from "react";

import Popup from "./Popup";
import ShortcutButton from "./ShortcutButton";
import { useShortcuts } from "../../hooks/useShortcuts";
import { useValidateUrl } from "../../hooks/useValidateUrl";

import "@/assets/newtab/shortcuts.css";

const WebsiteShortcuts = () => {
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { shortcuts, saveShortcuts } = useShortcuts();
  const { isValidUrl } = useValidateUrl();

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
    updatedShortcuts[popupIndex!] = inputUrl.trim();
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
          <ShortcutButton
            key={idx}
            shortcut={shortcut}
            onClick={() => {
              if (shortcut) window.location.href = shortcut;
              else setPopupIndex(idx);
            }}
            onRemove={(e) => {
              e.stopPropagation();
              handleRemoveShortcut(idx);
            }}
            isOddIndex={idx % 2 === 1}
          />
        ))}
      </div>

      {popupIndex !== null && (
        <Popup
          inputUrl={inputUrl}
          errorMessage={errorMessage}
          setInputUrl={setInputUrl}
          setPopupIndex={setPopupIndex}
          handleSaveUrl={handleSaveUrl}
        />
      )}
    </div>
  );
};

export default WebsiteShortcuts;
