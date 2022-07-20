// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";
import * as jose from "jose";
export default async function SignIn(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json("please fill up all fields");
        }
        const token = await new jose.SignJWT({
          userId: `ayoubwazane`,
          role: `admin`,
          email: `ayoubwazane306@gmail.com`,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("14d")
          .sign(new TextEncoder().encode(`${process.env.SECRET_KEY_JWT}`));
        const serialised = serialize("token_name", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 2, //valid for two weaks
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        return res.json(202).json("user signed in successfully...");
      } catch (error) {}
  }
}
