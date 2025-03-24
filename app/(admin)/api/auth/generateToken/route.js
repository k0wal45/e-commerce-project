import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body as JSON
    const { email, password, user } = body;

    // Validate the credentials (this is just an example, replace with your logic)
    if (email === "admin@admin.pl" && password === "admin") {
      // Generate a JWT
      const token = jwt.sign({ email, user }, SECRET_KEY, { expiresIn: "1h" });

      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
