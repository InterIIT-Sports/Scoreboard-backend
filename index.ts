import { config } from "dotenv";
import { connectToDatabase } from "./utils/MongooseUtils";

config();
connectToDatabase();
