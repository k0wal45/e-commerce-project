import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";
import client from "@/lib/mongoClient";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

// Konfiguracja multer do przetwarzania plików
// const upload = multer({ storage: multer.memoryStorage() });

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Extract text fields
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const location = JSON.parse(formData.get("location"));
    const features = JSON.parse(formData.get("features"));
    const seller = JSON.parse(formData.get("seller"));
    const promotion = JSON.parse(formData.get("promotion"));

    // Extract uploaded files
    const images = formData.getAll("images"); // Handles multiple files

    const data = {
      title,
      description,
      price,
      category,
      location,
      features,
      seller,
      promotion,
      images,
    };

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
    // Zapisz dane w bazie danych
    await client.connect();
    const database = client.db("products");
    const collection = database.collection("listings");
    await collection.insertOne({
      title,
      description,
      price,
      category,
      location,
      features,
      seller,
      promotion,
      images: uploadedImages,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing images:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
