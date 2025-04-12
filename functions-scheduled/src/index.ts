import { onSchedule } from "firebase-functions/v2/scheduler";
import { setGlobalOptions } from "firebase-functions/v2";
import tweetSynchro from "./lib/scripts/tweetSynchro.js";

setGlobalOptions({ region: "asia-northeast1" });

// App Engine cron.yaml
// https://cloud.google.com/appengine/docs/legacy/standard/python/config/cronref?hl=ja#defining_the_cron_job_schedule
export const scheduledFunction = onSchedule("every 3 hours from 0:00 to 15:00", async () => {
  console.log("This functions is scheduled every day at UTC 0,3,6,9,12,15 o'clock (=JST 9,12,15,18,21,24 o'clock).");
  await mainScript();
  return;
});

async function mainScript(): Promise<void> {
  await tweetSynchro("tweet_synchron");
  return;
}

// for local only
if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
  await mainScript(); // ローカルでテストする時はコメントアウトを外す
}
