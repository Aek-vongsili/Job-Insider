import { serialize } from "cookie";
import csrf from "../../csrf";

import firebaseAdmin from "../../firebaseAdmin";
import { getAuth } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
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
    res.status(200).json({ message: "Success Login" });
  } catch (err) {
    res.status(500).json({ err });
  }

}

// export default async function(req,res){
   
//     auth.signOut().then(rs=>{
//         console.log("log out");
//     })
// }


