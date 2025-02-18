export async function POST(req) {
  try {
    const data = await req.json();
    // Process the data here
    return new Response(JSON.stringify({ message: "Success", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
