import { appAuth } from "$lib/appAuth";

const { get, post } = appAuth;
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = get;
export const POST = post;