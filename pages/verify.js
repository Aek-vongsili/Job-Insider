import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import VerifyEmail from "../components/verify/VerifyEmail";
import ResetPassword from "../components/verify/ResetPassword";

const index = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");

  switch (mode) {
    case "recoverEmail":
      // Display reset password handler and UI.
      return <RecoverEmail actionCode={actionCode} />;
    case "resetPassword":
      // Display email recovery handler and UI.
      return <ResetPassword actionCode={actionCode} />;
    case "verifyEmail":
      // Display email verification handler and UI.
      return <VerifyEmail actionCode={actionCode} />;
  }
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
