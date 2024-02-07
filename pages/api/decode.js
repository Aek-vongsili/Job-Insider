import firebaseAdmin from "../../firebaseAdmin";

export default async (req, res) => {
  // Get the token from the Authorization header
  const idToken = req.headers.authorization;
  try {
    if (!idToken) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized - Missing token" });
    }

    // Extract the token from the "Bearer" prefix if it exists
    const [, token] = idToken.split("Bearer ");

    // Verify the ID token and decode its payload.
    const { role } = await firebaseAdmin.auth().verifyIdToken(token);

    // Set custom claims for the user identified by claims.sub with the specified role.

    res.status(200).json({ success: true, role: role });
  } catch (error) {
    console.error("Error decode token:", error);
    res.status(500).json({ success: false, error: "Error decode token" });
  }
};
