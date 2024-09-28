import { z } from "zod";
import { baseItemSchema } from "./base-item.interface";

export const artifactSchema = baseItemSchema.merge(
  z.object({
    type: z.literal("Artifact"),
    hasSavingThrow: z.boolean(),
  }),
);
export type ArtifactItem = z.infer<typeof artifactSchema>;
