import { serialize } from "cookie";
export default async function (req, res) {
    // const { token } = req.body
    const {token} = req.body
    console.log(token);
    
    if (token !== null && token != undefined) {
        const serialized = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            samSite: "strict",
            maxAge: 60 * 60 , // 1 week,
            path: "/",
        })
        res.setHeader("Set-Cookie", serialized)
        res.status(200).json({ message: "Success"})
    } else {
        return res.json({ message: "Invalid Credentials" })
    }

}