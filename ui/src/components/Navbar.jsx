import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary font-mono  tracking-tight">
            AppleNotes
          </h2>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="w-5 size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
