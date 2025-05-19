import uri from "@/lib/mongoClient";
import { MongoClient, ObjectId } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";

export async function DELETE(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  try {
    console.log("delete listing");
    const body = await req.json(); // Parse the request body as JSON
    const id = body.id; // Extract the 'id' from the request body
    const images = body.images; // Extract the 'images' from the request body
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "No id provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (!images) {
      return new Response(
        JSON.stringify({ success: false, error: "No images provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    async function deleteS3Image(imageUrl) {
      // Extract the key from the URL
      const url = new URL(imageUrl);
      // Remove the leading slash from pathname
      const Key = decodeURIComponent(url.pathname.slice(1));
      const Bucket = "house-marketplace-app";
      try {
        await s3Client.send(new DeleteObjectCommand({ Bucket, Key }));
      } catch (err) {
        console.error(`Failed to delete image ${Key}:`, err);
      }
    }

    // Delete all images in parallel
    await Promise.all(images.map(deleteS3Image));
    // delete the listing from the database

    const client = new MongoClient(uri, {});
    await client.connect(); // Connect to the MongoDB client
    const database = client.db("products"); // Select the 'products' database
    const listings = database.collection("listings"); // Select the 'listings' collection
    // Query to delete a listing by '_id'
    const query = { _id: new ObjectId(id) };

    // Execute the query to delete the listing
    const result = await listings.deleteOne(query);

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
