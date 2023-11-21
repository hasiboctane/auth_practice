import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);



const dataBaseUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
    connectDB(dataBaseUrl);
})