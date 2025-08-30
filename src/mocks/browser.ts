import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

// Add error handling and debugging
worker.events.on("unhandledException", (error) => {
  console.error("MSW Error:", error);
});

worker.events.on("request:start", ({ request }) => {
  console.log("🚀 MSW Intercepted:", request.method, request.url);
});

worker.events.on("response:mocked", ({ response }) => {
  console.log("✅ MSW Mocked Response:", response.status);
});

worker.events.on("request:unhandled", ({ request }) => {
  console.warn("⚠️ MSW Unhandled Request:", request.method, request.url);
});
