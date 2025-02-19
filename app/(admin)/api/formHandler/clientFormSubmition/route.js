import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { status, page, data } = await req.json();
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("websiteMessages");
    const collection = database.collection("clientSideMessages");
    await collection.insertOne({ status, page, data });
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
