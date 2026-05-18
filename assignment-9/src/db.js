import mongoose from "mongoose";

const dbConnection = async () => {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/assignment-9";

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 3000,
        });

        console.log("✅ Connected to MongoDB successfully");

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to database");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected from database");
        });

        return true;
    } catch (err) {
        console.warn(`⚠️ MongoDB connection unavailable at ${mongoUri}`);
        console.warn("Server will continue without a database connection.");
        console.warn(err.message);
        return false;
    }
};

export default dbConnection;