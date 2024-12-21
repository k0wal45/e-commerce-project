import client from "@/lib/mongoClient";

export async function GET() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("products");
    const movies = database.collection("listings");
    // Query for a movie that has the title 'The Room'
    // Execute query
    const data = await movies.find().toArray();

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
