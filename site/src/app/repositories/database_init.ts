import { createClient } from "redis";
import { config } from "../config/config";

const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function connect() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

// Immediately connect when this module is imported
connect().catch(console.error);

export default redisClient;
