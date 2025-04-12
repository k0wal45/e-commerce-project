import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.next(); // Allow other requests through
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/admin/:path*", "/dashboard/:path*", "/api/test/:path*"],
};
