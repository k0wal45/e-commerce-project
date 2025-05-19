import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";
import { NextResponse } from "next/server";
import uri from "@/lib/mongoClient";
import { MongoClient, ObjectId } from "mongodb";
import { checkValidToken } from "@/lib/checkValidToken";

export const PATCH = async (req) => {
  const isValid = checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  try {
    const formData = await req.formData();

    // Extract text fields
    const id = formData.get("_id");
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const location = JSON.parse(formData.get("location"));
    const features = JSON.parse(formData.get("features"));
    const seller = JSON.parse(formData.get("seller"));
    const promotion = JSON.parse(formData.get("promotion"));
    const status = formData.get("status");
    // Extract uploaded files
    const images = formData.getAll("images"); // Handles multiple files

    // Przetwórz pliki za pomocą multer

    const uploadedImages = [];

    for (const image of images) {
      const buffer = await image.arrayBuffer(); // Convert Blob to ArrayBuffer
      const fileName = `${title}/${Date.now()}-${image.name}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(buffer), // Convert ArrayBuffer to Buffer
        ContentType: image.type, // Set MIME type
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      uploadedImages.push(
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
      );
    }
    // Update existing listing in the database
    const client = new MongoClient(uri, {});
    await client.connect();
    const database = client.db("products");
    const collection = database.collection("listings");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          price,
          category,
          location,
          features,
          seller,
          promotion,
          status,
          updatedAt: new Date(),
        },
        $push: {
          images: { $each: uploadedImages },
        },
      }
    );

    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing images:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
