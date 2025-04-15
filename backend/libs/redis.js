import Redis from "ioredis"
import dotenv from "dotenv";
dotenv.config();
const client = new Redis(`rediss://default:${process.env.REDIS}@expert-pheasant-12304.upstash.io:6379`);
export default client;
