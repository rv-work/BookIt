import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import experienceRoute from "./routes/experiences.js";
import bookingRoutes from "./routes/bookings.js";
import promoRoute from "./routes/promo.js";
import { connectDB } from "./DB/ConnectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/experiences", experienceRoute);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "BookIt API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
