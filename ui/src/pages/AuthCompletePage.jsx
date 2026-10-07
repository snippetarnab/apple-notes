import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@clerk/react";
import { Link, Navigate } from "react-router";

function AuthCompletePage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <CheckCircle2 className="size-16 text-success" aria-hidden="true" />
          <h1 className="card-title text-2xl">You’re signed in!</h1>
          <p className="text-base-content/70">
            Authentication is complete. Your notes are ready.
          </p>
          <div className="card-actions mt-4">
            <Link to="/" className="btn btn-primary">
              Continue to AppleNotes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthCompletePage;
