import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";

export async function POST(req) {
  try {
    const formData = await req.json();
    const imageUrls = formData.imageUrls;

    // Validate imageUrls
    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      throw new Error("Invalid input. Expected an array of Base64 strings.");
    }

    const uploadedImages = [];

    for (const [index, base64Image] of imageUrls.entries()) {
      if (
        typeof base64Image !== "string" ||
        !base64Image.startsWith("data:image/")
      ) {
        throw new Error(`Invalid Base64 image format at index ${index}.`);
      }

      // Extract file metadata
      const [meta, content] = base64Image.split(",");
      if (!content) {
        throw new Error(`Invalid Base64 image content at index ${index}.`);
      }

      const contentTypeMatch = meta.match(
        /data:image\/([a-zA-Z0-9-.+]+);base64/
      );
      if (!contentTypeMatch) {
        throw new Error(
          `Invalid MIME type in Base64 string at index ${index}.`
        );
      }

      const contentType = contentTypeMatch[1];
      const fileName = `uploads/${Date.now()}-${index}.${contentType}`;

      // Decode the Base64 string
      const buffer = Buffer.from(content, "base64");

      // Upload to S3
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: `image/${contentType}`,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      uploadedImages.push(
        `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
      );
    }

    // Return the URLs of the uploaded images
    return new Response(
      JSON.stringify({ success: true, images: uploadedImages }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing images:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
