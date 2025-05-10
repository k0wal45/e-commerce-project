import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";

export async function GET(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    console.log("Invalid token");
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
    const page =
      searchParams.get("page") === null || undefined || 0
        ? 1
        : searchParams.get("page");

    // Get the database and collection on which to run the operation
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("products");
    const listings = database.collection("listings");

    const skip = (page - 1) * limit;
    // Query to get the latest listings with status "active"
    const query = {};
    const options = {
      sort: { _id: -1 }, // Sort in descending order by '_id'
      ...(limit && { limit: parseInt(limit) }),
      ...(skip && { skip: parseInt(skip) + 1 }), // Skip documents based on the page number
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
