import { z } from "zod";
import { InstructionStepSchema } from "./instruction-step";

export const InstructionSchema = z.object({
  summary: z.string(),
  detailed: z.string(),
  steps: z.array(InstructionStepSchema),
});

export type Instruction = z.infer<typeof InstructionSchema>;
