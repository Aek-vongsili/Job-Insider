import firebaseAdmin from "../../firebaseAdmin";
export default async (req, res) => {
  const { idToken, role } = req.body;
  // Verify the ID token and decode its payload.
  const claims = await firebaseAdmin.auth().verifyIdToken(idToken);

  try {
    await firebaseAdmin.auth().setCustomUserClaims(claims.sub, { role: role });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error setting custom claims:", error);
    res
      .status(500)
      .json({ success: false, error: "Error setting custom claims" });
  }
};
