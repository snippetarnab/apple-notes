import { Route, Routes, Navigate, Outlet } from "react-router";
import { SignIn, SignUp, useAuth } from "@clerk/react";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import AuthCompletePage from "./pages/AuthCompletePage.jsx";

function RequireAuth() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

function App() {
  return (
    <div className="relative h-full w-full" data-theme="forest">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route
          path="/sign-in/*"
          element={
            <main className="flex min-h-screen items-center justify-center px-4 py-10">
              <SignIn
                routing="path"
                path="/sign-in"
                fallbackRedirectUrl="/auth-complete"
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-md",
                    card: "w-full",
                  },
                }}
              />
            </main>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <main className="flex min-h-screen items-center justify-center px-4 py-10">
              <SignUp
                routing="path"
                path="/sign-up"
                fallbackRedirectUrl="/auth-complete"
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-md",
                    card: "w-full",
                  },
                }}
              />
            </main>
          }
        />
        <Route path="/auth-complete" element={<AuthCompletePage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
