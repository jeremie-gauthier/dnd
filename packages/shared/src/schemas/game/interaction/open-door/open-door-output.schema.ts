import { z } from "zod";

export const openDoorOutputSchema = z.object({});

export type OpenDoorOutput = z.infer<typeof openDoorOutputSchema>;
