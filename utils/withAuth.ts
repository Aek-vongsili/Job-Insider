import { GetServerSideProps, GetServerSidePropsContext } from "next";
import firebaseAdmin from "../firebaseAdmin";
export function withAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;
    const token = req.cookies.token;
    try {
      const claim = await firebaseAdmin.auth().verifyIdToken(token);
      if (!token) {
        // Redirect to login page
        return {
          redirect: {
            destination: "/",
            statusCode: 302,
          },
        };
      }
      if (
        (claim.role === "Candidate" &&
          req.url.includes("/employers-dashboard")) ||
        (claim.role === "Employer" && req.url.includes("/candidates-dashboard"))
      ) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    } catch (err) {
      if (err.code === "auth/id-token-expired") {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }

    // console.log(claim);

    return await gssp(ctx); // Continue on to call `getServerSideProps` logic
  };
}
