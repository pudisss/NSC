import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { JWT_TOKEN } from "$env/static/private";

export async function handle({ event, resolve }) {
	const cookie = parse(event.request.headers.get('cookie') || '');
	const token = cookie.token;

	if (token) {
		try {
			const user = jwt.verify(token, JWT_TOKEN);

			
			event.locals.user = user;
		} catch {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
}