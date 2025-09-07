import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { startMocks } from "./mocks";
import App from "./App.tsx";

// Start MSW and then render the app
async function bootstrap() {
  try {
    if (import.meta.env.DEV) {
      console.log("🚀 Starting MSW...");
      // Wait for MSW to start before rendering the app
      const mswStarted = await startMocks();
      if (mswStarted) {
        console.log("✅ MSW started successfully");
      } else {
        console.warn("⚠️ MSW failed to start, continuing without mocks");
      }
    }

    console.log("🎨 Rendering app...");
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
    console.log("✅ App rendered successfully");
  } catch (error) {
    console.error("❌ Failed to start app:", error);
  }
}

bootstrap();
