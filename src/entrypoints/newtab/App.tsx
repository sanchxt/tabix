import BottomBar from "./components/BottomBar";
import CurrentTime from "./components/CurrentTime";
import SearchBar from "./components/SearchBar";
import ShortcutsLine from "./components/site-shortcuts/ShortcutsLine";
import WebsiteShortcuts from "./components/site-shortcuts/WebsiteShortcuts";
import ToolShortcuts from "./components/tool-shortcuts/ToolShortcuts";
import ToolsLine from "./components/tool-shortcuts/ToolsLine";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <main className="min-h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] px-1 sm:px-2 md:px-4 lg:px-8">
      <section>
        <TopBar />
      </section>

      <section className="h-full grid grid-rows-[1fr_1fr_1fr] md:grid-rows-1 md:grid-cols-[1fr_auto_1fr] items-center">
        <ToolShortcuts />

        <div className="flex justify-center items-center flex-col w-full gap-y-12 relative">
          <ToolsLine />

          <CurrentTime />
          <SearchBar />

          <ShortcutsLine />
        </div>

        <WebsiteShortcuts />
      </section>

      <section className="pt-8 text-white flex justify-center">
        <BottomBar />
      </section>
    </main>
  );
};

export default App;
