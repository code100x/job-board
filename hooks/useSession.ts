import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSessionData() {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    }
    getSessionData();
  }, []);

  return { session, isSessionLoading: loading }; // Return both session and loading state
};
