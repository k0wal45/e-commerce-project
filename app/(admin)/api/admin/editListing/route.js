export async function POST(req) {
  const body = await req.json();
  console.log("Editing listing... " + body);
  return new Response("Edited successfully");
}
