import { serialize } from "cookie";
export default async function (req, res) {
  const { token } = req.body;
  const expiresIn = 60 * 60 * 24 * 7 * 1000; //7days
  try {
    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: expiresIn, // 1 week,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Login Success" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

