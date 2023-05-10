import { serialize } from "cookie";
export default async function (req, res) {
    // const { token } = req.body
    const {user} = req.body
    const token = user?.stsTokenManager?.accessToken
    console.log(token);
    
    if (token !== null && token != undefined) {
        const serialized = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            samSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week,
            path: "/",
        })
        res.setHeader("Set-Cookie", serialized)
        res.status(200).json({ message: "Success"})
    } else {
        return res.json({ message: "Invalid Credentials" })
    }

}