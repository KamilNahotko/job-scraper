import { useUser } from "@clerk/nextjs";
import { useFirebaseAuth } from "@/hooks";

export const useAuthenticatedUser = () => {
  const { isLoading: isFirebaseLoading } = useFirebaseAuth();
  const { user, isLoaded: isClerkLoaded } = useUser();

  const isLoading = !isClerkLoaded || isFirebaseLoading;
  const userId = user?.id || null;

  return { userId, isLoading };
};
