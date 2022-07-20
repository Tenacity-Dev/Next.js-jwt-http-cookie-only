import { NextResponse } from "next/server";
import * as jose from "jose";
export default async function middleware(request) {
  const authToken = request.cookies.get("token_name"); // get our cookie
  if (request.nextUrl.pathname.includes("/dashboard")) {
    if (authToken === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const { payload: DATA } = await jose.jwtVerify(
        authToken,
        new TextEncoder().encode(`${process.env.SECRET_KEY_JWT}`)
      );
      if (!DATA) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/dashboard/:path*",
};
