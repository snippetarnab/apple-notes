import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/react";
import ClerkTokenBridge from "./components/ClerkTokenBridge.jsx";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY. Add it to ui/.env.local."
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInFallbackRedirectUrl="/auth-complete"
      signUpFallbackRedirectUrl="/auth-complete"
    >
      <BrowserRouter>
        <ClerkTokenBridge>
          <App />
        </ClerkTokenBridge>
        <Toaster />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
