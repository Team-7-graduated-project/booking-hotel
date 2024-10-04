import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import route from "./routes";
import logger from "./utils/logger";
import initDatabase from "./initDatabase";

dotenv.config();

const app = express();

// Middleware Setup
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// CORS Setup
app.use(
  cors({
    origin: [
      "https://bookinghotels.vercel.app",
      "http://localhost:3000",
      process.env.WEB_URL,
    ].filter(Boolean),
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
    maxAge: 3600,
  })
);

// Database Initialization
initDatabase();

// JWT Secret Check
if (!process.env.JWT_SECRET) {
  const err = new Error("No JWT_SECRET in env variable");
  logger.warn(err.message);
}

// Routes Initialization
route(app);

// Server Setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Server listening on: http://localhost:${PORT}`);
});

export default app;
