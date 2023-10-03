import { z } from "zod";

const configSchema = z.object({
  PORT: z.number(),
});

export const config: z.infer<typeof configSchema> = {
  PORT: Number(process.env.PORT!),
};

configSchema.parse(config);
