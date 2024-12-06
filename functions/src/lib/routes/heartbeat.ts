import type { Request, Response } from "express";
import type { ResponseHeartbeatJson } from "../types/heartbeat";


const heartbeat = async (req: Request, res: Response) => {
  console.log("req:", req.body);
  const now = new Date();
  const response: ResponseHeartbeatJson = {
    alive: now.toISOString(),
  };
  res.json(response);
};

export default heartbeat;
