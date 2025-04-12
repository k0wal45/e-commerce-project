import { NextResponse } from "next/server";

export async function GET() {
  console.log("test route");
  return NextResponse.json({
    success: true,
    body: "Test route has been accessed",
  });
}
