import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";

const app = express();

const allowedOrigins = ["https://okmethod-tweet-synchron.web.app", "https://okmethod-tweet-synchron.firebaseapp.com"];

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

setGlobalOptions({ region: "asia-northeast1" });

export const api = onRequest(app);
