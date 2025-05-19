import uri from "@/lib/mongoClient";
import { MongoClient, ObjectId } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";

export async function PATCH(req) {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return new Response(
      JSON.stringify({ success: false, body: "Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const body = await req.json();
    const id = body.id;
    const status = body.status;

    if (!status) {
      return new Response(
        JSON.stringify({ success: false, error: "No status provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "No id provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("websiteMessages");
    const listings = database.collection("clientSideMessages");
    const query = { _id: new ObjectId(id) };
    const update = { $set: { status: status } };
    const result = await listings.updateOne(query, update);

    await client.close();

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Listing not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: { updatedId: id, modifiedCount: result.modifiedCount },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
