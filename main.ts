import { Status } from 'https://deno.land/std@0.167.0/http/http_status.ts';
import { serve } from 'https://deno.land/std@0.155.0/http/server.ts';

import { env } from './env.ts';
import { extractQueryParams } from './utils.ts';

import { DataSchema, RequestSchema } from './types.ts';

serve(async (req: Request) => {
  const { year, username } = RequestSchema.parse(
    extractQueryParams(new URL(req.url).searchParams)
  );

  const res = await fetch(
    `https://adventofcode.com/${year}/leaderboard/private/view/${env.LEADERBOARD_OWNER_UID}.json`,
    {
      headers: {
        accept: 'application/json',
        cookie: `session=${env.SESSION}`,
      },
    }
  );

  const data = DataSchema.parse(await res.json());

  const member = Object.values(data.members).find(
    (member) => member.name?.toString() === username
  );

  if (member) {
    return Response.redirect(
      `https://img.shields.io/badge/advent%20of%20code%20${year}-${member.stars}%20stars-brightgreen`,
      Status.TemporaryRedirect
    );
  }

  return new Response('Member uid not found.', {
    status: Status.BadRequest,
  });
});
