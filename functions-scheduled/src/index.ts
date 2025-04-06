import { onSchedule } from "firebase-functions/v2/scheduler";
import { setGlobalOptions } from "firebase-functions/v2";

setGlobalOptions({ region: "asia-northeast1" });

// App Engine cron.yaml
// https://cloud.google.com/appengine/docs/legacy/standard/python/config/cronref?hl=ja#defining_the_cron_job_schedule
export const scheduledFunction = onSchedule("every 12 hours from 11:00 to 23:00", async () => {
  console.log("This functions is scheduled every day at 11:00 UTC (=20:00 JST) and 23:00 UTC (= 08:00 JST).");
  await mainScript();
  return;
});

async function mainScript(): Promise<void> {
  return;
}

// for local only
if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
  // await mainScript();  ローカルでテストする時はコメントアウトを外す
}
