import { config } from 'https://deno.land/std@0.167.0/dotenv/mod.ts';

import { EnvSchema } from './types.ts';

await config({ export: true });

export const env = EnvSchema.parse(Deno.env.toObject());
