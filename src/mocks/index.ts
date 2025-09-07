export { worker } from "./browser";
export { handlers } from "./handlers";

// Function to start MSW in development
export const startMocks = async () => {
  if (import.meta.env.DEV) {
    try {
      console.log("🔧 Importing MSW browser module...");
      const { worker } = await import("./browser");

      console.log("🔧 Starting MSW worker...");

      // Use the new MSW configuration with the generated service worker
      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });

      console.log("🔶 MSW started in development mode");
      return true;
    } catch (error) {
      console.error("❌ Failed to start MSW:", error);
      return false;
    }
  }
  return false;
};
