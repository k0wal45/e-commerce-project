import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    console.log(body);

    const decode = jwt.verify(body.token, process.env.JWT_SECRET);
    console.log(decode);
    const date = new Date(decode.exp * 1000);
    console.log("expires - " + date);
    console.log(new Date());
    if (date < new Date()) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
