import { NextResponse } from "next/server";
import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const { date } = await req.json();
    const client = new MongoClient(uri, {});
    await client.connect();
    const db = client.db("analytics");
    const visitsCollection = db.collection("visits");

    // Parsowanie daty z requesta
    const visitDate = new Date(date);
    const year = visitDate.getFullYear();
    const month = visitDate.getMonth() + 1; // Miesiące w JS są indeksowane od 0
    const day = visitDate.getDate();

    // Unikalny identyfikator dla danego miesiąca
    const monthId = `${year}-${String(month).padStart(2, "0")}`;

    // Aktualizacja liczby wejść dla konkretnego dnia w miesiącu
    await visitsCollection.updateOne(
      { _id: monthId },
      {
        $inc: { [`dailyVisits.${day}`]: 1, totalVisits: 1 },
        $setOnInsert: { year, month }, // Ustawia, jeśli dokument jest nowy
      },
      { upsert: true } // Tworzy nowy dokument, jeśli nie istnieje
    );

    await client.close();

    return NextResponse.json({ message: "Visit recorded" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error recording visit" },
      { status: 500 }
    );
  }
}
