import client from "@/lib/mongoClient";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(body);

    const {
      type,
      name,
      location,
      imageUrls,
      discountedPrice,
      regularPrice,
      area,
    } = body;

    // Add your business logic here, such as generating audio

    const database = client.db("products");
    const collection = database.collection("listings");

    const dataToInsert = {
      type: type,
      name: name,
      location: location,
      imageUrls: imageUrls,
      discountedPrice: discountedPrice,
      regularPrice: regularPrice,
      area: area,
    };

    const result = await collection.insertOne(dataToInsert);

    console.log(result.insertedId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Listing added succesfuly",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding listing:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await client.close();
  }
}
