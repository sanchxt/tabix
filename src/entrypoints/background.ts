// constants
const MAX_NOTES = 4;
const DEFAULT_COLOR = "#FFD700";
const CONTEXT_MENU_ID = "saveForLater";

// utility functions
const getSavedLinks = (): Promise<string[]> =>
  new Promise((resolve) => {
    chrome.storage.local.get(["savedLinks"], (result) => {
      resolve(result.savedLinks || []);
    });
  });
const setSavedLinks = (links: string[]) =>
  chrome.storage.local.set({ savedLinks: links });

const getNotes = (): Promise<any[]> =>
  new Promise((resolve) => {
    chrome.storage.local.get(["notes"], (result) => {
      resolve(result.notes || []);
    });
  });

const setNotes = (notes: any[]) => chrome.storage.local.set({ notes });

//   event handlers
async function handleExtensionInstalled({ reason }: { reason: string }) {
  if (reason !== "install") return;

  await browser.tabs.create({
    url: "https://i.kym-cdn.com/photos/images/original/002/623/971/83b.jpg",
    active: true,
  });
}

function createContextMenu() {
  browser.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Save it for Later",
    contexts: ["page"],
  });
}

async function handleContextMenuClick(info: any, tab: any) {
  const currentUrl = tab?.url;
  if (!currentUrl) return;

  const savedLinks = await getSavedLinks();

  if (info.menuItemId === CONTEXT_MENU_ID) {
    if (savedLinks.includes(currentUrl)) {
      // Remove link
      const updatedLinks = savedLinks.filter((link) => link !== currentUrl);
      await setSavedLinks(updatedLinks);

      console.log(`Link removed: ${currentUrl}`);
      browser.contextMenus.update(CONTEXT_MENU_ID, {
        title: "Save it for Later",
      });
    } else {
      // Save link
      savedLinks.push(currentUrl);
      await setSavedLinks(savedLinks);

      console.log(`Link saved: ${currentUrl}`);
      browser.contextMenus.update(CONTEXT_MENU_ID, {
        title: "Unsave it",
      });
    }
  }
}

async function handleStorageChange(changes: any, area: string) {
  if (area !== "local" || !changes.savedLinks) return;

  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  browser.contextMenus.update(CONTEXT_MENU_ID, {
    title: changes.savedLinks.newValue.includes(tab?.url)
      ? "Unsave it"
      : "Save it for Later",
  });
}

function handleRuntimeMessage(
  message: any,
  sender: any,
  sendResponse: (response: any) => void
) {
  const { action, payload } = message;

  if (action === "fetchNotes") {
    getNotes().then((notes) => sendResponse(notes));
    return true;
  }

  if (action === "createNote") {
    getNotes().then((notes) => {
      if (notes.length >= MAX_NOTES) {
        sendResponse({ success: false, message: "Maximum of 4 notes allowed" });
        return;
      }
      const newNote = {
        id: Date.now().toString(),
        title: payload.title || "Untitled note",
        color: payload.color || DEFAULT_COLOR,
        content: payload.content || "",
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes).then(() =>
        sendResponse({ success: true, notes: updatedNotes })
      );
    });
    return true;
  }

  if (action === "updateNote") {
    getNotes().then((notes) => {
      const updatedNotes = notes.map((note) =>
        note.id === payload.id ? { ...note, ...payload } : note
      );
      setNotes(updatedNotes).then(() =>
        sendResponse({ success: true, notes: updatedNotes })
      );
    });
    return true;
  }

  if (action === "deleteNote") {
    getNotes().then((notes) => {
      const updatedNotes = notes.filter((note) => note.id !== payload.id);
      setNotes(updatedNotes).then(() =>
        sendResponse({ success: true, notes: updatedNotes })
      );
    });
    return true;
  }
}

// initialization
function initialize() {
  browser.runtime.onInstalled.addListener(handleExtensionInstalled);
  createContextMenu();
  browser.contextMenus.onClicked.addListener(handleContextMenuClick);
  chrome.storage.onChanged.addListener(handleStorageChange);
  chrome.runtime.onMessage.addListener(handleRuntimeMessage);
}

export default defineBackground(() => {
  initialize();
});
