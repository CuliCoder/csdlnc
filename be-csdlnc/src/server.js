import express from "express";
import cors from "cors";
import "dotenv/config";
import routeAPI from "./routes/api.js";
import routeAuth from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routeAPI);
app.use("/auth", routeAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
