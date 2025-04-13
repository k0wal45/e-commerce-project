// lib/auth.js
import { jwtVerify } from "jose";

export async function getUserFromRequest(req) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("No token");

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.userId;
}
