import firebaseAdmin from "../../firebaseAdmin";

export default async (req, res) => {
  // Get the token from the Authorization header
  const idToken = req.headers.authorization;
  const { role } = req.body;
  try {
    if (!idToken) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized - Missing token" });
    }

    // Extract the token from the "Bearer" prefix if it exists
    const [, token] = idToken.split("Bearer ");

    // Verify the ID token and decode its payload.
    const claims = await firebaseAdmin.auth().verifyIdToken(token);

    // Set custom claims for the user identified by claims.sub with the specified role.
    await firebaseAdmin.auth().setCustomUserClaims(claims.sub, { role: role });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error setting custom claims:", error);
    res
      .status(500)
      .json({ success: false, error: "Error setting custom claims" });
  }
};
