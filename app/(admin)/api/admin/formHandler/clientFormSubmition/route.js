import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { checkValidToken } from "@/lib/checkValidToken";

export async function POST(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  try {
    const data = await req.json();
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("websiteMessages");
    const collection = database.collection("clientSideMessages");
    await collection.insertOne(data);
    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
