import express from "express";
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", roomRouter);

app.listen(PORT, () => {
  console.log(`http server is running on ${PORT}`);
});
