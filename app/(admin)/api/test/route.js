import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token: ", token);
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded token: ", decode);
  console.log("test route");
  return NextResponse.json({
    success: true,
    body: "Test route has been accessed",
  });
}
