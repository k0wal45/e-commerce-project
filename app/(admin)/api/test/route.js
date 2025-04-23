import { NextResponse } from "next/server";
import { checkValidToken } from "@/lib/checkValidToken";

export async function GET(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  return NextResponse.json({
    success: true,
    body: "Test route has been accessed",
  });
}
