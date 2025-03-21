import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/admin/:path*", "/dashboard/:path*"],
};
