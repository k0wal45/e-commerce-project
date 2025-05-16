export const dynamic = "force-dynamic";
import uri from "@/lib/mongoClient";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id"); // Extract the 'id' from the query parameters

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "No id provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const client = new MongoClient(uri, {});
    await client.connect(); // Connect to the MongoDB client
    const database = client.db("products"); // Select the 'products' database
    const listings = database.collection("listings"); // Select the 'listings' collection

    // Query to get a listing by '_id'
    const query = { _id: new ObjectId(id) };

    // Execute the query to find the listing
    const data = await listings.findOne(query);
    await client.close(); // Close the database connection

    if (!data) {
      return new Response(
        JSON.stringify({ success: false, error: "Listing not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.log(data);
    // Return the response with the fetched data
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
    console.error("Error fetching listing:", error);

    // Return the response with the error message
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
