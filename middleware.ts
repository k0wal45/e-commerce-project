import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "./app/(admin)/api/auth/[...nextauth]/options";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = getServerSession(options);

  console.log(request.nextUrl.pathname, session);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/admin/:path*", "/dashboard/:path*"],
};
