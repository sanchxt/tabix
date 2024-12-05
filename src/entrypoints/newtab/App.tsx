import BottomBar from "./components/BottomBar";
import CurrentTime from "./components/CurrentTime";
import SearchBar from "./components/SearchBar";
import WebsiteShortcuts from "./components/site-shortcuts/WebsiteShortcuts";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <main className="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] px-8">
      <section>
        <TopBar />
      </section>

      <section className="h-full grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-white">tools</div>

        <div className="flex justify-center items-center flex-col w-full gap-y-12">
          <CurrentTime />
          <SearchBar />
        </div>

        <WebsiteShortcuts />
      </section>

      <section>
        <BottomBar />
      </section>
    </main>
  );
};

export default App;
