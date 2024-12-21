import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const imageKeys = searchParams.getAll("imageKeys");

    console.log("imageKeys", imageKeys);

    if (!Array.isArray(imageKeys) || imageKeys.length === 0) {
      throw new Error("Invalid input. Expected an array of image keys.");
    }

    const images = [];

    for (const key of imageKeys) {
      const getObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      };

      const command = new GetObjectCommand(getObjectParams);
      const { Body } = await s3Client.send(command);

      const chunks = [];
      for await (const chunk of Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const base64Image = buffer.toString("base64");

      images.push(`data:image/jpeg;base64,${base64Image}`);
    }

    return new Response(JSON.stringify({ success: true, images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
