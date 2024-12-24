export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== "install") return;

    await browser.tabs.create({
      url: "https://i.kym-cdn.com/photos/images/original/002/623/971/83b.jpg",
      active: true,
    });
  });

  browser.contextMenus.create({
    id: "saveForLater",
    title: "Save it for Later",
    contexts: ["page"],
  });

  // handle context menu (right click)
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    const currentUrl = tab?.url;
    if (currentUrl) {
      // check the current saved links
      chrome.storage.local.get(["savedLinks"], (result) => {
        const savedLinks = result.savedLinks || [];

        if (info.menuItemId === "saveForLater") {
          if (savedLinks.includes(currentUrl)) {
            // if the link is already saved, remove it
            const updatedLinks = savedLinks.filter(
              (link: string) => link !== currentUrl
            );
            chrome.storage.local.set({ savedLinks: updatedLinks }, () => {
              console.log(`Link removed: ${currentUrl}`);
              // update context menu
              browser.contextMenus.update("saveForLater", {
                title: "Save it for Later",
              });
            });
          } else {
            // if the link is not saved, add it
            savedLinks.push(currentUrl);
            chrome.storage.local.set({ savedLinks }, () => {
              console.log(`Link saved: ${currentUrl}`);
              // update context menu
              browser.contextMenus.update("saveForLater", {
                title: "Unsave it",
              });
            });
          }
        }
      });
    }
  });

  // listen for context menu updates when storage changes
  chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area === "local" && changes.savedLinks) {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      // update the context menu based on whether the link is saved or not
      browser.contextMenus.update("saveForLater", {
        title: changes.savedLinks.newValue.includes(tab?.url)
          ? "Unsave it"
          : "Save it for Later",
      });
    }
  });
});
