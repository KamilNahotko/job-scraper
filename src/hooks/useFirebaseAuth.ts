import { useEffect, useState } from "react";
import { useUserStore } from "../store";
import { signInWithCustomToken } from "firebase/auth";
import { useAuth } from "@clerk/nextjs";
import { auth } from "../api";

export const useFirebaseAuth = () => {
  const { getToken } = useAuth();
  const { setUserData } = useUserStore((state) => ({
    setUserData: state.setUserData,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const setToken = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const token = await getToken({ template: "integration_firebase" });
        if (!token) throw new Error("Failed to fetch token");

        const userCredentials = await signInWithCustomToken(auth, token || "");

        setUserData(userCredentials);
      } catch (error) {
        console.error("Error during Firebase authentication:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setToken();
  }, [getToken, setUserData]);

  return { isLoading, isError };
};
