import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",

  manifest: {
    name: "some random title",
    permissions: ["storage"],
    action: {
      default_popup: "popup.html",
    },
    chrome_url_overrides: {
      newtab: "newtab.html",
    },
  },
});
