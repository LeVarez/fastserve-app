import { auth } from "$lib/auth";
import generateHash from "random-hash";

const { get, post } = auth;
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = get;
export const POST = post;