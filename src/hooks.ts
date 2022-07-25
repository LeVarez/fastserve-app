import type { GetSession, Handle, RequestEvent } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import { prisma } from "$lib/prisma";


const RouteCache: {[routeId: string]: string} = {
  '': 's-maxage=604800, max-age=0', // index/homepage route
  '[slug]': 's-maxage=604800, max-age=0',
  'search': 's-maxage=604800, max-age=0',
  'globe.svg': 'max-age=604800'
};

const DEFAULT_CACHE = 'private, max-age=0';

function getCacheControl(event: RequestEvent): string {
  if (!(event.routeId in RouteCache)) { console.log('missing cache config for', event.routeId); }
  return RouteCache[event.routeId] || DEFAULT_CACHE;
}

interface CacheHeaders {
  'Cache-Control'?: string;
  'Surrogate-Key'?: string;
  'Surrogate-Control'?: string;
}

function getCacheHeaders(event: RequestEvent): CacheHeaders {
  if (event.routeId == null) return {};
  return {
    'Cache-Control': getCacheControl(event),
    'Surrogate-Key': event.locals.cacheKeys.size > 0 ? Array.from(event.locals.cacheKeys).join(' ') : undefined,
    'Surrogate-Control': 'stale-while-revalidate=30, stale-if-error=3600',
  };
}

export const getSession: GetSession = async (event) => {

  const session = await auth.getSession(event);

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    return {user};
  }
  return { user: undefined };
};

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.cacheKeys = new Set();
  const response = await resolve(event);
  if (response.ok) {
    const cacheHeaders = getCacheHeaders(event);
    for (const [key, value] of Object.entries(cacheHeaders)) {
      if (value != null) response.headers.set(key, value);
    }
  }
  return response;
};
