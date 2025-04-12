import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const token = cookies().get("token"); // Get the token from the cookies

    const decode = jwt.verify(token.value, process.env.JWT_SECRET);
    const date = new Date(decode.exp * 1000);
    // if token expired
    if (!date || date < new Date()) {
      return NextResponse.json({ success: false, error: "Token expired" });
    }
    // if token not expired
    const client = new MongoClient(uri, {});
    await client.connect(); // Connect to the MongoDB client
    const database = client.db("users"); // Select the 'users' database
    const listings = database.collection("users"); // Select the 'users' collection
    const query = {
      email: decode.email,
    };
    // Execute the query to find the user
    const data = await listings.findOne(query);
    await client.close(); // Close the database connection

    if (data === null) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(decode.password, data.password);

    if (data.email === decode.email && isMatch) {
      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" });
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
