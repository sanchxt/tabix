export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== "install") return;

    await browser.tabs.create({
      url: "https://i.kym-cdn.com/photos/images/original/002/623/971/83b.jpg",
      active: true,
    });
  });
});
