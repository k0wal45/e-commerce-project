export const dynamic = "force-dynamic";

import uri from "@/lib/mongoClient";
import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;

    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1;

    const categoryParam = searchParams.get("category");
    const category = categoryParam;

    const statusParam = searchParams.get("status");
    const status = statusParam ? statusParam : undefined;

    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("products");
    const listings = database.collection("listings");

    const skip = (page - 1) * limit;
    const query = { ...(category && { category }), ...(status && { status }) };

    const options = {
      sort: { _id: -1 },
      ...(limit && { limit: parseInt(limit) }),
      ...(skip && { skip: parseInt(skip) }),
    };

    const data = await listings.find(query, options).toArray();
    await client.close();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
