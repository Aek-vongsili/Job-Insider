import { importX509, jwtVerify } from "jose";

let publicKeys: any;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const getKey = async () => {
    if (publicKeys) {
        return publicKeys;
    }
    const res = await fetch(
        `https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com`
    );
    publicKeys = await res.json();
    return publicKeys;
}
export async function verifyFirebaseJwt(firebaseJwt: string) {
    const publicKeys = await getKey();
    const decode = await jwtVerify(firebaseJwt, async(header,_alg)=>{
        const x509Cert = publicKeys[header.kid!]
        const publicKey = await importX509(x509Cert, "RS256");
        return publicKey;
    },
    {
        issuer: `https://securetoken.google.com/${firebaseProjectId}`,
        audience: firebaseProjectId,
        algorithms: ["RS256"],
      }
    )
    return decode.payload;
}