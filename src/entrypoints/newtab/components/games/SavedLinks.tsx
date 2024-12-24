import { useEffect, useState } from "react";

const SavedLinks = () => {
  const [savedLinks, setSavedLinks] = useState<string[]>([]);

  useEffect(() => {
    // load saved links\
    const loadSavedLinks = () => {
      chrome.storage.local.get(["savedLinks"], (result) => {
        const savedLinks = result.savedLinks || [];
        setSavedLinks(savedLinks);
      });
    };

    loadSavedLinks();

    // listen for changes to the savedLinks in chrome.storage
    const handleStorageChange = () => {
      loadSavedLinks(); // refetch saved links if changed
    };

    // watch for storage changes
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const formatLink = (link: string) => {
    return link.replace(/^(https?:\/\/)/, ""); // removes http or https
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <h1>Saved Links</h1>
      {savedLinks.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="text-slate-200 text-xs md:text-sm tracking-wider py-2 italic">
            No saved links yet.
          </p>
          <p className="text-slate-300 text-[0.65rem] md:text-xs">
            When on a website that you want to visit later, like an article that
            you want to read later, right click on the page and click on{" "}
            <span className="font-extrabold text-slate-200">
              "Save it for Later."
            </span>
          </p>
          <p className="text-slate-300 text-[0.65rem] md:text-xs">
            Come back here whenever you want to access it later! Keep your
            bookmarks more organised.
          </p>
        </div>
      ) : (
        <ul className="w-full h-full grid grid-cols-2 grid-rows-4 md:grid-cols-3 lg:grid-rows-5 lg:grid-cols-5 px-1 gap-4">
          {savedLinks.map((link, index) => (
            <li
              key={index}
              className="overflow-hidden text-nowrap whitespace-nowrap text-ellipsis text-xs md:text-sm text-left"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-gradient-to-r bg-clip-text from-white to-white hover:from-purple-200 hover:via-purple-400 hover:to-purple-300 transition-all duration-500"
              >
                {index + 1 + ". " + formatLink(link)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedLinks;
