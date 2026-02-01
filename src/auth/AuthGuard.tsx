import { useSession } from "@descope/react-sdk";
import { useUser } from "../context/UserContext";
import CompleteProfile from "../pages/CompleteProfile";
import { Outlet } from "react-router-dom";
import Loader from "../shared/ui/Loader";

export default function AuthGuard({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isFetchingUser } = useUser();

  if (isSessionLoading || isFetchingUser) return <><Loader/></>;
  if (isAuthenticated && !user) {
    return (
      <>
        <CompleteProfile />
      </>
    );
  }
  return <>{children ? children : <Outlet />}</>;
}
