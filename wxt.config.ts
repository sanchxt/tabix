import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",

  manifest: {
    name: "some random title",
    action: {
      default_popup: "popup.html",
    },
    chrome_url_overrides: {
      newtab: "newtab.html",
    },
  },
});
