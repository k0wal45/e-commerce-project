import client from "@/lib/mongoClient";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    // Get the database and collection on which to run the operation
    await client.connect();
    const database = client.db("products");
    const listings = database.collection("listings");
    // Query to get the latest 6 listings sorted by '_id' (which includes creation timestamp)
    const query = {};
    const options = {
      sort: { _id: -1 }, // Sort in descending order by '_id' (which includes creation timestamp)
      limit: parseInt(limit), // Limit the number of results to the specified limit
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
