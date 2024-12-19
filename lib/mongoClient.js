import { MongoClient } from "mongodb";

// Mongo DB
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@products.jgymg.mongodb.net/?retryWrites=true&w=majority&appName=Products`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export default client;
