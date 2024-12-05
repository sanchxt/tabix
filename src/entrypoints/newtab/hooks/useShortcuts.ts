import { useState, useEffect } from "react";

export const useShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<string[]>([]);

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

  return { shortcuts, saveShortcuts };
};
