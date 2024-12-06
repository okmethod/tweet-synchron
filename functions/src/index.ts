import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import heartbeat from "./lib/routes/heartbeat.js";
import genText from "./lib/routes/genText.js";

const app = express();

const allowedOrigins = [
  "https://okmethod-tweet-synchron.web.app",
  "https://okmethod-tweet-synchron.firebaseapp.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());

app.get("/api/heartbeat", heartbeat);
app.post("/api/gen-text", genText);

setGlobalOptions({ region: "asia-northeast1" });

export const api = onRequest(app);

// for local only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || "0.0.0.0";
  app.listen(PORT as number, HOST as string, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
