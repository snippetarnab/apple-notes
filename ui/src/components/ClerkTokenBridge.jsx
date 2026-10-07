import { useAuth } from "@clerk/react";
import { useLayoutEffect } from "react";
import { setClerkTokenGetter } from "../lib/axios.js";

function ClerkTokenBridge({ children }) {
  const { getToken } = useAuth();

  useLayoutEffect(() => {
    setClerkTokenGetter(getToken);
    return () => setClerkTokenGetter(null);
  }, [getToken]);

  return children;
}

export default ClerkTokenBridge;
