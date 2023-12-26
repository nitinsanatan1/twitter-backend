import mongoose from "mongoose";
import { Configs } from "./constants";

const mongodbConnectionString = `mongodb+srv://${Configs.mongo.host}`;

export const mongoConnect = async () => {
try {
    console.time("Connected in");
    await mongoose.connect(mongodbConnectionString, {
        dbName: Configs.mongo.db,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 15000,
        useCreateIndex: true
    });
    console.log("MONGODB: Connection OK");
} catch (err) {
    console.log("MONGODB: Connection Error: ", err);
    process.exit(1);
}
};