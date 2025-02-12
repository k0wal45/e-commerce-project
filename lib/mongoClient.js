// Mongo DB
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@products.jgymg.mongodb.net/?retryWrites=true&w=majority&appName=Products`;

export default uri;
