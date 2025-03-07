import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  const { listingId } = await req.json();
  if (!listingId)
    return NextResponse.json({ error: "Missing listingId" }, { status: 400 });

  const db = await connectToDatabase();
  const listingVisitsCollection = db.collection("listing_visits");

  const today = new Date().toISOString().split("T")[0];

  await listingVisitsCollection.updateOne(
    { listingId, date: today },
    {
      $inc: { views: 1 },
      $setOnInsert: { date: today, listingId },
    },
    { upsert: true }
  );

  return NextResponse.json({ message: "Listing visit recorded" });
}
