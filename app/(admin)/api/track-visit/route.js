import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST() {
  const db = await connectToDatabase();
  const visitsCollection = db.collection("visits");

  const today = new Date().toISOString().split("T")[0];

  await visitsCollection.updateOne(
    { date: today },
    {
      $inc: { totalVisits: 1 },
      $setOnInsert: { date: today },
    },
    { upsert: true }
  );

  return NextResponse.json({ message: "Visit recorded" });
}
