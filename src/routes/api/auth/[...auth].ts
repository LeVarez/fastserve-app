import { auth } from "$lib/auth";

const { get, post } = auth;
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = get;
export const POST = post;