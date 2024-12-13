export async function POST(req) {
  try {
    const body = await req.json();

    console.log(body);

    // const {
    //   id,
    //   type,
    //   name,
    //   location,
    //   imageUrls,
    //   discountedPrice,
    //   regularPrice,
    //   area,
    // } = await req.json();

    // console.log(`id: ${id}
    //   type: ${type}
    //   name: ${name}
    //   location: ${location}
    //   imageUrls: ${imageUrls}
    //   offer: ${offer}
    //   discountedPrice: ${discountedPrice}
    //   regularPrice: ${regularPrice}
    //   area: ${area}`);

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
    console.error("Error adding listing bbb:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
