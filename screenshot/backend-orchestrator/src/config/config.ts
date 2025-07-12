import { z } from "zod";
import dotenv from "dotenv";
import { ConfigSchema } from "../schemas/config-schema.js";

dotenv.config();

export const config = ConfigSchema.parse(process.env);
