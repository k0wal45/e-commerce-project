import uri from "@/lib/mongoClient";
import { MongoClient, ObjectId } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";

export async function PATCH(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  try {
    console.log("edit lsiting listing");
    const body = await req.json(); // Parse the request body as JSON
    const id = body._id; // Extract the 'id' from the request body
    const status = body.status; // Extract the 'status' from the request body
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
    // Query to delete a listing by '_id'
    const query = { _id: new ObjectId(id) };

    // Execute the query to delete the listing
    const update = { $set: { status: status } };
    const result = await listings.updateOne(query, update);

    // Check if a document was deleted
    const data = result.deletedCount > 0 ? { deletedId: id } : null;
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
