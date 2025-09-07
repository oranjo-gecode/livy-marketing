import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Mobile from "./mobile/Mobile.tsx";
import BuilderLayout from "./builder/BuilderLayout.tsx";
import LivyConfiguration from "./builder/containers/LivyConfiguration.tsx";
import CollaborationMap from "./builder/containers/CollaborationMap.tsx";
import Stamp from "./builder/containers/Stamp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/builder" element={<BuilderLayout />}>
          <Route index element={<LivyConfiguration />} />
          <Route path="map" element={<CollaborationMap />} />
          <Route path="stamp" element={<Stamp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
