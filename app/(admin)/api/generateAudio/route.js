export async function POST(req) {
  try {
    // Parse the JSON body of the incoming request
    const description = await req.json();

    console.log(description);

    // Add your business logic here, such as generating audio
    // For now, just returning a success response

    return new Response(
      JSON.stringify({
        success: true,
        message: "Audio generated successfully!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating audio:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.nextUrl);
    const searchParams = url.searchParams;

    // Add your business logic here, such as generating audio
    // For now, just returning a success response

    console.log(searchParams.get("id"));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Audio generated successfully!",
        url: url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating audio:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
