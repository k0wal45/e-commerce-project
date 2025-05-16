export const dynamic = "force-dynamic";

import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";

export async function GET(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit =
      searchParams.get("limit") === null || undefined || 0
        ? undefined
        : searchParams.get("limit");

    // Get the database and collection on which to run the operation
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("websiteMessages");
    const listings = database.collection("clientSideMessages");

    // Query to get the latest 6 listings sorted by '_id' (which includes creation timestamp)
    const query = {};
    const options = {
      sort: { _id: -1 }, // Sort in descending order by '_id'
      ...(limit && { limit: parseInt(limit) }),
    };

    // Execute query
    const data = await listings.find(query, options).toArray();

    await client.close();
    return new Response(
      JSON.stringify({
        success: true,
        data: data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching movie:", error.message);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
