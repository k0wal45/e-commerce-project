import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    // console.log(body);

    const decode = jwt.verify(body.token, process.env.JWT_SECRET);
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
      username: decode.username,
      email: decode.email,
      password: decode.password,
    };
    // Execute the query to find the user
    const data = await listings.findOne(query, { projection: { password: 0 } });
    await client.close(); // Close the database connection

    if (data === null) {
      return NextResponse.json({ success: false });
    }

    if (data.email === decode.email && data.password === decode.password) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" });
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
