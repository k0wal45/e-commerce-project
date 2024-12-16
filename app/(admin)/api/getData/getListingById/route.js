export async function GET(req) {
  try {
    const {
      id,
      type,
      name,
      location,
      imageUrls,
      offer,
      discountedPrice,
      regularPrice,
      area,
    } = await req.json();

    console.log(`id: ${id}
      type: ${type}
      name: ${name}
      location: ${location}
      imageUrls: ${imageUrls}
      offer: ${offer}
      discountedPrice: ${discountedPrice}
      regularPrice: ${regularPrice}
      area: ${area}`);

    // Add your business logic here, such as generating audio
    // For now, just returning a success response

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
  }
}
