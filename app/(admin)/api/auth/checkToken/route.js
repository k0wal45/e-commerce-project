import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    console.log(body);

    const decode = jwt.verify(body.token, process.env.JWT_SECRET);
    console.log(decode);
    const date = new Date(decode.exp * 1000);
    console.log("expires - " + date);
    console.log(new Date());

    // if token expired
    if (!date || date < new Date()) {
      return NextResponse.json({ success: false, error: "Token expired" });
    }

    const client = new MongoClient(uri, {});
    await client.connect(); // Connect to the MongoDB client
    const database = client.db("users"); // Select the 'users' database
    const listings = database.collection("users"); // Select the 'users' collection

    // Query to check username or email from the decoded token
    const query = {
      $or: [
        { username: decode.username },
        { email: decode.email },
        { password: decode.password },
      ],
    };

    // Execute the query to find the user
    const data = await listings.findOne(query);

    console.log(data);
    await client.close(); // Close the database connection

    if (data === null) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error.message });
  }
}
