import client from "@/lib/mongoClient";
import s3 from "@/lib/s3"; // Zakładając, że masz konfigurację S3
import multer from "multer";
import multerS3 from "multer-s3";

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: "public-read", // Publiczny dostęp do pliku
//     key: (req, file, cb) => {
//       cb(null, `uploads/${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

export async function POST(req) {
  try {
    const formData = await req.json();

    console.log(formData);

    // if (!imageFile) {
    //   return new Response(
    //     JSON.stringify({ success: false, error: "No image provided" }),
    //     { status: 400, headers: { "Content-Type": "application/json" } }
    //   );
    // }

    // Używamy multer do przesyłania obrazu do S3
    // const uploadMiddleware = upload.single("image");
    // await new Promise((resolve, reject) => {
    //   uploadMiddleware(req, {}, (err) => {
    //     if (err) reject(err);
    //     resolve();
    //   });
    // });

    // const imageUrl = req.file.location;

    // const database = client.db("products");
    // const collection = database.collection("listings");

    // const result = await collection.insertOne(dataToInsert);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Listing added successfully",
        // listingId: result.insertedId,
        // fileUrl: imageUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding listing:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  // finally {
  //   await client.close();
  // }
}
