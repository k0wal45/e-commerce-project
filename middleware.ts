import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Must be at least 32 bytes

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered:", request.nextUrl.pathname);

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting...");
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT using jose (Edge-compatible)
    const secret = new TextEncoder().encode(SECRET_KEY);
    if (!token) {
      throw new Error("Token is undefined");
    }
    const { payload } = await jwtVerify(token, secret);

    console.log("Authenticated user:", payload);

    return NextResponse.next(); // Allow access
  } catch (error) {
    console.error("Token verification failed:", error);
  }

  return NextResponse.next(); // Allow other requests through
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/admin/:path*", "/dashboard/:path*"],
};
