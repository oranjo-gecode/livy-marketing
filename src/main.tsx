import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { startMocks } from "./mocks";
import Mobile from "./mobile/Mobile.tsx";
import CampaignDetails from './mobile/CampaignDetails'
import BuilderLayout from "./builder/BuilderLayout.tsx";
import LivyConfiguration from "./builder/containers/LivyConfiguration.tsx";
import CollaborationMap from "./builder/containers/CollaborationMap.tsx";
import Stamp from "./builder/containers/Stamp.tsx";

// Start MSW and then render the app
async function bootstrap() {
  try {
    if (import.meta.env.DEV) {
      console.log('🚀 Starting MSW...')
      // Wait for MSW to start before rendering the app
      const mswStarted = await startMocks()
      if (mswStarted) {
        console.log('✅ MSW started successfully')
      } else {
        console.warn('⚠️ MSW failed to start, continuing without mocks')
      }
    }

    console.log("🎨 Rendering app...");
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/mobile/campaign/:id" element={<CampaignDetails />} />
            <Route path="/builder" element={<BuilderLayout />}>
              <Route index element={<LivyConfiguration />} />
              <Route path="map" element={<CollaborationMap />} />
              <Route path="stamp" element={<Stamp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StrictMode>
    );
    console.log("✅ App rendered successfully");
  } catch (error) {
    console.error("❌ Failed to start app:", error);
  }
}

bootstrap();
