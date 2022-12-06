import { z } from 'https://deno.land/x/zod@v3.19.1/mod.ts';

export const EnvSchema = z.object({
  SESSION: z.string(),
  LEADERBOARD_OWNER_UID: z.string(),
});

export const DataSchema = z.object({
  event: z.string(),
  owner_id: z.number(),
  members: z.record(
    z.object({
      id: z.number(),
      name: z.string().nullable(),
      stars: z.number(),
    })
  ),
});

export const RequestSchema = z.object({
  year: z.string().default('2022'),
  username: z.string(),
});
