import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

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
      password: decode.password,
    };
    // Execute the query to find the user
    const data = await listings.findOne(query);
    await client.close(); // Close the database connection

    console.log("Decoded token:", decode);
    console.log("Data from database:", data);
    if (data === null) {
      return NextResponse.json({ success: false });
    }

    if (data.email === decode.email && data.password === decode.password) {
      return NextResponse.json({
        success: true,
        data: {
          username: data.username,
          email: data.email,
          role: data.role,
        },
      });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" });
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
